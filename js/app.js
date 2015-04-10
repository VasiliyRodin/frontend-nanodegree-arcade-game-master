// Enemies our player must avoid
var Enemy = function (enemyStartY) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // which y position the bug starts
    this.y = (enemyStartY * 83) + 60;
    this.x = -200;
    //initial speed
    this.speed = this.getSpeed();
    // The image/sprite for our enemies, this uses
    this.sprite = 'images/enemy-bug.png';
};

// Puts all bugs back into start location
Enemy.prototype.bugReset = function () {
    for (var i = 0; i < allEnemies.length; i++)
        allEnemies[i].x = -200;
};

//Randomizes speed everytime it is called.
Enemy.prototype.getSpeed = function () {
    var speed = Math.floor(Math.random() * (250 - 100 + 1)) + 100;
    return speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //Gets the bugs to move at random initital speed speeds
    this.x += (this.speed * dt);
    //resets position of bug after it hits certian spot and re-assigns a speed to it
    if (this.x > 525) {
        this.x = -200;
        this.speed = this.getSpeed();

    }
};
// have update that will change speed and orientaion when bug is off screen
Enemy.prototype.updateSpeedOrientation = function (dt) {
    return speed = (Math.floor(Math.random() * (250 - 100 + 1)) + 100) * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function (startX, startY) {
    this.sprite = 'images/char-boy.png';
    this.x = startX;
    this.y = startY;

    this.changeX = 0;
    this.changeY = 0;
};

Player.prototype.update = function () {
    if (this.x + this.changeX < 0) {
        this.x = 0;
    }
    else if (this.x + this.changeX > 400) {
        this.x = 400;
    }
    //If the player reaches the river they get teleported back the bottom
    else if (this.y + this.changeY < 40) {
        this.y = 400;
    }
    else if (this.y + this.changeY > 400) {
        this.y = 400;
    }
    else {
        this.x += this.changeX;
        this.y += this.changeY;
    }
    this.changeX = 0;
    this.changeY = 0;
    
    this.collide();
};

// Checks to see if any collisions happen, if they do it resets everything.
Player.prototype.collide = function () {
    for(var i=0; i < allEnemies.length; i++) {
        if (this.x < allEnemies[i].x + 50 && this.x + 50 > allEnemies[i].x && this.y < allEnemies[i].y + 30 && this.y + 30 > allEnemies[i].y) {
            console.log("Deeecent");
            this.resetPlayer();
            allEnemies[i].bugReset();
        }    
    }
};


Player.prototype.resetPlayer = function () {
    this.x = 200;
    this.y = 400;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (key) {
    switch (key) {
        case 'right':
            this.changeX = 40;
            break;

        case 'left':
            this.changeX = -40;
            break;

        case 'up':
            this.changeY = -40;
            break;

        case 'down':
            this.changeY = 40;
            break;

        default:
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 400);

var allEnemies = [];

for (var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy(i));
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
