import "./styles.css";

//entry point file

//pseudocode:

//------------ general --------------
//use fire emoji to signify successful hit 
//use red X emoji to signify unsuccessful hit
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
updateBoard(players[0], p1board, true);
updateBoard(players[1], p2board, false);


console.log(controller.players[0].board.board);
console.log(controller.players[1].board.board);


// const player1 = new Players();
// player1.board.createBoard();
// console.log(player1.board.getBoard());



//IMMEDIATE TO-DO:
//1. design a very basic layout for the webpage in the HTML
//2. begin on the rendering logic; start by rendering in the boards
//   on page load, and to be re-called upon resetting the game
//3. handle rendering different board states(hit, miss, ship, etc)
