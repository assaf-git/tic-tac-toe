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
        }
    }

    const getBoard = () => newBoard = board;

    const dropPiece = (cell, player) => {
        const availableCells = board.filter((row) => row.map((cell) => cell));

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

    return {
        getBoard,
        dropPiece,
        printBoard
    };
}

const gameController = (
    playerOneName = "Player One",
    playerTwoName = "Player Two"
    ) => {

    const board = gameBoard();
    // newBoard = [];
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
    }

    const playRound = (cell) => {
        if (cell === "X" || cell === "O") {
            console.log("Cell already taken\nMake another move");
            return;
        } else if (cell.length > 1) {
            console.log("Invalid move\nTry again");
            return;
        } else {
            console.log(`Dropping ${getActivePlayer().name}'s token into cell ${cell}...`);
            board.dropPiece(cell, getActivePlayer().piece);
        }

        board.getBoard();

        // Horizontal win check
        if (newBoard[0][0] == getActivePlayer().piece && newBoard[0][1] == getActivePlayer().piece && newBoard[0][2] == getActivePlayer().piece ||
            newBoard[1][0] == getActivePlayer().piece && newBoard[1][1] == getActivePlayer().piece && newBoard[1][2] == getActivePlayer().piece ||
            newBoard[2][0] == getActivePlayer().piece && newBoard[2][1] == getActivePlayer().piece && newBoard[2][2] == getActivePlayer().piece
        ) {
            playerWinCheck = true;
        } 
        // Vertical win check
        else if (
            newBoard[0][0] == getActivePlayer().piece && newBoard[1][0] == getActivePlayer().piece && newBoard[2][0] == getActivePlayer().piece ||
            newBoard[0][1] == getActivePlayer().piece && newBoard[1][1] == getActivePlayer().piece && newBoard[2][1] == getActivePlayer().piece ||
            newBoard[0][2] == getActivePlayer().piece && newBoard[1][2] == getActivePlayer().piece && newBoard[2][2] == getActivePlayer().piece
        ) {
            playerWinCheck = true;            
        } 
        // Diagonal win check
        else if (
            newBoard[0][0] == getActivePlayer().piece && newBoard[1][1] == getActivePlayer().piece && newBoard[2][2] == getActivePlayer().piece ||
            newBoard[0][2] == getActivePlayer().piece && newBoard[1][1] == getActivePlayer().piece && newBoard[2][0] == getActivePlayer().piece 
        ) {
            playerWinCheck = true;            
        } 
        // Tie check
        else {
            turnCounter++;
            if (turnCounter == 9) {
                for (i = 0; i < 3; i++) {
                    console.log(newBoard[i]);
                }
                console.log("It's a tie.");
                console.log("Game Over");
                return;
                // ** THIS
                // return tieWinCheck = true;
            }
        } 
        
        if (playerWinCheck === false) {
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

    // ** THIS
    // const getWinCheck = () => playerWinCheck

    // check returned functions
    return {
        getActivePlayer,
        printNewRound,
        playRound,
        getBoard: board.getBoard,
        // getWinCheck
    };
}

const screenController = (() => {
    const game = gameController();
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const board = game.getBoard();

    const updateScreen = () => {
        boardDiv.textContent = "";
        const activePlayer = game.getActivePlayer();
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

        board.forEach(row => {
            row.forEach((cell, index) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
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
            
            // ** THIS
            // if (playerWinCheck === true || tieWinCheck === true) return;

            const selectedCell = e.target.innerText;

            // console.log(selectedCell);
            game.playRound(selectedCell);
            updateScreen();
        });
    })();

    updateScreen();

})();