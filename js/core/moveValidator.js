// js/core/moveValidator.js

export class MoveValidator {

    constructor() {

        this.directions = {

            white: -1,
            black: 1

        };

    }

    validateMove({
        board,
        player,
        from,
        to,
        diceValues
    }) {

        const point =
            board.points[from];

        if (!point.length) {

            return {
                valid: false,
                reason: "Kaynak hanede taş yok."
            };

        }

        const piece =
            point[
                point.length - 1
            ];

        if (
            piece.color !== player
        ) {

            return {
                valid: false,
                reason:
                    "Bu taş sana ait değil."
            };

        }

        const distance =
            this.calculateDistance(
                player,
                from,
                to
            );

        const usableDice =
            this.findUsableDice(
                distance,
                diceValues
            );

        if (!usableDice.valid) {

            return {
                valid: false,
                reason:
                    "Zar ile uyumlu hamle değil."
            };

        }

        if (
            !this.isPointOpen(
                board,
                player,
                to
            )
        ) {

            return {
                valid: false,
                reason:
                    "Hedef hane kapalı."
            };

        }

        return {

            valid: true,

            distance,

            usedDice:
                usableDice.usedDice

        };

    }

    calculateDistance(
        player,
        from,
        to
    ) {

        if (player === "white") {

            return from - to;

        }

        return to - from;

    }

    isPointOpen(
        board,
        player,
        pointNumber
    ) {

        const point =
            board.points[
                pointNumber
            ];

        if (
            point.length === 0
        ) {

            return true;

        }

        const topPiece =
            point[
                point.length - 1
            ];

        return (
            topPiece.color ===
            player
        );

    }

    findUsableDice(
        distance,
        diceValues
    ) {

        const single =
            this.checkSingleDie(
                distance,
                diceValues
            );

        if (single.valid) {

            return single;

        }

        const combined =
            this.checkCombinedDice(
                distance,
                diceValues
            );

        if (combined.valid) {

            return combined;

        }

        return {
            valid: false
        };

    }

    checkSingleDie(
        distance,
        diceValues
    ) {

        for (
            let i = 0;
            i < diceValues.length;
            i++
        ) {

            if (
                diceValues[i] ===
                distance
            ) {

                return {

                    valid: true,

                    usedDice: [
                        i
                    ]

                };

            }

        }

        return {
            valid: false
        };

    }

    checkCombinedDice(
        distance,
        diceValues
    ) {

        if (
            diceValues.length < 2
        ) {

            return {
                valid: false
            };

        }

        const total =
            diceValues.reduce(
                (sum, value) =>
                    sum + value,
                0
            );

        if (
            total === distance
        ) {

            return {

                valid: true,

                usedDice:
                    diceValues.map(
                        (
                            _,
                            index
                        ) => index
                    )

            };

        }

        return {
            valid: false
        };

    }

    getPossibleMoves({
        board,
        player,
        point,
        diceValues
    }) {

        const moves = [];

        for (
            let target = 1;
            target <= 24;
            target++
        ) {

            const result =
                this.validateMove({

                    board,

                    player,

                    from: point,

                    to: target,

                    diceValues

                });

            if (
                result.valid
            ) {

                moves.push({

                    target,

                    usedDice:
                        result.usedDice

                });

            }

        }

        return moves;

    }

    hasAnyLegalMove({
        board,
        player,
        diceValues
    }) {

        for (
            let point = 1;
            point <= 24;
            point++
        ) {

            const pieces =
                board.points[
                    point
                ];

            if (
                !pieces.length
            ) {

                continue;

            }

            const topPiece =
                pieces[
                    pieces.length - 1
                ];

            if (
                topPiece.color !==
                player
            ) {

                continue;

            }

            const possibleMoves =
                this.getPossibleMoves({

                    board,

                    player,

                    point,

                    diceValues

                });

            if (
                possibleMoves.length
            ) {

                return true;

            }

        }

        return false;

    }

}