// js/ui/boardUI.js

export class BoardUI {

    constructor(boardElementId = "board") {

        this.boardElement =
            document.getElementById(
                boardElementId
            );

        this.pointClickHandler =
            null;

        this.highlightedPoints =
            [];

        this.selectedPoint =
            null;

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

        const board =
            document.createElement("div");

        board.className =
            "backgammon-board";

        /*
         * ÜST SATIR
         */

        const topRow =
            document.createElement("div");

        topRow.className =
            "board-row";

        /*
         * ALT SATIR
         */

        const bottomRow =
            document.createElement("div");

        bottomRow.className =
            "board-row";

        /*
         * ÜST SOL
         * 13-18
         */

        topRow.appendChild(

            this.createQuadrant(
                [13,14,15,16,17,18],
                "top"
            )

        );

        /*
         * ORTA BAR
         */

        topRow.appendChild(
            this.createCenterBar()
        );

        /*
         * ÜST SAĞ
         * 19-24
         */

        topRow.appendChild(

            this.createQuadrant(
                [19,20,21,22,23,24],
                "top"
            )

        );

        /*
         * ALT SOL
         * 12-7
         */

        bottomRow.appendChild(

            this.createQuadrant(
                [12,11,10,9,8,7],
                "bottom"
            )

        );

        bottomRow.appendChild(
            this.createCenterBar()
        );

        /*
         * ALT SAĞ
         * 6-1
         */

        bottomRow.appendChild(

            this.createQuadrant(
                [6,5,4,3,2,1],
                "bottom"
            )

        );

        board.appendChild(
            topRow
        );

        board.appendChild(
            bottomRow
        );

        const bearOff =
            document.createElement("div");

        bearOff.className =
            "bearoff-zone";

        board.appendChild(
            bearOff
        );

        this.boardElement.appendChild(
            board
        );

    }

    createCenterBar() {

        const bar =
            document.createElement("div");

        bar.className =
            "center-bar";

        return bar;

    }

    createQuadrant(
        points,
        side
    ) {

        const quadrant =
            document.createElement("div");

        quadrant.className =
            "quadrant";

        points.forEach(point => {

            quadrant.appendChild(

                this.createPoint(
                    point,
                    side
                )

            );

        });

        return quadrant;

    }

    createPoint(
        pointNumber,
        side
    ) {

        const point =
            document.createElement("div");

        point.className =
            `point ${side}`;

        point.dataset.point =
            pointNumber;

        const number =
            document.createElement("div");

        number.className =
            "point-number";

        number.textContent =
            pointNumber;

        const container =
            document.createElement("div");

        container.className =
            "checker-container";

        point.appendChild(number);

        point.appendChild(
            container
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

        document
            .querySelectorAll(
                ".checker-container"
            )
            .forEach(container => {

                container.innerHTML =
                    "";

            });

        for (
            let point = 1;
            point <= 24;
            point++
        ) {

            const pointContainer =
                document.querySelector(

                    `[data-point="${point}"] .checker-container`

                );

            if (
                !pointContainer
            ) {
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
                    `checker ${piece.color}`;

                pointContainer.appendChild(
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

            this.highlightedPoints.push(
                element
            );

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