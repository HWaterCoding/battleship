//CPU COORDINATE TARGETTING + SHIP PLACEMENT LOGIC

export function CPU(){
    let lastAttack = null; //last coordinates attacked, ex: [3, 3]
    let unresolvedHits = []; //collection of hit tiles that are not sunk
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
            if(unresolvedHits.length < 2) return null;
            //loop through currentHunt --> compare values ask which coordinate is changing
            //if both are changing, then there is no orientation, return to adjacent targetting
            //if only one is changing, determine if orientation is vertical or horizontal

            const [firstHit] = unresolvedHits;
            const baseRow = firstHit[0];
            const baseCol = firstHit[1];

            let rowChanged = false;
            let colChanged = false;

            for(let i = 1; i < unresolvedHits.length; i++){
                const currentHit = unresolvedHits[i];

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
            const [lowestFirst, lowestSecond] = unresolvedHits.reduce((minRow, currentRow) => 
                currentRow[0] < minRow[0] ? currentRow : minRow
            );
            orientedAttacks.push([lowestFirst - 1, lowestSecond]);
            
            const [highestFirst, highestSecond] = unresolvedHits.reduce((maxRow, currentRow) => 
                currentRow[0] > maxRow[0] ? currentRow : maxRow
            );
            orientedAttacks.push([highestFirst + 1, highestSecond]);
        }

        if(orientation === "horizontal"){
            const [lowestFirst, lowestSecond] = unresolvedHits.reduce((minCol, currentCol) => 
                currentCol[1] < minCol[1] ? currentCol : minCol
            );
            orientedAttacks.push([lowestFirst, lowestSecond - 1]);
            
            const [highestFirst, highestSecond] = unresolvedHits.reduce((maxCol, currentCol) => 
                currentCol[1] > maxCol[1] ? currentCol : maxCol
            );
            orientedAttacks.push([highestFirst, highestSecond + 1]);
        }

        if(orientation === null){
            currentlyHunting = false;
            return null;
        }

        //filter through 2 returned attacks for outside of board/already attacked
        const validAttacks = orientedAttacks.filter(([row, col]) =>{
            const insideBoard = row >= 0 && row <= 9 && col >= 0 && col <= 9;
            return insideBoard && !humanBoard.isAttacked(row, col);
        });

        return !validAttacks.length === 0 ? validAttacks[Math.floor(Math.random() * validAttacks.length)] : null;
    }


    //generate random adjacent attack based on last tile hit
    function getAdjacentAttack(humanBoard){

        if(unresolvedHits.length < 1) return null;

        const [row, col] = unresolvedHits[Math.floor(Math.random() * unresolvedHits.length)]; 

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

        return !validAttacks.length === 0 ? validAttacks[Math.floor(Math.random() * validAttacks.length)] : null;
    }


    //generate random attack on board
    //UPGRADE:: this to choose only from valid tiles rather than randomly guessing
    function getRandomAttack(){
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);

        return [row, col];
    }


    //choose between the three styles of attacking
    function chooseAttack(humanBoard){
        let result; 

        if(lastAttack === null){
            result = getRandomAttack();
        } else {
            let lastAttackInfo = humanBoard.getAttackInfo(...lastAttack);
            if(lastAttackInfo.hit === true){
                unresolvedHits.push(lastAttack);
                if(lastAttackInfo.sunk === true){
                    unresolvedHits = [];
                }
            }

            //attack in decreasing versions of logic to pick best move 
            result = getOrientedAttack(humanBoard);
            if(result === null) result = getAdjacentAttack(humanBoard);
            if(result === null) result = getRandomAttack();
        }

        lastAttack = result;
        return result;
    }


    //One function to reset the state of the CPU
    function resetCPU(){
        lastAttack = null;
        unresolvedHits = [];
        currentlyHunting = false;
    }

    return { resetCPU, chooseAttack }
}


//randomized placement of CPU ship objects 
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








//choose between random/adjacent/oriented attack
    // function chooseAttack(humanBoard){
    //     let attack;

    //     //FIX THIS TO ACCOMODATE ORIENTED ATTACKS
    //     if(lastAttack === null) {
    //         attack = getRandomAttack();
    //     } else{
    //         const lastAttackInfo = humanBoard.getAttackInfo(...lastAttack);

    //         //if last attack was a hit, add it to the hunt
    //         if(lastAttackInfo.hit === true){
    //             unresolvedHits.push(lastAttack);

    //             //if sunk, we're no longer hunting. Attack randomly.
    //             if(lastAttackInfo.sunk === true){
    //                 currentlyHunting = false; // Only if currentHunt = [];
    //                 unresolvedHits = []; //this is not correct. Could be other ships
    //                 attack = getRandomAttack();
    //             } else{
    //                 currentlyHunting = true;
    //                 //attack based on orientation if 2 or more successful hits
    //                 if(unresolvedHits.length >= 2){
    //                     attack = getOrientedAttack(humanBoard);
    //                 } else {
    //                     //if only 1 hit stored, attack adjacently
    //                     attack = getAdjacentAttack(humanBoard);
    //                 }
    //             }
    //             //last attack was a miss
    //         } else {
    //             //still hunting a ship despite that miss
    //             if(currentlyHunting){
    //                 if(unresolvedHits.length >= 2){
    //                     attack = getOrientedAttack(humanBoard);
    //                 } else{
    //                     attack = getAdjacentAttack(humanBoard);
    //                 }
    //             } else{
    //                 //last attack was a miss and we aren't hunting? random
    //                 attack = getRandomAttack();
    //             }
    //         }
    //     }

    //     if(humanBoard.isAttacked(...attack)){
    //         return chooseAttack(humanBoard);
    //     } else{
    //         lastAttack = attack;
    //         return attack;
    //     }
    // }