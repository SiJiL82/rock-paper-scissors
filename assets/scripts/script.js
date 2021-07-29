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

//Set how many of the elements should be used in the game
let numActiveElements = 3;

//Score variables for the player and computer
let playerScore = 0;
let computerScore = 0;

//Score Bar Initial Widths
let playerScoreBarWidth = 50;
let computerScoreBarWidth = 50;

//Get border width from stylesheet for the score bars, so we can set it back to this value after clearing it
let playerScoreBar = document.getElementById("player-score-bar");
//This needs to be one of the border edges rather than the "border" pseudo-property
let scoreBorderWidth = window.getComputedStyle(playerScoreBar).borderTopWidth;

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
    
    for(let i = 0; i < numActiveElements; i++) {
        html += `
            <button class="game-button" id="${gameElements[i]}" type="button"><i class="fas fa-hand-${gameElements[i]}"></i></button> 
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
    computerPick = gameElements[Math.floor(Math.random() * numActiveElements)];
    console.log(`Computer picked element: ${computerPick}`);
}

//Add styling to the element the computer picked.
function highlightComputerPickedElement() {
    document.getElementById(computerPick).classList.add("computer-picked");
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
                    updatePlayerScoreDisplay();
                }
                else {
                    //Computer index matches the first item in the array, so computer won
                    resultDisplay.innerHTML += "<br>I win!";
                    computerScore++;
                    updateComputerScoreDisplay();
                }
                //If we've matched a fight, no point checking the rest
                break;
            }
        }
        updateScoreBarDisplay();
    }
}

//Set the score bar so each player's score is a percentage of the total cumulated score
function updateScoreBarDisplay() {
    //Get the cumulated score for both players
    let totalScore = playerScore + computerScore;
    //Set player score bar width to their score as a percentage of the total
    let playerScoreBarWidth = (playerScore / totalScore) * 100;
    //Set computer score bar width to 100% - player score percentage to avoid any floating point issues.
    let computerScoreBarWidth = 100 - playerScoreBarWidth;

    //If the computer has won 100% of the rounds so far, hide the player score bar
    //TODO: Get the elements once into variables and use those instead of finding them every time
    //TODO: Create functions to replace the repeated code here.
    if(playerScoreBarWidth === 0) {
        //Set border width on player score to 0 to stop it contributing to the size of the element.
        document.getElementById("player-score-bar").style.borderWidth = "0px";
        //Set the computer score bar corners to rounded to match the CSS styling
        //TODO: Get this value from the stylesheet and apply it dynamically so we can change the styling and not have to change this code too
        document.getElementById("computer-score-bar").style.borderTopLeftRadius = "2em";
        document.getElementById("computer-score-bar").style.borderBottomLeftRadius = "2em";
    }
    else {
        //Set both score bars back to their default styling when the computer hasn't won 100% of the rounds
        document.getElementById("player-score-bar").style.borderWidth = scoreBorderWidth;
        document.getElementById("computer-score-bar").style.borderTopLeftRadius = "unset";
        document.getElementById("computer-score-bar").style.borderBottomLeftRadius = "unset";
    }
    //If the player has won 100% of the rounds so far, hide the computer score bar
    if(computerScoreBarWidth === 0) {
        //Set border width on computer score to 0 to stop it contributing to the size of the element.
        document.getElementById("computer-score-bar").style.borderWidth = "0px";
        //Set the player score bar corners to rounded to match the CSS styling
        document.getElementById("player-score-bar").style.borderTopRightRadius = "2em";
        document.getElementById("player-score-bar").style.borderBottomRightRadius = "2em";
    }
    else {
        //Set both score bars back to their default styling when the computer hasn't won 100% of the rounds
        document.getElementById("computer-score-bar").style.borderWidth = scoreBorderWidth;
        document.getElementById("player-score-bar").style.borderTopRightRadius = "unset";
        document.getElementById("player-score-bar").style.borderBottomRightRadius = "unset";
    }

    //Set each score bar to its calculated width
    document.getElementById("player-score-bar").style.width = playerScoreBarWidth + "%";
    document.getElementById("computer-score-bar").style.width = computerScoreBarWidth + "%";
}

//Set the player's score in the HTML
function updatePlayerScoreDisplay() {
    let playerScoreText = document.getElementById("player-score");
    playerScoreText.innerText = playerScore;
}

//Set the computer's score in the HTML
function updateComputerScoreDisplay() {
    let computerScoreText = document.getElementById("computer-score");
    computerScoreText.innerText = computerScore;
}

