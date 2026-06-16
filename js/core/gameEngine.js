// js/core/gameEngine.js

import { MoveValidator }
from "./moveValidator.js";

export class GameEngine {

    constructor(options = {}) {

        this.variant =
            options.variant ||
            "turkish";

        this.board = null;

        this.currentPlayer =
            "white";

        this.status =
            "waiting";

        this.gameId =
            null;

        this.players = [];

        this.moveValidator =
            new MoveValidator();

        this.diceValues = [];

        this.selectedPoint =
            null;

        this.winner = null;

    }

    /* =========================
       BOARD
    ========================= */

    setBoard(board) {

        this.board = board;

    }

    getBoard() {

        return this.board;

    }

    /* =========================
       GAME
    ========================= */

    startGame() {

        this.status =
            "playing";

        this.currentPlayer =
            "white";

        this.winner =
            null;

    }

    endGame(winnerColor) {

        this.status =
            "finished";

        this.winner =
            winnerColor;

    }

    /* =========================
       PLAYER
    ========================= */

    getCurrentPlayer() {

        return this.currentPlayer;

    }

    switchPlayer() {

        this.currentPlayer =

            this.currentPlayer ===
            "white"

                ? "black"

                : "white";

        this.selectedPoint =
            null;

        this.diceValues = [];

    }

    /* =========================
       DICE
    ========================= */

    setDiceValues(values) {

        this.diceValues =
            [...values];

    }

    getDiceValues() {

        return this.diceValues;

    }

    consumeDice(value) {

        const index =
            this.diceValues.indexOf(
                value
            );

        if (
            index !== -1
        ) {

            this.diceValues.splice(
                index,
                1
            );

        }

    }

    /* =========================
       SELECTION
    ========================= */

    selectPoint(point) {

        this.selectedPoint =
            point;

    }

    clearSelection() {

        this.selectedPoint =
            null;

    }

    getSelectedPoint() {

        return this.selectedPoint;

    }

    /* =========================
       MOVE
    ========================= */

    movePiece(
        fromPoint,
        toPoint
    ) {

        if (
            !this.board
        ) {
            return false;
        }

        const distance =
            Math.abs(
                toPoint -
                fromPoint
            );

        if (
            !this.diceValues.includes(
                distance
            )
        ) {
            return false;
        }

        const isValid =
            this.moveValidator
                .isValidMove(

                    this.board,

                    fromPoint,

                    toPoint,

                    this.currentPlayer

                );

        if (
            !isValid
        ) {
            return false;
        }

        const targetStack =
            this.board.points[
                toPoint
            ];

        /*
         * Rakip tek taş
         */

        if (

            targetStack.length === 1 &&

            targetStack[0].color !==
            this.currentPlayer

        ) {

            const capturedPiece =
                targetStack.pop();

            this.board.bar[
                capturedPiece.color
            ].push(
                capturedPiece
            );

        }

        const movingPiece =
            this.board.points[
                fromPoint
            ].pop();

        this.board.points[
            toPoint
        ].push(
            movingPiece
        );

        this.consumeDice(
            distance
        );

        return true;

    }

    /* =========================
       LEGAL MOVES
    ========================= */

    getLegalMoves(
        point
    ) {

        const result = [];

        this.diceValues
            .forEach(dice => {

                const moves =
                    this.moveValidator
                        .getLegalMoves(

                            this.board,

                            point,

                            dice,

                            this.currentPlayer

                        );

                result.push(
                    ...moves
                );

            });

        return result;

    }

    canCurrentPlayerMove() {

        return this.moveValidator
            .canPlayerMove(

                this.board,

                this.diceValues,

                this.currentPlayer

            );

    }

    /* =========================
       TURN
    ========================= */

    finishTurn() {

        this.switchPlayer();

    }

    /* =========================
       STATE
    ========================= */

    getState() {

        return {

            gameId:
                this.gameId,

            variant:
                this.variant,

            status:
                this.status,

            players:
                this.players,

            currentPlayer:
                this.currentPlayer,

            winner:
                this.winner,

            diceValues:
                this.diceValues,

            selectedPoint:
                this.selectedPoint

        };

    }

}