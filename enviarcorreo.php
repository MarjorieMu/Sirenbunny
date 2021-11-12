<?php

$destino = "marjorieecastellanos@gmail.com";

$nombre = $_POST['nombre'];
$email = $_POST['email']
$telefono = $_POST['telefono']
$compañia = $_POST['compalia']
$asunto = $_POST['asunto'];
$mensaje = $_POST['email']
$telefono = $_POST['mensaje']

$header = "Envio desde formulario de contacto en localhost";
$mensajeCompleto = "\n Nombre :" . $nombre . "\n" . 
"Email :" . $email . "\n" . "Telefono :" . $telefono . "\n" . "Compañia :" . $compañia . "\n" . "Mensaje :" . $mensaje . "\n"; mail($destino $asunto, $mensajeCompleto, $header);
header('Location: contacto.html')