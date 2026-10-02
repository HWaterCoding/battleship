//CPU COORDINATE TARGETTING + SHIP PLACEMENT LOGIC

export function CPU(){
    let lastAttack = null; //last coordinates attacked, ex: [3, 3]
    let currentHunt = []; //collection of recently hit tiles (before sunk)
    let attackOrientation = null; //attack direction (horizontal/vertical)
    let currentlyHunting = false; //CHANGE THIS TO REFLECT 3 STATES BELOW

    //change currentlyHunting to logic below.
    //SEARCH = no known hits, attacking randomly.
    //HUNT = one known hit, attacking adjacently
    //TARGET = two+ known hits, attacking on a known axis (orientation)
    //once ship is sunk, revert to search mode.

    // function getValidAttacks(attacks, humanBoard){
    //     const validAttacks = attacks.filter(([row, col]) =>{
    //         const insideBoard = row >= 0 && row <= 9 && col >= 0 && col <= 9;
    //         return insideBoard & !humanBoard.isAttacked(row, col);
    //     })
    //     return validAttacks;
    // }

    function getOrientedAttack(humanBoard){

        function getOrientation(){
            if(currentHunt.length < 2) return null;
            //loop through currentHunt --> compare values ask which coordinate is changing
            //if both are changing, then there is no orientation, return to adjacent targetting
            //if only one is changing, determine if orientation is vertical or horizontal

            const [firstHit] = currentHunt;
            const baseRow = firstHit[0];
            const baseCol = firstHit[1];

            let rowChanged = false;
            let colChanged = false;

            for(let i = 1; i < currentHunt.length; i++){
                const currentHit = currentHunt[i];

                if(currentHit[0] !== baseRow) rowChanged = true;
                if(currentHit[1] !== baseCol) colChanged = true;
            }

            if(rowChanged && colChanged) return null;
            if(rowChanged) return "vertical";
            if(colChanged) return "horizontal";
        }

        const orientedAttacks = [];

        const orientation = getOrientation();

        //compare the values of all row/col coordinates.
        //find the lowest and highest coordinates stored in the hunt
        //subtract and add 1 respectively to find the end points
        //return those two tiles as the next tiles to attack

        if(orientation === "vertical"){
            const [lowestFirst, lowestSecond] = currentHunt.reduce((minRow, currentRow) => 
                currentRow[0] < minRow[0] ? currentRow : minRow
            );
            orientedAttacks.push([lowestFirst - 1, lowestSecond]);
            
            const [highestFirst, highestSecond] = currentHunt.reduce((maxRow, currentRow) => 
                currentRow[0] > maxRow[0] ? currentRow : maxRow
            );
            orientedAttacks.push([highestFirst + 1, highestSecond]);

            return orientedAttacks;
        }

        if(orientation === "horizontal"){
            const [lowestFirst, lowestSecond] = currentHunt.reduce((minCol, currentCol) => 
                currentCol[1] < minCol[1] ? currentCol : minCol
            );
            orientedAttacks.push([lowestFirst, lowestSecond - 1]);
            
            const [highestFirst, highestSecond] = currentHunt.reduce((maxCol, currentCol) => 
                currentCol[1] > maxCol[1] ? currentCol : maxCol
            );
            orientedAttacks.push([highestFirst, highestSecond + 1]);

            return orientedAttacks;
        }

        if(orientation === null){
            currentlyHunting = false;
            //switch back to adjacent targetting here?
            //can maybe call getAdjacentAttack() right here, OR, when getOrientedAttack()
            //is called, ask if it returns null, if it does, switch to getAdjacentAttack()
        }

        //filter through 2 returned attacks for outside of board/already attacked
        const validAttacks = orientedAttacks.filter(([row, col]) =>{
            const insideBoard = row >= 0 && row <= 9 && col >= 0 && col <= 9;
            return insideBoard & !humanBoard.isAttacked(row, col);
        });

        return validAttacks[Math.floor(Math.random() * validAttacks.length)]
    }


    //generate random adjacent attack based on last tile hit
    function getAdjacentAttack(humanBoard){

        //UPDATE:: this and decide WHICH hit to adjacently attack and why/how
        const [row, col] = currentHunt[currentHunt.length - 1]; 

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
        };

        return validAttacks[Math.floor(Math.random() * validAttacks.length)];
    }


    //generate random attack on board
    //UPGRADE:: this to choose only from valid tiles rather than randomly guessing
    function getRandomAttack(){
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);

        return [row, col];
    }


    //choose between random/adjacent attack
    function chooseAttack(humanBoard){
        let attack; //name this result instead?


        //FIX THIS TO ACCOMODATE ORIENTED ATTACKS
        if(lastAttack === null) {
            attack = getRandomAttack();
        } else{
            const lastAttackInfo = humanBoard.getAttackInfo(...lastAttack);
            //if last attack was a hit, add it to the hunt
            if(lastAttackInfo.hit === true){
                currentHunt.push(lastAttack);

                //if sunk, we're no longer hunting. Attack randomly.
                if(lastAttackInfo.sunk === true){
                    currentlyHunting = false;
                    currentHunt = [];
                    attack = getRandomAttack();
                } else{
                    currentlyHunting = true;
                    //attack based on orientation if 2 or more successful hits
                    if(currentHunt.length >= 2){
                        attack = getOrientedAttack(humanBoard);
                    } else {
                        //if only 1 hit stored, attack adjacently
                        attack = getAdjacentAttack(humanBoard);
                    }
                }
            } else {
                //last attack was a miss
                //still hunting a ship despite that miss
                if(currentlyHunting){
                    if(currentHunt.length >= 2){
                        attack = getOrientedAttack(humanBoard);
                    } else{
                        attack = getAdjacentAttack(humanBoard);
                    }
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