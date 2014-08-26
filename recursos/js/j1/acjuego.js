//NICO
var  texttest;
var selectglobal;
var tryFails=0;
var ultimolvl=12;
var enunciado;
var tjcolores={};
var game1;
var tienetime=false;
var gameover=false;
var currTimer,
	clock = {
		border: undefined,
		txt: undefined,
		img: undefined
	};
var finalScoreImg;

function acjuego(conten){
	var ac=new CAAT.ActorContainer();
	ac.obj={};
	game1=ac;
	
	ac.obj.fnclick=function(e){
	/*	switch(e.name){
			case "rojo":
			break;
			case "azul":
			brak;
			case "amarillo":
			break;
		}*/
		if(ac.obj.currColor==e.name){
			bueno();
		}else{
			malo();
		}
		trace("CHK CLICK >>>>",ac.obj.currColor,e.name);
		selectglobal=e;
		//tjcolores
	};
	
	ac.setBounds( 0,0, 205,240 );
	
	// No se si esto sirve
	/*var yfix=-80;
	tjcolores.tranvia= obj("fondo_tranviaa",conten,'fondo_tranvia',0,520+yfix,1,1);
	tjcolores.rojo=btn("rojo",conten,{sprite:[sptarjetacolors, 0, 0],x:141,y:278+yfix,click:ac.obj.fnclick,mouseEnter:crece,mouseExit:achica});
	tjcolores.azul=btn("azul",conten,{sprite:[sptarjetacolors, 1, 1],x:405,y:278+yfix,click:ac.obj.fnclick,mouseEnter:crece,mouseExit:achica});
	tjcolores.amarillo=btn("amarillo",conten,{sprite:[sptarjetacolors, 2, 2],x:671,y:278+yfix,click:ac.obj.fnclick,mouseEnter:crece,mouseExit:achica});
	tjcolores.reloj=acchrono(conten).setPosition(880,410);*/
	enunciado= obj("lvl1enunc",ac,'enunciado_nivel1',150,0,1,1);
	
	var text = new CAAT.TextActor().
		setFont("35px verdana").
		setText("").
		setTextAlign("center").
		setTextBaseline("bottom")
		.setPosition(510,95)
		
	texttest=text;
	console.debug(text)
	
	conten.addChild(ac);
	conten.addChild(text);
	ac.obj.randoms=["rojo","azul","amarillo"];
	
	function achica(a){
		a.source.scaleTo(1,1,.5,.5);
	}
	function crece(a){
		trace(a.source);
		a.source.scaleTo(1.1,1.1,.5,.5);
	}
	
	function updateonwin(){
		/*if(tjcolores.reloj){
			tjcolores.reloj.visible=tienetime;
		}*/
		trace("UpdateOnWin!");
		if(logro) {
			switch(logro.getLvlIx()){
				case 4:
					sonido.stop("PASAR-NIVEL");
					cambioescena(2);
					enunciado.setBackgroundImage(director.getImage("enunciado_nivel2"))
				break;
				case 8:
					sonido.stop("PASAR-NIVEL");
					cambioescena(3);
					enunciado.setBackgroundImage(director.getImage("enunciado_nivel3"))
				break;
				case 12:
					mensajeExcelente();
			}
		}
		ac.obj.currColor=getRandomA(ac.obj.randoms);
		text.setText("Selecciona el color "+ac.obj.currColor);
		//tjcolores.reloj.visible=tienetime;
	}
	ac.obj.init=function (){
		if(logro)
			logro.reset();
		gameover=false;
		updateonwin();
		enunciado.setBackgroundImage(director.getImage("enunciado_nivel1"))
		//tjcolores.reloj.visible=tienetime;
	}
	
	/*function starreloj(){
		updateonwherever();
	}*/
	
	function bueno(){
		trace("BUENO");
		tryFails=0;
		//alert("bueno");
		logro.addLogro();
		
		if(logro.getLvlIx()!=ultimolvl && logro.getLvlIx()!=4 && logro.getLvlIx()!=8)
			sonido.play("mostrarpanel")
		//musica y parafernalia
		updateonwin();
	}
	function malo(){
		trace("MALO");
		sonido.play("suma_mal")
		tryFails++;
		//alert("malo");
		if(tryFails==1){
			spashMsg("tit_intento1",function(){muestraescenario();});
		}else{
			spashMsg("tit_intento2",function(){muestraescenario();});
		}/*else{
			spashMsg("tit_intento3");
		}*/
		//parafernalia
	}
	function cambioescena(e){
		trace("Cambio escena", e);
		clockController("stop");
		sonido.play("win");
		spashMsg("tit_intento3",function(){muestraescenario();});
		updatebtnmute();
		clockController("start");
		//parafernalia
	}
	function mensajeExcelente(){
		clockController("stop");
		trace("Mensaje Excelente");
		sonido.play("EXCELENTE");
		spashMsg("tit_excelente",salirgame);
		gameover=true;
	}
	function salirgame(){
		toscenaanim(1);
		ac.obj.init();
	}
	
	ac.obj.init();
	return ac;
}

function escondeescenario(){
	for(var i in tjcolores){
		tjcolores[i].visible=false;
	}
	//tjcolores.reloj.visible=tienetime;
}

function muestraescenario(){
	for(var i in tjcolores){
		tjcolores[i].visible=true;
	}
	tjcolores.reloj.visible=tienetime;
}

function acchrono(conten){
	var ac=new CAAT.ActorContainer();
	//obj("tiempo",ac,'tiempo',0,0,1,1);
	//ac.barra=obj("tiempo_accion",ac,'tiempo_accion',59,47,1,1);
	
	conten.addChild(ac);
	return ac;
}

function startClock(cdt) {
	trace("Starting clock.", escenajuego);
	
	if(escenajuego !== undefined) {
		// clockBorder -190, -100 - timerTxt -130, 0
		if(tienetime) {
			setCountdown(cdt);
		} else {
			setTimer();
		}
	}
}

function setCountdown(cdt) {
	trace("CountDown!");
	if(!currTimer) {
		currTimer = new CountDown({
			delay: 1000/6,
			onTick: function(time) {
				clock.txt.setText(currTimer.format(time));
				var degrree=Math.floor((time/(cdt*1000))*360/60)+1;
				//console.log((time/(cdt*1000)),degrree,time,cdt);
				if(degrree>=360)
					degrree=359; //fix error 
					
				clock.progress.getActor().backgroundImage.spriteIndex=degrree;
				if(typeof(clock.progress.getActor().parent)!="undefined") sube(clock.progress.getActor().parent)
			},
			onStop: onTimeOver || function(time) {
				// Game end.
				console.warn("Time over method not implemented!");
				trace("The game should reset!");
				//logro.calculateScoreFromTime(time);
			}
		})
		currTimer.start(cdt);
	} else if(currTimer.isRunning()) {
		currTimer.stop().reset().start(cdt);
	}
}
function setTimer() {
	trace("Timer!");
	if(!currTimer) {
		currTimer = new Timer({
			delay: 1000/6,
			onTick: function(time) {
				//console.log(Math.floor(time/1000));
				clock.txt.setText(currTimer.format(time));
				
				
				if(clock.progress.getActor().backgroundImage.spriteIndex<0 || Math.floor(time/1000)<=0) 
					clock.progress.getActor().backgroundImage.spriteIndex=360;
				clock.progress.getActor().backgroundImage.spriteIndex--;
				if(typeof(clock.progress.getActor().parent)!="undefined") sube(clock.progress.getActor().parent)
			},
			onStop: function(time) {
				trace("Clock stopped!", time);
				logro.calculateScoreFromTime(time);
			}
		});
		currTimer.start();
	} else if(currTimer.isRunning()) {
		currTimer.stop().reset().start();
	}
}

function endaa(){
	if(!gameover){
		gameover=true;
		spashMsg("tit_intento3");
	}
}

function showFinalScore(container) {
	var bg = new CAAT.ActorContainer()
			.setPosition(0, 0)
			.setBounds(491, 259)
			.setBackgroundImage(director.getImage("bgScore")),
		scoreTxt = new TextActor()
			.setFont("24px sans-serif")
			.setTextAlign("right")
			.setTextBaseline("bottom")
			.setPosition(100, 100)
			.setText(currScore.toString());
		
	bg.addChild(scoreTxt);
	container.addChild(bg);
}