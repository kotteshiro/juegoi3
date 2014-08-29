//var scprinc= director.createScene();
var alphawhj;
var gen;
var todo=[];
var logro;
var menux;
var escenajuego;
var e1,e2,e3;
var jcomandos;
var currintento;


sc(function(escena){
	escenajuego=escena;
	escena.name="scingame";

	//var  bg=animbg(escena,1700000*10);
	//nuevo(escena);
//	new FlechaAtoB(escena,{x:100,y:100},{x:200,y:200});
	
	/*new FlechaAtoB(escena,{x:100,y:100},{x:100,y:200});
	new FlechaAtoB(escena,{x:100,y:200},{x:200,y:200});
	new FlechaAtoB(escena,{x:200,y:200},{x:200,y:100});
	new FlechaAtoB(escena,{x:200,y:100},{x:100,y:100});*/
	logro=aclogro(escena,200,700);
	jcomandos=new MenuInGame(escena);
});
function menuprinc(){
	toscenaanim(1);
}
function nuevo(escena){
	alphawhj=undefined;
	gen=undefined;
	todo=[];
	//logro=undefined;
	menux=undefined;
	e1=undefined,e2=undefined,e3=undefined;
	//jcomandos=undefined;
	
	if(currintento!=undefined){
		currintento.destroy();
		currintento=undefined;
	}
	
	var cont=new CAAT.ActorContainer().setBounds(0,0,1024,768);
	var redes=window.redes=new Play(cont);
	escena.addChild(cont);	
	currintento=cont;
	if(jcomandos!=undefined)
	sube(jcomandos);
	if(logro!=undefined)
	sube(logro.ac);
	
	return cont;
}