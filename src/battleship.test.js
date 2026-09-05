import Ship from "./ship.js";
import Gameboard from "./gameboard.js";

// ship class testing
test.skip("successfully confirms if a ship is sunk", ()=>{
    const myShip = new Ship(4);
    myShip.isHit();
    myShip.isHit();
    myShip.isHit();
    myShip.isHit();
    expect(myShip.isSunk()).toBe(true);
});

test.skip("successfully confirms if a ship is NOT sunk", ()=>{
    const myShip = new Ship(4);
    myShip.isHit();
    myShip.isHit();
    expect(myShip.isSunk()).toBe(false);
});

test.skip("Changes sunk property on ship object", ()=>{
    const myShip = new Ship(2);
    myShip.isHit();
    myShip.isHit();
    myShip.isSunk();
    expect(myShip.sunk).toBe(true);
});



//gameboard class testing
test.skip("makeBoard() makes a 10 x 10 gameboard", ()=>{
    const gameboard = new Gameboard();
    gameboard.createBoard();
    const board = gameboard.getBoard();

    expect(board.length).toBe(10);
    expect(board[0].length).toBe(10);

    board.forEach(row => {
        row.forEach(tile => {
            expect(tile).toEqual({ value: 0, ship: "none" });
        });
    });
});

test("places a ship and changes values from 0 to 1", ()=>{
    const gameboard = new Gameboard();
    gameboard.createBoard();

    const myShip = new Ship(3);
    gameboard.placeShip(0, 1, "right", myShip);

    const board = gameboard.getBoard();

    expect(board[0][1]).toEqual({value: 1, ship: "none"});
    expect(board[0][2]).toEqual({value: 1, ship: "none"});
    expect(board[0][3]).toEqual({value: 1, ship: "none"});

    expect(board[0][0]).toEqual({value: 0, ship: "none"});
    expect(board[0][4]).toEqual({value: 0, ship: "none"});
});