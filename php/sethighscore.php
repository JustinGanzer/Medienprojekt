<?php
	mysql_connect("localhost","root","");
	mysql_select_db("highscore");
	mysql_query("SET CHARACTER SET utf8");
	mysql_query("INSERT INTO highscore (name, points) VALUES ('{$_POST['name']}' , '{$_POST['points']}')");
	
?>