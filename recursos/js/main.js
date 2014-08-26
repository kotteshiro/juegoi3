var rebote=new CAAT.Interpolator().createBounceOutInterpolator(0,false);
var lastScena;
var onloadimgs=function() {
	loading ? loading() : null;
			  // save loaded resources on Director.
	//director.setImagesCache(images);
	spmodos= new CAAT.SpriteImage().initialize(director.getImage('modos'), 2, 2);
	spiconos= new CAAT.SpriteImage().initialize(director.getImage('iconos_comandos'), 2, 7);
	spicnsoc= new CAAT.SpriteImage().initialize(director.getImage('iconos_socialesplus'), 2, 6);
	splogogly= new CAAT.SpriteImage().initialize(director.getImage('logogly'));
	spminilogros= new CAAT.SpriteImage().initialize(director.getImage('barra_logros'),3,24);
	sptarjetacolors= new CAAT.SpriteImage().initialize(director.getImage('colors'),1,3);
	spsino= new CAAT.SpriteImage().initialize(director.getImage('sino'),1,2);
	
	for(var i in funciones){ 
		funciones[i].sc=director.createScene();
		funciones[i].sc.getAll=function(){
			var arr=[];
			for(var i in this.instancias){
				arr.push(this.instancias[i]);
			}
			return arr;
		};
		funciones[i].cb(funciones[i].sc);
	}
	//toscenaanim(2) //removethis
}
var spmodos;
var spiconos;
var splogogly;


function clockController(action){
	//tjcolores.reloj=tjcolores.reloj || {}
	//tjcolores.reloj.visible=tienetime;
	var posa={x:0,y:583};
	var conten=new CAAT.ActorContainer().setClip(false);//escenajuego;//
	window.contnrelog=conten;
	conten.setBounds( posa.x, posa.y, 142,190);
	var cdt = 10;
	
	if(typeof countDownTime !== "undefined")
		cdt = countDownTime;
	
	if(clock.border == undefined)
		clock.border = obj("clockBorder", conten, "clockBorder", 30, 0, 1, 1);
	
	if(clock.progress == undefined){
		var prsp= new CAAT.SpriteImage().initialize(director.getImage('relojanim'),10,36);
		var sec=[];
		for(var i=0;i<360;i++){ sec.push(i); }
		clock.progress = new MovieClipSprite(prsp.getRef(), sec,75, 53, 65);
		clock.progress.stop();
		clock.progress.getActor().setScale(1.05,1.05)
		conten.addChild(clock.progress.getActor());
		//clock.progress = obj("clockBorder", escenajuego, "clockBorder", 30, 600, 1, 1);
	}
	
	
	
	if(clock.txt === undefined) {
		clock.txt = timerTxt = new CAAT.TextActor()
			.setFont("bold 24px Trebuchet MS, Helvetica, sans-serif")
			.setTextAlign("center")
			.setTextBaseline("bottom")
			.setPosition(93, 117)
			.setText("00:00")
			.setTextFillStyle("#E84E1B")
			.enableEvents(false);
		conten.addChild(clock.txt);
	}

	switch(action) {
		case 'init':
		sonido.stop("reloj");
			if(currTimer){
				currTimer.cancelNextCallBackAtStop();
				currTimer.stop(); //.reset();
				currTimer = undefined;
			}
			startClock(cdt);
			
			break;
			
		case 'pause':
			currTimer.pause();
			break;
			
		case 'stop':
			currTimer.stop().reset();
			break;
			
		case 'reset':
			currTimer.reset();
			sonido.stop("reloj");
			break;
			
		case 'resume':
			currTimer.resume();
			break;
			
		case 'start':
			currTimer.start(cdt);
			break;
	}
	clock.sube=function(){
		sube(clock.border);
		sube(clock.progress.actor);
		sube(clock.txt)
		sube(conten);
	}
	escenajuego.addChild(conten);
	//tocasuena(conten,"reloj");
	clicktap(conten,function(){ 
		if(conten.playing==true){
			conten.playing=false;
			sonido.stop("reloj");
		}else{
			sonido.playloop("reloj");
			conten.playing=true;
		}
	
	});
	
	clock.sube();
}