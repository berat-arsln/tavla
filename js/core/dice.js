// js/core/dice.js

export class Dice {
    constructor() {
        this.lastRoll = null;
        this.lastStartRoll = null;
    }

    roll() {
        const dieOne = this.#generateDieValue();
        const dieTwo = this.#generateDieValue();

        this.lastRoll = {
            dieOne,
            dieTwo,
            values: this.#buildMoveValues(dieOne, dieTwo),
            isDouble: dieOne === dieTwo
        };

        return structuredClone(this.lastRoll);
    }

    rollStartDice() {
        let playerOne;
        let playerTwo;

        do {
            playerOne = this.#generateDieValue();
            playerTwo = this.#generateDieValue();
        } while (playerOne === playerTwo);

        const starter =
            playerOne > playerTwo
                ? "white"
                : "black";

        this.lastStartRoll = {
            playerOne,
            playerTwo,
            starter
        };

        return structuredClone(this.lastStartRoll);
    }

    isDouble() {
        if (!this.lastRoll) {
            return false;
        }

        return this.lastRoll.isDouble;
    }

    #generateDieValue() {
        return Math.floor(Math.random() * 6) + 1;
    }

    #buildMoveValues(dieOne, dieTwo) {
        if (dieOne === dieTwo) {
            return [
                dieOne,
                dieOne,
                dieOne,
                dieOne
            ];
        }

        return [
            dieOne,
            dieTwo
        ];
    }
}