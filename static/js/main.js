/**
 * ClinicalLens - JavaScript Principal
 * Funciones globales, validación, etc.
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('ClinicalLens cargado');
    
    // Validación Bootstrap
    validarFormulariosBootstrap();
    
    // Tooltips y Popovers
    inicializarTooltips();
});

/**
 * Validación de formularios con Bootstrap
 */
function validarFormulariosBootstrap() {
    const formularios = document.querySelectorAll('form');
    
    Array.from(formularios).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
}

/**
 * Inicializar tooltips de Bootstrap
 */
function inicializarTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
}

/**
 * Mostrar alerta personalizada
 */
function mostrarAlerta(mensaje, tipo = 'info') {
    const tipoAlert = `alert-${tipo}`;
    const html = `
        <div class="alert ${tipoAlert} alert-dismissible fade show" role="alert">
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>
    `;
    
    const container = document.querySelector('main .container');
    container.insertAdjacentHTML('afterbegin', html);
}

/**
 * Confirmar acción
 */
function confirmar(mensaje = '¿Estás seguro?') {
    return confirm(mensaje);
}

/**
 * Mostrar spinner de carga
 */
function mostrarCarga() {
    const spinner = document.createElement('div');
    spinner.className = 'spinner-border';
    spinner.innerHTML = '<span class="visually-hidden">Cargando...</span>';
    document.body.appendChild(spinner);
}

/**
 * Ocultar spinner
 */
function ocultarCarga() {
    const spinners = document.querySelectorAll('.spinner-border');
    spinners.forEach(s => s.remove());
}

/**
 * Exportar a CSV
 */
function exportarCSV(datos, nombre = 'datos.csv') {
    let csv = '';
    
    // Headers
    if (datos.length > 0) {
        csv = Object.keys(datos[0]).join(',') + '\n';
        
        // Filas
        datos.forEach(fila => {
            csv += Object.values(fila).join(',') + '\n';
        });
    }
    
    // Descargar
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = nombre;
    link.click();
}
