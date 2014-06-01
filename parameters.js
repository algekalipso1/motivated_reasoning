
// ---------------- 2. Set the Paramters ------------------
// This .js file has al the alphanumeric functions
// necessary to generate random instances of the experiment.


var drag1;
var drag2;
var drag1_check = false;
var drag2_check = false;


// Disposition = partner or oponent or control
//	0 -> Control
//	1 -> Partner ~ Cooperation
//	2 -> Opponent 
 var disposition = random(0, 2);
// var disposition = 2
// Evidence level ~ amount of evidence: high or low, (2 or 8)
// 1 -> low evidence
// 0 -> high evidence 
//var evidence_level = random(0, 1);
var evidence_level = 1;