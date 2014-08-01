//var scprinc= director.createScene();
var alphawhj;
var fondo_texto;
var todo=[];
sc(function(escena){
	escena.name="scmapcreator";
	trace("creando escena map creator");
	var sp=13;
	var fondoa 			= obj("inst00",escena,'fondo_a',0,0,.5,.5);
	var fondob 			= obj("inst01",escena,'fondo_b',0,0,.5,.5);
	var fondoc 			= obj("inst02",escena,'fondo_c',0,0,.5,.5);
	var fondod 			= obj("inst03",escena,'fondo_d',0,0,.5,.5);
	var nube_titulo 	= obj("inst04",escena,"nube_titulo",106,143 ,.25,.25);
	var titulo 			= obj("inst05",escena,"titulo",326,246,.25,.25);
	var gal 			= obj("inst06",escena,"gal",770,255,.5,.5);
	var fondo_comenados = obj("inst07",escena,"fondo_comenados",-10,115,.25,.25); //678
	var b1				= btn("inst08",escena,{sprite:[spmodos, 0, 2],x:13,y:343-50,click:fnclick}).setScale(.5,.5);
	var b2				= btn("inst09",escena,{sprite:[spmodos, 1, 3],x:341,y:343-50,click:fnclick}).setScale(.5,.5);
	fondo_texto			= obj("inst10",escena,"fondotexto",137,725,.5,.5); //678
	var baa 			= obj("inst11",escena,"barra-inferior",0,715,.25,.25); //678
	var s1				= btn("inst12",escena,{sprite:[spiconos, 0, 0+sp], x: -10, y: 70+40, click:fnclick}).setScale(.5,.5);
	var s2				= btn("inst13",escena,{sprite:[spiconos, 1, 1+sp], x: -10, y:138+37, click:fnclick}).setScale(.5,.5);
	var s4				= btn("inst14",escena,{sprite:[spiconos, 3, 3+sp], x: -10, y:206+35, click:fnclick}).setScale(.5,.5);
	var s5				= btn("inst15",escena,{sprite:[spiconos, 4, 4+sp], x: -10, y:263+40, click:fnclick}).setScale(.5,.5);
	var s6				= btn("inst16",escena,{sprite:[spiconos, 6, 6+sp], x: -10, y:333+40, click:fnclick}).setScale(.5,.5);
	var s7				= btn("inst17",escena,{sprite:[spiconos, 6, 6+sp], x: -10, y:377+40, click:fnclick}).setScale(.5,.5);
	var s8				= btn("inst18",escena,{sprite:[spiconos, 8, 8+sp], x: -10, y:404+40, click:fnclick}).setScale(.5,.5);
	var s9				= btn("inst19",escena,{sprite:[spiconos, 9, 9+sp], x: -10, y:443+40, click:fnclick}).setScale(.5,.5);	
	//tweenTranslation("entradGal",gal,1500,710,gal.y);
	todo.push(fondoa,fondob ,fondoc	,fondod ,nube_titulo,titulo ,gal ,fondo_comenados ,b1,b2,fondo_texto,baa ,s1,s2,s4,s5,s6,s7,s8,s9);
	for(var i in todo){
		trace(">",i,todo[i]);
		if(todo[i]!=undefined)
		placeHelper(todo[i]);
		destacadoonmover(todo[i]);
	}
	loadlocal();
});
function fnclick(a){
}
function saveproprops(down){
	down=(down==undefined) ? true: false;
	var props={};
	for(var i in todo){
		var j={x:todo[i].x, y:todo[i].y};
		props[todo[i].name]=j;
	}
	var tosave=JSON.stringify(props);
	trace(tosave);
	if(down)
	descargarArchivo(tosave,"props.js");
	return tosave;
}
function descargarArchivo(tx, nombreArchivo) {
	contenidoEnBlob=generarTexto([tx])
    var reader = new FileReader();
    reader.onload = function (event) {
        var save = document.createElement('a');
        save.href = event.target.result;
        save.target = '_blank';
        save.download = nombreArchivo || 'archivo.dat';
        var clicEvent = new MouseEvent('click', {
            'view': window,
                'bubbles': true,
                'cancelable': true
        });
        save.dispatchEvent(clicEvent);
        (window.URL || window.webkitURL).revokeObjectURL(save.href);
    };
    reader.readAsDataURL(contenidoEnBlob);
};

function generarTexto(datos) {
    return new Blob(datos, {
        type: 'text/plain'
    });
};
function savelocal(){
	localStorage["savepos"]=saveproprops(false);
}
function loadlocal(){
	if(localStorage["savepos"]){
		var prop=JSON.parse(localStorage["savepos"]);
		trace(prop);
		for(var i in todo){		
			todo[i].x=prop[todo[i].name].x;
			todo[i].y=prop[todo[i].name].y;
		}
	}
}
function restablecer(){
	localStorage["savepos"]=undefined;
	window.location.reload();
}
function updatealpha(a){
	alphawhj=a
	if(alphawhj==false){
		for(var i in todo){
			todo[i].setAlpha(1);
		}
	}else{
		for(var i in todo){
			todo[i].setAlpha(.5);
		}
	}
}