(function(){
	document.querySelector("#file-uploader")
		.addEventListener("change",function(ev){
			let files = ev.target.files;
			
			let image = files[0];
			//podemos convertir el archivo en una url con la siguiente propiedad:
			// createObjectURL(image) con la finalidad de asignarlo a un background-image
			// o una etiqueta de imagen.
			let imageURL = URL.createObjectURL(image);
			document.querySelector(".profile .img")
				.style.backgroundImage = "url('"+imageURL+"')";
			console.log(imageURL);
			console.log(files);
		});
})()