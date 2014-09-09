var estrellaglobal;
var logros = {currlvl: 0,estrellas: []};
var rightScore = 1000, 
	wrongScore = -780, 
	spentTimeScore = 30,  // Substracts 30 for every second.
	timeUp = -1250,
	currScore = 0,
	scoreLevelMultiplier = 1,
	scoreVisible=0,
	cuanto=11,
	intervaltim;

function aclogro(conten, x, y, cbTimeUp, cbTimerTick, cbTimerCancel) {
    var ac = new CAAT.ActorContainer();
    ac.setBounds(x, y, 1024, 20);
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
		.setFont("bold 24px 'Trebuchet MS'")
		.setTextAlign("right")
		.setTextBaseline("bottom")
		.setPosition(790, 40)
		.setText(Number(currScore).toLocaleString());
		
	console.log("puntaje:",Number(currScore).toLocaleString());
    ac.addChild(scoreText);

    var sep = 35;
	var startPos = 99,
		ESC = 0,
		tmpSeq,
		recreateSeq = true,
		addMargin = false;
	var cuantos=24
	
	for(var i = 0; i < 12; i++) {
		if(i == 4) {
			ESC = cuantos*1;
			startPos += 19;
			recreateSeq = true;
		}
		
		if(i == 8) {
			ESC = cuantos*2;
			startPos += 17;
			recreateSeq = true;
		}
		
		if(recreateSeq) {
			tmpSeq = new Array();
			
			for(var j = 0; j < cuantos; j++) {
				var cu=j + ESC;
				if(cu>=0 && cu<=71)
					tmpSeq.push(cu);
			}
			
			recreateSeq = false;
		}
		console.log("LOGRO SECUENCIA:",tmpSeq,ESC);
		var tmpStar = new FrameByFrameAnim(spminilogros.getRef(), 50, startPos-10, -6);
		tmpStar.addAnimation("animEstrella"+i,tmpSeq);
		tmpStar.addAnimation("estrellavacia"+i,[ESC]);
		tmpStar.play("estrellavacia"+i);
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
			if(intervaltim)
			clearInterval(intervaltim);
			intervaltim=setInterval(function(){
				if(scoreVisible<=currScore)	{
					if(scoreVisible+cuanto<currScore){
						scoreVisible+=cuanto;
					}else{
						scoreVisible=currScore;
					}
					
				}else{
					if(scoreVisible-cuanto>currScore){
						scoreVisible-=cuanto;
					}else{
						scoreVisible=currScore;
					}
				}
				scoreText.setText(scoreVisible.toLocaleString()) ;
			}, 10);
        //scoreText.setText(currScore.toLocaleString());
    }
    
    this.reset = function() {
        for (var i in logros.estrellas) {
            logros.estrellas[i].stopini(); 
        }
        logros.currlvl = 0;
		currScore = 0;
		scoreVisible=0;
		this.updateScore();
    }
	
	this.calculateScoreFromTime = function(segundos,tot) {
		/*trace("Calculating score to add...", millis);
		var minutes = getMinutesFromMillis(millis);
		trace("Minutes", minutes);
		currScore += ((rightScore / 2) * (scoreLevelMultiplier * 0.3)) - (minutes * spentTimeScore);*/
		//no me gustó
		//var segundos = Math.round(millis/1000);
		console.log("seg=",segundos);
		var bonotiempo=0;
		if(segundos>=tot/4){
			bonotiempo=((segundos*97)*(Math.round(segundos/(tot/4))+1));
			
			
		}
		console.log("BONO TIEMPO: tiempo restante:",segundos,Math.round(segundos/tot*100)+"%"," Puntaje bono:", bonotiempo);
		currScore += bonotiempo
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
			curr.stopini();
		}
	}
	
	this.resetetapa=function(){
		currScore = Math.round(currScore/2);
		this.updateScore();
	}
    return this;
}

function addLogro() {
    //suena
	sonido.play("ESTRELLA");
    var curr = logros.estrellas[logros.currlvl];
    trace("Current Level: " + logros.currlvl);
	
	if(logros.currlvl == 4)
		scoreLevelMultiplier = 2;
		
	if(logros.currlvl == 8)
		scoreLevelMultiplier = 3;
	
    if (curr != undefined) {
        currScore += rightScore * scoreLevelMultiplier;
		this.updateScore();
        logros.currlvl++;
		sube(curr.actor);
        curr.play("animEstrella"+(logros.currlvl-1));
    }
}
