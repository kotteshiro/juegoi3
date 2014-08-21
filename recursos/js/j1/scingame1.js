function ponerPuntito(grilla,x,y){
	grilla.dot=grilla.dot||obj(uniq("dot"),grilla,"punto",x,y);
	if(x==false){
			grilla.dot.visible=false;
		return
	}
	grilla.dot.visible=true;
	grilla.dot.setPosition(x-(grilla.dot.width/2),y-(grilla.dot.height/2));
}
function Enunciado_e2(dad){
	this.currNum1;
	this.currNum2;
	this.bg=obj(uniq("enunciado"),dad,"enunciado1",686,67)
	
	
	this.setNums=function(num1,num2){
		var DERECHA=0;
		var IZQUIERDA=11;
		var CENTRADO=22;
		if(this.currNum1){ this.currNum1.destroy(); this.currNum1=undefined; }
		if(this.currNum2){ this.currNum2.destroy(); this.currNum2=undefined; }
		window.e1ccn1=this.currNum1=ponerNumero({padre:dad,x:748,y:243},num1,DERECHA);
		window.e1ccn2=this.currNum2=ponerNumero({padre:dad,x:840,y:243},num2,IZQUIERDA);
	}
	//this.setNums(2,2);
}

function bien(){
	console.log("bien");
	logro.addLogro();
	chekalvl();
}
function mal(bicho){
	console.log("mal");
	//logro.mal();
	logro.wrongAnswer();
	bicho.destroy();
}

function validar(coords, bicho){
	if(coords==undefined){
		bicho.volver();
	}else{
		//bicho.enableEvents=false;
		unsetMISC(bicho);
		if(e2.currCoords[0]==coords.x && e2.currCoords[1]==coords.y){
			bien();
			sonido.play("bien")
		}else{
			mal(bicho);
			
			sonido.play("mal")
		}
		e2.startIntento();
	}
	
	console.log("validando coordenadas",coords);
}
function BichoDnD(dad,grilla,bichoid){
	var obj={x:694 ,y:333}//x e y
	obj.click=this.onbicho;
	obj.sprite=bichosprGrande(bichoid);
	var act=btn(uniq("bichitog"), dad, obj);
	//this.bichodnd=obj(uniq("enunciado"),dad,"enunciado",730,227);
	//placeHelper(act);
	setMISC(act,function(e){
		//funcion drag
		
	
	},
	function(e){
		//function drop
		trace("drop");
			var pos1=grilla.getCartesCordsNearv(e.screenPoint.x, e.screenPoint.y);
		if(pos1!=undefined){
			this.alpha=1;
			pos=grilla.getCoord(pos1.x+1,pos1.y-1);
			ponerPuntito(grilla.ac,false);
			//console.log(this.scalex);
			this.setPosition(pos.x-grilla.x-((this.width/3)*this.scaleX), pos.y-grilla.y-((this.height/3)*this.scaleY));
		}else{
			
		}
		trace("ahora valida");
		validar(pos1,this);
	}
	,function(e){
		//function dragin
		this.setPosition(e.screenPoint.x-this.width/2,e.screenPoint.y-this.height/2);
		
		var pos=grilla.getCartesCordsNearv(e.screenPoint.x, e.screenPoint.y);
		if(pos!=undefined){
			this.alpha=.5;
			pos=grilla.getCoord(pos.x+1,pos.y-1);
			ponerPuntito(grilla.ac,pos.x,pos.y);
			
		}else{
			ponerPuntito(grilla.ac,false);
		}
	
	},grilla);
	window.bichotmp=act;
}
Etapa2.prototype.startIntento=function(){
	//tmp:
	
	console.log(this)
	var bichoid=getRandomA("bichoid",[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]);
	this.bicho=new BichoDnD(this.ac,this.grilla,bichoid);
	this.oldcords=this.oldcords||[];
	this.currCoords=getCoordRand(this.oldcords);
	this.oldcords.push(this.currCoords)
	this.enunciado.setNums(this.currCoords[0],this.currCoords[1]);
	trace("");
}
function getCoordRand(awayfromme){
	console.log("obteniendo coords");
	awayfromme=awayfromme||[];
	window.allcordsposib=[];
	if(window.allcordsposib.length<=0){
		var coords=[1,2,3,4,5,6,7,8,9];
		for(var xi in coords){
			for(var yi in coords){
				window.allcordsposib.push([coords[xi],coords[yi]]);
			}
		}
	}
	var selected;
	var pasa=true;
	var loops=0;
	do{
		pasa=true;
		selected=getRandomA("cordx_",window.allcordsposib,true);
		if(awayfromme.length<=0) pasa=true;
		else{
			for(var k in awayfromme){
				var d = dist(selected,awayfromme[k]);
				if(d>2){
					pasa&=true
				}else{
					pasa&=false
					break;
				}
			}
		}
		loops++;
		if(loops>(window.allcordsposib.length*5)){
			console.warn("ya es mucho, chao loop");
			pasa=true;
		}
	}while(pasa!=true);
	return selected||getRandomA("cordx_");
}
function dist(a,b){
	return Math.sqrt(Math.pow(b[0]-a[0],2)+Math.pow(b[1]-a[1],2));
}