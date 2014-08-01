var scayuda;
sc(function(escena){

	escena.name="scayuda";
	trace(">scprinc");
	scayuda=escena;
	scprinc.fnclick=function(a){
		trace("click",a);
	}
	
	//var  bg=animbg(escena,800000);
	
	var h2_2=obj("pg_info",escena,'pg_info',0,0,1,1);
	acmenupric(escena,[{ix:4,fn:clicbtn},{ix:5,fn:clicbtn},{ix:0,fn:clicbtn},{ix:5,fn:clicbtn},{ix:4,fn:clicbtn}]);
	updatebtnmute();
	function clicbtn(e){
		switch(e.name){
			case "btn4":
				toscenaanim(lastScena);
			break;
			case "btn5":
				mutebtnaction(e);
			break;
		}
		trace(e);
	}
});