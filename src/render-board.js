//BOTH INITIAL DOM LOADING AND TURN-GENERATED DOM UPDATES

export function loadDOM(){

    //when creating the board and tile elements, attach the
    //proper index (x, y) of each tile to the element as a 
    //data attribute: (bottom left tile: data-x: 0, data-y: 0)

    for(let i = 0; i < 10; i++){
        //do stuff
    }
    //initial DOM creation of needed elements for page?
    //generate the 10x10 board and attach data-attributes to each tile
}

export function renderBoard(board){
    //display both play boards and render using Gameboard class info
}



//The opposing players board has to be invisible. So the computers board
//cannot be visible to the player.

//the "invisible" half of the board will only contain red "x's"
//to indicate incorrect guessses
//AND 
//fire emoji's to indicate correct guesses

//those tiles from contention and become unclickable
