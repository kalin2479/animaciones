class Autocomplete{
	constructor(input_selector,base_url){
		/*
			Para que el valor no cambie
		*/
		this.search = this.search.bind(this);
		
		this.input = document.querySelector(input_selector);
		this.url = base_url;
		this.value = "";
		this.interval = null;
		this.buildDataList();
		/*
			Para el tema de los eventos definimos una
			funcion en la cual colocaremos los eventos que van a suceder. 
		*/
		this.bindEvents();
	}

	bindEvents(){
		/*
			justo cuando se levanta la tecla
			se dispara el evento keyup y 
			cogemos el valor del campo
		*/
		this.input.addEventListener("keyup",()=>{
			console.log(this.input.value);
			if(this.input.value == this.value || this.input.value.length < 3) return;

			/*
				limpiamos el intervalo para que la peticion se ejecute una sola vez
			*/	
			console.log(this.interval);
			if (this.interval) window.clearInterval(this.interval);

			console.log(this.interval);


			this.value = this.input.value;
			/*
				vamos a darle cierta cantidad de tiempo antes
				que empiece la busqueda.
			*/
			this.interval = window.setTimeout(this.search, 500);

			//this.search();
		});
	}

	buildDataList(){
		/*
		construimos el nodo del datalist
		*/
		this.datalist = document.createElement("datalist");
		/*
			el string debemos generar de manera aleatorio
			para que si existiera mas autocompletado 
			no genere conflicto, para ello debemos
			aplicar un ramdon
		*/
		this.datalist.id = "datalist-autocomplete";
		console.log(this.datalist);
		document.querySelector("body").appendChild(this.datalist);
		/*
			Lo que hacemos es indicar enlazar el control que estamos utilizando
			con el elelemento del datalist que hemos creado
		*/
		this.input.setAttribute("list", "datalist-autocomplete");
	}

	search(){
		/*
			Este metodo sirve para generar las busquedas.
		*/

		Search.get(this.url+this.value)
			.then(results => { 
				this.build(results)
			});
	}

	build(response){
		/*
			Lo primero que hacemos es reiniciar nuestro datalist,
			por si tenia opciones. 
			Borra todo los elementos que existan.
		*/
		this.datalist.innerHtml = "";
		/*
			Generemos los nuevos elementos.
		*/
		response.items.forEach(item =>{
			let optionEl = document.createElement("option");
			optionEl.value = item.volumeInfo.title;
			/*
				Validamos si tiene un subtitulo para utilizarlo
			*/
			if(item.volumeInfo.subtitle)
				optionEl.innerHtml = item.volumeInfo.title;

			this.datalist.appendChild(optionEl);
		});
	}
}

class Search{
	static get(url){

		let xhr = new XMLHttpRequest();

		xhr.open("GET",url);

		xhr.send();

		return new Promise((resolve, reject) => {
			xhr.onreadystatechange = () => {
				if (xhr.readyState == 4){
					if (xhr.status == 200){
						// todo salio bien
						return resolve(JSON.parse(xhr.responseText));
					}else{
						// salio mal
						reject(xhr.status);	
					}
				}
			}	
		});

	}
}


(function(){
	const GoogleBooksApiURL = "https://www.googleapis.com/books/v1/volumes?q=";
	let autocomplete = new Autocomplete("#searcher",GoogleBooksApiURL);
	//autocomplete.search();




})();