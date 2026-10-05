import hitShipSound from "../audio-files/explosion.mp3";
import missAttackSound from "../audio-files/miss-attack-sound.mp3";
import sunkShipSound from "../audio-files/sunk-ship.mp3";
import winGameSound from "../audio-files/victory.mp3";
import loseGameSound from "../audio-files/loss.mp3";
import placeShipSound from "../audio-files/place-ship-sound.mp3";

export default function playSound(sound){
    let audio;

    //all game sounds
    const hit = new Audio(hitShipSound);
    const miss = new Audio(missAttackSound);
    const sunk = new Audio(sunkShipSound);
    const win = new Audio(winGameSound);
    const loss = new Audio(loseGameSound);
    const placeShip = new Audio(placeShipSound);

    if(sound === "hit") audio = hit;
    if(sound === "miss") audio = miss;
    if(sound === "sunk") audio = sunk;
    if(sound === "win") audio = win;
    if(sound === "loss") audio = loss;
    if(sound === "placeShip") audio = placeShip;

    audio.play()
        .then(() => {
            console.log("Audio playing successfully");
        })
        .catch(error => {
            console.error("Playback failed:", error);
        });
}