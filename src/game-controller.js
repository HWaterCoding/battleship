import Players from "./players.js";

export default class GameController {
  constructor(playerDataArray) {
    this.players = playerDataArray.map(player =>
      new Players(player.name, player.type)
    )
    this.activePlayer = this.players[0];
    this.isGameActive = false;
    this.winner = null;
  }

  //return the opponent of the active player
  getOpponent() {
    return this.activePlayer === this.players[0]
      ? this.players[1]
      : this.players[0];
  }

  //switch whose turn it is
  switchPlayers() {
    this.activePlayer =
      this.activePlayer === this.players[0] ? this.players[1] : this.players[0];
  }

  //play a full turn of the game
  playTurn(row, col) {
    //if game is not active, you cannot play. Throw error.
    if (this.isGameActive === false) {
      throw new Error("The game is not active!");
    }

    //attack the board of the player who is not the active player
    const opponent = this.getOpponent();
    const attackResult = opponent.gameboard.receiveAttack(row, col);

    //if there is a winner, end the game and declare game inactive
    const isWinner = this.checkWinner();
    if (isWinner) {
      this.winner = this.activePlayer;
      this.isGameActive = false;
      return attackResult;
    }

    //if there is no winner, then switch the player.
    this.switchPlayers();
    return attackResult;
  }

  //check if active player is winner by asking if opponents ships are all sunk
  checkWinner() {
    const opponent = this.getOpponent();
    const isWinner = opponent.gameboard.isGameOver();

    //verify that someone has won the game
    if (isWinner) {
      return true;
    }
    return false;
  }

  //reset the data of both players and the game state
  resetGame() {
    this.players[0].gameboard.resetBoard();
    this.players[1].gameboard.resetBoard();

    this.isGameActive = false;
    this.activePlayer = this.players[0];
    this.winner = null;
  }

  startGame(){
    this.isGameActive = true;
  }
}
