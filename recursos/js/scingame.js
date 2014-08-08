1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
68
69
70
71
72
73
74
75
76
77
78
79
80
81
82
83
84
85
86
87
88
89
90
91
92
93
94
95
96
97
98
99
100
101
102
103
104
//var scprinc= director.createScene();
var alphawhj;
var todo=[];
var logro;
var menux;
var escenajuego;
sc(function(escena){
escenajuego=escena;
    escena.name="scingame";
    trace(">scingame");
    //scprinc.fnclick=function(a){};
    //startReloj(escena);
    var sp=13;
    //trace(acfondo);
    var  bg=animbg(escena,170000*10);
    //startReloj(escena);
    var gm=newgamelvl1();
    escena.addChild(gm);
    //tweenTranslation("entradGal",gal,1500,710,gal.y);
     
    logro=aclogro(escena,200,700);
     
    function clicbtn(e){
        switch(e.name){
            case "btn2": //volver
                confirmdialog(escena,function(conf){
                    if(conf){
                        toscenaanim(1);
                        game1.obj.init();   
                    }
                });
                 
            break;
            case "btn0": //
                //alert("El juego está en pausa");
                 
                enpausa(escena);
                //play
            break;
            case "btn3": //info
                lastScena=director.scenes.indexOf(director.currentScene);
                toscenaanim(3);
            break;
            case "btn5":
                mutebtnaction(e);
            break;
        }
        trace(e);
    }
    menux=acmenu(escena,[{ix:2,fn:clicbtn},{ix:0,fn:clicbtn},{ix:3,fn:clicbtn},{ix:5,fn:clicbtn},{ix:4,fn:clicbtn}]); //siempre al top
});
 
function enpausa(escena){
                     
    var h1_1=   obj("pa8a",escena,'fondo_ayuda',0,0,1,1);
    var h1_0=   obj("fost08b",escena,'en-pausa',222,137,1,1);   //222,137
    h1_0.mouseDown=function(a){
        //alert("bye pausa");
        //h1_1.mouseClick(a);
        h1_1.destroy();
        h1_0.destroy();
    }
     
    //escena.setZIndex(menux, 20);
};
function newgamelvl1(){
    trace("nuevo juego lvl 1");
    var ac=new CAAT.ActorContainer().setClip(true);
    ac.setBounds( 5,5, 1024-10,768-10 );
    var gam=acjuego(ac).obj;
     
    return ac
}
function confirmdialog(ac,cb){
    var h1_1=   obj("inst08",ac,'fondo_ayuda',0,0,1,1); 
    var h1_0=   obj("inst08",ac,'dejar_juego',222,137,1,1); 
     
    var h1_2=   btn("BTNSI" ,ac,{sprite:[spsino, 0, 0], x: 394, y:331, click:_cb}).setScale(1,1);
    var h1_3=   btn("BTNNO" ,ac,{sprite:[spsino, 1, 1], x: 394+100, y:331, click:_cb}).setScale(1,1);   
     
    function _cb(e){
        trace("0>>>>>",e);
        switch(e.name){
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
    /*placeHelper(h1_1);
    placeHelper(h1_3);*/
    //return confirm("Estas seguro que desea salir? perderás tu avance.");
}