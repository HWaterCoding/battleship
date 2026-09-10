import Ship from "./ship.js";
import Gameboard from "./gameboard.js";



// ship class testing
test("successfully confirms if a ship is sunk", ()=>{
    const myShip = new Ship(4);
    myShip.hit();
    myShip.hit();
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk()).toBe(true);
});

test("successfully confirms if a ship is NOT sunk", ()=>{
    const myShip = new Ship(4);
    myShip.hit();
    myShip.hit();
    expect(myShip.isSunk()).toBe(false);
});

test("Changes sunk property on ship object", ()=>{
    const myShip = new Ship(2);
    myShip.hit();
    myShip.hit();
    myShip.isSunk();
    expect(myShip.sunk).toBe(true);
});



//gameboard class testing
test("makeBoard() makes a 10 x 10 gameboard and doesn't duplicate", ()=>{
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

test("resetBoard() properly resets gameboard and ship data", ()=>{
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

test("Correctly places a ship horizontally", ()=>{
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

test("Correctly places a ship vertically, (CONVERTS ROWS)", ()=>{
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

test("Prevents placing the same ship twice", ()=>{
    const gameboard = new Gameboard();

    const myShip = gameboard.ships[2];
    gameboard.placeShip(1, 1, "up", myShip);
    
    expect(() => {
        gameboard.placeShip(6, 5, "up", myShip);
    }).toThrow("Ship already placed!");
});

test("registers a hit ship correctly", ()=>{
    const gameboard = new Gameboard();

    const myShip = gameboard.ships[2];
    gameboard.placeShip(9, 1, "right", myShip);
    
    gameboard.receiveAttack(9, 2);

    const board = gameboard.getBoard();

    expect(board[0][2]).toEqual({ship: myShip, attacked: "hit"});
    expect(board[0][2].ship.timesHit).toBe(1);
});

test("Correctly sinks a ship once all tiles are hit", ()=>{
    const gameboard = new Gameboard();
    
    const myShip = gameboard.ships[2];
    gameboard.placeShip(0, 1, "right", myShip);

    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(0, 3);

    expect(myShip.sunk).toEqual(true);
});

test("inversion function converts row coordinate", ()=>{
    const gameboard = new Gameboard();

    const myShip = gameboard.ships[0];
    gameboard.placeShip(0, 1, "right", myShip);

    const board = gameboard.getBoard();

    expect(board[9][1]).toEqual({ship: myShip, attacked: "unattacked"});
});

test("When all ships are sunk, the game is over", ()=>{
    const gameboard = new Gameboard();

    gameboard.ships.forEach(ship =>
        ship.sunk = true
    );

    expect(gameboard.isGameOver()).toBe(true);
});

test("As long as at least one ship tile remains, the game isn't over", ()=>{
    const gameboard = new Gameboard();

    gameboard.ships.forEach(ship =>
        ship.sunk = true
    );

    gameboard.ships[0].sunk = false;

    expect(gameboard.isGameOver()).toBe(false);
});



//Players Class methods
