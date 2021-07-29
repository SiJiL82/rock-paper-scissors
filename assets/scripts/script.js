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
let numActiveElements = 5;

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

//Get fadeout time CSS variable to use when resetting picked elements
let pickedFadeoutTime = getComputedStyle(document.documentElement).getPropertyValue("--picked-fadeout-time");
pickedFadeoutTime = pickedFadeoutTime.substring(0, pickedFadeoutTime.length - 2);

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

    let rotationStep = 360 / numActiveElements;
    
    for(let i = 0; i < numActiveElements; i++) {
        let rotation = rotationStep * i;
        html += `
            <button class="game-button" id="${gameElements[i]}" type="button" style="transform: rotate(${rotation}deg) translate(200px) rotate(-${rotation}deg)"><i class="fas fa-hand-${gameElements[i]}"></i></button> 
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

//Remove button listeners
function removeElementButtonListeners() {
    //Loop through all game buttons and set a listener on their click to call pickElement
    let gameButtons = document.getElementsByClassName("game-button");

    for(let gameButton of gameButtons) {
        gameButton.removeEventListener("click", pickElement)
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
    //Stop letting the player click buttons until we've reset them
    removeElementButtonListeners();
    //Clear the pick highlighting
    let clearHighlightingTime = 900;
    setTimeout(function(){clearPickedElements()}, clearHighlightingTime);
    //Re-enable buttons
    setTimeout(function(){addElementButtonListeners()}, parseInt(clearHighlightingTime) + parseInt(pickedFadeoutTime) + 10);
    //Change center display text to let user know the next round can start
    setTimeout(function(){document.getElementById("result-text").innerText = "Go!";}, parseInt(clearHighlightingTime) + parseInt(pickedFadeoutTime) + 10);
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
    let playerScoreBarElement = document.getElementById("player-score-bar");
    let computerScoreBarElement = document.getElementById("computer-score-bar");
    //TODO: Create functions to replace the repeated code here.
    if(playerScoreBarWidth === 0) {
        //Set border width on player score to 0 to stop it contributing to the size of the element.
        playerScoreBarElement.style.borderWidth = "0px";
        //Set the computer score bar corners to rounded to match the CSS styling
        //TODO: Get this value from the stylesheet and apply it dynamically so we can change the styling and not have to change this code too
        computerScoreBarElement.style.borderTopLeftRadius = "2em";
        computerScoreBarElement.style.borderBottomLeftRadius = "2em";
    }
    else {
        //Set both score bars back to their default styling when the computer hasn't won 100% of the rounds
        playerScoreBarElement.style.borderWidth = scoreBorderWidth;
        computerScoreBarElement.style.borderTopLeftRadius = "unset";
        computerScoreBarElement.style.borderBottomLeftRadius = "unset";
    }
    //If the player has won 100% of the rounds so far, hide the computer score bar
    if(computerScoreBarWidth === 0) {
        //Set border width on computer score to 0 to stop it contributing to the size of the element.
        computerScoreBarElement.style.borderWidth = "0px";
        //Set the player score bar corners to rounded to match the CSS styling
        playerScoreBarElement.style.borderTopRightRadius = "2em";
        playerScoreBarElement.style.borderBottomRightRadius = "2em";
    }
    else {
        //Set both score bars back to their default styling when the computer hasn't won 100% of the rounds
        computerScoreBarElement.style.borderWidth = scoreBorderWidth;
        playerScoreBarElement.style.borderTopRightRadius = "unset";
        playerScoreBarElement.style.borderBottomRightRadius = "unset";
    }

    //Set each score bar to its calculated width
    playerScoreBarElement.style.width = playerScoreBarWidth + "%";
    computerScoreBarElement.style.width = computerScoreBarWidth + "%";
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

//Remove styling from picked elements
function clearPickedElements() {
    //Get the element that the player has picked
    let playerPickedElement = document.getElementById(playerPick);
    //Add the fadeout css class to the element
    playerPickedElement.classList.add("player-picked-fadeout");
    //After the fadeout has run, remove the class for it, and the player picked class.
    //TODO: The timeout value should be grabbed from the CSS so it can be changed there and used here without needing to update it
    setTimeout(function(){
        playerPickedElement.classList.remove("player-picked-fadeout");
        playerPickedElement.classList.remove("player-picked");
    }, parseInt(pickedFadeoutTime) + 10);

    //Get the element that the computer has picked
    let computerPickedElement = document.getElementById(computerPick);
    //Add the computer fadeout css class to the element
    computerPickedElement.classList.add("computer-picked-fadeout");
    //After the fadeout has run, remove the class for it, and the computer picked class.
    setTimeout(function(){
        computerPickedElement.classList.remove("computer-picked-fadeout");
        computerPickedElement.classList.remove("computer-picked");
    }, parseInt(pickedFadeoutTime) + 10);
}