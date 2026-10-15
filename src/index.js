import "./styles.css";

import { createBoards } from "./render-board.js";
import initApp from "./ui-controller.js";

initApp();
createBoards();


//things to implement in order:
// 1. ship drag-and-drop placement logic
// 2. Make it so that when an attack is successful, it remains that players turn
// 3. Add a volume icon button to the header that allows people to toggle sfx
// 4. use fire emoji to signify successful hit
// 5. use red X emoji to signify unsuccessful hit
// 6. Style fully sunk ships a better way to make it obvious


// Drag-and-drop:
// Create a shared ship-selection area beneath the place/confirm ships btns
// Each ship should be a container with same tiles as board * shipLength

// create a rotate button nearby somewhere to change ship orientation
// (rotate the ships by simply changing the flex-direction of the container)

// When a ship is dragged onto the board, just change those tiles properties and render



// hide this section by default (it only needs to be visible during placement)
// make them visible during the placement phase, then hide after game start


//control drag logic with event listeners on ship and board accordingly:
// "dragstart" (ship) --> dataTransfer.setData
// "dragover" (board)
// "dragleave" (board)
// "drop" (board) --> dataTransfer.getData
