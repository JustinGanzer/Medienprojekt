window.onload = function(){
	document.ontouchmove = function(e){ 
		e.preventDefault(); 
	}
	
	var img = new Image();
	img.src = "./pictures/spongi.png"
	NJ.ctx.drawImage(img,NJ.WIDTH/4,NJ.HEIGHT/4);
	
};

w = document.documentElement.clientWidth;
h = document.documentElement.clientHeight;

function drawCanvas(){
	var c = document.getElementById("myCanvas");
	c.width = w-1;
	c.height = h-1;
	var ctx = c.getContext("2d");
	ctx.fillStyle="#000000";
	ctx.fillRect(0,0,c.width,c.height);
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