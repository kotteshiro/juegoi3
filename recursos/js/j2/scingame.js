 //var scprinc= director.createScene();
var clocktype="";
var alphawhj;
var gen;
var todo = [];
var logro;
var menux;
var escenajuego;
var e1, e2, e3;
var etapa;
var litFigureBookSprite;
var hojasFigLitSprite = new Array();
var spritePrefix = "figlit_";
var figsLiters = ["personificacion", "comparacion", "hiperbole", "metafora"];
var holders = new Array();
var countDownTime = 60/60;
var avisostimeout=["tit_intento1","tit_intento2"];
var avisoindex=0;
var currLevel=1;
var currE;
var currM;
var comenzo1=false;
var comenzo2=false;
var comenzo3=false;
function avisoTO(){
	spashMsg(avisostimeout[avisoindex]);
	comenzo1=false;
	sonido.play("TIME_OVER");
	avisoindex++;
	if(avisoindex>=avisostimeout.length){
		avisoindex=0;
	}
}

function onTimeOver(time) {
	//alert("Time's upa!"+time);
	//logro.reset();
	if(time==0){
		 sonido.play("timeout");
		if(logro.getLvlIx()<4){
			while(logro.getLvlIx()>0){
				logro.removeLogro();
			}
			avisoTO();
		}else if(logro.getLvlIx()<8){
			while(logro.getLvlIx()>4){
				logro.removeLogro();
			}
			avisoTO();
		}else{
			while(logro.getLvlIx()>8){
				logro.removeLogro();
			}
		}
		clockController("init");
	}
	//pantallaGameOver(currScore,"tit_intento1");
}

sc(function(escena) {
    escenajuego = escena;
    escena.name = "scingame";
	//alert("ANYON");
	// Nico
	if(hojasFigLitSprite.length <= 0) {
		var figname;
		var tmpSprite;
		
		for(var i = 0; i < figsLiters.length; i++) {
			figname = spritePrefix + figsLiters[i];
			trace("Trying to load sprite '" + figname + "'.");
			tmpSprite = getsprt(figname, 6, 1);
			tmpSprite.id = figsLiters[i];
			hojasFigLitSprite.push(tmpSprite);
			tmpSprite = undefined;
		}
	}
	
	if(litFigureBookSprite == undefined) {
		trace("Loading literary figure books sprite");
		litFigureBookSprite = getsprt("flit_libros_sprite", 2, 2);
	}


    obj("fondo_escena", escenajuego, "fondo", -1, 0, 1, 1);
    obj("fondo_hojas", escenajuego, "fondo_hojas", 12, 147, 1, 1);
	gamestart();
});
function gamestart(){
	
	_etapa1();
	

	if(logro){
		logro.reset();		
	}else
		logro=new aclogro(escenajuego, 200, 700);
}
function limpiaescenario(){
	if(currE){
		if(currE.menu){
			currE.menu.destroy();
		}
		if(currE.logro){
			currE.logro.destroy();
		}
		currE.ac.destroy();
		currE.menu=undefined;
	}
}
function _etapa1(){
    limpiaescenario();
    currE=e1=new Etapa1(escenajuego);
	e1.setTime();
    e1.startIntento();
    e1.menu=new MenuInGame(escenajuego);
	etapa = e1;
}

function _etapa2(){
	trace("Etapa 2");
	limpiaescenario();
    currE=e2=new Etapa2(escenajuego);
	
    e2.startIntento();
    e2.menu=new MenuInGame(escenajuego);
	etapa = e2;
}
 
function _etapa3(){
   // e2.ac.destroy();
   countDownTime=90/60;
   limpiaescenario();
    currE=e3=new Etapa3(escenajuego);
    e3.startIntento();
	/*if(e2.menu)
		e2.menu.destroy();*/
    e3.menu=new MenuInGame(escenajuego);
	etapa = e3;
}

function Etapa1(padre) {
    trace("Class Etapa1");
	var actors;
    
    this.startIntento = function() {
        this.actors = loadLiteraryBooks(this.ac, 2);
		trace("startIntento:", this.actors);
    }
    
    this.quitarPaginas = function() {
		if(this.actors != undefined)	{
			for(var i = 0; i < actors.types.length; i++) {
				actors.types[i].volver();
				actors.types[i].destroy();
			}
		}
    };

    //*** FIN DECLARACIONES ***//
    
    this.ac = new CAAT.ActorContainer().setClip(true);
    this.ac.setBounds(5, 5, 1024 - 10, 768 - 10);
    window.enunciado=this.enunciado = new Enunciado(this.ac);
    padre.addChild(this.ac);
}

function Etapa2(padre) {
	
    trace("Class Etapa2");
	var actors;
    //*** FIN DECLARACIONES ***//
    
    this.ac = new CAAT.ActorContainer().setClip(true);
    this.ac.setBounds(5, 5, 1024 - 10, 768 - 10);
    this.enunciado = new Enunciado(this.ac);
    
    this.startIntento = function() {
		clockController("start");
		if(!comenzo1){
			clockController("pause");
		}
        this.actors = loadLiteraryBooks(this.ac, 3);
		trace("startIntento:");
		trace(this.actors);
    };
	
    padre.addChild(this.ac);
}

function Etapa3(padre) {
    trace("Class Etapa2");
	var actors;
    //*** FIN DECLARACIONES ***//
    
    this.ac = new CAAT.ActorContainer().setClip(true);
    this.ac.setBounds(5, 5, 1024 - 10, 768 - 10);
    this.enunciado = new Enunciado(this.ac);
    
    this.startIntento = function() {
		
		clockController("start");
		
		if(!comenzo1){
			clockController("pause");
		}
		
        this.actors = loadLiteraryBooks(this.ac, 4);
		trace("startIntento:");
		trace(this.actors);
    };
    
    padre.addChild(this.ac);
}

Etapa1.prototype.removePages = Etapa2.prototype.removePages = Etapa3.prototype.removePages = function() {
	for(var i = 0; i < this.actors.types.length; i++) {
		this.actors.types[i].volver();
	}
};

Etapa1.prototype.setTime = Etapa2.prototype.setTime = Etapa3.prototype.setTime = function() {
	trace("Tiene time: " + tienetime);
};

Etapa1.prototype.reset = Etapa2.prototype.reset = Etapa3.prototype.reset = function() {
	trace("Reset:");
	trace(this.actors);
	var i = 0;
	
	for(i; i < this.actors.books.length; i++) {
		this.actors.books[i].destroy();
	}
	
	for(i = 0; i < this.actors.types.length; i++) {
		this.actors.types[i].destroy();
	}
	
	resetholders();
	this.actors = undefined;
	if (advanceLevel())
		this.startIntento();
};
/*
function animaa(obj, props) {
    if (props.x) { // animapos
        obj.x = props.x //TODO
        obj.y = props.y //TODO
    }
    if (props.scalex) {
        obj.setScale(props.scalex, props.scaley)
    }
}*/

function Enunciado(dad) {
    this.currNum1;
    this.currNum2;
    this.bg = obj(uniq("enunciado"), dad, "enunciado", 242, 29);
	
	tocasuena(this.bg,"sonidoEnunciado");
}

function newgamelvl1() {
    trace("nuevo juego lvl 1");
	logro.reset();
    var ac = new CAAT.ActorContainer().setClip(true);
    ac.setBounds(5, 5, 1024 - 10, 768 - 10);
    var gam = acjuego(ac).obj;
    
    return ac
}


// Nico
function loadLiteraryBooks(where, count) {
	trace("LoadLiteraryType(" + where + ", " + count + ")");
	resetholders();
	var actors = {
		books: new Array(),
		types: new Array()
	};
	var tmp;
	var cols;
	
	if(count < 4) {
		cols = new Array();
		for(var i = 0; i < count + 1; i++) {
			cols.push(i);
		}
	} else {
		cols = [0, 1, 2, 3];
	}
	
	// shuffles the array content.
	cols = shuffle(cols);
	trace("Shuffled:")
	trace(cols);
	
	switch(count) {
		default:
			trace("Default - Loads 3 pages and 2 books");
			tmp = btn(uniq("fbook"), where,
				{
					sprite:	[litFigureBookSprite, cols[0], cols[0]],
					x: 144,
					y: 405,
					hoveranim:false
				}
			);
			tmp.id = getLiteraryTypeName(cols[0]);
			tmp.generic = "book";
			actors.books.push(tmp);
			tmp = undefined;
			
			tmp = btn(uniq("fbook"), where,
				{
					sprite: [litFigureBookSprite, cols[1], cols[1]],
					x: 566,
					y: 405,
					hoveranim:false
				}
			);
			
			tmp.id = getLiteraryTypeName(cols[1]);
			tmp.generic = "book";
			actors.books.push(tmp);
			
			actors.types = loadLiteraryPages(where, [
				hojasFigLitSprite[cols[0]],
				hojasFigLitSprite[cols[1]],
				hojasFigLitSprite[cols[2]]
			], 229);
			break;
			
		case 3:
			trace("Loading 4 pages and 3 books");
			tmp = btn(uniq("fbook"), where,
				{
					sprite:	[litFigureBookSprite, cols[0], cols[0]],
					x: 334,
					y: 384,
					hoveranim:false
				}
			);
			tmp.id = getLiteraryTypeName(cols[0]);
			tmp.generic = "book";
			actors.books.push(tmp);
			tmp = undefined;
			
			tmp = btn(uniq("fbook"), where,
				{
					sprite: [litFigureBookSprite, cols[1], cols[1]],
					x: 130,
					y: 516,
					hoveranim:false
				}
			);
			tmp.id = getLiteraryTypeName(cols[1]);
			tmp.generic = "book";
			actors.books.push(tmp);
			
			tmp = btn(uniq("fbook"), where,
				{
					sprite: [litFigureBookSprite, cols[2], cols[2]],
					x: 546,
					y: 516,
					hoveranim:false
				}
			);
			tmp.id = getLiteraryTypeName(cols[2]);
			tmp.generic = "book";
			actors.books.push(tmp);
			
			actors.types = loadLiteraryPages(where, [
				hojasFigLitSprite[cols[0]],
				hojasFigLitSprite[cols[1]],
				hojasFigLitSprite[cols[2]],
				hojasFigLitSprite[cols[3]]
			], 153);
			break;
			
		case 4:
			trace("Loading 5 pages and 4 books");
			
			tmp = btn(uniq("fbook"), where,
				{
					sprite:	[litFigureBookSprite, cols[0], cols[0]],
					x: 146,
					y: 384,
					hoveranim:false
				}
			);
			tmp.id = getLiteraryTypeName(cols[0]);
			tmp.generic = "book";
			actors.books.push(tmp);
			tmp = undefined;
			
			tmp = btn(uniq("fbook"), where,
				{
					sprite: [litFigureBookSprite, cols[1], cols[1]],
					x: 568,
					y: 384,
					hoveranim:false
				}
			);
			tmp.id = getLiteraryTypeName(cols[1]);
			tmp.generic = "book";
			actors.books.push(tmp);
			
			tmp = btn(uniq("fbook"), where,
				{
					sprite: [litFigureBookSprite, cols[2], cols[2]],
					x: 146,
					y: 516,
					hoveranim:false
				}
			);
			tmp.id = getLiteraryTypeName(cols[2]);
			tmp.generic = "book";
			actors.books.push(tmp);
			
			tmp = btn(uniq("fbook"), where,
				{
					sprite: [litFigureBookSprite, cols[3], cols[3]],
					x: 568,
					y: 516,
					hoveranim:false
				}
			);
			tmp.id = getLiteraryTypeName(cols[3]);
			tmp.generic = "book";
			actors.books.push(tmp);
			
			actors.types = loadLiteraryPages(where, [
				hojasFigLitSprite[cols[0]],
				hojasFigLitSprite[cols[1]],
				hojasFigLitSprite[cols[2]],
				hojasFigLitSprite[cols[3]]
			], 111);
			break;
	}
	
	holders = actors.books;
	tmp = undefined;
	cols = undefined;
	valid = new Array();

	for(var i = 0; i < actors.books.length; i++) {
		//holders[i].addBehavior(rb);
		holders[i].valid = false;
		holders[i].hasElement = false;
	}
	
	return actors;
}

function loadLiteraryPages(where, spriteArray, startPosX) {
	trace("Loading literary types images.");
	var actors = [];
	spriteArray = shuffle(spriteArray);
	var spriteElWidth = spriteArray[0].width / 6;
	trace("SpriteArray Length: " + spriteArray.length);
	trace(spriteArray);
	
	window.ojas=[];
	for(var i = 0; i < spriteArray.length; i++) {
		var element = spriteArray[i];
		trace("Element:", element);
		trace("Generic type: " + element.id);
		var col = randomInt(0, 5);
		var tmp = btn(uniq("lfig"), where,
			{
				sprite: [element, col],
				x: startPosX,
				y: 150
			}
		);
		shakeevery(tmp,4000,10000);
		
		window.ojas.push(tmp);
		tmp.id = element.id;
		addDragNDrop(tmp,
			function(e) {
				comenza(1);
			},
			function(e) {
				trace("onDrop");
				trace(e.source);
				trace("DropsOn:")
				trace(e.dropsOn);
				e.source.x = e.dropsOn.x - 20;
				e.source.y = e.dropsOn.y - 30;
				
				e.dropsOn.id = e.dropsOn.id.replace(spritePrefix, '');
				trace("source.id = " + e.source.id + ", dropson.id = " + e.dropsOn.id);
				e.dropsOn.valid = e.source.id == e.dropsOn.id;
				
				if(!e.dropsOn.valid) {
					logro.wrongAnswer();
					e.dropsOn.hasElement = false;
					e.source.shake=true;;
					e.source.volver();
				} else {
					e.source.shake=false;
					logro.correctAnswer();
					checkEarnCondition();
					removeDragNDrop(e.source);
				}
			},
			function(e) {
				/*var droppedOn = checkDrop(e);
				if(droppedOn){
					console.log("plama",droppedOn);
					droppedOn.origaa=droppedOn.backgroundImage.spriteIndex;
					droppedOn.backgroundImage.spriteIndex=droppedOn.origaa+4;
					//droppedOn.
				}else{
				//	droppedOn.backgroundImage.spriteIndex=droppedOn.origaa
				}*/
			}
		);
		actors.push(tmp);
		startPosX += spriteElWidth;
	}
	
	return actors;
}

function getLiteraryTypeName(index) {
	var lname = spritePrefix + figsLiters[index];
	trace("Literary Type name: " + lname, index);
	return lname;
}



function addDragNDrop(object, onDrag, onDrop, onDragging) {
	object.originalx = object.x;
	object.originaly = object.y;
	
	object.mouseDown = function(e) {
		comenza(1);
		sube(this);
		trace("Start dragging.");
		trace(e);
		this.currsx=this.currsy=.4;
		this.setScale(.4, .4);
		
		if(onDrag)
			onDrag.call(this, e);
	}
	
	object.mouseUp = function(e) {
		trace("Drop!");
		var droppedOn = checkDrop(e);
		
		if(droppedOn != false && droppedOn.hasElement == false) {
			e.dropsOn = droppedOn;
			droppedOn.hasElement = true;
			
			if(onDrop) {
				onDrop.call(this, e);
			}
		} else {
			this.volver();
		}
	}
	
	object.mouseDrag = function(e) {
		this.setPosition(e.screenPoint.x-this.width/2,e.screenPoint.y-this.height/2);
		
		if(onDragging)
			onDragging.call(this, e);
	}
	
	object.volver = function() {
		this.currsx=this.currsy=1;
		animaa(this, {x: this.originalx, y: this.originaly, scalex: 1, scaley: 1, alpha: 1});
	}
}

function removeDragNDrop(object) {
	trace("Removing drag n drop.");
	trace(object);
	object.mouseDown = object.mouseUp = object.mouseDrag = object.volver = function() {};
}

function checkDrop(o) {
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

function addToDrop(o) {
	if(holders.indexOf(o) == -1)
		holders.push(o);
}

function resetholders() {
	holders = [];
}

function checkEarnCondition() {
	trace("Check earn condition");
	var earnPoint = true;
	var isComplete = true;
	
	for(var i = 0; i < holders.length; i++) {
		trace("Has Element: " + holders[i].hasElement);
		
		if(!holders[i].hasElement) {
			earnPoint = isComplete = false;
			break;
		}
		
		earnPoint &= holders[i].valid;
	}
	
	trace("Will earn point? " + earnPoint);
	
	if(earnPoint) {
		if(logro) {
			logro.addLogro();
			setTimeout(function(){
			etapa.reset();
			}, 1000);
			
		}
		else
			trace("no logro ¬¬");
	} else {
		if(isComplete) {
			logro.wrongAnswer();
		}
	}
}

function advanceLevel(){
    if(logro) {
        switch(logro.getLvlIx()){
            case 4:
				if(currLevel!=2){
					currLevel=2;
					comenzo1=false;
					logro.calculateScoreFromTime(Math.round(clockController("gettime")/1000),countDownTime*60)
					clockController("stop");
					sonido.play("PASAR-NIVEL");
					spashMsg("tit_intento3",function(){ setTimeout(_etapa2, 400); },false);
				}
				return false;
            	break;
            case 8:
				if(currLevel!=3){
					currLevel=3
					comenzo1=false;
					logro.calculateScoreFromTime(Math.round(clockController("gettime")/1000),countDownTime*60)
					
					clockController("stop");
					sonido.play("PASAR-NIVEL");
					spashMsg("tit_intento3",function(){ setTimeout(_etapa3, 400); },false);
					return false;
				}
            	break;
            case 12:
				logro.calculateScoreFromTime(Math.round(clockController("gettime")/1000),countDownTime*60)	
				clockController("stop");
				clockController("destroy");  
				comenzo1=false;
				if(!bgmusic.setVolume(.08)) bgmusic.setMute(true)
				sonido.play("EXCELENTE",function(){ if(!bgmusic.setVolume(.5)) bgmusic.setMute(false);},1);
				spashMsg("tit_excelente",function(){pantallaGameOver(currScore)},false);
				return false;
				break;
        }
         
    } else {
        console.error("no existe objeto logro");
    }
     return true;
}

/*
	Shuffles an object/array 'o'.
*/
function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

function getRandoms(count, min, max) {
    var randoms = new Array();
    
    for (var i = 0; i < count; i++) {
        var curRandom = randomInt(min, max);
        
        while (randoms.indexOf(curRandom) != -1) {
            curRandom = randomInt(min, max);
        }
        
        randoms.push(curRandom);
    }
    
    return randoms;
}