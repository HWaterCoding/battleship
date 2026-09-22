import Gameboard from "./gameboard.js";

export default class Players {
  constructor(name, type) {
    this.name = name;
    this.gameboard = new Gameboard();
    //will control whether player is human or computer
    this.type = type;
  }
}
