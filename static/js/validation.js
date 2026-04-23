/**
 * Validación avanzada de formularios
 */

/**
 * Validar email
 */
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Validar teléfono
 */
function validarTelefono(telefono) {
    const regex = /^\d{7,}$/;
    return regex.test(telefono.replace(/[^\d]/g, ''));
}

/**
 * Validar edad
 */
function validarEdad(edad) {
    return edad >= 0 && edad <= 150;
}

/**
 * Validar IMC
 */
function validarIMC(peso, altura) {
    if (peso <= 0 || altura <= 0) return false;
    const imc = peso / (altura ** 2);
    return imc >= 10 && imc <= 60;
}

/**
 * Validar valores clínicos
 */
function validarValoresClinicos(datos) {
    const errores = [];
    
    if (datos.edad && !validarEdad(datos.edad)) {
        errores.push('Edad inválida');
    }
    
    if (datos.glucosa && (datos.glucosa < 40 || datos.glucosa > 500)) {
        errores.push('Valor de glucosa fuera de rango');
    }
    
    if (datos.presion_sistolica && (datos.presion_sistolica < 60 || datos.presion_sistolica > 250)) {
        errores.push('Presión sistólica fuera de rango');
    }
    
    if (datos.presion_diastolica && (datos.presion_diastolica < 40 || datos.presion_diastolica > 150)) {
        errores.push('Presión diastólica fuera de rango');
    }
    
    return errores;
}

/**
 * Mostrar errores en formulario
 */
function mostrarErroresFormulario(formulario, errores) {
    // Limpiar errores anteriores
    formulario.querySelectorAll('.invalid-feedback').forEach(e => e.remove());
    formulario.classList.remove('was-validated');
    
    // Mostrar nuevos errores
    errores.forEach(error => {
        const elemento = formulario.querySelector(`[name="${error.campo}"]`);
        if (elemento) {
            elemento.classList.add('is-invalid');
            
            const feedback = document.createElement('div');
            feedback.className = 'invalid-feedback d-block';
            feedback.textContent = error.mensaje;
            elemento.parentNode.appendChild(feedback);
        }
    });
}
