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
    //Set myPick to the id of the button we've clicked on
    myPick = event.currentTarget.id;
    console.log(`Picked element: ${myPick}`);
    //Add styling to the picked button to show we've chosen it
    highlightPickedElement(event.currentTarget);
}

function highlightPickedElement(target) {
    //this.classList.add("player-picked");
    console.log(target);
    target.classList.add("player-picked");
}


let myPick;
let computerPick;