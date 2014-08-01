
var bosque={
	fondo: "fondobosque",
	enunciado: "",
	contenedores: {
				a:{xpos:160,ypos:390,coneccion:["b"]},
				b:{xpos:417,ypos:330,coneccion:["c"]},
				c:{xpos:322,ypos:527,coneccion:[ ]}
				},
	spriteRow: 0,
	seresGrupo: {a:[0,1],b:[2,3],c:[4,5,6]}
}
var selva={
	fondo: "fondoselva",
	enunciado: "",
	contenedores: {
				a:{xpos:160,ypos:390,coneccion:["b"]},
				b:{xpos:417,ypos:330,coneccion:["c1","c2"]},
				c1:{xpos:322,ypos:527,coneccion:[]},
				c2:{xpos:708,ypos:282,coneccion:[]}
				},
	spriteRow: 1,
	seresGrupo: {a:[0,1],b:[2,3],c:[4,5,6,7]} /*midification jose*/
}
var artico={
	fondo: "fondosartocp",
	enunciado: "",
	contenedores: {
				a:{xpos:160,ypos:390,coneccion:["b"]},
				b:{xpos:417,ypos:330,coneccion:["c"]},
				c:{xpos:322,ypos:527,coneccion:["d1","d2"]},
				d1:{xpos:708,ypos:282,coneccion:[]},
				d2:{xpos:808,ypos:509,coneccion:[]},
				},
	spriteRow: 2,
	seresGrupo: {a:[0],b:[1],c:[2,3],d:[4,5,6]}
}
var pradera={
	fondo: "fondopradera",
	enunciado: "",
	contenedores: {
				a:{xpos:160,ypos:390,coneccion:["b1","b2"]},
				b1:{xpos:417,ypos:330,coneccion:["c"]},
				b2:{xpos:322,ypos:527,coneccion:["c"]},
				c:{xpos:808,ypos:509,coneccion:[]},
				},
	spriteRow: 3,
	seresGrupo: {a:[0],b:[1,2,3],c:[4,5]}
}
var marino={
	fondo: "fondosmarino",
	enunciado: "",
	contenedores: {
				a:{xpos:160,ypos:390,coneccion:["b"]},
				b:{xpos:417,ypos:330,coneccion:["c1","c2"]},
				c1:{xpos:322,ypos:527,coneccion:["d"]},
				c2:{xpos:708,ypos:282,coneccion:["d"]},
				d:{xpos:808,ypos:509,coneccion:[]},
				},
	spriteRow: 4,
	seresGrupo: {a:[0,1],b:[2,3],c:[4,5],d:[6,7]}
}
var sabana={
	fondo: "fondosabana",
	enunciado: "",
	contenedores: {
				a:{xpos:160,ypos:390,coneccion:["b1","b2"]},
				b1:{xpos:417,ypos:330,coneccion:["c1","c2"]},
				b2:{xpos:322,ypos:527,coneccion:["c1","c2"]},
				c1:{xpos:708,ypos:282,coneccion:[]},
				c2:{xpos:808,ypos:509,coneccion:[]},
				},
	spriteRow: 5,
	seresGrupo: {a:[0,1],b:[2,3,4],c:[5,6,7]}
}

var redescfg=[bosque,selva,artico,pradera,marino,sabana];//