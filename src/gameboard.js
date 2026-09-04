import Ship from "./ship.js";

export default class Gameboard{
    constructor(){
        this.missedAttacks = [];
        this.hitAttacks = [];
        //to keep track of which ships are placed so far
        this.ships = [];

        this.rows = 10;
        this.cols = 10;
        this.board = [];
    }

    //when creating the gameboard, can use numbers to indicate
    //if a tile is hit, missed, or unclicked, or ship.
    //0 = empty tile
    //1 = tile containing ship
    //2 = successful attack
    //3 = missed attack
    //these will all look different on your own board, but 0 and 1
    //will have to look the same on the opponents board
    
    makeBoard(){
        for(let i = 0; i < this.rows; i++){
            const row = [];
            for(let j = 0; j < this.cols; j++){
                row.push(0);
            }
            this.board.push(row);
        }
    }

    //return the current state of the board for rendering
    getBoard(){
        return this.board.map(row => [...row]);
    }


    //place ships by calling coordinates and Ship class
    placeShip(x, y, direction, ship){

        //change the "0's"chosen to "1's" to represent ship tiles

        //access this.ships [] to keep track of which ship takes
        //up which coordinates/tiles 
    }

    //use coordinates clicked on to "receive" an attack and check if its a miss or hit
    receiveAttack(x, y){
        const row = x;
        const col = y;
        const board = this.getBoard();

        if(board[row][col] === 0){
            //this is a miss!
            //if miss, add to missedAttacks
        }
        if(board[row][col] === 1){
            //this is a hit!
            //if hit, call hit() on Ship object    
        }

        //check if tile clicked was already a miss/hit tile?
    }

    //determine if all ships are sunk after every move
    isGameOver(){
        //check if all ships on one side are sunk
        //if they're all sunk, end the game

        //you could potentially make this incredibly simple.
        //check if a players board contains any 1's. 
        //If it doesn't, all their ships are sunk!
    }
}


