//var scprinc= director.createScene();
sc(function(escena){
	escena.name="scgameover";
	var seconds1=0;
	trace(">scgameover");
	scgameover=escena;
	var gofnclick=function(a){
		trace("click",a);
		switch(a.name){
			case "jugar":
				toscenaanim("scprinc");
				//toscenaanim("scingame");
			break;
			case "salir":
				toscenaanim("scintro");
				//toscenaanim("scingame");
			break;
		}
	}
	
	
	
	var  bg=animbg(escena,300000);
	tituloanim=acPuntaje(escena,this);
	tituloanim.y=-tituloanim.height;
	//placeHelper(tituloanim);
	var g=tweenTranslation("tituloanim",tituloanim,1000,tituloanim.x,0,rebote,false,600);
	trace("!>>>",tituloanim.y);
	g.addListener({
		behaviorExpired : function(behavior, time, actor) {
		//tweenTranslation("tituloanim",actor,5000,actor.x,actor.y+10,new CAAT.Interpolator().createExponentialInOutInterpolator(true,1),true,0,0,0);
	}});
	
	//obj("inst06",escena,"gal",770,255,.5,.5);
	//tweenTranslation("btnshow3",btn2,1000,btn2.x+xdif,btn2.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,500);
	var btna=btn("inst08",escena,{sprite:[getsprt("jugar_salir",2,2), 0, 0],x:130+70,y:343-10,click:gofnclick});//
	btna.setScale(1,1).name="jugar";
	var btnb=btn("inst09",escena,{sprite:[getsprt("jugar_salir",2,2), 1, 1],x:460+70,y:343-10,click:gofnclick});
	btnb.setScale(1,1).name="salir";
	
	btna.setScale(0,0).scaleTo(1, 1, 1000, 0, .5, .5,rebote)
	btnb.setScale(0,0).scaleTo(1, 1, 1000, 0, .5, .5,rebote)
	//obj("inst10",escena,"fondotexto",137,725,.5,.5); //678
	//obj("inst11",escena,"barra-inferior",0,715,.25,.25); //678
	acmenupric(escena,[{ix:3,fn:clicbtn},{ix:5,fn:clicbtn},{ix:0,fn:clicbtn},{ix:5,fn:clicbtn},{ix:4,fn:clicbtn}]);
	
	function clicbtn(e){
		switch(e.name){
			case "btn3":
				/*lastScena=director.scenes.indexOf(director.currentScene);
				toscenaanim(3);
			break;
			case "btn5":*/
				mutebtnaction(e);
			break;
		}
		trace(e);
	}
	//tweenTranslation("entradGal",gal,1500,710,gal.y);
	//fondo_texto=escena.instancias.inst10;
	//fondo_texto=escena.instancias.inst10;
});

function acPuntaje(conten,padre){
	var ac=new CAAT.ActorContainer();
	ac.setBounds(214, -43, 600, 275);
	padre.scoreText = new CAAT.TextActor()
	.setFont("bold 40px Trebuchet MS, Helvetica, sans-serif")
	.setTextAlign("center")
	.setTextBaseline("bottom")
	.setPosition(350+10, 214)
	.setText(currScore.toLocaleString());
   window.textoscore=padre.scoreText;
	obj("ainst04",ac,"puntaje",0, 0,1,1);
	 ac.addChild(padre.scoreText);
	conten.addChild(ac);
	
	return ac; 
}

function pantallaGameOver(puntaje,splash){
	toscenaanim("scgameover");
	 window.textoscore.setText(puntaje.toLocaleString());
	 if(splash){
		 setTimeout(function(){
		 spashMsg(splash,undefined,undefined,scgameover);
		 
		 }, 800);
		 
		
	 }
}