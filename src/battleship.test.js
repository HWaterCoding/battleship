import Ship from "./ship.js";
import Gameboard from "./gameboard.js";

// ship class testing
test("successfully confirms if a ship is sunk", ()=>{
    const myShip = new Ship(4);
    myShip.isHit();
    myShip.isHit();
    myShip.isHit();
    myShip.isHit();
    expect(myShip.isSunk()).toBe(true);
});

test("successfully confirms if a ship is NOT sunk", ()=>{
    const myShip = new Ship(4);
    myShip.isHit();
    myShip.isHit();
    expect(myShip.isSunk()).toBe(false);
});

test("Changes sunk property on ship object", ()=>{
    const myShip = new Ship(2);
    myShip.isHit();
    myShip.isHit();
    myShip.isSunk();
    expect(myShip.sunk).toBe(true);
});



//gameboard class testing
// test("makeBoard() makes a 10 x 10 gameboard", ()=>{
//     const board = new Gameboard();
//     board.createBoard();
//     expect(board.getBoard()).toStrictEqual([
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//         [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
//     ]);
// });