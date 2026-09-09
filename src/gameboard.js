import Ship from "./ship.js";

export default class Gameboard{
    constructor(){
        //initiate ship objects on creation of gameboard
        this.ships = [
            new Ship(1),
            new Ship(2),
            new Ship(3),
            new Ship(4),
            new Ship(5),
        ];
        this.board = [];
    }
    
    //initial creation/recreation of the board
    //this current doesn't technically reset because SHIPS arent reset
    createBoard(){
        this.board = [];
        for(let i = 0; i < 10; i++){
            const row = [];
            for(let j = 0; j < 10; j++){
                row.push({
                    ship: null,
                    attacked: "unattacked"
                });
            }
            this.board.push(row);
        }
    }

    //return the current state of the board for rendering
    getBoard(){
        return this.board.map(row => [...row]);
    }

    //place ship on board by passing in coordinates and direction
    placeShip(row, col, direction, ship){
        row = this.invertRowCoordinate(row);
        //make sure the ship is being placed on an empty square
        if(this.board[row][col].ship !== null){
            throw new Error("There's already a ship here.")
        }

        //consider the direction the ship is being placed and check if the
        //entire path it's being placed in is vacant and fits on the board
        switch(direction){
            case "right":
                for(let i = 0; i < ship.length; i++){
                    const targetColumn = col + i;
                    if(targetColumn > 9) throw new Error("Off the board!");

                    const current = this.board[row][targetColumn];
                    if(current.ship !== null) throw new Error("There's already a ship here.");
                }
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[row][col + i];
                    current.ship = ship;
                }
            break;

            case "left":
                for(let i = 0; i < ship.length; i++){
                    const targetColumn = col - i;
                    if(targetColumn < 0) throw new Error("Off the board!")

                    const current = this.board[row][targetColumn];
                    if(current.ship !== null) throw new Error("There's already a ship here.");
                }
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[row][col - i];
                    current.ship = ship;
                }
            break;

            case "up":
                for(let i = 0; i < ship.length; i++){
                    const targetRow = row - i;
                    if(targetRow < 0) throw new Error("Off the board!")

                    const current = this.board[targetRow][col];
                    if(current.ship !== null) throw new Error("There's already a ship here.");
                }
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[row - i][col];
                    current.ship = ship;
                }
            break;
            case "down":
                for(let i = 0; i < ship.length; i++){
                    const targetRow = row + i;
                    if(targetRow > 9) throw new Error("Off the board!")

                    const current = this.board[targetRow][col];
                    if(current.ship !== null) throw new Error("There's already a ship here.");
                }
                for(let i = 0; i < ship.length; i++){
                    const current = this.board[row + i][col];
                    current.ship = ship;
                }
            break;
        }
    }

    //use coordinates clicked on to "receive" an attack and check if its a miss or hit
    receiveAttack(row, col){
        row = this.invertRowCoordinate(row);
        const tile = this.board[row][col];

        switch(tile.attacked){
            case "unattacked":
                //if there's a ship, process the hit and ask if it's sunk
                if(tile.ship !== null){
                    tile.attacked = "hit";
                    tile.ship.hit();
                    tile.ship.isSunk();

                } else{
                    tile.attacked = "miss";
                }
            break;
            case "hit":
                throw new Error("You've already guessed this tile!");
            case "miss":
                throw new Error("You've already guessed this tile!");
        }
    }

    //determine if all ships are sunk after every move
    isGameOver(){
        return this.ships.every(ship => ship.sunk);
    }

    //THIS FUNCTION WILL BE CALLED AFTER USER INPUT, NOT IN GAMEBOARD ITSELF
    invertRowCoordinate(row){
        const converted = 9 - row;
        return converted;
    }
}