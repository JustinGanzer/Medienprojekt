<?php
	mysql_connect("localhost","root","");
	mysql_select_db("highscore");
	mysql_query("SET CHARACTER SET utf8");
	
	$result = mysql_query("SELECT * FROM highscore ORDER BY points DESC");
	$platz = 1;
	echo "Platz&%!Name&%!Punkte\n";
	while($row = mysql_fetch_array($result)){
		echo $platz . "&%!" . $row["name"] ."&%!" . $row["points"] . "\n";
		$platz++;
	}


?>