// Namespace for game; NJ == NoodleJump
var NJ = {
	//ALL ENTITIES HERE
	entities: [],
	// set up initial pixel value
	WIDTH: 640, 
	HEIGHT:  960, 
	// we'll set the rest of these
	// in the init function
	RATIO:  null,
	currentWidth:  null,
	currentHeight:  null,
	canvas: null,
	ctx:  null,
	
	scale:  1,
    // the position of the canvas
    // in relation to the screen
    offset: {top: 0, left: 0},
	
	init: function() {

		// the proportion of width to height
		NJ.RATIO = NJ.WIDTH / NJ.HEIGHT;
		// these will change when the screen is resized
		NJ.currentWidth = NJ.WIDTH;
		NJ.currentHeight = NJ.HEIGHT;
		// this is our canvas element
		NJ.canvas = document.getElementsByTagName('canvas')[0];
		// setting this is important
		// otherwise the browser will
		// default to 320 x 200
		NJ.canvas.width = NJ.WIDTH;
		NJ.canvas.height = NJ.HEIGHT;
		// the canvas context enables us to 
		// interact with the canvas api
		NJ.ctx = NJ.canvas.getContext('2d');
		

		// we're ready to resize
		NJ.resize();
		
		// start the Noodle Loop
		//	NJ.loop();
				
	},
			
	// this is where all entities will be moved
	// and checked for collisions, etc.
	update: function() {
			
		//PLAYERCHARAkTER
		gamma = tiltValue/2;
		updateSponge();
		NJ.entities.forEach(function(entry){
			entry.isHit();
		});
				

	},

	// this is where we draw all the entities
	render: function() {

			
	   NJ.Draw.clear();
	   
	   NJ.entities.forEach(function(entry){
			entry.draw();
		});
		
	   NJ.ctx.drawImage(Player.IMAGE,spongeX,spongeY, Player.HEIGHT, Player.WIDTH);
	},

	// the actual loop
	// requests animation frame,
	// then proceeds to update
	// and render
	loop: function() {
		NJ.update();
		NJ.render();
		
		requestId = requestAnimFrame( NJ.loop );

		if(spongeY > 1200){

			console.log(spongeY);
			console.log(requestId);

			stop();
		}
	},

	resize: function() {

		NJ.currentHeight = window.innerHeight;
		// resize the width in proportion
		// to the new height
		NJ.currentWidth = NJ.currentHeight * NJ.RATIO;


		// set the new canvas style width and height
		// note: our canvas is still 320 x 480, but
		// we're essentially scaling it with CSS
		NJ.canvas.style.width = NJ.currentWidth + 'px';
		NJ.canvas.style.height = NJ.currentHeight + 'px';
		
		NJ.scale = NJ.currentWidth / NJ.WIDTH;
		NJ.offset.top = NJ.canvas.offsetTop;
		NJ.offset.left = NJ.canvas.offsetLeft;

			
	}


};
		
// abstracts various canvas operations into
// standalone functions
NJ.Draw = {

	clear: function() {
		NJ.ctx.clearRect(0, 0, NJ.WIDTH, NJ.HEIGHT);
		//NJ.ctx.clearRect(0,0,NJ.canvas.width,NJ.canvas.height);
	},

	rect: function(x, y, w, h, color) {
		NJ.ctx.fillStyle = color;
		NJ.ctx.fillRect(x, y, w, h);
	},

	circle: function(x, y, r, col) {
		NJ.ctx.fillStyle = col;
		NJ.ctx.beginPath();
		NJ.ctx.arc(x + 5, y + 5, r, 0,  Math.PI * 2, true);
		NJ.ctx.closePath();
		NJ.ctx.fill();
	},

	text: function(string, x, y, size, col) {
		NJ.ctx.font = 'bold '+size+'px Monospace';
		NJ.ctx.fillStyle = col;
		NJ.ctx.fillText(string, x, y);
	}

};

var SOUND = {
	
	platformsound : new Audio('./sounds/sound1.mp3'),
	tempsounds : 0,
	
	//THIS DARN FUNCTION is NEEDED, because I love it.. not really, but a user input triggered
	//sound.play() method has to be called, otherwise it will be blocked.
	initAudio : function(){
    var self = this;
    self.audio = SOUND.platformsound;
    var startAudio = function(){
                         self.audio.play();
                         document.removeEventListener("touchstart", self.startAudio, false);
                     }
    self.startAudio = startAudio;

    var pauseAudio = function(){
                         self.audio.pause();
                         self.audio.removeEventListener("play", self.pauseAudio, false);
                     }
    self.pauseAudio = pauseAudio;

    document.addEventListener("touchstart", self.startAudio, false);
    self.audio.addEventListener("play", self.pauseAudio, false);
}
	
}


window.addEventListener('load', NJ.init, false);
window.addEventListener('resize', NJ.resize, false);

var currentScreen = null;	
		
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX	

function updateSponge(){
	
	
	var jumpHeight = 15;
	var temp = spongeUpNr/340;
	
	//Y
	if(temp<0.1)
		temp=0.1;
	temp=temp*2;
	if(spongeUpBool){
		spongeY = spongeY + jumpHeight*temp;

		
		
		if(spongeUpNr > 340){
			//spongeUpBool = false;
			console.log("test1");
		}else{
			spongeUpNr = spongeUpNr + jumpHeight*temp;
		}
			
		
	}else{
		spongeY = spongeY - jumpHeight*temp;
		spongeUpNr = spongeUpNr - jumpHeight*temp;
		
		if(spongeUpNr < 0){
			spongeUpBool = true;
			//console.log("test2");
		}
		
	}
	

	
	//X
	spongeX = spongeX + gamma;
	if(spongeX+Player.WIDTH/2>NJ.WIDTH)
		spongeX=Player.WIDTH/2*(-1);
	if(spongeX<(Player.WIDTH/2*(-1)))
		spongeX=NJ.WIDTH-Player.WIDTH/2;
	
};

var requestId;

/* Hier wird das PLAYER Object definiert */
Player = new Object();
Player.Scale = 0.4;
Player.IMAGE = new Image();
Player.IMAGE.src = "./pictures/spongi.png";

Player.IMAGE.onload = function(){
	Player.WIDTH = Player.IMAGE.width * Player.Scale;
	Player.HEIGHT = Player.IMAGE.height * Player.Scale;
}

function Platform(x,y){
	this.img = new Image();
	this.xOffset = 100;
	this.x = x;
	this.y = y;
	this.img.x = x;
	this.img.y = y;
	this.img.src = "./pictures/Platform.png";
	
	var img = this.img;
	this.img.onload = function(){
		return;
	}
	
	this.draw = function(){
		NJ.ctx.drawImage(img,x,y);
	}
	
	this.isHit = function(){
		if((spongeX >= this.x && spongeX <= this.x + this.xOffset)||(spongeX + Player.WIDTH >= this.x && spongeX + Player.WIDTH <= this.x + this.xOffset)){
			if(spongeY + Player.HEIGHT >= this.y && spongeY + Player.HEIGHT <= this.y+55 && spongeUpBool){
			SOUND.platformsound.play();
			spongeUpNr = 345;
			spongeUpBool = false;
			var index = NJ.entities.indexOf(this);
			NJ.entities.splice(index, 1);
			}
		}
	}
}	

function updatePlatforms(){
	
	NJ.entities.forEach(function(entry){
			entry.isHit();
		});
	
}
	
function start(){
	spongeX = NJ.WIDTH/4;
	spongeY = 500;
	spongeUpBool = true;
	spongeUpNr = 0;
	Player.IMAGE.onload = function(){
		NJ.ctx.drawImage(Player.IMAGE,spongeX,spongeY, Player.HEIGHT, Player.WIDTH);
	}
	
	var tempPlatform = new Platform(150, 750);
	var tempPlatform2 = new Platform(300, 750);
	var tempPlatform3 = new Platform(225, 450);
	NJ.entities.push(tempPlatform, tempPlatform2, tempPlatform3)
	
	NJ.loop();
}

function stop(){
	if(requestId){
		window.cancelAnimationFrame(requestId);
		requestId = undefined;
	}
}

var MenuButton = function(x,y,src,func){
	
	this.img = new Image();
	this.img.x1 = x;
	this.img.y1 = y;
	this.img.src = src;
	this.x1 = x;
	this.y1 = y;
	this.x2 = x + 200;
	this.y2 = y + 100;
	this.func = func;
	
	var img = this.img;
	
	
	this.img.onload = function(){
		return;
	}
	
	this.draw = function(img){
		NJ.ctx.drawImage(this.img,this.img.x1,this.img.y1);
	}
	
	
	this.isHit = function(x,y){
		x = (x - NJ.offset.left) / NJ.scale;
		y = (y - NJ.offset.top) / NJ.scale;
		if(this.x1 < x && x < this.x2 && this.y1 < y && y < this.y2){
			console.log(x);
			this.func();
	}
	}
	
}



var Menu = function(){
	currentScreen = this;
	var buttons = [];
	var placeholder = function(){
		alert("Button clicked");
		return true;
	};
	var startB = new MenuButton(220,100,"./pictures/start.png",start);
	var hs = new MenuButton(220,250,"./pictures/highscore.png",placeholder);
	var c = new MenuButton(220,400,"./pictures/charakter.png",placeholder);
	var fs = new MenuButton(220,800,"./pictures/fullscreen.png",toggleFullScreen);
	buttons.push(startB,hs,c,fs);
	
	this.draw = function(){
		buttons.forEach(function(entry){
			entry.draw();
		});
	};
	
	this.touchFunc = function(e){
		
		var touch = e.touches[0];
		buttons.forEach(function(entry) {
			
			entry.isHit(touch.pageX, touch.pageY);
		}, false);
	}

};


var menu = new Menu();

window.onload = function(){
	
	document.ontouchmove = function(e){ 
		e.preventDefault(); 
	}
	
	gamma = 0;
	tiltValue = 0;
	
	window.addEventListener('deviceorientation', function (e) {
		tiltValue=e.gamma;
	}, false);
	
	SOUND.initAudio();
	
	//start();
	currentScreen.draw();

};

window.addEventListener('touchstart', function(e) {
	e.preventDefault();
	currentScreen.touchFunc(e);
});

window.onkeyup = function(e) {
   var key = e.keyCode ? e.keyCode : e.which;

   if (key == 38) {
		start();
	}
}


