//CPU COORDINATE TARGETTING + SHIP PLACEMENT LOGIC

export function CPU(){
    let lastAttack = null; //last coordinates attacked, ex: [3, 3]
    let currentHunt = []; //collection of recently hit tiles (before sunk)
    let currentlyHunting = false; //boolean to ask if we attack adjacently
    let attackOrientation = null; //attack direction (horizontal/vertical)


    //generate random adjacent attack based on last tile hit
    function getAdjacentAttack(humanBoard){
        //NOT DONE, CONSIDER DIRECTIONAL ATTACKING
        //in order to determine if the ship is horizontal/vertical
        //compare two or more successful hits, and ask which coordinate
        //is changing. if the row is changing, the ship is vertical
        //if the column is changing, the ship is horizontal.
        //change the attackOrientation to the result, then write a new
        //algorithm to only change the coordinates along that axis.


        //(probably change this simply to the first element in the array)
        //then compare subsequent elements to determine direction
        const [row, col] = currentHunt[currentHunt.length - 1]; //MAYBE?

        const potentialAttacks = [
            [row + 1, col],
            [row - 1, col],
            [row, col + 1],
            [row, col - 1]
        ];

        //return only tiles on the board that haven't been attacked already
        const validAttacks = potentialAttacks.filter(([row, col]) =>{
            const insideBoard =  row >= 0 && row <= 9 && col >= 0 && col <= 9;
            return insideBoard && !humanBoard.isAttacked(row, col);
        });

        if(validAttacks.length === 0){
            throw new Error("No valid adjacent tiles to attack.");
        }; //UNSURE ABOUT THIS ERROR? Should hopefully never happen?

        return validAttacks[Math.floor(Math.random() * validAttacks.length)];
    }


    //generate random attack on board
    function getRandomAttack(){
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);

        return [row, col];
    }


    //choose between random/adjacent attack
    function chooseAttack(humanBoard){
        let attack; //name this result instead?

        if(lastAttack === null) {
            attack = getRandomAttack();
        } else{
            const lastAttackInfo = humanBoard.getAttackInfo(...lastAttack);
            if(lastAttackInfo.hit === true){
                currentHunt.push(lastAttack);
                if(lastAttackInfo.sunk === true){
                    //if sunk, we're no longer hunting. Attack randomly.
                    currentlyHunting = false;
                    attack = getRandomAttack();
                } else{
                    //if not sunk, still hunting, attack adjacently
                    currentlyHunting = true;
                    attack = getAdjacentAttack(humanBoard);
                }
            } else {
                //last attack was a miss
                if(currentlyHunting){
                    //are we still hunting a ship despite that miss? adjacent
                    attack = getAdjacentAttack(humanBoard);
                } else{
                    //last attack was a miss and we aren't hunting? random
                    attack = getRandomAttack();
                }
            }
        }

        if(humanBoard.isAttacked(...attack)){
            return chooseAttack(humanBoard);
        } else{
            lastAttack = attack;
            return attack;
        }
    }


    //One function to reset the state of the CPU
    function resetCPU(){
        lastAttack = null;
        currentHunt = [];
        currentlyHunting = false;
        attackOrientation = null;
    }

    return { resetCPU, chooseAttack }
}






//create a variable "lastAttack = null" in getCpuAttack function at top
//ask if the lastAttack was a hit. (careful of inversion)
//if last attack was a hit
//inside if(lastAttack = hit), ask if the ship got sunk.
//if the ship wasn't sunk, create algorithm to attack adjacently.
//if the ship was sunk, exit conditional and continue function call

//if last attack wasn't a hit, then get the random row and col coordinates.

//check the final coordinates generated if attacked. 
//if attacked already, call getCpuAttack() recursively.
//else, update "lastAttack" to current coordinates and return them



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



export function placeCpuShips(cpuBoard) {
    const directions = ["right", "left", "up", "down"];
    let i = 0;

    while (i < cpuBoard.ships.length) {
        try {
            const row = Math.floor(Math.random() * 10);
            const col = Math.floor(Math.random() * 10);
            const direction = directions[Math.floor(Math.random() * directions.length)];
            const newShip = cpuBoard.ships[i];

            cpuBoard.placeShip(row, col, direction, newShip);
            i++;
        } catch {
            //do nothing with error, it's expected.
        }
    }
}