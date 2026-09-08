//give ships size, times theyve been hit, and if they are sunk
export default class Ship{
    constructor(length){
        this.length = length;
        this.timesHit = 0;
        this.sunk = false;
    }

    hit(){
        this.timesHit++;
    }

    //compare length of ship to # of times it's been hit
    isSunk(){
        return this.length === this.timesHit ?
        this.sunk = true : this.sunk = false;
    }
}