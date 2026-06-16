// js/ui/boardUI.js

export class BoardUI {
    constructor() {
        this.boardElement =
            document.getElementById(
                "board-render-area"
            );

        this.diceElement =
            document.getElementById(
                "dice-area"
            );

        this.highlightedPoints =
            new Set();
    }

    renderBoard(boardState) {
        if (
            !this.boardElement ||
            !boardState ||
            !boardState.points
        ) {
            return;
        }

        this.boardElement.innerHTML = "";

        for (
            let position = 1;
            position <= 24;
            position++
        ) {
            const pointData =
                boardState.points[position];

            const pointElement =
                document.createElement("div");

            pointElement.className =
                "board-point";

            pointElement.dataset.position =
                String(position);

            const label =
                document.createElement("span");

            label.className =
                "board-point__label";

            label.textContent =
                String(position);

            pointElement.appendChild(
                label
            );

            if (
                pointData &&
                pointData.count > 0
            ) {
                for (
                    let i = 0;
                    i < pointData.count;
                    i++
                ) {
                    const checker =
                        document.createElement(
                            "div"
                        );

                    checker.className =
                        `checker checker--${pointData.color}`;

                    checker.dataset.position =
                        String(position);

                    pointElement.appendChild(
                        checker
                    );
                }
            }

            this.boardElement.appendChild(
                pointElement
            );
        }
    }

    renderDice(diceData) {
        if (!this.diceElement) {
            return;
        }

        const diceValues =
            this.diceElement.querySelectorAll(
                ".dice__value"
            );

        if (
            !diceData ||
            !diceValues.length
        ) {
            diceValues.forEach(
                (element) => {
                    element.textContent = "-";
                }
            );

            return;
        }

        if (diceValues[0]) {
            diceValues[0].textContent =
                String(diceData.dieOne);
        }

        if (diceValues[1]) {
            diceValues[1].textContent =
                String(diceData.dieTwo);
        }
    }

    highlightMoves(positions = []) {
        this.clearHighlights();

        positions.forEach((position) => {
            const point =
                this.boardElement.querySelector(
                    `[data-position="${position}"]`
                );

            if (!point) {
                return;
            }

            point.classList.add(
                "board-point--highlight"
            );

            this.highlightedPoints.add(
                point
            );
        });
    }

    clearHighlights() {
        this.highlightedPoints.forEach(
            (point) => {
                point.classList.remove(
                    "board-point--highlight"
                );
            }
        );

        this.highlightedPoints.clear();
    }

    updateBoard(boardState) {
        this.renderBoard(boardState);
    }
}