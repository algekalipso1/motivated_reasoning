// ---------------- 3. EXPERIMENT FLOW ------------------
// This .js file determines the flow of the variable elements in the experiment as dictated 
// by the various calls from pragmods html.



function showSlide(id) {
  $(".slide").hide();
  $("#"+id).show();
}

function loadInstructions() {
	console.log("Start button pressed")
	$("#intro").css("display", "none");
	$("#long_instructions").css("visibility", "visible");
}



showSlide("intro");



/*
Here the images used in the experiment are loaded in two arrays.
The first is base_image_pl, which stores the "underlying" or base images
which will then be modified with props stored in the props_image_pl Array.

NOTE: Unfortunately the number of variations for each type of object is hardoded.
To make the code more usable it will be necessary to 
*/

var base_image_pl = new Array();
for (i=0; i<3; i++) {
    base_image_pl[i] = new Image();
    base_image_pl[i].src = "images2/" + base + "-base" + String(i+1) + ".png";
}


// By creating image object and setting source, the proloadwed images become accesible. In this case they are stored as elements of the Array.
var props_image_pl = new Array() 
for (i=0;i<props.length;i++) {
    props_image_pl[i] = new Image();
    props_image_pl[i].src = "images2/" + base + "-" + props[i] + ".png";
}

var number_to_name = new Array();
number_to_name[0] = 'A';
number_to_name[1] = 'B';
number_to_name[2] = 'C';

// The main experiment:
//		The variable/object 'experiment' has two distinct but interrelated components:
//		1) It collects the variables that will be delivered to Turk at the end of the experiment
//		2) It hall all the functions that change the visual aspect of the experiment such as showing images, etc.

var experiment = {

    // These variables are the ones that will be sent to Turk at the end.
    // The first batch, however, is set determined by the experiment conditions
    // and therefore should not be affected by the decisions made by the experimental subject.
	item: base,
	target_property: props[target_prop],
	logical_property: props[distractor_prop],
	foil_property: props[foil_prop],

	target_position: positions[target],    // -2
	logical_position: positions[distractor],

	target_frequency: target_frequencies[fam_cond],
	familiarization_cond: fam_cond, // This is the index number of the familiarization conditions. For example, fam_cond == 0 means that the distractors, targets etc. are: [0, 1, 2, 2, 2, 2, 2, 2, 2]

    end: function () {
    	showSlide("finished");
    	setTimeout(function () {
		turk.submit(experiment);
        }, 500); 
    }
}

function loadPost() {
	if ($("#slider2").css("opacity")==1.0) {
		drag2.disable();
		$("#evidence1, #evidence2").css("display", "none");
		$("#post_questions").css("visibility", "visible");
	}
}


