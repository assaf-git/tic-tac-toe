const gameBoard = (() => {
    const rows = 3;
    const columns = 3;
    const board = [];
    
    let k = 1;
    
    for (i = 0; i < rows; i++) {
        board[i] = [];
        for (j = 0; j < columns; j++) {
            board[i].push(k);
            // console.log(k);
            k++;
        };
        console.log(board[i].join(" "));
    }    

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        // const boardWithCellValues = board.map((row) => row.map((cell) => cell.values()));
        // const boardWithCellValues = board.map((row) => row.values());
        console.log(boardWithCellValues);
    }

    // printBoard();

    return {printBoard};
})();

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

})();