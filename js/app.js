

const Level = document.getElementById('myp');
const win = document.getElementById('myh');


//The intial level of the game
var level = 1;



class Character {
    constructor() {
            this.step = 101;
            this.up = 83;
            this.startX = this.step * 2;
            this.startY = (this.up * 4) + 100;
            this.x = this.startX;
            this.y = this.startY;
            this.sprite = 'images/char-boy.png';
        }
        //Draw player sprite on current x and y cord position 
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //Handles collision between enemies 
    update() {
        for (let enemy of allEnemies) {

            if (this.y === enemy.y && (enemy.x + enemy.step / 4 > this.x &&
                    enemy.x < this.x + this.step / 4)) {
                this.reset();
            }

            if (this.y === 120) {
                console.log("Hi");
                this.reset();

            };
            //Matthew Crawford's arcade game walkthrough was used to get a basic start on collision and enemy rendering

            //Shows when the player wins after level 3 has been reached

            if (this.y === 17) {
                this.reset();
                level++;
                if (level > 3) {
                    $('h3').css("display", "block").append('You have Won!');
                    setTimeout(Result, 999);
                    level = 1;
                }
                document.getElementById("myspan").innerHTML = level;
            }
        }

    };




    handleInput(input) {
        if (input === 'left' && this.x > 0)
            this.x -= this.step;
        else if (input === 'right' && this.x < this.step * 4)
            this.x += this.step;
        else if (input === 'up' && this.y > this.up)
            this.y -= this.up;
        else if (input === 'down' && this.y < this.up * 4)
            this.y += this.up;

    }
    reset() {
        this.y = this.startY;
        this.x = this.startX;
    }


};


//Enemies in the game x,y

var Enemy = function(x, y, speed) {
    this.x = x;
    this.y = y + 100;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.reset = -this.step;
};
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x < this.step * 5) {

        this.x += this.speed * dt;
    } else {
        this.x = this.reset;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Hides the "You Win" display 

var Result = function() {
    $('h3').css("display", "none").text("");
};

//A list of all the enemies 

const enemy1 = new Enemy(-101, 0, 300)
const enemy2 = new Enemy(-101, 100, 300)
const enemy3 = new Enemy((-101 * 3.5), 83, 350);
const enemy4 = new Enemy(-170, 83, 175);
const enemy5 = new Enemy((-300 * 6.5), 83, 300);
const enemy6 = new Enemy((-101 * 3.5), 83, 300);
const enemy7 = new Enemy(-200, 0, 300);
const enemy8 = new Enemy((-201 * 3.5), 83, 300);
const enemy9 = new Enemy((-301 * 3.5), 83, 300);

//Array where the enemies are stored 
const allEnemies = [];
allEnemies.push(enemy1, enemy2, enemy3, enemy4, enemy5, enemy6, enemy7, enemy8, enemy9);
const player = new Character();
