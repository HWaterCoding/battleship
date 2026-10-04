export function CPU(){
    let lastAttack = null; //last coordinate attacked
    let unresolvedHits = []; //collection of hit tiles that are not sunk

    //Future Update::
    //right now, a limitation to this function is that it cannot distinguish
    //1 contiguous ship from 2 separate ships along the same axis.
    //ex: [1,3], [2,3] ---> [4,3], [5,3], [6,3] ([3,3] separates)

    //get an orientedAttack based on unresolvedHits
    function getOrientedAttack(humanBoard){
        function getOrientation(){
            if(unresolvedHits.length < 2) return null;
            //loop through unresolvedHits --> compare values ask which coordinate is changing
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

        if(orientation === null) return null;

        //filter through oriented attacks for outside of board/already attacked
        const validAttacks = orientedAttacks.filter(([row, col]) =>{
            const insideBoard = row >= 0 && row <= 9 && col >= 0 && col <= 9;
            return insideBoard && !humanBoard.isAttacked(row, col);
        });

        return validAttacks.length !== 0 ? validAttacks[Math.floor(Math.random() * validAttacks.length)] : null;
    }

    //generate random adjacent attack based on last tile hit
    function getAdjacentAttack(humanBoard){
        if(unresolvedHits.length < 1) return null;

        const potentialAttacks = [];

        for(const unresolvedHit of unresolvedHits){
            const [row, col] = unresolvedHit;
            const adjacentAttacks = [
                [row + 1, col],
                [row - 1, col],
                [row, col + 1],
                [row, col - 1]
            ]
            potentialAttacks.push(...adjacentAttacks);
        }

        //return only tiles on the board that haven't been attacked already
        const validAttacks = potentialAttacks.filter(([row, col]) =>{
            const insideBoard =  row >= 0 && row <= 9 && col >= 0 && col <= 9;
            return insideBoard && !humanBoard.isAttacked(row, col);
        });

        return validAttacks.length !== 0 ? validAttacks[Math.floor(Math.random() * validAttacks.length)] : null;
    }

    //generate random attack on board
    function getRandomAttack(humanBoard){
        const validAttacks = [];
        for(let i = 0; i <= 9; i++){
            for(let j = 0; j <= 9; j++){
                const attack = [i, j]
                if(!humanBoard.isAttacked(...attack)){
                    validAttacks.push(attack)
                }
            }
        }
        return validAttacks[Math.floor(Math.random() * validAttacks.length)];
    }

    //Future Update::
    //Currently we clear unresolvedHits when one ship in it is sunk, however,
    //there is the possibility that there are unresolvedHits belonging to 
    //2 or more ships. Fix this by deciding how to remove the correct ship.

    //choose between the three styles of attacking
    function chooseAttack(humanBoard){
        let result; 

        if(lastAttack === null){
            result = getRandomAttack(humanBoard);
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
            if(result === null) result = getRandomAttack(humanBoard);
        }

        lastAttack = result;
        return result;
    }

    //function to reset the state of the CPU
    function resetCPU(){
        lastAttack = null;
        unresolvedHits = [];
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