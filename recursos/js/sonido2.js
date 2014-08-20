var bgmusic={play:function(){}},
soundList = [];
var sonido={
	init:function(){
		 
		 createjs.Sound.registerPlugins([createjs.WebAudioPlugin, createjs.HTMLAudioPlugin, createjs.FlashPlugin]);
		// createjs.FlashPlugin.swfPath = "../libs/src/SoundJS/";
		 createjs.Sound.alternateExtensions = ["ogg"];
		 createjs.Sound.addEventListener("fileload", loadHandler);
		 _sonido_espe_=_sonido_espe_||[];
		 var kha=_audio_.concat(_sonido_espe_);
		for(var i in kha){	
			if(kha[i])
			createjs.Sound.registerSound(kha[i].url, kha[i].id);
			console.log("kha[i].url",kha[i].url);
		}
		var countCargados=0;
		 function loadHandler(event) {
			
			Loader.onUpdateAudioCounter(i,countCargados);
			console.warn("sonido",i,countCargados,event.src);
			if(i==countCargados){
				Loader.onAudioLoaded();
			}
			
			console.log("aidioloader",event);
			 // This is fired for each sound that is registered.
			 if(event.id=="bgmusic"){
				 trace("sonido cargado",event);
				 bgmusic = createjs.Sound.createInstance("bgmusic"); //createjs.Sound.play("bgmusic");  // play using id.  Could also use full sourcepath or event.src.
				 bgmusic.addEventListener("complete", handleComplete);
				 bgmusic.setVolume(1)
				 //bgmusic.play();
			 }
			 countCargados++;
		 }
		 
		 function handleComplete(){
			bgmusic.play();
		 }
		this.mute(this.ismute())
		 
	},
	play:function(id, cb,volume){
		volume=volume||1;
		//soundManager.play(id);
		if(soundList[id] === undefined) {
			soundList[id] = createjs.Sound.createInstance(id);
			soundList[id].addEventListener("complete", cb || function() {});
		}
		soundList[id].setVolume(volume)
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