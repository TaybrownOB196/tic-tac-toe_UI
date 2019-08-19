var players = null;
var defaultColor = '#ffffff'
var currentScreen = 'splashScreen';
var crudUrl = 'http://localhost:5000/'
var isGameOver = false;

var startGame = function() {
	var playerName = document.getElementById('playerName').value;
	var playerPiece = document.getElementById('playerPiece').value;
	var playerColor = document.getElementById('playerColor').value;
	createPlayer(playerName, playerPiece, playerColor);
}

var toggleGameScreen = function() {
	if (currentScreen === 'splashScreen') {
		document.getElementById('splashScreen').style.display = 'none';
		document.getElementById('gameScreen').style.display = 'block';
		currentScreen = 'gameScreen';
	} else {
		document.getElementById('splashScreen').style.display = 'block';
		document.getElementById('gameScreen').style.display = 'none';
		currentScreen = 'splashScreen';
	}
}

var togglePlayer = function() {
	return players.getNext();
}

var placePiece = function(element) {
	if(!isGameOver) {
		if(element.innerHTML == '')
			element.innerHTML = togglePlayer().Piece;
		if(checkHorizontal() || checkVertical() || checkDiagonal()) {
			isGameOver = true;
			//currentPlayer.Wins++;
			//otherPlayer.Loses++;
			document.getElementById('xWins').innerHTML = players.item1.Wins
			document.getElementById('xLoses').innerHTML = players.item1.Loses

			document.getElementById('oWins').innerHTML = players.item2.Wins
			document.getElementById('oLoses').innerHTML = players.item2.Loses

			document.getElementById('gameState').innerHTML = 'Player ' + players.getCurrent().Piece + ' Wins';
		}
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