import Ship from "./ship.js";

export default class Gameboard{
    constructor(){

    }

    //place ships by calling coordinates and Ship class
    placeShip(coord1, coord2){
        
    }

    //use coordinate clicked on to "receive" an attack and check if its a miss or hit
    receiveAttack(square){
        //if miss, add to missedAttacks
        //if hit, call hit() on Ship object    
    }

    //keep track of tiles on board that are no longer viable
    missedAttacks(){

    }

    //determine if all ships are sunk after every move
    isGameOver(){
        //check if all ships on one side are sunk
        //if they're all sunk, end the game
    }
}