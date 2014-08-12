function actitulo(conten){
	var ac=new CAAT.ActorContainer();
	
	ac.setBounds(214, -43, 600, 280);
	obj("inst04",ac,"titulo",0, 0,1,1)
	conten.addChild(ac);
	var rb = new CAAT.RotateBehavior().
                    setCycle(true).
                    setFrameTime(0, 8000).
                    setValues( -Math.PI / 40, Math.PI / 40, .50, 0 ).
                    setInterpolator(
                            new CAAT.Interpolator().createCubicBezierInterpolator(
                                    {x:0,y:0},
                                    {x:1,y:0},
                                    {x:0,y:1},
                                    {x:1,y:1},
                                    true)
									);
	ac.addBehavior(rb);
	return ac;
}