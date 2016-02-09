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
		if(spongeUpBool){
			NJ.entities.forEach(function(entry){
				entry.isHit();
			});
		}else{
			NJ.entities.forEach(function(entry){
				entry.check();
			});
		}
		generatePlatforms();			

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

		if(spongeY > 960){

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
	music : new Audio('./sounds/music.wav'),
	tempsounds : 0,
	
	//THIS DARN FUNCTION is NEEDED, because I love it.. not really, but a user input triggered
	//sound.play() method has to be called, otherwise it will be blocked.
	initAudio : function(){
    var self = this;
    self.audio = SOUND.platformsound;
	self.audio2 = SOUND.music;
	self.audio2.loop = true;
    var startAudio = function(){
		self.audio.play();
		self.audio2.play();
		document.removeEventListener("touchstart", self.startAudio, false);
                     }
    self.startAudio = startAudio;

    var pauseAudio = function(){
		self.audio.pause();
		self.audio2.pause();
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
sprungMax = 40;
		
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX	


//update players position
function updateSponge(){

	/*
	Erklärung:
	jumpHeight - individuell einstellbare Sprunghöhe
	temp - wie hoch der Spieler tatsächlich springen soll
	spongeUpBool - ACHTUNG: Koordinatenursprung ist OBEN LINKS
	deshalb fällt er bei TRUE und springt nach oben bei FALSE !!!!!

	SpongeUpNr - berechnet die Schnelligkeit
	*/
	/*
	var jumpHeight = 15;
	var temp = spongeUpNr/340;
	
	//Y height - höhe
	if(temp<0.1) //temp soll nicht zu klein werden
		temp=0.1;
	temp=temp*2*jumpHeight;
	if(spongeUpBool){
		spongeY = spongeY + temp; //neue Höhe berechnen
		if(!(spongeUpNr > 340)){ //Ess soll nicht zu schnell nach unten gesprungen werden (spongeUpNr berechnet die Sprunghöhe)
			spongeUpNr = spongeUpNr + temp;
		}
	}else{
		
		updatePlatforms(2*temp*boost); //wenn nach oben gesprungen wird, werden die Plattformen mit nach oben gezogen
		spongeY = spongeY - temp; //neue Höhe berechnen
		spongeUpNr = spongeUpNr - temp; //SpongeUpNr berechnet die Schnelligkeit
		punktzahl = punktzahl + temp; //Punktzahl
		if(spongeUpNr < 0 || spongeY<300){ //Wenn hoch genug gesprungen wird, geht es wieder nach unten
			spongeUpBool = true;
			spongeUpNr = 0;
		}
	}
	*/
    /* 
    Uberprüft ob der Spieler getroffen wurde, wenn dies der Fall ist fällt der Spieler nur noch nach unten, 
    ist dies nicht der Fall so wird ganz normal weiter gesprungen 
    */
    if(isHitted){
       spongeUpBool = true;
    } 
    var playerspeed = Math.sin((sprungdauer/sprungMax)*(Math.PI/2)); //playerspeed wird sinusförmig!
    //var playerspeed = sprungdauer/50;
    if(sprungdauer>sprungMax){ // man soll beim runterfallen ja nicht langsamer werden :D
        playerspeed = sprungdauer/10;
    }
    playerspeed = playerspeed*15; //allgemeine sprunghöhe
    var platformAndFallingSpeed = playerspeed;
    playerspeed = playerspeed*(currentPlatformX-300)/960; //playerspeed ist abhängig vom ausgangspunkt

    if(spongeUpBool){
        spongeY = spongeY + platformAndFallingSpeed;  
        sprungdauer++;
    }else{
        spongeY = spongeY - playerspeed;
        updatePlatforms(platformAndFallingSpeed*boost);
        punktzahl = punktzahl + playerspeed * boost;
        sprungdauer--;
        if(sprungdauer<=1 ){
            spongeUpBool = true;
            sprungdauer=1;
        }

    }

    
	if(boost>1) //boost soll kontinuierlich abgebaut werden
		boost = boost - (currentBoost/sprungMax);
	else
		boost = 1;
	
	//X - horizontale
	spongeX = spongeX + gamma; //dem aktuellen x-wert wird der gamme-wert hinzugefügt
	//wenn aus dem bildschirm gesprungen wird, kommt man aus der anderen seite wieder raus
	if(spongeX+Player.WIDTH/2>NJ.WIDTH)
		spongeX=Player.WIDTH/2*(-1);
	if(spongeX<(Player.WIDTH/2*(-1)))
		spongeX=NJ.WIDTH-Player.WIDTH/2;
	
};

function updatePlatforms(temp_update){
	NJ.entities.forEach(function(entry){
			entry.y = entry.y + temp_update;
			entry.img.x = entry.img.y + temp_update;
		});
}

//es werden so viele platformen hinzugefügt, bis es 50 gibt
function generatePlatforms(){
	while(NJ.entities.length<50){
		var entity_temp = NJ.entities[NJ.entities.length-1];
		var y = -Math.floor((Math.random() * 150) + 1) - 50 + entity_temp.y; //neue platform ist 20-100 pixel von der letzten platform entfernt
		var x = Math.floor((Math.random() * 540) + 1); 
		var platformType = Math.floor((Math.random() * 100) + 1); //10%wahrscheinlichkeit für schnellere plattformen
		if(platformType>90)
			platformType = 2;   
        else
			platformType = 1;
		var new_platform = new Platform(x, y, platformType);
		NJ.entities.push(new_platform);
        generateEnemy(x, y);
	}
}

function generateEnemy(x, y){
		var random = Math.floor((Math.random() * 100) + 1); //10%wahrscheinlichkeit für schnellere plattformen
		if(random > 90)
			var enemy = new Enemy(x, y, 1);
		else if (random > 80)
			var enemy = new Enemy(x, y, 1);
		
		NJ.entities.push(enemy);
	   console.log("test");
}

var requestId;

/* Hier wird das PLAYER Object definiert */
Player = new Object();
Player.Scale = 0.5;
Player.IMAGE = new Image();
Player.IMAGE.src = "./pictures/spongi.png";

Player.IMAGE.onload = function(){
	Player.WIDTH = Player.IMAGE.width * Player.Scale;
	Player.HEIGHT = Player.IMAGE.height * Player.Scale;
}

/* Hier werden die Gegner Objekte definiert, es gibt 3 Arten von Gegnern */
function Enemy(x, y, enemyType){
    this.img = new Image();
    this.x = x; 
    this.y = y;
    this.img.x = x;
	this.img.y = y;
    this.img.src = "./pictures/Enemy" + enemyType + ".png";

    var img = this.img;
	this.img.onload = function(){
		return;
	}
    
    this.draw = function(){
		NJ.ctx.drawImage(this.img,this.x,this.y);
	}

	this.check = function(){
		if(this.y>960){
			var index = NJ.entities.indexOf(this);
			NJ.entities.splice(index, 1);
		}
	}
	var counter = 0;
	this.isHit = function(){
        if(counter == 100){
            isHitted = true;    
            console.log(isHitted);

        }
    }
}

/* Hier werden die Gegner Objekte definiert */
function Platform(x, y ,platformType){
	this.img = new Image();
	this.xOffset = 100;
	this.x = x;
	this.y = y;
	this.img.x = x;
	this.img.y = y;
	this.img.src = "./pictures/Platform" + platformType + ".png";
	this.boost = 1;

	switch(platformType){
		case 1:
		this.boost = 1;
		break;

		case 2:
		this.boost = 4;
		break;

	}
	
	
	var img = this.img;
	this.img.onload = function(){
		return;
	}
	
	this.draw = function(){
		NJ.ctx.drawImage(this.img,this.x,this.y);
	}

	//wenn die plattform nicht mehr sichtbar ist, wird sie gelöscht
	this.check = function(){
		if(this.y>960){
			var index = NJ.entities.indexOf(this);
			NJ.entities.splice(index, 1);
		}
	}
	
	//überprüfung, ob der spieler eine plattform erwischt
	this.isHit = function(){
		if((spongeX >= this.x && spongeX <= this.x + this.xOffset)||(spongeX + Player.WIDTH >= this.x && spongeX + Player.WIDTH <= this.x + this.xOffset)){
			if(spongeY + Player.HEIGHT >= this.y && spongeY + Player.HEIGHT <= this.y+55){
			SOUND.platformsound.play();
			spongeUpNr = 345;
			sprungdauer = sprungMax;
			currentPlatformX = this.y;
			spongeUpBool = false;
			boost = this.boost;
			currentBoost= 1;
			var index = NJ.entities.indexOf(this);
			NJ.entities.splice(index, 1);
			//console.log("platform hitted at " + this.y);
			}
		}
	}
}	

	
function start(){
	spongeX = NJ.WIDTH/4;
	currentPlatformX = NJ.WIDTH/4;
	spongeY = 500;
	spongeUpBool = true;
    isHitted = false;
	spongeUpNr = 0;
	sprungdauer=sprungMax/2;
	punktzahl = 0;
	currentBoost=0;
	boost = 1;

	Player.IMAGE.onload = function(){
		NJ.ctx.drawImage(Player.IMAGE,spongeX,spongeY, Player.HEIGHT, Player.WIDTH);
	}

	SOUND.audio2.play()
	

	var tempPlatform = new Platform(150, 750,1);
	var tempPlatform2 = new Platform(300, 750,1);
	var tempPlatform3 = new Platform(225, 450,1);
   
	NJ.entities.push(tempPlatform, tempPlatform2, tempPlatform3);

	currentScreen=gamescreen;

	NJ.loop();
}

function stop(){
	if(requestId){
		window.cancelAnimationFrame(requestId);
		requestId = undefined;
		punktzahl = parseInt(punktzahl);
		alert("Verloren! Punktzahl: " + punktzahl);
		NJ.entities = [];
		NJ.render();
		currentScreen = menu;
		SOUND.audio2.pause();
		menu.draw();
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
			this.func();
	}
	}
	
}

var Gamescreen = function(){

	this.touchFunc = function(e){
		var touch = e.touches[0];
		alert("Shooting not implemented yet!");
	}
}



var Menu = function(){
	currentScreen = this;
	gamescreen = new Gamescreen();
	var buttons = [];
	var placeholder = function(){
		alert("Button clicked");
		return true;
	};
	var startButton = new MenuButton(220,100,"./pictures/start.png",start);
	var highscoreButton = new MenuButton(220,250,"./pictures/highscore.png",placeholder);
	var charakterButton = new MenuButton(220,400,"./pictures/charakter.png",placeholder);
	var fullscreenButton = new MenuButton(220,800,"./pictures/fullscreen.png",toggleFullScreen);
	buttons.push(startButton,highscoreButton,charakterButton,fullscreenButton);
	
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


menu = new Menu();

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


