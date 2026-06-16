// js/core/undo.js

export class UndoManager {

    constructor() {

        this.stack = [];

    }

    clear() {

        this.stack = [];

    }

    getCount() {

        return this.stack.length;

    }

    hasUndo() {

        return this.stack.length > 0;

    }

    saveState({

        board,

        diceState,

        moveHistory,

        currentPlayer

    }) {

        this.stack.push({

            timestamp: Date.now(),

            board:
                structuredClone(
                    board
                ),

            diceState:
                structuredClone(
                    diceState
                ),

            moveHistory:
                structuredClone(
                    moveHistory
                ),

            currentPlayer

        });

    }

    undo() {

        if (
            !this.stack.length
        ) {

            return null;

        }

        return this.stack.pop();

    }

    restore({

        boardManager,

        diceManager,

        historyManager,

        gameEngine

    }) {

        const state =
            this.undo();

        if (!state) {

            return false;

        }

        // Tahta

        gameEngine.state.board =
            structuredClone(
                state.board
            );

        // Zarlar

        diceManager.restoreState(
            state.diceState
        );

        // Geçmiş

        historyManager.moves =
            structuredClone(
                state.moveHistory
            );

        // Oyuncu

        gameEngine.state.currentPlayer =
            state.currentPlayer;

        return true;

    }

    clearTurnHistory() {

        this.clear();

    }

    commitTurn() {

        this.clear();

    }

    getLastSnapshot() {

        if (
            !this.stack.length
        ) {

            return null;

        }

        return structuredClone(

            this.stack[
                this.stack.length - 1
            ]

        );

    }

    getAllSnapshots() {

        return structuredClone(
            this.stack
        );

    }

}