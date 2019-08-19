var createPlayer = function(name, piece, color) {
	var playerObj = {
		playerName: name,
		playerPiece: piece,
		playerColor: color
	};
	//console.log(JSON.stringify(playerObj));
	var requestObj = {
		method: 'POST',
		//mode: 'no-cors',
		headers: {
            'Content-Type': 'application/json',
		},
		body: JSON.stringify(playerObj)		
	};
	fetch(crudUrl + 'api/players', requestObj)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((json) => {
			console.log(json);
			var playerOne = new Player(json['playerName'], json['playerPiece'], json['playerColor']);
			console.log(playerOne);
			players = new Pair(playerOne, new Player('PC', 'M', 'ff69b4'))
			toggleGameScreen();
			setupBoard();
		})
		.catch((res) => {
			console.log('request failed');
			console.log(res);
		});
}