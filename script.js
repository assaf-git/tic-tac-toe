const gameBoard = () => {
    const rows = 3;
    const columns = 3;
    const board = [];
    let k = 1;
        
    for (i = 0; i < rows; i++) {
        board[i] = [];
        for (j = 0; j < columns; j++) {
            board[i].push(k);
            k++
        };
    }

    const dropPiece = (cell, player) => {
        const availableCells = board.filter((row) => row.map((cell) => {cell > 0 || cell <= 9}));

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

    const winCheck = (playerName, playerPiece, playerWinCheck) => {
        // Horizontal check
        if (board[0][0] == playerPiece && board[0][1] == playerPiece && board[0][2] == playerPiece ||
            board[1][0] == playerPiece && board[1][1] == playerPiece && board[1][2] == playerPiece ||
            board[2][0] == playerPiece && board[2][1] == playerPiece && board[2][2] == playerPiece
        ) {
            console.log(`${playerName} wins`);
            return playerWinCheck = true;               
        } 
        // Vertical check
        else if (
            board[0][0] == playerPiece && board[1][0] == playerPiece && board[2][0] == playerPiece ||
            board[0][1] == playerPiece && board[1][1] == playerPiece && board[2][1] == playerPiece ||
            board[0][2] == playerPiece && board[1][2] == playerPiece && board[2][2] == playerPiece
        ) {
            console.log(`${playerName} wins`);
            return playerWinCheck = true;            
        } 
        // Diagonal check
        else if (
            board[0][0] == playerPiece && board[1][1] == playerPiece && board[2][2] == playerPiece ||
            board[0][2] == playerPiece && board[1][1] == playerPiece && board[2][0] == playerPiece 
        ) {
            console.log(`${playerName} wins`);
            return playerWinCheck = true;            
        } 
    }

    return {
        dropPiece,
        printBoard,
        winCheck
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

const gameController = ((
    playerOneName = "Player One",
    playerTwoName = "Player Two"
    ) => {

    const board = gameBoard();
    let previousMove = 0;

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
        playRound();
    }

    const playRound = (cell) => {
        cell = prompt(`${getActivePlayer().name}'s turn.`);
        if (cell === previousMove) {
            cell = prompt("Cell already taken\nMake another move")
            console.log(`Dropping ${getActivePlayer().name}'s token into cell ${cell}...`);
            board.dropPiece(cell, getActivePlayer().piece);
        } else {
            console.log(`Dropping ${getActivePlayer().name}'s token into cell ${cell}...`);
            board.dropPiece(cell, getActivePlayer().piece);
        }
        
        previousMove = cell;

        // win check

        board.winCheck(getActivePlayer().name, getActivePlayer().piece);
        // console.log(board.winCheck(playerWinCheck));

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();
    playRound();
})();