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
    
    //initial creation of the board
    createBoard(){
        for(let i = 0; i < this.rows; i++){
            const row = [];
            for(let j = 0; j < this.cols; j++){
                row.push({
                    //consider changing to ship: "", attacked: untouched/miss/hit
                    value: 0,
                    ship: ""
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