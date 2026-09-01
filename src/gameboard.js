import Ship from "./ship.js";

export default class Gameboard{
    constructor(){
        this.missedAttacks = [];
        this.hitAttacks = [];
        //to keep track of which ships are placed so far
        this.ships = [];
    }

    //place ships by calling coordinates and Ship class
    placeShip(x, y, direction, ship){

    }

    //use coordinates clicked on to "receive" an attack and check if its a miss or hit
    receiveAttack(x, y){
        //if miss, add to missedAttacks
        //if hit, call hit() on Ship object    
    }

    //determine if all ships are sunk after every move
    isGameOver(){
        //check if all ships on one side are sunk
        //if they're all sunk, end the game
    }
}