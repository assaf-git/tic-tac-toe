function gameBoard() {
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

    // this should go into printBoard??
    // for (i = 0; i < 3; i++) {
    //     console.log(board[i].join(" "));
    // }


    const getBoard = () => board;

    const dropPiece = (cell, player) => {
        const availableCells = board.filter((row) => row[cell]).map(row => row[cell]);

        // const availableCells = () => cell.getValue();


        if (availableCells === "X" || availableCells === "O") return;
        
        // board[cell].addPiece(player);
        board[cell] = player;

    }

    const printBoard = () => {
        // const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        // console.log(boardWithCellValues);
        // console.log(board);
        for (i = 0; i < 3; i++) {
            console.log(board[i].join(" "));
        }
    }

    return {getBoard, dropPiece, printBoard};
}

function cell() {
    let value = 1;

    const addPiece = (player) => {
        value = player;
    };

    const getValue = () => value;
    
    value++;

    return {
        addPiece,
        getValue
    };
}

function gameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
    ) {
    const board = gameBoard();
    const players = [
        {
            name: playerOneName,
            piece: "X"
        },
        {
            name: playerTwoName,
            piece: "O"
        }
    ];

    let activePlayer = players[0];

    let playerMove = 0;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard;
        playerMove = prompt(`${getActivePlayer().name}'s turn.`);
        // console.log(`${getActivePlayer().name}'s turn.`)
        // playRound();
        return playerMove;
    };

    const playRound = () => {
        console.log(`Dropping ${getActivePlayer().name}'s piece into cell ${playerMove}...`);
        board.dropPiece(playerMove, getActivePlayer().piece);

        // win check

        switchPlayerTurn();
        printNewRound();
    };

    printNewRound();
    playRound();

    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

gameController();

// function screenController() {
//     const game = gameController();
//     const playerTurnDiv = document.querySelector(".turn");
//     const boardDiv = document.querySelector(".board");

//     const updateScreen = () => {
//         boardDiv.textContent = "";

//         const board = game.getBoard;
//         const activePlayer = game.getActivePlayer();

//         playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;

//         board.forEach(row => {
//             row.forEach((cell, index) => {
//                 const cellButton = document.createElement("button");
//                 cellButton.classList.add("cell");
//                 cellButton.dataset.cell = index
//                 cellButton.textContent = cell.getValue();
//                 boardDiv.appendChild(cellButton);
//             });
//         });
//     }

//     function clickHandlerBoard(e) {
//         const selectedColumn = e.target.dataset.cell;

//         if (!selectedColumn) return;

//         game.playRound(selectedColumn);
//         updateScreen();
//     }
//     boardDiv.addEventListener("click", clickHandlerBoard);

//     updateScreen();
// }

// screenController();