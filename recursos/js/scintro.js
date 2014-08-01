var cohete_;
sc(function(escena){
	escena.name="scintro";
	escena.setClip(true);
	trace(">scintro espacio");
 	//var bg = animbg(escena),
		bgIntro = obj("bgSpace", escena, "bgIntro", 0, 0, 1, 1);
	
	var earthCont	= new CAAT.ActorContainer()
		.setBounds(160, 420, 719, 359.5),
		bgStars = new CAAT.Actor()
			.setLocation(-405, -190)
			.setBackgroundImage(director.getImage("bgStars"))
			.addBehavior(new CAAT.RotateBehavior().setCycle(true).setFrameTime(0, 80000000).setValues(0, -360)),
		earthActor = new CAAT.Actor()
			.setLocation(0, 0)
			.setSize(719, 719)
			.setBackgroundImage(director.getImage("earthIntro"))
			.addBehavior(new CAAT.RotateBehavior().setCycle(true).setFrameTime(0, 20000000).setValues(0, -360));
		
	earthCont.addChild(earthActor);
	escena.addChild(bgStars);
	escena.addChild(earthCont);
	
	var cohete=obj("scintro4",escena,'cohete',"center", 100,1,1);
	cohete_=cohete;
	var zona = obj("scintro2",escena,'zonasensiblefull',0,0,1,1);
	tweenTranslation("tituloanim",cohete,2000,cohete.x,cohete.y+10,new CAAT.Interpolator().createExponentialInOutInterpolator(true,1),true,0,0,0);
	
	zona.mouseEnabled=true;
	zona.mouseClick=function(){  
		trace("entra",bg);
		bgmusic.play();
		//director.setScene(0); 
		//director.switchToNextScene(1000, false,true);
		/*director.easeInOut(
                                1,
                                CAAT.Scene.EASE_TRANSLATE,
                                CAAT.Actor.prototype.ANCHOR_TOP,
                                2,
                                CAAT.Scene.EASE_TRANSLATE,
                                CAAT.Actor.prototype.ANCHOR_TOP,
                                1000,
                                false,
                                (new CAAT.Interpolator).createExponentialInOutInterpolator(3,!1),
                                (new CAAT.Interpolator).createExponentialInOutInterpolator(3,!1));
		director.easeInOutRandom(1,2,1000,1);*/
		toscenaanim(1)
	}
	//btn("scintro4_", escena, {sprite:[splogogly, 1, 1], x:341, y:343-50, click:mmcl}).setScale(1.5, 1.5);
});