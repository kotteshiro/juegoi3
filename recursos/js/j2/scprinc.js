//var scprinc= director.createScene();
var fondo_texto;
var scprinc;
var tituloanim;
var btna;
sc(function(escena){
	obj("fondo01", escena,"fondo",0,0,1, 1);
	escena.name="scprinc";
	var seconds1=0;
	trace(">scprinc");
	scprinc=escena;
	scprinc.fnclick=function(a){
		trace("click",a);
		sonido.stop("sonidoIntro");
		sonido.stop("sonidoTitulo");
		sonido.play("sonidoEnunciado");
		logro.reset();
		switch(a.name){
			case "btninfo":
				trace("ssdasd");
  			break;
			case "calma":
				tienetime=false;
				toscenaanim("scingame");
				clockController("init");
				//toscenaanim("scingame");
			break;
			case "tiempo":
				tienetime=true;
				toscenaanim("scingame");
				clockController("init");
				//toscenaanim("scingame");
			break;
		}
	}
	
	tituloanim=actitulo(escena);
	tituloanim.y=-tituloanim.height;
	trace("WIDTH: " + tituloanim.width);
	var g=tweenTranslation("tituloanim",tituloanim,1000, tituloanim.x, 0,rebote,false,600);
	trace("!>>>",tituloanim.y);
	g.addListener({
		behaviorExpired : function(behavior, time, actor) {
		sonido.play("sonidoTitulo", function() {
			sonido.play("sonidoIntro");
		});
	}});
	
	var bgDesc = acdesc(escena);
	bgDesc.setScale(0, 0).scaleTo(1, 1, 1000, 0, .5, .5, rebote);
	var btna=btn("inst08",escena,{sprite:[spmodos, 0, 2],x:130+70,y:343-10,click:scprinc.fnclick});//
	btna.setScale(1,1).name="calma";
	var btnb=btn("inst09",escena,{sprite:[spmodos, 1, 3],x:460+70,y:343-10,click:scprinc.fnclick});
	btnb.setScale(1,1).name="tiempo";
	
	btna.setScale(0,0).scaleTo(1, 1, 1000, 0, .5, .5,rebote)
	btnb.setScale(0,0).scaleTo(1, 1, 1000, 0, .5, .5,rebote)
	acmenupric(escena,[{ix:3,fn:clicbtn},{ix:5,fn:clicbtn},{ix:0,fn:clicbtn},{ix:5,fn:clicbtn},{ix:4,fn:clicbtn}]);
	function clicbtn(e){
		switch(e.name){
			case "btn3":
				lastScena=director.scenes.indexOf(director.currentScene);
				toscenaanim(3);
			break;
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
