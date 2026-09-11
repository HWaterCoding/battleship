//entry point file


//pseudocode:

// GO THROUGH THESE SECTIONS IN ORDER 
// REFER TO TIC-TAC-TOE FOR TILE-BASED INTERACTION
// REFER TO TO-DO LIST FOR GENERAL DOM CONTROL IDEAS

//------------ general --------------
//use fire emoji to signify successful hit 
//use water emoji to signify unsuccessful hit
//decide how to design boat for player
//enforce the fact that every player has to play all their ships!

//------------ gameboard --------------
// to-do

//------------- players --------------
//Each player needs their own gameboard
//Other players gameboard needs to be invisible

//------------ DOM --------------
// (Reference how you did DOM creation in to-do list project)
//determine the starting DOM look of the game in createDOM
//create another js file to determine DOM updates

//----------- ui-controller --------------
//All button clicks/user interaction run through this file



import Gameboard from "./gameboard.js";

const board = new Gameboard();
board.createBoard();
console.log(board.getBoard())


//IMMEDIATE TO-DO:
//gameboard controller class and game logic
