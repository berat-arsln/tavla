
// js/core/gameEngine.js

export class GameEngine {

    constructor(options = {}) {

        this.variant = options.variant || "turkish";

        this.state = this.createInitialState();

    }

    createInitialState() {

        return {

            // Oyun bilgileri
            gameId: null,
            variant: this.variant,
            status: "waiting",

            // Oyuncular
            players: {
                white: {
                    id: null,
                    name: "Oyuncu 1"
                },

                black: {
                    id: null,
                    name: "Oyuncu 2"
                }
            },

            // Kimin sırası
            currentPlayer: null,

            // Zarlar
            dice: [],

            // Başlangıç zarı atıldı mı
            startingRollCompleted: false,

            // Hamle geçmişi
            moveHistory: [],

            // Undo sistemi
            undoStack: [],

            // Skor
            score: {
                white: 0,
                black: 0
            },

            // Maç ayarları
            matchSettings: {
                targetWins: 1,
                moveTimeLimit: null,
                chatEnabled: true,
                spectatorsAllowed: true
            },

            // Tahta
            board: null,

            // Kazanan
            winner: null,

            // Oyun başlangıç zamanı
            startedAt: null,

            // Oyun bitiş zamanı
            endedAt: null

        };

    }

    getState() {

        return structuredClone(this.state);

    }

    setBoard(boardState) {

        this.state.board = structuredClone(boardState);

    }

    getBoard() {

        return structuredClone(this.state.board);

    }

    setPlayers(playerWhite, playerBlack) {

        this.state.players.white = {
            ...playerWhite
        };

        this.state.players.black = {
            ...playerBlack
        };

    }

    startGame() {

        this.state.status = "starting";

        this.state.startedAt = Date.now();

    }

    rollStartingDice() {

        const whiteRoll = this.randomDice();
        const blackRoll = this.randomDice();

        return {
            white: whiteRoll,
            black: blackRoll
        };

    }

    setStartingPlayer(playerColor) {

        this.state.currentPlayer = playerColor;

        this.state.startingRollCompleted = true;

        this.state.status = "playing";

    }

    rollDice() {

        const die1 = this.randomDice();
        const die2 = this.randomDice();

        if (die1 === die2) {

            this.state.dice = [
                die1,
                die1,
                die1,
                die1
            ];

        } else {

            this.state.dice = [
                die1,
                die2
            ];

        }

        return [...this.state.dice];

    }

    randomDice() {

        return Math.floor(Math.random() * 6) + 1;

    }

    setDice(values) {

        this.state.dice = [...values];

    }

    getDice() {

        return [...this.state.dice];

    }

    saveUndoState() {

        this.state.undoStack.push(
            structuredClone(this.state)
        );

    }

    undo() {

        if (this.state.undoStack.length === 0) {
            return false;
        }

        this.state = this.state.undoStack.pop();

        return true;

    }

    addMove(moveData) {

        this.state.moveHistory.push({

            timestamp: Date.now(),

            player: this.state.currentPlayer,

            ...moveData

        });

    }

    getMoveHistory() {

        return structuredClone(
            this.state.moveHistory
        );

    }

    clearMoveHistory() {

        this.state.moveHistory = [];

    }

    switchTurn() {

        this.state.currentPlayer =
            this.state.currentPlayer === "white"
                ? "black"
                : "white";

    }

    getCurrentPlayer() {

        return this.state.currentPlayer;

    }

    setWinner(playerColor) {

        this.state.winner = playerColor;

        this.state.status = "finished";

        this.state.endedAt = Date.now();

    }

    getWinner() {

        return this.state.winner;

    }

    isGameFinished() {

        return this.state.status === "finished";

    }

    addMatchWin(playerColor) {

        this.state.score[playerColor]++;

    }

    getScore() {

        return structuredClone(
            this.state.score
        );

    }

    resetRound() {

        this.state.dice = [];

        this.state.moveHistory = [];

        this.state.undoStack = [];

        this.state.winner = null;

        this.state.status = "waiting";

        this.state.board = null;

    }

    resetMatch() {

        this.state = this.createInitialState();

    }

}
