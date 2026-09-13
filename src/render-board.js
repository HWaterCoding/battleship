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

        const rightRow = document.createElement("div");
        rightRow.classList.add("tile", "rows");

        leftPlayerBoard.appendChild(leftRow);
        rightPlayerBoard.appendChild(rightRow);
    
        for(let j = 0; j < 10; j++){
            const leftColumn = document.createElement("div");
            leftColumn.classList.add("tile", "waterTile", "columns");
            leftColumn.dataset.x = `${j}`;
            leftColumn.dataset.y = `${i}`;

            leftRow.appendChild(leftColumn);

            const rightColumn = document.createElement("div");
            rightColumn.classList.add("tile", "waterTile", "columns");
            rightColumn.dataset.x = `${j}`;
            rightColumn.dataset.y = `${i}`;
            rightRow.appendChild(rightColumn);
        }
    }
}


//pass in which player, which board, and coordinates.
export function updateBoard(player, boardContainer, visible){
    const gameboard = player.board.getBoard();

    gameboard.forEach((internalRow, internalRowIndex)=>{
        internalRow.forEach((tile, columnIndex)=>{
            //tile = logical gameboard tile, need to find DOM tile
            const rowInDOM = 9 - internalRowIndex;
            //grab the corresponding tile in the DOM after inverting coordinate
            const tileInDOM = boardContainer.querySelector(`[data-y="${rowInDOM}"][data-x="${columnIndex}"]`);

            if(tile.attacked === "unattacked"){
                if(tile.ship === null){
                    //unattacked with no ship (water)
                    tileInDOM.className = "";
                    tileInDOM.classList.add("tile", "columns", "waterTile");
                } else{
                    if(!visible){
                        //if opponent board, display ship tiles as water tiles.
                        tileInDOM.className = "";
                        tileInDOM.classList.add("tile", "columns", "waterTile");
                    } else{
                        //if your board, display ship tiles
                        tileInDOM.className = "";
                        tileInDOM.classList.add("tile", "columns", "shipTile");
                    }
                }
            } else if(tile.attacked === "hit"){
                //if the tile has been attacked and contains a ship
                tileInDOM.className = "";
                tileInDOM.classList.add("tile", "columns", "hitTile");
                //eventually, update this to add a fire emoji to the tiles content
            } else if(tile.attacked === "miss"){
                //if the tile has been attacked but is empty
                tileInDOM.className = "";
                tileInDOM.classList.add("tile", "columns", "missTile");
                //eventually, update this to add a red X emoji to the tiles content
            }
        })
    })
}