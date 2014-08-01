var spritesheet;
function cargasprites(){
	spritesheet = canvas.Spritesheet.new("modos", 
	{
		grid: [{
			size: [2, 2],
			tile: [569, 386],
			set: ["relajado", "contratiempo", "relajado1", "contratiempo1"]
		}]

	 });
 
}