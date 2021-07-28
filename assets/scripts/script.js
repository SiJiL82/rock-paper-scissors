let gameElements = ['rock','paper','scissors'];

addElementButtons();
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