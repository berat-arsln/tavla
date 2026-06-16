// js/core/moveValidator.js

export class MoveValidator {

    constructor() {

        this.variant = "turkish";

    }

    isValidMove(
        board,
        fromPoint,
        toPoint,
        playerColor
    ) {

        if (
            fromPoint < 1 ||
            fromPoint > 24
        ) {
            return false;
        }

        if (
            toPoint < 1 ||
            toPoint > 24
        ) {
            return false;
        }

        const fromStack =
            board.points[fromPoint];

        const targetStack =
            board.points[toPoint];

        if (
            !fromStack ||
            fromStack.length === 0
        ) {
            return false;
        }

        const movingPiece =
            fromStack[
                fromStack.length - 1
            ];

        if (
            movingPiece.color !==
            playerColor
        ) {
            return false;
        }

        /*
         * Boş hane
         */

        if (
            targetStack.length === 0
        ) {
            return true;
        }

        const topPiece =
            targetStack[
                targetStack.length - 1
            ];

        /*
         * Kendi taşı
         */

        if (
            topPiece.color ===
            playerColor
        ) {
            return true;
        }

        /*
         * Rakip tek taş
         */

        if (
            targetStack.length === 1
        ) {
            return true;
        }

        /*
         * Rakip kapalı kapı
         */

        return false;

    }

    getLegalMoves(
        board,
        fromPoint,
        diceValue,
        playerColor
    ) {

        const moves = [];

        let targetPoint;

        if (
            playerColor === "white"
        ) {

            targetPoint =
                fromPoint - diceValue;

        } else {

            targetPoint =
                fromPoint + diceValue;

        }

        if (
            this.isValidMove(
                board,
                fromPoint,
                targetPoint,
                playerColor
            )
        ) {

            moves.push(
                targetPoint
            );

        }

        return moves;

    }

    canPlayerMove(
        board,
        diceValues,
        playerColor
    ) {

        for (
            let point = 1;
            point <= 24;
            point++
        ) {

            const stack =
                board.points[point];

            if (
                stack.length === 0
            ) {
                continue;
            }

            const topPiece =
                stack[
                    stack.length - 1
                ];

            if (
                topPiece.color !==
                playerColor
            ) {
                continue;
            }

            for (
                const dice of diceValues
            ) {

                const moves =
                    this.getLegalMoves(
                        board,
                        point,
                        dice,
                        playerColor
                    );

                if (
                    moves.length > 0
                ) {
                    return true;
                }

            }

        }

        return false;

    }

    getAllLegalMoves(
        board,
        diceValues,
        playerColor
    ) {

        const result = [];

        for (
            let point = 1;
            point <= 24;
            point++
        ) {

            const stack =
                board.points[point];

            if (
                stack.length === 0
            ) {
                continue;
            }

            const topPiece =
                stack[
                    stack.length - 1
                ];

            if (
                topPiece.color !==
                playerColor
            ) {
                continue;
            }

            for (
                const dice of diceValues
            ) {

                const moves =
                    this.getLegalMoves(
                        board,
                        point,
                        dice,
                        playerColor
                    );

                moves.forEach(
                    target => {

                        result.push({

                            from: point,

                            to: target,

                            dice

                        });

                    }
                );

            }

        }

        return result;

    }

}