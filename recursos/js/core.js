var instances=[];
var loading;
var funciones=[];
var funciones1=[];
function sc(fncallback,scena){
	funciones.push({cb:fncallback,sc:scena});
}
function trace(){
	if(true) console.log(arguments);
}
loading=function(pc){
	trace("cargando: ",pc);
}
function obj(namae,escena,imgid,x,y,sx,sy){

	x= x ? x : 0;
	y= y ? y : 0;
	sx= sx ? sx : 1;
	sy= sy ? sy : 1;
	

	var a = new CAAT.Actor().
		setBackgroundImage(director.getImage(imgid));
		a.setLocation(0,0);
		a.enableEvents(false);
		a.setScaleAnchored(sx,sy,0,0);
	switch(x){
		case "center":
			x=(escena.width/2)-(a.width/2);
		break;
	}
	switch(y){
		case "center":
			y=(escena.height/2)-(a.height/2);
		break;
	}
	a.setLocation(x,y);
	a.cacheAsBitmap(1000,CAAT.Foundation.Actor.CACHE_SIMPLE);
	escena.addChild(a);
	if(escena.instancias==undefined) escena.instancias=[];
	if(escena.instancias[namae] != undefined) console.warn("Instancia de nombre: "+escena.instancias[namae].name+" ya existe.");
	escena.instancias[namae]=a;
	a.name=namae;
	
	return a;
}

function btn(namae,escena,prop){
	//spr,x,y,fncb
	trace("miau");
	prop.sprite[3]=prop.sprite[3] ? prop.sprite[3] : prop.sprite[2];
	prop.sprite[4]=prop.sprite[4] ? prop.sprite[4] : prop.sprite[2];
	prop.hoveranim=(prop.hoveranim===false) ? false : true;
	prop.subir=prop.subir||false;
	// setAsButton(spriteImageIndex, normal, over, press, disabled, fn)
	var b1= new CAAT.Actor().setAsButton(prop.sprite[0].getRef(), prop.sprite[1], prop.sprite[2], prop.sprite[3], prop.sprite[4], prop.click).
            setLocation(prop.x,prop.y);
	escena.addChild(b1);
	b1.name=namae;
	b1.olffunc=b1.mouseEnter;
	var sonidohover=prop.soundhover||"ELEMENTO";
	b1.mouseEnter=function(e){
		console.log(e);
		if(prop.subir)
		sube(e.source);
		e.source.currsx=e.source.currsx||1;
		e.source.currsy=e.source.currsy||1;
		if(prop.hoveranim)
		e.source.scaleTo(e.source.currsx + 0.1 , e.source.currsy + 0.1, 80) ;
		
		b1.olffunc();
		if(prop.mouseEnter) prop.mouseEnter(e);
		sonido.play(sonidohover);
	}
	b1.olffuncme=b1.mouseExit;
	
	b1.mouseExit=function(e){
		e.source.currsx=e.source.currsx||1;
		e.source.currsy=e.source.currsy||1;
		e.source.scaleTo(e.source.currsx, e.source.currsy, 50);
		b1.olffuncme()
		
		if(prop.mouseExit) prop.mouseExit(e);
	}
	return b1;
}	

function placeHelper(actor){
	//actor.enableDrag();
	window.toplace=actor;
	addEventListener("touchmove",function(a){
		
		window.toplace.x=window.toplace.originx+(a.touches[0].clientX-window.toplace.touchstartx); 
		window.toplace.y=window.toplace.originy+(a.touches[0].clientY-window.toplace.touchstarty); 
		});
	addEventListener("touchstart",function(a){
		console.log(a); 
		window.toplace.touchstartx=a.touches[0].clientX; 
		window.toplace.touchstarty=a.touches[0].clientY;
		window.toplace.originx=window.toplace.x;
		window.toplace.originy=window.toplace.y;
		});
	addEventListener("touchend",function(a){
		console.log(">>",window.toplace.x,",",window.toplace.y); 
		});
	/*actor.mouseUp=function(a){
		console.log(a);
		trace(actor.x+","+actor.y);
		savelocal();
	}*/
}


function destacadoonmover(actor){
	if(alphawhj==true)
	actor.setAlpha(.5);
	actor.mouseEnter=function(a){
		if(alphawhj==true)
			actor.setAlpha(1);
			trace(actor.name);
	}
	actor.mouseExit=function(a){
		if(alphawhj==true)
		actor.setAlpha(.5);
	}
}
function tweenTranslation(id,actor,time,tox,toy,interpolacion,cycle,delay,x,y,pingpong){
	//interpolacion=interpolacion ? interpolacion : new CAAT.Interpolator().createExponentialOutInterpolator(1,false);
    //TO-DO: Reciclar comportamientos (Behavior), actualmente se agregan N por cada llamada a esta funcion, la idea es que al llamar al mismo tween si existe reprodusca uno ya existente.
	pingpong=pingpong||false;
	delay=(delay!=undefined) ? delay : 0;
	x=(x!=undefined) ? x : 0;
	y=(y!=undefined) ? y : 0;
	//trace(">>",actor);
	var path= new CAAT.Path().setLinear( actor.x+x,actor.y+y, tox+x, toy+y, interpolacion);
	
	//var interpolacion=new CAAT.Interpolator().createExponentialOutInterpolator(1,false);
	var path_behavior= new CAAT.PathBehavior().
		setPath( path ). //seting path
		setFrameTime(actor.time+delay,time). // take 5 seconds to traverse the path
		setCycle(cycle). // do it continuously?, not, just one time
		setInterpolator(interpolacion).
		setAutoRotate( false ); // head the actor across the path to the next point
		//trace(x,y);
		/*if(x!==undefined && y!==undefined){
			trace("setenado traslasion");
			path_behavior.setTranslation(x,y);// set path traverse by the center of the rectangle shape.
		}*/
		if(pingpong) path_behavior.setPingPong(pingpong);
	actor.addBehavior( path_behavior );
	return path_behavior;
}
function tweenScale(id,actor,time,tox,toy,interpolacion,cycle,delay){
	//interpolacion=interpolacion ? interpolacion : new CAAT.Interpolator().createExponentialOutInterpolator(1,false);
    //TO-DO: Reciclar comportamientos (Behavior), actualmente se agregan N por cada llamada a esta funcion, la idea es que al llamar al mismo tween si existe reprodusca uno ya existente.
	delay=(delay!=undefined) ? delay : 0;
/*	x=(x!=undefined) ? x : 0;
	y=(y!=undefined) ? y : 0;*/
	trace(">>",actor);
	//var path= new CAAT.Path().setLinear( actor.x+x,actor.y+y, tox+x, toy+y, interpolacion);
	
	//var interpolacion=new CAAT.Interpolator().createExponentialOutInterpolator(1,false);
	var comporta1=new CAAT.ScaleBehavior(actor.width/2,actor.height/2,1,1,0,0).
					setFrameTime( this.time, 500 ).
					setValues( 1, 2, 1, 2 ).
					setPingPong();
	actor.addBehavior( comporta1 );
	return comporta1;
}

function toscenaanim(ixin){
	if(isNaN(ixin)){
		for(var i in director.scenes){
			if(director.scenes[i].name==ixin){
				ixin=i;
				break;
			}
			trace("toscenaanim: " + director.scenes[i].name) 
		}
	}
	var oi=new CAAT.Interpolator().createBounceOutInterpolator(0,false);
	var ixout=director.scenes.indexOf(director.currentScene);
	director.easeInOut(
		ixin, CAAT.Scene.EASE_TRANSLATE,CAAT.Actor.prototype.ANCHOR_TOP,
		ixout,CAAT.Scene.EASE_TRANSLATE,CAAT.Actor.prototype.ANCHOR_TOP,
		1000,.1,oi,oi);
	updatebtnmute();
}
/** Editor **/

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

function MovieClipSprite(spriteref,secuencia,fps,x,y){
	this.fps=fps;
	this.currentFrame=0;
	this.stopatend=false;
	this.originalSecuence=secuencia;
	this.actor=tmp = new CAAT.Actor().
		setBackgroundImage(spriteref,true).
		setLocation( x,y ).
		setScale( 1 , 1 ).
		setAnimationImageIndex( secuencia ).
		setChangeFPS(this.fps).
		setClip(false).
		enableEvents(false);
	//this.actor.backgroundImage.changeFPS=Number.MAX_VALUE;
	
	this.actor.backgroundImage.spriteIndex=this.currentFrame;
	this.stop=function(ix){
		if(!isNaN(ix)){
			this.currentFrame=ix;
			this.actor.backgroundImage.spriteIndex=this.currentFrame;
			this.actor.setAnimationImageIndex([ix]);
		}else{
			this.currentFrame=this.actor.backgroundImage.spriteIndex;
			this.actor.setAnimationImageIndex([this.actor.backgroundImage.spriteIndex]);
		}
		return this;
	}
	this.play=function(ix,stopatend){
	trace("play",ix,stopatend);
		this.stopatend=(stopatend) ? true : false;
		this.actor.backgroundImage.changeFPS=this.fps;
		if(!isNaN(ix)){
			this.currentFrame=ix;
			this.actor.backgroundImage.spriteIndex=this.currentFrame;
			trace("V");
		}
		this.actor.setAnimationImageIndex( this.originalSecuence )
		return this;
	}
	var self=this;
	this._cbendanim=function(e){
		trace("end",self.stopatend,self);
		if(self.stopatend){
			self.stop();
		}
	}
	this.actor.setAnimationEndCallback(this._cbendanim)
	this.getActor=function(){
		return this.actor;
	}
	return this;
}
//***End Editor***//
function getRandomA(nameorarr,ar2,reshuffle){
	reshuffle=reshuffle||true;
	if(isString(nameorarr)){
		window.arrs=window.arrs||{};
		window.arrs[nameorarr]=window.arrs[nameorarr]||[];
		if(window.arrs[nameorarr].array==undefined){
			if(ar2!=undefined)
			window.arrs[nameorarr].array=shuffle(ar2);
		}
		window.arrs[nameorarr].array=window.arrs[nameorarr].array||ar2||[];
		window.arrs[nameorarr].index=window.arrs[nameorarr].index||0;
		if(window.arrs[nameorarr].index+1>window.arrs[nameorarr].array.length){
			window.arrs[nameorarr].index=0;
			if(reshuffle)
				window.arrs[nameorarr].array=shuffle(window.arrs[nameorarr].array);
		}
		return window.arrs[nameorarr].array[window.arrs[nameorarr].index++];
	}else{
		return nameorarr[randTo(nameorarr.length)];
	}
	
}
function randTo(nu){
	return parseInt(Math.random(10)*nu)
}
function parseEaseljs(lib,escena){  // pe: parse(lib.test, primeraesecena)
	lib=lib||{};
	lib.prototype=lib.prototype || {};
	lib.prototype.addChild=function(){
		trace("ARGUMENTS:",arguments);
		var args = arguments;
		for(var i in arguments){
			trace("!>",i,arguments[i]);
			var inst=arguments[i];
			
			inst._ac=new CAAT.ActorContainer();
			inst.nominalBounds=inst.nominalBounds || {};
			inst._ac.setBounds(inst.x,inst.y,inst.nominalBounds.width || 1,inst.nominalBounds.height || 1 ); //todo: width and height
			inst._ac.inst=inst;
			console.log(inst);
			inst._ac.paint=function(a,x){
				var inst=this.inst;
				inst.draw(director.ctx);
			}
			//if(inst.children!=undefined){
				//parseEaseljs(inst,escena);
				instances.push(inst);
				lastinst=inst;
				escena.addChild(inst._ac);
			
		}
	}
	//var la=new lib();
	return instances;
}
function customlog(){
	console.log=function(){
		var ja=""
		for(var k in arguments){
			ja+=arguments[k]+" ";
		}
		document.getElementById("consoleoutput").innerHTML+=ja+"<br>";
	}
}

function ck(a){
var rn=true;
	if(!a) rn=false;
	a=a || {};
	return rn;
}
function uniq(pre){
	return pre+"_"+Math.random(); //fix it!
}
function getsprt(spritename,ancho,alto){
	sprtglobal[spritename]=sprtglobal[spritename] || new CAAT.SpriteImage().initialize(director.getImage(spritename),alto,ancho);
	return sprtglobal[spritename];
}
function spashMsg(src,fncb,requireclick,escena,timea){
	timea=timea||2000;
	requireclick=requireclick||false;
	fncb=(fncb) ? fncb : function(){};
	escondeescenario();
	var donde=escena||director.currentScene;
	//obj("inst00",director,'fondo_a',0,0,.5,.5);
	//spla=obj("splashmsg",donde,'tit_excelente',0,0,.5,.5);.
	var zona2 = obj(uniq("z"),donde,'zonasensiblefull',0,0,1,1);
	var img=director.getImage(src);
	var comporta1=new CAAT.ScaleBehavior() //aparece
		.setFrameTime( donde.time, 500 )
		.setValues( 0, 1, 0, 1 )
		.setInterpolator(new CAAT.Interpolator().createBounceOutInterpolator(0,false));
	
	/*var g=tweenTranslation("tituloanim",tituloanim,1000,tituloanim.x,0,rebote,false,600);
	trace("!>>>",tituloanim.y);*/
	comporta1.addListener({
		behaviorExpired : function(behavior, time, actor) {
			if(!requireclick) setTimeout(function(){spla.desapareceme()},timea)

		//tweenTranslation("tituloanim",actor,5000,actor.x,actor.y+10,new CAAT.Interpolator().createExponentialInOutInterpolator(true,1),true,0,0,0);
	}});
	var spla = new CAAT.Actor()
		.setBackgroundImage(img)
		.setLocation((director.width/2)-(img.width/2),(director.height/2)-(img.height/2))
		.emptyBehaviorList()
		.addBehavior( comporta1 );
	
	donde.addChild(spla);
	spla.mouseEnabled=true;
	
	spla.clickcb=fncb;
	spla.desapareceme=function(){
		zona2.destroy();
		var comporta2=new CAAT.ScaleBehavior() //desaparece
		.setFrameTime( donde.time, 300 )
		.setValues( 1, 0, 1, 0 );
		//.setInterpolator(new CAAT.Interpolator().createBounceOutInterpolator(0,false));
		
		this.addBehavior( comporta2 );
		comporta2.addListener({
	        behaviorExpired : function(behavior, time, actor) {
				//updateonwherever();
	           actor.destroy()
	        }});
		this.clickcb();
		//this.destroy();
	}
	spla.mouseDown=spla.desapareceme;
	//tweenScale("btnshow5",spla,1000,0,0,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,1500);
	
	return spla;
	
}
var splashmsg=spashMsg;
function randomInt(ini,to){ return Math.round(Math.random()*(to-ini))+ini }

function layout(position) {
	var coord = { x: 0, y: 0 };
	
	switch(position) {
		case "bottom":
		case "b":
			coord.x = director.width / 2;
			coord.y = director.y + director.height;
			break;
			
		case "right":
		case "r":
			coord.x = director.x + director.width;
			coord.y = director.height / 2;
			break;
	}
	
	return coord;
}
function addDragNDrop(object, onDrag, onDrop, onDragging) {
	object.originalx = object.x;
	object.originaly = object.y;
	
	object.mouseDown = function(e) {
		trace("Start dragging.");
		trace(e);
		//this.setScale(.4, .4); poner en onDrag
		
		if(onDrag)
			onDrag.call(this, e);
	}
	
	object.mouseUp = function(e) {
		trace("Drop!","Estoy en core.js 459");
		
		//PONER ESTO EN LOS CALLBACK DE LAS FUNCIONES
		/*var droppedOn = checkDrop(e);
		
		if(droppedOn != false && droppedOn.hasElement == false) {
			e.dropsOn = droppedOn;
			droppedOn.hasElement = true;
			
			
		} else {
			this.volver();
		}*/
		if(onDrop) {
			onDrop.call(this, e);
		}
	}
	
	object.mouseDrag = function(e) {
		this.setPosition(e.screenPoint.x-this.width/2,e.screenPoint.y-this.height/2);
		
		if(onDragging)
			onDragging.call(this, e);
	}
	
	object.volver = function() {
		animaa(this, {x: this.originalx, y: this.originaly, scalex: 1, scaley: 1, alpha: 1});
	}
}

function removeDragNDrop(object) {
	trace("Removing drag n drop.");
	trace(object);
	object.mouseDown = object.mouseUp = object.mouseDrag = object.volver = function() {};
}

function checkDrop(o,holders) {
	if(holders==undefined) holders=window.holders;
	if(holders==undefined) console.error("no hay holders");
	for(var i = 0; i < holders.length; i++) {
		if((o.screenPoint.x >= holders[i].x && o.screenPoint.x <= (holders[i].x + holders[i].width))
			&& (o.screenPoint.y >= holders[i].y && o.screenPoint.y <= (holders[i].y + holders[i].height))
		) {
			trace("Drops on!");
			trace(holders[i]);
			return holders[i];
		}
	}
	
	return false;
}
function animaa(obj, props) {
	props.time=props.time||400;
    if (props.x!=undefined) { // animapos
        //obj.x = props.x //TODO
        //obj.y = props.y //TODO
		obj.moveTo(props.x,props.y,props.time)
    }
    if (props.scalex) {
        obj.setScale(props.scalex, props.scaley)
    }
}
function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
function setoriginalpos(that){
	that.originalx=that.x;
	that.originaly=that.y;
}

function FlechaAtoB(where,a,b,margen){
	this.margen=margen||60;
	this.color="rgb(0,0,0);";
	this.x0=a.x;
	this.y0=a.y;
	this._rotation={};
	this.x1=b.x;
	this.y1=b.y;
	this._rotation=getAngulo({x:a.x,y:a.y},{x:b.x,y:b.y});	
	this.rotation=this._rotation.radianes;
	this.x0=a.x+(Math.cos(this.rotation)*this.margen);
	this.y0=a.y+(-Math.sin(this.rotation)*this.margen);
	this.x1=b.x-(Math.cos(this.rotation)*this.margen);
	this.y1=b.y-(-Math.sin(this.rotation)*this.margen);
	this.contenedor=new CAAT.ActorContainer().setBounds(0,0,1,1).enableEvents(false);
	where.addChild(this.contenedor);
	where=this.contenedor;
	/*var anl=getAngulo({x:a.x,y:a.y},{x:b.x,y:b.y});		
		            	
		var	pro={
			x:a.x,
			y:a.y,
			x1:b.x,
			y2:b.y,
			rotation:anl.radianes,
		}
		*/
	var dist=getDistancia({x:this.x0,y:this.y0},{x:this.x1,y:this.y1});
	this.l1=this.l1||new Linea({x:this.x0,y:this.y0},{x:this.x1,y:this.y1},where,this.color);
	this.l2=this.l2||new Linea({x:this.x1+(Math.cos(-this.rotation+(Math.PI/4)+Math.PI)*20),y:this.y1+(Math.sin(-this.rotation+(Math.PI/4)+Math.PI)*20)},{x:this.x1,y:this.y1},where,this.color);
	this.l3=this.l3||new Linea({x:this.x1+(Math.cos(-this.rotation-(Math.PI/4)+Math.PI)*20),y:this.y1+(Math.sin(-this.rotation-(Math.PI/4)+Math.PI)*20)},{x:this.x1,y:this.y1},where,this.color);
	this.update=function(){
			this._rotation=getAngulo({x:this.x0,y:this.y0},{x:this.x1,y:this.y1});	
			this.rotation=this._rotation.radianes;
			this.xi=this.x0+(Math.cos(this.rotation)*this.margen);
			this.yi=this.y0+(-Math.sin(this.rotation)*this.margen);
			this.xf=this.x1-(Math.cos(this.rotation)*this.margen);
			this.yf=this.y1-(-Math.sin(this.rotation)*this.margen);
			var dist=getDistancia({x:this.x0,y:this.y0},{x:this.xf,y:this.yf});
			//console.log(dist,this.xi,this.yi,this.xf,this.yf);
			
			if(dist<this.margen){
				this.xf=this.xi;
				this.yf=this.yi;
			}
			
			
			this.l1.p1(this.xi,this.yi);
			this.l2.p1(this.xf+(Math.cos(-this.rotation+(Math.PI/4)+Math.PI)*20),this.yf+(Math.sin(-this.rotation+(Math.PI/4)+Math.PI)*20));
			this.l3.p1(this.xf+(Math.cos(-this.rotation-(Math.PI/4)+Math.PI)*20),this.yf+(Math.sin(-this.rotation-(Math.PI/4)+Math.PI)*20));
			
			this.l1.p2(this.xf,this.yf);
			this.l2.p2(this.xf,this.yf);
			this.l3.p2(this.xf,this.yf);
	}
	
	this.p1=function(x0,y0){
		this.x0=x0;
		this.y0=y0;
		this.update();
	}
	this.p2=function(x1,y1){
		this.x1=x1;
		this.y1=y1;
		this.update();
	}
	//this.update();
}
function getAngulo(point0,point){
	var distanceX = point0.x - point.x; 
	var distanceY = point0.y - point.y; 
	var angleInRadians = Math.atan2(distanceY, -distanceX); 
	var andleInDegrees = angleInRadians * (180 / Math.PI); 
	return {grados:andleInDegrees,radianes:angleInRadians};
}

function getDistancia(point0,point1){
	xdis=point1.x-point0.x;
	ydis=point1.y-point0.y;
	return Math.sqrt((xdis*xdis)+(ydis*ydis));
}
function intercambiarPosicionesRand(arr){
	var pos=[];
	for(var g in arr){
		pos.push({x:arr[g].x,y:arr[g].y});
	}
	shuffle(pos);
	for(var g in pos){
		arr[g].x=pos[g].x;
		arr[g].y=pos[g].y;
		setoriginalpos(arr[g]);
	}
}

function Linea(from,to, where,color){
	color=color||'rgb(255,0,0);';
	this.line=this.line||new CAAT.Actor().setBounds(0,0,500,500).enableEvents(false);
	where.addChild(this.line);
	this.line.from=from;
	this.line.to=to;
	this.line.paint= function(director, time) {
		var ctx= director.ctx;
		var gap= 80;

		ctx.strokeStyle= color;
		ctx.beginPath();
		ctx.moveTo(this.from.x,this.from.y);
		ctx.lineTo(this.to.x,this.to.y);
		ctx.lineWidth=5;
		ctx.lineJoin='round';
		ctx.lineCap='round';
		ctx.stroke();
	};
	this.p1=function(x,y){
		this.line.from.x=x;
		this.line.from.y=y;
	}
	this.p2=function(x,y){
		this.line.to.x=x;
		this.line.to.y=y;
	}
}
function sube(that){
	that.parent.setZOrder( that, Number.MAX_VALUE );
}
function clicktap(obj, fncb){
	obj.enableEvents(true);
	obj._clicktaps=obj._clicktaps||[];
	obj._clicktaps.push(fncb);
	obj.mouseDown=function(e){				
		console.log("mousedown",e);
		for(var k in this._clicktaps){
			this._clicktaps[k](e);
		}
		this.mouseUp(e);
	}
}
function Button(elemento,clickCb){
	
}

function tocasuena(que,cual){
	clicktap(que,function(){ sonido.play(cual) });
}

function shakeevery(what,ini,to){
	
	var rb = new CAAT.RotateBehavior().
				setCycle(false).
				setFrameTime(what.time+randomInt(ini,to), 500).
				setValues( 0, Math.PI/20 , .50, .50 ).
				setPingPong(true);
		window.bha=rb;
	rb.addListener({
		behaviorExpired : function(behavior, time, actor) {
			//jump(what,ini,to);
			shakeevery(what,ini,to);
		}});
	if(what.shake!=false){
		what.addBehavior(rb);
	}else{
		//what.removeBehaviour(what.behaviorList[0]);
	}

}
function jump(what,ini,to){
	var g=tweenTranslation(uniq("what!"),what,1000, what.x, what.y-20,rebote,false,randomInt(ini,to),0,0,true);
	trace("!>>>",tituloanim.y);
	g.addListener({
		behaviorExpired : function(behavior, time, actor) {
			jump(what,ini,to);
		},
		behaviorStarted: function(behavior, time, actor){
			
		}
	});
}