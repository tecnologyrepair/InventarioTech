<?php
// Ruta de la base de datos SQLite
$database_path = '../inventariotech.db';

try {
    // Crear una nueva conexión a la base de datos SQLite
    $db = new SQLite3($database_path);

    // Verificar si la conexión fue exitosa
    if (!$db) {
        throw new Exception("Error al conectar a la base de datos.");
    }

    // Realizar una operación simple para verificar la conexión
    $result = $db->query('SELECT 1');
    if (!$result) {
        throw new Exception("Error al ejecutar la consulta.");
    }

    // Si la conexión y la consulta son exitosas, devolver "success"
    echo "success";

} catch (Exception $e) {
    // Manejar cualquier error que ocurra durante la conexión
    echo "error";
}
?>
