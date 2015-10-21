window.onload = function(){
	document.ontouchstart = function(e){ 
		e.preventDefault(); 
	}
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