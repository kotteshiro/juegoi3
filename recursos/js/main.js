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