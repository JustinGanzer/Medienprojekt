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
	if(gamma>=0)
		spongeX+=5;
	else
		spongeX-=5;
	NJ.ctx.clearRect(0,0,NJ.canvas.width,NJ.canvas.height);
	NJ.ctx.drawImage(img,spongeX,NJ.HEIGHT/4);
	
};

function start(){
	
	img = new Image();
	img.src = "./pictures/spongi.png";
	spongeX = NJ.WIDTH/4;
}

function toggleFullScreen() {
  var doc = window.document;
  var docEl = doc.documentElement;

  var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
  var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

  if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
    requestFullScreen.call(docEl);
  }
  else {
    cancelFullScreen.call(doc);
  }
}