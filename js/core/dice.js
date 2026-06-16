// js/core/dice.js

export class DiceManager {

    constructor() {

        this.values = [];

        this.usedDice = [];

    }

    // 1-6 arası tek zar

    randomDie() {

        return Math.floor(
            Math.random() * 6
        ) + 1;

    }

    // Normal tur zarı

    roll() {

        const die1 =
            this.randomDie();

        const die2 =
            this.randomDie();

        if (die1 === die2) {

            this.values = [
                die1,
                die1,
                die1,
                die1
            ];

        } else {

            this.values = [
                die1,
                die2
            ];

        }

        this.usedDice = [];

        return this.getDice();

    }

    // Oyuna başlama zarı

    rollStartingDice() {

        let white =
            this.randomDie();

        let black =
            this.randomDie();

        while (white === black) {

            white =
                this.randomDie();

            black =
                this.randomDie();

        }

        return {

            white,
            black,

            starter:
                white > black
                    ? "white"
                    : "black"

        };

    }

    getDice() {

        return [...this.values];

    }

    getUnusedDice() {

        return this.values.filter(
            (_, index) =>
                !this.usedDice.includes(
                    index
                )
        );

    }

    useDie(index) {

        if (
            index < 0 ||
            index >= this.values.length
        ) {
            return false;
        }

        if (
            this.usedDice.includes(index)
        ) {
            return false;
        }

        this.usedDice.push(index);

        return true;

    }

    resetUsage() {

        this.usedDice = [];

    }

    isDieUsed(index) {

        return this.usedDice.includes(
            index
        );

    }

    getUsedDice() {

        return [
            ...this.usedDice
        ];

    }

    areAllDiceUsed() {

        return (
            this.usedDice.length ===
            this.values.length
        );

    }

    remainingMoves() {

        return this.values.length -
            this.usedDice.length;

    }

    getRemainingDiceValues() {

        return this.values.filter(
            (_, index) =>
                !this.usedDice.includes(
                    index
                )
        );

    }

    // Undo için

    saveState() {

        return {

            values: [
                ...this.values
            ],

            usedDice: [
                ...this.usedDice
            ]

        };

    }

    restoreState(state) {

        this.values = [
            ...state.values
        ];

        this.usedDice = [
            ...state.usedDice
        ];

    }

    clear() {

        this.values = [];

        this.usedDice = [];

    }

    // Toplam zar değeri

    getTotalValue() {

        return this.getRemainingDiceValues()
            .reduce(
                (sum, value) =>
                    sum + value,
                0
            );

    }

    // Örnek:
    // 6-3 geldiğinde
    // 9 ilerleme yapılabiliyor mu?

    canCombineDice() {

        return (
            this.getRemainingDiceValues()
                .length > 1
        );

    }

    getCombinedValue() {

        return this.getRemainingDiceValues()
            .reduce(
                (sum, value) =>
                    sum + value,
                0
            );

    }

}