<?php
// Ruta de la base de datos SQLite
$database_path = '../inventariotech.db';

// Realizar la conexión a la base de datos
$db = new SQLite3($database_path);

// Verificar si la conexión fue exitosa
if ($db) {
    // Realizar la consulta para obtener todos los datos de MarcaEquipo
    $query = $db->query("SELECT * FROM MarcaEquipo");

    // Verificar si la consulta fue exitosa
    if ($query) {
        // Almacenar los resultados en un array
        $results = [];
        while ($row = $query->fetchArray(SQLITE3_ASSOC)) {
            $results[] = $row;
        }

        // Devolver los resultados como JSON
        echo json_encode($results);
    } else {
        echo json_encode(['error' => 'Error al ejecutar la consulta']);
    }

    // Cerrar la conexión a la base de datos
    $db->close();
} else {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
}
?>
