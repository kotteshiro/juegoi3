//var scprinc= director.createScene();
var fondo_texto;
var scprinc;
var tituloanim;
var btna;
var countDownTime=60/60;
sc(function(escena){
	escena.name="scprinc";
	var seconds1=0;
	trace(">scprinc");
	scprinc=escena;
	scprinc.fnclick=function(a){
		trace("click",a);
		switch(a.name){
			case "btninfo":
				/*if(fondo_texto.showing){
				//new CAAT.Interpolator().createBounceInInterpolator
					tweenTranslation("btnshow1",fondo_texto,1000,fondo_texto.x,725,new CAAT.Interpolator().createBounceOutInterpolator(0,false));
					fondo_texto.showing=false;
				}else{
					tweenTranslation("btnshow2",fondo_texto,1000,fondo_texto.x,520,new CAAT.Interpolator().createBounceOutInterpolator(0,false));
					fondo_texto.showing=true;
				}*/
				//scayuda
				//director.easeInOut( director.currentScene.id, typein, anchorin, outSceneIndex, typeout, anchorout, time, alpha, interpolatorIn, interpolatorOut )
				trace("ssdasd");
  			break;
			case "calma":
				sonido.stop("sonidoIntro");
				sonido.stop("sonidoTitulo");
				sonido.play("sonidoEnunciado");
				logro.reset();
				currLevel=1;
				tienetime=false;
				toscenaanim("scingame");
				clockController("init");
				gamestart();
			break;
			case "tiempo":
				sonido.stop("sonidoIntro");
				sonido.stop("sonidoTitulo");
				sonido.play("sonidoEnunciado");
				logro.reset();
				currLevel=1;
				tienetime=true;
				toscenaanim("scingame");
				clockController("init");
				gamestart();
			break;
		}
	}
	
	
	var  bg=animbg(escena,300000);
	tituloanim=actitulo(escena);
	tituloanim.y=-tituloanim.height;
	//placeHelper(tituloanim);
	var g=tweenTranslation("tituloanim",tituloanim,1000,tituloanim.x,-80,rebote,false,600);
	trace("!>>>",tituloanim.y);
	g.addListener({
		behaviorExpired : function(behavior, time, actor) {
	
		},
		behaviorStarted: function(behavior, time, actor){
			sonido.play("TITULO-ABRE");
		}
	});
	var bgDesc = acdesc(escena);
	window.bgDesc=bgDesc;
	
	tocasuena(bgDesc,"sonidoIntro");
	//menu=new MenuInGame(escena);
	//obj("inst06",escena,"gal",770,255,.5,.5);
	//tweenTranslation("btnshow3",btn2,1000,btn2.x+xdif,btn2.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,500);
	var btna=btn("inst08",escena,{sprite:[spmodos, 0, 0],x:130+70,y:343-10,click:scprinc.fnclick});//
	btna.setScale(1,1).name="calma";
	var btnb=btn("inst09",escena,{sprite:[spmodos, 1, 1],x:460+70,y:343-10,click:scprinc.fnclick});
	btnb.setScale(1,1).name="tiempo";
	
	btna.setScale(0,0).scaleTo(1, 1, 1000, 0, .5, .5,rebote)
	btnb.setScale(0,0).scaleTo(1, 1, 1000, 0, .5, .5,rebote)
	//obj("inst10",escena,"fondotexto",137,725,.5,.5); //678
	//obj("inst11",escena,"barra-inferior",0,715,.25,.25); //678
	acmenupric(escena,[{ix:3,fn:clicbtn},{ix:5,fn:clicbtn},{ix:0,fn:clicbtn},{ix:5,fn:clicbtn},{ix:4,fn:clicbtn}]);
	
	function clicbtn(e){
		console.log("nuevo click",e.name)
		switch(e.name){
			
			case "btn3":
			/*	lastScena=director.scenes.indexOf(director.currentScene);
				toscenaanim(3);
			break;*/
			case "btn5":
				mutebtnaction(e);
			break;
		}
		trace(e);
	}
	//tweenTranslation("entradGal",gal,1500,710,gal.y);
	//fondo_texto=escena.instancias.inst10;
	//fondo_texto=escena.instancias.inst10;
});

function gamestart(){
	nuevo(escenajuego);
	if(logro){
		logro.reset();	
	}else
		logro=new aclogro(escenajuego, 200, 700);
	clock.sube();
}