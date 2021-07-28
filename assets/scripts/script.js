let gameElements = ['rock','paper','scissors'];

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
            <div class="game-button-container">
                <button class="game-button" id="${gameElement}" type="button"><i class="fas fa-hand-${gameElement}"></i></button> 
            </div>
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

function pickElement() {
    //Set myPick to the id of the button we've clicked on
    myPick = this.id;
}


let myPick;
let computerPick;