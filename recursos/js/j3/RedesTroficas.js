var timae=Math.random();
var currLevel=1;
var avisostimeout=["tit_intento1","tit_intento2"];
var avisoindex=0;
function avisoTO(){
	
	spashMsg(avisostimeout[avisoindex]);
	sonido.play("TIME_OVER");
	avisoindex++;
	if(avisoindex>=avisostimeout.length){
		avisoindex=0;
	}
}

function onTimeOver(time) {
	//alert("Time's upa!"+time);
	//logro.reset();
	if(time==0){
		 sonido.play("timeout");
		if(logro.getLvlIx()<4){
			while(logro.getLvlIx()>0){
				logro.removeLogro();
			}
			avisoTO();
		}else if(logro.getLvlIx()<8){
			while(logro.getLvlIx()>4){
				logro.removeLogro();
			}
			avisoTO();
		}else{
			while(logro.getLvlIx()>8){
				logro.removeLogro();
			}
		}
		clockController("init");
	}
}
function Play(ac){
	currLevel=1;
	timae=Math.random();
	this.e1=new Escena(ac,"e1",this);
	this.e2=new Escena(ac,"e2",this);
	this.e3=new Escena(ac,"e3",this);
	this.e4=new Escena(ac,"e4",this);
	this.e5=new Escena(ac,"e5",this);
	this.e6=new Escena(ac,"e6",this);
	
	this.e7=new Escena(ac,"e7",this);
	this.e8=new Escena(ac,"e8",this);
	this.e9=new Escena(ac,"e9",this);
	
	this.escenas=[this.e1,this.e2,this.e3,this.e4,this.e5,this.e6,this.e7,this.e8,this.e9];
	
	this.e1.currRed.armar (getRandomA("redesrnd"+timae,redescfg));
	this.e2.currRed.armar (getRandomA("redesrnd"+timae,redescfg));
	this.e3.currRed.armar (getRandomA("redesrnd"+timae,redescfg));
	this.e4.currRed.armar1(getRandomA("redesrnd"+timae,redescfg));
	this.e5.currRed.armar1(getRandomA("redesrnd"+timae,redescfg));
	this.e6.currRed.armar1(getRandomA("redesrnd"+timae,redescfg));
	
	this.e7.currRed.armar2(getRandomA("redesrnd"+timae,redescfg));
	this.e8.currRed.armar2(getRandomA("redesrnd"+timae,redescfg));
	this.e9.currRed.armar2(getRandomA("redesrnd"+timae,redescfg));
	
	this.siguiente=function(){
	
		console.log("levl=",logro.getLvlIx());
		if(logro.getLvlIx()<3){
			redes.viewEscena(logro.getLvlIx())
		}else if(logro.getLvlIx()<6){
			redes.viewEscena(logro.getLvlIx())
		}else if(logro.getLvlIx()<9){
			redes.viewEscena(logro.getLvlIx())
		}else{
		}
		switch(logro.getLvlIx()){
            case 3:
				if(currLevel!=2){
					currLevel=2;
					sonido.play("PASAR-NIVEL");
					clockController("stop");
					spashMsg("tit_intento3",function(){clockController("init"); },false);
				}
				return false;
            	break;
            case 6:
				if(currLevel!=3){
					currLevel=3
					clockController("stop");
					sonido.play("PASAR-NIVEL");
					spashMsg("tit_intento3",function(){ clockController("init"); },false);
					return false;
				}
            	break;
            case 9:
				clockController("stop");
				clockController("destroy");  
				sonido.play("EXCELENTE",function(){ if(!bgmusic.setVolume(.5)) bgmusic.setMute(false);},1);
				spashMsg("tit_excelente",function(){pantallaGameOver(currScore)},false);		
				return false;
				break;
        }
	}
	
	this.e1.mecanica();
	this.e2.mecanica();
	this.e3.mecanica();
	this.viewEscena(0);
	//window.flechauniversal=new FlechaAtoB(ac,{x:200,y:200},{x:200,y:200});

}

function Red(eta,name){
	this.name=name
	this.etapa=eta;
	this.donde=eta.ac;
	this.enunciado;
	this.fondo;
	this.seres;
	this.currSeres;
	this.contenedores;
	this.conecciones=[];
	this.onDrop=function(){};
}

function Escena(ac,name,juego){
	
	trace("Escena",name);
	this.juego=juego;
	this.name=name;
	this.ac=new CAAT.ActorContainer()
	this.ac.setBounds(0,0,1024,768);
	this.ac.setClip(true);
	this.currRed=new Red(this,name);
	ac.addChild(this.ac);
	
}



//** protos  **//

//Play
Play.prototype.viewEscena=function(id){
	var arr=this.escenas;
	for(var g in arr){
		arr[g].ac.visible=false
	}
	var sel=arr[id];
	sel.ac.visible=true;
	return sel;
}

//Red:
Red.prototype.armar=function(cfg){
	
	this.cfg=cfg;
	console.log("# >",this);
	console.log("Armando",this.cfg,this.donde);
	this.inst={};
	this.inst.fondo=obj(uniq("fondo"),this.donde,this.cfg.fondo,0,0);	
	this.flechas=new CAAT.ActorContainer();
	this.flechas.setBounds(0,0,1,1)
	this.donde.addChild(this.flechas);
	obj(uniq("enunciaedo"),this.donde,"enunciae1",161,30); 
	window.conjunto=obj(uniq("conjuntoCirculos"),this.donde,"conjunto-circulos",157,171);
	this.nodos=[];
	this.seresPorGrupo={};
	
	//poner contenedores (nodos)
	
	for(var i in this.cfg.contenedores){
		var cont=this.cfg.contenedores[i];
		console.log("contenedor Z>",cont);
		var nodo=obj(uniq("nodis"),this.donde,"circulo",cont.xpos,cont.ypos);
		nodo.coneccion=cont.coneccion;
		
		//cont.obj=nodo;
		//console.log("abc=",i);
		nodo.grupo=i.charAt(0);
		
		this.nodos=this.nodos||[];
		this.nodos.push(nodo);
		//this.nodos.push(nodo);
	}
	
	//une nodos
	for (var i in this.nodos){
		this.nodos[i].next=[];
		for (var ja in this.nodos[i].coneccion){
			 this.nodos[i].next.push(this.cfg.contenedores[ this.nodos[i].coneccion[ja]]);
			// this.nodos[i].grupo=this.nodos[i].coneccion[ja];
			 
		}
	}
	window.n=window.n||{};
	window.n[this.name]=this.nodos;

	
	
	this.seres=[];
	this.sprtanimalesRedes = getsprt("especies", 12, 6);
	var This=this;
	this.dragin=function(e) {
		var droppedOn = checkDrop(e,this.papi.nodos);
		console.log("drop",this);
		if(droppedOn != false){// && droppedOn.hasElement == false) {
			e.dropsOn = droppedOn;
			droppedOn.hasElement = true;
			if(e.dropsOn.current!=undefined)
				e.source.volver();
			else
				e.dropsOn.current=e.source;
			e.source.x = e.dropsOn.x - 6;
			e.source.y = e.dropsOn.y - 7;
			
			this.papi.onDrop(e);
			
		} else {
				trace("VOLVER");
				window.volve=e.source;
				e.source.volver.call(e.source);
		}
		
	}
	
	//las Flechas:
	for(var ix in this.nodos){
		for(var ixa in this.nodos[ix].next){
			if(this.nodos[ix].next[ixa]!=undefined){
				var poscent1={x:this.nodos[ix].x+this.nodos[ix].width/2, y:this.nodos[ix].y+(this.nodos[ix].height/2)}
				var poscent2={
					x:this.nodos[ix].next[ixa].xpos+this.nodos[ix].width/2, 
					y:this.nodos[ix].next[ixa].ypos+(this.nodos[ix].height/2)}//this.nodos[ix].next[ixa].obj
				console.log("creando Flecha",poscent1,poscent2);
				new FlechaAtoB(this.donde,poscent1,poscent2);
			}
		}
	}
	
	
	
	//instancia fichas
	for(var grup in this.cfg.seresGrupo){
		var ga =this.cfg.seresGrupo[grup];
		for(var f in ga){
			var tmp=btn(uniq("ser"),this.donde,{sprite:[this.sprtanimalesRedes, ga[f]+(this.cfg.spriteRow*12), ga[f]+(this.cfg.spriteRow*12)],x:0,y:0/*,click:ac.obj.fnclick,mouseEnter:crece,mouseExit:achica*/});
			tmp.papi=this;
			tmp.grupo=grup;
			this.seresPorGrupo[grup]=this.seresPorGrupo[grup]||[];
			this.seresPorGrupo[grup].push(tmp);
			tmp.visible=false;
			this.seres.push(tmp);
		}
	}
	window.seress=this.seres;
	if(!this.seresPorGrupo){
		console.error("WTF");
	}
	
	
	
	//posiciona fichas
	this.currFichas=[];
	for(var grup in this.cfg.contenedores){
		console.log("///////",this.etapa.name);
		var nya=getRandomA(this.etapa.name+"anim"+grup.charAt(0)+timae,this.seresPorGrupo[grup.charAt(0)]);
		if(nya==undefined || nya=="") 
		console.error("posiblemente problema con confRedes.js");
		this.currFichas.push(nya);
	}
	console.log("ubicando;:",this.currFichas);
	var ika=0;
	//poner distractores
	var ix=(this.cfg.spriteRow*12)+8;
	this.distractores=[
			btn(uniq("serDistra"),this.donde,{sprite:[this.sprtanimalesRedes, ix,ix],x:0,y:0}),
			btn(uniq("serDistra"),this.donde,{sprite:[this.sprtanimalesRedes, ix+1,ix+1],x:0,y:0}),
			btn(uniq("serDistra"),this.donde,{sprite:[this.sprtanimalesRedes, ix+2,ix+2],x:0,y:0}),
			btn(uniq("serDistra"),this.donde,{sprite:[this.sprtanimalesRedes, ix+3,ix+3],x:0,y:0})
			];
	for(var j in this.distractores){
		this.distractores[j].papi=this;
		this.distractores[j].isDistractor=true;
		this.distractores[j].visible=false;
	}
	
	for(var hj=0; this.currFichas.length<6; hj++){
		var ix=(this.cfg.spriteRow*12)+8+hj;
		var tmp=getRandomA("distact"+this.name+timae,this.distractores);
		tmp.visible=true;
		this.currFichas.push(tmp);
		
	}
	//habilitar fichas
	for(var j in this.currFichas){
		addDragNDrop(this.currFichas[j],
				function(e) {
					this.setScale(.9, .9);
					for(var g in this.papi.nodos){
						this.papi.nodos[g].current=this.papi.nodos[g].current||undefined;
						if(this==this.papi.nodos[g].current){
							this.papi.nodos[g].current=undefined;
						}
					}
				},
				this.dragin,
				function(e){
				}
			);
		this.currFichas[j].setPosition(138+(129*j),160);
		//setoriginalpos(this.currFichas[j]);
		this.currFichas[j].visible=true;
		ika++;
	}
	//desordenar fichas
	intercambiarPosicionesRand(this.currFichas);
}
function inabilitareventos(source){
	source.mouseDown=function(){};
	source.mouseDrag=function(){};
	source.mouseUp=function(){};
	source.inabil=true;
}
Escena.prototype.mecanica=function(){
	this.currRed.onDrop=function(owo){
		console.log("VALIDAR",owo,this);
		if(!owo.source.isDistractor && (owo.dropsOn.grupo.charAt(0)==owo.source.grupo.charAt(0))){
			//logro.addLogro()
			var listo=true;
			//owo.source
			inabilitareventos(owo.source);
			for(var k in this.nodos){
				console.log("chekuing",this.nodos[k].current,k);
				listo&=(this.nodos[k].current!=undefined);
			}
			if(listo){
				logro.addLogro();
				var This=this;
				//clockController("stop");
				setTimeout(function(){
					This.etapa.juego.siguiente();
				}, 1);
				
				//spashMsg("tit_excelente",this.etapa.juego.siguiente);
				//if(logro.getLvlIx())
				//this=new Escena(ac,"e1");
				//();
			}
		}else{
			//if(owo.dropsOn.current!=owo.source){
				
			//}
			if(owo.dropsOn.current==undefined || owo.dropsOn.grupo==undefined || owo.dropsOn.current.grupo==undefined || owo.dropsOn.grupo.charAt(0)!=owo.dropsOn.current.grupo.charAt(0)){
			 owo.dropsOn.current=undefined;
			}
			
			owo.source.volver();
			//if(!owo.dropsOn.current.inabil)
			
			logro.wrongAnswer()
		}
	}
}


//Red1:
Red.prototype.armar1=function(cfg){
	this.cfg=cfg;
	console.log("# >",this);
	console.log("Armando",this.cfg,this.donde);
	
	this.inst={};
	this.inst.fondo=obj(uniq("fondo"),this.donde,this.cfg.fondo,0,0);	
	obj(uniq("enunciaedo1"),this.donde,"enunciae2",161,20); 
	this.flechas=new CAAT.ActorContainer();
	this.flechas.setBounds(0,0,1,1)
	this.donde.addChild(this.flechas);
	this.nodos=[];
	this.seresPorGrupo={};
	
	//poner contenedores (nodos)
	for(var i in this.cfg.contenedores){
		var cont=this.cfg.contenedores[i];
		console.log("contenedor Z>",cont);
		var nodo=obj(uniq("nodis"),this.donde,"circulo",cont.xpos,cont.ypos);
		nodo.coneccion=cont.coneccion;
		//cont.obj=nodo;
		//console.log("abc=",i);
		nodo.grupo=i.charAt(0);
		
		this.nodos=this.nodos||[];
		this.nodos.push(nodo);
		//this.nodos.push(nodo);
	}
	//window.nodos=this.nodos;
	

	
	
	this.seres=[];
	this.sprtanimalesRedes = getsprt("especies", 12, 6);
	var This=this;
	this.dragin=function(e) {
		var droppedOn = checkDrop(e,this.papi.nodos);
		console.log("drop",this);
		if(droppedOn != false){// && droppedOn.hasElement == false) {
			e.dropsOn = droppedOn;
			droppedOn.hasElement = true;
			if(e.dropsOn.current!=undefined){ 
				e.source.volver();
			}else{
				e.dropsOn.current=e.source;
			}
			e.source.x = e.dropsOn.x - 6;
			e.source.y = e.dropsOn.y - 7;
			
			this.papi.onDrop(e);
			
		} else {
				trace("VOLVER");
				window.volve=e.source;
				e.source.volver.call(e.source);
		}
	
	}
	
	//las Flechas:
	/*for(var ix in this.nodos){
		for(var ixa in this.nodos[ix].next){
			if(this.nodos[ix].next[ixa]!=undefined){
				var poscent1={x:this.nodos[ix].x+this.nodos[ix].width/2, y:this.nodos[ix].y+(this.nodos[ix].height/2)}
				var poscent2={x:this.nodos[ix].next[ixa].obj.x+this.nodos[ix].next[ixa].obj.width/2, y:this.nodos[ix].next[ixa].obj.y+(this.nodos[ix].next[ixa].obj.height/2)}//this.nodos[ix].next[ixa].obj
				console.log("creando Flecha",poscent1,poscent2);
				new FlechaAtoB(this.donde,poscent1,poscent2);
			}
		}
	}*/
	
	
	
	//instancia fichas
	for(var grup in this.cfg.seresGrupo){
		var ga =this.cfg.seresGrupo[grup];
		for(var f in ga){

			var tmp=btn(uniq("ser"),this.donde,{sprite:[this.sprtanimalesRedes, ga[f]+(this.cfg.spriteRow*12), ga[f]+(this.cfg.spriteRow*12)],x:0,y:0/*,click:ac.obj.fnclick,mouseEnter:crece,mouseExit:achica*/});
			tmp.papi=this;
			tmp.grupo=grup;
			this.seresPorGrupo[grup]=this.seresPorGrupo[grup]||[];
			this.seresPorGrupo[grup].push(tmp);
			tmp.visible=false;
			this.seres.push(tmp);
		}
	}
	
	if(!this.seresPorGrupo){
		console.error("WTF");
	}
	
	//une nodos
	for (var i in this.nodos){
		this.nodos[i].next=[];
		for (var ja in this.nodos[i].coneccion){
			 this.nodos[i].next.push(this.cfg.contenedores[ this.nodos[i].coneccion[ja]]);			 
		}
	}
	window.n=window.n||{};
	window.n[this.name]=this.nodos;
	
	//posiciona fichas
	this.currFichas=[];
	for(var grup in this.cfg.contenedores){
		console.log("///////",this.etapa.name);
		var nya=getRandomA(this.etapa.name+"anim"+grup.charAt(0)+timae,this.seresPorGrupo[grup.charAt(0)]);
		if(nya==undefined || nya=="") 
		console.error("posiblemente problema con confRedes.js");
		for(var ja in this.nodos){
			if(this.nodos[ja].grupo==nya.grupo){
				if(this.nodos[ja].current==undefined){
					this.nodos[ja].current=nya
					nya.nodo=this.nodos[ja];
					nya.x=this.nodos[ja].x;
					nya.y=this.nodos[ja].y;
					break;
				}
			}
			//aqui vamos!
			this.nodos[ja].next_=this.nodos[ja].next;
			this.nodos[ja].next	=[];
			
			console.log(this.nodos[ja].coneccion);
			
		}
		for(var ja in this.nodos){
			for(var ji in this.nodos){
				for(var la in this.nodos[ja].coneccion){
					if(this.nodos[ji].grupo.charAt(0)==this.nodos[ja].coneccion[la].charAt(0)){
						this.nodos[ja].next=this.nodos[ja].next||[];
						
						if(this.nodos[ja].next.indexOf(this.nodos[ji])<0){
							this.nodos[ja].next.push(this.nodos[ji]);
						}
					}
				}
			}
		}
		this.currFichas.push(nya);
	}
	console.log("this.nodos",this.nodos);
	
	var fichas=this.currFichas;
	console.log("ubicando;:",this.currFichas);
	var ika=0;
	var ix=(this.cfg.spriteRow*12)+8;
	var This=this;
	this.conecciones=[];
	for(var j in this.currFichas){
		this.currFichas[j].mouseDown=function(e){
										console.log("down",this,e);
										e.source._flecha=true; 
									}
		this.currFichas[j].mouseDrag=function(e){
										if(e.source._flecha){
											e.source.flecha=e.source.flecha||new FlechaAtoB(This.donde,{x:this.x+(this.width),y:this.y+(this.height/2)},{x:this.x+(this.width),y:this.y+(this.height/2)},60);
										}
										console.log("draging");  
										e.source.flecha.p1(this.x+(this.width/2),this.y+(this.height/2));
										e.source.flecha.p2(e.screenPoint.x,e.screenPoint.y);
										e.source.flecha.update();
									};
		this.currFichas[j].mouseUp  =function(e){
									
										var up=checkDrop(e,This.currFichas);
										var ina=e.source;
										var toa=up;
										console.log("jo>",up,e,This.currFichas,This.name);
										console.log(ina);
										
										var bueno;
										if(toa!=false){
											bueno=true;
										}else{
											bueno=false;
										}
										var oka=false;
										console.log("°°°°°°°°°°°°°°°°°°°°",This.name,This.nodos);
										for(var j in This.nodos){
											console.log(This.nodos[j].name);
										}
										
										if(bueno)
										for(var g in ina.nodo.next){
											console.log(">",ina.nodo.next[g],toa.nodo);
											
											if(ina.nodo.next[g]==toa.nodo){
												This.conecciones=This.conecciones||[];
												This.coneccioneshs=This.coneccioneshs||[];
													
												var hash=ina.name+" --> "+toa.name;
												if(This.coneccioneshs.indexOf(hash)<0){
													oka=true;
													
													This.coneccioneshs.push(hash);
													This.conecciones.push({a:ina,b:toa});
													break;
												}
											}
										}
										console.log("OKA=",oka);
										bueno&=oka;
										
										if(e.source.flecha!=undefined && (up==false || up==e.source || !bueno)){
											e.source.flecha.contenedor.destroy();
											e.source.flecha=undefined;
											e.source._flecha=false;
											console.log("end");
										}else{
											e.source.flecha.p2(up.x+(up.width/2),up.y+(up.height/2));
											e.source.flecha.update();
											e.source.fls=e.source.fls||[];
											e.source.fls.push(e.source.flecha);
											e.source.flecha=undefined;
											e.source._flecha=false;
										}
										console.log("This.conecciones",This.conecciones);
										console.log("This.coneccioneshs",This.coneccioneshs);
										This.chequea1();
									};
		this.currFichas[j].visible=true;
		ika++;
	}
	//desordenar fichas
	//intercambiarPosicionesRand(this.currFichas);
 
	/*
*/
	//this.menu=new MenuInGame(this.donde);
	window.nodos=this.nodos;
}




Red.prototype.armar2=function(cfg){
	this.cfg=cfg;
	console.log("# >",this);
	console.log("Armando",this.cfg,this.donde);
	
	this.inst={};
	this.inst.fondo=obj(uniq("fondo"),this.donde,this.cfg.fondo,0,0);	
	this.flechas=new CAAT.ActorContainer();
	this.flechas.setBounds(0,0,1,1)
	obj(uniq("enunciaedo2"),this.donde,"enunciae3",161,30); 
	window.conjunto=obj(uniq("conjuntoCirculos"),this.donde,"conjunto-circulos",157,171);
	this.donde.addChild(this.flechas);
	this.nodos=[];
	this.seresPorGrupo={};
	
	//poner contenedores (nodos)
	for(var i in this.cfg.contenedores){
		var cont=this.cfg.contenedores[i];
		console.log("contenedor Z>",cont);
		var nodo=obj(uniq("nodis"),this.donde,"circulo",cont.xpos,cont.ypos);
		nodo.coneccion=cont.coneccion;
		//cont.obj=nodo;
		//console.log("abc=",i);
		nodo.grupo=i.charAt(0);
		
		this.nodos=this.nodos||[];
		this.nodos.push(nodo);
		//this.nodos.push(nodo);
	}
	//window.nodos=this.nodos;
	

	
	
	this.seres=[];
	this.sprtanimalesRedes = getsprt("especies", 12, 6);
	var This=this;
	this.dragin=function(e) {
		var droppedOn = checkDrop(e,this.papi.nodos);
		console.log("drop",this);
		if(droppedOn != false){// && droppedOn.hasElement == false) {
			e.dropsOn = droppedOn;
			droppedOn.hasElement = true;
			if(e.dropsOn.current!=undefined){ 
				e.source.volver();
			}else{
				inabilitareventos(e.source);
				This.ahoraFlecha(this);
				e.dropsOn.current=e.source;
			}
			e.source.x = e.dropsOn.x - 6;
			e.source.y = e.dropsOn.y - 7;
			
			this.papi.onDrop(e);
			
			e.source.hacelineas=true;
			
		} else {
				trace("VOLVER");
				window.volve=e.source;
				e.source.volver.call(e.source);
		}
		
	}
	
	//las Flechas:
	/*for(var ix in this.nodos){
		for(var ixa in this.nodos[ix].next){
			if(this.nodos[ix].next[ixa]!=undefined){
				var poscent1={x:this.nodos[ix].x+this.nodos[ix].width/2, y:this.nodos[ix].y+(this.nodos[ix].height/2)}
				var poscent2={x:this.nodos[ix].next[ixa].obj.x+this.nodos[ix].next[ixa].obj.width/2, y:this.nodos[ix].next[ixa].obj.y+(this.nodos[ix].next[ixa].obj.height/2)}//this.nodos[ix].next[ixa].obj
				console.log("creando Flecha",poscent1,poscent2);
				new FlechaAtoB(this.donde,poscent1,poscent2);
			}
		}
	}*/
	
	
	
	//instancia fichas
	for(var grup in this.cfg.seresGrupo){
		var ga =this.cfg.seresGrupo[grup];
		for(var f in ga){

			var tmp=btn(uniq("ser"),this.donde,{sprite:[this.sprtanimalesRedes, ga[f]+(this.cfg.spriteRow*12), ga[f]+(this.cfg.spriteRow*12)],x:0,y:0/*,click:ac.obj.fnclick,mouseEnter:crece,mouseExit:achica*/});
			tmp.papi=this;
			tmp.grupo=grup;
			this.seresPorGrupo[grup]=this.seresPorGrupo[grup]||[];
			this.seresPorGrupo[grup].push(tmp);
			tmp.visible=false;
			this.seres.push(tmp);
		}
	}
	
	if(!this.seresPorGrupo){
		console.error("WTF");
	}
	
	//une nodos
	for (var i in this.nodos){
		this.nodos[i].next=[];
		for (var ja in this.nodos[i].coneccion){
			 this.nodos[i].next.push(this.cfg.contenedores[ this.nodos[i].coneccion[ja]]);			 
		}
	}
	window.n=window.n||{};
	window.n[this.name]=this.nodos;
	
	//posiciona fichas
	this.currFichas=[];
	for(var grup in this.cfg.contenedores){
		console.log("///////",this.etapa.name);
		var nya=getRandomA(this.etapa.name+"anim"+grup.charAt(0)+timae,this.seresPorGrupo[grup.charAt(0)]);
		if(nya==undefined || nya=="") 
		console.error("posiblemente problema con confRedes.js");
		for(var ja in this.nodos){
			if(this.nodos[ja].grupo==nya.grupo){
				if(this.nodos[ja].current==undefined){
					this.nodos[ja].current=nya
					nya.nodo=this.nodos[ja];
					//nya.x=this.nodos[ja].x;
					//nya.y=this.nodos[ja].y;
					break;
				}
			}
			//aqui vamos!
			this.nodos[ja].next_=this.nodos[ja].next;
			this.nodos[ja].next	=[];
			
			console.log(this.nodos[ja].coneccion);
			
		}
		for(var ja in this.nodos){
			for(var ji in this.nodos){
				for(var la in this.nodos[ja].coneccion){
					if(this.nodos[ji].grupo.charAt(0)==this.nodos[ja].coneccion[la].charAt(0)){
						this.nodos[ja].next=this.nodos[ja].next||[];
						
						if(this.nodos[ja].next.indexOf(this.nodos[ji])<0){
							this.nodos[ja].next.push(this.nodos[ji]);
						}
					}
				}
			}
		}
		this.currFichas.push(nya);
	}
	console.log("this.nodos",this.nodos);
	
	var fichas=this.currFichas;
	console.log("ubicando;:",this.currFichas);
	var ika=0;
	var ix=(this.cfg.spriteRow*12)+8;
	var This=this;
	this.conecciones=[];
	for(var j in this.currFichas){
		this.currFichas[j].mouseDown=function(e){
										console.log("down",this,e);
										e.source._flecha=true; 
									}
		this.currFichas[j].mouseDrag=function(e){
										if(e.source._flecha){
											e.source.flecha=e.source.flecha||new FlechaAtoB(This.donde,{x:this.x+(this.width),y:this.y+(this.height/2)},{x:this.x+(this.width),y:this.y+(this.height/2)},60);
										}
										console.log("draging");  
										e.source.flecha.p1(this.x+(this.width/2),this.y+(this.height/2));
										e.source.flecha.p2(e.screenPoint.x,e.screenPoint.y);
										e.source.flecha.update();
									};
		this.currFichas[j].mouseUp  =function(e){
									
										var up=checkDrop(e,This.currFichas);
										var ina=e.source;
										
										var toa=up;
										console.log("jo>",up,e,This.currFichas,This.name);
										console.log(ina);
										
										var bueno;
										if(toa!=false){
											bueno=true;
										}else{
											bueno=false;
										}
										var oka=false;
										console.log("°°°°°°°°°°°°°°°°°°°°",This.name,This.nodos);
										for(var j in This.nodos){
											console.log(This.nodos[j].name);
										}
										
										if(bueno)
										for(var g in ina.nodo.next){
											console.log(">",ina.nodo.next[g],toa.nodo);
											
											if(ina.nodo.next[g]==toa.nodo){
												This.conecciones=This.conecciones||[];
												This.coneccioneshs=This.coneccioneshs||[];
													
												var hash=ina.name+" --> "+toa.name;
												if(This.coneccioneshs.indexOf(hash)<0){
													oka=true;
													
													This.coneccioneshs.push(hash);
													This.conecciones.push({a:ina,b:toa});
													break;
												}
											}
										}
										console.log("OKA=",oka);
										bueno&=oka;
										
										if(e.source.flecha!=undefined && (up==false || up==e.source || !bueno)){
											e.source.flecha.contenedor.destroy();
											e.source.flecha=undefined;
											e.source._flecha=false;
											console.log("end");
										}else{
											e.source.flecha.p2(up.x+(up.width/2),up.y+(up.height/2));
											e.source.flecha.update();
											e.source.fls=e.source.fls||[];
											e.source.fls.push(e.source.flecha);
											e.source.flecha=undefined;
											e.source._flecha=false;
										}
										console.log("This.conecciones",This.conecciones);
										console.log("This.coneccioneshs",This.coneccioneshs);
										This.chequea1();
									};
		this.currFichas[j].visible=true;
		ika++;
	}
	//habilitar fichas
	for(var j in this.currFichas){
		addDragNDrop(this.currFichas[j],
				function(e) {
					if(this.hacelineas==true){
					
					}else{
						this.setScale(.9, .9);
						for(var g in this.papi.nodos){
							this.papi.nodos[g].current=this.papi.nodos[g].current||undefined;
							if(this==this.papi.nodos[g].current){
								this.papi.nodos[g].current=undefined;
							}
						}
					}
				},
				this.dragin,
				function(e){
					
				}
			);
		this.currFichas[j].setPosition(138+(129*j),160);
		//setoriginalpos(this.currFichas[j]);
		this.currFichas[j].visible=true;
		ika++;
	}
	//desordenar fichas
	intercambiarPosicionesRand(this.currFichas);
	window.nodos=this.nodos;
	
	//pongo el menú
	
}
Red.prototype.chequea1=function(){
	console.log("CHEQUEADNDODOODO!!")
	this.conecciones=this.conecciones||[];
	this.coneccioneshs=this.coneccioneshs||[];
	var totalConecciones=0;
	for(var g in this.cfg.contenedores){
		totalConecciones+=this.cfg.contenedores[g].coneccion.length;
	}
	console.log(totalConecciones,this.conecciones.length,this.coneccioneshs.length);
	if(totalConecciones==this.conecciones.length){
		logro.addLogro();
		
		var This=this;
		setTimeout(function(){
			This.etapa.juego.siguiente();
		}, 2000);
	}
	
}
Red.prototype.ahoraFlecha=function(src){
	var This=this;
		src.mouseDown=function(e){
						console.log("down",this,e);
						e.source._flecha=true; 
					}
		src.mouseDrag=function(e){
						if(e.source._flecha){
							e.source.flecha=e.source.flecha||new FlechaAtoB(This.donde,{x:this.x+(this.width),y:this.y+(this.height/2)},{x:this.x+(this.width),y:this.y+(this.height/2)},60);
						}
						console.log("draging");  
						e.source.flecha.p1(this.x+(this.width/2),this.y+(this.height/2));
						e.source.flecha.p2(e.screenPoint.x,e.screenPoint.y);
						e.source.flecha.update();
					};
		src.mouseUp  =function(e){
									
						var up=checkDrop(e,This.currFichas);
						var ina=e.source;

						var toa=up;
						console.log("jo>",up,e,This.currFichas,This.name);
						console.log(ina);

						var bueno;
						if(toa!=false){
							bueno=true;
						}else{
							bueno=false;
						}
						var oka=false;
						console.log("°°°°°°°°°°°°°°°°°°°°",This.name,This.nodos);
						for(var j in This.nodos){
							console.log(This.nodos[j].name);
						}

						if(bueno)
						for(var g in ina.nodo.next){
							console.log(">",ina.nodo.next[g],toa.nodo);

							if(ina.nodo.next[g]==toa.nodo){
								This.conecciones=This.conecciones||[];
								This.coneccioneshs=This.coneccioneshs||[];

								var hash=ina.name+" --> "+toa.name;
								if(This.coneccioneshs.indexOf(hash)<0){
									oka=true;

									This.coneccioneshs.push(hash);
									This.conecciones.push({a:ina,b:toa});
									break;
								}
							}
						}
						console.log("OKA=",oka);
						bueno&=oka;

						if(e.source.flecha!=undefined && (up==false || up==e.source || !bueno)){
							e.source.flecha.contenedor.destroy();
							e.source.flecha=undefined;
							e.source._flecha=false;
							console.log("end");
						}else{
							e.source.flecha.p2(up.x+(up.width/2),up.y+(up.height/2));
							e.source.flecha.update();
							e.source.fls=e.source.fls||[];
							e.source.fls.push(e.source.flecha);
							e.source.flecha=undefined;
							e.source._flecha=false;
						}
						console.log("This.conecciones",This.conecciones);
						console.log("This.coneccioneshs",This.coneccioneshs);
						This.chequea1();
					};
}