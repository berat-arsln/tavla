// js/core/undo.js

export class UndoManager {
    constructor() {
        this.snapshots = [];
    }

    pushSnapshot(gameState) {
        if (!gameState) {
            throw new Error("ERR_INVALID_SNAPSHOT");
        }

        this.snapshots.push(
            structuredClone(gameState)
        );

        return this.snapshots.length;
    }

    popSnapshot() {
        if (!this.canUndo()) {
            return null;
        }

        return this.snapshots.pop();
    }

    canUndo() {
        return this.snapshots.length > 0;
    }

    clear() {
        this.snapshots = [];
    }
}