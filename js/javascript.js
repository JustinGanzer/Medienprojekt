			
			
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
<<<<<<< HEAD
				gamma = tiltValue/6;
=======
				gamma = tiltValue/2;
>>>>>>> origin/master
				updateSponge();
				

			},

			// this is where we draw all the entities
			render: function() {

			
			   NJ.Draw.clear(); 
			   NJ.ctx.drawImage(Player.IMAGE,spongeX,NJ.HEIGHT/4, Player.HEIGHT, Player.WIDTH);
			},

			// the actual loop
			// requests animation frame,
			// then proceeds to update
			// and render
			loop: function() {

				requestAnimFrame( NJ.loop );

				NJ.update();
				NJ.render();
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

			
			}


		};
		
		// abstracts various canvas operations into
		// standalone functions
			NJ.Draw = {

				clear: function() {
					NJ.ctx.clearRect(0, 0, NJ.WIDTH, NJ.HEIGHT);
					//NJ.ctx.clearRect(0,0,NJ.canvas.width,NJ.canvas.height);
				},

				rect: function(x, y, w, h, col) {
					NJ.ctx.fillStyle = col;
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

		window.addEventListener('load', NJ.init, false);
		window.addEventListener('resize', NJ.resize, false);
				//drawCanvas();
				/*
				document.getElementById("myButton").addEventListener("click", function(){
				toggleFullScreen();
				});
				*/
		
		
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX	

window.onload = function(){
	document.ontouchmove = function(e){ 
		e.preventDefault(); 
	}
	
	gamma = 0;
	tiltValue = 0;
	
	window.addEventListener('deviceorientation', function (e) {
		tiltValue=e.gamma;
		}, false);
	
	
	start();

};

function updateSponge(){
	spongeX = spongeX + gamma;
	
	if(spongeX+Player.WIDTH/2>NJ.WIDTH)
		spongeX=Player.WIDTH/2*(-1);
	if(spongeX<(Player.WIDTH/2*(-1)))
		spongeX=NJ.WIDTH-Player.WIDTH/2;
	
};

<<<<<<< HEAD
	/* Hier wird das PLAYER Object definiert */
	Player = new Object();
	Player.Scale = 0.4;
	Player.IMAGE = new Image();
	Player.IMAGE.src = "./pictures/spongi.png";
	Player.IMAGE.onload = function(){
	Player.WIDTH = Player.IMAGE.width * Player.Scale;
	console.log(Player.WIDTH);
	Player.HEIGHT = Player.IMAGE.height * Player.Scale;
	}
	
	
=======
Player = new Object();
Player.Scale = 0.4;
Player.IMAGE = new Image();
Player.IMAGE.src = "./pictures/spongi.png";

Player.IMAGE.onload = function(){
	Player.WIDTH = Player.IMAGE.width * Player.Scale;
	console.log(Player.WIDTH);
	Player.HEIGHT = Player.IMAGE.height * Player.Scale;
}

>>>>>>> origin/master
function start(){
	spongeX = NJ.WIDTH/4;
	
	Player.IMAGE.onload = function(){
		NJ.ctx.drawImage(Player.IMAGE,spongeX,NJ.HEIGHT/4, Player.HEIGHT, Player.WIDTH);
	}
	
	NJ.loop();
	
}