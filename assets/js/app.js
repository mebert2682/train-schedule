var config = {
  apiKey: "AIzaSyBbTiXfiMelR7h0ZSebZ_lTyaLGHz4oM58",
  authDomain: "class-activities-e45d3.firebaseapp.com",
  databaseURL: "https://class-activities-e45d3.firebaseio.com",
  projectId: "class-activities-e45d3",
  storageBucket: "class-activities-e45d3.appspot.com",
  messagingSenderId: "691072677995"
};

firebase.initializeApp(config);

database = firebase.database();


$("#submit-button").on("click", function(event){

  event.preventDefault();

  var train = $("#train-input").val().trim();
  var dest = $("#dest-input").val().trim();
  var firstTrain = $("#time-input").val().trim();
  //var currentTime = moment();
  var tFreq = $("#freq-input").val().trim();




 var newTrain = {

  train: train,
  destination: dest,
  firstTrain: firstTrain,
  frequency: tFreq,
  //currentTime: currentTime,
}

  database.ref().push(newTrain);

  alert("Train successfully added");

// Clears all of the text-boxes
$("#train-input").val("");
$("#dest-input").val("");
$("#time-input").val("");
$("#freq-input").val("");

});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var train = childSnapshot.val().train;
  var dest = childSnapshot.val().destination;
  var firstTrain = childSnapshot.val().firstTrain;
  var freq = childSnapshot.val().frequency;
  var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

  // Next Arrival
  var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
  var tRemainder = diffTime % freq;
  var minutesAway = freq - tRemainder;
  var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  




  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(train),
    $("<td>").text(dest),
    $("<td>").text(freq),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
  
});
