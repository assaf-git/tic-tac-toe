const gameBoard = () => {
    const rows = 3;
    const columns = 3;
    const board = [];
    let k = 0;
    
    // Builds 2D array
    const arrayBuilder = () => {
        for (i = 0; i < rows; i++) {
            board[i] = [];
            for (j = 0; j < columns; j++) {
                board[i].push(k); // Allocates numbers to cells
                k++;
            }
        }
        if (k === 9) k = 0; // Resets cell numbering
    };

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
        arrayBuilder,
        getBoard,
        dropPiece,
        printBoard
    };
}

const gameController = (playerOneName, playerTwoName) => {
    // Creates gameBoard function variable and executes gameBoard factory function
    const board = gameBoard(); 
    
    let gameStatus;
    let turnCounter = 0;
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

    // Executes creation of 2d array
    board.arrayBuilder();

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
        
        // Switches players if no winner identified
        if (playerWinCheck === false) {
            switchPlayerTurn();
            printNewRound();
        // Identifies winner and ends function execution
        } else if (playerWinCheck === true) {
            for (i = 0; i < 3; i++) {
                console.log(newBoard[i]);
            }
            console.log(`${getActivePlayer().name} wins`);
            console.log("Game Over");
            return gameStatus = `${getActivePlayer().name} wins`;
        } 
    }

    // Sends & receives game status variable
    const getGameStatus = (arg) => {
        if (arg === undefined) {
            return gameStatus;
        } else {
            return gameStatus = arg;
        }
    }

    // Sends & receives turn counter variable
    const getTurnCounter = (arg) => {
        if (arg === undefined) {
            return turnCounter;
        } else {
            return turnCounter = arg;
        }
    }

    // Sends & receives win check variable
    const getWinCheck = (arg) => {
        if (arg === undefined) {
            return playerWinCheck;
        } else {
            return playerWinCheck = arg;
        }
    }
    // Sends & receives tie check variable
    const getTieCheck = (arg) => {
        if (arg === undefined) {
            return playerTieCheck;
        } else {
            return playerTieCheck = arg;
        }
    }

    return {
        switchPlayerTurn,
        getActivePlayer,
        printNewRound,
        playRound,
        arrayBuilder: board.arrayBuilder,
        getBoard: board.getBoard,
        getGameStatus,
        getTurnCounter,
        getWinCheck,
        getTieCheck
    };
}

const screenController = (() => {
    const boardDiv = document.querySelector('.board');
    const playerTurnDiv = document.querySelector('.turn');
    const gameStatusDiv = document.querySelector('.game-status');
    const restartButton = document.querySelector('.restart');

    // Prompts user/s to input name
    let playerOneInput = prompt("Name?", "Player One");
    let playerTwoInput = prompt("Name?", "Player Two");
    if (playerOneInput === null) playerOneInput = "Player One";
    if (playerTwoInput === null) playerTwoInput = "Player Two";

    // Creates gameController function variable and executes gameBoard factory function
    const game = gameController(playerOneInput, playerTwoInput);
    // Brings board array into current function
    const board = game.getBoard();

    let gameStatusTimer;

    // Refreshes board with updated selection
    const updateScreen = () => {
        winCheck = game.getWinCheck();
        tieCheck = game.getTieCheck();
        boardDiv.textContent = "";
        const activePlayer = game.getActivePlayer();
        // Runs if there is no win & no tie
        if (winCheck === false && tieCheck === false) {
            playerTurnDiv.textContent = `${activePlayer.name}'s turn...`; // Displays current player's name
            gameStatusDiv.textContent = game.getGameStatus(); // Displays current game status
            gameStatusTimer = setTimeout(() => { // Sets game status timeout
                gameStatusDiv.textContent = "";
            }, 3000);
        }  // Runs if there is a win or a tie
        else if (winCheck === true || tieCheck === true) {
            playerTurnDiv.textContent = ""; // Removes display of current player's turn if game over
            gameStatusDiv.textContent = game.getGameStatus(); // Displays current game status
            gameStatusTimer = setTimeout(() => { // Sets game status timeout
                gameStatusDiv.textContent = "";
            }, 3000);
        }

        // Creates button element for each cell
        board.forEach(row => {
            row.forEach((cell) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                cellButton.textContent = cell;
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
            if (winCheck === true || tieCheck === true) {
                return;
            }
            // 'Sees' selected cell
            const selectedCell = e.target.innerText;

            game.playRound(selectedCell);
            updateScreen();
        });
    })();

    restartButton.addEventListener('click', () => {
        board.length = 0;
        game.arrayBuilder();
        game.printNewRound();
        game.switchPlayerTurn();
        game.getGameStatus("");
        game.getTurnCounter(0);
        game.getWinCheck(false);
        game.getTieCheck(false);
        updateScreen();
    })

    updateScreen();

})();