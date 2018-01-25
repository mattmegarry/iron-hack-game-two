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
     /*        self.j += 10;
                if (self.j > 10000) {
                    self.grow = false;
                }
        }
        if (self.grow === false) {
            self.ctx.fillStyle = self.color;
            self.ctx.fillRect(self.x, self.y, self.width - self.i, self.height - self.i);
            self.j -= 10;
                if (self.j < 1) {
                    self.grow = true;
                }
        }
         */
        
        
        
        
        
        //self.ctx.font = '32px Droid Sans Mono, monospace, monospace, Droid Sans Fallback';
        //self.ctx.fillText(self.text, self.x, self.y);
    
}

Waypoint.prototype.update = function () {
    var self = this;
    //logic for update self.x and self.y - i.e if a block were to mooooove!
}
