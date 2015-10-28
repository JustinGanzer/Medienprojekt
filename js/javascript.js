window.onload = function(){
	document.ontouchmove = function(e){ 
		e.preventDefault(); 
	}
	
	gamma = 0;
	
	window.ondeviceorientation = function(event) {
		gamma = Math.round(event.gamma);
		updateSponge();
	}
	
	start();

};

function updateSponge(){
	spongeX = spongeX + gamma;
	NJ.ctx.clearRect(0,0,NJ.canvas.width,NJ.canvas.height);
	NJ.ctx.drawImage(img,spongeX,NJ.HEIGHT/4);
	
};

function start(){
	
	img = new Image();
	img.src = "./pictures/spongi.png";
	spongeX = NJ.WIDTH/4;
}