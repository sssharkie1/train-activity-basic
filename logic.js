var config = {
	    apiKey: "AIzaSyB_M8d2IfXxtygCUuqjXdc9w9PCrFWO7FU",
	    authDomain: "train-activity-basic.firebaseapp.com",
	    databaseURL: "https://train-activity-basic.firebaseio.com",
	    storageBucket: "train-activity-basic.appspot.com",
	    messagingSenderId: "849326539823"
  };
  firebase.initializeApp(config);

var database = firebase.database();

$("#submit").on("click", function() {
	var Name = $('#name').val().trim();
	var Destination = $('#destination').val().trim();
	var First = moment($('#first').val().trim(), "HH:mm").format("X");
	var Frequency = $('#frequency').val().trim();
	if (Name != "" && Destination != "" && First != "" && Frequency != ""){
		database.ref().push({
			name: Name,
			dest: Destination,
			first: First,
			freq: Frequency,
		});
		alert("Train successfully added!");
	} else { 
		alert("Please complete each missing field.");
	};
	$('#name').val("");
	$('#destination').val("");
	$('#first').val("");
	$('#frequency').val("");

	return false;
});

database.ref().on("child_added", function(snapshot) {

	var name = snapshot.val().name;
	var destination = snapshot.val().dest;
	var trainFirst = snapshot.val().first;
	var trainFrequency = snapshot.val().freq;
	var currentTime = moment();
	var timeConverted = moment(currentTime).format("X");	
	var firstTimeResult = moment(trainFirst,"X").subtract(1, "days");	
	var diffTime = moment(timeConverted, "X").diff(moment(firstTimeResult, "X"), "minutes");	
	var trainMath = diffTime % trainFrequency;	
	var trainMin = trainFrequency - trainMath;
		
	var nextTrain = moment().add(trainMin, "minutes");	
	if (timeConverted > trainFirst) {
		$("#table > tbody").append("<tr><td>" + name + "</td><td>" 
			+ destination + "</td><td>" 
			+ trainFrequency + "</td><td>"
			+ moment(nextTrain).format("hh:mm A") + "</td><td>"
			+ trainMin + "</td></tr>");
	} else {

		$("#table > tbody").append("<tr><td>" + name + "</td><td>" 
			+ destination + "</td><td>" 
			+ trainFrequency + "</td><td>"
			+ moment(trainFirst, "X").format("hh:mm A") + "</td><td>"
			+ trainMin + "</td></tr>");
	}
}, function(errorObject){

	console.log("Errors handled: " + errorObject.code)
})




//add snazzy current time
function getClockTime() {
   var now    = new Date();
   var hour   = now.getHours();
   var minute = now.getMinutes();
   //var second = now.getSeconds();
   var ap = "AM";
   if (hour   > 11) { ap = "PM";             }
   if (hour   > 12) { hour = hour - 12;      }
   if (hour   == 0) { hour = 12;             }
   if (hour   < 10) { hour   = "0" + hour;   }
   if (minute < 10) { minute = "0" + minute; }
   //if (second < 10) { second = "0" + second; }
   var timeString = hour +
                    ':' +
                    minute +
//                   ':' +
//                    second +
                    " " +
                    ap;
   return timeString;
} // function getClockTime()

//var calendarDate = getCalendarDate();
var clockTime = getClockTime();
//document.write('Date is ' + calendarDate);

$('#timeNow').html('Current Time is ' + clockTime);