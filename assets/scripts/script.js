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

//Get score bar text colours from CSS
let playerScoreTextColour = window.getComputedStyle(playerScoreBar).color;
let computerScoreTextColour = window.getComputedStyle(document.getElementById("computer-score-bar")).color;

//Get fadeout time CSS variable to use when resetting picked elements
let pickedFadeoutTime = getComputedStyle(document.documentElement).getPropertyValue("--picked-fadeout-time");
pickedFadeoutTime = pickedFadeoutTime.substring(0, pickedFadeoutTime.length - 2);

//Chosen elements for the player and computer
let playerPick;
let computerPick;

//Initialise the game
addListenersToDifficultySelector();
setNumActiveElements(numActiveElements);

//Add listeners to the difficulty selector radio buttons so they can be clicked on to set the difficulty
function addListenersToDifficultySelector() {
    //Get all the difficulty selector elements
    let selectors = document.getElementsByName("difficulty-selector");
    for(let selector of selectors) {
        selector.addEventListener("click", setNumActiveElements);
    }
}

//Set how many elements are active
function setNumActiveElements(num) {
    //Remove any existing element button listeners
    removeElementButtonListeners();
    //Set to value passed to function for initial loading
    if(typeof(num) === "number") {
        numActiveElements = num;
    }
    else {
        //Otherwise use the value in the radio button 
        numActiveElements = this.value;
    }
    //Add the new number of element buttons.
    //Don't need to remove the old ones because the whole HTML structure is replaced.
    addElementButtons();
    //Add listeners to the new element buttons
    addElementButtonListeners();
    //Update the header and title text
    setHeaderTitleText();
    //Reset scores
    resetScores();
    resetDifficultyControls();
}

//Reset player and computer scores to 0
function resetScores() {
    playerScore = 0;
    computerScore = 0;
    updatePlayerScoreDisplay();
    updateComputerScoreDisplay();
    resetScoreBar();
}

//Add a button for each element in the elements array
function addElementButtons() {
    //Get the div on the main page to insert the buttons into
    let buttonArea = document.getElementById("game-buttons");
    
    //Append to html string a button for each element
    let html = "";

    let rotationStep = 360 / numActiveElements;

    let buttonTranslateOffset = buttonArea.clientWidth / 3;
    if(document.body.clientWidth >= 750) {
        for(let i = 0; i < numActiveElements; i++) {
            let rotation = rotationStep * i;
            html += `
                <button class="game-button" id="${gameElements[i]}" type="button" aria-label="${gameElements[i]} button" style="transform: rotate(${rotation}deg) translate(0, -${buttonTranslateOffset}px) rotate(-${rotation}deg); "><i class="fas fa-hand-${gameElements[i]}"></i></button> 
            `
        }
    }
    else {
        for(let i = 0; i < numActiveElements; i++) {
            html += `
            <button class="game-button" id="${gameElements[i]}" type="button" aria-label="${gameElements[i]} button"><i class="fas fa-hand-${gameElements[i]}"></i></button> 
        `            
        }
    }

    //Set the HTML on the page to the generated html string
    buttonArea.innerHTML = html;
}

//Add a listener to each element button
function addElementButtonListeners() {
    //Loop through all game buttons and set a listener on their click to call pickElement
    let gameButtons = document.getElementsByClassName("game-button");

    for(let gameButton of gameButtons) {
        gameButton.addEventListener("click", pickElement);
    }
}

//Remove button listeners
function removeElementButtonListeners() {
    //Loop through all game buttons and set a listener on their click to call pickElement
    let gameButtons = document.getElementsByClassName("game-button");

    for(let gameButton of gameButtons) {
        gameButton.removeEventListener("click", pickElement);
    }
}

//Set the page header and window title to the elements we're currently using.
function setHeaderTitleText() {
    //Get the header element
    let headerElement = document.getElementsByTagName("header");

    let html = "";
    let htmlSeparator = "<br>";
    if(document.body.clientWidth <= 910) {
        htmlSeparator = ", ";
    }
    if(document.body.clientWidth <= 305) {
        htmlSeparator = ":";
        for(let i =  0; i < numActiveElements; i++) {
            html += 
`${gameElements[i].substring(0, 1).toUpperCase()}${htmlSeparator}`;
        }
    }
    else {
        //Loop through the current game elements and add them to the HTML string
        for(let i =  0; i < numActiveElements; i++) {
            html += 
`${gameElements[i]}${htmlSeparator}`;
        }
        //Trim trailing ", " after last element
        if(html.substring(html.length-2, html.length) == ", ") {
            html = html.substring(0, html.length - 2);
        }
    }
    //Set header text to built string
    headerElement[0].innerHTML = html;

    //Set title text
    //Clear already used html string
    html = "";
    //Set word separator to comma
    htmlSeparator = ", ";
    //Loop through current game elements
    for(let i =  0; i < numActiveElements; i++) {
        //Set the first character of the element to uppercase and append to string
        let elementName = gameElements[i][0].toUpperCase() + gameElements[i].substring(1);
        html += 
`${elementName}${htmlSeparator}`;
    }
    //Trim trailing ", " after last element
    if(html.substring(html.length-2, html.length) == ", ") {
        html = html.substring(0, html.length - 2);
    }
    //Set the window title.
    document.title = html;
}

//Main game function - called when the player clicks on an element.
function pickElement(event) {
    //Set playerPick to the id of the button we've clicked on
    //TODO: Add error handling to make sure the ID exists in the gameElements array
    playerPick = event.currentTarget.id;
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
        resultDisplay.innerHTML = "Draw!<br><br>";
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
    let clearHighlightingTime = 2000;
    setTimeout(function(){clearPickedElements()}, clearHighlightingTime);
    //Re-enable buttons
    setTimeout(function(){addElementButtonListeners()}, parseInt(clearHighlightingTime) + parseInt(pickedFadeoutTime) + 10);
    //Change center display text to let user know the next round can start
    setTimeout(function(){document.getElementById("result-text").innerHTML = "Go!<br><br>";}, parseInt(clearHighlightingTime) + parseInt(pickedFadeoutTime) + 10);
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
    let playerScoreBarElement = document.getElementById("player-score-bar");
    let computerScoreBarElement = document.getElementById("computer-score-bar");
    //TODO: Create functions to replace the repeated code here.
    if(playerScoreBarWidth === 0) {
        //Hide the player score
        playerScoreBarElement.style.display = "none";
        //Set the computer score bar corners to rounded to match the CSS styling
        //TODO: Get this value from the stylesheet and apply it dynamically so we can change the styling and not have to change this code too
        computerScoreBarElement.style.borderTopLeftRadius = "2em";
        computerScoreBarElement.style.borderBottomLeftRadius = "2em";
    }
    else {
        //Set both score bars back to their default styling when the computer hasn't won 100% of the rounds
        playerScoreBarElement.style.display = "initial";
        computerScoreBarElement.style.borderTopLeftRadius = "initial";
        computerScoreBarElement.style.borderBottomLeftRadius = "initial";

    }
    //If the player has won 100% of the rounds so far, hide the computer score bar
    if(computerScoreBarWidth === 0) {
        //Hide the computer score
        computerScoreBarElement.style.display = "none";
        //Set the player score bar corners to rounded to match the CSS styling
        playerScoreBarElement.style.borderTopRightRadius = "2em";
        playerScoreBarElement.style.borderBottomRightRadius = "2em";
    }
    else {
        //Set both score bars back to their default styling when the computer hasn't won 100% of the rounds
        computerScoreBarElement.style.display = "initial";
        playerScoreBarElement.style.borderTopRightRadius = "initial";
        playerScoreBarElement.style.borderBottomRightRadius = "initial";
    }

    //Set each score bar to its calculated width
    playerScoreBarElement.style.width = playerScoreBarWidth + "%";
    computerScoreBarElement.style.width = computerScoreBarWidth + "%";
}

function resetScoreBar() {
    let playerScoreBarElement = document.getElementById("player-score-bar");
    let computerScoreBarElement = document.getElementById("computer-score-bar");
    
    playerScoreBarElement.style.width = "50%";
    computerScoreBarElement.style.width = "50%";

    playerScoreBarElement.style.display = "initial";
    computerScoreBarElement.style.display = "initial";

    playerScoreBarElement.style.borderTopRightRadius = "initial";
    playerScoreBarElement.style.borderBottomRightRadius = "initial";

    computerScoreBarElement.style.borderTopLeftRadius = "initial";
    computerScoreBarElement.style.borderBottomLeftRadius = "initial";
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

//Add listener to How To Play button
document.getElementById("how-to-play-control").addEventListener("click", toggleHowToPlayTooltip);

//Toggle showing the how to play tooltip
function toggleHowToPlayTooltip() {
    let tooltip = document.getElementById("how-to-play-tooltip");
    //Change the display mode to visible if currently not, and vice versa
    switch(window.getComputedStyle(tooltip).display) {
        case "none":
            tooltip.style.display = "unset";
            break;
        default: 
            tooltip.style.display = "none";
            break;
    };
}

//Set the difficulty selector highlighting to the correct one, as this doesn't update when the page refreshes
function resetDifficultyControls() {
    let selectors = document.getElementsByName("difficulty-selector");
    //Loop through all radio buttons and set active if it is the correct button for the number of elements in the game.
    for(let selector of selectors) {
        if(selector.value == numActiveElements) {
            selector.checked = true;
        }
        else {
            selector.checked = false;
        }
    }
}
