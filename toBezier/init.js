var tween,
	opacity = false,
	motionPath = MorphSVGPlugin.pathDataToBezier("#motionPath",{
		align : "#balloon"
	});

	TweenLite.set("#balloon", {xPercent : -50, yPercent : -50});
console.log(motionPath);
console.log(22)


$("#createAnimation").click(function(){
	tween = TweenLite.to("#balloon", 2, {bezier : {values : motionPath, type : "cubic", autoRotate:["x","y","rotation",45,false]},ease:Power1.easeInOut,onUpdate : updateSlider })
});

$("#slider").slider({
	range : false,
	min : 0,
	max : 1,
	step : .001,
	slide : function(event,ui){
		tween.progress(ui.value).pause();
	},
	stop : function(){
		tween.play();
	}
});
function updateSlider(){
	$("#slider").slider("value",tween.progress());
};