function actitulo(conten){
	var ac=new CAAT.ActorContainer();
	ac.setBounds(214, -43, 600, 280);
	obj("inst04",ac,"titulo",0, 0,1,1);
	conten.addChild(ac);
	
	return ac;
}

function acdesc(content) {
	var ac = new CAAT.ActorContainer();
	ac.setBounds(111, 602, 700, 125);
	obj("inst05",ac,"descripcion",0,0,1,1);
	content.addChild(ac);
	
	return ac;
}
