
var xdif=50;	
var xposion=8;
function acmenu(conten,btns){
	if(btns==undefined){
		btns=[	{ix:0,fn:scprinc.fnclick},
				{ix:1,fn:scprinc.fnclick},
				{ix:2,fn:scprinc.fnclick},
				{ix:3,fn:scprinc.fnclick},]
	}
	var ac=new CAAT.ActorContainer();
	ac.setBounds( xposion,100, 85,440 );

	var sp=7;
	//obj("inst07" ,ac,"fondo_comenados",-10,115-110,.25,.25); //678
	var btn1=btn("btn"+btns[0].ix,ac,{sprite:[spiconos, btns[0].ix, btns[0].ix+sp], x: -10-xdif, y: 65*0, click:btns[0].fn,soundhover:"CONTROLES"}).setScale(1,1);
	var btn2=btn("btn"+btns[1].ix ,ac,{sprite:[spiconos, btns[1].ix, btns[1].ix+sp], x: -10-xdif, y: 65*1, click:btns[1].fn,soundhover:"CONTROLES"}).setScale(1,1);
	var btn3=btn("btn"+btns[2].ix,ac,{sprite:[spiconos, btns[2].ix, btns[2].ix+sp], x: -10-xdif, y: 65*2, click:btns[2].fn,soundhover:"CONTROLES"}).setScale(1,1);
//	var btn4=btn("btn"+btns[3].ix,ac,{sprite:[spiconos, btns[3].ix, btns[3].ix+sp], x: -10-xdif, y: 65*3, click:btns[3].fn,soundhover:"CONTROLES"}).setScale(1,1);
	updatebtnmutebg();
	//conten.botonmute=btn4;
	conten.botonbgmmute=btn3;
	director.currentScene.botonbgmmute=btn3;
	/*btn("inst16" ,ac,{sprite:[spiconos, 6, 6+sp], x: -10, y:333+40-110, click:scprinc.fnclick}).setScale(.5,.5);
	btn("inst17" ,ac,{sprite:[spiconos, 6, 6+sp], x: -10, y:377+40-110, click:scprinc.fnclick}).setScale(.5,.5);
	btn("inst18" ,ac,{sprite:[spiconos, 8, 8+sp], x: -10, y:404+40-110, click:scprinc.fnclick}).setScale(.5,.5);
	btn("inst19" ,ac,{sprite:[spiconos, 9, 9+sp], x: -10, y:443+40-110, click:scprinc.fnclick}).setScale(.5,.5);	*/
	 
	tweenTranslation("btnshow2",btn1,1000,btn1.x+xdif,btn1.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,0);
	tweenTranslation("btnshow3",btn2,1000,btn2.x+xdif,btn2.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,500);
	tweenTranslation("btnshow4",btn3,1000,btn3.x+xdif,btn3.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,1000);
	//tweenTranslation("btnshow5",btn4,1000,btn4.x+xdif,btn4.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,1000);
	
	trace("BOTON!!!",btn1);
	
	
	// SOCIAL ICONS:
	var la=6;
	var posy=263-65;
	var sep=33;
	var padtop=10;
	var bg=obj("inst78" ,ac,"fondo_iconos_comandos",-14-xdif+2,posy,1,1); //678
	var bn0=btn("inst79" ,ac,{sprite:[spicnsoc, 0, 0+la], x: 4-xdif, y:posy+(sep*0)+padtop, click:scprinc.fnclick,soundhover:"CONTROLES"}).setScale(1,1);
	var bn1=btn("inst80" ,ac,{sprite:[spicnsoc, 1, 1+la], x: 4-xdif, y:posy+(sep*1)+padtop, click:scprinc.fnclick,soundhover:"CONTROLES"}).setScale(1,1);
	var bn2=btn("inst81" ,ac,{sprite:[spicnsoc, 2, 2+la], x: 4-xdif, y:posy+(sep*2)+padtop, click:scprinc.fnclick,soundhover:"CONTROLES"}).setScale(1,1);
	var bn3=btn("inst82" ,ac,{sprite:[spicnsoc, 3, 3+la], x: 4-xdif, y:posy+(sep*3)+padtop, click:scprinc.fnclick,soundhover:"CONTROLES"}).setScale(1,1);
	tweenTranslation("btnshow4",bg ,1000,bg.x +xdif,bg.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,1500);
	tweenTranslation("btnshow4",bn0,1000,bn0.x+xdif,bn0.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,1500);
	tweenTranslation("btnshow4",bn1,1000,bn1.x+xdif,bn1.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,1500);
	tweenTranslation("btnshow4",bn2,1000,bn2.x+xdif,bn2.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,1500);
	tweenTranslation("btnhow4",bn3,1000,bn3.x+xdif,bn3.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,1500);                        
	conten.addChild(ac);
	return ac;
}
function acmenupric(conten,btns){
	if(btns==undefined){
		btns=[	{ix:0,fn:scprinc.fnclick},
				{ix:1,fn:scprinc.fnclick},
				{ix:2,fn:scprinc.fnclick},
				{ix:3,fn:scprinc.fnclick},]
	}
	var ac=new CAAT.ActorContainer();
	ac.setBounds( xposion,100, 85,440 );
	var sp=7;
	//obj("inst07" ,ac,"fondo_comenados",-10,115-110,.25,.25); //678
	
	
	var btn1=btn("btn"+btns[0].ix ,ac,{sprite:[spiconos, btns[1].ix, btns[1].ix+sp], x: -10-xdif, y: 65*1, click:btns[0].fn,soundhover:"CONTROLES"}).setScale(1,1);
	//var btn4=btn("btn"+btns[1].ix ,ac,{sprite:[spiconos, btns[0].ix, btns[0].ix+sp], x: -10-xdif, y: 65*1, click:btns[1].fn,soundhover:"CONTROLES"}).setScale(1,1);
	updatebtnmutebg();
	//conten.botonmute=btn4;
	director.currentScene.botonbgmmute=btn1;
	conten.botonbgmmute=btn1;
	/*btn("inst16" ,ac,{sprite:[spiconos, 6, 6+sp], x: -10, y:333+40-110, click:scprinc.fnclick}).setScale(.5,.5);
	btn("inst17" ,ac,{sprite:[spiconos, 6, 6+sp], x: -10, y:377+40-110, click:scprinc.fnclick}).setScale(.5,.5);
	btn("inst18" ,ac,{sprite:[spiconos, 8, 8+sp], x: -10, y:404+40-110, click:scprinc.fnclick}).setScale(.5,.5);
	btn("inst19" ,ac,{sprite:[spiconos, 9, 9+sp], x: -10, y:443+40-110, click:scprinc.fnclick}).setScale(.5,.5);	*/
	 
	tweenTranslation("btnshow2",btn1,1000,btn1.x+xdif,btn1.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,0);
	//tweenTranslation("btnshow3",btn2,1000,btn2.x+xdif,btn2.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,500);
	//tweenTranslation("btnshow4",btn3,1000,btn3.x+xdif,btn3.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,1000);
//	tweenTranslation("btnshow5",btn4,1000,btn4.x+xdif,btn4.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,500);
	
	
	// SOCIAL ICONS:
	var la=6;
	var posy=263-(65*2);
	var sep=33;
	var padtop=10;
	var bg=obj("inst78" ,ac,"fondo_iconos_comandos",-14-xdif+2,posy,1,1); //678
	var bn0=btn("btn"+btns[0].ix ,ac,{sprite:[spicnsoc, 0, 0+la], x: 4-xdif, y:posy+(sep*0)+padtop, click:scprinc.fnclick,soundhover:"CONTROLES"}).setScale(1,1);
	var bn1=btn("btn"+btns[1].ix ,ac,{sprite:[spicnsoc, 1, 1+la], x: 4-xdif, y:posy+(sep*1)+padtop, click:scprinc.fnclick,soundhover:"CONTROLES"}).setScale(1,1);
	var bn2=btn("btn"+btns[2].ix ,ac,{sprite:[spicnsoc, 2, 2+la], x: 4-xdif, y:posy+(sep*2)+padtop, click:scprinc.fnclick,soundhover:"CONTROLES"}).setScale(1,1);
	var bn3=btn("btn"+btns[3].ix ,ac,{sprite:[spicnsoc, 3, 3+la], x: 4-xdif, y:posy+(sep*3)+padtop, click:scprinc.fnclick,soundhover:"CONTROLES"}).setScale(1,1);

	tweenTranslation("btnshow4",bg,1000,bg.x+xdif,bg.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,500);
	tweenTranslation("btnshow4",bn0,1000,bn0.x+xdif,bn0.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,500);
	tweenTranslation("btnshow4",bn1,1000,bn1.x+xdif,bn1.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,500);
	tweenTranslation("btnshow4",bn2,1000,bn2.x+xdif,bn2.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,500);
	tweenTranslation("btnshow4",bn3,1000,bn3.x+xdif,bn3.y,new CAAT.Interpolator().createBounceOutInterpolator(0,false),false,500);
	conten.addChild(ac);
	return ac;
}
