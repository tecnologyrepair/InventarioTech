
function showSweetAlert(type, text, url) {
    // Se compara el tipo de mensaje a mostrar.
    let title, icon;
    switch (type) {
        case 1:
            title = 'Éxito';
            icon = 'success';
            break;
        case 2:
            title = 'Error';
            icon = 'error';
            break;
        case 3:
            title = 'Advertencia';
            icon = 'warning';
            break;
        case 4:
            title = 'Aviso';
            icon = 'info';
            break;
        case 5:
            title = 'Campos Vacios';
            icon = 'warning';
            break;
        case 6:
            title = 'Fechas Erroneas';
            icon = 'warning';
            break;
    }

    // Mostrar el SweetAlert
    Swal.fire({
        toast: true,
        position: 'top-end',
        timer: 3000,
        timerProgressBar: false,
        title: title,
        text: text,
        icon: icon,
        color: '#FFFFFF',
        background: '#FFFFFF',
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        allowEnterKey: true,
        stopKeydownPropagation: false
    });
}