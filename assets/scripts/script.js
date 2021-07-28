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

    if(playerPickIndex == computerPickIndex) {
        //Draw, no score added
        resultDisplay.innerText = "Draw!";
    }
    //Player picked element at end of array, which beats element at start of array
    else if((playerPickIndex == gameElements.length - 1) && (computerPickIndex == 0)) {
        //Player wins
        resultDisplay.innerText = "You win!";
        playerScore++;
    }
    //Computer picked element at end of array, player picked start of array
    else if((computerPickIndex == gameElements.length - 1) && (playerPickIndex == 0)) {
        //Computer wins
        resultDisplay.innerText = "I win!"
        computerScore++;
    }
    else if(playerPick > computerPick) {
        //Player wins
        resultDisplay.innerText = "You win!";
        playerScore++;
    }
    else {
        //Computer wins
        resultDisplay.innerText = "I win!"
        computerScore++;
    }

}
