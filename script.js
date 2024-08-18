const gameBoard = () => {
    const rows = 3;
    const columns = 3;
    const board = [];
    let k = 0;
        
    for (i = 0; i < rows; i++) {
        board[i] = [];
        for (j = 0; j < columns; j++) {
            board[i].push(k);
            k++;
        };
    }

    // may be able to simplify to board
    // change to getBoard
    const sendBoard = () => {
        return newBoard = board;
    }

    const dropPiece = (cell, player) => {
        const availableCells = board.filter((row) => row.map((cell) => {cell > 0 || cell <= 9})); // may have to switch filter and map

        availableCells.forEach((row) => {
            row.forEach((item, index, array) => {
                if (item === Number(cell)) {
                    array[index] = player;
                }
            })
        });
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell));

        for (i = 0; i < 3; i++) {
            console.log(boardWithCellValues[i]);
        }
    }

    // may be irrelevant
    const getValue = (player) => {
        value = player;
    }

    return {
        sendBoard,
        dropPiece,
        printBoard,
        getValue
    };
}

// const cell = () => {
//     let value = 1;

//     const addPiece = (player) => {
//         value = player;
//     }

//     const getValue = () => value;

//     return {
//         addPiece,
//         getValue
//     };
// }

const gameController = (
    playerOneName = "Player One",
    playerTwoName = "Player Two"
    ) => {

    const board = gameBoard();
    let previousMove = 0;
    newBoard = [];
    turnCounter = 0;
    let playerWinCheck = false;

    const players   = [
        {
            name: playerOneName,
            piece: "X"
        },
        {
            name: playerTwoName,
            piece:"O"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
        // playRound();
    }

    const playRound = (selectedCell) => {
        turnCounter++;
        cell = selectedCell;
        // cell = prompt(`${getActivePlayer().name}'s turn.`);
        if (cell === previousMove) {
            cell = prompt("Cell already taken\nMake another move")
            console.log(`Dropping ${getActivePlayer().name}'s token into cell ${cell}...`);
            board.dropPiece(cell, getActivePlayer().piece);
            board.getValue(getActivePlayer().piece); // may be irrelevant
        } else {
            console.log(`Dropping ${getActivePlayer().name}'s token into cell ${cell}...`);
            board.dropPiece(cell, getActivePlayer().piece);
            board.getValue(getActivePlayer().piece); // may be irrelevant
        }
        previousMove = cell;

        board.sendBoard();
        // win check
        // Horizontal check
        if (newBoard[0][0] == getActivePlayer().piece && newBoard[0][1] == getActivePlayer().piece && newBoard[0][2] == getActivePlayer().piece ||
            newBoard[1][0] == getActivePlayer().piece && newBoard[1][1] == getActivePlayer().piece && newBoard[1][2] == getActivePlayer().piece ||
            newBoard[2][0] == getActivePlayer().piece && newBoard[2][1] == getActivePlayer().piece && newBoard[2][2] == getActivePlayer().piece
        ) {
            playerWinCheck = true;
        } 
        // Vertical check
        else if (
            newBoard[0][0] == getActivePlayer().piece && newBoard[1][0] == getActivePlayer().piece && newBoard[2][0] == getActivePlayer().piece ||
            newBoard[0][1] == getActivePlayer().piece && newBoard[1][1] == getActivePlayer().piece && newBoard[2][1] == getActivePlayer().piece ||
            newBoard[0][2] == getActivePlayer().piece && newBoard[1][2] == getActivePlayer().piece && newBoard[2][2] == getActivePlayer().piece
        ) {
            playerWinCheck = true;            
        } 
        // Diagonal check
        else if (
            newBoard[0][0] == getActivePlayer().piece && newBoard[1][1] == getActivePlayer().piece && newBoard[2][2] == getActivePlayer().piece ||
            newBoard[0][2] == getActivePlayer().piece && newBoard[1][1] == getActivePlayer().piece && newBoard[2][0] == getActivePlayer().piece 
        ) {
            playerWinCheck = true;            
        } 

        if (turnCounter == 9) {
            for (i = 0; i < 3; i++) {
                console.log(newBoard[i]);
            }
            console.log("It's a tie.");
            console.log("Game Over");
            return;
        } else if (playerWinCheck === false) {
            switchPlayerTurn();
            printNewRound();
        } else if (playerWinCheck === true) {
            for (i = 0; i < 3; i++) {
                console.log(newBoard[i]);
            }
            console.log(`${getActivePlayer().name} wins`);
            console.log("Game Over");
            return;
        }
    }

    const getWinCheck = () => playerWinCheck

    // printNewRound();

    // check returned functions
    return {
        getActivePlayer,
        printNewRound,
        playRound,
        sendBoard: board.sendBoard,
        getValue: board.getValue,
        getWinCheck
    }
}

const screenController = (() => {
    const game = gameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    console.log(game.getWinCheck());

    const board = game.sendBoard();

    const updateScreen = () => {
        boardDiv.textContent = "";
        // const board = game.sendBoard();
        const activePlayer = game.getActivePlayer();

        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        board.forEach(row => {
            row.forEach((cell, index) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');

                // cellButton.dataset.cell = index;
                cellButton.textContent =  cell;
                if (cell >= 0 && cell <= 8) {
                    cellButton.style.fontSize = 0;
                }

                boardDiv.appendChild(cellButton);
            })
        })
    }

    const clickHandlerBoard = (() => {
        boardDiv.addEventListener('click', (e) => {
            
            // this may be needed once numbers get removed from board
            // const selectedCell = e.target.dataset.cell;

            const selectedCell = e.target.innerText;

            console.log(selectedCell);
            // if (!selectedCell) return;
            game.printNewRound();
            game.playRound(selectedCell);
            updateScreen();
        });
    })();

    updateScreen();

    // game.playRound();
    
})();