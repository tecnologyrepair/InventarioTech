var modal_agregar = new bootstrap.Modal(
  document.getElementById("agregar_marca"),
  {
    keyboard: false,
  }
);

var modal_observar = new bootstrap.Modal(
  document.getElementById("ver_consultas"),
  {
    keyboard: false,
  }
);


// Obtener la referencia al tbody
var tbody = document.getElementById("tbody-rows");
// Obtener referencia al formulario de agregar
var agregarForm = document.getElementById("agregar_form");

function openAgregar() {
  //Se abre el modal de agregar
  modal_agregar.show();
  document.getElementById("nombre").value = "";
}

document.addEventListener("DOMContentLoaded", function () {
  // Adjuntar un controlador de eventos para el evento de envío del formulario
  agregarForm.addEventListener("submit", function (event) {
    // Evitar el envío del formulario por defecto
    event.preventDefault();

    // Obtener el valor del campo de nombre del formulario
    var nombre = document.getElementById("nombre").value;

    // Realizar la solicitud AJAX para agregar la marca
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "../api/marca.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // Manejar la respuesta
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          // Si la inserción fue exitosa, mostrar un mensaje de éxito y recargar la página
          showSweetAlert(1, "Se agregaron los datos a la base de datos", "");
          modal_agregar.hide();
          location.href = location.href + "?nocache=" + new Date().getTime();
        } else {
          // Si hubo un error, mostrar un mensaje de error
          showSweetAlert(3, "Error al agregar la marca", "");
        }
      }
    };
    // Enviar los datos del formulario
    xhr.send("nombre=" + encodeURIComponent(nombre));
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Realizar la solicitud para obtener los datos de la tabla MarcaEquipo
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../api/marca.php", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.error) {
        console.error("Error:", response.error);
      } else {
        // Iterar sobre los datos y agregar filas a la tabla
        response.forEach(function (row) {
          var tr = document.createElement("tr");
          tr.innerHTML = `
            <td> ${row.IDMarca}</td>
            <td> ${row.NombreMarca}</td>
            <td>
            <button class="boton_actualizar"><img src="../recursos/iconos/editar.png" alt="" height="25px"> </button>
            <button class="boton_eliminar"><img src="../recursos/iconos/eliminar.png" alt="" height="25px"> </button>
            </td>
            `;
          if (tbody) {
            tbody.appendChild(tr);
          } else {
            console.error("El elemento tbody no se encontró.");
          }
        });
      }
    }
  };
  xhr.send();
});

function openConsulta() {
  // Realizar la solicitud para obtener los datos de la tabla MarcaEquipo
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../api/marca.php", true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.error) {
        console.error("Error:", response.error);
      } else {
        // Limpiar el cuerpo de la tabla antes de agregar nuevos datos
        var tbody = document.getElementById("tbody-rows-general");
        tbody.innerHTML = "";

        // Iterar sobre los datos y agregar filas a la tabla
        response.forEach(function(row) {
          var tr = document.createElement("tr");
          tr.innerHTML = "<td>" + row.IDMarca + "</td>" + "<td>" + row.NombreMarca + "</td>";
          tbody.appendChild(tr);
        });

        // Mostrar el modal después de cargar los datos
        var modal = new bootstrap.Modal(document.getElementById('ver_consultas'));
        modal.show();
      }
    }
  };
  xhr.send();
}
