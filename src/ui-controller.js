//imports?
import { CPU, placeCpuShips } from "./cpu-logic.js";
import GameController from "./game-controller.js";
import { updateBoard, createBoards } from "./render-board.js";
import playSound from "./audio.js";

export default function initApp() {
  
  //create new game instance. Change "john" to a username input
  const controller = new GameController("John");
  //create new CPU instance (shift this into game selection logic)
  const computer = CPU();


  //should ONLY be who's turn it is. That's it.
  const turnText = document.getElementById("turnText");

  //should be game instruction/what catches printable errors
  const gameText = document.getElementById("gameText");
  
  //Both physical gameboards
  const p1Board = document.getElementById("leftPlayerBoard");
  const cpuBoard = document.getElementById("rightPlayerBoard");

  //Overlays and Modals logics
  //overlay for all modals
  const modalOverlay = document.getElementById("modalOverlay");

  //Game Selection Modal and logic
  const gameSelectModal = document.getElementById("gameSelectModal");
  const cpuBtn = document.getElementById("cpuBtn");
  const playerVsCpuModal = document.getElementById("playerVsCpuModal");
  const twoPlayerBtn = document.getElementById("twoPlayerBtn");
  const twoPlayerModal = document.getElementById("twoPlayerModal");

  cpuBtn.addEventListener("click", ()=>{
    gameSelectModal.style.display = "none";
    playerVsCpuModal.style.display = "grid";
  });
  
  twoPlayerBtn.addEventListener("click", ()=>{
    gameSelectModal.style.display = "none";
    twoPlayerModal.style.display = "grid";
  });

 


  //Player Vs. CPU mode logic
  const singlePlayerUsername = document.getElementById("singlePlayerUsername");

  const playCpuBtn = document.getElementById("playCpuBtn");
  playCpuBtn.addEventListener("click", ()=>{
    modalOverlay.style.display = "none";
    playerVsCpuModal.style.display = "none";
  });



  //Two-Player mode logic
  const playerOneUsername = document.getElementById("playerOneUsername");
  const playerTwoUsername = document.getElementById("playerTwoUsername");

  const twoPlayerPlayBtn = document.getElementById("twoPlayerPlayBtn");
  twoPlayerPlayBtn.addEventListener("click", ()=>{
    modalOverlay.style.display = "none";
    twoPlayerModal.style.display = "none";
  });



  



  //PLACE SHIP FORM ELEMENTS
  const placeShipBtn = document.getElementById("placeShipBtn");
  const placeShipModal = document.getElementById("placeShipModal");
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
    modalOverlay.style.display = "flex";
    placeShipModal.style.display = "flex";
    shipLengthInput.focus();
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
      playSound("placeShip");
      modalOverlay.style.display = "none";

      gameText.textContent = "";
    } catch (error){
      placeShipErrorText.style.color = "red";
      placeShipErrorText.textContent = error;
    }
  })

  //close place ship form 
  cancelShipBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    modalOverlay.style.display = "none";
  })



  
  
  //START GAME BUTTON AND ACTIVATION
  const startGameBtn = document.getElementById("startGameBtn");
  startGameBtn.addEventListener("click", ()=>{
    try{
      if(controller.isGameActive){
        throw new Error("The game is already active!");
      }

      controller.players[0].gameboard.isFleetPlaced();

      placeCpuShips(controller.players[1].gameboard);

      controller.startGame();
      turnText.textContent = `It is ${controller.players[0].name}'s move!`;
      gameText.textContent = "Pick a square to attack...";
    } catch (error){
      gameText.textContent = error;
    }
  });


  //reset the game and board structures, then recreate the DOM
  const resetGameBtn = document.getElementById("resetGameBtn");
  resetGameBtn.addEventListener("click", ()=>{
    controller.resetGame();
    computer.resetCPU();
    createBoards();
    turnText.textContent = "Place your ships...";
    gameText.textContent = "";
  });


 





  //BOARD CLICKING/ATTACKING EVENT LISTENERS
  const turnDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //Clicking CPU board to play a full turn of both players
  cpuBoard.addEventListener("mousedown", async (event)=>{
    const tile = event.target.closest(".tile");
    try{
      //if the game is not active, ask why (it hasn't started or has ended)
      if(!controller.isGameActive){
        if(controller.winner){
          throw new Error(`This game is over! ${controller.winner.name} has won!`)
        } else {
          throw new Error("You can't attack yet, the game hasn't started!");
        }
      }

      //prevent additional human clicks while it is CPU turn
      if(controller.activePlayer === controller.players[1]){
        throw new Error("It is not your turn. Please wait.");
      }

      //generate human players attack move
      const row = Number(tile.dataset.y);
      const col = Number(tile.dataset.x);
      const attackResult = controller.playTurn(row, col);
      playSound(chooseSound(attackResult));
      updateBoard(controller.players[1], cpuBoard, false);
      
      //if the human move doesn't result in winner, let CPU play.
      if(!controller.winner){
        turnText.textContent = "It is the computers move!";
        gameText.textContent = "Please wait...";

        await turnDelay(2000);
        //create a rendering function to display during turn delay, and call it here

        const cpuCoords = computer.chooseAttack(controller.players[0].gameboard);
        const attackResult = controller.playTurn(...cpuCoords);
        playSound(chooseSound(attackResult));
        updateBoard(controller.players[0], p1Board, true);

        turnText.textContent = `It is ${controller.activePlayer.name}'s move!`; 
        gameText.textContent = "Pick a square to attack...";

        //ask if CPU won to play losing sound
        if(controller.winner){
          gameText.textContent = `The winner is ${controller.winner.name}!`;
          playSound("loss");
        }
      } else {
        gameText.textContent = `The winner is ${controller.winner.name}!`;
        //if human has won, play winning sound
        playSound("win");
      }
    } catch (error){
      gameText.textContent = error;
    }
  })

  //helper function to choose which audio to play after an attack
  function chooseSound(attackResult){
    if(attackResult.attack === "hit"){
      if(attackResult.sunk) return "sunk";
      return "hit";
    } else {
      return "miss";
    } 
  }
}