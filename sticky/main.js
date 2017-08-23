(function(){
	let pinged = false;
	let nav = document.querySelector(".nav");
	let coords = nav.getBoundingClientRect();
	// obtenemos la altura del hero-image
	//let stickyScrollPoint = coords.top;
	let stickyScrollPoint = document.querySelector(".hero-image").offsetHeight;
	console.log(stickyScrollPoint)
	function pingToTop(){
		if (pinged) return;

		nav.classList.add("pined");

		pinged = true;
	}

	function unPingFromTop(){
		if (!pinged) return;

		nav.classList.remove("pined");

		pinged = false;
	}

	window.addEventListener('scroll',function(ev){
		//console.log(ev);
		if(window.scrollY < stickyScrollPoint) return unPingFromTop();
		/*
		getBoundingClientRect -> me indica las coordenadas del elemento		
		*/
		let coords = nav.getBoundingClientRect();
		if (coords.top <= 0) return pingToTop();
		console.log(coords.top);
	});


})();