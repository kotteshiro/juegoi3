var instances = [];
var loading;
var funciones = [];
var funciones1 = [];

function sc(fncallback, scena) {
    funciones.push({
        cb: fncallback,
        sc: scena
    });
}

function trace() {
    if (true) console.log(arguments);
}

loading = function (pc) {
    trace("cargando: ", pc);
}

function obj(namae, escena, imgid, x, y, sx, sy) {
    x = x ? x : 0;
    y = y ? y : 0;
    sx = sx ? sx : 1;
    sy = sy ? sy : 1;
	
    var a = new CAAT.Actor().
    setBackgroundImage(director.getImage(imgid));
    a.setLocation(0, 0);
    a.setScaleAnchored(sx, sy, 0, 0);
    switch (x) {
    case "center":
        x = (escena.width / 2) - (a.width / 2);
        break;
    }
    switch (y) {
    case "center":
        y = (escena.height / 2) - (a.height / 2);
        break;
    }
    a.setLocation(x, y);
    a.cacheAsBitmap(1000, CAAT.Foundation.Actor.CACHE_SIMPLE);
    escena.addChild(a);
    if (escena.instancias == undefined) escena.instancias = [];
    if (escena.instancias[namae] != undefined) console.warn("Instancia de nombre: " + escena.instancias[namae].name + " ya existe.");
    escena.instancias[namae] = a;
    a.name = namae;
    return a;

}

function btn(namae, escena, prop) {
    //spr,x,y,fncb
    trace("miau");
    prop.sprite[3] = prop.sprite[3] ? prop.sprite[3] : prop.sprite[2];
    prop.sprite[4] = prop.sprite[4] ? prop.sprite[4] : prop.sprite[2];
    // setAsButton(spriteImageIndex, normal, over, press, disabled, fn)
    var b1 = new CAAT.Actor().setAsButton(prop.sprite[0].getRef(), prop.sprite[1], prop.sprite[2], prop.sprite[3], prop.sprite[4], prop.click).
    setLocation(prop.x, prop.y);
    escena.addChild(b1);
    b1.name = namae;
    b1.olffunc = b1.mouseEnter;

    b1.mouseEnter = function (e) {
        b1.olffunc();
        if (prop.mouseEnter) prop.mouseEnter(e);
        sonido.play("boton")
    }
    b1.olffuncme = b1.mouseExit;

    b1.mouseExit = function (e) {
        b1.olffuncme()
        if (prop.mouseExit) prop.mouseExit(e);
    }
    return b1;
}

function placeHelper(actor) {
    //actor.enableDrag();
    window.toplace = actor;
    addEventListener("touchmove", function (a) {

        window.toplace.x = window.toplace.originx + (a.touches[0].clientX - window.toplace.touchstartx);
        window.toplace.y = window.toplace.originy + (a.touches[0].clientY - window.toplace.touchstarty);
    });
    addEventListener("touchstart", function (a) {
        console.log(a);
        window.toplace.touchstartx = a.touches[0].clientX;
        window.toplace.touchstarty = a.touches[0].clientY;
        window.toplace.originx = window.toplace.x;
        window.toplace.originy = window.toplace.y;
    });
    addEventListener("touchend", function (a) {
        console.log(">>", window.toplace.x, ",", window.toplace.y);
    });
    /*actor.mouseUp=function(a){
		console.log(a);
		trace(actor.x+","+actor.y);
		savelocal();
	}*/
}


function destacadoonmover(actor) {
    if (alphawhj == true)
        actor.setAlpha(.5);
    actor.mouseEnter = function (a) {
        if (alphawhj == true)
            actor.setAlpha(1);
        trace(actor.name);
    }
    actor.mouseExit = function (a) {
        if (alphawhj == true)
            actor.setAlpha(.5);
    }
}

function tweenTranslation(id, actor, time, tox, toy, interpolacion, cycle, delay, x, y) {
    //interpolacion=interpolacion ? interpolacion : new CAAT.Interpolator().createExponentialOutInterpolator(1,false);
    //TO-DO: Reciclar comportamientos (Behavior), actualmente se agregan N por cada llamada a esta funcion, la idea es que al llamar al mismo tween si existe reprodusca uno ya existente.
    delay = (delay != undefined) ? delay : 0;
    x = (x != undefined) ? x : 0;
    y = (y != undefined) ? y : 0;
    //trace(">>",actor);
    var path = new CAAT.Path().setLinear(actor.x + x, actor.y + y, tox + x, toy + y, interpolacion);

    //var interpolacion=new CAAT.Interpolator().createExponentialOutInterpolator(1,false);
    var path_behavior = new CAAT.PathBehavior().
    setPath(path). //seting path
    setFrameTime(actor.time + delay, time). // take 5 seconds to traverse the path
    setCycle(cycle). // do it continuously?, not, just one time
    setInterpolator(interpolacion).
    setAutoRotate(false);  // head the actor across the path to the next point
    //trace(x,y);
    /*if(x!==undefined && y!==undefined){
			trace("setenado traslasion");
			path_behavior.setTranslation(x,y);// set path traverse by the center of the rectangle shape.
		}*/
    actor.addBehavior(path_behavior);
    return path_behavior;
}

function tweenScale(id, actor, time, tox, toy, interpolacion, cycle, delay) {
    //interpolacion=interpolacion ? interpolacion : new CAAT.Interpolator().createExponentialOutInterpolator(1,false);
    //TO-DO: Reciclar comportamientos (Behavior), actualmente se agregan N por cada llamada a esta funcion, la idea es que al llamar al mismo tween si existe reprodusca uno ya existente.
    delay = (delay != undefined) ? delay : 0;
    /*	x=(x!=undefined) ? x : 0;
    	y=(y!=undefined) ? y : 0;*/
    trace(">>", actor);
    //var path= new CAAT.Path().setLinear( actor.x+x,actor.y+y, tox+x, toy+y, interpolacion);

    //var interpolacion=new CAAT.Interpolator().createExponentialOutInterpolator(1,false);
    var comporta1 = new CAAT.ScaleBehavior(actor.width / 2, actor.height / 2, 1, 1, 0, 0).
    setFrameTime(this.time, 500).
    setValues(1, 2, 1, 2).
    setPingPong();
    actor.addBehavior(comporta1);
    return comporta1;
}

function toscenaanim(ixin) {
        if (isNaN(ixin)) {
            for (var i in director.scenes) {
                if (director.scenes[i].name == ixin) {
                    ixin = i;
                    break;
                }
                trace("toscenaanim: " + director.scenes[i].name)
            }
        }
        var oi = new CAAT.Interpolator().createBounceOutInterpolator(0, false);
        var ixout = director.scenes.indexOf(director.currentScene);
        director.easeInOut(
            ixin, CAAT.Scene.EASE_TRANSLATE, CAAT.Actor.prototype.ANCHOR_TOP,
            ixout, CAAT.Scene.EASE_TRANSLATE, CAAT.Actor.prototype.ANCHOR_TOP,
            1000, .1, oi, oi);
        updatebtnmute();
    }
    /** Editor **/

function saveproprops(down) {
    down = (down == undefined) ? true : false;
    var props = {};
    for (var i in todo) {
        var j = {
            x: todo[i].x,
            y: todo[i].y
        };
        props[todo[i].name] = j;
    }
    var tosave = JSON.stringify(props);
    trace(tosave);
    if (down)
        descargarArchivo(tosave, "props.js");
    return tosave;
}

function descargarArchivo(tx, nombreArchivo) {
    contenidoEnBlob = generarTexto([tx])
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

function savelocal() {
    localStorage["savepos"] = saveproprops(false);
}

function loadlocal() {
    if (localStorage["savepos"]) {
        var prop = JSON.parse(localStorage["savepos"]);
        trace(prop);
        for (var i in todo) {
            todo[i].x = prop[todo[i].name].x;
            todo[i].y = prop[todo[i].name].y;
        }
    }
}

function restablecer() {
    localStorage["savepos"] = undefined;
    window.location.reload();
}

function updatealpha(a) {
    alphawhj = a
    if (alphawhj == false) {
        for (var i in todo) {
            todo[i].setAlpha(1);
        }
    } else {
        for (var i in todo) {
            todo[i].setAlpha(.5);
        }
    }
}

function MovieClipSprite(spriteref, secuencia, fps, x, y) {
        this.fps = fps;
        this.currentFrame = 0;
        this.stopatend = false;
        this.originalSecuence = secuencia;
        this.actor = tmp = new CAAT.Actor().
        setBackgroundImage(spriteref, true).
        setLocation(x, y).
        setScale(1, 1).
        setAnimationImageIndex(secuencia).
        setChangeFPS(this.fps).
        enableEvents(false);
        //this.actor.backgroundImage.changeFPS=Number.MAX_VALUE;


        this.actor.backgroundImage.spriteIndex = this.currentFrame;
        this.stop = function (ix) {
            if (!isNaN(ix)) {
                this.currentFrame = ix;
                this.actor.backgroundImage.spriteIndex = this.currentFrame;
                this.actor.setAnimationImageIndex([ix]);
            } else {
                this.currentFrame = this.actor.backgroundImage.spriteIndex;
                this.actor.setAnimationImageIndex([this.actor.backgroundImage.spriteIndex]);
            }
            return this;
        }
        this.play = function (ix, stopatend) {
            trace("play", ix, stopatend);
            this.stopatend = (stopatend) ? true : false;
            this.actor.backgroundImage.changeFPS = this.fps;
            if (!isNaN(ix)) {
                this.currentFrame = ix;
                this.actor.backgroundImage.spriteIndex = this.currentFrame;
                trace("V");
            }
            this.actor.setAnimationImageIndex(this.originalSecuence)
            return this;
        }
        var self = this;
        this._cbendanim = function (e) {
            trace("end", self.stopatend, self);
            if (self.stopatend) {
                self.stop();
            }
        }
        this.actor.setAnimationEndCallback(this._cbendanim)
        this.getActor = function () {
            return this.actor;
        }
        return this;
    }
    //***End Editor***//

function getRandomA(arr) {
    return arr[randTo(arr.length)];
}

function randTo(nu) {
    return parseInt(Math.random(10) * nu)
}

function parseEaseljs(lib, escena) { // pe: parse(lib.test, primeraesecena)
    lib = lib || {};
    lib.prototype = lib.prototype || {};
    lib.prototype.addChild = function () {
            trace("ARGUMENTS:", arguments);
            var args = arguments;
            for (var i in arguments) {
                trace("!>", i, arguments[i]);
                var inst = arguments[i];

                inst._ac = new CAAT.ActorContainer();
                inst.nominalBounds = inst.nominalBounds || {};
                inst._ac.setBounds(inst.x, inst.y, inst.nominalBounds.width || 1, inst.nominalBounds.height || 1); //todo: width and height
                inst._ac.inst = inst;
                console.log(inst);
                inst._ac.paint = function (a, x) {
                        var inst = this.inst;
                        inst.draw(director.ctx);
                    }
                    //if(inst.children!=undefined){
                    //parseEaseljs(inst,escena);
                instances.push(inst);
                lastinst = inst;
                escena.addChild(inst._ac);

            }
        }
        //var la=new lib();
    return instances;
}

function customlog() {
    console.log = function () {
        var ja = ""
        for (var k in arguments) {
            ja += arguments[k] + " ";
        }
        document.getElementById("consoleoutput").innerHTML += ja + "<br>";
    }
}

function ck(a) {
    var rn = true;
    if (!a) rn = false;
    a = a || {};
    return rn;
}

function uniq(pre) {
    return pre + "_" + Math.random(); //fix it!
}

function getsprt(spritename, ancho, alto) {
    sprtglobal[spritename] = sprtglobal[spritename] || new CAAT.SpriteImage().initialize(director.getImage(spritename), alto, ancho);
    return sprtglobal[spritename];
}

function spashMsg(src, fncb, requireclick) {
	trace("Splash Message!");
	clockController("pause");
    requireclick = requireclick || false;
    fncb = (fncb) ? fncb : function () {};
    escondeescenario();
    //obj("inst00",director,'fondo_a',0,0,.5,.5);
    //spla=obj("splashmsg",director.currentScene,'tit_excelente',0,0,.5,.5);.
    var zona2 = obj(uniq("z"), director.currentScene, 'zonasensiblefull', 0, 0, 1, 1);
    var img = director.getImage(src);
    var comporta1 = new CAAT.ScaleBehavior() //aparece
        .setFrameTime(director.currentScene.time, 500)
        .setValues(0, 1, 0, 1)
        .setInterpolator(new CAAT.Interpolator().createBounceOutInterpolator(0, false));

    /*var g=tweenTranslation("tituloanim",tituloanim,1000,tituloanim.x,0,rebote,false,600);
	trace("!>>>",tituloanim.y);*/
    comporta1.addListener({
        behaviorExpired: function (behavior, time, actor) {
            if (!requireclick) setTimeout(function () {
                spla.desapareceme();
            }, 800)
            //tweenTranslation("tituloanim",actor,5000,actor.x,actor.y+10,new CAAT.Interpolator().createExponentialInOutInterpolator(true,1),true,0,0,0);
        }
    });
    var spla = new CAAT.Actor()
        .setBackgroundImage(img)
        .setLocation((director.width / 2) - (img.width / 2), (director.height / 2) - (img.height / 2))
        .emptyBehaviorList()
        .addBehavior(comporta1);

    director.currentScene.addChild(spla);
    spla.mouseEnabled = true;

    spla.clickcb = fncb;
    spla.desapareceme = function () {
        trace("DESAPARECEME!!");
        zona2.destroy();
        var comporta2 = new CAAT.ScaleBehavior() //desaparece
            .setFrameTime(director.currentScene.time, 300)
            .setValues(1, 0, 1, 0);
        //.setInterpolator(new CAAT.Interpolator().createBounceOutInterpolator(0,false));

        this.addBehavior(comporta2);
        comporta2.addListener({        
            behaviorExpired: function (behavior, time, actor) {           
                actor.destroy();        
            }
        });
        this.clickcb();
        //this.destroy();
    }
    spla.mouseClick = spla.desapareceme;
    //tweenScale("btnshow5",spla,1000,0,0,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,1500);

    return spla;

}

function randomInt(ini, to) {
    return Math.round(Math.random() * (to - ini)) + ini
}

function layout(position) {
    var coord = {
        x: 0,
        y: 0
    };

    switch (position) {
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