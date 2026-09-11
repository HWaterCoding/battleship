//BOTH INITIAL DOM LOADING AND TURN-GENERATED DOM UPDATES
import GameController from "./game-controller.js";
import Players from "./players.js";


export function createBoards(){

    const leftPlayerBoard = document.getElementById("leftPlayerBoard");
    const rightPlayerBoard = document.getElementById("rightPlayerBoard");

    //when creating the board and tile elements, attach the
    //proper index (x, y) of each tile to the element as a 
    //data attribute: (bottom left tile: data-x: 0, data-y: 0)

    for(let i = 9; i >= 0; i--){

        const leftRow = document.createElement("div");
        leftRow.classList.add("tile", "rows");
        leftRow.dataset.y = `y${i}`;

        const rightRow = document.createElement("div");
        rightRow.classList.add("tile", "rows");
        rightRow.dataset.y = `y${i}`;

        leftPlayerBoard.appendChild(leftRow);
        rightPlayerBoard.appendChild(rightRow);
    
        for(let j = 0; j < 10; j++){
            const leftColumn = document.createElement("div");
            leftColumn.classList.add("tile", "columns");
            leftColumn.dataset.x = `x${j}`;
            leftRow.appendChild(leftColumn);

            const rightColumn = document.createElement("div");
            rightColumn.classList.add("tile", "columns");
            rightColumn.dataset.x = `x${j}`;
            rightRow.appendChild(rightColumn);
        }
    }
}

export function updateBoard(board){
    //display both play boards and render using Gameboard class info
}



//The opposing players board has to be invisible. So the computers board
//cannot be visible to the player.

//the "invisible" half of the board will only contain red "x's"
//to indicate incorrect guessses
//AND 
//fire emoji's to indicate correct guesses

//those tiles from contention and become unclickable
