$(document).ready(function(){
	// Init ScrollMagic
	var controller = new ScrollMagic.Controller({
		vertical : true
	});

	// pin the intro
	var pinIntroScene = new ScrollMagic.Scene({
		triggerElement : '#intro',
		triggerHook : 0,
		duration : '30%'	
	})
	.setPin('#intro',{pushFollowers : false})
	.addTo(controller);


	var pinIntroScene2 = new ScrollMagic.Scene({
		triggerElement : '#project01',
		triggerHook : 0.4
	})
	.setPin('#intro',{pushFollowers : false})
	.addTo(controller);


	// parallax scene
	var parallaxTl = new TimelineMax();

	parallaxTl
		.from('.content-wrapper', 1,{autoAlpha : 0 , ease : Power0.easeNone}, .5)
		.from('.bcg',2,{y : '-50%', ease : Power0.easeNone})

	var sliderParallaxScene = new ScrollMagic.Scene({
		triggerElement : '.bcg-parallax',
		triggerHook : 1,
		duration : '100%'
	})
	.setTween(parallaxTl)
	//.setTween(TweenMax.from('.bcg',1,{y : '-30%', ease : Power0.easeNone}))
	.addTo(controller)


	// loop through each .project element
	$(".project").each(function(){
		// build a scene
		var ourScene = new ScrollMagic.Scene({
			triggerElement : this,
			triggerHook : 0.9,
			reserve : false
		})
		.setClassToggle(this,'fade-in') // add class to project01
		.addIndicators({
			name : 'fade scene',
			colorTrigger : 'black',
			indent : 10,
			colorStart : 'pink',
			colorEnd : 'yellow'
		})
		.addTo(controller)
	});

});