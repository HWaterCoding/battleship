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
    placeShip(row, col, direction, ship){
        //make sure the ship is being placed on an empty square
        if(this.board[row][col].value !== 0){
            throw new Error("You can only place a ship on an empty square.")
        }

        //need to create actual ship instances here?


        //retrieve ship.length property passed in.
        //create a for loop for as long as the length
        switch(direction){
            case "right":
                for(let i = 0; i < ship.length; i++){
                    const targetColumn = col + i;
                    if(targetColumn > 9) throw new Error("Off the board!");

                    const current = this.board[row][targetColumn];
                    if(current.value !== 0) throw new Error("You can't place a ship here!");
                }
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[row][col + i];
                    current.value = 1;
                }
            break;

            case "left":
                for(let i = 0; i < ship.length; i++){
                    const targetColumn = col - i;
                    if(targetColumn < 0) throw new Error("Off the board!")

                    const current = this.board[row][targetColumn];
                    if(current.value !== 0) throw new Error("You can't place a ship here!");
                }
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[row][col - i];
                    current.value = 1;
                }
            break;
            case "up":
                for(let i = 0; i < ship.length; i++){
                    const targetRow = row + i;
                    if(targetRow < 0) throw new Error("Off the board!")

                    const current = this.board[targetRow][col];
                    if(current.value !== 0) throw new Error("You can't place a ship here!");
                }
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[row + i][col];
                    current.value = 1;
                }
            break;
            case "down":
                for(let i = 0; i < ship.length; i++){
                    const targetRow = row - i;
                    if(targetRow > 9) throw new Error("Off the board!")

                    const current = this.board[targetRow][col];
                    if(current.value !== 0) throw new Error("You can't place a ship here!");
                }
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[row - i][col];
                    current.value = 1;  
                }
            break;
        }

        //access this.ships [] to keep track of which ship takes
        //up which coordinates/tiles 
    }

    //use coordinates clicked on to "receive" an attack and check if its a miss or hit
    receiveAttack(row, col){
        const tile = this.board[row][col];

        switch(tile.value){
            case 0:
                this.missedAttacks.push(tile);
            break;
            case 1:
                this.hitAttacks.push(tile);
                //retrieve the correct ship from this.ships []
                //and compare it to the ship: value on tile obj
                //check if the ship hit is now sunk
            break;
            case 2:
                throw new Error("You've already guessed this tile!")                
            case 3:
                throw new Error("You've already guessed this tile!")
        }
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