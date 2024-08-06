const gameBoard = () => {
    const rows = 3;
    const columns = 3;
    const board = [];
    let k = 1;
    // let executed = false;
        
    for (i = 0; i < rows; i++) {
        board[i] = [];
        for (j = 0; j < columns; j++) {
            board[i].push(k);
            k++
        };
        console.log(board[i]);
    }
    console.log(board);

    const dropPiece = (cell, player) => {
        const availableCells = board.filter((row) => row.map((cell) => cell.getValue()) === 1).map((row) => row[cell]);
        
        // const boardWithCellValues = board.map((row) => row.map((cell) => {
        //     if (cell > 0 || cell <= 9) {

        //     }}));

        console.log(board);
        console.log(availableCells);

        // if (!availableCells.length) return;

        console.log(cell());
        board[cell].addPiece(player);
    }

    const printBoard = () => {
        
        const boardWithCellValues = board.map((row) => row.map((cell) => cell));

        console.log(boardWithCellValues);

        // if (executed === false) {
        //     const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        //     executed = true;
        //     let cellNumber = 0;
        //     boardWithCellValues.forEach(function(item){
        //         item.forEach(function(cell, index, array){
        //             if (cell === 0) {
        //                 array[index] = cellNumber + 1;
        //                 cellNumber++;
        //             }
        //         })         
        //     });
        //     for (let i = 0; i < boardWithCellValues.length; i++) {
        //         console.log(boardWithCellValues[i]);
        //     }
        // } else {
        //     const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        //     console.log(boardWithCellValues);
        // }

        // const initialPrint = (() => {
        //     return (() => {
        //         if (!executed) {
        //             executed = true;
        //             let cellNumber = 0;
        //             boardWithCellValues.forEach(function(item){
        //                 item.forEach(function(cell, index, array){
        //                     if (cell === 0) {
        //                         array[index] = cellNumber + 1;
        //                         cellNumber++;
        //                     }
        //                 })         
        //             });
        //             for (let i = 0; i < boardWithCellValues.length; i++) {
        //                 console.log(boardWithCellValues[i]);
        //             }
        //         }
        //     })();
        // })();

        
    }

    return {
        dropPiece,
        printBoard
    };
}

const cell = () => {
    let value = 1;

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
        playRound();
    }

    const playRound = (cell) => {
        cell = prompt(`${getActivePlayer().name}'s turn.`);
        console.log(`Dropping ${getActivePlayer().name}'s token into cell ${cell}...`);
        board.dropPiece(cell, getActivePlayer().piece);

        // win check

        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();
    playRound();
})();