'use strict';

function Player (ctx, width, height) {
    var self = this; //SELF NOW REFERS TO THE INSTANCE OF PLAYER

    self.size = 26; //Set player size to x pixels (to allow for collision detection)

    //Take in canvas rendering context from Game instance
    self.ctx = ctx;
    
    //Take in dimensions of our canvas from Game instance 
    self.gameWidth = width;
    self.gameHeight = height;
    
    //Place the player
    self.x = 150;
    self.y = 450;
    
    //Leave DIRECTION for now, only needed in the case of user indepenedent movement or WRAP
    self.moveAction = null;

    self.collisionRight = false;
    self.collisionLeft = false;
    self.bounce = 30;
}

Player.prototype.move = function (moveAction) { // I set things in motion!
    var self = this;
    
    self.moveAction = moveAction;
}

Player.prototype.update = function () { // I do things EVERY FRAME!
    var self = this;

    //USE SWITCH - and for each other object woth collisions
    //User responsive lateral movement EVERY FRAME
    if (self.moveAction === 'right' && self.rightCollision === false) {
        self.x += 10;
    } 
    else if (self.rightCollision === true){
        self.x -= self.bounce;
    }
    else if (self.moveAction === 'left' && self.leftCollision === false) {
        self.x -= 10;
    }
    else if (self.leftCollision === true){
        self.x += self.bounce;
    }
    else if (self.moveAction === 'stopright') {
        self.x = self.x;
    }
    else if (self.moveAction === 'stopleft') {
        self.x = self.x;
    }
    //FAKE UP AND DOWN
    if (self.moveAction === 'up' && self.topCollision === false) {
        self.y -= 10;
    }
    else if (self.topCollision === true){
        self.y += self.bounce;
    } 
    else if (self.moveAction === 'down' && self.bottomCollision === false) {
        self.y += 10;
    }
    else if (self.bottomCollision === true){
        self.y -= self.bounce;
    } 
    else if (self.moveAction === 'stopup') {
        self.y = self.y;
    }
    else if (self.moveAction === 'stopdown') {
        self.y = self.y;
    }

    self.leftCollision = false;
    self.rightCollision = false;
    self.topCollision = false;
    self.bottomCollision = false;
}

Player.prototype.draw = function () {
    var self = this;
    
    self.ctx.fillStyle = 'red';
    self.ctx.fillRect(self.x, self.y, self.size, self.size);
  }