//var scprinc= director.createScene();
var alphawhj;
var gen;
var todo=[];
var logro;
var menux;
var escenajuego;
var e1,e2,e3, etapa;
var countDownTime = 0.1;

function onTimeOver(time) {
	trace("Time's up!");
}

sc(function(escena){
	trace("SCIngame Start");
	escenajuego=escena;
	escena.name="scingame";

	var  bg=animbg(escena,1700000*10);
	_etapa1();
	trace("current timer", currTimer);
	
	logro=aclogro(escena,200,700);
	
});

function _etapa1(){
	e1=new Etapa1(escenajuego);
	e1.menu=new MenuInGame(escenajuego);
	etapa = e1;
}
function _etapa2(){
	if(e1) e1.ac.destroy()
	if(e1.ac.memu) e1.ac.menu.destroy()
	e2=new Etapa2(escenajuego);
	e2.startIntento();
	e2.menu=new MenuInGame(escenajuego);
	etapa = e2;
	clockController("start");
//	alert("etapa2");
}

function _etapa3(){
	e2.ac.destroy();
	e3=new Etapa3(escenajuego);
	e3.startIntento();
	e3.menu=new MenuInGame(escenajuego);
	etapa = e3;
	clockController("start");
}

function chekalvl(){
	if(logro){
		if(logro.getLvlIx()!=12 && logro.getLvlIx()!=4 && logro.getLvlIx()!=8)
			sonido.play("mostrarpanel");
		switch(logro.getLvlIx()){
			case 4:
			//	sonido.play("mostrarpanel")
				clockController("stop");
				spashMsg("tit_intento3",_etapa2,true);
			break;
			case 8:
				clockController("stop");
				spashMsg("tit_intento3",_etapa3,true);
			break;
			case 12:
				spashMsg("tit_excelente"); 
		}
		
	}else{
		console.error("no existe objeto logro");
	}
	
}
function Etapa1(padre){
	trace("Class Etapa1");
	
	this.virgrill=[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]];
	this.bichosinst=[];
	this.pairs=[];
	this.matabicho=function(cx){
		cx.escena.bichosinst[cx.prop.ccart[0]][cx.prop.ccart[1]]=undefined;
		cx.escena.virgrill[cx.prop.ccart[0]][cx.prop.ccart[1]]=0;
		console.log("matabicho",cx.prop.ccart);
		cx.destroy();
	}
	this.onbicho=function(cx){
		trace("Le has dado al;",cx.prop.ccart);
		trace("Tienes que darle al:",cx.escena.currCoords);
		if(cx.escena.currCoords[0]==cx.prop.ccart[0]+1 && cx.escena.currCoords[1]==cx.prop.ccart[1]+1){
			//** BIEN  **/
			//spashMsg("tit_excelente");
			//sonido.play("mostrarpanel")
			cx.escena.matabicho(cx);
			if(logro){
				logro.addLogro();

				switch(logro.getLvlIx()){
					case 4:
					break;
					case 8:
					break;
					case 12:
					default: //cada vez que gana
						cx.escena.startIntento(); 
				}
			}else{
				console.error("no existe objeto logro");
			}
			chekalvl()
			
		}else{
			sonido.play("suma_mal");
			spashMsg("tit_intento1");
			logro.wrongAnswer();
			clockController("resume");
		}
		
	}
	this.rellenarGrilla=function(){
		var i=0;
		while(i<7){
			var num1=getRandomA([0,1,2,3,4,5,6,7,8,9]);
			var num2=getRandomA([0,1,2,3,4,5,6,7,8,9]);
			if(this.virgrill[num1][num2]<=0){
				var bid=getRandomA([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19]);
				this.virgrill[num1][num2]=bid;
				
				i++;
			}
		}
		for(var i=0;i<10;i++){
			for(var e=0;e<10;e++){
				if(this.virgrill[i][e]>0){
					var props=this.grilla.getCoord(i+1,e+1);//x e y
					props.click=this.onbicho;
					props.ccart=[i,e];
					var bicho=ponerBicho(this.ac,this.virgrill[i][e], props);
					this.bichosinst[i]=this.bichosinst[i]||[];
					this.bichosinst[i][e]=bicho;
					this.bichosinst[i][e].prop=props
					this.bichosinst[i][e].escena=this;
					this.pairs.push([i+1,e+1]);
				}
			}
		}
	}
	this.limpiarGrilla=function(){
		var i=0,e=0;
		for(var i=0;i<10;i++){
			for(var e=0;e<10;e++){
				if(this.virgrill[i][e]>0){
					this.bichosinst[i][e].destroy();
					this.virgrill[i][e]=0;
				}
			}
		}
	}
	
	this.nuevosBichos = function(){
		this.limpiarGrilla();
		this.rellenarGrilla()
	}
	this.startIntento=function(){
		this.pairs=[];
		this.nuevosBichos();
		this.currCoords=getRandomA(this.pairs);
		this.enunciado.setNums(this.ac,this.currCoords[0],this.currCoords[1]);
	
	}
	
	//*** FIN DECLARACIONES ***//
	
	this.ac=new CAAT.ActorContainer().setClip(true);
	this.ac.setBounds( 5,5, 1024-10,768-10 );
	
	this.grilla=new Grilla(this.ac);
	this.enunciado=new Enunciado(this.ac);
	
	
	this.startIntento();
	
	padre.addChild(this.ac);
}
function Etapa2(padre){
	trace("Class Etapa2");
	
	this.virgrill=[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]];
	
	//*** FIN DECLARACIONES ***//
	
	this.ac=new CAAT.ActorContainer().setClip(true);
	this.ac.setBounds( 5,5, 1024-10,768-10 );
	
	window.grillatmp=this.grilla=new Grilla(this.ac);
	this.enunciado=new Enunciado_e2(this.ac);
	console.log(this.grilla.ac);
	var entities=[this.grilla.ac];
	
	//this.startIntento();
	
	padre.addChild(this.ac);
}
function setMISC(act,cbdrag,cbdrop,cbdraging,grilla){
	/*act.addEventListener("touchstart",
	function(e){ 
		console.log("startd",e); 
	});*/
	act.originalx=act.x;
	act.originaly=act.y;
	act.mouseDown=function(e){
		this.setScale(.4,.4);
		cbdrag.call(this,e);
	}
	act.mouseUp=function(e){
		//this.setScale(1,1);
		cbdrop.call(this,e);
	}
	act.mouseDrag=function(e){
		//console.log(e);
		cbdraging.call(this,e);
	}
	act.volver=function(){
		animaa(this,{x:this.originalx,y:this.originaly,scalex:1,scaley:1,alpha:1});
	}
}
function unsetMISC(act){
	act.mouseDown=act.mouseUp=act.mouseDrag=act.volver=function(){};
}

function animaa(obj,props){
	if(props.x){ // animapos
		obj.x=props.x //TODO
		obj.y=props.y //TODO
	}
	if(props.scalex){
		obj.setScale(props.scalex,props.scaley)
	}
	if(props.alpha){
		obj.alpha=props.alpha;
	}
}

function Enunciado(dad){
	this.currNum1;
	this.currNum2;
	this.bg=obj(uniq("enunciado"),dad,"enunciado",686,67);	
}
function Enunciado_e2(dad){
	this.currNum1;
	this.currNum2;
	this.bg=obj(uniq("enunciado"),dad,"enunciado1",686,67)
}


var setNums=function(donde,num1,num2){
	var DERECHA=0;
	var IZQUIERDA=11;
	var CENTRADO=22;
	if(this.currNum1){ this.currNum1.destroy(); this.currNum1=undefined; }
	if(this.currNum2){ this.currNum2.destroy(); this.currNum2=undefined; }
	this.currNum1=ponerNumero({padre:donde,x:730,y:263},num1,DERECHA);
	this.currNum2=ponerNumero({padre:donde,x:825,y:263},num2,IZQUIERDA);
}

Enunciado.prototype.setNums=Enunciado_e2.prototype.setNums=Enunciado_e3.prototype.setNums=setNums;

function ponerNumero(donde,valor,plus,cb){
	cb=cb||function(){};
	plus=plus||0;
	/*
	donde={
		padre: ,
		x: ,
		y: 
	}
	*/
	console.log("poniendo Numero",donde.padre,(valor-1)+plus);
	//donde.padre.sprite=bichospr(ix);
	console.log(cb);
	var sp={sprite:[getsprt("numeros",11,3), (valor)+plus, (valor)+plus],x: donde.x, y:donde.y, click:cb};
	//var act =btn(uniq("num"),conten,donde.padre);
	var btn1=btn(uniq("num"),donde.padre,sp).setScale(1,1);
	btn1.plus=plus;
	btn1.valor=valor;
	btn1.setVal=function(ca){
		this.setButtonImageIndex(ca+this.plus, ca+this.plus)
	}
	return btn1;
}
function ponerLetra(donde,valor,plus,cb){
	cb=cb||function(){};
	plus=plus||27;
	/*
	donde={
		padre: ,
		x: ,
		y: 
	}
	*/
	valor=["a","b","c","d","e","f","g","h","i","k"].indexOf(valor);
	console.log("poniendo Letra",donde.padre,(valor-1)+plus);
	//donde.padre.sprite=bichospr(ix);
	var sp={sprite:[getsprt("letras",27,2), (valor)+plus, (valor)+plus],x: donde.x, y:donde.y, click:cb};
	//var act =btn(uniq("num"),conten,donde.padre);
	var btn1=btn(uniq("let"),donde.padre,sp).setScale(1,1);
	return btn1;
}
function ponerBicho(conten,ix,obj){
	
	console.log("poniendo bicho",obj);
	obj.sprite=bichospr(ix);
	var act=btn(uniq("bichito"),conten,obj);
	return act;
	
}
function bichospr(inx){
	
	sp=getsprt("bichos",5,4);
	return [sp, inx, inx];	
}
function bichosprGrande(inx){
	
	sp=getsprt("bichosGrandes",5,4);
	return [sp, inx, inx];	
}
function Grilla(padre,prop){
	trace("Class Grilla");
	prop=prop||{};
	prop.x=prop.x||106;
	prop.y=prop.y||100;
	this.x=prop.x;
	this.y=prop.y;	
	this.h;
	this.w;
	this.xprop;
	this.yprop;
	
	
	this.ac=new CAAT.ActorContainer();
	this.bg=obj(uniq("bggrilla"),this.ac,"bggrilla",prop.x,prop.y);
	this.grilla=obj(uniq("grilla"),this.ac,"grilla",prop.x+43,prop.y+17);
	//this.w=this.grilla.width;
	//this.h=this.grilla.height
	this.xprop=this.grilla.width/10;
	this.yprop=this.grilla.height/10;
	
	this.getCoord =function(x,y){ //retorna las coordenadas globales al introducir coordenadas del plano, sirve para posicionar los bicharracos.
		var ref=this;
		var cor={x:0,y:0};
			cor.x=((this.xprop*(x-1))+ref.x+43)
			cor.y=(this.grilla.height-(this.yprop*(y+1)))+ref.y+17;
		return cor;
	}
	
	this.getCartesCordsNearv=function(x,y){ //retorna la cordenada del plano cartesiano mas cercana a las coordenadas globales (pueden ser las del mouse)
		//trace("getCartesCordsNearv(" + x + ", " + y + ")");
		
		if(x < this.grilla.x || x > (this.grilla.x + this.grilla.width) || y < this.grilla.y || y > (this.grilla.height + this.grilla.y))
			return undefined;
			
		var coord = {x: 0, y: 0};
		var sx=(this.grilla.width/10);
		var sy=(this.grilla.height/10);
		var posStartx = this.grilla.x;
		var posStarty = this.grilla.y;
		//trace(Math.ceil((x-posStartx)/sx),(10-Math.ceil((y-posStarty)/sy))+1);
		coord.x=Math.round((x-posStartx)/sx);
		coord.y=(10-Math.round((y-posStarty)/sy));
		return coord;
	}
	
	padre.addChild(this.ac);
}

function MenuInGame(escena){
	function clicbtn(e){
		switch(e.name){
			case "btn2": //volver
				clockController("pause");
				confirmdialog(escena,function(conf){
					if(conf){
						clockController("destroy");
						toscenaanim(1);
						game1.obj.init();	
					}
				});
				
			break;
			case "btn0": //
				//alert("El juego está en pausa");
				
				enpausa(escena);
				//play
			break;
			case "btn3": //info
				lastScena=director.scenes.indexOf(director.currentScene);
				toscenaanim(3);
			break;
			case "btn5":
				mutebtnaction(e);
			break;
		}
		trace(e);
	}
	menux=acmenu(escena,[{ix:2,fn:clicbtn},{ix:0,fn:clicbtn},{ix:3,fn:clicbtn},{ix:5,fn:clicbtn},{ix:4,fn:clicbtn}]); //siempre al top
	return menux;
}

function enpausa(escena){
					
	var h1_1=	obj("pa8a",escena,'fondo_ayuda',0,0,1,1);
	var h1_0=	obj("fost08b",escena,'en-pausa',222,137,1,1);	//222,137
	h1_0.mouseClick=function(a){
		//alert("bye pausa");
		//h1_1.mouseClick(a);
		h1_1.destroy();
		h1_0.destroy();
	}
	
	//escena.setZIndex(menux, 20);
};
function newgamelvl1(){
	trace("nuevo juego lvl 1");
	var ac=new CAAT.ActorContainer().setClip(true);
	ac.setBounds( 5,5, 1024-10,768-10 );
	var gam=acjuego(ac).obj;
	
	return ac
}
function confirmdialog(ac,cb){
	var h1_1=	obj("inst08",ac,'fondo_ayuda',0,0,1,1);	
	var h1_0=	obj("inst08",ac,'dejar_juego',222,137,1,1);	
	
	var h1_2=	btn("BTNSI" ,ac,{sprite:[spsino, 0, 0], x: 394, y:331, click:_cb}).setScale(1,1);
	var h1_3=	btn("BTNNO" ,ac,{sprite:[spsino, 1, 1], x: 394+100, y:331, click:_cb}).setScale(1,1);	
	
	function _cb(e){
		trace("0>>>>>",e);
		switch(e.name){
			case "BTNSI":
				h1_0.destroy();
				h1_1.destroy();
				h1_2.destroy(); 
				h1_3.destroy();
				cb(true);
			break;
			case "BTNNO":
				h1_0.destroy();
				h1_1.destroy();
				h1_2.destroy();
				h1_3.destroy();
				cb(false);
			break;
		}
	}
	/*placeHelper(h1_1);
	placeHelper(h1_3);*/
	//return confirm("Estas seguro que desea salir? perderás tu avance.");
}

function Etapa3(padre){
	trace("Class Etapa3");
	
	this.virgrill=[
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0]];
	
	//*** FIN DECLARACIONES ***//
	this.figuras=['figura1','figura2','figura3','figura4','figura5','figura6'];
	this.ac=new CAAT.ActorContainer().setClip(true);
	this.ac.setBounds( 5,5, 1024-10,768-10 );
	
	window.grillatmp=this.grilla=new Grilla(this.ac);
	this.enunciado=new Enunciado_e3(this.ac);

	padre.addChild(this.ac);
}



Etapa3.prototype.agregarFigura=function(){
	var figprop={
		figura1:{
			max:[7,4],
			vertices:[[0,3],[3,3],[3,0],[0,0]]
		},
		figura2:{
			max:[8,3],
			vertices:[[0,2],[2,2],[2,0],[0,0]]
		},
		figura3:{
			max:[8,3],
			vertices:[[1,2],[2,1],[1,0],[0,1]]
		},
		figura4:{
			max:[8,3],
			vertices:[[1,2],[2,1],[1,0],[0,1]]
		},
		figura5:{
			max:[8,3],
			vertices:[[0,2],[2,2],[1,0]]
		},
		figura6:{
			max:[8,3],
			vertices:[[0,2],[2,1],[0,0]]
		}
	}
	var currFig=getRandomA(this.figuras);
	//currFig="figura7";
	var x=randomInt(1,figprop[currFig].max[0]);
	var y=randomInt(figprop[currFig].max[1],10);
	var v=figprop[currFig].vertices;
	var resp={pos:[x,y]};
	resp.figura=currFig;
	resp.a=[x+v[0][0],y-v[0][1]];
	resp.b=[x+v[1][0],y-v[1][1]];
	resp.c=[x+v[2][0],y-v[2][1]];
	resp.vertices=["a","b","c"];
	if(v[3]){
		resp.d=[x+v[3][0],y-v[3][1]];	
		resp.vertices.push("d");
	}
	//obj(uniq("enunciado"),dad,"enunciado2",686,67);
	var pos=this.grilla.getCoord(x+1,y-1);
	resp.obj=obj(uniq("enunciado"),this.ac,currFig,pos.x,pos.y);
	return resp;
}
Etapa3.prototype.startIntento=function(){
	if(this.currinst!=undefined){
		for(var i in this.currinst){
			if(this.currinst[i]!=undefined)
				this.currinst[i].destroy();
		}
		
	}
	this.currinst=[];
	var currFig=this.agregarFigura();
	console.log(currFig)
	var cv=getRandomA(currFig.vertices);
	var letra=window.letra=ponerLetra({padre:this.ac,x:834,y:158},cv);
	this.currinst.push(currFig.obj);
	this.currNum1=currFig[cv][0];
	this.currNum2=currFig[cv][1];
	this.currinst.push(letra);
	console.log("respuesta:",currFig[cv]);
}
function Enunciado_e3(dad){
	this.currNum1;
	this.currNum2;
	window.enun=obj(uniq("enunciado"),dad,"enunciado2",686,67);
	var This=this;
	this.selected0=function(a){ e3.ucurrNum1=a; }
	this.selected1=function(a){ e3.ucurrNum2=a; e3.chekalvl();}
	
	this.n1=new DropDownNumeros(dad,760,280,This.selected0);
	this.n2=new DropDownNumeros(dad,854,280,This.selected1);
	
}
function DropDownNumeros(dad,x,y,cbselect){
	console.log("DropDown");
	
	//this.cancelzone=obj(uniq("cancelar"),dad,"zonasensiblefull",0,0);
	//this.cancelzone.click=function(){alert("click");}
	window.opa=this.opciones=new CAAT.ActorContainer().setClip(true);
	this.opciones.setBounds( 0,0, 200,200 );
	var CENTRADO=22;
	//TODO:
	this.onselect=cbselect;// || function(){};
	this.click=function(){
		console.log(this);
		this.parent.visible=false;
		this.parent.numero.setVal(this.valor);
		this.parent_.onselect(this.valor);
	}
	this.click0=function(){
		console.log(this);
		this.opciones.visible=true;
	}
	this.opciones.numero=this.numero=ponerNumero({padre:dad,x:x-25,y:y},0,CENTRADO,this.click0);
	this.opciones.numero.opciones=this.opciones;
	
	obj(uniq("fondod"),this.opciones,"fondodd",0,0);	
	
	(ponerNumero({padre:this.opciones,x:(35*0)-20,y:15},1,CENTRADO,this.click)).parent_=this;
	(ponerNumero({padre:this.opciones,x:(35*1)-20,y:15},2,CENTRADO,this.click)).parent_=this;
	(ponerNumero({padre:this.opciones,x:(35*2)-20,y:15},3,CENTRADO,this.click)).parent_=this;
	(ponerNumero({padre:this.opciones,x:(35*3)-20,y:15},4,CENTRADO,this.click)).parent_=this;
	(ponerNumero({padre:this.opciones,x:(35*4)-20,y:15},5,CENTRADO,this.click)).parent_=this;
	
	(ponerNumero({padre:this.opciones,x:(35*0)-20,y:55},6,CENTRADO,this.click)).parent_=this;
	(ponerNumero({padre:this.opciones,x:(35*1)-20,y:55},7,CENTRADO,this.click)).parent_=this;
	(ponerNumero({padre:this.opciones,x:(35*2)-20,y:55},8,CENTRADO,this.click)).parent_=this;
	(ponerNumero({padre:this.opciones,x:(35*3)-20,y:55},9,CENTRADO,this.click)).parent_=this;
	(ponerNumero({padre:this.opciones,x:(35*4)-20,y:55},10,CENTRADO,this.click)).parent_=this;
	//g
	this.opciones.visible=false;
	this.opciones.setPosition(x-130,y+50);
	dad.addChild(this.opciones)
}
Etapa3.prototype.chekalvl=function(){
	console.log(">",this.currNum1,this.ucurrNum1,this.currNum2,this.ucurrNum2);
	sonido.play("mostrarpanel");
	if(this.currNum1==this.ucurrNum1 && this.currNum2==this.ucurrNum2){
		logro.addLogro();
	}else{
		spashMsg("tit_intento2");
	}
	e3.startIntento();
	e3.enunciado.n1.numero.setVal(0);
	e3.enunciado.n2.numero.setVal(0);
	
	if(logro.getLvlIx()==12){
		//alert("win");
		spashMsg("tit_excelente"); 
	}
	
}