//All potential elements for the game
let gameElements = ["rock","paper","scissors","lizard","spock"];
//Fight data - first item is the winner, 2nd the element it beats. 3rd item is the action for the fight.
let fights = [
    [0, 2, "blunts"],
    [1, 0, "covers"],
    [2, 1, "cuts"],
    [0, 3, "crushes"],
    [1, 4, "disproves"],
    [2, 3, "decapitates"],
    [3, 1, "eats"],
    [3, 4, "poisons"],
    [4, 2, "smashes"],
    [4, 0, "vapourises"]
]

//Score variables for the player and computer
let playerScore = 0;
let computerScore = 0;

//Chosen elements for the player and computer
let playerPick;
let computerPick;

//Initialise the game
addElementButtons();
addElementButtonListeners();

//Add a button for each element in the elements array
function addElementButtons() {
    //Get the div on the main page to insert the buttons into
    let buttonArea = document.getElementById("game-buttons")

    //Append to html string a button for each element
    let html = "";
    for(let gameElement of gameElements) {
        html += `
            <button class="game-button" id="${gameElement}" type="button"><i class="fas fa-hand-${gameElement}"></i></button> 
        `
    }
    //Set the HTML on the page to the generated html string
    buttonArea.innerHTML = html;
}

//Add a listener to each element button
function addElementButtonListeners() {
    //Loop through all game buttons and set a listener on their click to call pickElement
    let gameButtons = document.getElementsByClassName("game-button");

    for(let gameButton of gameButtons) {
        gameButton.addEventListener("click", pickElement)
    }
}

//Main game function - called when the player clicks on an element.
function pickElement(event) {
    //Set playerPick to the id of the button we've clicked on
    //TODO: Add error handling to make sure the ID exists in the gameElements array
    playerPick = event.currentTarget.id;
    console.log(`Picked element: ${playerPick}`);
    //Add styling to the picked button to show we've chosen it
    highlightPickedElement(event.currentTarget);
    
    //Let computer pick element
    computerPickElement();
    //Add styling to the button computer picked to show what they've chosen
    highlightComputerPickedElement();

    //Check the picked elements and get the round winner
    getRoundWinner();
}

//Add styling to the player picked element to show it's the chosen item
function highlightPickedElement(target) {
    target.classList.add("player-picked");
}

//Get the computer picked element randomly.
function computerPickElement() {
    //Set computerPick to a random element
    computerPick = gameElements[Math.floor(Math.random() * gameElements.length)];
    console.log(`Computer picked element: ${computerPick}`);
}

//Add styling to the element the computer picked.
function highlightComputerPickedElement() {
    target = document.getElementById(computerPick);
    target.classList.add("computer-picked");
}

//After both player and computer have picked an element, compare them against the fights array to see who wins.
function getRoundWinner() {
    //Element to display the round outcome text in
    let resultDisplay = document.getElementById("result-text");

    //Convert the picked element to its array position to compare against the fights array
    let playerPickIndex = gameElements.indexOf(playerPick);
    let computerPickIndex = gameElements.indexOf(computerPick);

    //If both indexes are the same, the same elements were chosen and the round is a draw
    if(playerPickIndex === computerPickIndex) {
        resultDisplay.innerText = "Draw!";
    }
    else {
        //Loop through each possible outcome in the fights array
        for(let fight of fights) {
            //If both chosen elements are in this fight, it's the correct one
            if(fight.includes(playerPickIndex) && fight.includes(computerPickIndex)) {
                //Set outcome display text to the elements and the fight action from the array
                resultDisplay.innerText = `${gameElements[fight[0]]} ${fight[2]} ${gameElements[fight[1]]}`;
                //Player index matches first fight position, so they won
                if(playerPickIndex == fight[0]) {
                    resultDisplay.innerHTML += "<br>You win!";
                    playerScore++;
                }
                else {
                    //Computer index matches the first item in the array, so computer won
                    resultDisplay.innerHTML += "<br>I win!";
                    computerScore++;
                }
                //If we've matched a fight, no point checking the rest
                break;
            }
        }
    }
}
