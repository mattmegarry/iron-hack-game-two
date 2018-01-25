'use strict'

function Block(posit_X, posit_Y, width, height, ctx, type, color) {
    var self = this;

    self.x = posit_X;
    self.y = posit_Y;
    self.width = width;
    self.height = height;
    self.ctx = ctx;
    self.type = type;
    self.color = color;

    self.direction = null;

    self.sequence = Math.floor(Math.random() * Math.floor(30));
    self.startingX = posit_X;
    self.startingY = posit_Y;

}

Block.prototype.draw = function () {
    var self = this;

//@TODO Recfactor into more general

    //if (self.type = 'solid') {
        self.ctx.fillStyle = self.color;
        self.ctx.fillRect(self.x, self.y, self.width, self.height);
   /*  }  
    else if (self.type = 'waypoint') {
        self.ctx.fillStyle = self.color;
        self.ctx.fillRect(self.x, self.y, self.width, self.height);
    } */
    //self.ctx.fillText('Hello world', 10, 50);
    /* Text strategy
    
    
    
    
    */
}

Block.prototype.update = function () {
    var self = this;
    //logic for update self.x and self.y - i.e if a block were to mooooove!

    if (self.sequence >= 0 && self.sequence <= 25) {
        self.x -= 5;
        self.y += 5;
        self.sequence++;
    } 
    else if (self.sequence >= 26 && self.sequence <= 29) {
        self.x = self.startingX;
        self.y = self.startingY;
        self.sequence++;
        if (self.sequence === 29) {
            self.sequence = 0;
        }
    }

}
