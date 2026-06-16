// js/core/moveValidator.js

export class MoveValidator {
    constructor() {
        this.variant = "turkish";
    }

    validateMove(boardState, move, playerColor) {
        const validMoves = this.getValidMoves(
            boardState,
            move.from,
            playerColor
        );

        return validMoves.includes(move.to);
    }

    getValidMoves(boardState, fromPosition, playerColor, diceValues = []) {
        const validMoves = [];

        if (
            !boardState ||
            !boardState.points ||
            !boardState.points[fromPosition]
        ) {
            return validMoves;
        }

        const sourcePoint = boardState.points[fromPosition];

        if (
            sourcePoint.color !== playerColor ||
            sourcePoint.count <= 0
        ) {
            return validMoves;
        }

        if (
            playerColor === "white" &&
            boardState.bar.white > 0
        ) {
            return validMoves;
        }

        if (
            playerColor === "black" &&
            boardState.bar.black > 0
        ) {
            return validMoves;
        }

        for (const dieValue of diceValues) {
            const targetPosition =
                playerColor === "white"
                    ? fromPosition - dieValue
                    : fromPosition + dieValue;

            if (
                targetPosition < 1 ||
                targetPosition > 24
            ) {
                continue;
            }

            const targetPoint =
                boardState.points[targetPosition];

            if (
                targetPoint.count > 1 &&
                targetPoint.color !== playerColor
            ) {
                continue;
            }

            validMoves.push(targetPosition);
        }

        return [...new Set(validMoves)];
    }

    canBearOff(boardState, playerColor) {
        if (!boardState || !boardState.points) {
            return false;
        }

        const homeRange =
            playerColor === "white"
                ? [1, 6]
                : [19, 24];

        for (let position = 1; position <= 24; position++) {
            const point = boardState.points[position];

            if (
                point.color === playerColor &&
                point.count > 0
            ) {
                const inHomeBoard =
                    position >= homeRange[0] &&
                    position <= homeRange[1];

                if (!inHomeBoard) {
                    return false;
                }
            }
        }

        return true;
    }

    hasMoves(boardState, playerColor, diceValues = []) {
        if (!boardState || !boardState.points) {
            return false;
        }

        for (let position = 1; position <= 24; position++) {
            const point = boardState.points[position];

            if (
                point.color !== playerColor ||
                point.count <= 0
            ) {
                continue;
            }

            const moves = this.getValidMoves(
                boardState,
                position,
                playerColor,
                diceValues
            );

            if (moves.length > 0) {
                return true;
            }
        }

        return false;
    }

    checkGameEnd(boardState) {
        if (!boardState || !boardState.off) {
            return {
                isGameOver: false,
                winner: null,
                resultType: null
            };
        }

        if (boardState.off.white === 15) {
            return {
                isGameOver: true,
                winner: "white",
                resultType: "normal"
            };
        }

        if (boardState.off.black === 15) {
            return {
                isGameOver: true,
                winner: "black",
                resultType: "normal"
            };
        }

        return {
            isGameOver: false,
            winner: null,
            resultType: null
        };
    }
}