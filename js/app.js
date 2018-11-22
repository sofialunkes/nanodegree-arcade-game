/**
 * @description  Represents enemies our player must avoid
 * @constructor
 * @param {number} x - the coordinate in x axys
 * @param {number} y - the coordinate in y axis
 * @param {number} speed - the speed for the enemy
 */
var Enemy = function (x, y, speed) {
  this.sprite = 'images/enemy-bug.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

/**
 * @description Update the enemy's position, required method for game
 * @param {number} dt - a time delta between ticks
 */
Enemy.prototype.update = function (dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  if (this.x >= 500) {
    this.x = -80;
  }

  this.x += this.speed * dt;

  // Check for collision between player and enemies
  if (player.x < this.x + 60 &&
    player.x + 37 > this.x &&
    player.y < this.y + 25 &&
    30 + player.y > this.y) {
    player.reset();
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, speed) {
  this.sprite = 'images/char-boy.png';
  this.x = x;
  this.y = y;
  this.speed = speed;
};

Player.prototype.update = function () {
  if (this.y > 799) {
    this.y = 799;
  }
  if (this.x < 0) {
    this.x = 0;
  }
  if (this.x > 400) {
    this.x = 400;
  }
  if (this.y <= -31) {
    alert('You WON!');
    this.reset();
  }
};


Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyPress) {
  if (keyPress == 'up')
    this.y -= 83;
  if (keyPress == 'down')
    this.y += 83;
  if (keyPress == 'left')
    this.x -= 100;
  if (keyPress == 'right')
    this.x += 100;
}

Player.prototype.reset = function () {
  this.x = 200;
  this.y = 799;
  window.scrollTo(0, document.body.clientHeight);
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 799, 50);
var positions = [55, 137, 220, 220, 305, 387, 470, 553, 637];
var allEnemies = [];


positions.forEach(function (pos) {
  var enemy = new Enemy(-80, pos, Math.random() * 512);
  allEnemies.push(enemy);
})

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