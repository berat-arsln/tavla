// js/ui/boardUI.js

export class BoardUI {

    constructor(boardElementId = "board") {

        this.boardElement =
            document.getElementById(
                boardElementId
            );

        this.selectedPoint = null;

        this.highlightedPoints = [];

        this.onPointClick = null;

    }

    createBoard() {

        if (!this.boardElement) {
            return;
        }

        this.boardElement.innerHTML = "";

        const boardWrapper =
            document.createElement("div");

        boardWrapper.className =
            "board-wrapper";

        // Üst sıra
        const topRow =
            document.createElement("div");

        topRow.className =
            "board-row top-row";

        // Alt sıra
        const bottomRow =
            document.createElement("div");

        bottomRow.className =
            "board-row bottom-row";

        // Üst sıra
        const topOrder = [
            13, 14, 15, 16, 17, 18,
            19, 20, 21, 22, 23, 24
        ];

        // Alt sıra
        const bottomOrder = [
            12, 11, 10, 9, 8, 7,
            6, 5, 4, 3, 2, 1
        ];

        topOrder.forEach(point => {

            topRow.appendChild(
                this.createPoint(point)
            );

        });

        bottomOrder.forEach(point => {

            bottomRow.appendChild(
                this.createPoint(point)
            );

        });

        boardWrapper.appendChild(
            topRow
        );

        boardWrapper.appendChild(
            bottomRow
        );

        this.boardElement.appendChild(
            boardWrapper
        );

    }

    createPoint(pointNumber) {

        const point =
            document.createElement("div");

        point.className =
            "board-point";

        point.dataset.point =
            pointNumber;

        const number =
            document.createElement("div");

        number.className =
            "point-number";

        number.textContent =
            pointNumber;

        const pieces =
            document.createElement("div");

        pieces.className =
            "point-pieces";

        point.appendChild(number);

        point.appendChild(pieces);

        point.addEventListener(
            "click",
            () => {

                if (
                    typeof this
                        .onPointClick ===
                    "function"
                ) {

                    this.onPointClick(
                        pointNumber
                    );

                }

            }
        );

        return point;

    }

    renderBoard(board) {

        for (
            let point = 1;
            point <= 24;
            point++
        ) {

            const pointElement =
                this.boardElement
                    .querySelector(
                        `[data-point="${point}"]`
                    );

            if (!pointElement) {
                continue;
            }

            const piecesContainer =
                pointElement.querySelector(
                    ".point-pieces"
                );

            piecesContainer.innerHTML =
                "";

            const pieces =
                board.points[point];

            pieces.forEach(piece => {

                const pieceElement =
                    document.createElement(
                        "div"
                    );

                pieceElement.className =
                    `piece ${piece.color}`;

                piecesContainer.appendChild(
                    pieceElement
                );

            });

        }

    }

    selectPoint(pointNumber) {

        this.clearSelection();

        const point =
            this.boardElement
                .querySelector(
                    `[data-point="${pointNumber}"]`
                );

        if (!point) {
            return;
        }

        point.classList.add(
            "selected"
        );

        this.selectedPoint =
            pointNumber;

    }

    clearSelection() {

        const selected =
            this.boardElement
                .querySelector(
                    ".selected"
                );

        if (selected) {

            selected.classList.remove(
                "selected"
            );

        }

        this.selectedPoint =
            null;

    }

    highlightMoves(points) {

        this.clearHighlights();

        points.forEach(point => {

            const element =
                this.boardElement
                    .querySelector(
                        `[data-point="${point}"]`
                    );

            if (!element) {
                return;
            }

            element.classList.add(
                "possible-move"
            );

            this.highlightedPoints
                .push(element);

        });

    }

    clearHighlights() {

        this.highlightedPoints
            .forEach(element => {

                element.classList.remove(
                    "possible-move"
                );

            });

        this.highlightedPoints =
            [];

    }

    updateBoard(board) {

        this.renderBoard(
            board
        );

    }

    setPointClickHandler(
        callback
    ) {

        this.onPointClick =
            callback;

    }

}