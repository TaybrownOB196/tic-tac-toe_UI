class Player {
    constructor(name, piece, color) {
        this.playerName = name;
        this.playerPiece = piece;
        this.playerColor = color;
        this.createDate = new Date();
        this.isActive = true;
    }

    fromJson(json) {
        this.id = json['id'];
        this.playerName = json['playerName'];
        this.playerPiece = json['playerPiece'];
        this.playerColor = json['playerColor'];
        this.createDate = json['createDate'];
        this.isActive = json['isActive'];
        return this;
    }
}

class GameResult {
    constructor(p1Id, p2Id, winnerId) {
        this.playerOneId = p1Id;
        this.playerTwoId = p2Id;
        this.winnerId = winnerId;
        this.createDate = new Date();
        this.isActive = true;
    }

    fromJson(json) {
        this.id = json['id'];
        this.playerOneId = json['playerOneId'];
        this.playerTwoId = json['playerTwoId'];
        this.winnerId = json['winnerId'];
        this.createDate = json['createDate'];
        this.isActive = json['isActive'];
        return this;
    }
}

class Pair {
    constructor(object1, object2) {
        this.item1 = object1;
        this.item2 = object2;
        this._indexAtStart = true;
    }

    getNext() {
        if (this._indexAtStart) {
            this._indexAtStart = false;
            return this.item1;
        } else {
            this._indexAtStart = true;
            return this.item2;
        }
    }

    getCurrent() {
        if(!this._indexAtStart) {
            return this.item1;
        } else {
            return this.item2;
        }
    }
}