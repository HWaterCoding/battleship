//imports?
import { getCpuAttack, getCpuShip } from "./cpu-logic.js";
import GameController from "./game-controller.js";
import { updateBoard, createBoards } from "./render-board.js";

export default function initApp() {
  //create new game instance. Change "john" to a username input
  const controller = new GameController("John");

  (function populateCpuBoard(){
    for(let i = 0; i < controller.players[1].board.ships.length - 1; i++){
      const newShip = controller.players[1].board.ships[i];
      const shipPlacements = getCpuShip(controller.players[1].board);
      controller.players[1].board.placeShip(...shipPlacements, newShip);
    }

    console.log(controller.players[1].board);
  })();





  const turnText = document.getElementById("turnText");
  const gameText = document.getElementById("gameText");
  
  const p1Board = document.getElementById("leftPlayerBoard");
  const cpuBoard = document.getElementById("rightPlayerBoard");
  
  


  //START GAME AND RESET GAME BUTTONS
  const startGameBtn = document.getElementById("startGameBtn");
  const resetGameBtn = document.getElementById("resetGameBtn");

  //toggle isGameActive on GameController object and start game
  startGameBtn.addEventListener("click", ()=>{
    //ask if all ships are placed. If not, throw error. Don't allow start.
    // if(){}

    //if all ships are placed, make the game active.
    controller.startGame();
  });

  //reset the game and board structures, then recreate the DOM
  resetGameBtn.addEventListener("click", ()=>{
    controller.resetGame();
    createBoards();
    gameText.textContent = "Place your ships...";
  });




  //place ship form 
  const placeShipBtn = document.getElementById("placeShipBtn");
  const placeShipOverlay = document.getElementById("placeShipOverlay");
  const placeShipForm = document.getElementById("placeShipForm");
  const cancelShipBtn = document.getElementById("cancelShipBtn");
  const placeShipErrorText = document.getElementById("placeShipErrorText");
  const rowCoordInput = document.getElementById("rowCoord");
  const columnCoordInput = document.getElementById("columnCoord");
  const shipDirectionSelect = document.getElementById("shipDirection");
  const shipLengthInput = document.getElementById("shipLength");


  //place ship form event listeners
  //open form btn
  placeShipBtn.addEventListener("click", ()=>{
    placeShipForm.reset();
    placeShipErrorText.textContent = "Place your ship!";
    placeShipOverlay.style.display = "flex";
  })

  //place ship form submission
  placeShipForm.addEventListener("submit", (event)=>{
    try{
      event.preventDefault();
      const ship = controller.players[0].board.ships[shipLengthInput.value - 1];
      controller.players[0].board.placeShip(
        Number(rowCoordInput.value),
        Number(columnCoordInput.value),
        shipDirectionSelect.value,
        ship
      );
      updateBoard(controller.players[0], p1Board, true);
      placeShipOverlay.style.display = "none";
      console.log(controller.players[0].board);
      console.log(controller.players[1].board);
    } catch (error){
      placeShipErrorText.style.color = "red";
      placeShipErrorText.textContent = error;
    }
  })

  //close place ship form 
  cancelShipBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    placeShipOverlay.style.display = "none";
  })




  //BOARD CLICKING EVENT LISTENERS

  const turnDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  cpuBoard.addEventListener("click", async (event)=>{
    const tile = event.target.closest(".tile");
    try{
      if(!controller.isGameActive){
        throw new Error("You can't attack yet, the game hasn't started!");
      }

      //prevent additional human clicks while it is CPU turn
      const row = Number(tile.dataset.y);
      const col = Number(tile.dataset.x);
      controller.playTurn(row, col);
      updateBoard(controller.players[1], cpuBoard, false);

      //check here if the game is over? stuff below code in if()

      await turnDelay(2000);
      //create a rendering function to display during turn delay

      const cpuCoords = getCpuAttack(controller.players[0].board);
      controller.playTurn(...cpuCoords);
      updateBoard(controller.players[0], p1Board, true);

    } catch (error){
      gameText.textContent = error;
    }
  })
}