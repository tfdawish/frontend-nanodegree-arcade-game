'use strict';
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
	this.x = 0;
	this.y = (getRandomInt(3) + 1) * 83; // it mean the enemy will show during the three rows of stone
    // we've provided one for you to get started
	//this.increment = 120;
	this.movement = (getRandomInt(3) + 1) * 120; // it will present the speed of enemy 
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
	this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
	if(this.x >= 505){
			this.x = 0;
			this.y = (getRandomInt(3) + 1) * 83;
	}
	this.x += this.movement * dt;

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
var Player = function(){
	this.x = 202;
	this.y = 415;
	this.score = 0;  // to count how many sar collected
	this.charBoy = 'images/char-boy.png';
	//this.charBoy = 'images/char-princess-girl.png';
	this.level = 1;
			
};
// This class requires an update(), render() and
// a handleInput() method.

// this function will check the player if the score more than or equal 5 and reach to the sea area will show message of win and move the player agin to the cenetr and uodate the star image place
Player.prototype.updateLevel = function(level){
	switch(level){
		case 2 :
			this.charBoy = 'images/char-princess-girl.png';
			break;
		case 3 :
			alert('you are win and the number of count:  ' + this.score );
			break;
	}
	
};


Player.prototype.update = function(){
	if(this.y === 0 && this.score >= 5){
		//alert('you are win and the number of count:  ' + this.score );
		this.x = 202;
		this.y = 415;
		star.update();
		this.score = 0;
		this.level++;
		if(this.level === 2){
			star.imgStar = 'images/Key.png';
			this.charBoy = 'images/char-princess-girl.png';
			allEnemies[0].movement = (getRandomInt(3) + 1) * 170;
			allEnemies[1].movement = (getRandomInt(3) + 1) * 170;
			allEnemies[2].movement = (getRandomInt(3) + 1) * 170;
			//ctx.drawImage(Resources.get(this.charBoy), this.x, this.y);
		}else if(this.level === 3){
			star.imgStar = 'images/Heart.png';
			this.charBoy = 'images/char-horn-girl.png';
			allEnemies[0].movement = (getRandomInt(3) + 1) * 220;
			allEnemies[1].movement = (getRandomInt(3) + 1) * 220;
			allEnemies[2].movement = (getRandomInt(3) + 1) * 220;
			//allEnemies[0].increment = 220;
			//allEnemies[1].increment = 220;
			//allEnemies[2].increment = 220;
			//allEnemies[].increment = 220;
		}else if(this.level === 4){
			alert('you are win and pass all levels');
			star.imgStar = 'images/Star.png';
			this.charBoy = 'images/char-boy.png';
			this.level = 1;
		//	allEnemies.increment = 120;
		}
		//this.updateLevel(this.level);
		
	}
			
	
};
// this function will check the crash between the enemy and player 
Player.prototype.checkCollisionsEntity = function(){
	for(var i = 0; i < allEnemies.length; i++ ){
		 if ((allEnemies[i].x) <= this.x + 20 && (allEnemies[i].x + 20) >= (this.x) && (allEnemies[i].y)<= this.y + 20 && 
			 (allEnemies[i].y + 20) >= (this.y)) {
			 console.log(allEnemies[i].x + "this.x" + this.x);
			 this.x = 202;
			 this.y = 415;
			 alert('Game Over');
			 star.update();
			 this.score = 0;
			 this.level = 1;
			 this.charBoy = 'images/char-boy.png';
			 star.imgStar = 'images/Star.png';
			 allEnemies[0].movement = (getRandomInt(3) + 1) * 120;
			 allEnemies[1].movement = (getRandomInt(3) + 1) * 120;
			 allEnemies[2].movement = (getRandomInt(3) + 1) * 120;
			
		}	
	}
	
};
// this function will render the image of the player and the text which appear in the top left corner 
Player.prototype.render = function(){
	ctx.drawImage(Resources.get(this.charBoy), this.x, this.y);
	ctx.font = "20px serif";
	//ctx.fillStyle = "RED";
	ctx.fillText("Item collected is : " + this.score, 0, 83);
	ctx.fillText("The level is : " + this.level, 380, 83);
	
};
// this function will handle the arrow input and make sure the player will move inside the game campus
Player.prototype.handleInput = function(key){

	switch(key){
		case 'left' :
			if ((this.x - 101) >= 0){
				this.x = this.x - 101;
			}
			break;
		case 'right' :
			if ((this.x + 101) <= 404){
				this.x = this.x + 101;
			}
			
			break;
		case 'up' : // here it will make sure the player stay in the stone and grass area until the player collecet equal or more than 5 star
			if ((this.y - 83) >= 83 || this.score >= 5){ 
				this.y = this.y - 83;
			
			}
			break;
		case 'down' :
			if ((this.y + 83) <= 415){
				this.y = this.y + 83;
			}
			break;	
  };
	
	
};

// this object declare the Star class
var Star = function(){
	this.x = (getRandomInt(4) + 1) * 101; // it gives random x between 0 and 404 
	this.y = (getRandomInt(3) + 1) * 83; // it gives random y in the stone area btween 83 and 249
	this.imgStar = 'images/Star.png';
};
 // this function will update the place of star inside the stone area
Star.prototype.update = function() {
	this.x = (getRandomInt(4) + 1) * 101;
	this.y = (getRandomInt(3) + 1) * 83;
}
// this function render the star image
Star.prototype.render = function() {	
    ctx.drawImage(Resources.get(this.imgStar), this.x, this.y);
	
};
// this function check if the player collect star and if yes will increase the scor of the player and update the place of image
Star.prototype.ifCrash = function() {
	if ((this.x) <= player.x + 20 &&
            (this.x + 20) >= (player.x) &&
            (this.y)<= player.y + 20 &&
            (this.y + 20) >= (player.y)) {
			 this.x = (getRandomInt(5) + 1) * 101;
			 this.y = (getRandomInt(3) + 1) * 83;
			 player.score++;
			 this.update();
		};
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = new Array();
allEnemies[0] = new Enemy();
allEnemies[1] = new Enemy();
allEnemies[2] = new Enemy();

var star = new Star();

// Place the player object in a variable called player
var player = new Player();



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
