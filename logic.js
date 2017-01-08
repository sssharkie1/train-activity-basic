
  // Initialize Firebase
	  var config = {
	    apiKey: "AIzaSyB_M8d2IfXxtygCUuqjXdc9w9PCrFWO7FU",
	    authDomain: "train-activity-basic.firebaseapp.com",
	    databaseURL: "https://train-activity-basic.firebaseio.com",
	    storageBucket: "train-activity-basic.appspot.com",
	    messagingSenderId: "849326539823"
	  };

	  	firebase.initializeApp(config);

		var database = firebase.database();

			function addRow() {
			          
			    var trainName = document.getElementById("trainInput");
			    var destName = document.getElementById("destination");
			    var time = document.getElementById("arrivalTime")
			    var table = document.getElementById("myTableData");
			    var frequencyTime = document.getElementById	("frequencyInput");
			 
			    var rowCount = table.rows.length;
			    var row = table.insertRow(rowCount);
			 

			    row.insertCell(0).innerHTML= trainName.value;
			    row.insertCell(1).innerHTML= destName.value;
			    row.insertCell(2).innerHTML = arrivalTime.value;
			    row.insertCell(3).innerHTML = frequencyTime.value;

			    $(function(){
			      $("#trainInput").val("");
			      $("#destination").val("");
			      $('#arrivalTime').val("");
			      $('#frequencyInput').val("");
				})
			}
 
			function load() {
			}


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

 