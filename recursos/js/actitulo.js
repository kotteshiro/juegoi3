function actitulo(conten){
	var ac=new CAAT.ActorContainer();
	ac.setBounds(106,150,85,440);
	
	obj("inst04",ac,"nube_titulo",0,0 ,1,1);
	//obj("inst05",ac,"titulo",326-106,246-143,1,1);
	//sptarjetacolors
	conten.addChild(ac);
	return ac;
}
