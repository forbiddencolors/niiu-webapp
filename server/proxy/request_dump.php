<?php
$req_dump = print_r($_POST, TRUE);
$fp = fopen('request_server.log', 'a');
fwrite($fp, "Post is: ".$req_dump);
fclose($fp);
echo $req_dump;