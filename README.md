# Rock Paper Scissors

This project is an HTML page with CSS styling and dynamic JavaScript content that allows the user to play a game of Rock Paper Scissors against the computer in their browser.

![Responsive Design Screenshot](readme-assets/images/responsive-screenshot.png)

The site can be viewed on my deployed [GitHub Pages](https://sijil82.github.io/rock-paper-scissors/)

## Table of Contents
* [Design](#design)
    * [User Stories](#user-stories)
    * [Site Mockups](#site-mockups)
* [Features] (#features)
* [Testing] (#testing)
* [Deployment] (#deployment)
* [Credits] (#credits)

# Design
## User Stories
- __As a user of the site, I want to:__
    - Easily see how to play the game.
    - Be able to navigate the site intuitively.
    - See my score.
    - Have the game difficulty increase as I win more games.

## Site Mockups
### Index Page
![Index Page Mockup](readme-assets/images/index-layout.png)

# Features
- __Header Text__
    - The main title for the site, this updates dynamically based on which game mode is chosen:  
    ![Header With 5 Elements](readme-assets/images/header-five-elements.png)
    ![Header With 3 Elements](readme-assets/images/header-three-elements.png)
- __How To Play Button__
    - A button labelled with "How To Play" can be clicked to pop a set of instructions to the user, explaining how to play the game.  
    ![How To Play Button And Tooltip](readme-assets/images/how-to-play-tooltip.png)
- __Different Game Modes__
    - The player can choose between 3 or 5 elements to play the game with.  
    - Choosing 3 elements gives the user the choice of Rock, Paper or Scissors.  
    - Choosing 5 elements additionally includes Lizard and Spock. 
    - Clearly labelled buttons show the user what to click on to change the game mode:
    ![Control with 3 Elements Chosen](readme-assets/images/controls-three-elements.png)
    ![Control with 5 Elements Chosen](readme-assets/images/controls-five-elements.png)  
    - When the game mode is changed, the page title, header and main game area update to reflect the new game mode:  
    #### 3 Elements Game:
    ![Game with 3 Elements Chosen](readme-assets/images/game-three-elements.png)  
    #### 5 Elements Game:
    ![Game with 5 Elements Chosen](readme-assets/images/game-five-elements.png)  
    - The code for the game allows this to be easily expanded on.  
        - The `gameElements` array controls the total number of possible elements.
        - The `fights` array details for each possible combination which element will win (the first item in the array), which element will lose (the second item) and the action performed to win the fight. 
        - Extra button elements will also need to be added to let the user control how many elements are in the game.  
    ![Game Element Code Arrays](readme-assets/images/element-definition-code.png)
- __Picking an Element__
    - The player can click whichever element they which to use for a round, and when they do so the computer will pick a random element.  
    - The game will then use the `fights` array to determine which of the 2 elements will win the fight.  
    - When the user picks an element, it is highlighted on the game board with a coloured ring around the element:  
    ![Player Picked Element](readme-assets/images/player-picked-highlight.png)
    - The computer's picked element is also highlighted, in a different colour:  
    ![Computer Picked Element](readme-assets/images/computer-picked-highlight.png)
    - The player highlighting is made inside the button, whereas the computer highlighting is outside it. This means if both players pick the same button, the highlighting for each is still visible:  
    ![Bot Picked Element](readme-assets/images/both-picked-highlight.png)


# Testing

# Deployment

# Credits
https://stackoverflow.com/questions/50149925/click-event-target-gives-element-or-its-child-not-parent-element
https://grid.layoutit.com/
https://www.tutorialrepublic.com/faq/how-to-change-the-cursor-into-a-hand-pointer-on-hover-using-css.php
https://www.w3schools.com/howto/howto_css_tooltip.asp