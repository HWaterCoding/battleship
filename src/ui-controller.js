//imports?
import GameController from "./game-controller.js";
import { updateBoard, createBoards } from "./render-board.js";

export default function initApp() {
  const controller = new GameController("John");

  const turnText = document.getElementById("turnText");
  const gameText = document.getElementById("gameText");
  
  const p1Board = document.getElementById("leftPlayerBoard");
  const cpuBoard = document.getElementById("rightPlayerBoard");
  
  


  //START GAME AND RESET GAME BUTTONS AT TOP OF PAGE

  const startGameBtn = document.getElementById("startGameBtn");
  const resetGameBtn = document.getElementById("resetGameBtn");

  startGameBtn.addEventListener("click", ()=>{

  });


  resetGameBtn.addEventListener("click", ()=>{
    controller.resetGame();
    createBoards();
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
}