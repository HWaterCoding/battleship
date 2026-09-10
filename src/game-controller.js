//game rules/logic go here

import Players from "./players.js";

export default class GameController{
    constructor(){
        this.activePlayer = this.players[0];
        this.players = [
            new Players("name", "human"),
            new Players("name2", "computer"),
        ]
        this.isGameActive = true;
    }

    //return the opposite of the active player
    getOpponent(){
        const current = this.getActivePlayer();
        return current === this.players[0] ? this.players[1] : this.players[0];
    }

    switchPlayers(){
        this.activePlayer = this.activePlayer === 
            this.players[0] ? this.players[1] : this.players[0];
    }

    //after every turn played, call checkWinner() to ask if game is over
    playTurn(row, col){
        const opponent = this.getOpponent();

        //attack the board of the player who is not the active player
        opponent.board.receiveAttack(row, col);
        this.checkWinner()
        this.switchPlayers();
    }
    
    //when a player plays a turn, check if they are a winner by running
    //isGameOver() in Gameboard on the opponents board. If all of the 
    //opponents ships are sunk, then the activePlayer is the winner.
    checkWinner(){
        const current = this.getActivePlayer();

        const opponent = current === 
            this.players[0] ? this.players[1] : this.players[0];

        const isOver = opponent.board.isGameOver();

        if(isOver){
            //current player is the winner!
            //what do I actually do here, though...
            return {
                winner: current
            }
        }
    }

    //reset the gameboard and ship data of both players
    resetGame(){
        this.players[0].board.resetBoard();
        this.players[1].board.resetBoard();
    }
}