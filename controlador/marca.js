// Obtener la referencia al tbody
var tbody = document.getElementById('tbody-rows');

// Realizar la solicitud para obtener los datos de la tabla MarcaEquipo
var xhr = new XMLHttpRequest();
xhr.open('GET', '../api/marca.php', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.error) {
            console.error('Error:', response.error);
        } else {
            // Iterar sobre los datos y agregar filas a la tabla
            response.forEach(function (row) {
                var tr = document.createElement('tr');
                tr.innerHTML = '<td>' + row.IDMarca + '</td>' +
                               '<td>' + row.NombreMarca + '</td>';
                tbody.appendChild(tr);
            });
        }
    }
};
xhr.send();
