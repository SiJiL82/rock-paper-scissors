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


