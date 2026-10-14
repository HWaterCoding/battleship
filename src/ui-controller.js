//imports?
import { CPU, placeCpuShips } from "./cpu-logic.js";
import GameController from "./game-controller.js";
import { updateBoard, createBoards } from "./render-board.js";
import playSound from "./audio.js";

export default function initApp() {
  
  //variables for GameController, CPU instances, and transition phase
  let controller;
  let computer;
  let placementStage = "Player 1";
  let isTransitioning = false;

  //should ONLY be who's turn it is. That's it.
  const turnText = document.getElementById("turnText");

  //should be game instruction/what catches printable errors
  const gameText = document.getElementById("gameText");
  
  //Both physical gameboards and titles
  const playerOneName = document.getElementById("playerOneName");
  const playerOneBoard = document.getElementById("leftPlayerBoard");

  const playerTwoName = document.getElementById("playerTwoName");
  const playerTwoBoard = document.getElementById("rightPlayerBoard");

  //Overlays and Modals logic
  //overlay for all modals (except privacy screening)
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
    placeCpuShips(controller.players[1].gameboard);

    turnText.textContent = "Place your ships...";
    gameText.textContent = "";
  }); 


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

    turnText.textContent = "Place your ships...";
    gameText.textContent = "";
  });


  //Privacy screen between turns
  const privacyOverlay = document.getElementById("privacyOverlay");
  const privacyScreen = document.getElementById("privacyScreen");
  const privacyTextOne = document.getElementById("privacyText1");
  const privacyTextTwo = document.getElementById("privacyText2");
  const privacyBtn = document.getElementById("privacyBtn");
  privacyBtn.addEventListener("click", ()=>{
    renderPerspective();
    privacyOverlay.style.display = "none";
    privacyScreen.style.display = "none";
    isTransitioning = false;
  });


  //PLACE SHIP FORM ELEMENTS
  const placeShipBtn = document.getElementById("placeShipBtn");
  const confirmShipsBtn = document.getElementById("confirmShipsBtn");
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

  //place ship listener that will work with both player boards
  placeShipForm.addEventListener("submit", (event)=>{
    event.preventDefault();
    try{
      const ship = controller.activePlayer.gameboard.ships[shipLengthInput.value - 1];
      controller.activePlayer.gameboard.placeShip(
        Number(rowCoordInput.value),
        Number(columnCoordInput.value),
        shipDirectionSelect.value,
        ship
      )
      const playerBoard = controller.activePlayer === controller.players[0] ? playerOneBoard : playerTwoBoard;
      updateBoard(controller.activePlayer, playerBoard, true);
      playSound("placeShip");
      modalOverlay.style.display = "none";
      placeShipModal.style.display = "none";
      gameText.textContent = "";
    }catch (error){
      placeShipErrorText.style.color = "red";
      placeShipErrorText.textContent = error;
    }
  })

  //close place ship form 
  cancelShipBtn.addEventListener("click", (event)=>{
    event.preventDefault();
    modalOverlay.style.display = "none";
    placeShipModal.style.display = "none";
  })

  //button to confirm ship placements
  confirmShipsBtn.addEventListener("click", ()=>{
    try{
      controller.activePlayer.gameboard.isFleetPlaced();
      if(placementStage === "Player 1"){
        placementStage = "Player 2";
      } else if (placementStage === "Player 2"){
        placeShipBtn.disabled = true;
        placeShipBtn.style.cursor = "not-allowed";
        placeShipBtn.title = "You've already placed your ships.";
        confirmShipsBtn.disabled = true;
        confirmShipsBtn.style.cursor = "not-allowed";
        confirmShipsBtn.title = "You've already confirmed your ship placements.";
        turnText.textContent = `Both players are ready. Click "Start Game!" to begin.`;
        gameText.textContent = "";
        placementStage = "complete";
      }
      controller.switchPlayers();
      displayPrivacy();
    } catch (error) {
      gameText.textContent = error;
    }
  });

  
  //START GAME BUTTON AND ACTIVATION
  const startGameBtn = document.getElementById("startGameBtn");
  startGameBtn.addEventListener("click", ()=>{
    try{
      if(controller.isGameActive){
        throw new Error("The game is already active!");
      }
      if(placementStage !== "complete") throw new Error("All ships must be placed and confirmed");

      //ensure both players have placed all of their ships
      controller.players[0].gameboard.isFleetPlaced();
      controller.players[1].gameboard.isFleetPlaced();

      controller.startGame();
      turnText.textContent = `It is ${controller.players[0].name}'s move!`;
      gameText.textContent = "Pick a square to attack...";
    } catch (error){
      gameText.textContent = error;
    }
  });


  //reset the game to current game mode (for middle of game if needed)
  const resetGameBtn = document.getElementById("resetGameBtn");
  resetGameBtn.addEventListener("click", ()=>{
    controller.resetGame();
    if(controller.players[1].type === "computer") computer.resetCPU();
    createBoards();
    placementStage = "Player 1";
    turnText.textContent = "Place your ships...";
    gameText.textContent = "";
  });


  //restart the game from the winning screen modal and re-select game mode
  const gameOverModal = document.getElementById("gameOverModal");
  const gameResultText = document.getElementById("gameResultText");
  const restartGameBtn = document.getElementById("restartGameBtn");
  restartGameBtn.addEventListener("click", ()=>{
    controller.resetGame();
    if(controller.players[1].type === "computer") computer.resetCPU();
    createBoards();
    gameOverModal.style.display = "none";
    gameSelectModal.style.display = "grid";
  });


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

    return attackResult;
  }


  async function displayPrivacy(){
    isTransitioning = true;

    if(controller.isGameActive){
      await turnDelay(2000);
      turnText.textContent = `It is ${controller.activePlayer.name}'s move!`; 
    }

    privacyOverlay.style.display = "flex";
    privacyScreen.style.display = "flex";
    privacyTextOne.textContent = `Please pass the screen to ${controller.activePlayer.name}`;
    privacyTextTwo.textContent = `Make sure ${controller.getOpponent().name} cannot see the board!`;
  }


  //Player 1's board (Player 2's attacks)
  playerOneBoard.addEventListener("mousedown", async (event)=>{
    try{
      //if in transition phase, or is CPU game, do nothing.
      if(controller.players[1].type === "computer" || isTransitioning) return;

      //Prevent clicking your own board
      if(controller.activePlayer === controller.players[0])return;

      //process the attack and update the board accordingly
      handleBoardClick(event);
      updateBoard(controller.players[0], playerOneBoard, false);
      
      //ask if the attack was a winning move.
      if(controller.winner){
        playSound("win");
        modalOverlay.style.display = "flex";
        gameOverModal.style.display = "flex";
        gameResultText.textContent = `The winner is ${controller.winner.name}!`;
      } else{
        gameText.textContent = "Pick a square to attack...";
        displayPrivacy();
      }
    } catch(error) {
      gameText.textContent = error;
    }
  });


  //Turn delay function for CPU turn
  const turnDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //Player 1's attacks on Player 2's board, and CPU attacks against Player 1
  playerTwoBoard.addEventListener("mousedown", async (event)=>{
    try{
      if(isTransitioning) return;

      //Prevent clicking your own board
      if(controller.activePlayer === controller.players[1]) return;

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
        renderPerspective();

        //ask if CPU won
        if(controller.winner){
          playSound("loss");
          modalOverlay.style.display = "flex";
          gameOverModal.style.display = "flex";
          gameResultText.textContent = `The winner is ${controller.winner.name}!`;
        } else{
          turnText.textContent = `It is ${controller.activePlayer.name}'s move!`; 
          gameText.textContent = "Pick a square to attack...";
        }
      } else if (!controller.winner && controller.players[1].type === "human"){
        gameText.textContent = "Pick a square to attack...";
        displayPrivacy();
      } else if(controller.winner){
        //Ask if there's a winner and display the correct winner
        playSound("win");
        modalOverlay.style.display = "flex";
        gameOverModal.style.display = "flex";
        gameResultText.textContent = `The winner is ${controller.winner.name}!`;
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

  //helper function to choose which board should be visible and which is hidden
  function renderPerspective(){
    if(controller.activePlayer === controller.players[0] ||
       controller.players[1].type === "computer"
    ){
      updateBoard(controller.players[0], playerOneBoard, true); //<--- p1 board visible
      updateBoard(controller.players[1], playerTwoBoard, false); //<--- p2 board invisible
    } else {
      updateBoard(controller.players[0], playerOneBoard, false); //<--- p1 board invisible
      updateBoard(controller.players[1], playerTwoBoard, true); //<--- p2 board visible
    }
  }
}










//place ship form submission
  // placeShipForm.addEventListener("submit", (event)=>{
  //   try{
  //     event.preventDefault();
  //     const ship = controller.players[0].gameboard.ships[shipLengthInput.value - 1];
  //     controller.players[0].gameboard.placeShip(
  //       Number(rowCoordInput.value),
  //       Number(columnCoordInput.value),
  //       shipDirectionSelect.value,
  //       ship
  //     );
  //     updateBoard(controller.players[0], playerOneBoard, true);
  //     playSound("placeShip");
  //     modalOverlay.style.display = "none";
  //     placeShipModal.style.display = "none";
  //     gameText.textContent = "";
  //   } catch (error){
  //     placeShipErrorText.style.color = "red";
  //     placeShipErrorText.textContent = error;
  //   }
  // })