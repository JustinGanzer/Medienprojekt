<?php
	mysql_connect("localhost","highscore","");
	mysql_select_db("highscore");
	
	$result = mysql_query("SELECT * FROM highscore ORDER BY punkte DESC");
	$platz = 1;
	echo "Platz   Name   Punkte\n";
	while($row = mysql_fetch_array($result)){
		echo "  " . $platz . "  " . $row["name"] . $row["punkte"] . "\n";
		$platz++;
	}


?>