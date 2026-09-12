//BOTH INITIAL DOM LOADING AND TURN-GENERATED DOM UPDATES
import GameController from "./game-controller.js";
import Players from "./players.js";


export function createBoards(){

    const leftPlayerBoard = document.getElementById("leftPlayerBoard");
    const rightPlayerBoard = document.getElementById("rightPlayerBoard");

    //when creating the board and tile elements, attach the
    //proper index (x, y) of each tile to the element as a 
    //data attribute: (bottom left tile: data-x: 0, data-y: 0)

    //this condition is to invert the dataset.y property for conversion
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
    //this function will be called after every playTurn()
    //update board visual based on hit/miss/ship placed, etc...


    //pass in entire gameboard from getBoard() on object
    //forEach loop through all tiles and ask what it's "ship" and "attacked"
    //properties are. Create switch to determine what to display depending on
    //what the current state of the tile that you're iterating on.

    //MAKE SURE TO SPECIFY DIFFERENCE BETWEEN P1 BOARD AND OPPONENT BOARD
    //within the same forEach() function, when investigating "ship" status of a 
    //tile, ask who's board you're on. If it is the CPU board, don't render ship
    //tiles. Only render the missedAttacks and hitAttacks based on attacked: state
}



//The opposing players board has to be invisible. So the computers board
//cannot be visible to the player.

//the "invisible" half of the board will only contain red "x's"
//to indicate incorrect guessses
//AND 
//fire emoji's to indicate correct guesses

//those tiles from contention and become unclickable
