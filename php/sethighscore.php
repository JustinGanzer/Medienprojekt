<?php
	mysql_connect("localhost","highscore","");
	mysql_select_db("highscore");
	mysql_query("SET CHARACTER SET utf8");
	mysql_query("INSERT INTO highscore (name, punkte) VALUES ('{$_POST['name']}' , '{$_POST['punkte']}')");
	
?>