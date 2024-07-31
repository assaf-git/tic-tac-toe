const gameBoard = () => {
    const rows = 3;
    const columns = 3;
    const board = [];
        
    for (i = 0; i < rows; i++) {
        board[i] = [];
        for (j = 0; j < columns; j++) {
            board[i].push(cell());
        };
    }

    const dropPiece = (cell, player) => {
        const availableCells = board.filter((row) => row.map((cell) => cell.getValue()) === 0).map((row) => row[cell]);
        
        if (!availableCells.length) return;
        
        board[cell].addPiece(player);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    return {
        dropPiece,
        printBoard
    };
}

const cell = () => {
    let value = 0;

    const addPiece = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addPiece,
        getValue
    };
}

const gameController = ((
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) => {

    const board = gameBoard();

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
        console.log(`Dropping ${getActivePlayer().name}'s token into cell ${cell}...`);
        board.dropPiece(cell, getActivePlayer().piece);

        // win check

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();
    playRound();
})();