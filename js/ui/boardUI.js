// js/ui/boardUI.js

export class BoardUI {

    constructor(boardElementId = "board") {

        this.boardElement =
            document.getElementById(
                boardElementId
            );

        this.selectedPoint = null;

        this.highlightedPoints = [];

        this.pointClickHandler = null;

    }

    setPointClickHandler(handler) {

        this.pointClickHandler =
            handler;

    }

    createBoard() {

        if (!this.boardElement) {
            return;
        }

        this.boardElement.innerHTML = "";

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "board-wrapper";

        /*
         * ÜST SATIR
         * 13-24
         */

        const topRow =
            document.createElement("div");

        topRow.className =
            "board-row top-row";

        const topPoints = [
            13,14,15,16,17,18,
            19,20,21,22,23,24
        ];

        topPoints.forEach(point => {

            topRow.appendChild(
                this.createPoint(
                    point,
                    "top"
                )
            );

        });

        /*
         * ALT SATIR
         * 12-1
         */

        const bottomRow =
            document.createElement("div");

        bottomRow.className =
            "board-row bottom-row";

        const bottomPoints = [
            12,11,10,9,8,7,
            6,5,4,3,2,1
        ];

        bottomPoints.forEach(point => {

            bottomRow.appendChild(
                this.createPoint(
                    point,
                    "bottom"
                )
            );

        });

        wrapper.appendChild(
            topRow
        );

        wrapper.appendChild(
            bottomRow
        );

        this.boardElement.appendChild(
            wrapper
        );

    }

    createPoint(
        pointNumber,
        side
    ) {

        const point =
            document.createElement("div");

        point.className =
            `board-point ${side}`;

        point.dataset.point =
            pointNumber;

        const number =
            document.createElement("div");

        number.className =
            "point-number";

        number.textContent =
            pointNumber;

        const piecesContainer =
            document.createElement("div");

        piecesContainer.className =
            "point-pieces";

        point.appendChild(number);

        point.appendChild(
            piecesContainer
        );

        point.addEventListener(
            "click",
            () => {

                if (
                    this.pointClickHandler
                ) {

                    this.pointClickHandler(
                        pointNumber
                    );

                }

            }
        );

        return point;

    }

    renderBoard(board) {

        if (!board) {
            return;
        }

        /*
         * Önce temizle
         */

        document
            .querySelectorAll(
                ".point-pieces"
            )
            .forEach(container => {

                container.innerHTML = "";

            });

        /*
         * 1-24 dolaş
         */

        for (
            let point = 1;
            point <= 24;
            point++
        ) {

            const pointElement =
                document.querySelector(
                    `[data-point="${point}"] .point-pieces`
                );

            if (!pointElement) {
                continue;
            }

            const pieces =
                board.points[point];

            pieces.forEach(piece => {

                const checker =
                    document.createElement(
                        "div"
                    );

                checker.className =
                    `piece ${piece.color}`;

                pointElement.appendChild(
                    checker
                );

            });

        }

    }

    updateBoard(board) {

        this.renderBoard(
            board
        );

    }

    selectPoint(pointNumber) {

        this.clearSelection();

        const point =
            document.querySelector(
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

        document
            .querySelectorAll(
                ".selected"
            )
            .forEach(element => {

                element.classList.remove(
                    "selected"
                );

            });

        this.selectedPoint =
            null;

    }

    highlightMoves(points) {

        this.clearHighlights();

        points.forEach(point => {

            const element =
                document.querySelector(
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

}