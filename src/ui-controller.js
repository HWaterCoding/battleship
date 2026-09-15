//imports?
import GameController from "./game-controller.js";
import { updateBoard } from "./render-board.js";

export default function initApp() {
  const controller = new GameController("John");

  const turnText = document.getElementById("turnText");
  const gameText = document.getElementById("gameText");
  const errorText = document.getElementById("errorText");

  const p1Board = document.getElementById("leftPlayerBoard");
  const cpuBoard = document.getElementById("rightPlayerBoard");


  const placeShipBtn = document.getElementById("placeShipBtn");
  const placeShipOverlay = document.getElementById("placeShipOverlay");
  const placeShipForm = document.getElementById("placeShipForm");
  const cancelShipBtn = document.getElementById("cancelShipBtn");

  const rowCoordInput = document.getElementById("rowCoord");
  const columnCoordInput = document.getElementById("columnCoord");
  const shipDirectionSelect = document.getElementById("shipDirection");
  const shipLengthInput = document.getElementById("shipLength");




  //PLAYER 1 PLACING SHIP FORM EVENT LISTENERS
  placeShipBtn.addEventListener("click", ()=>{
    placeShipForm.reset();
    errorText.textContent = "";
    placeShipOverlay.style.display = "flex";
  })

  //player placing ship form
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
      errorText.style.color = "red";
      errorText.textContent = error;
    }
  })

  cancelShipBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    placeShipOverlay.style.display = "none";
  })

}
