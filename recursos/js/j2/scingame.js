 //var scprinc= director.createScene();
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
var countDownTime = 0.1;

function onTimeOver(time) {
	trace("Time's up!");
}

sc(function(escena) {
    escenajuego = escena;
    escena.name = "scingame";
	
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
	//= Nico
	
    _etapa1();
    logro = aclogro(escena, 200, 700);
});

function _etapa1(){
    obj("fondo_escena", escenajuego, "fondo", 0, 0, 1, 1);
    obj("fondo_hojas", escenajuego, "fondo_hojas", 9, 147, 1, 1);
    e1=new Etapa1(escenajuego);
	e1.setTime();
    e1.startIntento();
    e1.menu=new MenuInGame(escenajuego);
	etapa = e1;
}
function _etapa2(){
	trace("Etapa 2");
    if(e1)
		e1.ac.destroy()
    if(e1.ac.memu)
		e1.ac.menu.destroy();
    //var tmp = obj("fondo_escena", escenajuego, "fondo", 0, 0, 1, 1);
    //obj("fondo_hojas", escenajuego, "fondo_hojas", 9, 147, 1, 1);
    e2=new Etapa2(escenajuego);
    e2.startIntento();
    e2.menu=new MenuInGame(escenajuego);
	etapa = e2;
}
 
function _etapa3(){
    e2.ac.destroy();
    e3=new Etapa3(escenajuego);
    e3.startIntento();
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
    this.enunciado = new Enunciado(this.ac);
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
	advanceLevel();
	this.startIntento();
};

function animaa(obj, props) {
    if (props.x) { // animapos
        obj.x = props.x //TODO
        obj.y = props.y //TODO
    }
    if (props.scalex) {
        obj.setScale(props.scalex, props.scaley)
    }
}

function Enunciado(dad) {
    this.currNum1;
    this.currNum2;
    this.bg = obj(uniq("enunciado"), dad, "enunciado", 242, 29);
}

function MenuInGame(escena) {
    function clicbtn(e) {
        switch (e.name) {
            case "btn2": //volver
				clockController("pause");
                confirmdialog(escena, function(conf) {
                    if (conf) {
						clockController("destroy");
                        toscenaanim(1);
						if(game1)
							game1.obj.init();
                    }
                });
                
                break;
            case "btn0":
				trace("Btn0 - PAUSE");
                enpausa(escena);
                //play
                break;
            case "btn3": //info
                lastScena = director.scenes.indexOf(director.currentScene);
                toscenaanim(3);
                break;
            case "btn5":
                mutebtnaction(e);
                break;
        }
        trace(e);
    }
    menux = acmenu(escena, [{ix: 2,fn: clicbtn}, {ix: 0,fn: clicbtn}, {ix: 3,fn: clicbtn}, {ix: 5,fn: clicbtn}, {ix: 4,fn: clicbtn}]); //siempre al top
    return menux;
}

function enpausa(escena) {
	trace("En Pausa!");
    clockController("pause");
    var h1_1 = obj("pa8a", escena, 'fondo_ayuda', 0, 0, 1, 1);
    var h1_0 = obj("fost08b", escena, 'en-pausa', 222, 137, 1, 1); //222,137
    h1_0.mouseClick = function(a) {
		clockController("resume");
        h1_1.destroy();
        h1_0.destroy();
    }
}
;
function newgamelvl1() {
    trace("nuevo juego lvl 1");
    var ac = new CAAT.ActorContainer().setClip(true);
    ac.setBounds(5, 5, 1024 - 10, 768 - 10);
    var gam = acjuego(ac).obj;
    
    return ac
}
function confirmdialog(ac, cb) {
    var h1_1 = obj("inst08", ac, 'fondo_ayuda', 0, 0, 1, 1);
    var h1_0 = obj("inst08", ac, 'dejar_juego', 222, 137, 1, 1);
    
    var h1_2 = btn("BTNSI", ac, {sprite: [spsino, 0, 0],x: 394,y: 331,click: _cb}).setScale(1, 1);
    var h1_3 = btn("BTNNO", ac, {sprite: [spsino, 1, 1],x: 394 + 100,y: 331,click: _cb}).setScale(1, 1);
    
    function _cb(e) {
        trace("0>>>>>", e);
        switch (e.name) {
            case "BTNSI":
                h1_0.destroy();
                h1_1.destroy();
                h1_2.destroy();
                h1_3.destroy();
                cb(true);
                break;
            case "BTNNO":
                h1_0.destroy();
                h1_1.destroy();
                h1_2.destroy();
                h1_3.destroy();
                cb(false);
                break;
        }
    }
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
					y: 405
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
					y: 405
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
					y: 384
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
					y: 516
				}
			);
			tmp.id = getLiteraryTypeName(cols[1]);
			tmp.generic = "book";
			actors.books.push(tmp);
			
			tmp = btn(uniq("fbook"), where,
				{
					sprite: [litFigureBookSprite, cols[2], cols[2]],
					x: 546,
					y: 516
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
					y: 384
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
					y: 384
				}
			);
			tmp.id = getLiteraryTypeName(cols[1]);
			tmp.generic = "book";
			actors.books.push(tmp);
			
			tmp = btn(uniq("fbook"), where,
				{
					sprite: [litFigureBookSprite, cols[2], cols[2]],
					x: 146,
					y: 516
				}
			);
			tmp.id = getLiteraryTypeName(cols[2]);
			tmp.generic = "book";
			actors.books.push(tmp);
			
			tmp = btn(uniq("fbook"), where,
				{
					sprite: [litFigureBookSprite, cols[3], cols[3]],
					x: 568,
					y: 516
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
		tmp.id = element.id;
		addDragNDrop(tmp,
			function(e) {
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
					e.source.volver();
				} else {
					checkEarnCondition();
					removeDragNDrop(e.source);
				}
			},
			function(e) {
				
			}
		);
		actors.push(tmp);
		startPosX += spriteElWidth;
	}
	
	return actors;
}

function getLiteraryTypeName(index) {
	var lname = spritePrefix + figsLiters[index];
	trace("Literary Type name: " + lname);
	return lname;
}

function addDragNDrop(object, onDrag, onDrop, onDragging) {
	object.originalx = object.x;
	object.originaly = object.y;
	
	object.mouseDown = function(e) {
		trace("Start dragging.");
		trace(e);
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
			etapa.reset();
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
        if(logro.getLvlIx()!=12 && logro.getLvlIx()!=4 && logro.getLvlIx()!=8) {
            sonido.play("mostrarpanel");
        }
		
        switch(logro.getLvlIx()){
            case 4:
				clockController("stop");
                spashMsg("tit_intento3",_etapa2,true);
            	break;
            case 8:
				clockController("stop");
                spashMsg("tit_intento3",_etapa3,true);
            	break;
            case 12:
				clockController("stop");
				clockController("destroy");
                spashMsg("tit_excelente");
				break;
        }
         
    } else {
        console.error("no existe objeto logro");
    }
     
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