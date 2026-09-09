//entry point file


//pseudocode:

// GO THROUGH THESE SECTIONS IN ORDER 
// REFER TO TIC-TAC-TOE FOR TILE-BASED INTERACTION
// REFER TO TO-DO LIST FOR GENERAL DOM CONTROL IDEAS

//------------ general --------------
//use fire emoji to signify successful hit 
//use water emoji to signify unsuccessful hit
//decide how to design boat for player

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
//make sure that once a ship in gameboard is placed, it cant be placed again
//reset ship state when createBoard() is run, or, write resetBoard() separately


//consider the possibility of splitting up the createBoard() function
//into 2 functions, one that creates the board, and another that creates
//the ship objects, and have them return a result. Then, in the
//constructor of the Gameboard class, set this.board and this.ships
//to equal those function calls, similar to how you intialize the
//Tree class from binary search tree, building the tree immedieately
//by calling buildTree() in the constructor