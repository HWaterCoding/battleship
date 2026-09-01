import Ship from "./ship.js";

//ship class testing
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