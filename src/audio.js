import hitShipSound from "../audio-files/explosion.mp3";
import missAttackSound from "../audio-files/miss-attack-sound.mp3";
import sunkShipSound from "../audio-files/sunk-ship.mp3";
import winGameSound from "../audio-files/victory.mp3";
import loseGameSound from "../audio-files/loss.mp3";
import placeShipSound from "../audio-files/place-ship-sound.mp3";

//all game sounds
const sounds = {
    hit: new Audio(hitShipSound),
    miss: new Audio(missAttackSound),
    sunk: new Audio(sunkShipSound),
    win: new Audio(winGameSound),
    loss: new Audio(loseGameSound),
    placeShip: new Audio(placeShipSound),
}

export default function playSound(sound){
    const audio = sounds[sound];    

    audio.play().catch(error => {
        console.error("Playback failed:", error);
    });
}