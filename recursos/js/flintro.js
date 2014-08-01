(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1027,
	height: 769,
	fps: 24,
	color: "#FFFFFF",
	manifest: [
		{src:"images/Pres_estrellas.png", id:"Pres_estrellas"},
		{src:"images/Pres_fondo_presentacion.png", id:"Pres_fondo_presentacion"},
		{src:"images/Pres_planeta_tierra.png", id:"Pres_planeta_tierra"}
	]
};



// symbols:



(lib.Pres_estrellas = function() {
	this.initialize(img.Pres_estrellas);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1847,1847);


(lib.Pres_fondo_presentacion = function() {
	this.initialize(img.Pres_fondo_presentacion);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,1027,769);


(lib.Pres_planeta_tierra = function() {
	this.initialize(img.Pres_planeta_tierra);
}).prototype = p = new cjs.Bitmap();
p.nominalBounds = new cjs.Rectangle(0,0,719,719);


(lib.Wordl = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Pres_planeta_tierra();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,719,719);


(lib.Symbol1 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#FFFFFF").s().p("AgXBEQgdgHgLgzQgLgwASgSQAVgUAtANQAwAMAJAdQAIAXgjAlQgeAfgXAAIgKgBg");
	this.shape.setTransform(-36.9,-0.9);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#FFFFFF").s().p("Ah3AzQg1hhAdgzQAhg3BuAAQBsAAAjA4QAgAyg3BiQg3BlhBAAQhBAAg2hmgAhJhSQg6A9ANApQAOAvBQAVQBOAWAigiQAfgfgThRQgUhUgvgNQgIgCgIAAQgoAAgyA1g");
	this.shape_1.setTransform(-37.7,0);

	this.shape_2 = new cjs.Shape();
	this.shape_2.graphics.f("#FFFFFF").s().p("AgxA6QgVgTAAgjIAAgGQAAgkAVgSQATgQAeAAQAfAAASAQQAWASAAAkIAAAGQAAAjgWATQgTAOgeAAQgeAAgTgOgAgZgmQgFAJgBAbIAAAGQAAAZAHAKQAGAKASABQASAAAIgLQAFgKAAgZIAAgGQAAgbgFgJQgIgLgSAAQgTAAgGALg");
	this.shape_2.setTransform(74.4,3.2);

	this.shape_3 = new cjs.Shape();
	this.shape_3.graphics.f("#FFFFFF").s().p("AhGgCQAAgkAXgSQAUgQAeAAQAdAAASAPQAVAPAAAdQAAAPgWAAIhQAAQABAaALALQALAKAcAAQAHAAAMgDQAOgCAFgDIAJAUQgHAEgPADQgSAFgWgBQhLAAAAhKgAgVgoQgKAIABAPIA3AAQAIAAAAgHQAAgLgHgHQgIgIgQABQgOAAgJAJg");
	this.shape_3.setTransform(58.4,3.2);

	this.shape_4 = new cjs.Shape();
	this.shape_4.graphics.f("#FFFFFF").s().p("AgVBKQgGgQAAgZIAAhsQAAgMAKgGQALgHAPAAIAACEQAAATAEAJQADAMAMAMIgdARQgPgLgFgQg");
	this.shape_4.setTransform(46.9,1.1);

	this.shape_5 = new cjs.Shape();
	this.shape_5.graphics.f("#FFFFFF").s().p("ABLBiQgVAAgKgOQgVAOgfAAQgoAAgYgUQgXgTAAgeQAAgmAtgWQgMgQAAgNQAAgRAPgKQAPgKAZAAQAaAAAOAMQAOALAAAUIgiAAQAAgLgEgFQgFgFgKAAQgTAAAAAPQAAAJAMAPIA5BFQAGgOAAgIIAjAAQAAAagRAZIAcAkgAg5AdQAAAUALALQANANAZAAQATAAAPgLIg5hGQgaALAAAag");
	this.shape_5.setTransform(31.9,0.7);

	this.shape_6 = new cjs.Shape();
	this.shape_6.graphics.f("#FFFFFF").s().p("AgVBKQgGgPAAgaIAAhsQAAgMAKgGQALgHAQAAIAACEQAAATADAJQADAMAMAMIgdARQgOgLgGgQg");
	this.shape_6.setTransform(17.6,1.1);

	this.shape_7 = new cjs.Shape();
	this.shape_7.graphics.f("#FFFFFF").s().p("AAeA1QgGAGgMAGQgNAGgPAAQgcAAgPgMQgPgMAAgWQAAgZAWgJQATgIAlAAIATAAIAAgEQgBgPgGgHQgHgIgOAAQgeAAgKATIgbgQQAGgLARgHQARgHAbAAQBBAAAAAyIAAAoQAAAcAPANIgbAQQgNgJgFgMgAgcAJQgJAEAAAMQAAAXAXAAQAKAAALgFQAMgGAEgGIAAgcIgQAAQgZAAgKAGg");
	this.shape_7.setTransform(5.2,3.4);

	this.shape_8 = new cjs.Shape();
	this.shape_8.graphics.f("#FFFFFF").s().p("AglBcIgQgDIAJgWIAKAEQAMAEAKgBQAXAAAMgJQALgKAAgTIgBgBQgEAEgKAEQgJACgKAAQhGAAAAhEQAAgjAWgUQATgRAdgBQALAAALAGQAKADAEAGIABgBIgFgLIAnAAIAAB2QAABIhGAAQgSAAgUgFgAgZg8QgGAKAAAbQAAAZAHAKQAHAJARAAQAUAAAMgMIAAgrQAAgWgIgJQgHgJgRABQgSAAgHANg");
	this.shape_8.setTransform(-12.1,5.6);

	this.shape_9 = new cjs.Shape();
	this.shape_9.graphics.f("#FFDC21").s().p("AgOAeIgpAIIATgmIgUgjIAqAGIAbgeIAGAqIAmARIgmASIgFAqg");
	this.shape_9.setTransform(112.3,-21.6);

	this.shape_10 = new cjs.Shape();
	this.shape_10.graphics.f("#FFFFFF").s().p("AgSAnIg2AKIAZgxIgagvIA2AJIAkgnIAIA2IAxAXIgwAXIgIA3g");
	this.shape_10.setTransform(112.5,-21.6);

	this.shape_11 = new cjs.Shape();
	this.shape_11.graphics.f("#FFDC21").s().p("AgPAeIgpAHIAUglIgTglIApAIIAcgeIAFAqIAmARIgmASIgGAqg");
	this.shape_11.setTransform(112.2,24.3);

	this.shape_12 = new cjs.Shape();
	this.shape_12.graphics.f("#FFFFFF").s().p("AgTAmIg2AJIAZgvIgYgwIA2AKIAkgnIAIA3IAwAWIgxAYIgIA2g");
	this.shape_12.setTransform(112.3,24.3);

	this.shape_13 = new cjs.Shape();
	this.shape_13.graphics.f("#FFDC21").s().p("AgOAdIgqAHIAUgkIgTgkIApAHIAcgeIAFAqIAmARIgmASIgGAqg");
	this.shape_13.setTransform(111.7,-0.2);

	this.shape_14 = new cjs.Shape();
	this.shape_14.graphics.f("#FFFFFF").s().p("AgTAmIg2AJIAZgvIgYgwIA2AKIAkgnIAIA2IAwAXIgxAYIgIA2Igkgog");
	this.shape_14.setTransform(111.9,-0.2);

	this.shape_15 = new cjs.Shape();
	this.shape_15.graphics.f("#FFFFFF").s().p("AADG0QgRjZAAjfQAAjcAQjUIAMAAQgODWgBDaQAADhAQDXg");
	this.shape_15.setTransform(101.5,0.1);

	this.shape_16 = new cjs.Shape();
	this.shape_16.graphics.f("#4D4090").s().p("ACvB6QjtiFjwhLQACgnAGhJQDABZC4CCQB5BXBkBbQhEgrg8gig");
	this.shape_16.setTransform(132.6,-23.3);

	this.shape_17 = new cjs.Shape();
	this.shape_17.graphics.f("#6B58A0").s().p("AlHgKQAAjRASjYQDvBvDeCuQBwBXBAA/QhABBhvBWQjdCujvBvQgUjfAAjfg");
	this.shape_17.setTransform(134,0.4);

	this.shape_18 = new cjs.Shape();
	this.shape_18.graphics.f("#E83C5D").s().p("AjHAlQhwAAhmAGQAFhbAHhcQAygCAzABQFaAAFwCyIgIBqQk4hqklAAg");
	this.shape_18.setTransform(66.1,-44.9);

	this.shape_19 = new cjs.Shape();
	this.shape_19.graphics.f("#EA4E69").s().p("AmTJRQgZkjAAkzQAAknAYklQA0gBBCAAQFaAAFwC0QgRDHAADSQAADTASDQQlxC2lagBQg1AAhAgCg");
	this.shape_19.setTransform(64.7,0.4);

	this.shape_20 = new cjs.Shape();
	this.shape_20.graphics.f("#E5322C").s().p("AnoApQCphsD/hDQEEhEEvgKQgFA+gHB7QknARj+A8QkCA/iyBkQAFhlAFhHg");
	this.shape_20.setTransform(-22.7,-37.8);

	this.shape_21 = new cjs.Shape();
	this.shape_21.graphics.f("#E73847").s().p("Ag+IFQj+hCiphuQgPiuAAisQAAimANioQCphuD/hCQEEhFEvgJQgXEbAAExQAAEzAYEkQkugJkFhEg");
	this.shape_21.setTransform(-22.8,0.4);

	this.shape_22 = new cjs.Shape();
	this.shape_22.graphics.f("#FFDC21").s().p("AAGDhQhFgDhAgiQg7gggeguQgVggguglQgcgWgfgSIgCgBIACAAQAfgSAcgWQAugkAVghQAeguA7ggQBAgiBFgDQC2gGBgB0QAxA6AMA5QgMA7gxA5QhaBsinAAIgVAAg");
	this.shape_22.setTransform(-89.6,-0.1);

	this.shape_23 = new cjs.Shape();
	this.shape_23.graphics.f("#ED6B2B").s().p("AjDFQQhMg2hEhJQhBhLgegeQgegchTgnIhNgiIAAgDIBNggQBTgnAegcQAegdBBhMQBEhJBMg2QBohKCPAIQCIAGBtBJQBeA/A7A5QAjAhBFBQQArAyAcAlQgbAmgrAxQg/BRglAmQg+BAhgAzQh7BCh9AJIgjABQh3AAhag/g");
	this.shape_23.setTransform(-104.3,-0.3);

	this.shape_24 = new cjs.Shape();
	this.shape_24.graphics.f("#6FAA38").s().p("AGbBZQhxiTinhiQiKhSj4ARQitAMjOA6IAAgGQDGhEDBgbQFAgtCpBjQC/BwB2CuQA7BYAVBBIh6AaQgihYhEhag");
	this.shape_24.setTransform(-9.8,-80.8);

	this.shape_25 = new cjs.Shape();
	this.shape_25.graphics.f("#8BBE3A").s().p("AhvCtQhUijhcglQhGgehwAIQhOAFhXAXIAAjEQDGhEDBgbQFAguCpBjQC/BwB2CuQA7BYAVBCIqpCTQgXhKgqhRg");
	this.shape_25.setTransform(-9.8,-74.8);

	this.shape_26 = new cjs.Shape();
	this.shape_26.graphics.f("#6FAA38").s().p("AjzD9QjBgbjGhEIAAgGQDOA6CtAMQD4ARCKhSQCnhiBxiTQBEhaAihYIB6AaQgVBCg7BYQh2Cui/BvQh0BEi5AAQhXAAhlgOg");
	this.shape_26.setTransform(-9.8,80.9);

	this.shape_27 = new cjs.Shape();
	this.shape_27.graphics.f("#8BBE3A").s().p("AjzE5QjBgbjGhEIAAjDQBYAWBNAFQBwAIBGgdQBcgmBUiiQAqhSAXhJIKpCTQgVBBg7BYQh2Cui/BwQh0BDi5AAQhXAAhlgOg");
	this.shape_27.setTransform(-9.8,74.8);

	this.addChild(this.shape_27,this.shape_26,this.shape_25,this.shape_24,this.shape_23,this.shape_22,this.shape_21,this.shape_20,this.shape_19,this.shape_18,this.shape_17,this.shape_16,this.shape_15,this.shape_14,this.shape_13,this.shape_12,this.shape_11,this.shape_10,this.shape_9,this.shape_8,this.shape_7,this.shape_6,this.shape_5,this.shape_4,this.shape_3,this.shape_2,this.shape_1,this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-166.8,-107.6,333.7,215.3);


(lib.fix = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Pres_fondo_presentacion();

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(0,0,1027,769);


(lib.estrellas = function() {
	this.initialize();

	// Layer 1
	this.instance = new lib.Pres_estrellas();
	this.instance.setTransform(-923.5,-923.5);

	this.addChild(this.instance);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-923.5,-923.5,1847,1847);


// stage content:
(lib.intro = function() {
	this.initialize();

	// flash0.ai
	this.Nave = new lib.Symbol1();
	this.Nave.setTransform(506.1,266.1);

	this.Planeta = new lib.Wordl();
	this.Planeta.setTransform(513.5,769,1,1,0,0,0,359.5,359.5);

	this.Estellas = new lib.estrellas();
	this.Estellas.setTransform(519.4,735.5);

	this.instance = new lib.fix();
	this.instance.setTransform(513.5,384.5,1,1,0,0,0,513.5,384.5);

	this.addChild(this.instance,this.Estellas,this.Planeta,this.Nave);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(109.4,196.5,1847,1847);

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;