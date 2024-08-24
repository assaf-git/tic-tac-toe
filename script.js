const gameBoard = () => {
    const rows = 3;
    const columns = 3;
    const board = [];
    let k = 0;
    
    // 2D array loop
    for (i = 0; i < rows; i++) {
        board[i] = [];
        for (j = 0; j < columns; j++) {
            board[i].push(k); // Allocates numbers to cells
            k++;
        }
    }

    // Sends board array
    const getBoard = () => newBoard = board;

    // Allocates player's piece to chosen cell
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

    // Prints updates board array
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
    // Creates gameBoard function variable and executes gameBoard factory function
    const board = gameBoard(); 
    
    let gameStatus;
    turnCounter = 0;
    let playerWinCheck = false;
    let playerTieCheck = false;

    // Creates array of player details
    const players = [
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

    // Switches current player
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    // Sends current player
    const getActivePlayer = () => activePlayer;

    // Prints updated board array of each round
    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }


    const playRound = (cell) => {
        // Checks if player selection already contains a player value
        if (cell === "X" || cell === "O") { 
            console.log("Cell already taken\nMake another move");
            return gameStatus = "Cell already taken\nMake another move";
            // return;
        } // Checks if player selection is a valid move
        else if (cell.length > 1) { 
            console.log("Invalid move\nTry again");
            return gameStatus = "Invalid move\nTry again";
        } // Executes player selection
        else { 
            console.log(`Dropping ${getActivePlayer().name}'s token into cell ${cell}...`);
            board.dropPiece(cell, getActivePlayer().piece);
            gameStatus = "";
        }

        // Brings board array in current function scope
        board.getBoard();

        // Checks for horizontal win
        if (newBoard[0][0] == getActivePlayer().piece && newBoard[0][1] == getActivePlayer().piece && newBoard[0][2] == getActivePlayer().piece ||
            newBoard[1][0] == getActivePlayer().piece && newBoard[1][1] == getActivePlayer().piece && newBoard[1][2] == getActivePlayer().piece ||
            newBoard[2][0] == getActivePlayer().piece && newBoard[2][1] == getActivePlayer().piece && newBoard[2][2] == getActivePlayer().piece
        ) {
            playerWinCheck = true;
        } 
        // Checks for vertical win
        else if (
            newBoard[0][0] == getActivePlayer().piece && newBoard[1][0] == getActivePlayer().piece && newBoard[2][0] == getActivePlayer().piece ||
            newBoard[0][1] == getActivePlayer().piece && newBoard[1][1] == getActivePlayer().piece && newBoard[2][1] == getActivePlayer().piece ||
            newBoard[0][2] == getActivePlayer().piece && newBoard[1][2] == getActivePlayer().piece && newBoard[2][2] == getActivePlayer().piece
        ) {
            playerWinCheck = true;            
        } 
        // Checks for diagonal win
        else if (
            newBoard[0][0] == getActivePlayer().piece && newBoard[1][1] == getActivePlayer().piece && newBoard[2][2] == getActivePlayer().piece ||
            newBoard[0][2] == getActivePlayer().piece && newBoard[1][1] == getActivePlayer().piece && newBoard[2][0] == getActivePlayer().piece 
        ) {
            playerWinCheck = true;            
        } 
        // Checks for tie
        else {
            turnCounter++;
            if (turnCounter == 9) {
                for (i = 0; i < 3; i++) {
                    console.log(newBoard[i]);
                }
                console.log("It's a tie.");
                console.log("Game Over");
                playerTieCheck = true;
                return gameStatus = "It's a tie.";
            }
        } 
        
        // Identifies no winner yet
        // Switches players & updates round
        if (playerWinCheck === false) {
            switchPlayerTurn();
            printNewRound();
        } // Identifies winner and ends function execution
        else if (playerWinCheck === true) {
            for (i = 0; i < 3; i++) {
                console.log(newBoard[i]);
            }
            console.log(`${getActivePlayer().name} wins`);
            console.log("Game Over");
            return gameStatus = `${getActivePlayer().name} wins`;
        } 
    }

    // Sends game status variable
    const getGameStatus = () => gameStatus;

    // Sends win check variable
    const getWinCheck = () => playerWinCheck;

    // Sends tie check variable
    const getTieCheck = () => playerTieCheck;

    return {
        getActivePlayer,
        printNewRound,
        playRound,
        getBoard: board.getBoard,
        getGameStatus,
        getWinCheck,
        getTieCheck
    };
}

const screenController = (() => {
    const boardDiv = document.querySelector('.board');
    const playerTurnDiv = document.querySelector('.turn');
    const gameStatusDiv = document.querySelector('.game-status');

    // Creates gameController function variable and executes gameBoard factory function
    const game = gameController();
    // Brings board array into current function
    const board = game.getBoard();

    let gameStatusTimer;

    // Refreshes board with updated selection
    const updateScreen = () => {
        boardDiv.textContent = "";
        const activePlayer = game.getActivePlayer();
        if (game.getWinCheck() === true || game.getTieCheck() === true) {
            playerTurnDiv.textContent = "";    
        } else {
            playerTurnDiv.textContent = `${activePlayer.name}'s turn...`; // Displays current player's name
        }
        gameStatusDiv.textContent = game.getGameStatus(); // Displays current game status
        gameStatusTimer = setTimeout(() => { // Sets game status timeout
            gameStatusDiv.textContent = "";
        }, 3000);

        // Creates button element for each cell
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

    // Adds event listener to board
    const clickHandlerBoard = (() => {
        boardDiv.addEventListener('click', (e) => {
            
            // Clears timeout of game status display
            clearTimeout(gameStatusTimer);

            // Stops event listener once game over
            if (game.getWinCheck() === true || game.getTieCheck() === true) return;

            // 'Sees' selected cell
            const selectedCell = e.target.innerText;

            game.playRound(selectedCell);
            updateScreen();
        });
    })();

    updateScreen();

})();