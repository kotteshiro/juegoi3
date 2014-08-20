function animbg(conten,vel){
	
	vel = (vel!=undefined) ? vel : 40000;
	var ac=new CAAT.ActorContainer().setClip(true);
	ac.setBounds( 12,5, 1024-10,768-10 );
	/*
            setFillStyle( 'red' ).
            setAlpha(.25);*/
	
	trace(">acfondo");
	
	var h=obj("inst00",ac,'fondo_a' ,0,0,1,1);
	
	var h1_1=	obj("inst01",ac,'fondo_b',0,0,1,1);
	var h1_2=	obj("inst012",ac,'fondo_b',h1_1.width,0,1,1);
	
	var h2_1=	obj("inst02",ac,'fondo_c',0,0,1,1);
	var h2_2=	obj("inst022",ac,'fondo_c',h2_1.width,0,1,1);
	
	var h3_1=  	obj("inst03",ac,'fondo_d',0,485,1,1);	
	var h3_2= 	obj("inst032",ac,'fondo_d',h3_1.width,485,1,1);
	
	var cloud1=	obj(uniq("cloud"),ac,'fondo_nube_1',200,20,1,1);
	var cloud2=	obj(uniq("cloud"),ac,'fondo_nube_1',200,20,1,1);
	var cloud3=	obj(uniq("cloud"),ac,'fondo_nube_2',200,20,1,1);
	var cloud4=	obj(uniq("cloud"),ac,'fondo_nube_2',200,20,1,1);
	window.testcloud=cloud1;
	muevetenube(cloud1,randomInt(-100,director.width+100));
	muevetenube(cloud2,randomInt(-100,director.width+100));
	muevetenube(cloud3,randomInt(-100,director.width+100));
	muevetenube(cloud4,randomInt(-100,director.width+100));
	function muevetenube(nube,origin,delay){
		var dest=-nube.width;
		var ybas=150;
		var tiempomultiplier=3000;
		delay=delay||0;
		
		nube.x=origin;
		nube.y=ybas+randomInt(-200,200);
		nube.scaleX=nube.scaleY=randomInt(50,100)/100;
		nube.moveTo( 
			dest,  //xposto
			nube.y+randomInt(-30,30),  //yposto
			tiempomultiplier*randomInt(15,20), //tiempo
			delay,  //delay 
			false, //interpolator
			function(a,b,c){ //cb
				var origin=director.width+nube.width+20;
				muevetenube(c,origin,500*randomInt(1,20))
			});
	}
	
	
	//placeHelper(h1_1)
	//placeHelper(h2_1)
	//placeHelper(h3_1)
	//tweenTranslation("btnshow1",h,60000,(h.x-h.width)+1024,h.y,new CAAT.Interpolator().createLinearInterpolator(0,true));
	var x3a=h1_1.x-(h1_1.width);
	var x3b=h2_1.x-(h2_1.width);
	var x3c=h3_1.x-(h3_1.width);
	tweenTranslation("btnshow2",	h1_1,vel/1,		x3a,				h1_1.y,	new CAAT.Interpolator().createLinearInterpolator(),true);
	tweenTranslation("btnshow3",	h2_1,vel/1.5,	x3b,				h2_1.y,	new CAAT.Interpolator().createLinearInterpolator(),true);
	tweenTranslation("btnshow4",	h3_1,vel/2,		x3c,				h3_1.y,	new CAAT.Interpolator().createLinearInterpolator(),true);
	
	tweenTranslation("btnshow2",	h1_2,vel/1,		x3a+(h1_1.width),	h1_2.y,	new CAAT.Interpolator().createLinearInterpolator(),true);
	tweenTranslation("btnshow3",	h2_2,vel/1.5,	x3b+(h2_1.width),	h2_2.y,	new CAAT.Interpolator().createLinearInterpolator(),true);
	tweenTranslation("btnshow4",	h3_2,vel/2,		x3c+(h3_1.width),	h3_2.y,	new CAAT.Interpolator().createLinearInterpolator(),true);
	
	//TO-DO: Arreglar loop animacion.
	conten.addChild(ac);
	return ac;
}
