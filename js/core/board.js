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

    for (let i = 1; i <= 24; i++) {
        points[i] = [];
    }

    /*
        Türk Tavlası Başlangıç Dizilimi

        Beyaz:
        24 -> 2
        13 -> 5
        8  -> 3
        6  -> 5

        Siyah:
        1  -> 2
        12 -> 5
        17 -> 3
        19 -> 5
    */

    // Beyaz

    points[24] = this.createPieces(
        "white",
        2
    );

    points[13] = this.createPieces(
        "white",
        5
    );

    points[8] = this.createPieces(
        "white",
        3
    );

    points[6] = this.createPieces(
        "white",
        5
    );

    // Siyah

    points[1] = this.createPieces(
        "black",
        2
    );

    points[12] = this.createPieces(
        "black",
        5
    );

    points[17] = this.createPieces(
        "black",
        3
    );

    points[19] = this.createPieces(
        "black",
        5
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