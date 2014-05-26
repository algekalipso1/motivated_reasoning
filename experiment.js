// ---------------- 3. EXPERIMENT FLOW ------------------
// This .js file determines the flow of the variable elements in the experiment as dictated 
// by the various calls from pragmods html.


//var num_conditions = 3;
//var condition = random(0, num_conditions-1);






// The main experiment:
//		The variable/object 'experiment' has two distinct but interrelated components:
//		1) It collects the variables that will be delivered to Turk at the end of the experiment
//		2) It hall all the functions that change the visual aspect of the experiment such as showing images, etc.

var experiment = {


    // These variables are the ones that will be sent to Turk at the end.
    // First the experimental conditions are registered
	competition_condition: disposition,
	evidence_condition: evidence_level,

	//Testing
	competition_condition: 1,

	// The following variables store the response given by the participant
	initials_provided_by_participant: '',

	DW_strength: -1,
	strength_of_average_player: -1,
	role_of_luck_in_game: -1,
	expectation_of_winning: -1,

	DW_check: -1,
	familiarization_check: -1,
	DW_accuracy_check: -1,
	overall_check: -1,
	final_comments: -1,

	instructions_function: function() {
		var condition_text = '';

		if (experiment.competition_condition == 0) {
			//control
			condition_text += '';
		};
		if (experiment.competition_condition==1) {
			//team
			condition_text += '<p>Your partner will be: <b>DW</b>.</p>';
		};
		if (experiment.competition_condition==2) {
			//opponent
			condition_text += '<p>Your partner will be: SK. </p>'+
								'<p>You will be playing against a team with MJ as the the word selector and DW as the word unscrambler.</p>';
		};

		$("#condition_text").html(condition_text);
	},

	teams_function: function() {
		var teams_image = '';

		if (experiment.competition_condition == 0) {
			//control
			teams_image += '<center class="teams" id="teams">'+
								'<table class="teams_table" style="width:100%;">'+
									'<tr id="teams_header">'+
										'<th class="teams_row" id="teams_position"></th>'+
										'<th class="teams_row" id="teams_team1"><font color="red">Team 1</font></th>'+
										'<th class="teams_row" id="teams_team2"><font color="blue">Team 2</font></th></tr>'+
									'<tr id="teams_row1">'+
										'<td class="teams_row table_position" id="position_selector">Selector</td>'+
										'<td class="teams_row" id="team_you"><img src="images/shirt_red_s.png" class="shirt_img">'+
											'<font color="red" id="team_you_font"></font></td></td>'+
										'<td class="teams_row" id="team_ia"><img src="images/shirt_blue_s.png" class="shirt_img">'+
											'<font color="blue">IA</font></td>'+
									'</tr>'+
									'<tr id="teams_row_you">'+
										'<td></td>'+
										'<td class="teams_row"><font color="red" id="team_you_font">(you)</font></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr id="teams_row2">'+
										'<td class="teams_row table_position" id="position_unscrambler">Unscrambler</td>'+
										'<td class="teams_row" id="team_ig"><img src="images/shirt_red_u.png" class="shirt_img">'+
											'<font color="red">JG</font></td>'+
										'<td class="teams_row" id="team_gm"><img src="images/shirt_blue_u.png" class="shirt_img">'+
											'<font color="blue">GM</font></td>'+
									'</tr>'+
								'</table>'+
							'</center>';
		};
		if (experiment.competition_condition==1) {
			//team
			teams_image += '<center class="teams" id="teams">'+
								'<table class="teams_table" style="width:100%;">'+
									'<tr id="teams_header">'+
										'<th class="teams_row" id="teams_position"></th>'+
										'<th class="teams_row" id="teams_team1"><font color="red">Team 1</font></th>'+
										'<th class="teams_row" id="teams_team2"><font color="blue">Team 2</font></th></tr>'+
									'<tr id="teams_row1">'+
										'<td class="teams_row table_position" id="position_selector">Selector</td>'+
										'<td class="teams_row" id="team_you"><img src="images/shirt_red_s.png" class="shirt_img">'+
											'<font color="red" id="team_you_font">(you)</font></td></td>'+
										'<td class="teams_row" id="team_ia"><img src="images/shirt_blue_s.png" class="shirt_img">'+
											'<font color="blue">IA</font></td>'+
									'</tr>'+
									'<tr id="teams_row_you">'+
										'<td></td>'+
										'<td class="teams_row"><font color="red" id="team_you_font">(you)</font></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr id="teams_row2">'+
										'<td class="teams_row table_position" id="position_unscrambler">Unscrambler</td>'+
										'<td class="teams_row" id="team_ig"><img src="images/shirt_red_u.png" class="shirt_img">'+
											'<font color="red">DW</font></td>'+
										'<td class="teams_row" id="team_gm"><img src="images/shirt_blue_u.png" class="shirt_img">'+
											'<font color="blue">GM</font></td>'+
									'</tr>'+
								'</table>'+
							'</center>';
		};
		if (experiment.competition_condition==2) {
			//opponent
			teams_image += '<center class="teams" id="teams">'+
								'<table class="teams_table" style="width:100%;">'+
									'<tr id="teams_header">'+
										'<th class="teams_row" id="teams_position"></th>'+
										'<th class="teams_row" id="teams_team1"><font color="red">Team 1</font></th>'+
										'<th class="teams_row" id="teams_team2"><font color="blue">Team 2</font></th></tr>'+
									'<tr id="teams_row1">'+
										'<td class="teams_row table_position" id="position_selector">Selector</td>'+
										'<td class="teams_row" id="team_you"><img src="images/shirt_red_s.png" class="shirt_img">'+
											'<font color="red" id="team_you_font"></font></td></td>'+
										'<td class="teams_row" id="team_ia"><img src="images/shirt_blue_s.png" class="shirt_img">'+
											'<font color="blue">MJ</font></td>'+
									'</tr>'+
									'<tr id="teams_row_you">'+
										'<td></td>'+
										'<td class="teams_row"><font color="red" id="team_you_font">(you)</font></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr id="teams_row2">'+
										'<td class="teams_row table_position" id="position_unscrambler">Unscrambler</td>'+
										'<td class="teams_row" id="team_ig"><img src="images/shirt_red_u.png" class="shirt_img">'+
											'<font color="red">SK</font></td>'+
										'<td class="teams_row" id="team_gm"><img src="images/shirt_blue_u.png" class="shirt_img">'+
											'<font color="blue">DW</font></td>'+
									'</tr>'+
								'</table>'+
							'</center>';
		};

		$(".teams_container").html(teams_image);
		$("#team_you_font").text(experiment.initials_provided_by_participant);

	},

	// Dynamically generated part. This has to be here so that the variables about the experimental conditions and
	// people's answers are accessible when generating the code.
	evidence_function: function() {
		numComplete = numComplete+1; 
		$('#trial-num').html(numComplete);

		var info_about_partner = '';
		//testing
		//evidence_level=0;

		if (evidence_level == 1) {
			info_about_partner += '<div class="evidence_container">'+
									'<center class="evidence" id="evidence1">'+
										'<p id="logo-text">Sample Round</p>'+
										'<table class="evidence" style="width:  400px;">'+
											'<tr><th class="task_question">Scrambled Word</th>'+
											'<th class="task_answer"><b>DWs Answer</b></th>'+
											'<th class="task_evaluation">Correct and Under 10 seconds?</th></tr>'+
											'<tr id="short_row1" class="row" style="display: none;"><td class="task_question" id="short_q1">vereid</td>'+
												 '<td class="task_answer" id="short_a1">derive</td>'+
												 '<td class="task_evaluation" id="short_e1"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr id="short_row2" style="display: none;"><td class="task_question" id="short_q2">sismhc</td>'+
												 '<td class="task_answer" id="short_a2">schism</td>'+
												 '<td class="task_evaluation" id="short_e2"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
										'</table>'+
									'</center>'+
									'</div>'+
									'<center class="button_container">'+
										"<button type='button' class='continue_button' id='ev1button' onclick='evClick(2)'>Continue</button>"+ 
									'</center>';
		} else {
			info_about_partner += '<div class="evidence_container">'+
									'<center class="evidence" id="evidence1">'+
										'<p id="logo-text">Sample Round</p>'+
										'<table class="evidence" style="width:  400px;">'+
											'<tr><th class="task_question">Scrambled Word</th>'+
											'<th class="task_answer"><b>DWs Answer</b></th>'+
											'<th class="task_evaluation">Correct and Under 10 seconds?</th></tr>'+
											'<tr id="long_row1" style="display: none;"><td class="task_question" id="q1">naanba</td>'+
												 '<td class="task_answer" id="a1">banana</td>'+
												 '<td class="task_evaluation" id="e1"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr id="long_row2" style="display: none;"><td class="task_question" id="q2">sismhc</td>'+
												 '<td class="task_answer" id="a2">schism</td>'+
												 '<td class="task_evaluation" id="e2"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr id="long_row3" style="display: none;"><td class="task_question" id="q3">yptrho</td>'+
												 '<td class="task_answer" id="a3">trophy</td>'+
												 '<td class="task_evaluation" id="e3"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr id="long_row4" style="display: none;"><td class="task_question" id="q4">ralopt</td>'+
												 '<td class="task_answer" id="a4">portal</td>'+
												 '<td class="task_evaluation" id="e4"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr id="long_row5" style="display: none;"><td class="task_question" id="q5">nddaci</td>'+
												 '<td class="task_answer" id="a5">candid</td>'+
												 '<td class="task_evaluation" id="e5"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr id="long_row6" style="display: none;"><td class="task_question" id="q6">lnomsa</td>'+
												 '<td class="task_answer" id="a6">salmon</td>'+
												 '<td class="task_evaluation" id="e6"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr id="long_row7" style="display: none;"><td class="task_question" id="q7">octivr</td>'+
												 '<td class="task_answer" id="a7">victor</td>'+
												 '<td class="task_evaluation" id="e7"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
											'<tr id="long_row8" style="display: none;"><td class="task_question" id="q8">vereid</td>'+
												 '<td class="task_answer" id="a8">derive</td>'+
												 '<td class="task_evaluation" id="e8"><img src="images/check_green.png" class="check_mark"></td>'+
											'</tr>'+
										'</table>'+
									'</center>'+
									'</div>'+
									'<center class="button_container">'+
										'<button type="button" class="continue_button" id="ev1button" onclick="evClick(8)">Continue</button>'+ 
									'</center>';
		}


	    $("#question_evidence_provided").html(info_about_partner);

	},

	initials_check: function() {
		if (document.getElementById("initials_id").value == "") {
			initialErrorMessage();
		} else {
			experiment.initials_provided_by_participant = document.getElementById("initials_id").value;
			initialsClick();
		}
	},


	last_slide_check: function() {
		if (document.getElementById("DW_identity_id").value == "blank" || 
			document.getElementById("familiarization_check").value == "blank" || 
			document.getElementById("accuracy_check").value == "blank") {
			DWErrorMessage();
		} else {
			manipClick();
		}
	},

	



    check_finished: function() {
    	//Post-questions
		experiment.DW_strength = DW_strength_raw.getValue()[0];
		experiment.strength_of_average_player = average_strength_raw.getValue()[0];
		experiment.role_of_luck_in_game = luck_raw.getValue()[0];
		experiment.expectation_of_winning = optimism_raw.getValue()[0];
		//Manipulation questions
		experiment.DW_check = $("#DW_identity_id").val();
		experiment.familiarization_check = $("#familiarization_check").val();
		experiment.DW_accuracy_check = $("#accuracy_check").val();
		experiment.overall_check = $("#overall_check").val();
		experiment.final_comments = $("#comment_box").val();

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








