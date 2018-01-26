'use strict';

function Game (gameAreaDiv) {
    var self = this;

    //Set game area div as a property of *this* Game
    self.gameAreaDiv = gameAreaDiv;

    //Game variables**
    self.finished;
    self.width;
    self.height;
    self.bgColor;
    self.canvasElement;
    self.player;
    self.world;
    self.handleKeyDown;
    self.handleKeyUp;
    self.ctx;

    //Execute
    self._init();
    window.requestAnimationFrame(self._frameRefresh.bind(self));
}

Game.prototype._init = function() {
    var self = this;

    self.finished = false;
    self.width = 1000;
    self.height = 600;

    self._createCanvasElement();
    self.ctx = self.canvasElement.getContext('2d');

    self.world = new World(self.ctx, self.width, self.height);

    self._defineUserInputs();

    document.addEventListener('keydown', self.handleKeyDown);
    document.addEventListener('keyup', self.handleKeyUp);
}

Game.prototype._createCanvasElement = function() {
    var self = this;

    self.canvasElement = document.createElement('canvas');
    self.canvasElement.width = self.width;
    self.canvasElement.height = self.height;
    
    self.gameAreaDiv.appendChild(self.canvasElement);
}

Game.prototype._defineUserInputs = function () {
    var self = this;

    self.handleKeyDown = function (event) {
        var key = event.key.toLowerCase();
        switch (key) {
            case 'a':
                self.world.player.move('left');
                break;
            case 'd':
                self.world.player.move('right');
                break;
            case 'w':
                self.world.player.move('up');
                break;
            case 's':
                self.world.player.move('down');
                break;    
        }
    }
    self.handleKeyUp = function (event) {
        var key = event.key.toLowerCase();
        switch (key) {
            case 'a':
                self.world.player.move('stopleft');
                break;
            case 'd':
                self.world.player.move('stopright');
                break;
            case 'w':
                self.world.player.move('stopup');
                break;
            case 's':
                self.world.player.move('stopdown');
                break; 
        }
    } 
}

Game.prototype._frameRefresh = function() {
    var self = this;

    //LOGIC
    self.world.update();
        
    //END GAME
    if (self.world.player.x < -5 
        || self.world.player.x > 1005 
        || self.world.player.y < -5 
        || self.world.player.y > 605) {
            self.finished = true;
            self.gameOverCallback();
    } else if (self.world.player.winCollision === true) {
            self.finished = true;
            self.gameOverCallback();
    }

    //DRAWING
    self.ctx.clearRect(0, 0, 1000, 600);
    self.ctx.fillStyle = 'black';
    self.ctx.fillRect(0, 0, 1000, 600);
    self.world.draw();

    //CONTINUE REFRESHING
    if (!self.finished) {
        window.requestAnimationFrame(self._frameRefresh.bind(self));
    }
}

//This is a setter - LOOK INTO FURTHER
Game.prototype.onGameOver = function (callback) {
    var self = this;
    self.gameOverCallback = callback;
}

Game.prototype.destroy = function () {
    var self = this;

    self.finished = true;

    self.canvasElement.remove();

    document.removeEventListener('keydown', self.handleKeyDown);
    document.removeEventListener('keyup', self.handleKeyUp);
}