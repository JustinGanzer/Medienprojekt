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
	
	if(spongeX+img.width/2>NJ.WIDTH)
		spongeX=img.width/2*(-1);
	if(spongeX<(img.width/2*(-1)))
		spongeX=NJ.WIDTH-img.width/2;
	
	NJ.ctx.clearRect(0,0,NJ.canvas.width,NJ.canvas.height);
	NJ.ctx.drawImage(img,spongeX,NJ.HEIGHT/4);
	
};

function start(){
	
	img = new Image();
	img.src = "./pictures/spongi.png";
	spongeX = NJ.WIDTH/4;
	img.onload = function(){
		NJ.ctx.drawImage(img,spongeX,NJ.HEIGHT/4);
	}
	
}