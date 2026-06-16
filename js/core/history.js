// js/core/history.js

export class History {
    constructor() {
        this.turns = [];
    }

    addTurn(turnData) {
        if (!turnData || typeof turnData !== "object") {
            throw new Error("ERR_INVALID_HISTORY_ENTRY");
        }

        const entry = structuredClone(turnData);

        this.turns.push(entry);

        return this.turns.length;
    }

    getHistory() {
        return structuredClone(this.turns);
    }

    clear() {
        this.turns = [];
    }
}