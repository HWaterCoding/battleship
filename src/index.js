import "./styles.css";

//entry point file

//pseudocode:

//------------ general --------------
//use fire emoji to signify successful hit
//use red X emoji to signify unsuccessful hit
//NEED AN ADDITIONAL CLASS FOR WHEN A SHIP IS FULLY SUNK
//decide how to design boat for player
//enforce the fact that every player has to play all their ships!

//------------- players --------------

//------------ DOM --------------
//Opponents gameboard needs to hide ships (rendering)
//(Reference how you did DOM creation in to-do list project)
//determine the starting DOM look of the game in createDOM
//create another js file to determine DOM updates

//----------- ui-controller --------------
//All button clicks/user interaction run through this file

import Gameboard from "./gameboard.js";
import Players from "./players.js";
import { createBoards, updateBoard } from "./render-board.js";
import GameController from "./game-controller.js";

createBoards();

const controller = new GameController("John");
const players = controller.players;
console.log(players);

const p1board = document.getElementById("leftPlayerBoard");
const p2board = document.getElementById("rightPlayerBoard");

const myShip = players[0].board.ships[3];
players[0].board.placeShip(0, 0, "right", myShip);

const yourShip = players[1].board.ships[2];
players[1].board.placeShip(0, 0, "up", yourShip);

updateBoard(players[0], p1board, true);
updateBoard(players[1], p2board, false);

controller.playTurn(0, 0);
controller.playTurn(0, 1);
controller.playTurn(0, 2);
controller.playTurn(0, 3);
updateBoard(players[0], p1board, true);
updateBoard(players[1], p2board, false);

console.log(controller.players[0].board.board);
console.log(controller.players[1].board.board);



//IMMEDIATE TO-DO:
//Fix a few things in CSS:
//coordinate-placement so that it matches the corresponding tiles
//gameOverModal and overlay logic
//style both placeship modal and gameover modal properly

//------- after CSS updating --------

//begin wiring events in the ui-controller.
//start with placeShip button and confirmations. 
//move on to event delegation for all board tiles .closest()
//