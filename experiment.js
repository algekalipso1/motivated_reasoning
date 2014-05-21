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



//showSlide("intro");



/*
Here the images used in the experiment are loaded in two arrays.
The first is base_image_pl, which stores the "underlying" or base images
which will then be modified with props stored in the props_image_pl Array.
*/



// The main experiment:
//		The variable/object 'experiment' has two distinct but interrelated components:
//		1) It collects the variables that will be delivered to Turk at the end of the experiment
//		2) It hall all the functions that change the visual aspect of the experiment such as showing images, etc.

var experiment = {

    // These variables are the ones that will be sent to Turk at the end.
    // First the experimental conditions are registered
	competition_condition: disposition,
	evidence_condition: evidence_level,


	// The following variables store the response given by the participant
	DW_strength: -1,
	strength_of_average_player: -1,
	role_of_luck_in_game: -1,
	motivation_to_win: -1,
	expectation_of_playing: -1,



	// Dynamically generated part. This has to be here so that the variables about the experimental conditions and
	// people's answers are accessible when generating the code.
	evidence_function: function() {
		var info_about_partner = '';
		if (evidence_level == 0) {
			info_about_partner += '<div class="evidence_container">
									<center class="evidence" id="evidence1">
										<div class="history_question" style="width: 300px;"> 
											<b> Question </b> 
											<p id="evQ1">When General Douglas MacArthur declared, "I shall return," 
												he intended to return to what place?</p>
										</div>
										<div class="history_answer" style="width: 300px;"> 
											<b> Answer </b> 
											<p id="evQ1" >Philippines</p>
										</div>
										<div class="history_evaluation" style="width: 200px;"> 
											<b> Evaluation </b> <br>
											<img src="images/check_red.jpg" class="check_mark"> <br>
										</div>
										<div class="history_question" style="width: 300px;"> 
											<p id="evQ2">In the period after the American Revolution, what crop became so profitable 
												in the South that slave owning became essential to Southern wealth?</p>
										</div>
										<div class="history_answer" style="width: 300px;"> 
											<p id="evQ2" >Cotton</p>
										</div>
										<div class="history_evaluation" style="width: 200px;"> 
											<b> Evaluation </b> <br>
											<img src="images/check_red.jpg" class="check_mark"> <br>
										</div>
									</center>
								</div>
								<center class="button_container">
									<button type="button" class="continue_button" id="ev1button" onclick="ev1Click()">Continue</button> 
								</center>
								<center class="button_container">
									<button type="button" class="continue_button" id="ev1button" onclick="ev1Click()">Continue</button> 
								</center>';
		} else {
			info_about_partner += '<div class="evidence_container">
									<center class="evidence" id="evidence1">
										<div class="history_question" style="width: 300px;"> 
											<b> Question </b> 
											<p id="evQ1">When General Douglas MacArthur declared, "I shall return," 
												he intended to return to what place?</p>
										</div>
										<div class="history_answer" style="width: 300px;"> 
											<b> Answer </b> 
											<p id="evQ1" >Philippines</p>
										</div>
										<div class="history_evaluation" style="width: 200px;"> 
											<b> Evaluation </b> <br>
											<img src="images/check_red.jpg" class="check_mark"> <br>
										</div>
										<div class="history_question" style="width: 300px;"> 
											<p id="evQ2">In the period after the American Revolution, what crop became so profitable 
												in the South that slave owning became essential to Southern wealth?</p>
										</div>
										<div class="history_answer" style="width: 300px;"> 
											<p id="evQ2" >Cotton</p>
										</div>
										<div class="history_evaluation" style="width: 200px;"> 
											<b> Evaluation </b> <br>
											<img src="images/check_red.jpg" class="check_mark"> <br>
										</div>
									</center>
								</div>
								<center class="button_container">
									<button type="button" class="continue_button" id="ev1button" onclick="ev1Click()">Continue</button> 
								</center>
								<center class="button_container">
									<button type="button" class="continue_button" id="ev1button" onclick="ev1Click()">Continue</button> 
								</center>';
		}


	    $("#question_evidence_provided").html(info_about_partner);

	},

    check_finished: function() {
    	var listOfNameRadios = ["namecheck1", "namecheck2", "namecheck3", "namecheck4"];
    	personMet = getNameRadioValue(listOfNameRadios);
		if (personMet == 0 ||
		    document.getElementById('about').value.length < 1) {
		    $("#checkMessage").html('<font color="red">' + 
				       'Please make sure you have answered all the questions!' + 
				       '</font>');
		} else {
		    if (personMet == 1) {
				experiment.name_check_correct = "TRUE";
		    }
		    experiment.about = document.getElementById("about").value;
		    experiment.comment = document.getElementById("comments").value;
		    experiment.age = document.getElementById("age").value;
		    experiment.gender = document.getElementById("gender").value;

		    showSlide("finished");

		    // HERE you can performe the needed boolean logic to properly account for the target_filler_sequence possibilities.
		    // In other words, here you can check whether the choice is correct depending on the nature of the trial.

		    if (experiment.choice == "target") {
				experiment.choice_correct = "TRUE";
		    } else {
		    	experiment.choice_correct = "FALSE";
		    }
		    experiment.end();
		}
    },

	// At the end this sends the info to Amazon (magically)
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


