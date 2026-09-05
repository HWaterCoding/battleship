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
    
    //initial creation of the board
    createBoard(){
        for(let i = 0; i < this.rows; i++){
            const row = [];
            for(let j = 0; j < this.cols; j++){
                row.push({
                    value: 0,
                    ship: "none"
                });
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
        //make sure the ship is being placed on an empty square
        if(this.board[x][y].value !== 0){
            throw new Error("You can only place a ship on an empty square.")
        }

        //need to create actual ship instances here?


        //retrieve ship.length property passed in.
        //create a for loop for as long as the length
        switch(direction){
            case "right":
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[x][y + i];
                    if(current.value !== 0) throw new Error("You can't place a ship here!");
                }
                for(let i = 0; i < ship.length; i++){
                    //change the array index reference to go right
                    const current = this.board[x][y + i];
                    //update the value of every tile along the way from 0 to 1
                    current.value = 1;
                }
            break;
            case "left":
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[x][y - i];
                    if(current.value !== 0) throw new Error("You can't place a ship here!");
                }
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[x][y - i];
                    current.value = 1;
                }
            break;
            case "up":
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[x - i][y];
                    if(current.value !== 0) throw new Error("You can't place a ship here!");
                }
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[x - i][y];
                    current.value = 1;
                }
            break;
            case "down":
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[x + i][y];
                    if(current.value !== 0) throw new Error("You can't place a ship here!");
                }
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[x + i][y];
                    current.value = 1;
                }
            break;
        }

        //access this.ships [] to keep track of which ship takes
        //up which coordinates/tiles 


        //WE STILL NEED TO MAKE SURE A PLACED SHIP WILL FIT ON BOARD
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


//I need to fine-tune this a bit. If a tile contains a "1" I don't
//just need to know a ship is there, but which ship in specific.
//I need to know which ship that coordinate belongs to when placed.
//this should be done in "placeShip()"

//alternative == on makeBoard() function, rather than just adding a
//value of 0, you could also add more information to each board tile
//maybe consider adding a "ships" property or something?
//make each board tile an object containing a value 0, 1, 2, 3
//and then also include a ships {key:value} pair where value starts
//as "none" and is updated when a that tile contains a ship