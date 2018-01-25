'use strict';

function World (ctx, width, height) {
    var self = this;

    self.width = width;
    self.height = height;
    //self.blockColor = 'green';
    //self.portalColor = 'blue';

    self.blocks = [];
    self.waypoints = [];

    //Take in canvas rendering context from Game instance**
    self.ctx = ctx;

    self.init();
}

World.prototype.init = function() {
    var self = this;

    self._createBlocks();
    self._createWaypoints();
    self.player = new Player(self.ctx, self.width, self.height);    
    self.player.collision = false;
}

World.prototype.update = function () {
    var self = this;

    self._blockCollision();//Could set a range of collision variables true or false

    self.blocks.forEach(function(block) {
        block.update();
    }); 
    
    self.player.update();
}

World.prototype.draw = function () {
    var self = this;
    
    self.waypoints.forEach(function(waypoint) {
        waypoint.draw();
    });

    self.player.draw();

    self.blocks.forEach(function(block) {
        block.draw();
    });    
}

World.prototype._blockCollision = function () {
    var self = this;

    //TODO - Change block to 'solid'

    self.player.rightSideLine = self.player.x + self.player.size; 
    self.player.leftSideLine = self.player.x;
    self.player.topSideLine = self.player.y;
    self.player.bottomSideLine = self.player.y + self.player.size;

    self.blocks.forEach(function (blockItem) {
        var blockRightSideLine = blockItem.x + blockItem.width; 
        var blockLeftSideLine = blockItem.x;
        var blockTopSideLine = blockItem.y;
        var blockBottomSideLine = blockItem.y + blockItem.height;

        var playerRightOverlap = self.player.rightSideLine > blockLeftSideLine;
        
        if (playerRightOverlap //TODO - make it all like this: could test performance of both in Chrome!
            && self.player.leftSideLine < blockLeftSideLine
            && self.player.topSideLine < blockBottomSideLine
            && self.player.bottomSideLine > blockTopSideLine) {
            //console.log('RIGHT');
            self.player.rightCollision = true;
        } 
        if (self.player.leftSideLine < blockRightSideLine
            && self.player.rightSideLine > blockRightSideLine
            && self.player.topSideLine < blockBottomSideLine
            && self.player.bottomSideLine > blockTopSideLine) {
            //console.log('LEFT');
            self.player.leftCollision = true;
        }
        if (self.player.rightSideLine > blockLeftSideLine
            && self.player.leftSideLine < blockRightSideLine
            && self.player.topSideLine < blockBottomSideLine
            && self.player.bottomSideLine > blockBottomSideLine) {
            //console.log('TOP');
            self.player.topCollision = true;
        }
        if (self.player.rightSideLine > blockLeftSideLine
            && self.player.leftSideLine < blockRightSideLine
            && self.player.topSideLine < blockTopSideLine
            && self.player.bottomSideLine > blockTopSideLine) {
            //console.log('BOTTOM');
            self.player.bottomCollision = true;
        } 

    });
    
}


World.prototype._createBlocks = function () {
    var self = this;

    //posit_X, posit_Y, width, height, ctx, type
    var randomBlock;
    var blockNum = 20;
    var startX;
    var startY;
    var randColor;

    for (var i = 0; i < blockNum; i++) {
        startX = Math.random() * (980 - 20) + 20;
        startY = Math.random() * (580 - 10) + 10;
        randColor = '#' + Math.floor(Math.random()*16777215).toString(16);

        randomBlock = new Block(startX, startY, 10, 10, self.ctx, 'solid', randColor);
        self.blocks.push(randomBlock);
    }


    //Boundary Blocks
   // var fullFloorBlock = new Block(0, 595, 1000, 10, self.ctx, 'solid', 'green');
   // self.blocks.push(fullFloorBlock);

    // self.ctx.fillStyle = self.blockColor;
    // self.ctx.fillRect(0, 590, 1000, 10);
}

World.prototype._createWaypoints = function () {
    var self = this // change for create portals
    var darkBlue = '#5594cc';
    var yellow = '#efefa7';
    var lightBlue = '#1bcef7';
    var red = '#ef7958';
    var magenta = '#b48cce';
    var white = '#fffff4';

    var yAdjust = 25;
    
    var line1 = 70;
    var line2 = 170;
    var line3 = 270;
    var line4 = 370;
    var line5 = 470;

    //Line One - startX, startY, 10, 10, self.ctx, 'solid', randColor
    var winWaypoint = new Waypoint(800, 100, 50, 50, self.ctx, 'waypoint', yellow);
    self.waypoints.push(winWaypoint);

    //Line Two
    /* var newBlock50Percent = new Waypoint('Twwooooooo', 140, line2 + yAdjust, self.ctx, 'waypoint', lightBlue);
    self.waypoints.push(newBlock50Percent);

    //Line Three
    var fullFloorBlock = new Waypoint('Three', 140, line3 + yAdjust, self.ctx, 'waypoint', magenta);
    self.waypoints.push(fullFloorBlock);

    //Line Four
    var rightBoundaryBlock = new Waypoint('4', 60, line4 + yAdjust, self.ctx, 'waypoint', 'pink');
    self.waypoints.push(rightBoundaryBlock);

    //Line Five
    var rightBoundaryBlock = new Waypoint('Fiiiiveeeeeee', 60, line5 + yAdjust, self.ctx, 'waypoint', 'pink');
    self.waypoints.push(rightBoundaryBlock); */
    // self.ctx.fillStyle = self.portalColor;
    // self.ctx.fillRect(0, 400, 26, 26);
}
