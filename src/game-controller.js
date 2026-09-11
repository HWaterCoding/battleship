import Players from "./players.js";

export default class GameController{
    constructor(){
        this.players = [
            new Players("Player1", "human"),
            new Players("Player2", "computer"),
        ]
        this.activePlayer = this.players[0];
        this.isGameActive = true;
        this.winner = null;
    }

    //return the opponent of the active player
    getOpponent(){
        return this.activePlayer === this.players[0] ? 
            this.players[1] : this.players[0];
    }

    //switch whose turn it is
    switchPlayers(){
        this.activePlayer = this.activePlayer === 
            this.players[0] ? this.players[1] : this.players[0];
    }

    //play a full turn of the game
    playTurn(row, col){
        //if game is not active, you cannot play. Throw error.
        if(this.isGameActive === false){
            throw new Error("This game has concluded!");
        }
        
        //attack the board of the player who is not the active player
        const opponent = this.getOpponent();
        opponent.board.receiveAttack(row, col);

        //if there is a winner, end the game and declare game inactive
        const isWinner = this.checkWinner();
        if(isWinner){
            this.winner = this.activePlayer;
            this.isGameActive = false;
            return;
        } 

        //if there is no winner, then switch the player.
        this.switchPlayers();
    }
    
    //check if active player is winner by asking if opponents ships are all sunk
    checkWinner(){
        const opponent = this.getOpponent();
        const isWinner = opponent.board.isGameOver();

        //verify that someone has won the game
        if(isWinner){
            return true;
        }
        return false;
    }

    //reset the gameboard and ship data of both players
    //re-activate game and set active player to player1 again and reset winner
    resetGame(){
        this.players[0].board.resetBoard();
        this.players[1].board.resetBoard();

        this.isGameActive = true;
        this.activePlayer = this.players[0];
        this.winner = null;
    }
}