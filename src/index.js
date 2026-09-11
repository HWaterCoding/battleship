import "./styles.css";

//entry point file

//pseudocode:

//------------ general --------------
//use fire emoji to signify successful hit 
//use water emoji to signify unsuccessful hit
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

const board = new Gameboard();
board.createBoard();
console.log(board.getBoard())


//IMMEDIATE TO-DO:
//1. design a very basic layout for the webpage in the HTML
//2. begin on the rendering logic; start by rendering in the boards
//   on page load, and to be re-called upon resetting the game
//3. handle rendering different board states(hit, miss, ship, etc)
