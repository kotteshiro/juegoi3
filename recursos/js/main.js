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

function mutebtnaction(){
		//director.setSoundEffectsEnabled(!director.audioManager.isSoundEffectsEnabled());
		sonido.mute(!sonido.ismute())
		updatebtnmute();
		
		if(sonido.ismute()==false){
			bgmusic.setMute(window.bgmismute); //seteamos el estado guardado de bgm
			updatebgmbtnmute();
			//window.bgmismute=bgmusic.getMute();
		}else{		
			//está muteado
			window.bgmismute=bgmusic.getMute(); //guardamos el estado de bgm
			if(!bgmusic.getMute()){ //muteamos el bgm
				//mutebgmbtnaction(true);
			}
			
		}
		updatebgmbtnmute();
		
		
}
function mutebgmbtnaction(force){
		force=force||false
		
		if(!force && sonido.ismute()) return;
		//director.setSoundEffectsEnabled(!director.audioManager.isSoundEffectsEnabled());
		//bgmusic.setMute(!bgmusic.getMute())
		mutebtnaction();
		updatebgmbtnmute();
}

function updatebtnmute(){
	for(var i in director.scenes){
		if(director.scenes[i].botonmute !== undefined){
			if(sonido.ismute())
				director.scenes[i].botonmute.setButtonImageIndex(4, 4+7, 4, 4);	
			else
				director.scenes[i].botonmute.setButtonImageIndex(3, 3+7, 3, 3);
		}
	} 
	updatebgmbtnmute();
}
function updatebgmbtnmute(){
	if(sonido.ismute==undefined) return;
	for(var i in director.scenes){
		if(director.scenes[i].botonbgmmute !== undefined){
			if(!sonido.ismute())
				director.scenes[i].botonbgmmute.setButtonImageIndex(5, 5+7, 5, 5);
			else
				director.scenes[i].botonbgmmute.setButtonImageIndex(6, 6+7, 6, 6);
		}
	}
}
function enpausa(escena) {
	trace("En Pausa!");
    clockController("pause");
    var h1_1 = obj("pa8a", escena, 'fondo_ayuda', 0, 0, 1, 1);
    var h1_0 = obj("fost08b", escena, 'en-pausa', 222, 137, 1, 1); //222,137
	
	var fn=function(a) {
		clockController("resume");
        h1_1.destroy();
        h1_0.destroy();
    }
	
   	clicktap(h1_1,fn);
	clicktap(h1_0,fn);
}