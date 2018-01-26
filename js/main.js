'use strict';

function main () {
    var _ANITIME = 1000;
    
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
        buildGameOver(game.world.player.winCollision);    
    };

    var gameOverToAniBridge = function () {
        destroyGameOver();
        buildAni();
    };

    // --- THE SPLASH --- 

    var splashContent;
    var splashStartButton;

    function buildSplash () {
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

    function buildAni () {
        //THE CONTENT
        aniContent = document.createElement('p');
        aniContent.setAttribute('class', 'display-container');
        aniContent.innerText = 'GET READY!!';
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
    var gameContent;
    var game;
    
    function buildGame () {
        game = new Game(gameAreaDiv);
        game.onGameOver(gameToGameOverBridge);

    }

    function destroyGame () {
        game.destroy();
    }

    // THE GAMEOVER

    var gameOverContent;
    var playAgainButton;
    var playResult;

    function buildGameOver (win) {
        //THE CONTENT
        gameOverContent = document.createElement('div');
        gameOverContent.setAttribute('class', 'display-container');
        
        playResult = document.createElement('p');
        playResult.setAttribute('id', 'play-again-button');
        if (win === true) {
            playResult.innerText = 'YOU WON!';    
        } 
        else if (win === false) {
            playResult.innerText = 'YOU LOST! Don\'t let the asteroids push you out of the Galaxy!';   
        }
        gameOverContent.appendChild(playResult);
        
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
