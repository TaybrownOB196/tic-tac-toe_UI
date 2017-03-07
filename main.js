var players = [
	{
		Piece: 'X',
		Wins: 0,
		Loses: 0,
	},
	{
		Piece: 'O',
		Wins: 0,
		Loses: 0,
	}
];

var isGameOver = false;
var currentPlayer = players[0];
var otherPlayer = players[1];

var togglePlayer = function() {
	if(currentPlayer.Piece == 'X') {
		currentPlayer = players[1];
		otherPlayer = players[0];
	}
	else {
		currentPlayer = players[0];
		otherPlayer = players[1];
	}

	return currentPlayer;
}

var placePiece = function(element) {
	if(!isGameOver) {
		if(element.innerHTML == '')
			element.innerHTML = togglePlayer().Piece;
		if(checkHorizontal() || checkVertical() || checkDiagonal()) {
			isGameOver = true;
			currentPlayer.Wins++;
			otherPlayer.Loses++;
			document.getElementById('xWins').innerHTML = players[0].Wins
			document.getElementById('xLoses').innerHTML = players[0].Loses

			document.getElementById('oWins').innerHTML = players[1].Wins
			document.getElementById('oLoses').innerHTML = players[1].Loses

			document.getElementById('gameState').innerHTML = 'Player ' + currentPlayer.Piece + ' Wins';
		}
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
	var aggregate = '';
	for(var i=0; i<elements.length; i++) {
		aggregate += elements[i].innerHTML;
	}

	if(aggregate == 'OOO' || aggregate == 'XXX') {
		for(var i=0; i<elements.length; i++)
			elements[i].style.backgroundColor = 'red'
		return true;
	}
	else
	{
		return false;
	}
}