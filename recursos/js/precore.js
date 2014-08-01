
function subtmitfiles(files){
	console.log("agregando "+files.length+" archivos para cargar");
	window._images=window._images||[];
	window._images=window._images.concat(files);
	files=[];
}