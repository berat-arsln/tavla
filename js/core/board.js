// js/core/board.js

export class Board {

    constructor(variant = "turkish") {

        this.variant = variant;

    }

    createBoard() {

        switch (this.variant) {

            case "turkish":
                return this.createTurkishBoard();

            default:
                return this.createTurkishBoard();

        }

    }

    createTurkishBoard() {

        const points = {};

        // 1 - 24 arası haneler

        for (let i = 1; i <= 24; i++) {

            points[i] = [];

        }

        /*
            Türk Tavlası Başlangıç Dizilimi

            Beyaz:
            1 -> 15 taş

            Siyah:
            24 -> 15 taş
        */

        points[1] = this.createPieces(
            "white",
            15
        );

        points[24] = this.createPieces(
            "black",
            15
        );

        return {

            variant: "turkish",

            points,

            bar: {
                white: [],
                black: []
            },

            borneOff: {
                white: [],
                black: []
            }

        };

    }

    createPieces(color, count) {

        const pieces = [];

        for (let i = 0; i < count; i++) {

            pieces.push({
                id: crypto.randomUUID(),
                color
            });

        }

        return pieces;

    }

    getPoint(board, pointNumber) {

        return board.points[pointNumber];

    }

    getPointCount(board, pointNumber) {

        return board.points[pointNumber].length;

    }

    getTopPiece(board, pointNumber) {

        const point = board.points[pointNumber];

        if (point.length === 0) {
            return null;
        }

        return point[point.length - 1];

    }

    addPiece(board, pointNumber, piece) {

        board.points[pointNumber].push(piece);

    }

    removePiece(board, pointNumber) {

        if (
            board.points[pointNumber].length === 0
        ) {
            return null;
        }

        return board.points[pointNumber].pop();

    }

    movePiece(board, fromPoint, toPoint) {

        const piece =
            this.removePiece(
                board,
                fromPoint
            );

        if (!piece) {
            return false;
        }

        this.addPiece(
            board,
            toPoint,
            piece
        );

        return true;

    }

    sendToBar(board, piece) {

        board.bar[
            piece.color
        ].push(piece);

    }

    removeFromBar(board, color) {

        const bar =
            board.bar[color];

        if (bar.length === 0) {
            return null;
        }

        return bar.pop();

    }

    bearOffPiece(board, piece) {

        board.borneOff[
            piece.color
        ].push(piece);

    }

    getBorneOffCount(board, color) {

        return board.borneOff[
            color
        ].length;

    }

    getPiecesByColor(board, color) {

        const result = [];

        for (let point = 1; point <= 24; point++) {

            board.points[point]
                .forEach(piece => {

                    if (
                        piece.color === color
                    ) {

                        result.push({
                            point,
                            piece
                        });

                    }

                });

        }

        return result;

    }

    cloneBoard(board) {

        return structuredClone(board);

    }

}