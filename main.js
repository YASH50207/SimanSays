let gameSeq = [];
let playerSeq = [];

let colors = ["red", "blue", "green", "yellow"];

let level = 0;
let gameStarted = false;


const startBtn = document.getElementById("start-btn");
const levelDisplay = document.getElementById("level-title");

const btnred = document.getElementById("red");
const btnblue = document.getElementById("blue");
const btngreen = document.getElementById("green");
const btnyellow = document.getElementById("yellow");




// add event listeners to buttons when click call btnFlash function
btnred.addEventListener("click", () => btnPress(btnred));
btnblue.addEventListener("click", () => btnPress(btnblue));
btngreen.addEventListener("click", () => btnPress(btngreen));
btnyellow.addEventListener("click", () => btnPress(btnyellow));




// start game when start button is clicked
startBtn.addEventListener("click", startGame);

function startGame() {

    if (!gameStarted) {
        gameStarted = true;
        gameSeq = [];
        playerSeq = [];
        level = 0;
        levelUp();


    }
}



// flash both by random and by player click
function btnFlash(btn) {

    btn.classList.add("pressed");
    setTimeout(() => {
        btn.classList.remove("pressed");
    }, 250);


}





function levelUp() {

    // increase level and update level display
    level++;
    levelDisplay.textContent = "Level " + level;




    // chose random color from colors array and add to gameSeq
    let randomColor = colors[Math.floor(Math.random() * colors.length)];

    // push the random color to gameSeq and get the button element by id and flash it
    gameSeq.push(randomColor);

    let rdmbtn = document.getElementById(randomColor);


    // after chosing random color flash the button
    btnFlash(rdmbtn);

}




function btnPress(btn) {
    // change btns color to black when player clicks and add the color to playerSeq
    btn.style.backgroundColor = "white";

    // get the color of the button and add to playerSeq
    let color = btn.id;
    playerSeq.push(color);

    // set timeout to change the color back to original after 500ms
    setTimeout(() => {
        btn.style.backgroundColor = "";
    }, 250);

    // check if the player's sequence is correct
    checkAns();


}


function checkAns() {

    // check if the last color in playerSeq is the same as the corresponding color in gameSeq
    if (playerSeq[playerSeq.length - 1] === gameSeq[playerSeq.length - 1]) {
        // if the player has completed the sequence, level up
        if (playerSeq.length === gameSeq.length) {
            playerSeq = [];
            setTimeout(levelUp, 250);
        }
    } else {
        // if the player gets the sequence wrong, reset the game
        gameStarted = false;
        // also display score and a message to start again
        let score = level;
        levelDisplay.textContent = "Game Over! Your score is " + score + ". Press Start to Play Again.";

        // for 3 seconds change the background color to red to indicate game over
        document.body.style.backgroundColor = "red";
        setTimeout(() => {
            document.body.style.backgroundColor = "";
        }, 1000);
    }
}



