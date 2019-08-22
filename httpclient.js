var createPlayer = function(player) {
	var requestObj = {
		method: 'POST',
		//mode: 'no-cors',
		headers: {
            'Content-Type': 'application/json',
		},
		body: JSON.stringify(player)		
	};
	fetch(crudUrl + 'api/players', requestObj)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
		})
		.then((json) => {
			var playerOne = new Player().fromJson(json);
			var comp = new Player('PC', 'M', 'ff69b4');
			comp.id = -1;

			players = new Pair(playerOne, comp)
			toggleScreen('gameScreen');
			setupBoard();
		})
		.catch((res) => {
			console.log('request failed');
			console.log(res);
		});
}

var createGameResult = function(gameResult) {
	var requestObj = {
		method: 'POST',
		//mode: 'no-cors',
		headers: {
            'Content-Type': 'application/json',
		},
		body: JSON.stringify(gameResult)	
	};
	fetch(crudUrl + 'api/gameresults', requestObj)
		.then((res) => {
			if (res.ok) {
				console.log(res.json());
			}
		})
		.catch((res) => {
			console.log('request failed');
			console.log(res);
		});
}

var getGameResults = function(playerId) {
	var requestObj = {
		method: 'GET',
		//mode: 'no-cors',	
	};
	fetch(crudUrl + 'api/gameresults?playerId=' + playerId, requestObj)
		.then((res) => {
			if (res.ok) {
				var json = res.json();
				console.log(json);
				return json;
			}
		})
		.then((res) => {
			var results = [];
			for(var i=0;i<res.length;i++) {
				var gameResult = new GameResult().fromJson(res[i]);
				console.log(gameResult);
				results.push(gameResult);
			}
			gameResults = results;
			populateScoreBoard();
		})
		.catch((res) => {
			console.log('request failed');
			console.log(res);
		});
}