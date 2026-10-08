//imports?
import { CPU, placeCpuShips } from "./cpu-logic.js";
import GameController from "./game-controller.js";
import { updateBoard, createBoards } from "./render-board.js";
import playSound from "./audio.js";

export default function initApp() {
  
  //variables for GameController and CPU instances
  let controller;
  let computer;


  //should ONLY be who's turn it is. That's it.
  const turnText = document.getElementById("turnText");

  //should be game instruction/what catches printable errors
  const gameText = document.getElementById("gameText");
  
  //Both physical gameboards and titles
  const playerOneBoard = document.getElementById("leftPlayerBoard");
  const playerOneName = document.getElementById("playerOneName");

  const playerTwoBoard = document.getElementById("rightPlayerBoard");
  const playerTwoName = document.getElementById("playerTwoName");

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

 


 

  //call gameController instance passing in two objects.
  //object one is humanplayer with a username and a type=human
  //object two is a CPU, who's name is "Computer" and type=computer
  //create CPU instance 

  //Player Vs. CPU mode logic
  const singlePlayerUsername = document.getElementById("singlePlayerUsername");
  const playCpuBtn = document.getElementById("playCpuBtn");

  playCpuBtn.addEventListener("click", ()=>{
    modalOverlay.style.display = "none";
    playerVsCpuModal.style.display = "none";

    playerOneName.textContent = singlePlayerUsername.value ? 
      `${singlePlayerUsername.value}'s Board` : "Player 1's Board";
    playerTwoName.textContent = "CPU's Board";

    controller = new GameController([
      { 
        name: singlePlayerUsername.value ? singlePlayerUsername.value : "Player 1", 
        type: "human" 
      },
      { 
        name: "CPU", 
        type: "computer"
      }
    ]);

    computer = CPU();
  }); 



  

  //call gameController instance passing in two objects.
  //object one is humanplayer with a username and a type=human
  //object two is humanplayer with a username and a type=human

  //Two-Player mode logic
  const playerOneUsername = document.getElementById("playerOneUsername");
  const playerTwoUsername = document.getElementById("playerTwoUsername");
  const twoPlayerPlayBtn = document.getElementById("twoPlayerPlayBtn");

  twoPlayerPlayBtn.addEventListener("click", ()=>{
    modalOverlay.style.display = "none";
    twoPlayerModal.style.display = "none";

    controller = new GameController([
      { 
        name: playerOneUsername.value ? playerOneUsername.value : "Player 1", 
        type: "human" 
      },
      { 
        name: playerTwoUsername.value ? playerTwoUsername.value : "Player 2", 
        type: "human" 
      }
    ]);

    playerOneName.textContent = `${controller.players[0].name}'s Board`;
    playerTwoName.textContent = `${controller.players[1].name}'s Board`;
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
      updateBoard(controller.players[0], playerOneBoard, true);
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

      //ensure both players have placed all of their ships
      // controller.players[0].gameboard.isFleetPlaced();
      // controller.players[1].gameboard.isFleetPlaced();

      //if CPU mode, generate ship placements for the computer
      if(controller.players[1].type === "computer"){
        placeCpuShips(controller.players[1].gameboard);
      }

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
    if(controller.players[1].type === "computer") computer.resetCPU();
    createBoards();
    turnText.textContent = "Place your ships...";
    gameText.textContent = "";
  });


 





  //UPGRADE: Keep this largely the same but refactor for 2 player mode
  //simply ask before getting to the CPU's logic, if the player type of player 2
  //is a CPU. If it is, then execute the CPU logic, if it isn't, then exit early
  //Under this, create an additional event listener on player 1's board to handle
  //player 2's clicks and how they will attack themselves. 
  //make sure neither human player can click the others board if not their turn

  //BOARD CLICKING/ATTACKING EVENT LISTENERS


  function handleBoardClick(event){
    //if the game is not active, ask why (it hasn't started or has ended)
    if(!controller.isGameActive){
      if(controller.winner){
        throw new Error(`This game is over! ${controller.winner.name} has won!`)
      } else {
        throw new Error("You can't attack yet, the game hasn't started!");
      }
    }

    //generate the coordinates for the players attack and return the result
    const tile = event.target.closest(".tile");
    const row = Number(tile.dataset.y);
    const col = Number(tile.dataset.x);
    const attackResult = controller.playTurn(row, col);
    playSound(chooseSound(attackResult));
  }





  playerOneBoard.addEventListener("mousedown", (event)=>{
    try{
      if(controller.players[1].type === "computer") return;

      //prevent board clicks when it is not the players turn
      if(controller.activePlayer === controller.players[0]){
        throw new Error("It is not your turn. Please wait.");
      }

      //process the attack and update the board accordingly
      handleBoardClick(event);
      updateBoard(controller.players[0], playerOneBoard, false);

      //ask if the attack was a winning move.
      if(controller.winner){
        gameText.textContent = `The winner is ${controller.winner.name}!`;
        playSound("win"); //should I play a win/lose sound if 2 player?
        //display game over modal
      } else{
        turnText.textContent = `It is ${controller.activePlayer.name}'s move!`; 
        gameText.textContent = "Pick a square to attack...";
        //put up a privacy barrier here! (opaque overlay)
      }
    } catch(error) {
      gameText.textContent = error;
    }
  });




  const turnDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //Clicking CPU board to play a full turn of both players
  playerTwoBoard.addEventListener("mousedown", async (event)=>{
    try{
      //prevent board clicks when it is not the players turn
      if(controller.activePlayer === controller.players[1]){
        throw new Error("It is not your turn. Please wait.");
      }

      //process the attack and update the board accordingly
      handleBoardClick(event);
      updateBoard(controller.players[1], playerTwoBoard, false);
      
      //If player 1 didn't win and player 2 is a CPU, generate CPU attack
      if(!controller.winner && controller.players[1].type === "computer"){
        turnText.textContent = "It is the computers move!";
        gameText.textContent = "Please wait...";

        await turnDelay(2000);

        const cpuCoords = computer.chooseAttack(controller.players[0].gameboard);
        const attackResult = controller.playTurn(...cpuCoords);
        playSound(chooseSound(attackResult));
        updateBoard(controller.players[0], playerOneBoard, true);

        turnText.textContent = `It is ${controller.activePlayer.name}'s move!`; 
        gameText.textContent = "Pick a square to attack...";

        //ask if CPU won to play losing sound
        if(controller.winner){
          gameText.textContent = `The winner is ${controller.winner.name}!`;
          playSound("loss");
        }
      } else if (!controller.winner && controller.players[1].type === "human"){
        //switch over to player 2 attack and do nothing
        turnText.textContent = `It is ${controller.activePlayer.name}'s move!`; 
        gameText.textContent = "Pick a square to attack...";
        //put up a privacy barrier here! (opaque overlay)
      } else if(controller.winner && controller.players[1].type === "human") {
        //Ask if there's a winner and display the correct winner
        gameText.textContent = `The winner is ${controller.winner.name}!`;
        playSound("win"); //should I play a win/lose sound if 2 player?
        //display game over modal
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