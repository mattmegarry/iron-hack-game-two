'use strict';

function World (ctx, width, height) {
    var self = this;

    self.width = width;
    self.height = height;
    //self.blockColor = 'green';
    //self.portalColor = 'blue';

    self.blocks = [];
    self.waypoints = [];
    self.stars = [];

    //Take in canvas rendering context from Game instance**
    self.ctx = ctx;

    self.init();
}

World.prototype.init = function() {
    var self = this;

    
    self._createBlocks();
    self._createWaypoints();
    self._createStars();
    self.player = new Player(self.ctx, self.width, self.height);    
    self.player.collision = false;
    self.player.winCollision = false;
}

World.prototype.update = function () {
    var self = this;

    self._blockCollision();//Could set a range of collision variables true or false
    self._waypointCollision();

    self.blocks.forEach(function(block) {
        block.update();
    });

    self.stars.forEach(function(star) {
        star.update();
    }); 
    
    self.player.update();
}

World.prototype.draw = function () {
    var self = this;
    
    self.waypoints.forEach(function(waypoint) {
        waypoint.draw();
    });

    self.stars.forEach(function(star) {
        star.draw();
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
        
        if (playerRightOverlap //TODO - make it all like this: could test performance of both in Chrome
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

World.prototype._waypointCollision = function () {
    var self = this;

    self.waypoints.forEach(function (blockItem) {
        var blockRightSideLine = blockItem.x + blockItem.width; 
        var blockLeftSideLine = blockItem.x;
        var blockTopSideLine = blockItem.y;
        var blockBottomSideLine = blockItem.y + blockItem.height;

        var playerRightOverlap = self.player.rightSideLine > blockLeftSideLine;
        
        if (playerRightOverlap //TODO - make it all like this: could test performance of both in Chrome
            && self.player.leftSideLine < blockLeftSideLine
            && self.player.topSideLine < blockBottomSideLine
            && self.player.bottomSideLine > blockTopSideLine) {
            //console.log('RIGHT');
            self.player.winCollision = true;
        } 
        if (self.player.leftSideLine < blockRightSideLine
            && self.player.rightSideLine > blockRightSideLine
            && self.player.topSideLine < blockBottomSideLine
            && self.player.bottomSideLine > blockTopSideLine) {
            //console.log('LEFT');
            self.player.winCollision = true;
        }
        if (self.player.rightSideLine > blockLeftSideLine
            && self.player.leftSideLine < blockRightSideLine
            && self.player.topSideLine < blockBottomSideLine
            && self.player.bottomSideLine > blockBottomSideLine) {
            //console.log('TOP');
            self.player.winCollision = true;
        }
        if (self.player.rightSideLine > blockLeftSideLine
            && self.player.leftSideLine < blockRightSideLine
            && self.player.topSideLine < blockTopSideLine
            && self.player.bottomSideLine > blockTopSideLine) {
            //console.log('BOTTOM');
            self.player.winCollision = true;
        } 

    });

}


World.prototype._createBlocks = function () {
    var self = this;

    //posit_X, posit_Y, width, height, ctx, type
    var randomBlock;
    var blockNum = 70;
    var startX;
    var startY;
    var randColor;

    for (var i = 0; i < blockNum; i++) {
        startX = Math.random() * (980 - 20) + 20;
        startY = Math.random() * (580 - 10) + 10;
        randColor = '#' + Math.floor(Math.random()*16777215).toString(16);

        randomBlock = new Block(startX, startY, 10, 10, self.ctx, 'solid', 'white');
        self.blocks.push(randomBlock);
    }

}

World.prototype._createWaypoints = function () {
    var self = this;
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

    // startX, startY, 10, 10, self.ctx, 'solid', randColor
    var winWaypoint = new Waypoint(800, 100, 50, 50, self.ctx, 'waypoint', 'yellow');
    self.waypoints.push(winWaypoint);
}

World.prototype._createStars = function () {
    var self = this;

    //posit_X, posit_Y, width, height, ctx, type
    var randomStar;
    var blockNum = 1000;
    var startX;
    var startY;
    var randColor;

    for (var i = 0; i < blockNum; i++) {
        startX = Math.random() * (980 - 20) + 20;
        startY = Math.random() * (580 - 10) + 10;

        randomStar = new Star(startX, startY, 1, 1, self.ctx, 'solid', 'white');
        self.stars.push(randomStar);
    }
}
