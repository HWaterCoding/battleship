//entry point file


//pseudocode:

// GO THROUGH THESE SECTIONS IN ORDER 
// REFER TO TIC-TAC-TOE FOR TILE-BASED INTERACTION
// REFER TO TO-DO LIST FOR GENERAL DOM CONTROL IDEAS

//------------ general --------------
//10x10 board
//4 ships (2, 3, 4, 5 tiles wide/long)
//use fire emoji to signify successful hit 
//use water emoji to signify unsuccessful hit
//decide how to design boat for player

//------------ gameboard --------------
//Determine how a player will actually place a ship.

//------------- players --------------
//Each player needs their own gameboard, and half needs to be "invisible"

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

console.log(board.invertRowCoordinate(6));


//IMMEDIATE TO-DO:
//create mapping function for coordinate conversion(do math)
//Clean up Gameboard class logic and do Players class next