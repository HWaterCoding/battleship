import "./styles.css";

import { createBoards } from "./render-board.js";
import initApp from "./ui-controller.js";

initApp();
createBoards();

//things to implement in order:
// 4. use fire emoji to signify successful hit
// 5. use red X emoji to signify unsuccessful hit
// 6. Style fully sunk ships a better way to make it obvious
// 7. Add info screen to teach players the rules
