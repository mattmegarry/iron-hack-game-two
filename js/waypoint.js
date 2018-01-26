'use strict'

function Waypoint(posit_X, posit_Y, width, height, ctx, type, color) {
    var self = this;

    self.x = posit_X - (width/2);
    self.y = posit_Y - (height/2);
    self.width = width;
    self.height = height;
    self.ctx = ctx;
    self.type = type;
    self.color = color;

    self.i = 10;
    self.j = 1;
    self.grow = true;

}

Waypoint.prototype.draw = function () {
    var self = this;

        if (self.i <= 100 && self.grow === true) {
            self.ctx.fillStyle = self.color;
            self.ctx.fillRect(self.x, self.y, self.width + self.i, self.height + self.i);
            self.i++;
                if (self.i >= 100) {
                    self.grow = false;
                }
        } 
        else if (self.i <= 100 && self.grow === false) {
            self.i--;
            self.ctx.fillStyle = self.color;
            self.ctx.fillRect(self.x, self.y, self.width + self.i, self.height + self.i);
                if (self.i <= 1) {
                    self.grow = true;
                }
        }
    
}

Waypoint.prototype.update = function () {
    var self = this;

    //@TODO - Update waypoint size as it grows on the screen.
}
