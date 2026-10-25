import Gameboard from "./gameboard.js";

export default class Players {
  constructor(name, type) {
    this.name = name;
    this.gameboard = new Gameboard();
    this.type = type;
  }
}
