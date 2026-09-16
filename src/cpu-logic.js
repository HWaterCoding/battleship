//pass in the current gameboard?

export default function getCpuAttack(humanBoard){
    //randomly generate a row number 
    const row = Math.floor(Math.random() * 10);
    //randomly generate a column number 
    const col = Math.floor(Math.random() * 10);

    if(humanBoard.board[row][col].attacked !== "unattacked"){
        return getCpuAttack(humanBoard);
    } else{
        return [row, col];
    }
}