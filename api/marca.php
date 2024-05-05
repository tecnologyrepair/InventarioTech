<?php
// Ruta de la base de datos SQLite
$database_path = '../inventariotech.db';

// Realizar la conexión a la base de datos
$db = new SQLite3($database_path);

// Verificar si se está enviando el formulario para agregar una nueva marca
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar si se proporcionó un nombre de marca
    if (isset($_POST['nombre'])) {
        // Obtener el nombre de la marca del formulario
        $nombre = $_POST['nombre'];

        // Insertar la nueva marca en la tabla MarcaEquipo
        $stmt = $db->prepare('INSERT INTO MarcaEquipo (NombreMarca) VALUES (:nombre)');
        $stmt->bindValue(':nombre', $nombre, SQLITE3_TEXT);
        $result = $stmt->execute();

        // Verificar si la inserción fue exitosa
        if ($result) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al agregar la marca']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Nombre de marca no proporcionado']);
    }
    exit; // Terminar el script después de manejar el envío del formulario
}

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
