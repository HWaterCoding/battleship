//imports?
import GameController from "./game-controller.js";
import { updateBoard, createBoards } from "./render-board.js";

export default function initApp() {
  const controller = new GameController("John");

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

  //fix bug where I have to click twice to attack
  cpuBoard.addEventListener("click", (event)=>{
    const tile = event.target.closest(".tile");
    try{
      if(!controller.isGameActive){
        throw new Error("You can't attack yet, the game hasn't started!");
      }

      //MAKE SURE IT'S THE PLAYERS TURN FIRST

      const row = Number(tile.dataset.y);
      const col = Number(tile.dataset.x);
      controller.playTurn(row, col);
      updateBoard(controller.players[1], cpuBoard, false);

      //Insert logic for getting CPU coordinates here
      // controller.playTurn(CPUROW, CPUCOL);
      // updateBoard(controller.players[0], p1Board, true);

    } catch (error){
      gameText.textContent = error;
    }
  })

  //general flow for event listener above:
  //1. Human clicks a CPU board tile
  //2. is the activeplayer a human? ---> yes
  //3. call playTurn() with clicked coordinates from UI
  //4. render the CPU's board to update the attacked coordinate
  //5. is the game still active/ is the game over? 
  //6. if game is over, exit game early and deactivate.
  //7. if game is still active, activeplayer will switch to CPU
  //8. call CPU random coordinate generator function
  //9. call playTurn() with randomly generated coordinates
  //10. render the Human board to update the attacked coordinate


}