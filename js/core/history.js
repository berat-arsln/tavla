// js/core/history.js

export class HistoryManager {

    constructor() {

        this.moves = [];

        this.turns = [];

    }

    clear() {

        this.moves = [];

        this.turns = [];

    }

    addMove({

        player,

        dice,

        from,

        to,

        usedDice,

        boardSnapshot = null

    }) {

        const move = {

            id: crypto.randomUUID(),

            timestamp: Date.now(),

            player,

            dice: [...dice],

            from,

            to,

            usedDice: [...usedDice],

            boardSnapshot

        };

        this.moves.push(move);

        return move;

    }

    getMoves() {

        return structuredClone(
            this.moves
        );

    }

    getMoveCount() {

        return this.moves.length;

    }

    getLastMove() {

        if (!this.moves.length) {

            return null;

        }

        return structuredClone(

            this.moves[
                this.moves.length - 1
            ]

        );

    }

    removeLastMove() {

        if (!this.moves.length) {

            return null;

        }

        return this.moves.pop();

    }

    addTurn({

        player,

        dice,

        moves

    }) {

        const turn = {

            id: crypto.randomUUID(),

            timestamp: Date.now(),

            player,

            dice: [...dice],

            moves: structuredClone(
                moves
            )

        };

        this.turns.push(turn);

        return turn;

    }

    getTurns() {

        return structuredClone(
            this.turns
        );

    }

    getLastTurn() {

        if (!this.turns.length) {

            return null;

        }

        return structuredClone(

            this.turns[
                this.turns.length - 1
            ]

        );

    }

    removeLastTurn() {

        if (!this.turns.length) {

            return null;

        }

        return this.turns.pop();

    }

    exportForGameRecord() {

        return {

            totalMoves:
                this.moves.length,

            totalTurns:
                this.turns.length,

            moves:
                structuredClone(
                    this.moves
                ),

            turns:
                structuredClone(
                    this.turns
                )

        };

    }

    importGameRecord(data) {

        this.moves =
            structuredClone(
                data.moves || []
            );

        this.turns =
            structuredClone(
                data.turns || []
            );

    }

    formatMove(move) {

        return {

            id: move.id,

            player:
                move.player,

            text:
                `${move.from} → ${move.to}`,

            dice:
                move.dice.join("-"),

            timestamp:
                move.timestamp

        };

    }

    getFormattedHistory() {

        return this.moves.map(

            move =>
                this.formatMove(
                    move
                )

        );

    }

    getPlayerMoves(player) {

        return this.moves.filter(

            move =>
                move.player === player

        );

    }

    getPlayerTurns(player) {

        return this.turns.filter(

            turn =>
                turn.player === player

        );

    }

}