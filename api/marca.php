<?php
// Ruta de la base de datos SQLite
$database_path = '../inventariotech.db';

// Realizar la conexión a la base de datos
$db = new SQLite3($database_path);

// Verificar si se está enviando una solicitud POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el tipo de acción a realizar
    $action = $_POST['action'] ?? '';

    switch ($action) {
        case 'agregar':
            agregarMarca();
            break;
        case 'eliminar':
            eliminarMarca();
            break;
        // Agregar más casos según sea necesario para otras acciones
        default:
            echo json_encode(['error' => 'Acción no válida']);
            break;
    }
    exit; // Terminar el script después de manejar la solicitud
}

// Verificar si se está enviando una solicitud GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Obtener el tipo de acción a realizar (por ejemplo, ver datos)
    $action = $_GET['action'] ?? '';

    switch ($action) {
        case 'ver':
            verDatos();
            break;
        // Agregar más casos según sea necesario para otras acciones de visualización
        default:
            echo json_encode(['error' => 'Acción de visualización no válida']);
            break;
    }
    exit; // Terminar el script después de manejar la solicitud
}

// Función para agregar una nueva marca
function agregarMarca() {
    global $db;
    if (isset($_POST['nombre'])) {
        $nombre = $_POST['nombre'];
        $stmt = $db->prepare('INSERT INTO MarcaEquipo (NombreMarca, estado) VALUES (:nombre, \'activo\')');
        $stmt->bindValue(':nombre', $nombre, SQLITE3_TEXT);
        $result = $stmt->execute();
        if ($result) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al agregar la marca']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Nombre de marca no proporcionado']);
    }
}

// Función para eliminar una marca
function eliminarMarca() {
    global $db;
    if (isset($_POST['idmarca'])) {
        $idMarca = $_POST['idmarca'];
        $stmt = $db->prepare('UPDATE MarcaEquipo SET estado = "inactivo" WHERE IDMarca = :idmarca');
        $stmt->bindValue(':idmarca', $idMarca, SQLITE3_INTEGER);
        $result = $stmt->execute();
        if ($result) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Error al cambiar el estado de la marca']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'ID de marca no proporcionado']);
    }
}

// Función para ver los datos de la tabla MarcaEquipo
function verDatos() {
    global $db;
    // Realizar la consulta para obtener todos los datos de MarcaEquipo
    $query = $db->query("SELECT * FROM MarcaEquipo WHERE estado = 'activo'");

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
}
?>
