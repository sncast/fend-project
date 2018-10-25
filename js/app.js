// Enemies our player must avoid



// Hero Class
    //Constructor
        //Properties
        // x pos
        // y pos
        //sprite image
    //Methods...1 
        //update position 
            //Check Collision here
                // Did player X and Y collide with enemy? 
    //Check win here? 
        //Did player x and y reach final tile? 
    //Render
        //Draw player sprite on current x and y cord position 
    //Handle Keyboard input
        //Update player's x and y property according to input 
    //Reset Hero
        //Set X and Y to starting x and y 
const Level = document.getElementById('myp');
const win = document.getElementById('myh');

var level = 1;



class Character {
    constructor() {
        this.step = 101;
        this.jump = 83;
        this.startX = this.step * 2;
        this.startY = (this.jump * 4) + 100;
        this.x = this.startX;
        this.y = this.startY;
        this.sprite = 'images/char-boy.png';
        this.victory = false;
    }
    //Draw player sprite on current x and y cord position 
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }


    update() {
        for(let enemy of allEnemies) {

            if (this.y === enemy.y && (enemy.x + enemy.step/4 > this.x &&
                enemy.x < this.x + this.step/4) ) {
                this.reset();
            }

            if (this.y === 120) {
                console.log("Hiya");
                this.reset();

};


        if(this.y === 55) {
        this.reset(); 
        level++;      
        if(level > 3){          
             $('h3').css("display","block").append('You Win!');
             setTimeout(showResult,1000);
            level = 1;
        }
        document.getElementById("myspan").innerHTML= level;
    }
}
        
};

/*Update player's x and y property according to input 

@parameter {string} input */

handleInput(input)  {
    switch(input) {
        case 'left':    
        if (this.x > 0) {
            this.x -= this.step;
        }
            break;
        case 'up':
            if (this.y > this.jump) {
                this.y -= this.jump;
            }
            break;
        case 'right':
            if (this.x < this.step * 4) { 
                this.x += this.step;
            }
            break;
        case 'down':
            if (this.y < this.jump * 4) {
                this.y += this.jump;
            }
            break;
        }

    }
    reset() {
                this.y = this.startY;
                this.x = this.startX;
            }



}



//init all enemies array 
//for each enemy create and push new enemy object into above aray



var Enemy = function(x,y, speed) {
    this.x = x;
    this.y = y +  100;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5;
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if(this.x < this.boundary) {

        this.x += this.speed * dt;
    }
else {
    this.x = this.resetPos;
}

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



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

var showResult = function(){
     $('h3').css("display","none").text("");
};


const enemy1 = new Enemy(-101,0, 300)
const enemy2 = new Enemy(-101, 100, 300)
const enemy3 = new Enemy((-101*3.5), 83, 350);
const enemy4 = new Enemy(-170,83, 100);
const enemy5 = new Enemy((-300*6.5), 83, 300);
const enemy6 = new Enemy((-101*3.5), 83, 300);
const enemy7 = new Enemy(-200, 0, 300);
const enemy8 = new Enemy((-201*3.5), 83, 300);
const enemy9 = new Enemy((-301*3.5), 83, 300);

const allEnemies = [];
allEnemies.push(enemy1,enemy2,enemy3,enemy4,enemy5,enemy6,enemy7,enemy8,enemy9);
const player = new Character();


