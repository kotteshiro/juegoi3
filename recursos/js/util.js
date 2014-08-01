function mueve(que,x,y){
	que.x=x;
	que.y=y;
}

function Button(contexto,spritesheet,stage,sprt1,sprt2,cbfn){
	trace("button")
	//spritesheet.draw(instancias[i], initposes[i].sprite);
	var self=this;
	this.element = contexto.createElement(300,300);
	this.element.on("click",cbfn);
	this.element.on("mouseover", function(e){trace("ova",e); /*self.element.refresh();*/ spritesheet.draw(self.element, sprt2);});
	this.element.on("mouseout", function(e){trace("out",e); /*self.element.refresh();*/ spritesheet.draw(self.element, sprt1);})
	spritesheet.draw(this.element, sprt1);
    stage.append(this.element);
	return this;
}
function playmusica(){
 createjs.Sound.play("sound1", createjs.Sound.INTERRUPT_EARLY, 0, 0);
}
