// Initialize Moment js
 moment().format();

// Initialize Firebase
var config = {
	apiKey: "AIzaSyCjA8wvZaBd4agCNXql02ZqjwLM8Au11gg",
	authDomain: "train-scheduler-800c7.firebaseapp.com",
	databaseURL: "https://train-scheduler-800c7.firebaseio.com",
	projectId: "train-scheduler-800c7",
	storageBucket: "train-scheduler-800c7.appspot.com",
	messagingSenderId: "8745376630"
};

firebase.initializeApp(config);

var database = firebase.database();



var traintrainName = "";
var destination = "";
var trainStartTime = "";
var frequency = "";
var nextArrival = "";
var minutesAway = "";

database.ref("/traindata").on("child_added", function(snapshot) {

  var trainData = snapshot.val();
  console.log(JSON.stringify(trainData));

  addRow(trainData.trainName, trainData.destination, trainData.frequency, trainData.nextArrival, trainData.minutesAway);

}, function(errorObject) {
  console.log(JSON.stringify(errorObject));
});

//Set variables to input values
$("#submitbtn").on("click", function(event) {
  event.preventDefault();

  trainName = $("#train-name").val();
  destination = $("#destination").val();
  frequency = parseInt($("#frequency").val());
  trainStartTime = $("#train-start-time").val();
  // nextArrival = "; //Do math stuff here
  // minutesAway = "; //Do math stuff here too

  // Save new value to Firebase
  database.ref("/traindata").push({
    trainName: trainName,
    destination: destination,
    frequency: frequency,
    nextArrival: nextArrival,
    minutesAway: minutesAway
  });

});


function compareTimes() {
  var now = new Date().format("HH:mm");
  var calcTrainTime = trainStartTime;
  while (moment(trainStartTime).duration().asMinutes() < moment(now).duration().asMinutes()) {
    // Add 
  }
}

//Add rows to the table
function addRow(trainName, destination, frequency, nextArrival, minutesAway){
    var now = new Date();

    $scheduleRow = $("<tr>");
    $scheduleRow.append($("<td>").text(trainName));
    $scheduleRow.append($("<td>").text(destination));
    $scheduleRow.append($("<td>").text(frequency));
    //var date = moment(date, "MM/DD/YYYY");
    //var months = Math.floor(moment(new Date()).diff(moment(date), "months", true));
    //$scheduleRow.append($("<td>").text(months));

    //format trainStartTime for use with moment js

	nextArrival = moment(trainStartTime, "HH:mm").add(frequency, "minutes").format("HH:mm");
	console.log(nextArrival);
    $scheduleRow.append($("<td>").text(nextArrival));

    minutesAway = moment(now).subtract(nextArrival, "minutes");
    console.log(minutesAway);
    $scheduleRow.append($("<td>").text(minutesAway));
    $("#table > tbody").append($scheduleRow);
}