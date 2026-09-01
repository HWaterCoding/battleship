//give ships size, times theyve been hit, and if they are sunk
export default class Ship{
    constructor(length){
        this.length = length;
        this.hit = 0;
        this.sunk = false;
    }

    isHit(){
        this.hit++;
    }

    //compare length of ship to # of times it's been hit
    isSunk(){
        return this.length === this.hit ? true : false;
    }
}