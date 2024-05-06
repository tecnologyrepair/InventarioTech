// Declaración de los modals
var modal_agregar = new bootstrap.Modal(
  document.getElementById("agregar_marca")
);
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
  // Realizar la solicitud para obtener los datos de la tabla MarcaEquipo
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "../api/marca.php?action=ver-consultas", true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response && response.length > 0) {
        // Limpiar el cuerpo de la tabla antes de agregar nuevos datos
        var tbody = document.getElementById("tbody-rows-general");
        tbody.innerHTML = "";

        // Iterar sobre los datos y agregar filas a la tabla
        response.forEach(function (row) {
          var tr = document.createElement("tr");
          tr.innerHTML =
            "<td>" + row.IDMarca + "</td>" + "<td>" + row.NombreMarca + "</td>";
          tbody.appendChild(tr);
        });

        // Mostrar el modal después de cargar los datos
        modal_ver.show();
      } else {
        showSweetAlert(3, "No hay datos", "");
      }
    }
  };
  xhr.send();
}

// Obtener referencia al formulario de agregar
var agregarForm = document.getElementById("agregar_form");

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
        location.reload(); // Recargar la página para actualizar la tabla
        modal_agregar.hide(); // Cerrar el modal de agregar
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
eliminarForm.addEventListener("submit", function (event) {
  // Evitar el envío del formulario por defecto
  event.preventDefault();

  // Obtener el ID de la marca a eliminar
  var idMarca = document.getElementById("idmarca").value;

  // Realizar la solicitud AJAX para eliminar la marca
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "../api/marca.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        if (response.success) {
          // Si la eliminación fue exitosa, recargar la página para actualizar la tabla
          showSweetAlert(1, "Se ha eliminado la marca", "");
          //location.reload();
        } else {
          // Si hubo un error, mostrar un mensaje de error
          showSweetAlert(2, "Error al eliminar la marca", "");
        }
      } else {
        // Si hubo un error en la solicitud AJAX, mostrar un mensaje de error
        showSweetAlert(3, "Error en la solicitud AJAX", "");
      }
    }
  };

  // Enviar los datos del formulario
  xhr.send("action=eliminar&idmarca=" + encodeURIComponent(idMarca));
});

//ACTUALIZAR
// Función para abrir el modal de actualización y llenar los campos con los datos de la fila seleccionada
function openActualizarModal(idMarca, nombreMarca, estadoMarca) {
  // Llenar los campos del modal con los datos de la fila seleccionada
  document.getElementById('idmarcaM').value = idMarca;
  document.getElementById('nombreM').value = nombreMarca;

  // Realizar la solicitud AJAX para obtener los estados disponibles
  fetch('../api/marca.php?action=estado') 
  .then(response => response.json())
  .then(data => {
      // Limpiar el select
      var selectEstado = document.getElementById('estadoM');
      selectEstado.innerHTML = '';

      // Agregar las opciones al select
      data.forEach(function(estado) {
          var option = document.createElement('option');
          option.value = estado;
          option.textContent = estado;
          selectEstado.appendChild(option);
      });

      // Seleccionar el estado actual de la marca en el select
      document.getElementById('estadoM').value = estadoMarca;
  })
  .catch(error => {
    showSweetAlert(2, "Error", "");
  });

  // Abrir el modal de actualización
  var modal = new bootstrap.Modal(document.getElementById('modificar'));
  modal.show();
}

// Escuchar el envío del formulario de actualización
document
  .getElementById("modificar_form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Evitar el envío del formulario por defecto

    // Obtener los datos del formulario
    var idMarca = document.getElementById("idmarcaM").value;
    var nombreMarca = document.getElementById("nombreM").value;
    var estadoMarca = document.getElementById("estadoM").value;

    // Realizar la solicitud AJAX para actualizar los datos
    fetch("../api/marca.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "action=actualizar&idmarca=" +
        encodeURIComponent(idMarca) +
        "&nombre=" +
        encodeURIComponent(nombreMarca) +
        "&estado=" +
        encodeURIComponent(estadoMarca),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Cerrar el modal después de actualizar los datos
          var modal = bootstrap.Modal.getInstance(
            document.getElementById("modificar")
          );
          modal.hide();
          showSweetAlert(1, "Se actualizaron los datos a la base de datos", "");
          // Actualizar la tabla o realizar otras acciones necesarias
        } else {
          alert("Error al actualizar los datos: " + data.error);
        }
      })
      .catch((error) => {
        showSweetAlert(2, "Error", "");
      });
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
      if (response && response.length > 0) {
        // Limpiar el cuerpo de la tabla antes de agregar nuevos datos
        tbody.innerHTML = "";

        // Iterar sobre los datos y agregar filas a la tabla
        response.forEach(function (row) {
          var tr = document.createElement("tr");

          var idCell = document.createElement("td");
          idCell.textContent = row.IDMarca;
          tr.appendChild(idCell);

          var nombreCell = document.createElement("td");
          nombreCell.textContent = row.NombreMarca;
          tr.appendChild(nombreCell);

          var accionesCell = document.createElement("td");
          var botonActualizar = document.createElement("button");
          botonActualizar.classList.add("boton_actualizar");
          botonActualizar.innerHTML =
            '<img src="../recursos/iconos/editar.png" alt="" height="25px">';
          botonActualizar.addEventListener("click", function () {
            openActualizarModal(row.IDMarca, row.NombreMarca, row.estado);
          });
          accionesCell.appendChild(botonActualizar);

          var botonEliminar = document.createElement("button");
          botonEliminar.classList.add("boton_eliminar");
          botonEliminar.innerHTML =
            '<img src="../recursos/iconos/eliminar.png" alt="" height="25px">';
          botonEliminar.addEventListener("click", function () {
            openEliminarModal(row.IDMarca, row.NombreMarca);
          });
          accionesCell.appendChild(botonEliminar);

          tr.appendChild(accionesCell);

          tbody.appendChild(tr);
        });
      } else {
        showSweetAlert(2, "Error", "");
      }
    }
  };
  xhr.send();
});
