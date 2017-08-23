class DOMHelper{
	static move(el, coords){
		el.style.top = (coords.y - (el.clientHeight / 2)) + "px";
		el.style.left = (coords.x - (el.clientWidth / 2)) + "px";
	}

	static isOver(el, pointerCoords){
		/*
			Recibe como argumento el elemento sobre el cual vamos
			a evaluar si tiene el puntero encima y las coordenadas
			del mouse para ver si el mouse en ese momento 
			esta pasando encima del elemento. 
		*/
		let elCoords = el.getBoundingClientRect();

		console.log(elCoords)

		if (pointerCoords.x > elCoords.left && pointerCoords.x < (elCoords.left + elCoords.width)){
			if (pointerCoords.y > elCoords.top && pointerCoords.y < (elCoords.top + elCoords.height)){
				//return el.style.background = "red";
				return true;
			}
		}
		return false;
		//el.style.background = "inherit"; // para que herede el valor que tenia
	}

	static whereIs(el, pointerCoords){

		let elCoords = el.getBoundingClientRect();

		if (pointerCoords.x > elCoords.left && pointerCoords.x < (elCoords.left + elCoords.width)){
			if (pointerCoords.y > elCoords.top && pointerCoords.y < (elCoords.top + elCoords.height)){
				return true;
			}
		}
		return false;
	}
}

class DragList{
	constructor(list_selector, items_selector = "li"){
		this.list = document.querySelector(list_selector);
		this.items = this.list.querySelectorAll(items_selector);

		/*
			Debemos cuidar que el valor del this no se modifique
			para ello hacemos. (3 elementos)
		*/

		this.handleDragStart = this.handleDragStart.bind(this);
		this.handleDrag = this.handleDrag.bind(this);
		this.handleDragEnd = this.handleDragEnd.bind(this);
		this.canvas = document.createElement("canvas");


		this.buildFakeElement();
		this.bindEvents();
	}

	buildFakeElement(){
		/*
			Creacion de un elemento falso
		*/
		this.fakeElement = document.createElement("div");
		this.fakeElement.style.background = "#eee";
		this.fakeElement.classList.add("card");

		/*
			Ahora lo que hacemos es insertarlo en la lista para
			que podamos verlo, lo que debemos hacer es insertar el elmento
			en el punto adecuado
		*/
		//this.list.appendChild(this.fakeElement);
	}

	bindEvents(){
		/*
			Se aplica a todos los items que van a arrastrar.
			Entonces se agarra cada uno de ellos y se va a iterar.
		*/
		this.items.forEach(item =>{
			item.addEventListener("dragstart", this.handleDragStart);
			item.addEventListener("drag", this.handleDrag);
			item.addEventListener("dragend", this.handleDragEnd);
		});
	}

	handleDragStart(ev){
		/*
			Este metodo se ejecuta cuando el usuario ejecuta el 
			drag and drog.
		*/
		console.log(":)");
		// podemos sustituir la imagen de la sombre del elemento.
		// para quitar la sombra utilizaremos un canvas vacio, podriamos
		// utilizar una imagen
		let el = ev.currentTarget;
		ev.dataTransfer.setDragImage(this.canvas,0,0);
		// en safari no funciona
		el.classList.add("dragging");
	}
	handleDrag(ev){
		/*
			Mientras el usuario arrastra el elemento.
			ev -> tiene las coordenas que tiene el elemento en ese momento
		*/
		console.log(ev.currentTarget.clientHeight);
		let mouseCoords = {x : ev.clientX, y:ev.clientY};
		DOMHelper.move(ev.currentTarget, mouseCoords);

		/*
			Eso lo mandaremos llamar cuando estamos moviendo el elemento
		*/

		this.items.forEach(item => {
			if(item == ev.currentTarget) return;
			DOMHelper.isOver(item,mouseCoords);
		});
	}
	handleDragEnd(ev){
		/*
			Aqui es cuando el usuario suelte el elemento.
		*/
		console.log(":(");
		let el = ev.currentTarget;
		// para volver agarrar el elmento debemos reicionar sus coordenadas
		el.style.top = "";
		el.style.left = "";
		el.classList.remove("dragging");

	}
}
(function(){
	/*
		de esta manera estamos creando el objeto indicando 2 parametros: 
		el primero el elemento contenedor que para nuestro ej. UL y los
		elementos que se van hacer movidos que son los li
	*/
	new DragList("ul")
})()