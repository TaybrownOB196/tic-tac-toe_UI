var players = null;
var gameResults = [];
var defaultColor = '#ffffff'
var currentScreen = 'splashScreen';
var crudUrl = 'http://localhost:5000/'
var isGameOver = false;

var startGame = function() {
	var playerName = document.getElementById('playerName').value;
	var playerPiece = document.getElementById('playerPiece').value;
	var playerColor = document.getElementById('playerColor').value;
	var player = new Player(playerName, playerPiece, playerColor);
	createPlayer(player);
}

var toggleScreen = function(screen) {
		document.getElementById('splashScreen').style.display = 'none';
		document.getElementById('gameScreen').style.display = 'none';
		document.getElementById(screen).style.display = 'block';
}

var togglePlayer = function() {
	return players.getNext();
}

var placePiece = function(element) {
	if(!isGameOver) {
		if(element.innerHTML == '')
			element.innerHTML = players.getCurrent().Piece;
		if(checkHorizontal() || checkVertical() || checkDiagonal()) {
			isGameOver = true;
			var gameResult = new GameResult(players.item1.id, players.item2.id, players.getCurrent().id);
			console.log(gameResult);
			createGameResult(gameResult);
			document.getElementById('gameState').innerHTML = 'Player ' + players.getCurrent().Piece + ' Wins';
		}

		players.getNext();
	}
}

var hoverTile = function(event) {
	if (!isGameOver) {
		event.toElement.style.backgroundColor = '#' + players.getCurrent().Color;
	}
}

var leaveTile = function(event) {
	if (!isGameOver) {
		event.target.style.backgroundColor = defaultColor;
	}
}

var getScoreBoard = function() {
	getGameResults(players.item1.id);
}

var populateScoreBoard = function() {
	var table = document.getElementById('scoreBoardTbl');
	var rows = table.getElementsByTagName("tr");
	for(var i=1; i<rows.length; i++) {
		//Remove all rows 1 by 1
		//TODO: Swap table bodies instead
		rows[i].remove();
	}
	for(var i=0;i<gameResults.length;i++) {
		var row = table.insertRow(i+1);
		row.insertCell(0).innerHTML = gameResults[i].id;
		row.insertCell(1).innerHTML = gameResults[i].playerOneId;
		row.insertCell(2).innerHTML = gameResults[i].playerTwoId === -1 ? 'PC' : gameResults[i].sessionId;
		row.insertCell(3).innerHTML = gameResults[i].winnerId === gameResults[i].playerOneId ? 'W' : 'L';
		row.insertCell(4).innerHTML = gameResults[i].sessionId === undefined ? 'N/A' : gameResults[i].sessionId;
		row.insertCell(5).innerHTML = gameResults[i].createDate;
	}
}

var clearBoard = function() {
	var elements = document.querySelectorAll('div.boardRow div');
	for(var i=0; i<elements.length; i++) {
		elements[i].innerHTML = '';
		elements[i].style.backgroundColor = ''
	}
	document.getElementById('gameState').innerHTML = '';
	isGameOver = false;
}

var setupBoard = function() {
	var elements = document.querySelectorAll('div.boardRow div');
	for(var i=0; i<elements.length; i++) {
		elements[i].addEventListener("mouseover", hoverTile);
		elements[i].addEventListener("mouseout", leaveTile);
	}
}

var checkHorizontal = function() {
	var topRow = document.querySelectorAll('div#topRow.boardRow div');
	var middleRow = document.querySelectorAll('div#middleRow.boardRow div');
	var bottomRow = document.querySelectorAll('div#bottomRow.boardRow div');

	return areSamePiece(topRow) || areSamePiece(middleRow) || areSamePiece(bottomRow);
}
var checkVertical = function() {
	var leftColumn = document.querySelectorAll('div.boardRow div:nth-child(1)');
	var middleColumn = document.querySelectorAll('div.boardRow div:nth-child(2)');
	var rightColumn = document.querySelectorAll('div.boardRow div:nth-child(3)');

	return areSamePiece(leftColumn) || areSamePiece(middleColumn) || areSamePiece(rightColumn);
}
var checkDiagonal = function() {
	var topRightToBottomLeft = [
		document.querySelector('div#topRow.boardRow div:nth-child(1)'),
		document.querySelector('div#middleRow.boardRow div:nth-child(2)'),
		document.querySelector('div#bottomRow.boardRow div:nth-child(3)')
	]
	var topLeftToBottomRight = [
		document.querySelector('div#topRow.boardRow div:nth-child(3)'),
		document.querySelector('div#middleRow.boardRow div:nth-child(2)'),
		document.querySelector('div#bottomRow.boardRow div:nth-child(1)')
	]

	return areSamePiece(topRightToBottomLeft) || areSamePiece(topLeftToBottomRight);
}

var areSamePiece = function(elements) {
	var p1WinString = players.item1.Piece + players.item1.Piece + players.item1.Piece;
	var p2WinString = players.item2.Piece + players.item2.Piece + players.item2.Piece;

	var aggregate = '';
	for(var i=0; i<elements.length; i++) {
		aggregate += elements[i].innerHTML;
	}

	if(aggregate == p1WinString) {
		for(var i=0; i<elements.length; i++)
			elements[i].style.backgroundColor = '#' + players.item1.Color
		return true;
	} else if (aggregate == p2WinString) {
		for(var i=0; i<elements.length; i++)
			elements[i].style.backgroundColor = '#' + players.item2.Color
		return true;
	} else {
		return false;
	}
}