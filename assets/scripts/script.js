let gameElements = ['rock','paper','scissors'];

let playerScore = 0;
let computerScore = 0;

let playerPick;
let computerPick;

addElementButtons();
addElementButtonListeners();
/*
Icons:
<i class="fas fa-hand-rock"></i>
<i class="fas fa-hand-scissors"></i>
<i class="fas fa-hand-paper"></i>
*/

function addElementButtons() {
    let buttonArea = document.getElementById("game-buttons")

    let html = "";
    for(let gameElement of gameElements) {
        html += `
                <button class="game-button" id="${gameElement}" type="button"><i class="fas fa-hand-${gameElement}"></i></button> 
        `
    }
    buttonArea.innerHTML = html;
}

function addElementButtonListeners() {
    //Loop through all game buttons and set a listener on their click to call pickElement
    let gameButtons = document.getElementsByClassName("game-button");

    for(let gameButton of gameButtons) {
        gameButton.addEventListener("click", pickElement)
    }
}

function pickElement(event) {
    //Set playerPick to the id of the button we've clicked on
    playerPick = event.currentTarget.id;
    console.log(`Picked element: ${playerPick}`);
    //Add styling to the picked button to show we've chosen it
    highlightPickedElement(event.currentTarget);
    //Let computer pick element
    computerPickElement();
    highlightComputerPickedElement();

    getRoundWinner();
}

function highlightPickedElement(target) {
    target.classList.add("player-picked");
}

function computerPickElement() {
    //Set computerPick to a random element
    computerPick = gameElements[Math.floor(Math.random() * gameElements.length)];
    console.log(`Computer picked element: ${computerPick}`);
}

function highlightComputerPickedElement() {
    target = document.getElementById(computerPick);
    target.classList.add("computer-picked");
}

function getRoundWinner() {
    let resultDisplay = document.getElementById("result-text");

    let playerPickIndex = gameElements.indexOf(playerPick);
    let computerPickIndex = gameElements.indexOf(computerPick);

    //Player picked element at end of array, which beats element at start of array
    let playerWin = false;
    let computerWin = false;
    playerWin = ((computerPickIndex == gameElements.length - 1) && (playerPickIndex == 0))
        || playerWin;
    // console.log(playerWin);
    playerWin = (playerPickIndex > computerPickIndex)
        && !((playerPickIndex == gameElements.length - 1) && (computerPickIndex == 0))
        || playerWin;
    // console.log(playerWin);
    computerWin = ((playerPickIndex == gameElements.length - 1) && (computerPickIndex == 0))
        || computerWin;
    // console.log(computerWin);
    computerWin = (computerPickIndex > playerPickIndex ) 
        && !((computerPickIndex == gameElements.length - 1) && (playerPickIndex == 0))
        || computerWin;
    // console.log(computerWin);

    if(playerWin){
        resultDisplay.innerText = "You Win!";
        playerScore++;
    }
    else if(computerWin) {
        resultDisplay.innerText = "I win!"
        computerScore++;
    }
    else {
        resultDisplay.innerText = "Draw!"
    }

}
