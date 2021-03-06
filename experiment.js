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
	//competition_condition: 2,

	// The following variables store the response given by the participant
	participant_age: '',
	participant_gender: '',
	participant_native_lang: '',
	initials_provided_by_participant: '',
	message_text_by_participant: '',

	motivation_to_win: -1,
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
		//Testing
		//experiment.competition_condition = 1;

		if (experiment.competition_condition == 0) {
			//control
			condition_text += '<p>Your partner will be: <b>JG</b>. </p>';
		};
		if (experiment.competition_condition==1) {
			//team
			condition_text += '<p>Your partner will be: <b>DW</b>. </p>';
		};
		if (experiment.competition_condition==2) {
			//opponent
			condition_text += '<p>Your partner will be: <b>SK</b>. </p>';
		};

		$("#condition_text").html(condition_text);
		$("#condition_text2").html(condition_text);
		$("#condition_text4").html(condition_text);


	},

	instructions_function2: function() {
		var condition_text = '';
		//Testing
		//experiment.competition_condition = 1;

		if (experiment.competition_condition == 0) {
			//control
			condition_text += '<center class="banner_container"><img src="images/blue_banner_2_named.png" style="width: 30%; height: 20%;"></center>'+
								'<p>You will be playing against the Blue Team with <b>IA</b> as the <b>word selector</b>'+
								' and <b>GM</b> as the <b>word unscrambler</b>.</p>';
		};
		if (experiment.competition_condition==1) {
			//team
			condition_text += '<center class="banner_container"><img src="images/blue_banner_2_named.png" style="width: 30%; height: 20%;"></center>'+
								'<p>You will be playing against the Blue Team with <b>IA</b> as the <b>word selector</b>'+
								' and <b>GM</b> as the <b>word unscrambler</b>.</p>';
		};
		if (experiment.competition_condition==2) {
			//opponent
			condition_text += '<center class="banner_container"><img src="images/blue_banner_2_named.png" style="width: 30%; height: 20%;"></center>'+
								'<p>You will be playing against the Blue Team with <b>MJ</b> as the <b>word selector</b>'+
								' and <b>DW</b> as the <b>word unscrambler</b>.</p>';
		};

		$("#condition_text3").html(condition_text);
		$("#condition_text5").html(condition_text);

	},

	teams_function: function() {
		var teams_image = '';
		

		if (experiment.competition_condition == 0) {
			//control
			teams_image += '<center class="teams" id="teams">'+
								'<table class="teams_table" style="width:100%;">'+
									'<tr id="teams_header">'+
										'<th class="teams_row" id="teams_position"></th>'+
										'<th class="teams_row" id="teams_team1">Selector</th>'+
										'<th class="teams_row" id="teams_team2">Unscrambler</th>'+
									'</tr>'+
									'<tr id="teams_row1">'+
										'<td class="teams_row" id="position_selector"><font color="red">RED <br> TEAM</font></td>'+
										'<td class="teams_row" id="team_you"><img src="images/shirt_red.png" class="selector_shirt"></td>'+
										'<td class="teams_row" id="team_jg"><img src="images/shirt_red.png" class="unscrambler_shirt"></td>'+
									'</tr>'+
									'<tr>'+
										'<td></td>'+
										'<td class="teams_row"><font color="red" id="team_you_font"></font></td>'+
										'<td class="teams_row"><font color="red"><b>JG</b></font></td>'+
									'</tr>'+
									'<tr id="teams_row_you">'+
										'<td></td>'+
										'<td class="teams_row"><font color="red" id="team_you_font">(you)</font></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr id="teams_row2">'+
										'<td class="teams_row table_position" id="position_unscrambler"><font color="blue">BLUE <br> TEAM</font></td>'+
										'<td class="teams_row" id="team_ia"><img src="images/shirt_blue.png" class="selector_shirt">'+
										'<td class="teams_row" id="team_gm"><img src="images/shirt_blue.png" class="unscrambler_shirt">'+
									'</tr>'+
									'<tr>'+
										'<td></td>'+
										'<td class="teams_row"><font color="blue"><b>IA</b></font></td>'+
										'<td class="teams_row"><font color="blue"><b>GM</b></font></td>'+
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
										'<th class="teams_row" id="teams_team1">Selector</th>'+
										'<th class="teams_row" id="teams_team2">Unscrambler</th>'+
									'</tr>'+
									'<tr id="teams_row1">'+
										'<td class="teams_row" id="position_selector"><font color="red">RED <br> TEAM</font></td>'+
										'<td class="teams_row" id="team_you"><img src="images/shirt_red.png" class="selector_shirt"></td>'+
										'<td class="teams_row" id="team_jg"><img src="images/shirt_red.png" class="unscrambler_shirt"></td>'+
									'</tr>'+
									'<tr>'+
										'<td></td>'+
										'<td class="teams_row"><font color="red" id="team_you_font"></font></td>'+
										'<td class="teams_row"><font color="red"><b>DW</b></font></td>'+
									'</tr>'+
									'<tr id="teams_row_you">'+
										'<td></td>'+
										'<td class="teams_row"><font color="red" id="team_you_font">(you)</font></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr id="teams_row2">'+
										'<td class="teams_row table_position" id="position_unscrambler"><font color="blue">BLUE <br> TEAM</font></td>'+
										'<td class="teams_row" id="team_ia"><img src="images/shirt_blue.png" class="selector_shirt">'+
										'<td class="teams_row" id="team_gm"><img src="images/shirt_blue.png" class="unscrambler_shirt">'+
									'</tr>'+
									'<tr>'+
										'<td></td>'+
										'<td class="teams_row"><font color="blue"><b>IA</b></font></td>'+
										'<td class="teams_row"><font color="blue"><b>GM</b></font></td>'+
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
										'<th class="teams_row" id="teams_team1">Selector</th>'+
										'<th class="teams_row" id="teams_team2">Unscrambler</th>'+
									'</tr>'+
									'<tr id="teams_row1">'+
										'<td class="teams_row" id="position_selector"><font color="red">RED <br> TEAM</font></td>'+
										'<td class="teams_row" id="team_you"><img src="images/shirt_red.png" class="selector_shirt"></td>'+
										'<td class="teams_row" id="team_jg"><img src="images/shirt_red.png" class="unscrambler_shirt"></td>'+
									'</tr>'+
									'<tr>'+
										'<td></td>'+
										'<td class="teams_row"><font color="red" id="team_you_font"></font></td>'+
										'<td class="teams_row"><font color="red"><b>SK</b></font></td>'+
									'</tr>'+
									'<tr id="teams_row_you">'+
										'<td></td>'+
										'<td class="teams_row"><font color="red" id="team_you_font">(you)</font></td>'+
										'<td></td>'+
									'</tr>'+
									'<tr id="teams_row2">'+
										'<td class="teams_row table_position" id="position_unscrambler"><font color="blue">BLUE <br> TEAM</font></td>'+
										'<td class="teams_row" id="team_ia"><img src="images/shirt_blue.png" class="selector_shirt">'+
										'<td class="teams_row" id="team_gm"><img src="images/shirt_blue.png" class="unscrambler_shirt">'+
									'</tr>'+
									'<tr>'+
										'<td></td>'+
										'<td class="teams_row"><font color="blue"><b>MJ</b></font></td>'+
										'<td class="teams_row"><font color="blue"><b>DW</b></font></td>'+
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
		//evidence_level=2;

		if (evidence_level == 1) {
			info_about_partner += '<div class="evidence_container">'+
									'<center class="evidence" id="evidence1">'+
										'<p id="logo-text">Sample Round</p>'+
										'<table class="evidence" style="width:  400px;">'+
											'<tr><th class="task_question">Scrambled Word</th>'+
												"<th class='task_answer'><b>DW's Answer</b></th>"+
												'<th class="task_evaluation">Correct?</th>'+
												'<th class="task_time">How long it took</th>'+
											'</tr>'+
											'<tr id="short_row1" class="row" style="display: none;"><td class="task_question" id="short_q1">serera</td>'+
												 '<td class="task_answer" id="short_a1">eraser</td>'+
												 '<td class="task_evaluation" id="short_e1"><img src="images/check_green.png" class="check_mark"></td>'+
												 '<td class="task_time" id="short_t1">6.4</td>'+
											'</tr>'+
											'<tr id="short_row2" style="display: none;"><td class="task_question" id="short_q2">seaktb</td>'+
												 '<td class="task_answer" id="short_a2">___</td>'+
												 '<td class="task_evaluation" id="short_e2"><img src="images/red_x.png" class="check_mark"></td>'+
												 '<td class="task_time" id="short_t2"><font color="red"><b>10.0</b></font></td>'+
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
												'<th class="task_evaluation">Correct?</th>'+
												'<th class="task_time">Time (seconds)</th>'+
											'</tr>'+
											'<tr id="long_row1" style="display: none;"><td class="task_question" id="q1">tlbae</td>'+
												 '<td class="task_answer" id="a1">table</td>'+
												 '<td class="task_evaluation" id="e1"><img src="images/check_green.png" class="check_mark"></td>'+
												 '<td class="task_time" id="t1">6.4</td>'+
											'</tr>'+
											'<tr id="long_row2" style="display: none;"><td class="task_question" id="q2">seaktb</td>'+
												 '<td class="task_answer" id="a2">basket</td>'+
												 '<td class="task_evaluation" id="e2"><img src="images/check_green.png" class="check_mark"></td>'+
												 '<td class="task_time" id="t2">8.7</td>'+
											'</tr>'+
											'<tr id="long_row3" style="display: none;"><td class="task_question" id="q3">rahte</td>'+
												 '<td class="task_answer" id="a3">heart</td>'+
												 '<td class="task_evaluation" id="e3"><img src="images/check_green.png" class="check_mark"></td>'+
												 '<td class="task_time" id="t3">5.1</td>'+
											'</tr>'+
											'<tr id="long_row4" style="display: none;"><td class="task_question" id="q4">tkas</td>'+
												 '<td class="task_answer" id="a4">task</td>'+
												 '<td class="task_evaluation" id="e4"><img src="images/check_green.png" class="check_mark"></td>'+
												 '<td class="task_time" id="t4">2.2</td>'+
											'</tr>'+
											'<tr id="long_row5" style="display: none;"><td class="task_question" id="q5">nddaci</td>'+
												 '<td class="task_answer" id="a5">candid</td>'+
												 '<td class="task_evaluation" id="e5"><img src="images/red_x.png" class="check_mark"></td>'+
												 '<td class="task_time" id="t5">10.0</td>'+
											'</tr>'+
											'<tr id="long_row6" style="display: none;"><td class="task_question" id="q6">serea</td>'+
												 '<td class="task_answer" id="a6">erase</td>'+
												 '<td class="task_evaluation" id="e6"><img src="images/check_green.png" class="check_mark"></td>'+
												 '<td class="task_time" id="t6">8.3</td>'+
											'</tr>'+
											'<tr id="long_row7" style="display: none;"><td class="task_question" id="q7">octivr</td>'+
												 '<td class="task_answer" id="a7">victor</td>'+
												 '<td class="task_evaluation" id="e7"><img src="images/check_green.png" class="check_mark"></td>'+
												 '<td class="task_time" id="t7">7.7</td>'+
											'</tr>'+
											'<tr id="long_row8" style="display: none;"><td class="task_question" id="q8">paelp</td>'+
												 '<td class="task_answer" id="a8">apple</td>'+
												 '<td class="task_evaluation" id="e8"><img src="images/check_green.png" class="check_mark"></td>'+
												 '<td class="task_time" id="t8">4.1</td>'+
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
    	experiment.participant_age = $("#age_id").val();
    	experiment.participant_gender = $("#female_button").val(); //If T, female, else male
    	experiment.participant_native_lang = $("#language_id").val();
    	//Post-questions
    	experiment.motivation_to_win = motivation_raw.getValue()[0];
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








