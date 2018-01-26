'use strict';

function Player (ctx, width, height) {
    var self = this;

    self.size = 26;
    self.ctx = ctx;    
    self.gameWidth = width;
    self.gameHeight = height;    
    self.x = 150;
    self.y = 450;
    self.moveAction = null;
    self.collisionRight = false;
    self.collisionLeft = false;
    self.bounce = 20;

    //@TODO - possibly do player._init (although player doesn't instanciate other objects...)
}

Player.prototype.move = function (moveAction) { // I set things in motion!
    var self = this;
    
    self.moveAction = moveAction;
}

Player.prototype.update = function () { // I do things EVERY FRAME!
    var self = this;

    //@TO DO - USE SWITCH - and for each other object with collisions
    //LATERAL
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
    //UP AND DOWN
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