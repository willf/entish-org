<!-- 

// Welcome Visitors: I have tried to make the JavaScript here inviting
// so that you can read it and point out any mistakes I may have made
// in the calculation.  Feel free to e-mail me at niko@alum.mit.edu 
// if something is confusing or you think you have found a mistake.

// Set up some global variables:
var curamount=0;  	   // total amount spent on war in dollars
var curscale=0;   	   // number of dollars per alternate scale
var curunit="";   	   // name of the alternate scale
var geographicscale=1; // scale the final number by this amount
var popnow=0;              // est. population now
var youramount=1;          // your amount ...

// ===========================================================================
// Custom Units (like "public housing")

// This function is called from the links below that change the unit.
// It updates the global variables above, which are in turn read by
// the function inc_totals() below which actually modifies the content
// of the web page that you see.
function set_unit (altscale, altunit) {
  curscale = altscale;
  curunit = altunit;
}

// ===========================================================================
// Number Display and Updater

// This function modifies the global variables 'curamount' and 'compareamount'
// to contain the total number of dollars spent on the war so far given the 
// estimates described in numbers.html.  The variable 'curamount' includes the
// interest, and the 'compareamount' is pre-interest.

function calc_amount () {
  startofwar = new Date ("Apr 17, 2003"); // see numbers.html for explanation
  startofpop = new Date ("Jul 1, 1999");  // last estimate of US population
  curdate = new Date ();
  diff = curdate - startofwar;
  popdiff = curdate - startofpop;

  if (diff < 0) {
    alert ("costofwar.com uses your computers date to calculate the cost. "+
           "Yours must be wrong because according to your computer the war "+
	   "hasn't even started yet!");
  }
  
  // Define some constants:
  var millispermonth = 2678400000;                // 31*24*60*60*1000
  var initialamount = 34000000000;                // 34 billion spent by Apr 17
  var sincethen = 3900000000 / millispermonth;    // 3.9 bil / month
  var interest = 1.4;                             // 40% more due to interest

  var msecpp = 9000;                           // person every 9 sec; 
  var popstart = 272690813;                    // US Census Jul 1 1999 estimate
  
  popnow   = popstart + (popdiff/ msecpp);     // est. population now

  // Do the actual calculations and get the amount before and after interest.
  // Note that we include the geographicscale as well.
  compareamount = (initialamount + diff * sincethen) * geographicscale;
  curamount = compareamount * interest;
  youramount = curamount  / popnow; 
}

// Converts a number 'n' to a string with commas every three characters.
function number_str (n) {
  //var x = n.toFixed (0);  this doesn't seem to work on some browsers
  var x = n.toString ();
  var dot = x.lastIndexOf ('.');
  x = x.substr (0, dot);
  var l = x.length;
  var res = "";
  for (l -= 3; l > 0; l -= 3) {
    res = "," + x.substr (l, 3) + res;
  }
  res = x.substr (0, l+3) + res;
  return res;
}

// This function actually modifies the web page --- first it determines
// the total dollars spent on the war via calc_amount(), then it modifies
// the two items in the web page, which are identified by their id ('raw'
// and 'alt').  It then sets itself up to be called again in 200 milliseconds
// so as to continuously update the page.
function inc_totals_at_rate(rate) {

  // first calculate total dollars spent.
  calc_amount ();

  // redisplay the raw total 
  document.getElementById ("raw").firstChild.nodeValue = 
  "$" + number_str(youramount);

  // convert units to the scale selected by the user, if any, and display.
  try {
    if (curscale != 0) {
  	    var altamount = (compareamount / curscale) / popnow;
  	    document.getElementById ("alt").firstChild.nodeValue =
  	    number_str(altamount) + curunit;
    }
    else {
  	    document.getElementById ("alt").firstChild.nodeValue = "";
    }
  } catch (e)
  {
     // ignore if there is no 'alt' element
  }

  // run this function again in 100 milliseconds 
  setTimeout('inc_totals_at_rate('+rate+');', rate);

}

// For backwards compatibility, this function will cause the totals to
// increment at a rate of 100ms.
function inc_totals ()
{
  inc_totals_at_rate (100);
}

// ===========================================================================
// Geographic Scaling

var geodata = new Array("Tempe, Arizona", 0.000438,
"Hayward, California", 0.000433,
"Long Beach, California", 0.001044,
"Los Angeles, California", 0.008348,
"Mendocino County, California", 0.000206,
"Nevada County, California", 0.000274,
"Ojai, California", 0.000474,
"Palo Alto, California", 0.00039,
"Pasadena, California", 0.000406,
"San Francisco, California", 0.002792,
"San Jose, California", 0.003787,
"Santa Cruz, California", 0.000192,
"Santa Monica, California", 0.000361,
"Thousand Oaks, California", 0.000569,
"Ventura County, California", 0.002781,
"Boulder, Colorado", 0.000378,
"Colorado Springs, Colorado", 0.001098,
"Denver, Colorado", 0.00152,
"Bridgeport, Connecticut", 0.000456,
"Danbury, Connecticut", 0.000383,
"Enfield, Connecticut", 0.000226,
"Glastonbury, Connecticut", 0.00025,
"Greenwich, Connecticut", 0.000619,
"Hartford, Connecticut", 0.000272,
"Manchester, Connecticut", 0.000266,
"Middletown, Connecticut", 0.000217,
"New Britain, Connecticut", 0.000243,
"New Haven, Connecticut", 0.000367,
"New London County, Connecticut", 0.001281,
"Norwalk, Connecticut", 0.000467,
"Stamford, Connecticut", 0.000671,
"West Hartford, Connecticut", 0.000409,
"Westport, Connecticut", 0.000325,
"Citrus County, Florida", 0.000286,
"Hernando County, Florida", 0.000323,
"Lake County, Florida", 0.000591,
"Leon County, Florida", 0.000836,
"Pasco, Florida", 0.000899,
"Tallahassee, Florida", 0.00049,
"Atlanta, Georgia", 0.000805,
"Chicago, Illinois", 0.007752,
"Elgin, Illinois", 0.000346,
"Oak Park, Illinois", 0.000269,
"Gary, Indiana", 0.000167,
"South Bend, Indiana", 0.000212,
"Des Moines, Iowa", 0.00042,
"Overland Park, Kansas", 0.000578,
"Portland, Maine", 0.000145,
"Baltimore, Maryland", 0.001225,
"Howard County, Maryland", 0.001124,
"Montgomery County, Maryland", 0.003897,
"Arlington, Massachusetts", 0.00022,
"Berkshire County, Massachusetts", 0.000446,
"Boston, Massachusetts", 0.001714,
"Brookline, Massachusetts", 0.00035,
"Cambridge, Massachusetts", 0.000397,
"Framingham, Massachusetts", 0.000297,
"Lexington, Massachusetts", 0.000224,
"Lowell, Massachusetts", 0.000318,
"Medford, Massachusetts", 0.000229,
"Middlesex County, Massachusetts", 0.007165,
"Newton, Massachusetts", 0.000582,
"Pittsfield, Massachusetts", 0.00014,
"Somerville, Massachusetts", 0.000262,
"Worcester, Massachusetts", 0.000489,
"Springfield, Massachusetts", 0.0003563,
"Amherst, Massachusetts", 0.0001379,
"Northampton, Massachusetts", 0.0001063,
"Ann Arbor, Michigan", 0.000451,
"Bloomfield Township, Michigan", 0.000295,
"Detroit, Michigan", 0.001788,
"Kalamazoo, Michigan", 0.000182,
"Lansing, Michigan", 0.000273,
"Livonia, Michigan", 0.000406,
"Pontiac, Michigan", 0.000134,
"Rochester Hills, Michigan", 0.000343,
"Southfield, Michigan", 0.000281,
"Troy, Michigan", 0.000414,
"Waterford, Michigan", 0.000262,
"St. Cloud, Minnesota", 0.000159,
"St. Paul, Minnesota", 0.00075,
"Columbia, Missouri", 0.000231,
"St. Louis, Missouri", 0.000594,
"Lincoln, Nebraska", 0.000594,
"Las Vegas, Nevada", 0.00154,
"Jersey City, New Jersey", 0.000656,
"Albuquerque, New Mexico", 0.000925,
"Santa Fe, New Mexico", 0.000136,
"Buffalo, New York", 0.000619,
"Nassau County, New York", 0.007494,
"New York City, New York", 0.023793,
"Rockland County, New York", 0.001562,
"Suffolk County, New York", 0.007075,
"Tompkins County, New York", 0.000354,
"Westchester County, New York", 0.005099,
"Akron, Ohio", 0.000443,
"Cleveland, Ohio", 0.000751,
"Dayton, Ohio", 0.000301,
"Oklahoma City, Oklahoma", 0.000971,
"Tulsa, Oklahoma", 0.000786,
"Multnomah County, Oregon", 0.001642,
"Portland, Oregon", 0.001294,
"Salem, Oregon", 0.000309,
"Bucks County, Pennsylvania", 0.002356,
"Chester County, Pennsylvania", 0.001913,
"Erie, Pennsylvania", 0.000217,
"Philadelphia, Pennsylvania", 0.003224,
"Pittsburgh, Pennsylvania", 0.000745,
"Bristol County, Rhode Island", 0.000159,
"Providence, Rhode Island", 0.000278,
"Sioux Falls, South Dakota", 0.000309,
"Knoxville, Tennessee", 0.000375,
"Memphis, Tennessee", 0.001336,
"Austin, Texas", 0.002098,
"Dallas, Texas", 0.002873,
"Houston, Texas", 0.004467,
"Richmond, Virginia", 0.000429,
"Burien, Washington", 0.000112,
"Des Moines, Washington", 0.000109,
"Federal Way, Washington", 0.000303,
"Seattle, Washington", 0.002283,
"Tacoma, Washington", 0.000575,
"Vancouver, Washington", 0.000446,
"Madison, Wisconsin", 0.000628,
"Milwaukee, Wisconsin", 0.001141
);

// There are subpages of costofwar.com that display the cost of war just
// for individual parts of the country.  For example, Montgomery County, MD
// plays .0039 of the total taxes for the war.  Setting this value allows
// us to scale the numbers to account for that.
function set_custom_geographic (geoscale) {
  geographicscale = geoscale;
}

// Called on the change of a pulldown which selects a locale.  Just calls
// set_custom_geographic with the right scaling value.  The pulldown
// should have had its values created by fill_pulldown() below.
function choose_locale (pulldown) {
  set_custom_geographic (pulldown.options[pulldown.selectedIndex].value);
}

// This function sets the options for the pulldown menu: the names are the
// names from the list above, and the value is the geographic scale.
function fill_pulldown (slider) {
  var opts = slider.options;
  opts.length =  0; // remove all existing options
  opts[0] = new Option ("Entire US", 1, true, true);
  for (var i = 0; i < geodata.length; i += 2) {
    opts[opts.length] = new Option (geodata[i],
					  			    geodata[i+1],
									false,
									false);
  }
}


// -->
