//BOTH INITIAL DOM LOADING AND TURN-GENERATED DOM UPDATES
import GameController from "./game-controller.js";
import Players from "./players.js";

export function createBoards() {
  const leftPlayerBoard = document.getElementById("leftPlayerBoard");
  const rightPlayerBoard = document.getElementById("rightPlayerBoard");

  //this condition is to invert the dataset.y property for conversion
  for (let i = 9; i >= 0; i--) {
    const leftRow = document.createElement("div");
    leftRow.classList.add("tile", "rows");

    const rightRow = document.createElement("div");
    rightRow.classList.add("tile", "rows");

    leftPlayerBoard.appendChild(leftRow);
    rightPlayerBoard.appendChild(rightRow);

    for (let j = 0; j < 10; j++) {
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

export function updateBoard(player, boardContainer, visible) {
  const gameboard = player.board.getBoard();

  gameboard.forEach((internalRow, internalRowIndex) => {
    internalRow.forEach((tile, columnIndex) => {
      //tile = logical gameboard tile, need to find DOM tile
      const rowInDOM = 9 - internalRowIndex;
      //grab the corresponding tile in the DOM after inverting coordinate
      const tileInDOM = boardContainer.querySelector(
        `[data-y="${rowInDOM}"][data-x="${columnIndex}"]`,
      );

      if (tile.attacked === "unattacked") {
        if (tile.ship === null) {
          tileInDOM.className = "";
          tileInDOM.classList.add("tile", "columns", "waterTile");
        } else {
          if (!visible) {
            //if opponent board, display ship tiles as water tiles.
            tileInDOM.className = "";
            tileInDOM.classList.add("tile", "columns", "waterTile");
          } else {
            //if your board, display ship tiles
            tileInDOM.className = "";
            tileInDOM.classList.add("tile", "columns", "shipTile");
          }
        }
      } else if (tile.attacked === "hit") {
        if(tile.ship.sunk){
          //ASK HERE IF THE SHIP HIT IS SUNK. IF IT'S SUNK, NEW CLASS. .SUNKSHIP
            tileInDOM.className = "";
            tileInDOM.classList.add("tile", "columns", "sunkTile");
          } else{
            tileInDOM.className = "";
            tileInDOM.classList.add("tile", "columns", "hitTile");
            //eventually, update this to add a fire emoji to the tiles content
          }
      } else if (tile.attacked === "miss") {
        tileInDOM.className = "";
        tileInDOM.classList.add("tile", "columns", "missTile");
        //eventually, update this to add a red X emoji to the tiles content
      }
    });
  });
}
