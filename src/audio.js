import hitShipSound from "../assets/audio-files/explosion.mp3";
import missAttackSound from "../assets/audio-files/miss-attack-sound.mp3";
import sunkShipSound from "../assets/audio-files/sunken-ship.mp3";
import winGameSound from "../assets/audio-files/victory.mp3";
import loseGameSound from "../assets/audio-files/loss.mp3";
import placeShipSound from "../assets/audio-files/place-ship-sound.mp3";

//all game sounds
const sounds = {
    hit: new Audio(hitShipSound),
    miss: new Audio(missAttackSound),
    sunk: new Audio(sunkShipSound),
    win: new Audio(winGameSound),
    loss: new Audio(loseGameSound),
    placeShip: new Audio(placeShipSound),
}

let currentAudio = null;

export default function playSound(sound){
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    currentAudio = sounds[sound];
    currentAudio.currentTime = 0;   

    currentAudio.play().catch(error => {
        console.error("Playback failed:", error);
    });
}