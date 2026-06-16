// js/app.js

import { GameEngine }
from "./core/gameEngine.js";

import { Board }
from "./core/board.js";

import { DiceManager }
from "./core/dice.js";

import { MoveValidator }
from "./core/moveValidator.js";

import { HistoryManager }
from "./core/history.js";

import { UndoManager }
from "./core/undo.js";

import { BoardUI }
from "./ui/boardUI.js";

/* =========================
   CORE
========================= */

const gameEngine =
    new GameEngine({

        variant: "turkish"

    });

const boardManager =
    new Board("turkish");

const diceManager =
    new DiceManager();

const moveValidator =
    new MoveValidator();

const historyManager =
    new HistoryManager();

const undoManager =
    new UndoManager();

const boardUI =
    new BoardUI("board");

/* =========================
   GAME INIT
========================= */

function initializeGame() {

    const board =
        boardManager.createBoard();

    gameEngine.setBoard(
        board
    );

    boardUI.createBoard();

    boardUI.renderBoard(
        board
    );

    console.log(
        "Türk Tavlası başlatıldı."
    );

    console.log(
        gameEngine.getState()
    );

}

/* =========================
   MENU BUTTONS
========================= */

function setupMenuButtons() {

    const onlineBtn =
        document.getElementById(
            "online-play-btn"
        );

    const aiBtn =
        document.getElementById(
            "ai-play-btn"
        );

    const localBtn =
        document.getElementById(
            "local-play-btn"
        );

    const profileBtn =
        document.getElementById(
            "profile-btn"
        );

    const settingsBtn =
        document.getElementById(
            "settings-btn"
        );

    if (onlineBtn) {

        onlineBtn.addEventListener(
            "click",
            () => {

                showScreen(
                    "online-screen"
                );

            }
        );

    }

    if (aiBtn) {

        aiBtn.addEventListener(
            "click",
            () => {

                showScreen(
                    "ai-screen"
                );

            }
        );

    }

    if (localBtn) {

        localBtn.addEventListener(
            "click",
            () => {

                showScreen(
                    "local-screen"
                );

            }
        );

    }

    if (profileBtn) {

        profileBtn.addEventListener(
            "click",
            () => {

                showScreen(
                    "profile-screen"
                );

            }
        );

    }

    if (settingsBtn) {

        settingsBtn.addEventListener(
            "click",
            () => {

                showScreen(
                    "settings-screen"
                );

            }
        );

    }

}

/* =========================
   BACK BUTTONS
========================= */

function setupBackButtons() {

    document
        .querySelectorAll(
            ".back-btn"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showScreen(
                        "main-menu"
                    );

                }
            );

        });

}

/* =========================
   SCREEN SYSTEM
========================= */

function showScreen(
    screenId
) {

    document
        .querySelectorAll(
            ".screen"
        )
        .forEach(screen => {

            screen.classList.add(
                "hidden"
            );

            screen.classList.remove(
                "active"
            );

        });

    const target =
        document.getElementById(
            screenId
        );

    if (!target) {
        return;
    }

    target.classList.remove(
        "hidden"
    );

    target.classList.add(
        "active"
    );

}

/* =========================
   LOCAL GAME
========================= */

function setupLocalGame() {

    const button =
        document.getElementById(
            "start-local-game"
        );

    if (!button) {
        return;
    }

    button.addEventListener(
        "click",
        () => {

            showScreen(
                "game-screen"
            );

            boardUI.renderBoard(
                gameEngine.getBoard()
            );

        }
    );

}

/* =========================
   BOARD EVENTS
========================= */

function setupBoardEvents() {

    boardUI.setPointClickHandler(
        pointNumber => {

            console.log(
                "Tıklanan hane:",
                pointNumber
            );

        }
    );

}

/* =========================
   START
========================= */

document
    .addEventListener(
        "DOMContentLoaded",
        () => {

            initializeGame();

            setupMenuButtons();

            setupBackButtons();

            setupLocalGame();

            setupBoardEvents();

        }
    );

/* =========================
   DEBUG
========================= */

window.gameEngine =
    gameEngine;

window.boardManager =
    boardManager;

window.diceManager =
    diceManager;

window.moveValidator =
    moveValidator;

window.historyManager =
    historyManager;

window.undoManager =
    undoManager;