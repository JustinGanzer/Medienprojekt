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
	character: 0,
	
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
		NJ.ctx.font="30px Arial";
		

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
	   NJ.ctx.fillText(parseInt(punktzahl) + " Punkte",10,30);
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

			gameover();
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
	music : new Audio('./sounds/music0.wav'),
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
		//self.audio2.pause();
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
	
    //Überprüfung ob der Spieler getroffen wurde
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
		if(!generateEnemy(x,y)){
			var platformType = Math.floor((Math.random() * 100) + 1); //10%wahrscheinlichkeit für schnellere plattformen
			if(platformType>90)
				platformType = 2;   
	        else
				platformType = 1;
			var new_platform = new Platform(x, y, platformType);
			NJ.entities.push(new_platform);
		}
		
	}
}

function generateEnemy(x, y){
		var random = Math.floor((Math.random() * 100) + 1); 
        if(NJ.entities[NJ.entities.length-1] instanceof Platform){
            if(random > 91){
                var enemy = new Enemy(x, y, 1);
                NJ.entities.push(enemy);
                return true;     
            } else if (random > 90){
                var enemy = new Enemy(x, y, 2);
                NJ.entities.push(enemy);
                return true;
            } 
        } else {
            return false;
        }
}

var requestId;

/* Hier wird das PLAYER Object definiert */
Player = new Object();
Player.Scale = 0.5;
Player.IMAGE = new Image();
Player.IMAGE.src = "./pictures/spongi0.png";

Player.IMAGE.onload = function(){
	Player.WIDTH = Player.IMAGE.width * Player.Scale;
	Player.HEIGHT = Player.IMAGE.height * Player.Scale;
}

/* Hier werden die Gegner Objekte definiert, es gibt 3 Arten von Gegnern */
function Enemy(x, y, enemyType){
    this.img = new Image();
    this.xOffset =75;
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
		NJ.ctx.drawImage(this.img,this.x,this.y - img.y);
	}

	this.check = function(){
		if(this.y > 960){
			var index = NJ.entities.indexOf(this);
			NJ.entities.splice(index, 1);
		}
	}
	this.isHit = function(){    
		if((spongeX >= this.x && spongeX <= this.x + this.xOffset)||(spongeX + Player.WIDTH >= this.x && spongeX + Player.WIDTH <= this.x + this.xOffset)){
            if(spongeY + Player.HEIGHT >= this.y && spongeY + Player.HEIGHT <= this.y+55){
                console.log(isHitted);
                isHitted = true;
            }
        }    
    }
}

/* Hier werden die Gegner Objekte definiert */
function Platform(x, y ,platformType){
	this.img = new Image();
	this.xOffset = 75;
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
            
        case 3:
        this.boost = 0;
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

		punktzahl = parseInt(punktzahl);
		alert("Verloren! Punktzahl: " + punktzahl);
		var playerName_temp = prompt("In die Highscore-Liste eintragen.",playerName);
		if (playerName_temp){
			playerName = playerName_temp;
			var xhttp= new XMLHttpRequest();
			xhttp.open("post","php/sethighscore.php",true);
			xhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			xhttp.send("name="+ playerName + "&punkte=" + punktzahl);
		}

		

		NJ.entities = [];
		NJ.render();
		isPaused = true;
		currentScreen = menu;
		SOUND.audio2.pause();
		menu.draw();


		

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

function highscore(){
	currentScreen=this;
	var xhttp= new XMLHttpRequest();
	var button = new MenuButton(0,0,"./pictures/back.png",menu.draw);

	this.touchFunc = function(e){

		var touch = e.touches[0];
			button.isHit(touch.pageX, touch.pageY);
		}

	
	xhttp.onreadystatechange = function(){
		if(xhttp.readyState==4 && xhttp.status==200){
			NJ.Draw.clear();
			button.draw();
			var text = xhttp.responseText;
			var x = 100;
			var y = 150;
			var lineheight = 30;
			var lines = text.split("\n");
			for (var i = 0;i<lines.length;i++){
				NJ.ctx.fillText(lines[i], x, y + (i*lineheight) );
			}
			console.log(xhttp.responseText);
		}
	}

	xhttp.open("GET","php/gethighscore.php",true);
	xhttp.send();

}


var Menu = function(){
	currentScreen = this;
	playerName = "";
	gamescreen = new Gamescreen();
	var buttons = [];
	var placeholder = function(){
		alert("Button clicked");
		return true;
	};
	var startButton = new MenuButton(220,100,"./pictures/start.png",start);
	var highscoreButton = new MenuButton(220,250,"./pictures/highscore.png",highscore);
	var charakterButton = new MenuButton(220,400,"./pictures/charakter.png",charselection);
	var fullscreenButton = new MenuButton(220,800,"./pictures/fullscreen.png",toggleFullScreen);
	buttons.push(startButton,highscoreButton,charakterButton,fullscreenButton);
	
	this.draw = function(){
		currentScreen = menu;
		NJ.Draw.clear();
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
//Single Instance
menu = new Menu();


//Character selection XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

var selectChar = function(x){
	currentScreen = menu;
	NJ.Draw.clear();
	NJ.character = x;

	//Player.IMAGE = new Image();
	if(NJ.character == 0) {
		Player.IMAGE.src = "./pictures/spongi0.png";
	}
	else{
		Player.IMAGE.src = "./pictures/spongi1.png";
	}
	Player.IMAGE.onload = function(){
		Player.WIDTH = Player.IMAGE.width * Player.Scale;
		Player.HEIGHT = Player.IMAGE.height * Player.Scale;
	}

	SOUND.music = new Audio('./sounds/music' + NJ.character + '.wav');
	SOUND.audio2 = SOUND.music;
	SOUND.audio2.loop = true;

	currentScreen.draw();
}

var Chars = function(){
	currentScreen = this;

	var buttons2 = [];

	var Char1 = new MenuButton(150,400,"./pictures/spongi0.png",function(){selectChar(0)});
	var Char2 = new MenuButton(300,400,"./pictures/spongi1.png",function(){selectChar(1)});

	//because the characters aren't of normal button size
	Char1.x2 = Char1.x1 + 160;
	Char1.y2 = Char1.y1 + 200;
	Char2.x2 = Char2.x1 + 160;
	Char2.y2 = Char2.y1 + 200;


	buttons2.push(Char1,Char2);

	this.draw = function(){
		NJ.Draw.clear();
		buttons2.forEach(function(entry){
			entry.draw();
		});
	};

	this.touchFunc = function(e){

		var touch = e.touches[0];
		buttons2.forEach(function(entry) {

			entry.isHit(touch.pageX, touch.pageY);
		}, false);
	}

};

function charselection(){
	SOUND.audio2.pause();
	var charMenu = new Chars();
	currentScreen = charMenu;
	NJ.Draw.clear();
	currentScreen.draw();

}

//GAMEOVERrrrrrrRRR...RRR!! Screen XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

function gameover(){
	if(requestId) {
		window.cancelAnimationFrame(requestId);
		requestId = undefined;
		currentScreen = null;
		NJ.Draw.clear();
		var img = new Image();
		img.src = "./pictures/topf.png";
		img.onload = function () {
			return;
		}
		var img2 = new Image();
		img2.src = "./pictures/gameover.png";
		img2.onload = function () {
			return;
		}
//        var klein_tropfen = new Image();
//		img2.src = "./pictures/Tropfen1.png";
//		img2.onload = function () {
//			return;
//		}
//        var groß_tropfen = new Image();
//		img2.src = "./pictures/Tropfen2.png";
//		img2.onload = function () {
//			return;
//		}

        
		var draw = function () {
			NJ.ctx.drawImage(img, 40, 700);
			NJ.ctx.drawImage(img2, 0, 200);
		}
        var wateranim = function(x, y) {
            NJ.ctx.drawImage(klein_tropfen, x, y);
            NJ.ctx.drawImage(klein_tropfen, x, y);
            NJ.ctx.drawImage(groß_tropfen, x, y);
            NJ.ctx.drawImage(groß_tropfen, x, y);
        }

		var x = 250;
		var y = 50;
		draw();
		NJ.ctx.drawImage(Player.IMAGE, x, y, Player.HEIGHT, Player.WIDTH);
		this.loop = function () {
			if (y < 800) {
				y = y + 20;
				NJ.Draw.clear();
				draw();
				NJ.ctx.drawImage(Player.IMAGE, x, y, Player.HEIGHT, Player.WIDTH);
				if( /iPhone/i.test(navigator.userAgent)){
					setTimeout(this.loop, 25);
				}else{
					requestAnimFrame(this.loop);
				}
				
			} else {

//                for(var i = 0; i <= 800; i++){
//                    wateranim(x , y - i);
//                    console.log(i);
//                    NJ.Draw.clear();
//                }
                stop();
            }

		this.loop();
	}
}



//Onload XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
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
		highscore();
	}
}


}