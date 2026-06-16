// js/ui/boardUI.js

export class BoardUI {

    constructor(boardElementId = "board") {

        this.boardElement =
            document.getElementById(
                boardElementId
            );

        this.pointClickHandler = null;

    }

    setPointClickHandler(handler) {

        this.pointClickHandler = handler;

    }

    createBoard() {

        if (!this.boardElement) return;

        this.boardElement.innerHTML = "";

        const boardWrapper =
            document.createElement("div");

        boardWrapper.className =
            "backgammon-board";

        /*
         * ÜST SOL
         * 13-18
         */

        const topLeft =
            this.createQuadrant(
                [13,14,15,16,17,18],
                "top"
            );

        /*
         * ÜST SAĞ
         * 19-24
         */

        const topRight =
            this.createQuadrant(
                [19,20,21,22,23,24],
                "top"
            );

        /*
         * ALT SOL
         * 12-7
         */

        const bottomLeft =
            this.createQuadrant(
                [12,11,10,9,8,7],
                "bottom"
            );

        /*
         * ALT SAĞ
         * 6-1
         */

        const bottomRight =
            this.createQuadrant(
                [6,5,4,3,2,1],
                "bottom"
            );

        const centerBar =
            document.createElement("div");

        centerBar.className =
            "center-bar";

        const upperRow =
            document.createElement("div");

        upperRow.className =
            "board-row";

        upperRow.appendChild(
            topLeft
        );

        upperRow.appendChild(
            centerBar.cloneNode()
        );

        upperRow.appendChild(
            topRight
        );

        const lowerRow =
            document.createElement("div");

        lowerRow.className =
            "board-row";

        lowerRow.appendChild(
            bottomLeft
        );

        lowerRow.appendChild(
            centerBar
        );

        lowerRow.appendChild(
            bottomRight
        );

        boardWrapper.appendChild(
            upperRow
        );

        boardWrapper.appendChild(
            lowerRow
        );

        /*
         * TOPLAMA ALANI
         */

        const bearOff =
            document.createElement("div");

        bearOff.className =
            "bearoff-zone";

        boardWrapper.appendChild(
            bearOff
        );

        this.boardElement.appendChild(
            boardWrapper
        );

    }

    createQuadrant(points, side) {

        const quadrant =
            document.createElement("div");

        quadrant.className =
            "quadrant";

        points.forEach(point => {

            const pointElement =
                document.createElement("div");

            pointElement.className =
                `point ${side}`;

            pointElement.dataset.point =
                point;

            const number =
                document.createElement("span");

            number.className =
                "point-number";

            number.textContent =
                point;

            const checkerContainer =
                document.createElement("div");

            checkerContainer.className =
                "checker-container";

            pointElement.appendChild(
                number
            );

            pointElement.appendChild(
                checkerContainer
            );

            pointElement.addEventListener(
                "click",
                () => {

                    if (
                        this.pointClickHandler
                    ) {

                        this.pointClickHandler(
                            point
                        );

                    }

                }
            );

            quadrant.appendChild(
                pointElement
            );

        });

        return quadrant;

    }

    renderBoard(boardState) {

        if (!boardState) return;

        document
            .querySelectorAll(
                ".checker-container"
            )
            .forEach(container => {

                container.innerHTML = "";

            });

        boardState.points.forEach(
            point => {

                const pointElement =
                    document.querySelector(
                        `[data-point="${point.point}"] .checker-container`
                    );

                if (
                    !pointElement
                ) return;

                for (
                    let i = 0;
                    i < point.count;
                    i++
                ) {

                    const checker =
                        document.createElement(
                            "div"
                        );

                    checker.className =
                        `checker ${point.player}`;

                    pointElement.appendChild(
                        checker
                    );

                }

            }
        );

    }

    highlightMoves(points) {

        this.clearHighlights();

        points.forEach(point => {

            const element =
                document.querySelector(
                    `[data-point="${point}"]`
                );

            if (element) {

                element.classList.add(
                    "possible-move"
                );

            }

        });

    }

    clearHighlights() {

        document
            .querySelectorAll(
                ".possible-move"
            )
            .forEach(element => {

                element.classList.remove(
                    "possible-move"
                );

            });

    }

}