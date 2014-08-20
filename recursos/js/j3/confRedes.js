
var bosque={
	fondo: "fondobosque",
	enunciado: "",
	contenedores: {
				a:{xpos:190,ypos:460,coneccion:["b"]},
				b:{xpos:450,ypos:350,coneccion:["c"]},
				c:{xpos:760,ypos:325,coneccion:[ ]}
				},
	spriteRow: 0,
	seresGrupo: {a:[0,1],b:[2,3],c:[4,5,6]}
}
var selva={
	fondo: "fondoselva",
	enunciado: "",
	contenedores: {
				a:{xpos:245,ypos:404,coneccion:["b"]},
				b:{xpos:360,ypos:302,coneccion:["c1","c2"]},
				c1:{xpos:492,ypos:506,coneccion:[]},
				c2:{xpos:727,ypos:390,coneccion:[]}
				},
	spriteRow: 1,
	seresGrupo: {a:[0,1],b:[2,3],c:[4,5,6,7]} /*midification jose*/
}
var artico={
	fondo: "fondosartocp",
	enunciado: "",
	contenedores: {
				a:{xpos:158,ypos:450,coneccion:["b"]},
				b:{xpos:310,ypos:300,coneccion:["c"]},
				c:{xpos:550,ypos:315,coneccion:["d1","d2"]},
				d1:{xpos:770,ypos:370,coneccion:[]},
				d2:{xpos:668,ypos:500,coneccion:[]},
				},
	spriteRow: 2,
	seresGrupo: {a:[0],b:[1],c:[2,3],d:[4,5,6]}
}
var pradera={
	fondo: "fondopradera",
	enunciado: "",
	contenedores: {
				a:{xpos:242,ypos:347,coneccion:["b1","b2"]},
				b1:{xpos:465,ypos:295,coneccion:["c"]},
				b2:{xpos:465,ypos:530,coneccion:["c"]},
				c:{xpos:744,ypos:340,coneccion:[]},
				},
	spriteRow: 3,
	seresGrupo: {a:[0],b:[1,2,3],c:[4,5]}
}
var marino={
	fondo: "fondosmarino",
	enunciado: "",
	contenedores: {
				a:{xpos:164,ypos:340,coneccion:["b"]},
				b:{xpos:367,ypos:360,coneccion:["c1","c2"]},
				c1:{xpos:624,ypos:295,coneccion:["d"]},
				c2:{xpos:532,ypos:535,coneccion:["d"]},
				d:{xpos:800,ypos:460,coneccion:[]},
				},
	spriteRow: 4,
	seresGrupo: {a:[0,1],b:[2,3],c:[4,5],d:[6,7]}
}
var sabana={
	fondo: "fondosabana",
	enunciado: "",
	contenedores: {
				a:{xpos:175,ypos:395,coneccion:["b1","b2"]},
				b1:{xpos:430,ypos:330,coneccion:["c1","c2"]},
				b2:{xpos:330,ypos:530,coneccion:["c1","c2"]},
				c1:{xpos:715,ypos:290,coneccion:[]},
				c2:{xpos:812,ypos:510,coneccion:[]},
				},
	spriteRow: 5,
	seresGrupo: {a:[0,1],b:[2,3,4],c:[5,6,7]}
}

var redescfg=[bosque,selva,artico,pradera,marino,sabana];//