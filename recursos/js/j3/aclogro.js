var estrellaglobal;
var logros = {currlvl: 0,estrellas: []};
var rightScore = 1000, 
	wrongScore = -780, 
	spentTimeScore = 30,  // Substracts 30 for every second.
	timeUp = -1250,
	currScore = 0,
	scoreLevelMultiplier = 1;

function aclogro(conten, x, y, cbTimeUp, cbTimerTick, cbTimerCancel) {
    var ac = new CAAT.ActorContainer();
    ac.setBounds(x, y, 1024, 118);
	trace("Has time: " + tienetime);
    /*var estrellita = new CAAT.Actor().
		setBackgroundImage(spminilogros.getRef(),true).
		setLocation( 0,0 ).
		setScale( 1,1 ).
		setAnimationImageIndex( [0,1,2,3,4] ).
		setChangeFPS(100).
		setChangeFPS(100).
		enableEvents(false);
	
	estrellaglobal=estrellita*/
    //MovieClipSprite(spriteref,secuencia,fps,x,y)

    //var bajoestrellas = obj("inst08fndow",ac,'barra_logros_FONDO',-200,-13 ,1,1);	
    var bajoestrellas = obj("barraLogros", ac, "barraLogros", 85, -3, 1, 1);
    //placeHelper(bajoestrellas);
    
    var scoreText = new CAAT.TextActor()
		.setFont("bold 24px Trebuchet MS, Helvetica, sans-serif")
		.setTextAlign("right")
		.setTextBaseline("bottom")
		.setPosition(790, 40)
		.setText(currScore.toLocaleString());
    ac.addChild(scoreText);
	
	var framesanim=24;
    var sep = 42;
	var startPos = 95,
		ESC = 0,
		tmpSeq,
		recreateSeq = true,
		addMargin = false;
	
	for(var i = 0; i < 9; i++) {
		if(i == 3) {
			ESC = framesanim*1;
			startPos += 20;
			recreateSeq = true;
		}
		
		if(i == 6) {
			ESC = framesanim*2;
			startPos += 18;
			recreateSeq = true;
		}
		
		if(recreateSeq) {
			tmpSeq = new Array();
			
			for(var j = 0; j < framesanim; j++) {
				tmpSeq.push(j + ESC);
			}
			
			recreateSeq = false;
		}
		console.log("LOGRO SECUENCIA:",tmpSeq,ESC);
		var tmpStar = new MovieClipSprite(spminilogros.getRef(), tmpSeq, 80, startPos, -5).stop(ESC);
		tmpStar.secuencia=tmpSeq;
		logros.estrellas.push(tmpStar);
		ac.addChild(tmpStar.getActor());
		startPos += sep;
		window.ultimaestrella=tmpStar;
	}
    
    conten.addChild(ac);
	
	this.ac=ac;
    this.getLvl = function() {
        return logros.estrellas[logros.currlvl];
    }
    this.getLvlIx = function() {
        return logros.currlvl;
    }
    this.addLogro = addLogro;
    
    this.wrongAnswer = function() {
        trace("Wrong answer! Substracting points...");
		sonido.play("FALLIDO");
        currScore += wrongScore;
		this.updateScore();
    }
	this.correctAnswer = function() {
		sonido.play("CORRECTO");
		this.updateScore();
    }
    
    this.updateScore = function() {
		currScore = Math.floor(currScore);
		
		if(currScore < 0)
			currScore = 0;
			
        scoreText.setText(currScore.toLocaleString());
    }
    
    this.reset = function() {
        for (var i in logros.estrellas) {
            logros.estrellas[i].stop(logros.estrellas[i].secuencia[0]);
        }
        logros.currlvl = 0;
		currScore = 0;
		this.updateScore();
    }
	
	this.calculateScoreFromTime = function(millis) {
		trace("Calculating score to add...", millis);
		var minutes = getMinutesFromMillis(millis);
		trace("Minutes", minutes);
		currScore += ((rightScore / 2) * (scoreLevelMultiplier * 0.3)) - (minutes * spentTimeScore);
		this.updateScore();
	};
	this.removeLogro=function(){
		var curr = logros.estrellas[logros.currlvl-1];
		if (curr != undefined) {
			
			if(logros.currlvl == 4)
				scoreLevelMultiplier = 2;

			if(logros.currlvl == 8)
				scoreLevelMultiplier = 3;
		
			currScore -= rightScore * scoreLevelMultiplier;
			this.updateScore();
			logros.currlvl--;
			curr.stop(curr.secuencia[0], true);
		}
	}
	
    return this;
}

function addLogro() {
    sonido.play("ESTRELLA");
    var curr = logros.estrellas[logros.currlvl];
    trace("Current Level: " + logros.currlvl);
	
	
	if(logros.currlvl == 3)
		scoreLevelMultiplier = 2;
		
	if(logros.currlvl == 6)
		scoreLevelMultiplier = 3;
	
    if (curr != undefined) {
        currScore += rightScore * scoreLevelMultiplier;
		this.updateScore();
        logros.currlvl++;
		sube(curr.actor);
        curr.play(0, true);
    }
}
