import Ship from "./ship.js";
import Gameboard from "./gameboard.js";
import GameController from "./game-controller.js";


// ship class testing
test.skip("successfully confirms if a ship is sunk", ()=>{
    const myShip = new Ship(4);
    myShip.hit();
    myShip.hit();
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk()).toBe(true);
});

test.skip("successfully confirms if a ship is NOT sunk", ()=>{
    const myShip = new Ship(4);
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk()).toBe(false);
});

test.skip("Changes sunk property on ship object", ()=>{
    const myShip = new Ship(2);
    myShip.hit();
    myShip.hit();
    myShip.isSunk();
    expect(myShip.sunk).toBe(true);
});



//gameboard class testing
test.skip("makeBoard() makes a 10 x 10 gameboard and doesn't duplicate", ()=>{
    const gameboard = new Gameboard();
    gameboard.createBoard();
    gameboard.createBoard();
    
    const board = gameboard.getBoard();

    expect(board.length).toBe(10);
    expect(board[0].length).toBe(10);

    board.forEach(row => {
        row.forEach(tile => {
            expect(tile).toEqual({ ship: null, attacked: "unattacked" });
        });
    });
});

test.skip("resetBoard() properly resets gameboard and ship data", ()=>{
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

    board.forEach(row => {
        row.forEach(tile => {
            expect(tile).toEqual({ ship: null, attacked: "unattacked" });
        });
    });
})

test.skip("Correctly places a ship horizontally", ()=>{
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

test.skip("Correctly places a ship vertically, (CONVERTS ROWS)", ()=>{
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

test.skip("Prevents placing the same ship twice", ()=>{
    const gameboard = new Gameboard();

    const myShip = gameboard.ships[2];
    gameboard.placeShip(1, 1, "up", myShip);
    
    expect(() => {
        gameboard.placeShip(6, 5, "up", myShip);
    }).toThrow("Ship already placed!");
});

test.skip("registers a hit ship correctly", ()=>{
    const gameboard = new Gameboard();

    const myShip = gameboard.ships[2];
    gameboard.placeShip(9, 1, "right", myShip);
    
    gameboard.receiveAttack(9, 2);

    const board = gameboard.getBoard();

    expect(board[0][2]).toEqual({ship: myShip, attacked: "hit"});
    expect(board[0][2].ship.timesHit).toBe(1);
});

test.skip("Correctly sinks a ship once all tiles are hit", ()=>{
    const gameboard = new Gameboard();
    
    const myShip = gameboard.ships[2];
    gameboard.placeShip(0, 1, "right", myShip);

    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(0, 3);

    expect(myShip.sunk).toEqual(true);
});

test.skip("inversion function converts row coordinate", ()=>{
    const gameboard = new Gameboard();

    const myShip = gameboard.ships[0];
    gameboard.placeShip(0, 1, "right", myShip);

    const board = gameboard.getBoard();

    expect(board[9][1]).toEqual({ship: myShip, attacked: "unattacked"});
});

test.skip("When all ships are sunk, the game is over", ()=>{
    const gameboard = new Gameboard();

    gameboard.ships.forEach(ship =>
        ship.sunk = true
    );

    expect(gameboard.isGameOver()).toBe(true);
});

test.skip("As long as at least one ship tile remains, the game isn't over", ()=>{
    const gameboard = new Gameboard();

    gameboard.ships.forEach(ship =>
        ship.sunk = true
    );

    gameboard.ships[0].sunk = false;

    expect(gameboard.isGameOver()).toBe(false);
});



//Game Controller methods and tests::
test("getOpponent() returns correct player", ()=>{
    const controller = new GameController();

    expect(controller.activePlayer).toBe(controller.players[0]);
    expect(controller.getOpponent()).toBe(controller.players[1]);
})

test("switchPlayers() changes activePlayer", ()=>{
    const controller = new GameController();
    
    expect(controller.activePlayer).toBe(controller.players[0]);
    controller.switchPlayers();
    expect(controller.activePlayer).toBe(controller.players[1]);
    controller.switchPlayers();
    expect(controller.activePlayer).toBe(controller.players[0]);
})

test("playTurn() throws an error if the game is already over", ()=>{
    const controller = new GameController();

    controller.isGameActive = false;
    expect(() => { 
        controller.playTurn(0, 0);
    }).toThrow("This game has concluded!");
})

test("playTurn() properly handles a winning attack", () => {
    const controller = new GameController();

    const finalShip = controller.players[1].board.ships[0];
    controller.players[1].board.placeShip(0, 0, "right", finalShip);

    controller.players[1].board.ships.forEach(ship => ship.sunk = true);
    finalShip.sunk = false;

    controller.playTurn(0, 0);

    expect(finalShip.sunk).toBe(true);
    expect(controller.winner).toBe(controller.players[0]);
    expect(controller.isGameActive).toBe(false);

    expect(controller.activePlayer).toBe(controller.players[0]);
})

test("playTurn() does not switch players after an invalid attack", () => {
    const controller = new GameController();

    // Attack once.
    controller.playTurn(0, 0);

    // Switch back manually so Player 1 attacks the same tile again.
    controller.switchPlayers();

    expect(() => {
        controller.playTurn(0, 0);
    }).toThrow();

    expect(controller.activePlayer).toBe(controller.players[0]);
})

test("checkWinner() returns true only when the opponent has lost", () => {
    const controller = new GameController();

    // Opponent still has ships.
    expect(controller.checkWinner()).toBe(false);

    controller.players[1].board.ships.forEach(ship => {
        ship.sunk = true;
    });

    expect(controller.checkWinner()).toBe(true);
})

test("resetGame() restores a fresh match", () => {
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
    board.forEach(row => {
        row.forEach(tile => {
            expect(tile).toEqual({
                ship: null,
                attacked: "unattacked"
            });
        });
    });
});