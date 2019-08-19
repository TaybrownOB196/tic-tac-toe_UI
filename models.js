class Player {
    constructor(name, piece, color) {
        this.playerId = null;
        this.Name = name;
        this.Piece = piece;
        this.Color = color;
    }
}

class GameResult {
    constructor(p1Id, p2Id, winnerId) {
        this.playerOneId = p1Id;
        this.playerTwoId = p2Id;
        this.winnerId = winnerId;
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