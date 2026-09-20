//pass in opponents gameboard and determine coordinate to attack
export function getCpuAttack(humanBoard){
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    if(humanBoard.board[row][col].attacked !== "unattacked"){
        return getCpuAttack(humanBoard);
    } else{
        return [row, col];
    }
}

//Add smarter targetting here
//When the CPU successfully hits a ship, ensure that it's next attack
//attacks an adjacent tile to the hit tile. 

//important things to think of:
//Create a variable to store the last-hit tile. if [1,1] is a hit, 
//and it tries [0,1], but that's a miss, it should look for adjacent
//tiles of [1, 1], not [0, 1]. Only update the "lastHit" variable
//on a hit. (obviously)

//The CPU should also know once a ship that they've hit is sunk. 
//This will prevent them from continually attacking adjacent tiles
//when there is no more need to do so, after the ship they've found
//has been sunk


export function getCpuShip(cpuboard){
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);

    const directions = ["right", "left", "up", "down"];
    const direction = directions[Math.floor(Math.random() * directions.length)];
    
    //change this to be if(placeShip throws error, then recurse)
    if(cpuboard.board[row][col].ship !== null){
        return getCpuShip(cpuboard);
    } else{
        return [row, col, direction];
    }
}