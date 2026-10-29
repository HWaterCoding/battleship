import { CPU, placeCpuShips } from "./cpu-logic.js";
import GameController from "./game-controller.js";
import { updateBoard, createBoards } from "./render-board.js";
import playSound from "./audio.js";

export default function initApp() {
  
  //Variables for GameController, CPU instances, and transition phase
  let controller;
  let computer;
  let placementStage = "Player 1";
  let isTransitioning = false;

  //Readable text elements to update game status 
  const turnText = document.getElementById("turnText");
  const gameText = document.getElementById("gameText");
  
  // Cotainer that holds both player boards + ship marina
  const boardContainer = document.getElementById("boardContainer");
  
  //Both physical gameboards and titles
  const playerOneName = document.getElementById("playerOneName");
  const playerOneBoard = document.getElementById("leftPlayerBoard");

  const playerTwoName = document.getElementById("playerTwoName");
  const playerTwoBoard = document.getElementById("rightPlayerBoard");


  //OVERLAYS AND MODALS LOGIC:
  //Overlay for all modals (except privacy screening)
  const modalOverlay = document.getElementById("modalOverlay");

  //GAME-MODE SELECTION LOGIC:
  //Game-select modal:
  const gameSelectModal = document.getElementById("gameSelectModal");
  const cpuBtn = document.getElementById("cpuBtn");
  const playerVsCpuModal = document.getElementById("playerVsCpuModal");
  const twoPlayerBtn = document.getElementById("twoPlayerBtn");
  const twoPlayerModal = document.getElementById("twoPlayerModal");

  //select human vs. CPU
  cpuBtn.addEventListener("click", ()=>{
    gameSelectModal.style.display = "none";
    playerVsCpuModal.style.display = "grid";
  });

  //Player Vs. CPU mode creation
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

  //select two-player mode
  twoPlayerBtn.addEventListener("click", ()=>{
    gameSelectModal.style.display = "none";
    twoPlayerModal.style.display = "grid";
  });

  //Two-Player mode creation
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
    placeShipErrorText.textContent = "";
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

      const stagedShip = shipArea.querySelector(
        `.draggableShip[data-length="${shipLengthInput.value}"]`
      );
      stagedShip?.classList.add("placed");

      modalOverlay.style.display = "none";
      placeShipModal.style.display = "none";
      gameText.textContent = "";
    }catch (error){
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

      if(placementStage === "Player 1" && controller.players[1].type === "human"){
        placementStage = "Player 2";
        setBoardLayout("placing-player-two");
        restoreMarinaShips();
      } else if (placementStage === "Player 2" || controller.players[1].type === "computer"){
        placementStage = "complete";
        disableButtons(
          [placeShipBtn, confirmShipsBtn],
          [
            "You've already placed your ships.",
            "You've already confirmed your ship placements."
          ]
        );
        setBoardLayout("battle-phase");
        turnText.textContent = `Both players are ready. Click "Start Game!" to begin.`;
        gameText.textContent = "";
      }
      if(controller.players[1].type === "computer") return;

      controller.switchPlayers();
      displayPrivacy();
    } catch (error) {
      gameText.textContent = error;
    }
  });


  //Drag-and-drop ship logic:

  //Identify from which tile the ship is being dragged
  let grabbedSegmentIndex = 0;
  let orientation = "horizontal";
  let draggedShipLength = null;

  const rotateShipBtn = document.getElementById("rotateShipBtn");
  rotateShipBtn.addEventListener("click", ()=>{
      orientation = orientation === "horizontal" ? "vertical" : "horizontal";

      const ships = document.querySelectorAll(".draggableShip");
      ships.forEach((ship) =>{
        ship.style.flexDirection = orientation === "horizontal" ? "row" : 'column';
      })
  });
  
  const shipArea = document.getElementById("shipArea");
  shipArea.addEventListener("pointerdown", (event) => {
    const square = event.target.closest(".shipSquare");
    if (!square) return;

    const ship = square.closest(".draggableShip");
    if (!ship) return;

    grabbedSegmentIndex = [...ship.children].indexOf(square);
  });

  //Identify which ship is being dragged onto the board
  shipArea.addEventListener("dragstart", (event)=>{
    try {
      if (controller.isGameActive || isTransitioning) {
        event.preventDefault();
        return;
      }

      const ship = event.target.closest(".draggableShip");
      if (!ship) return;

      draggedShipLength = Number(ship.dataset.length);

      event.dataTransfer.setData("text/plain", ship.dataset.length);
    } catch (error){
      gameText.textContent = error;
    }
  });

  //Drag events attachs to both player boards
  [playerOneBoard, playerTwoBoard].forEach(board =>{
    //Allow the ship to be dropped
    board.addEventListener("dragover", (event)=>{
      event.preventDefault();

        //Identify the tile currently under the cursor
        const tile = event.target.closest(".tile");
        if(!tile) return;

        //Retrieve the ship's length
        const shipLength = draggedShipLength;
        if (!shipLength) return;

        //Calculate the ship's starting coordinate
        const row = Number(tile.dataset.y);
        const column = Number(tile.dataset.x);
        const placement = calculateShipPlacement(row, column, shipLength);

        //Determine all coordinates the ship would occupy
        const placementTiles = [];

        //determine if row/col is changing, and generate hovered coordinates
        if(placement.direction === "right"){
          for(let i = 0; i < shipLength; i++){
            const tileInDOM = board.querySelector(
              `[data-y="${placement.row}"][data-x="${placement.column + i}"]`,
            );
            if(tileInDOM) placementTiles.push(tileInDOM);
          }
        } else if (placement.direction === "up"){
          for(let i = 0; i < shipLength; i++){
            const tileInDOM = board.querySelector(
              `[data-y="${placement.row + i}"][data-x="${placement.column}"]`,
            );
            if(tileInDOM) placementTiles.push(tileInDOM);
          }
        }

        //Remove the previous preview
        clearPreview(board);

        const ship = controller.activePlayer.gameboard.ships[shipLength - 1];

        const canBePlaced = controller.activePlayer.gameboard.canBePlaced(
          placement.row, 
          placement.column,
          placement.direction,
          ship
        );
        // Add preview classes to the corresponding board tiles
        if(canBePlaced){
          placementTiles.forEach(tile => {
            tile.classList.add('placement-preview');
          });
        } else{
          placementTiles.forEach(tile => {
            tile.classList.add('invalid-preview');
          });
        }
    });

    //Attempt placement of the ship that's being dragged
    board.addEventListener("drop", (event)=>{
      event.preventDefault();
      try{
        if (controller.isGameActive || isTransitioning) {
          event.preventDefault();
          return;
        }

        //prevent play from dropping a ship onto the enemies board
        const activeBoard = controller.activePlayer === controller.players[0] ? 
          playerOneBoard : playerTwoBoard;
        if (board !== activeBoard) return;

        const tile = event.target.closest(".tile");
        if(!tile) return;

        let row = Number(tile.dataset.y);
        let column = Number(tile.dataset.x);
        const shipLength = Number(
          event.dataTransfer.getData("text/plain")
        );

        if (!Number.isInteger(shipLength) || shipLength < 1 || shipLength > 5) {
          return;
        }

        const placement = calculateShipPlacement(row, column, shipLength);

        const ship = controller.activePlayer.gameboard.ships[shipLength - 1];
        controller.activePlayer.gameboard.placeShip(
          placement.row,
          placement.column,
          placement.direction,
          ship
        )

        const stagedShip = shipArea.querySelector(
          `.draggableShip[data-length="${shipLength}"]`
        );
        stagedShip?.classList.add("placed");

        const playerBoard = controller.activePlayer === controller.players[0] ? playerOneBoard : playerTwoBoard;
        updateBoard(controller.activePlayer, playerBoard, true);
        playSound("placeShip");
      } catch (error){
        console.warn(error);
      }
    });
  });

  //Clean up for things like hover: styling 
  shipArea.addEventListener("dragend", ()=>{
    draggedShipLength = null;

    clearPreview(playerOneBoard);
    clearPreview(playerTwoBoard);
  });


  //Helper to determine where ship will be placed based on cursor position during drag
  function calculateShipPlacement(row, column, shipLength){
    if(orientation === "horizontal"){
      return{
        row,
        column: column - grabbedSegmentIndex,
        direction: "right",
      };
    }

    return{
      row: row - (shipLength - 1 - grabbedSegmentIndex),
      column,
      direction: "up",
    };
  };

  //Helper to clear previously highlighted placement preview tiles
  function clearPreview(board){
    const previewTiles = board.querySelectorAll(
      ".placement-preview, .invalid-preview"
    );

    previewTiles.forEach(tile => {
      tile.classList.remove(
        "placement-preview",
        "invalid-preview"
      );
    });
  }



  //START, RESET, RESTART, AND CHANGE MODE BUTTONS:
  //Button to officially start the attacking phase of the game
  const startGameBtn = document.getElementById("startGameBtn");
  startGameBtn.addEventListener("click", ()=>{
    try{
      if(controller.isGameActive){
        throw new Error("The game is already active!");
      }
      if(placementStage !== "complete" ){
        throw new Error("All ships must be placed and confirmed")
      }

      //ensure both players have placed all of their ships
      controller.players[0].gameboard.isFleetPlaced();
      controller.players[1].gameboard.isFleetPlaced();

      controller.startGame();
      turnText.textContent = `It is ${controller.players[0].name}'s move!`;
      gameText.textContent = "Pick a square to attack...";

      disableButtons(startGameBtn, "The game has already been started.");
    } catch (error){
      gameText.textContent = error;
    }
  });

  //reset the game to current game mode (for middle of game if needed)
  const resetGameBtn = document.getElementById("resetGameBtn");
  resetGameBtn.addEventListener("click", ()=>{
    //reset the game state, cpu state, and the board state
    controller.resetGame();
    if(controller.players[1].type === "computer") computer.resetCPU();
    createBoards();

    placementStage = "Player 1";
    turnText.textContent = "Place your ships...";
    gameText.textContent = "";

    //re-enable disabled buttons
    enableButtons([placeShipBtn, confirmShipsBtn, startGameBtn]);
    
    //restore ship marina
    setBoardLayout("placing-player-one");
    restoreMarinaShips();
  });

  //Button end/reset everything and change the current gamemode
  const changeGameBtn = document.getElementById("changeGameBtn");
  changeGameBtn.addEventListener("click", ()=>{
    controller.resetGame();
    if(controller.players[1].type === "computer") computer.resetCPU();
    createBoards();

    placementStage = "Player 1";
    modalOverlay.style.display = "flex";
    gameSelectModal.style.display = "grid";

    enableButtons([placeShipBtn, confirmShipsBtn, startGameBtn]);

    setBoardLayout("placing-player-one");
    restoreMarinaShips();
  });

  //restart the game from the winning screen modal and re-select game mode
  const gameOverModal = document.getElementById("gameOverModal");
  const gameResultText = document.getElementById("gameResultText");
  const restartGameBtn = document.getElementById("restartGameBtn");
  restartGameBtn.addEventListener("click", ()=>{
    controller.resetGame();
    if(controller.players[1].type === "computer") computer.resetCPU();
    createBoards();
    
    placementStage = "Player 1";
    gameOverModal.style.display = "none";
    gameSelectModal.style.display = "grid";

    enableButtons([placeShipBtn, confirmShipsBtn, startGameBtn]);

    setBoardLayout("placing-player-one");
    restoreMarinaShips();
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



  //HELPER FUNCTIONS FOR EVENT LISTENERS:

  //Turn delay function for CPU turn
  const turnDelay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  //function to display privacy interface
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

  //helper function to show and hide appropriate board based on game phase
  function setBoardLayout(phase){
    boardContainer.classList.remove(
      "placing-player-one",
      "placing-player-two",
      "battle-phase"
    );
    boardContainer.classList.add(phase);
  }

  //repopulate the ship marina with ships after they've been used and set back to horizontal
  function restoreMarinaShips() {
    const ships = shipArea.querySelectorAll(".draggableShip");

    ships.forEach(ship => {
      ship.classList.remove("placed");
      ship.style.flexDirection = "row";
    });

    orientation = "horizontal";
  }
    
  //helper function to disable buttons when not offerable to user
  function disableButtons(buttons, messages = []){
    const buttonArray = Array.isArray(buttons) ? buttons : [buttons];
    const messageArray = Array.isArray(messages) ? messages : [messages];

    buttonArray.forEach((button, index)=>{
      const message = messageArray[index] !== undefined ? 
        messageArray[index] : (messageArray[0] || "");

      button.disabled = true;
      button.title = message;
    });
  }

  //helper function to enable buttons so the user can use them
  function enableButtons(buttons, messages = []){
    //convert whatever is passed in to an array, even if single element
    const buttonArray = Array.isArray(buttons) ? buttons : [buttons];
    const messageArray = Array.isArray(messages) ? messages : [messages];
  
    buttonArray.forEach((button, index)=>{
      //use correct message or default to empty string
      const message = messageArray[index] !== undefined ? 
        messageArray[index] : (messageArray[0] || "");
    
      button.disabled = false;
      button.title = message;
    });
  }
}
