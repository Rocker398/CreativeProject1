var rand = Math.floor(Math.random() * 10) + 5;
var timesSnitchMoved = 0;
var chosenTeam = 0;
var opposingTeam = 0;
var intervalID = 0;
var isFirstInterval = true;

var teams = ['Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];

function moveSnitch() {
	if (timesSnitchMoved < rand) {
		var snitch = document.getElementById('goldenSnitch');
		var newPosition = getRandomPosition();
		
		snitch.style.top = newPosition.y + "px";
		snitch.style.left = newPosition.x + "px";
	}
	
	timesSnitchMoved++;
}

function catchSnitch() {
	addPoints(chosenTeam, 150);
	finishGame();
}

function getRandomPosition() {
	var windowHeight = parent.document.body.clientHeight;
	var windowWidth = parent.document.body.clientWidth;
	var snitch = document.getElementById('goldenSnitch');
	
	var maxWidth = Math.floor(windowWidth - snitch.offsetWidth);
	var maxHeight = Math.floor(windowHeight - snitch.offsetHeight);
	return {
		"x": Math.floor(Math.random() * maxWidth),
		"y": Math.floor(Math.random() * maxHeight)
	}
}

function chooseTeam(elem, team) {
	var x, text;
	
	if (chosenTeam == "") {
		text = "Choose opponent:";
		document.getElementById("toDo").innerHTML = text;
		chosenTeam = team;
		
		document.getElementById('HomeTeamName').innerHTML = elem.innerHTML;
		var homeTeam = document.getElementById('HomeTeam');
		homeTeam.style.color = elem.dataset.color;
		homeTeam.style.display = "block";
		
		elem.disabled = true; 
	}
	else {
		chooseOpponent(elem, team);
	}
}

function chooseOpponent(elem, opponent) {
	opposingTeam = opponent;
		
	document.getElementById('AwayTeamName').innerHTML = elem.innerHTML;
	var awayTeam = document.getElementById('AwayTeam');
	awayTeam.style.color = elem.dataset.color;
	awayTeam.style.display = "block";
	
	var overlay = document.getElementById('overlay');
	overlay.style.display = "none";
	var snitch = document.getElementById('goldenSnitch');
	snitch.style.display = "block";
	
	intervalID = setInterval(function () {
		addPoints(0, 0)
	}, 1200);
}

function addPoints(team, points) {
	if (!isFirstInterval && points <= 0) {
		points = 10;
	}
	
	if (team <= 0) {
		var randTeam = Math.floor(Math.random() * 2) + 1;
		if (randTeam == 1) {
			team = chosenTeam;
		}
		else {
			team = opposingTeam;
		}
	}
	
	if (team == chosenTeam) {
		var curPoints = document.querySelector('#HomeTeamPoints span');
		curPoints.innerHTML = parseInt(curPoints.innerHTML) + points;
	}
	else if(team == opposingTeam) {
		var curPoints = document.querySelector('#AwayTeamPoints span');
		curPoints.innerHTML = parseInt(curPoints.innerHTML) + points;
	}
	
	isFirstInterval = false;
}


function finishGame() {
	clearInterval(intervalID); // stop the timer
	
	var homePoints = parseInt(document.querySelector('#HomeTeamPoints span').innerHTML);
	var awayPoints = parseInt(document.querySelector('#AwayTeamPoints span').innerHTML);
	var winningTeam = document.getElementById('WinningTeam');
	var winningPoints = document.querySelector('#WinningPoints span');
	
	if (homePoints > awayPoints) {
		winningTeam.innerHTML = teams[chosenTeam - 1] + " Wins!";
		winningPoints.innerHTML = homePoints;
	}
	else if (homePoints == awayPoints) {
		winningTeam.innerHTML = "It's a Tie!";
		winningPoints.innerHTML = homePoints;
	}
	else {
		winningTeam.innerHTML = teams[opposingTeam - 1] + " Wins!";
		winningPoints.innerHTML = awayPoints;
	}
	
	document.getElementById('GameOver').style.display = "block";
}

function resetGame() {
	window.location.reload(false);
}