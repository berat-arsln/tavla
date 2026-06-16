// js/core/gameEngine.js

import { Board } from "./board.js";
import { Dice } from "./dice.js";
import { MoveValidator } from "./moveValidator.js";
import { History } from "./history.js";
import { UndoManager } from "./undo.js";

export class GameEngine {
    constructor() {
        this.board = new Board();
        this.dice = new Dice();
        this.moveValidator = new MoveValidator();
        this.history = new History();
        this.undoManager = new UndoManager();

        this.gameState = null;
        this.startRollResult = null;
        this.currentDice = null;
        this.winner = null;
    }

    startMatch() {
        this.board.initialize();

        this.history.clear();
        this.undoManager.clear();

        this.startRollResult = null;
        this.currentDice = null;
        this.winner = null;

        this.gameState = {
            variant: "turkish",

            currentPlayer: null,

            turnNumber: 0,

            board: this.board.getState(),

            dice: null,

            gameOver: false,

            winner: null
        };

        return this.getGameState();
    }

    rollStartDice() {
        this.startRollResult =
            this.dice.rollStartDice();

        this.gameState.currentPlayer =
            this.startRollResult.starter;

        return structuredClone(
            this.startRollResult
        );
    }

    rollDice() {
        this.currentDice =
            this.dice.roll();

        this.gameState.dice =
            structuredClone(this.currentDice);

        return structuredClone(
            this.currentDice
        );
    }

    getGameState() {
        return structuredClone(
            this.gameState
        );
    }

    getValidMoves(fromPosition) {
        if (
            !this.gameState ||
            !this.currentDice
        ) {
            return [];
        }

        return this.moveValidator.getValidMoves(
            this.gameState.board,
            fromPosition,
            this.gameState.currentPlayer,
            this.currentDice.values
        );
    }

    makeMove(fromPosition, toPosition) {
        if (
            !this.gameState ||
            this.gameState.gameOver
        ) {
            return false;
        }

        const validMoves =
    this.moveValidator.getValidMoves(
        this.gameState.board,
        fromPosition,
        this.gameState.currentPlayer,
        this.currentDice?.values || []
    );

const isValid =
    validMoves.includes(toPosition);

if (!isValid) {
    return false;
}

        this.undoManager.pushSnapshot(
            this.gameState
        );

        this.board.state =
            structuredClone(
                this.gameState.board
            );

        this.board.moveChecker(
            fromPosition,
            toPosition
        );

        this.gameState.board =
            this.board.getState();

        return true;
    }

    undoMove() {
        const snapshot =
            this.undoManager.popSnapshot();

        if (!snapshot) {
            return false;
        }

        this.gameState =
            structuredClone(snapshot);

        this.board.state =
            structuredClone(
                this.gameState.board
            );

        return true;
    }

    endTurn() {
        if (
            !this.gameState ||
            this.gameState.gameOver
        ) {
            return;
        }

        this.history.addTurn({
            turnNumber:
                this.gameState.turnNumber + 1,

            player:
                this.gameState.currentPlayer,

            dice:
                structuredClone(
                    this.currentDice
                ),

            board:
                structuredClone(
                    this.gameState.board
                )
        });

        this.undoManager.clear();

        this.gameState.turnNumber += 1;

        this.gameState.currentPlayer =
            this.gameState.currentPlayer ===
            "white"
                ? "black"
                : "white";

        this.currentDice = null;

        this.gameState.dice = null;

        const gameResult =
            this.moveValidator.checkGameEnd(
                this.gameState.board
            );

        if (gameResult.isGameOver) {
            this.gameState.gameOver = true;
            this.gameState.winner =
                gameResult.winner;

            this.winner =
                gameResult.winner;
        }
    }

    canUndo() {
        return this.undoManager.canUndo();
    }

    isGameOver() {
        return (
            this.gameState?.gameOver === true
        );
    }

    getWinner() {
        return this.winner;
    }

    destroy() {
        this.history.clear();
        this.undoManager.clear();

        this.gameState = null;
        this.startRollResult = null;
        this.currentDice = null;
        this.winner = null;
    }
}