var drag1;
var drag2;
var drag1_check = false;
var drag2_check = false;

function loadInstructions() {
	console.log("Start button pressed")
	$("#intro").css("display", "none");
	$("#long_instructions").css("visibility", "visible");
}

function loadEvidence(timing) {
	if (timing=='first') {
		console.log("Next button pressed")
		$("#long_instructions").css("display", "none");
		$("#evidence1").css("visibility", "visible");
		drag1 = new Dragdealer('simple-slider1', {'x': 0.5});
	};
	if (timing=='second') {
		if ($("#slider1").css("opacity")==1.0) {
			drag1.disable();
			$("#ev1button").css("display", "none");
			$("#evidence2").css("visibility", "visible");
			drag2 = new Dragdealer('simple-slider2', {'x': 0.5});
		} 

	};


}

function loadGame() {
	drag2.disable();
	$("#evidence1, #evidence2").css("display", "none");
	$("#game").css("visibility", "visible");
}

function loadPost() {
	if ($("#slider2").css("opacity")==1.0) {
		drag2.disable();
		$("#evidence1, #evidence2").css("display", "none");
		$("#post_questions").css("visibility", "visible");
	}
}

function buttonTest() {
	console.log("Button works!")
	drag1 = new Dragdealer('simple-slider1', {'x': 0.5});
}