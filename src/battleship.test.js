import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import GameController from "./game-controller.js";

// ship class testing
test.skip("successfully confirms if a ship is sunk", () => {
  const myShip = new Ship(4);
  myShip.hit();
  myShip.hit();
  myShip.hit();
  myShip.hit();
  expect(myShip.isSunk()).toBe(true);
});

test.skip("successfully confirms if a ship is NOT sunk", () => {
  const myShip = new Ship(4);
  myShip.hit();
  myShip.hit();
  expect(myShip.isSunk()).toBe(false);
});

test.skip("Changes sunk property on ship object", () => {
  const myShip = new Ship(2);
  myShip.hit();
  myShip.hit();
  myShip.isSunk();
  expect(myShip.sunk).toBe(true);
});

//gameboard class testing
test.skip("makeBoard() makes a 10 x 10 gameboard and doesn't duplicate", () => {
  const gameboard = new Gameboard();
  gameboard.createBoard();
  gameboard.createBoard();

  const board = gameboard.getBoard();

  expect(board.length).toBe(10);
  expect(board[0].length).toBe(10);

  board.forEach((row) => {
    row.forEach((tile) => {
      expect(tile).toEqual({ ship: null, attacked: "unattacked" });
    });
  });
});

test.skip("resetBoard() properly resets gameboard and ship data", () => {
  const gameboard = new Gameboard();

  const myShip = gameboard.ships[2];

  gameboard.placeShip(0, 1, "right", myShip);

  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(0, 2);
  gameboard.receiveAttack(0, 3);

  expect(myShip.sunk).toEqual(true);

  gameboard.resetBoard();

  const board = gameboard.getBoard();

  expect(board.length).toBe(10);
  expect(board[0].length).toBe(10);

  const newShip = gameboard.ships[2];
  expect(newShip.sunk).toEqual(false);

  board.forEach((row) => {
    row.forEach((tile) => {
      expect(tile).toEqual({ ship: null, attacked: "unattacked" });
    });
  });
});

test.skip("Correctly places a ship horizontally", () => {
  const gameboard = new Gameboard();

  const myShip = gameboard.ships[2];
  gameboard.placeShip(9, 1, "right", myShip);

  const board = gameboard.getBoard();

  expect(board[0][1]).toEqual({ ship: myShip, attacked: "unattacked" });
  expect(board[0][2]).toEqual({ ship: myShip, attacked: "unattacked" });
  expect(board[0][3]).toEqual({ ship: myShip, attacked: "unattacked" });

  expect(board[0][0]).toEqual({ ship: null, attacked: "unattacked" });
  expect(board[0][4]).toEqual({ ship: null, attacked: "unattacked" });
});

test.skip("Correctly places a ship vertically, (CONVERTS ROWS)", () => {
  const gameboard = new Gameboard();

  const myShip = gameboard.ships[2];
  gameboard.placeShip(1, 1, "up", myShip);

  const board = gameboard.getBoard();

  expect(board[8][1]).toEqual({ ship: myShip, attacked: "unattacked" });
  expect(board[7][1]).toEqual({ ship: myShip, attacked: "unattacked" });
  expect(board[6][1]).toEqual({ ship: myShip, attacked: "unattacked" });

  expect(board[9][1]).toEqual({ ship: null, attacked: "unattacked" });
  expect(board[5][1]).toEqual({ ship: null, attacked: "unattacked" });
});

test.skip("Prevents placing the same ship twice", () => {
  const gameboard = new Gameboard();

  const myShip = gameboard.ships[2];
  gameboard.placeShip(1, 1, "up", myShip);

  expect(() => {
    gameboard.placeShip(6, 5, "up", myShip);
  }).toThrow("Ship already placed!");
});

test.skip("registers a hit ship correctly", () => {
  const gameboard = new Gameboard();

  const myShip = gameboard.ships[2];
  gameboard.placeShip(9, 1, "right", myShip);

  gameboard.receiveAttack(9, 2);

  const board = gameboard.getBoard();

  expect(board[0][2]).toEqual({ ship: myShip, attacked: "hit" });
  expect(board[0][2].ship.timesHit).toBe(1);
});

test.skip("Correctly sinks a ship once all tiles are hit", () => {
  const gameboard = new Gameboard();

  const myShip = gameboard.ships[2];
  gameboard.placeShip(0, 1, "right", myShip);

  gameboard.receiveAttack(0, 1);
  gameboard.receiveAttack(0, 2);
  gameboard.receiveAttack(0, 3);

  expect(myShip.sunk).toEqual(true);
});

test.skip("inversion function converts row coordinate", () => {
  const gameboard = new Gameboard();

  const myShip = gameboard.ships[0];
  gameboard.placeShip(0, 1, "right", myShip);

  const board = gameboard.getBoard();

  expect(board[9][1]).toEqual({ ship: myShip, attacked: "unattacked" });
});

test.skip("When all ships are sunk, the game is over", () => {
  const gameboard = new Gameboard();

  gameboard.ships.forEach((ship) => (ship.sunk = true));

  expect(gameboard.isGameOver()).toBe(true);
});

test.skip("As long as at least one ship tile remains, the game isn't over", () => {
  const gameboard = new Gameboard();

  gameboard.ships.forEach((ship) => (ship.sunk = true));

  gameboard.ships[0].sunk = false;

  expect(gameboard.isGameOver()).toBe(false);
});

//Game Controller methods and tests::
test.skip("getOpponent() returns correct player", () => {
  const controller = new GameController();

  expect(controller.activePlayer).toBe(controller.players[0]);
  expect(controller.getOpponent()).toBe(controller.players[1]);
});

test.skip("switchPlayers() changes activePlayer", () => {
  const controller = new GameController();

  expect(controller.activePlayer).toBe(controller.players[0]);
  controller.switchPlayers();
  expect(controller.activePlayer).toBe(controller.players[1]);
  controller.switchPlayers();
  expect(controller.activePlayer).toBe(controller.players[0]);
});

test.skip("playTurn() throws an error if the game is already over", () => {
  const controller = new GameController();

  controller.isGameActive = false;
  expect(() => {
    controller.playTurn(0, 0);
  }).toThrow("This game has concluded!");
});

test.skip("playTurn() properly handles a winning attack", () => {
  const controller = new GameController();

  const finalShip = controller.players[1].board.ships[0];
  controller.players[1].board.placeShip(0, 0, "right", finalShip);

  controller.players[1].board.ships.forEach((ship) => (ship.sunk = true));
  finalShip.sunk = false;

  controller.playTurn(0, 0);

  expect(finalShip.sunk).toBe(true);
  expect(controller.winner).toBe(controller.players[0]);
  expect(controller.isGameActive).toBe(false);

  expect(controller.activePlayer).toBe(controller.players[0]);
});

test.skip("playTurn() does not switch players after an invalid attack", () => {
  const controller = new GameController();

  //attack once
  controller.playTurn(0, 0);

  //switch back manually so Player 1 attacks the same tile again
  controller.switchPlayers();

  expect(() => {
    controller.playTurn(0, 0);
  }).toThrow();

  expect(controller.activePlayer).toBe(controller.players[0]);
});

test.skip("checkWinner() returns true only when the opponent has lost", () => {
  const controller = new GameController();

  //opponent still has ships
  expect(controller.checkWinner()).toBe(false);

  controller.players[1].board.ships.forEach((ship) => {
    ship.sunk = true;
  });

  expect(controller.checkWinner()).toBe(true);
});

test.skip("resetGame() restores a fresh match", () => {
  const controller = new GameController();

  //set all 3 constructor properties to the opposite of default state
  controller.winner = controller.players[0];
  controller.isGameActive = false;
  controller.activePlayer = controller.players[1];

  const ship = controller.players[0].board.ships[2];
  controller.players[0].board.placeShip(0, 1, "right", ship);
  controller.players[0].board.receiveAttack(0, 1);

  controller.resetGame();

  //constructor properties set back to their default values
  expect(controller.isGameActive).toBe(true);
  expect(controller.winner).toBe(null);
  expect(controller.activePlayer).toBe(controller.players[0]);

  const board = controller.players[0].board.getBoard();

  //every board tile is reset to unattacked
  board.forEach((row) => {
    row.forEach((tile) => {
      expect(tile).toEqual({
        ship: null,
        attacked: "unattacked",
      });
    });
  });
});

// FULL LENGTH GAME TEST WITHOUT UI/RENDERING/DOM

// THIS TEST WILL NOT USE THE CPU TARGETTING ALGORITHMS SO THAT ATTACKS ARE CONSISTENT
describe("Complete Battleship game lifecycle without DOM/UI elements", () => {
  test("Two players place fleets, take turns, and finish a game", () => {
    // 1. CREATE THE GAME

    const controller = new GameController([
      { name: "Human", type: "human" },
      { name: "Computer", type: "computer" },
    ]);

    const human = controller.players[0];
    const computer = controller.players[1];

    expect(controller.isGameActive).toBe(false);
    expect(controller.winner).toBeNull();
    expect(controller.activePlayer).toBe(human);

    // 2. PLACE BOTH FLEETS

    // Put each ship on a different row, starting at column 0

    for (let i = 0; i < 5; i++) {
      const humanShip = human.gameboard.ships[i];
      const computerShip = computer.gameboard.ships[i];

      human.gameboard.placeShip(i, 0, "right", humanShip);
      computer.gameboard.placeShip(i, 0, "right", computerShip);
    }

    expect(() => human.gameboard.isFleetPlaced().not.toThrow());
    expect(() => computer.gameboard.isFleetPlaced().not.toThrow());

    // 3. START THE GAME AND VERIFY GAME IS ACTIVE

    controller.startGame();

    expect(controller.isGameActive).toBe(true);
    expect(controller.activePlayer).toBe(human);

    // 4. PREPARE DETERMINISTIC ATTACK COORDINATES

    // Human will hit all 15 computer ship tiles
    // Computer will deliberately miss every attack

    const humanAttacks = [];

    for (let row = 0; row < 5; row++) {
      const shipLength = row + 1;
      for (let col = 0; col < shipLength; col++) {
        humanAttacks.push([row, col]);
      }
    }

    // These are 15 distinct empty coordinates away from the human fleet

    const computerAttacks = [];

    for (let col = 0; col < 10; col++) {
      computerAttacks.push([9, col]);
    }

    for (let col = 0; col < 5; col++) {
      computerAttacks.push([8, col]);
    }

    expect(humanAttacks).toHaveLength(15);
    expect(computerAttacks).toHaveLength(15);

    // 5. SIMULATE EVERY SINGLE TURN THROUGHOUT THE BATTLE PHASE

    // Human attacks the computers board
    for (let i = 0; i < humanAttacks.length; i++) {
      expect(controller.activePlayer).toBe(human);

      const [humanRow, humanCol] = humanAttacks[i];

      const humanResult = controller.playTurn(humanRow, humanCol);

      expect(humanResult.attack).toBe("hit");

      // The final Human attack sinks the last ship
      const isFinalAttack = i === humanAttacks.length - 1;

      // Final attack should end the game
      if (isFinalAttack) {
        expect(controller.winner).toBe(human);
        expect(controller.isGameActive).toBe(false);
        expect(controller.activePlayer).toBe(human);

        return;
      }

      // After a non-winning Human attack the turn should switch to the Computer

      expect(controller.activePlayer).toBe(computer);

      // Computer deliberately misses all of it's attacks

      const [cpuRow, cpuCol] = computerAttacks[i];

      const cpuResult = controller.playTurn(cpuRow, cpuCol);

      expect(cpuResult.attack).toBe("miss");

      // After both have played, it's the humans turn again

      expect(controller.activePlayer).toBe(human);
      expect(controller.isGameActive).toBe(true);
      expect(controller.winner).toBeNull();
    }

    // 6. VERIFY THE FINAL GAME STATE

    expect(computer.gameboard.isGameOver()).toBe(true);
    expect(human.gameboard.isGameOver()).toBe(false);

    expect(computer.gameboard.ships.every((ship) => ship.sunk)).toBe(true);

    expect(controller.winner).toBe(human);

    // 7. RESET THE GAME AND CHECK THE STATUS OF BOTH PLAYERS FLEETS

    controller.resetGame();

    expect(controller.isGameActive).toBe(false);
    expect(controller.winner).toBeNull();
    expect(controller.activePlayer).toBe(human);

    expect(human.gameboard.isGameOver()).toBe(false);
    expect(computer.gameboard.isGameOver()).toBe(false);

    expect(human.gameboard.ships.every((ship) => ship.timesHit === 0)).toBe(
      true,
    );

    expect(computer.gameboard.ships.every((ship) => ship.timesHit === 0)).toBe(
      true,
    );
  });
});
