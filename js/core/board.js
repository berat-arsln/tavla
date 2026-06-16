// js/core/board.js

export class Board {
    constructor() {
        this.state = this.#createEmptyState();
    }

    initialize() {
        this.state = this.#createInitialState();
        return this.getState();
    }

    getState() {
        return structuredClone(this.state);
    }

    clone() {
        const board = new Board();
        board.state = structuredClone(this.state);
        return board;
    }

    moveChecker(from, to) {
        this.#validateBoardPosition(from);
        this.#validateBoardPosition(to);

        const sourcePoint = this.state.points[from];

        if (!sourcePoint.color || sourcePoint.count === 0) {
            throw new Error("ERR_NO_CHECKER_ON_SOURCE");
        }

        sourcePoint.count -= 1;

        if (sourcePoint.count === 0) {
            sourcePoint.color = null;
        }

        const targetPoint = this.state.points[to];

        if (targetPoint.count === 0) {
            targetPoint.color = sourcePoint.color;
            targetPoint.count = 1;
            return;
        }

        if (targetPoint.color !== sourcePoint.color) {
            throw new Error("ERR_INVALID_TARGET_COLOR");
        }

        targetPoint.count += 1;
    }

    hitChecker(position) {
        this.#validateBoardPosition(position);

        const point = this.state.points[position];

        if (!point.color || point.count !== 1) {
            throw new Error("ERR_INVALID_HIT");
        }

        const checkerColor = point.color;

        point.color = null;
        point.count = 0;

        if (checkerColor === "white") {
            this.state.bar.white += 1;
        } else {
            this.state.bar.black += 1;
        }
    }

    enterFromBar(color, position) {
        this.#validatePlayerColor(color);
        this.#validateBoardPosition(position);

        const targetPoint = this.state.points[position];

        if (color === "white") {
            if (this.state.bar.white <= 0) {
                throw new Error("ERR_NO_BAR_CHECKER");
            }

            this.state.bar.white -= 1;
        } else {
            if (this.state.bar.black <= 0) {
                throw new Error("ERR_NO_BAR_CHECKER");
            }

            this.state.bar.black -= 1;
        }

        if (targetPoint.count === 0) {
            targetPoint.color = color;
            targetPoint.count = 1;
            return;
        }

        if (targetPoint.color !== color) {
            throw new Error("ERR_INVALID_TARGET_COLOR");
        }

        targetPoint.count += 1;
    }

    bearOff(color, position) {
        this.#validatePlayerColor(color);
        this.#validateBoardPosition(position);

        const point = this.state.points[position];

        if (point.color !== color || point.count === 0) {
            throw new Error("ERR_INVALID_BEAR_OFF");
        }

        point.count -= 1;

        if (point.count === 0) {
            point.color = null;
        }

        if (color === "white") {
            this.state.off.white += 1;
        } else {
            this.state.off.black += 1;
        }
    }

    reset() {
        this.state = this.#createEmptyState();
    }

    #createEmptyState() {
        const points = {};

        for (let position = 1; position <= 24; position++) {
            points[position] = {
                position,
                color: null,
                count: 0
            };
        }

        return {
            points,

            bar: {
                white: 0,
                black: 0
            },

            off: {
                white: 0,
                black: 0
            }
        };
    }

    #createInitialState() {
        const state = this.#createEmptyState();

        /*
         * Standart Türk Tavlası başlangıç dizilimi
         *
         * White:
         * 24 -> 2
         * 13 -> 5
         * 8  -> 3
         * 6  -> 5
         *
         * Black:
         * 1  -> 2
         * 12 -> 5
         * 17 -> 3
         * 19 -> 5
         */

        state.points[24] = {
            position: 24,
            color: "white",
            count: 2
        };

        state.points[13] = {
            position: 13,
            color: "white",
            count: 5
        };

        state.points[8] = {
            position: 8,
            color: "white",
            count: 3
        };

        state.points[6] = {
            position: 6,
            color: "white",
            count: 5
        };

        state.points[1] = {
            position: 1,
            color: "black",
            count: 2
        };

        state.points[12] = {
            position: 12,
            color: "black",
            count: 5
        };

        state.points[17] = {
            position: 17,
            color: "black",
            count: 3
        };

        state.points[19] = {
            position: 19,
            color: "black",
            count: 5
        };

        return state;
    }

    #validateBoardPosition(position) {
        if (
            !Number.isInteger(position) ||
            position < 1 ||
            position > 24
        ) {
            throw new Error("ERR_INVALID_POSITION");
        }
    }

    #validatePlayerColor(color) {
        if (color !== "white" && color !== "black") {
            throw new Error("ERR_INVALID_PLAYER");
        }
    }
}