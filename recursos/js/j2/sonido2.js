var bgmusic={play:function(){}},
	soundList = [];
	
var sonido={
	init:function(){
		 createjs.Sound.alternateExtensions = ["mp3"];
		 createjs.Sound.addEventListener("fileload", loadHandler);
		 createjs.Sound.registerSound("recursos/sonidos/music.ogg", "bgmusic");
		 createjs.Sound.registerSound("recursos/sonidos/deseleccionar.ogg", "boton");
		 createjs.Sound.registerSound("recursos/sonidos/10.ogg", "10");
		 createjs.Sound.registerSound("recursos/sonidos/mostrarpanel.ogg", "mostrarpanel");
		 createjs.Sound.registerSound("recursos/sonidos/suma_mal.ogg", "suma_mal");
		 createjs.Sound.registerSound("recursos/sonidos/j2/VJ_001L_titulo.mp3", "sonidoTitulo");
		 createjs.Sound.registerSound("recursos/sonidos/j2/VJ_001L_intro.mp3", "sonidoIntro");
		 createjs.Sound.registerSound("recursos/sonidos/j2/VJ_001L_enunciado.mp3", "sonidoEnunciado");
		 
		 function loadHandler(event) {
			 // This is fired for each sound that is registered.
			 if(event.id=="bgmusic"){
				 trace("sonido cargado",event);
				 bgmusic = createjs.Sound.createInstance("bgmusic"); //createjs.Sound.play("bgmusic");  // play using id.  Could also use full sourcepath or event.src.
				 bgmusic.addEventListener("complete", handleComplete);
				 bgmusic.play();
			 }
		 }
		 
		 function handleComplete(){
			bgmusic.play();
		 }
		this.mute(this.ismute())
		 
	},
	play:function(id, cb){
		//soundManager.play(id);
		if(soundList[id] === undefined) {
			soundList[id] = createjs.Sound.createInstance(id);
			soundList[id].addEventListener("complete", cb || function() {});
		}
		
		soundList[id].play();
		if(soundList[id] == false)
			console.error(soundList[id],"Error reproduciendo sonido",id);
	},
	mute:function(a){
		//k=(a) ? soundManager.mute() : soundManager.unmute();
		
		var mu=createjs.Sound.setMute(a);
		localStorage.mute=(a==true);
		return mu;
	},
	ismute:function(){
		localStorage = localStorage || {};
		var mut=localStorage.mute || createjs.Sound.getMute();
		switch(mut){
			case "true":
			case true:
				return true;
			break;
			case "false":
			case false:
				return false;
			default:
		}
	},
	stop: function(id) {
		if(soundList[id] !== undefined) {
			soundList[id].stop();
		}
	}
}