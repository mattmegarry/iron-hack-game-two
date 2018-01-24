'use strict'

function Waypoint(text, posit_X, posit_Y, ctx, type, color) {
    var self = this;

    self.text = text;
    self.x = posit_X;
    self.y = posit_Y;
    self.ctx = ctx;
    self.type = type;
    self.color = color;

}

Waypoint.prototype.draw = function () {
    var self = this;

        self.ctx.font = '32px Droid Sans Mono, monospace, monospace, Droid Sans Fallback';
        self.ctx.fillStyle = self.color;
        //self.ctx.fillRect(self.x, self.y, self.width, self.height);
        self.ctx.fillText(self.text, self.x, self.y);
    /* Text strategy
    
    
    
    
    */
}

Waypoint.prototype.update = function () {
    var self = this;
    //logic for update self.x and self.y - i.e if a block were to mooooove!
}
