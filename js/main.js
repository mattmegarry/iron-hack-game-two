'use strict';

function main () {
    //CONSTANTS GO HERE

    var _ANITIME = 1000;
    var _GAMETIME = 2000;
    
    // INTER-STAGE VARIABLES
    
    var displayStage;
    var gameAreaDiv = document.querySelector('#display-area');

    // STAGE BRIDGING FUNCTIONS

    var splashToAniBridge = function (){
        destroySplash();
        buildAni();    
    };

    var aniToGameBridge = function (){
        destroyAni();
        buildGame();    
    };

    var gameToGameOverBridge = function (){
        destroyGame();
        buildGameOver();    
    };

    var gameOverToAniBridge = function () {
        destroyGameOver();
        buildAni();
    };

    // --- THE SPLASH --- 

    var splashContent;
    var splashStartButton;

    function buildSplash () {
        //SET DISPLAY STAGE
        displayStage = 'splash';
        //THE CONTENT
        splashContent = document.createElement('div');
        splashContent.setAttribute('class', 'display-container');
        splashStartButton = document.createElement('button');
        splashStartButton.setAttribute('id', 'start-button');
        splashStartButton.innerText = 'START';
        splashContent.appendChild(splashStartButton);
        //CONTENT INTO DOM
        gameAreaDiv.appendChild(splashContent);
        //BIND START BUTTON
        splashStartButton.addEventListener('click', splashToAniBridge)
    }

    function destroySplash () {
        //UNBIND START BUTTON
        splashStartButton.removeEventListener('click', splashToAniBridge);
        //DESTROY SPLASH CONTENT
        splashContent.remove();
    }

    // --- THE ANIMATION ---
    var aniContent;
    var aniTimeOutId;

    function buildAni () {//could take params for more control
        //SET DISPLAY STAGE
        displayStage = 'ani';
        //THE CONTENT
        aniContent = document.createElement('p');
        aniContent.setAttribute('class', 'display-container');
        aniContent.innerText = 'THE ANIMATION';
        //CONTENT INTO DOM
        gameAreaDiv.appendChild(aniContent);
        //TIMER
        aniTimeOutId = window.setTimeout(aniToGameBridge, _ANITIME);
    }

    function destroyAni () {
        aniContent.remove();
        window.clearTimeout(aniTimeOutId);
    }

    // --- THE GAME --- 
    
    var gameTimeOutId;
    var gameContent;
    var game;
    
    function buildGame () {//could take params for more control
        //SET DISPLAY STAGE
        displayStage = 'game';
        game = new Game(gameAreaDiv);
        game.onGameOver(gameToGameOverBridge);

    }

    function destroyGame () {
        game.destroy();
    }

    // THE GAMEOVER

    var gameOverContent;
    var playAgainButton;

    function buildGameOver () {
        //SET DISPLAY STAGE
        displayStage = 'gameover';
        //THE CONTENT
        gameOverContent = document.createElement('div');
        gameOverContent.setAttribute('class', 'display-container');
        playAgainButton = document.createElement('button');
        playAgainButton.setAttribute('id', 'play-again-button');
        playAgainButton.innerText = 'PLAY AGAIN';
        gameOverContent.appendChild(playAgainButton);
        //CONTENT INTO DOM
        gameAreaDiv.appendChild(gameOverContent);
        //BIND START BUTTON
        playAgainButton.addEventListener('click', gameOverToAniBridge)

    }

    function destroyGameOver () {
        //UNBIND START BUTTON
        playAgainButton.removeEventListener('click', gameOverToAniBridge);
        //DESTROY SPLASH CONTENT
        gameOverContent.remove();
    }

    //Starts here!
    buildSplash();

}

window.onload = main;
