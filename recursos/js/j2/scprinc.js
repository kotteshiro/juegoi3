//var scprinc= director.createScene();
var fondo_texto;
var scprinc;
var tituloanim;
var btna;
sc(function(escena){
	var fndo=obj("fondo01", escena,"fondo",0,0,1, 1);
	window.fndo=fndo;
	escena.name="scprinc";
	var seconds1=0;
	trace(">scprinc");
	scprinc=escena;
	scprinc.fnclick=function(a){
		trace("click",a);		
		switch(a.name){
			case "btninfo":
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
				//toscenaanim("scingame");
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
				//toscenaanim("scingame");
			break;
		}
	}
	
	//balanceo
										
	window.titul=tituloanim=actitulo(escena);
	//tituloanim.addBehavior(rb)
	tituloanim.y=-tituloanim.height;
	trace("WIDTH: " + tituloanim.width);
	var g=tweenTranslation("tituloanim",tituloanim,1000, tituloanim.x, -20,rebote,false,600);
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
	tocasuena(tituloanim,"sonidoTitulo");
	tocasuena(bgDesc,"sonidoIntro");	
	bgDesc.setScale(0, 0).scaleTo(1, 1, 1000, 0, .5, .5, rebote);
	var btna=btn("inst08",escena,{sprite:[spmodos, 0, 0],x:130+70,y:343-10,click:scprinc.fnclick});//
	btna.setScale(1,1).name="calma";
	var btnb=btn("inst09",escena,{sprite:[spmodos, 1, 1],x:460+70,y:343-10,click:scprinc.fnclick});
	btnb.setScale(1,1).name="tiempo";
	
	btna.setScale(0,0).scaleTo(1, 1, 1000, 0, .5, .5,rebote)
	btnb.setScale(0,0).scaleTo(1, 1, 1000, 0, .5, .5,rebote)
	acmenupric(escena,[{ix:3,fn:clicbtn},{ix:5,fn:clicbtn},{ix:0,fn:clicbtn},{ix:5,fn:clicbtn},{ix:4,fn:clicbtn}]);
	function clicbtn(e){
		switch(e.name){
			case "btn3":
				/*lastScena=director.scenes.indexOf(director.currentScene);
				toscenaanim(3);*/
				mutebgmbtnaction();
			break;
			case "btn5":
				mutebtnaction();
			break;
		}
		trace(e);
	}
	//tweenTranslation("entradGal",gal,1500,710,gal.y);
	//fondo_texto=escena.instancias.inst10;
	//fondo_texto=escena.instancias.inst10;
});
