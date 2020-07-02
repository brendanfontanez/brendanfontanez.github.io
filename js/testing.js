// Brendan Fontanez
// Summer 2020

const STATES = [ 'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', ];

const JSON_FIELDS = 56;
const THRESHOLD = 5;
const COLOR_UNDEFINED = 'purple';
const COLOR_ONE = '#dfeae2';
const COLOR_TWO = '#b4d6c1';
const COLOR_THREE = '#8dc3a7';
const COLOR_FOUR = '#6baf92';
const COLOR_FIVE = '#358873';

var settings = {
  "url": "https://covidtracking.com/api/states",
  "method": "GET",
  "timeout": 0,
};

$.ajax(settings).done(function (states_current) {
    
    var highest = 0;
    let color_assignments = new Map();
    
    for (i = 0; i < JSON_FIELDS; i++) {
        var state = states_current[i.toString()];
        if (STATES.includes(state['state'])) {
            var new_tests = state['totalTestResultsIncrease'];
            
            if (new_tests > highest) {
                highest = new_tests;
            }
        }
    }
    
    console.log(highest);
    
    var threshold = highest / THRESHOLD;
    
    for (i = 0; i < JSON_FIELDS; i++) {
        var state = states_current[i.toString()];
        if (STATES.includes(state['state'])) {
            var new_tests = state['totalTestResultsIncrease'];
            
            switch(true) {
                case (new_tests <= threshold):
                    color_assignments[state['state']] = COLOR_ONE;
                    break;
                case (new_tests <= threshold * 2):
                    color_assignments[state['state']] = COLOR_TWO;
                    break;
                case (new_tests <= threshold * 3):
                    color_assignments[state['state']] = COLOR_THREE;
                    break;
                case (new_tests <= threshold * 4):
                    color_assignments[state['state']] = COLOR_FOUR;
                    break;
                case (new_tests <= threshold * 5):
                    color_assignments[state['state']] = COLOR_FIVE;
                    break;
                default:
                    color_assignments[state['state']] = COLOR_UNDEFINED;     
            }
            
        }
    }
    
    $(document).ready(function() {
        $('#map').usmap({
            stateSpecificStyles: {
                'AL': {fill: color_assignments['AL']},
                'AK': {fill: color_assignments['AK']},
                'AZ': {fill: color_assignments['AZ']},
                'AR': {fill: color_assignments['AR']},
                'CA': {fill: color_assignments['CA']},
                'CO': {fill: color_assignments['CO']},
                'CT': {fill: color_assignments['CT']},
                'DE': {fill: color_assignments['DE']},
                'DC': {fill: color_assignments['DC']},
                'FL': {fill: color_assignments['FL']},
                'GA': {fill: color_assignments['GA']},
                'HI': {fill: color_assignments['HI']},
                'ID': {fill: color_assignments['ID']},
                'IL': {fill: color_assignments['IL']},
                'IN': {fill: color_assignments['IN']},
                'IA': {fill: color_assignments['IA']},
                'KS': {fill: color_assignments['KS']},
                'KY': {fill: color_assignments['KY']},
                'LA': {fill: color_assignments['LA']},
                'ME': {fill: color_assignments['ME']},
                'MD': {fill: color_assignments['MD']},
                'MA': {fill: color_assignments['MA']},
                'MI': {fill: color_assignments['MI']},
                'MN': {fill: color_assignments['MN']},
                'MS': {fill: color_assignments['MS']},
                'MO': {fill: color_assignments['MO']},
                'MT': {fill: color_assignments['MT']},
                'NE': {fill: color_assignments['NE']},
                'NV': {fill: color_assignments['NV']},
                'NH': {fill: color_assignments['NH']},
                'NJ': {fill: color_assignments['NJ']},
                'NM': {fill: color_assignments['NM']},
                'NY': {fill: color_assignments['NY']},
                'NC': {fill: color_assignments['NC']},
                'ND': {fill: color_assignments['ND']},
                'OH': {fill: color_assignments['OH']},
                'OK': {fill: color_assignments['OK']},
                'OR': {fill: color_assignments['OR']},
                'PA': {fill: color_assignments['PA']},
                'RI': {fill: color_assignments['RI']},
                'SC': {fill: color_assignments['SC']},
                'SD': {fill: color_assignments['SD']},
                'TN': {fill: color_assignments['TN']},
                'TX': {fill: color_assignments['TX']},
                'UT': {fill: color_assignments['UT']},
                'VT': {fill: color_assignments['VT']},
                'VA': {fill: color_assignments['VA']},
                'WA': {fill: color_assignments['WA']},
                'WV': {fill: color_assignments['WV']},
                'WI': {fill: color_assignments['WI']},
                'WY': {fill: color_assignments['WY']}
            } 
        });
    });
    
    document.getElementById("color1").style.backgroundColor = COLOR_ONE;
    document.getElementById("color2").style.backgroundColor = COLOR_TWO;
    document.getElementById("color3").style.backgroundColor = COLOR_THREE;
    document.getElementById("color4").style.backgroundColor = COLOR_FOUR;
    document.getElementById("color5").style.backgroundColor = COLOR_FIVE;
    
    document.getElementById("item1").innerHTML = "0 to " + Math.trunc(threshold).toString();
    
    document.getElementById("item2").innerHTML = Math.trunc(threshold).toString() + " to " + Math.trunc(threshold*2).toString();
    
    document.getElementById("item3").innerHTML = Math.trunc(threshold*2).toString() + " to " + Math.trunc(threshold*3).toString();
    
    document.getElementById("item4").innerHTML = Math.trunc(threshold*3).toString() + " to " + Math.trunc(threshold*4).toString();
    
    document.getElementById("item5").innerHTML = Math.trunc(threshold*4).toString() + " to " + Math.trunc(threshold*5).toString();
});
