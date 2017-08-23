class ViewPort{
	static visible(el){
		let coords = el.getBoundingClientRect();
		/*
			document.documentEl.ClientHeight -> nos da la altura de todo el documento
		*/
		let windowHeight = document.documentElement.clientHeight;

		console.log(coords.top)
		console.log(windowHeight)

		return (coords.top < windowHeight && (coords.top * -1 ) < windowHeight);
	}
}
class PlayOnViewPort{
	constructor(video_selector){
		this.video = document.querySelector(video_selector);
		/*
			No perder el valor del this
		*/
		console.log(this);
		this.evaluate = this.evaluate.bind(this);
		this.bindEvents();
	}
	bindEvents(){
		window.addEventListener('scroll',this.evaluate);
	} 
	evaluate(){
		console.log(ViewPort.visible(this.video))

		if (ViewPort.visible(this.video)){
			console.log("cc")
			this.video.play();
		}else{
			this.video.pause();
		}
	}
}
(function(){
	new PlayOnViewPort("video");
})();