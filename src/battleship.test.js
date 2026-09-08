import Ship from "./ship.js";
import Gameboard from "./gameboard.js";

const gameboard = new Gameboard();
gameboard.createBoard();

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
test.skip("makeBoard() makes a 10 x 10 gameboard", ()=>{
    const board = gameboard.getBoard();

    expect(board.length).toBe(10);
    expect(board[0].length).toBe(10);

    board.forEach(row => {
        row.forEach(tile => {
            expect(tile).toEqual({ ship: null, attacked: "unattacked" });
        });
    });
});

test.skip("Correctly places a ship of your choice on gameboard", ()=>{
    const myShip = gameboard.ships[2];
    gameboard.placeShip(0, 1, "right", myShip);

    const board = gameboard.getBoard();

    expect(board[0][1]).toEqual({ ship: myShip, attacked: "unattacked" });
    expect(board[0][2]).toEqual({ ship: myShip, attacked: "unattacked" });
    expect(board[0][3]).toEqual({ ship: myShip, attacked: "unattacked" });

    expect(board[0][0]).toEqual({ ship: null, attacked: "unattacked" });
    expect(board[0][4]).toEqual({ ship: null, attacked: "unattacked" });
});

test.skip("registers a hit ship correctly", ()=>{
    const myShip = gameboard.ships[2];
    gameboard.placeShip(0, 1, "right", myShip);
    
    gameboard.receiveAttack(0, 2);

    const board = gameboard.getBoard();

    expect(board[0][2]).toEqual({ship: myShip, attacked: "hit"});
    expect(board[0][2].ship.timesHit).toBe(1);
});

test("Correctly sinks a ship once all tiles are hit", ()=>{
    const myShip = gameboard.ships[2];
    gameboard.placeShip(0, 1, "right", myShip);

    gameboard.receiveAttack(0, 1);
    gameboard.receiveAttack(0, 2);
    gameboard.receiveAttack(0, 3);

    expect(myShip.sunk).toEqual(true);
});