// ---------------- 3. EXPERIMENT FLOW ------------------
// This .js file determines the flow of the variable elements in the experiment as dictated 
// by the various calls from pragmods html.

function loadInstructions() {
	console.log("Start button pressed")
	$("#intro").css("display", "none");
	$("#long_instructions").css("visibility", "visible");
}




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
		//testing
		evidence_level=0;
		if (evidence_level == 0) {
			info_about_partner += '<div class="evidence_container">'+
									'<center class="evidence" id="evidence1">'+
										'<table class="evidence" style="width:  800px;">'+
											'<tr><th class="task_question">Scrambled Word</th>'+
											'<th class="task_answer">Answer</th>'+
											'<th class="task_evaluation">Evaluation</th></tr>'+
											'<tr><td class="task_question" id="q1">naanba</td>'+
												 '<td class="task_answer" id="a1">banana</td>'+
												 '<td class="task_evaluation" id="e1"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr><td class="task_question" id="q2">simhc</td>'+
												 '<td class="task_answer" id="a2">schism</td>'+
												 '<td class="task_evaluation" id="e2"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
										'</table>'+
									'</center>'+
									'</div>'+
									'<center class="button_container">'+
										'<button type="button" class="continue_button" id="ev1button" onclick="ev1Click()">Continue</button>'+ 
									'</center>';
		} else {
			info_about_partner += '<div class="evidence_container">'+
									'<center class="evidence" id="evidence1">'+
										'<table class="evidence" style="width:  800px;">'+
											'<tr><th class="task_question">Scrambled Word</th>'+
											'<th class="task_answer">Answer</th>'+
											'<th class="task_evaluation">Evaluation</th></tr>'+
											'<tr><td class="task_question" id="q1">naanba</td>'+
												 '<td class="task_answer" id="a1">banana</td>'+
												 '<td class="task_evaluation" id="e1"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr><td class="task_question" id="q2">sismhc</td>'+
												 '<td class="task_answer" id="a2">schism</td>'+
												 '<td class="task_evaluation" id="e2"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr><td class="task_question" id="q3">yptrho</td>'+
												 '<td class="task_answer" id="a3">trophy</td>'+
												 '<td class="task_evaluation" id="e3"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr><td class="task_question" id="q4">ralopt</td>'+
												 '<td class="task_answer" id="a4">portal</td>'+
												 '<td class="task_evaluation" id="e4"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr><td class="task_question" id="q5">nddaci</td>'+
												 '<td class="task_answer" id="a5">candid</td>'+
												 '<td class="task_evaluation" id="e5"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr><td class="task_question" id="q6">lnomsa</td>'+
												 '<td class="task_answer" id="a6">salmon</td>'+
												 '<td class="task_evaluation" id="e6"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr><td class="task_question" id="q7">octivr</td>'+
												 '<td class="task_answer" id="a7">victor</td>'+
												 '<td class="task_evaluation" id="e7"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr><td class="task_question" id="q8">vereid</td>'+
												 '<td class="task_answer" id="a8">derive</td>'+
												 '<td class="task_evaluation" id="e8"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
										'</table>'+
									'</center>'+
									'</div>'+
									'<center class="button_container">'+
										'<button type="button" class="continue_button" id="ev1button" onclick="ev1Click()">Continue</button>'+ 
									'</center>';
		}


	    $("#question_evidence_provided").html(info_about_partner);

	},

    check_finished: function() {
		experiment.DW_strength = slider1.getValue()[0];
		experiment.strength_of_average_player = slider2.getValue()[0];
		experiment.role_of_luck_in_game = slider3.getValue()[0];
		experiment.motivation_to_win = slider4.getValue()[0];
		experiment.expectation_of_playing = slider5.getValue()[0];
		experiment.end();
    },

	// At the end this sends the info to Amazon (magically)
    end: function () {
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


