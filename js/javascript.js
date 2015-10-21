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