function gameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (i = 0; i < rows; i++) {
        board[i] = []
        for (j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }

    const getBoards = () => board;

    const dropPiece = (cell, player) => {
        const availableCells = () => board.filter((row) => row[cell].getValue() === 0).map(row => row[cell]);

        if (!availableCells.length) return;
        
        board[cell].addPiece(player);
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    return (getBoards, dropPiece, printBoard);
}
