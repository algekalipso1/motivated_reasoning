var slider1, slider2, slider3, slider4, slider5, slider6;
var DW_strength_raw, average_strength_raw, luck_raw,  optimism_raw, motivation_raw, expectation_raw;

function hide_and_seek(hide, show) {
    $("."+hide).css("display", "none");
    $("."+show).css("display", "block");
}


function initialsClick() {
    hide_and_seek("initials_slide", "loading_slide");
	setTimeout(connectionLoad, 3000);

}

function connectionLoad() {
    hide_and_seek("loading_slide", "loading_slide2");
	setTimeout(conditionLoad, 3000);
}

function conditionLoad() {
    hide_and_seek("loading_slide2", "condition_slide");
}

function evClick(condition) {
    if (condition == 2) {
        if ($("#short_row1").css("display") == "none") {
            $("#short_row1").css("display", "inherit");
        } else if ($("#short_row2").css("display") == "none") {
            $("#short_row2").css("display", "inherit");
        } else {
            hide_and_seek("evidence_slide", "eval_slide");
            DW_strength_raw = new Dragdealer('simple-slider1', {'x': 0.5});
        }
    };
    if (condition == 8) {
        if ($("#long_row1").css("display") == "none") {
            $("#long_row1").css("display", "inherit");
        } else if ($("#long_row2").css("display") == "none") {
            $("#long_row2").css("display", "inherit");
        } else if ($("#long_row3").css("display") == "none") {
            $("#long_row3").css("display", "inherit");
        } else if ($("#long_row4").css("display") == "none") {
            $("#long_row4").css("display", "inherit");
        } else if ($("#long_row5").css("display") == "none") {
            $("#long_row5").css("display", "inherit");
        } else if ($("#long_row6").css("display") == "none") {
            $("#long_row6").css("display", "inherit");
        } else if ($("#long_row7").css("display") == "none") {
            $("#long_row7").css("display", "inherit");
        } else if ($("#long_row8").css("display") == "none") {
            $("#long_row8").css("display", "inherit");
        } else {
            hide_and_seek("evidence_slide", "eval_slide");
            DW_strength_raw = new Dragdealer('simple-slider1', {'x': 0.5});
        }
    };

}

function evalClick() {
    if ($("#question2").css("display") == "none") {
        DW_strength_raw.disable();
        $("#question2").css("display", "block");
        luck_raw = new Dragdealer('simple-slider2', {'x': 0.5});
    } else if ($("#question3").css("display") == "none") {
        luck_raw.disable();
        $("#question3").css("display", "block");
        average_strength_raw = new Dragdealer('simple-slider3', {'x': 0.5});
    } else if ($("#question4").css("display") == "none") {
        average_strength_raw.disable();
        $("#question4").css("display", "block");
        optimism_raw = new Dragdealer('simple-slider4', {'x': 0.5});
    } else {
        optimism_raw.disable();
        hide_and_seek("eval_slide", "manip_slide");
    }
    //	
	//manip_slider1 = new Dragdealer('simple-slider5', {'x': 0.5});		
	//manip_slider2 = new Dragdealer('simple-slider6', {'x': 0.5});			

}

function manipClick() {
    hide_and_seek("manip_slide", "debrief_slide");				
}

function endSlideClick(){
	$(".debrief_slide").css("display", "none");
	$(".end_slide").css("display", "block");
}

// show slide function
function showSlide(id) {
    $(".slide").hide(); //jquery - all elements with class of slide - hide
    $("#"+id).show(); //jquery - element with given id - show
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
    //'alt="' + props[n] + '" ' + 'id="' + id + 'Property' + String(c+10) + '"/>';
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