class IndexForSiblings{
	static get(el){
		let children = el.parentNode.children;

		for (var i=0; i < children.length; i++){
			let child = children[i];
			if (child == el) return i;
		}

	}
}

class Slider{
	constructor(selector, movimiento = true){
		/* 	con esta linea de codigo nos aseguramos
			que el this siempre valga lo mismo 
			y no se modifique
		*/
		this.move = this.move.bind(this);
		this.moveByButton = this.moveByButton.bind(this);

		this.slider = document.querySelector(selector);
		/*
		"> *" -> seleccionaremos todos los hijos directos.
		*/
		this.itemsCount = this.slider.querySelectorAll(".container > *").length;
		//console.log(itemsCount)
		this.interval = null;
		this.contador = 0;
		this.movimiento = movimiento;

		this.start();
		this.buildControls();
		this.bindEvents();

	}
	start(){
		if(!this.movimiento) return; 
		this.interval = window.setInterval(this.move,3000);
		//console.log(this)
	}

	restart(){
		if(this.interval) window.clearInterval(this.interval);
		this.start(); 
	}

	bindEvents(){
		this.slider.querySelectorAll(".controls li")
			.forEach(item =>{
				item.addEventListener("click",this.moveByButton)
			});
	}

	moveByButton(ev){
		let index = IndexForSiblings.get(ev.currentTarget)
		this.contador = index;
		this.moveTo(index);
		this.restart()
		console.log(index)
	}
	buildControls(){
		//console.log(this.itemsCount)
		for (var i = 0; i < this.itemsCount; i++){
			let control = document.createElement("li");
			if (i==0){
				control.classList.add("active")
			}
			//console.log(this.slider)
			this.slider.querySelector(".controls ul").appendChild(control);
		}
	}
	move(){
		// this -> Objeto que estamos trabajando
		
		this.contador++;
		if (this.contador > this.itemsCount-1)
			this.contador = 0;
		this.moveTo(this.contador)
	}
	resetIndicator(){
		this.slider.querySelectorAll(".controls li.active")
			.forEach(item =>item.classList.remove("active"));
	}
	moveTo(index){
		let  left = index * 100;
		this.resetIndicator();
		this.slider.querySelector(".controls li:nth-child("+(index+1)+")").classList.add("active");
		this.slider.querySelector(".container").style.left = "-"+left + "%";
	}
}


(function(){
	new Slider(".slider",true);
	//console.log("f")
})();