var bgmusic;
var sonido={
	init:function(){
		soundManager.setup({
		  url: '/recursos/libs/swf',
		  debugMode: false,
		  onready: function() {
			bgmusic = soundManager.createSound({
			  id: 'bgmusic',
			  url: 'recursos/sonidos/music.mp3',
			  loop: 99999,
			  });
			 
			soundManager.createSound({
			  id: 'boton',
			  url: 'recursos/sonidos/deseleccionar.mp3',
			  loop: 0
			});
			soundManager.createSound({
			  id: '10',
			  url: 'recursos/sonidos/10.mp3',
			  loop: 0
			});
			soundManager.createSound({
			  id: 'mostrarpanel',
			  url: 'recursos/sonidos/mostrarpanel.mp3',
			  loop: 0
			});
			soundManager.createSound({
			  id: 'suma_mal',
			  url: 'recursos/sonidos/suma_mal.mp3',
			  loop: 0
			});
			
			bgmusic.onPosition(7940, function(eventPosition) {
				this.setPosition(0);
				this.play();
			});
		  },
		  ontimeout: function() {
			// Hrmm, SM2 could not start. Missing SWF? Flash blocked? Show an error, etc.?
			alert("Problema con el sonido");
		  }
		});
		
	},
	play:function(id){
		soundManager.play(id);
	
	},
	mute:function(a){
		k=(a) ? soundManager.mute() : soundManager.unmute();
		return k;
	},
	ismute:function(){
		return soundManager.muted;
	}
}