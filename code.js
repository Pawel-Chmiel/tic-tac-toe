const fieldsElements = document.querySelectorAll(".board__item");
const buttonReset = document.querySelector(".button");
const panelText = document.querySelector(".panel__text");

let fields;
let activePlayer;
let gameActive;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const displayWinMessage = () => {
    panelText.innerText = `Gratulacje graczu ${activePlayer}! Wygrałeś!`;
};

const displayDrawMessage = () => {
    panelText.innerText = "Remis!";
}

const hideWinMessage = () => {
    panelText.innerHTML = "";
}

const validateGame = () => {
    let gameWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [posA, posB, posC] = winningConditions[i];
        const valueA = fields[posA];
        const valueB = fields[posB];
        const valueC = fields[posC];

        if (valueA !== "" && valueA === valueB && valueA === valueC) {
            gameWon = true;
            break;
        }
    }
    if (gameWon) {
        gameActive = false;
        displayWinMessage();
    } else if (isBoardFull()) {
        gameActive = false;
        displayDrawMessage();
    }
};

isBoardFull = () => {
    return fields.find(field => field === "") === undefined;
};

handleItemClick = (e) => {
    const { id } = e.target.dataset;
    if (fields[id] === "" && gameActive) {
        fields[id] = activePlayer;
        e.target.classList.add(`board__item--filled-${activePlayer}`);
        validateGame();
        activePlayer = activePlayer === "x" ? "o" : "x";
    }
};

const initializeGame = () => {
    fields = ["", "", "", "", "", "", "", "", ""];
    activePlayer = "x";
    gameActive = true;
};

const clearPanelText = () => {
    panelText.innerText = "";
};

const resetBoardClasses = () => {
    fieldsElements.forEach(field => {
        field.classList.remove("board__item--filled-x", "board__item--filled-o");
    });
};

const handleClickResetGame = () => {
    initializeGame();
    resetBoardClasses();
    clearPanelText();
};

buttonReset.addEventListener("click", handleClickResetGame);

fieldsElements.forEach(item => {
    item.addEventListener("click", handleItemClick)
});

initializeGame();
