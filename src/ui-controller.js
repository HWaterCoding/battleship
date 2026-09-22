//imports?
import { getCpuAttack, placeCpuShips } from "./cpu-logic.js";
import GameController from "./game-controller.js";
import { updateBoard, createBoards } from "./render-board.js";

export default function initApp() {
  //create new game instance. Change "john" to a username input
  const controller = new GameController("John");


  //should ONLY be who's turn it is. That's it.
  const turnText = document.getElementById("turnText");

  //should be game instruction/what catches printable errors
  const gameText = document.getElementById("gameText");
  
  //Both physical gameboards
  const p1Board = document.getElementById("leftPlayerBoard");
  const cpuBoard = document.getElementById("rightPlayerBoard");
  
  
  //START GAME BUTTON AND ACTIVATION
  const startGameBtn = document.getElementById("startGameBtn");
  startGameBtn.addEventListener("click", ()=>{
    try{
      if(controller.isGameActive){
        throw new Error("The game is already active!");
      }

      //ask is all ships are placed before continuing, if NOT, throw error
      // if(){

      // }
      placeCpuShips(controller.players[1].gameboard);

      controller.startGame();
      turnText.textContent = `It is ${controller.players[0].name}'s move!`;
      gameText.textContent = "Pick a square to attack...";
      console.log(controller.players[1].gameboard);
    } catch (error){
      turnText.textContent = error;
    }
  });


  //reset the game and board structures, then recreate the DOM
  const resetGameBtn = document.getElementById("resetGameBtn");
  resetGameBtn.addEventListener("click", ()=>{
    controller.resetGame();
    createBoards();
    gameText.textContent = "Place your ships...";
  });


  //PLACE SHIP FORM ELEMENTS
  const placeShipBtn = document.getElementById("placeShipBtn");
  const placeShipOverlay = document.getElementById("placeShipOverlay");
  const placeShipForm = document.getElementById("placeShipForm");
  const cancelShipBtn = document.getElementById("cancelShipBtn");
  const placeShipErrorText = document.getElementById("placeShipErrorText");
  const rowCoordInput = document.getElementById("rowCoord");
  const columnCoordInput = document.getElementById("columnCoord");
  const shipDirectionSelect = document.getElementById("shipDirection");
  const shipLengthInput = document.getElementById("shipLength");


  //PLACE SHIP FORM EVENT LISTENERS
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
      const ship = controller.players[0].gameboard.ships[shipLengthInput.value - 1];
      controller.players[0].gameboard.placeShip(
        Number(rowCoordInput.value),
        Number(columnCoordInput.value),
        shipDirectionSelect.value,
        ship
      );
      updateBoard(controller.players[0], p1Board, true);
      placeShipOverlay.style.display = "none";
      console.log(controller.players[0].gameboard);
      console.log(controller.players[1].gameboard);
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





  //BOARD CLICKING/ATTACKING EVENT LISTENERS
  const turnDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //Clicking CPU board to play a full turn of both players
  cpuBoard.addEventListener("click", async (event)=>{
    const tile = event.target.closest(".tile");
    try{
      if(!controller.isGameActive){
        throw new Error("You can't attack yet, the game hasn't started!");
      }

      //prevent additional human clicks while it is CPU turn
      //do so with creating boolean "canPlay" or something
      const row = Number(tile.dataset.y);
      const col = Number(tile.dataset.x);
      controller.playTurn(row, col);
      updateBoard(controller.players[1], cpuBoard, false);
      turnText.textContent = "It is the computers move!";
      gameText.textContent = "Please wait...";

      //check here if the game is over? stuff below code in if()

      await turnDelay(2000);
      //create a rendering function to display during turn delay

      const cpuCoords = getCpuAttack(controller.players[0].gameboard);
      controller.playTurn(...cpuCoords);
      updateBoard(controller.players[0], p1Board, true);
      turnText.textContent = `It is ${controller.activePlayer.name}'s move!`; 
      gameText.textContent = "Pick a square to attack...";
    } catch (error){
      gameText.textContent = error;
    }
  })
}