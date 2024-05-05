// Declaración de los modals
var modal_agregar = new bootstrap.Modal(document.getElementById("agregar_marca"));
var modal_ver = new bootstrap.Modal(document.getElementById("ver_consultas"));
var modal_eliminar = new bootstrap.Modal(document.getElementById("eliminar"));

//ABRIR MODAL AGREGAR
// Función para abrir el modal de agregar
function openAgregar() {
  modal_agregar.show();
}


//PROCESO VER LAS CONSULTAS
// Función para abrir el modal de ver
function openConsulta() {
  console.log("Abriendo modal de consulta");
  // Realizar la solicitud para obtener los datos de la tabla MarcaEquipo
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../api/marca.php?action=ver-consultas", true);
  xhr.onreadystatechange = function() {
    console.log("ReadyState: " + xhr.readyState + ", Status: " + xhr.status);
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      console.log("Respuesta del servidor:", response);
      if (response && response.length > 0) {
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
        modal_ver.show();
      } else {
        console.error("Error: No se recibieron datos del servidor");
      }
    }
  };
  xhr.send();
}

// Obtener referencia al formulario de agregar
var agregarForm = document.getElementById("agregar_form");

// Adjuntar un controlador de eventos para el evento de envío del formulario
agregarForm.addEventListener("submit", function(event) {
  // Evitar el envío del formulario por defecto
  event.preventDefault();

  // Obtener el valor del campo de nombre del formulario
  var nombre = document.getElementById("nombre").value;

  // Realizar la solicitud AJAX para agregar la marca
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../api/marca.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Manejar la respuesta
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        // Si la inserción fue exitosa, mostrar un mensaje de éxito y recargar la página
        showSweetAlert(1, "Se agregaron los datos a la base de datos", "");
        modal_agregar.hide(); // Cerrar el modal de agregar
        location.reload(); // Recargar la página para actualizar la tabla
      } else {
        // Si hubo un error, mostrar un mensaje de error
        showSweetAlert(3, "Error al agregar la marca", "");
      }
    }
  };
  // Enviar los datos del formulario
  xhr.send("action=agregar&nombre=" + encodeURIComponent(nombre));
});

// Función para abrir el modal de eliminación y mostrar el nombre de la marca
function openEliminarModal(idMarca, nombreMarca) {
  document.getElementById("idmarca").value = idMarca;
  document.getElementById("nombreD").value = nombreMarca; // Modificado para establecer el valor del input en lugar de innerText
  modal_eliminar.show();
}

//PROCESO ELIMINAR
// Obtener referencia al formulario de eliminación
var eliminarForm = document.getElementById("eliminar_form");

// Adjuntar un controlador de eventos para el evento de envío del formulario de eliminación
eliminarForm.addEventListener("submit", function(event) {
  // Evitar el envío del formulario por defecto
  event.preventDefault();

  // Obtener el ID de la marca a eliminar
  var idMarca = document.getElementById("idmarca").value;

  // Realizar la solicitud AJAX para eliminar la marca
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../api/marca.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          // Si la eliminación fue exitosa, recargar la página para actualizar la tabla
          showSweetAlert(1, "Se ha eliminado la marca", "");
          //location.reload();
        } else {
          // Si hubo un error, mostrar un mensaje de error
          showSweetAlert(1, "Error al eliminar la marca", "");
        }
      } else {
        // Si hubo un error en la solicitud AJAX, mostrar un mensaje de error
        alert(3, "Error en la solicitud AJAX", "");
      }
    }
  };
  
  // Enviar los datos del formulario
  xhr.send("action=eliminar&idmarca=" + encodeURIComponent(idMarca));
});



//PROCESO TABLA MOSTRAR DATOS 
// Obtener la referencia al tbody
var tbody = document.getElementById("tbody-rows");

document.addEventListener("DOMContentLoaded", function () {
  // Realizar la solicitud para obtener los datos de la tabla MarcaEquipo
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../api/marca.php?action=ver", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      console.log("Respuesta del servidor:", response);
      if (response && response.length > 0) {
        // Limpiar el cuerpo de la tabla antes de agregar nuevos datos
        tbody.innerHTML = "";

        // Iterar sobre los datos y agregar filas a la tabla
        response.forEach(function (row) {
          var tr = document.createElement("tr");
          tr.innerHTML = "<td>" + row.IDMarca + "</td>" + "<td>" + row.NombreMarca + "</td>" +
            "<td><button class='boton_eliminar' onclick='openEliminarModal(" + row.IDMarca + ",\"" + row.NombreMarca + "\")'><img src='../recursos/iconos/eliminar.png' alt='' height='25px'></button></td>";
          tbody.appendChild(tr);
        });
      } else {
        console.error("Error: No se recibieron datos del servidor");
      }
    }
  };
  xhr.send();
});
