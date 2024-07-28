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