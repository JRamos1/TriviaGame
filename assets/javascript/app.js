$(document).ready(function () {
var options = [
	{
		question: "What animal is Dee compared to?", 
		choice: ["Bird", "Dog", "Rat", "Giraffe"],
		answer: 0,
		photo: "assets/images/bird.gif"
	 },
	 {
	 	question: "What type of law is Charlie an expert in?", 
		choice: ["Bird law", "Environmental law", "Dog law", "Immigration law"],
		answer: 0,
		photo: "assets/images/bird.gif"
	 }, 
	 {
	 	question: "What kind of eggs are used to make Mac and Charlie's Fight Milk?", 
		choice: ["Raven eggs", "Ostritch eggs", "Crow eggs", "Chicken eggs" ],
		answer: 2,
		photo: "assets/images/crow.jpg"
	}, 
	{
		question: "What is Mac's full name?", 
		choice: ["Macklemore", "John Smith", "Ronald McDonald", "Mason Mac" ],
		answer: 2,
		photo: "assets/images/mac.jpg"
	}, 
	{
		question: "How Many steps are in the 'Dennis' System?", 
		choice: ["12", "7", "3", "6" ],
		answer: 3,
		photo: "assets/images/dennis.jpg"
	}, 
	{
		question: "Who fights the NightMan?", 
		choice: ["Charlie", "DayMan", "Dennis", "Dee" ],
		answer: 1,
		photo: "assets/images/dayman.jpg"
	}, 
	{
		question: "What do Charlie and Frank eat to go to sleep?", 
		choice: ["Banana", "Cat Food", "Dog Food", "Pudding" ],
		answer: 1,
		photo: "assets/images/catfood.jpg"
	}, 
	{
		question: "What does Frank use to clean his toes?", 
		choice: ["Knife", "Water", "Butcher Knife", "Soap" ],
		answer: 0,
		photo: "assets/images/toeknife.gif"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})