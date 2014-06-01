var slider1, slider2, slider3, slider4, slider5, slider6;
var DW_strength_raw, average_strength_raw, luck_raw,  optimism_raw, motivation_raw, expectation_raw;
var numTrials = 10; //Number of slides in the experiment
var numComplete=1; //Number of slides completed (updates throughout)

function checkPreview() {
   if (turk.previewMode) {
       alert ("Please accept this HIT to see more questions.");
       return false;
   }
   return true;
}


function hide_and_seek(hide, show) {
    $("."+hide).css("display", "none");
    $("."+show).css("display", "block");
}

function demographic_check() {
    if ($("#age_id").val() == '' || $("#language_id").val() == '') {
        $(".error_message_demographic").css("display", "block");
    } else if ($('input[name=gender]:checked').length == 0) {
        $(".error_message_demographic").css("display", "block");
    } else {
        $(".error_message_demographic").css("display", "none");
        hide_and_seek('demographic_slide', 'instructions_slide'); 
        numComplete = numComplete+1; $('#trial-num').html(numComplete); 
        $('.bar').css('width', (200.0 * (1+numComplete)/15) + 'px');
    }
    
}

function initialsClick() {
    hide_and_seek("initials_slide", "loading_slide");
    numComplete = numComplete+1; 
    $('#trial-num').html(numComplete);
    $('.bar').css('width', (200.0 * (1+numComplete)/15) + 'px');

    setTimeout(connectionTransition, 9000);

    //for testing
    //setTimeout(connectionLoad, 1000);
    //for real runs
    //setTimeout(connectionLoad, 20000);


}

function connectionTransition() {
    $("#loading_box").text("1 / 4 users found...");
    setTimeout(connectionTransition2, 2000);
}

function connectionTransition2() {
    $("#loading_box").text("2 / 4 users found...");
    setTimeout(connectionTransition3, 6000);
}

function connectionTransition3() {
    $("#loading_box").text("3 / 4 users found...");
    setTimeout(connectionLoad, 1000);
}

function connectionLoad() {
    hide_and_seek("loading_slide", "loading_slide2");
    numComplete = numComplete+1; 
    $('#trial-num').html(numComplete);
    $('.bar').css('width', (200.0 * (1+numComplete)/15) + 'px');
    //for testing
    //setTimeout(conditionLoad, 1000);
    //for real runs
    setTimeout(conditionLoad, 4000);
}



function conditionLoad() {
    $(".teams_container").css("display", "block");
    $(".chat_container").css("display", "block");
    //$(".chat_message_box").text(experiment.initials_provided_by_participant+':');
    hide_and_seek("loading_slide2", "condition_slide");
    numComplete = numComplete+1; 
    $('#trial-num').html(numComplete);
    $('.bar').css('width', (200.0 * (1+numComplete)/15) + 'px');
    experiment.instructions_function();
    experiment.teams_function();
}

function chatFunction () {
    $("#sendButton").attr("disabled", "disabled");
    experiment.message_text_by_participant = $("#chat_entry").val();
    var chat_text = "<div>"+experiment.initials_provided_by_participant+': '+$("#chat_entry").val()+"</div>";
    $("#chat_entry").val(null);
    $(".chat_message_box").html(chat_text);
    setTimeout(responseMessage, 2000, chat_text);

}

function responseMessage(chat_text) {
    if (experiment.competition_condition == 0) {
        chat_text += "<div id='team_response'>JG: ... (typing) </div>";
    }
    if (experiment.competition_condition == 1) {
        chat_text += "<div id='team_response'>DW: ... (typing) </div>";
    }
    if (experiment.competition_condition == 2) {
        chat_text += "<div id='team_response'>SK: ... (typing) </div>";
    }

    $(".chat_message_box").html(chat_text);
    setTimeout(teamResponse, 4000, chat_text);
}

function teamResponse(chat_text) {
    if (experiment.competition_condition == 0) {
        response_text = "JG: We can do this!";
    }
    if (experiment.competition_condition == 1) {
        response_text = "DW: We can do this!";
    }
    if (experiment.competition_condition == 2) {
        response_text = "SK: We can do this!";
    }
    response_text = 
    $("#team_response").text(response_text);
}

function conditionFunction() {
    hide_and_seek('condition_slide', 'condition_slide2');
    experiment.instructions_function();
    experiment.instructions_function2();
}

function answer_reveal(level) {
    if (level=="easy") {
        $('#easy_ev').css('display', 'table-cell');    
    }
    if (level=="med") {
        $('#med_ev').css('display', 'table-cell');    
    }
    if (level=="hard") {
        $('#hard_ev').css('display', 'table-cell');    
    }

    
}

function loadCondition3() {
    if ($("#condition_text6").css("display") == "none") {
        var text = '';
        if (experiment.competition_condition == 0) {
            text += '<span class="block-text">Before we begin, you will see the results from a previous round '+
                        'in order to get a feel for the ability of <b>DW</b>, a randomly selected player.</span>'+
                        '<p class="block-text">You will see the word chosen by the word selector in <b>scrambled</b> form, the unscrambled <b>answer</b>,'+
                        'and an indication of whether or not the response submitted was <b>correct and in time (submitted under 10 seconds)</b>.</p><br>';

        };
        if (experiment.competition_condition == 1) {
            text += '<span class="block-text">Before we begin, you will see the results from a previous round '+
                        'in order to get a feel for the ability of your teammate, <b>DW</b>.</span>'+
                        '<p class="block-text">You will see the word chosen by the word selector in <b>scrambled</b> form, the unscrambled <b>answer</b>,'+
                        'and an indication of whether or not the response submitted was <b>correct and in time (submitted under 10 seconds)</b>.</p><br>';
        };
        if (experiment.competition_condition == 2) {
            text+= '<span class="block-text">Before we begin, you will see the results from a previous round '+
                        'in order to get a feel for the ability of your opponent, <b>DW</b>.</span>'+
                        '<p class="block-text">You will see the word chosen by the word selector in <b>scrambled</b> form, the unscrambled <b>answer</b>,'+
                        'and an indication of whether or not the response submitted was <b>correct and in time (submitted under 10 seconds)</b>.</p><br>';
        };

        $("#condition_text6").css("display", "block");
        $("#condition_text6").html(text);
    } else {
        hide_and_seek('practice_slide', 'evidence_slide'); 
        experiment.evidence_function();
    }    
     
}

function evClick(condition) {


    if (condition == 2) {
        if ($("#short_row1").css("display") == "none") {
            $("#short_row1").css("display", "table-row");
            $("#short_a1").css("display", "none");
            $("#short_e1").css("display", "none");
            $("#short_t1").css("display", "none");
        } else if ($("#short_e1").css("display") == "none") {
            $("#short_a1").css("display", "table-cell");
            $("#short_e1").css("display", "table-cell");
            $("#short_t1").css("display", "table-cell");
        } else if ($("#short_row2").css("display") == "none") {
            $("#short_row2").css("display", "table-row");
            $("#short_a2").css("display", "none");
            $("#short_e2").css("display", "none");
            $("#short_t2").css("display", "none");
        } else if ($("#short_e2").css("display") == "none") {
            $("#short_a2").css("display", "table-cell");
            $("#short_e2").css("display", "table-cell");
            $("#short_t2").css("display", "table-cell");
        } else {
            hide_and_seek("evidence_slide", "eval_slide");
            numComplete = numComplete+1; 
            $('#trial-num').html(numComplete);
    		$('.bar').css('width', (200.0 * (1+numComplete)/15) + 'px');
            motivation_raw = new Dragdealer('simple-slider0', {'x': 0.5, 'slide': false});
        }
    };
    if (condition == 8) {
        if ($("#long_row1").css("display") == "none") {
            $("#long_row1").css("display", "table-row");
            $("#a1").css("display", "none");
            $("#e1").css("display", "none");
            $("#t1").css("display", "none");
        } else if ($("#e1").css("display") == "none") {
            $("#a1").css("display", "table-cell");
            $("#e1").css("display", "table-cell");
            $("#t1").css("display", "table-cell");
        } else if ($("#long_row2").css("display") == "none") {
            $("#long_row2").css("display", "table-row");
            $("#a2").css("display", "none");
            $("#e2").css("display", "none");
            $("#t2").css("display", "none");
        } else if ($("#e2").css("display") == "none") {
            $("#a2").css("display", "table-cell");
            $("#e2").css("display", "table-cell");
            $("#t2").css("display", "table-cell");
        } else if ($("#long_row3").css("display") == "none") {
            $("#long_row3").css("display", "table-row");
            $("#a3").css("display", "none");
            $("#e3").css("display", "none");
            $("#t3").css("display", "none");
        } else if ($("#e3").css("display") == "none") {
            $("#a3").css("display", "table-cell");
            $("#e3").css("display", "table-cell");
            $("#t3").css("display", "table-cell");
        } else if ($("#long_row4").css("display") == "none") {
            $("#long_row4").css("display", "table-row");
            $("#a4").css("display", "none");
            $("#e4").css("display", "none");
            $("#t4").css("display", "none");
        } else if ($("#e4").css("display") == "none") {
            $("#a4").css("display", "table-cell");
            $("#e4").css("display", "table-cell");
            $("#t4").css("display", "table-cell");
        } else if ($("#long_row5").css("display") == "none") {
            $("#long_row5").css("display", "table-row");
            $("#a5").css("display", "none");
            $("#e5").css("display", "none");
            $("#t5").css("display", "none");
        } else if ($("#e5").css("display") == "none") {
            $("#a5").css("display", "table-cell");
            $("#e5").css("display", "table-cell");
            $("#t5").css("display", "table-cell");
        } else if ($("#long_row6").css("display") == "none") {
            $("#long_row6").css("display", "table-row");
            $("#a6").css("display", "none");
            $("#e6").css("display", "none");
            $("#t6").css("display", "none");
        } else if ($("#e6").css("display") == "none") {
            $("#a6").css("display", "table-cell");
            $("#e6").css("display", "table-cell");
            $("#t6").css("display", "table-cell");
        } else if ($("#long_row7").css("display") == "none") {
            $("#long_row7").css("display", "table-row");
            $("#a7").css("display", "none");
            $("#e7").css("display", "none");
            $("#t7").css("display", "none");
        } else if ($("#e7").css("display") == "none") {
            $("#a7").css("display", "table-cell");
            $("#e7").css("display", "table-cell");
            $("#t7").css("display", "table-cell");
        } else if ($("#long_row8").css("display") == "none") {
            $("#long_row8").css("display", "table-row");
            $("#a8").css("display", "none");
            $("#e8").css("display", "none");
            $("#t8").css("display", "none");
        } else if ($("#e8").css("display") == "none") {
            $("#a8").css("display", "table-cell");
            $("#e8").css("display", "table-cell");
            $("#t8").css("display", "table-cell");
        } else {
            hide_and_seek("evidence_slide", "eval_slide");
            numComplete = numComplete+1; 
            $('#trial-num').html(numComplete);
		    $('.bar').css('width', (200.0 * (1+numComplete)/15) + 'px');
            motivation_raw = new Dragdealer('simple-slider0', {'x': 0.5, 'slide': false});
        }
    };

}

function sliderErrorMessage() {
    $(".slider_unanswered").css("display", "block");
}

function sliderErrorHide() {
    $(".slider_unanswered").css("display", "none");
}

function evalClick() {


    if ($("#question1").css("display") == "none") {
        if ($("#slider0").css("opacity") != 1.0) {
            sliderErrorMessage();
        } else {
            motivation_raw.disable();
            sliderErrorHide();
            $("#question1").css("display", "block");
            DW_strength_raw = new Dragdealer('simple-slider1', {'x': 0.5, 'slide': false});
        }
    } else if ($("#question2").css("display") == "none") {
        if ($("#slider1").css("opacity") != 1.0) {
            sliderErrorMessage();
        } else {
            DW_strength_raw.disable();
            sliderErrorHide();
            $("#question2").css("display", "block");
            luck_raw = new Dragdealer('simple-slider2', {'x': 0.5, 'slide': false});
        }
    } else if ($("#question3").css("display") == "none") {
        if ($("#slider2").css("opacity") != 1.0) {
            sliderErrorMessage();
        } else {
            luck_raw.disable();
            sliderErrorHide();
            $("#question3").css("display", "block");
            average_strength_raw = new Dragdealer('simple-slider3', {'x': 0.5, 'slide': false});
        }
    } else if ($("#question4").css("display") == "none") {
        if ($("#slider3").css("opacity") != 1.0) {
            sliderErrorMessage();
        } else {
            average_strength_raw.disable();
            sliderErrorHide();
            $("#question4").css("display", "block");
            optimism_raw = new Dragdealer('simple-slider4', {'x': 0.5, 'slide': false});
        }
    } else {
        if ($("#slider4").css("opacity") != 1.0) {
            sliderErrorMessage();
        } else {
	        optimism_raw.disable();
	        numComplete = numComplete+1; 
	        $('#trial-num').html(numComplete);
		    $('.bar').css('width', (200.0 * (1+numComplete)/15) + 'px');
            $(".teams_container").css("display", "none");
            $(".chat_container").css("display", "none");
	        hide_and_seek("eval_slide", "manip_slide");
        }
    }     

}

function manipClick() {
    numComplete = numComplete+1; 
    $('#trial-num').html(numComplete);
    $('.bar').css('width', (200.0 ) + 'px');
    hide_and_seek("manip_slide", "debrief_slide");              
}

function endSlideClick(){
    $(".debrief_slide").css("display", "none");
    $(".progress").css("display", "none");
    $(".end_slide").css("display", "block");
}

// show slide function
function showSlide(id) {
    $(".slide").hide(); //jquery - all elements with class of slide - hide
    $("#"+id).show(); //jquery - element with given id - show
}

function initialErrorMessage() {
    $(".error_message_visibility").css("display", "block");
}

function DWErrorMessage() {
    $(".who_is_DW_unanswered").css("display", "block");
}


// ---------------- 1. HELPER FUNCTIONS ------------------
// This .js file has al the alphanumeric functions
// necessary to generate random instances of the experiment.

// random function
// This is an inclusing uniform randomizer. random(a, a + x) gives you one integer from a to a + x, each with 1 / (x + 1) probability
function random(a,b) {
    if (typeof b == "undefined") {
	a = a || 2;
	return Math.floor(Math.random()*a);
    } else {
	return Math.floor(Math.random()*(b-a+1)) + a;
    }
}

// range function
function range(a,b) {
    var rangeArray = new Array();

    for (var i=a; i<=b; i++) {
	rangeArray.push(i);
    }
    
    return rangeArray;
}

// unique function
function unique(arrayName)
{
    var newArray=new Array();
    label:for(var i=0; i<arrayName.length;i++ )
    {  
	for(var j=0; j<newArray.length;j++ )
	{
	    if(newArray[j]==arrayName[i]) 
		continue label;
	}
	newArray[newArray.length] = arrayName[i];
    }
    return newArray;
}

// shuffle function    -- What the hell is the comna for???!!!??!?!?!?! om() * i), 
function shuffle (a) 
{ 
    var o = [];
    for (var i=0; i < a.length; i++) { o[i] = a[i]; }
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), 
	 x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// create HTML for property matrix and base image
// base = the kind of stimuli
function stimHTML(base, n, prop_mat, props, id, file_number) {
    var html = "";

    html += '<img src="images' + file_number +  '/' + base + '-base' + String(n+1) +
    '.png" width=200px height=200px alt="' + base + '" id="' + id + 'Image"/>';

    var c = 0;
    for (var p = 0; p < prop_mat.length; p++) {
	   if (prop_mat[p] == 1) {
    	    html += '<img  src="images3/' + base + '-' + props[p] + 
    		'.png" width=200px height=200px alt="' + props[p] + '" ' +
    		'id="' + id + 'Property' + String(c+1) + '"/>';
    	    c = c + 1; // keep count of how many properties we've stacked
	   }
    }

    return html;
}


// the patch of color by color? 

// Select color at first!
// Patch of cloth referent matcher. file_number = the image folder 
// disposition: where in the experiment the image will be put on
function colorPatchHTML(base, n, prop_mat, props, id, position, file_number, color_ordering) {
    var html = "";
    //html += '<img src="images3/square' + '-'  + base + '-' + stims_single_words  +'.png" width=200px height=200px id="objImage" />';
    html += '' //'<img src="images3/square-face-' + props[] +  '.png" width=200px height=200px id="objImage" />';


    html += '<img src="images3/square-' + base + '-' + props[n] +  
        '.png" width=80px height=80px id="objPatch" />';

    var c = 0;
    return html;
}



function hand_HTML(base, n, prop_mat, props, id, position) {
    var html = "";

    html += '<img  src="images3/hand.png" width=50px height=50px'  + 
     'alt="it is the hand!" id="objHandProperty"/>';
    //'alt="' + props[n] + '" ' + 'id="' + id + 'Property' + String(c+15) + '"/>';
    return html;
}



// The way to get the value of the selected radio button
// I don't use this one because it made IE not work
function getRadioVal(radioName) {
  var rads = document.getElementsByName(radioName);
  for(var rad in rads) {
    if(rads[rad].checked) {
      return rads[rad].value;
    }
  }
  return null;
}


// This was made for IE to work
function getNameRadioValue(idNameList) {
    var valueReturned = 0;
    for(var j=0; j<idNameList.length;j++ ) {
        if (document.getElementById(idNameList[j]).checked) {
            valueReturned = j + 1;
        }
    }
    return valueReturned;
}





if (!('bind' in Function.prototype)) {
    Function.prototype.bind= function(owner) {
        var that= this;
        if (arguments.length<=1) {
            return function() {
                return that.apply(owner, arguments);
            };
        } else {
            var args= Array.prototype.slice.call(arguments, 1);
            return function() {
                return that.apply(owner, arguments.length===0? args : args.concat(Array.prototype.slice.call(arguments)));
            };
        }
    };
}

// Add ECMA262-5 string trim if not supported natively
//
if (!('trim' in String.prototype)) {
    String.prototype.trim= function() {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
}

// Add ECMA262-5 Array methods if not supported natively
//
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf= function(find, i /*opt*/) {
        if (i===undefined) i= 0;
        if (i<0) i+= this.length;
        if (i<0) i= 0;
        for (var n= this.length; i<n; i++)
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('lastIndexOf' in Array.prototype)) {
    Array.prototype.lastIndexOf= function(find, i /*opt*/) {
        if (i===undefined) i= this.length-1;
        if (i<0) i+= this.length;
        if (i>this.length-1) i= this.length-1;
        for (i++; i-->0;) /* i++ because from-argument is sadly inclusive */
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}
if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach= function(action, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                action.call(that, this[i], i, this);
    };
}
if (!('map' in Array.prototype)) {
    Array.prototype.map= function(mapper, that /*opt*/) {
        var other= new Array(this.length);
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this)
                other[i]= mapper.call(that, this[i], i, this);
        return other;
    };
}
if (!('filter' in Array.prototype)) {
    Array.prototype.filter= function(filter, that /*opt*/) {
        var other= [], v;
        for (var i=0, n= this.length; i<n; i++)
            if (i in this && filter.call(that, v= this[i], i, this))
                other.push(v);
        return other;
    };
}
if (!('every' in Array.prototype)) {
    Array.prototype.every= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && !tester.call(that, this[i], i, this))
                return false;
        return true;
    };
}
if (!('some' in Array.prototype)) {
    Array.prototype.some= function(tester, that /*opt*/) {
        for (var i= 0, n= this.length; i<n; i++)
            if (i in this && tester.call(that, this[i], i, this))
                return true;
        return false;
    };
}