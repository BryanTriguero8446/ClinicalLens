/**
 * Funciones para llamadas a API REST
 */

const API_BASE = '/api';

/**
 * GET request
 */
async function apiGet(endpoint) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': obtenerCSRFToken()
            },
            credentials: 'include'
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error en GET:', error);
        mostrarAlerta(`Error: ${error.message}`, 'danger');
        throw error;
    }
}

/**
 * POST request
 */
async function apiPost(endpoint, datos = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': obtenerCSRFToken()
            },
            body: JSON.stringify(datos),
            credentials: 'include'
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error en POST:', error);
        mostrarAlerta(`Error: ${error.message}`, 'danger');
        throw error;
    }
}

/**
 * PUT request
 */
async function apiPut(endpoint, datos = {}) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': obtenerCSRFToken()
            },
            body: JSON.stringify(datos),
            credentials: 'include'
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error en PUT:', error);
        mostrarAlerta(`Error: ${error.message}`, 'danger');
        throw error;
    }
}

/**
 * DELETE request
 */
async function apiDelete(endpoint) {
    try {
        const response = await fetch(`${API_BASE}${endpoint}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': obtenerCSRFToken()
            },
            credentials: 'include'
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Error en DELETE:', error);
        mostrarAlerta(`Error: ${error.message}`, 'danger');
        throw error;
    }
}

/**
 * Obtener token CSRF
 */
function obtenerCSRFToken() {
    return document.querySelector('[name=csrfmiddlewaretoken]')?.value || '';
}

/**
 * Ejemplo: Crear predicción
 */
async function crearPrediccion(datosClinico) {
    try {
        mostrarCarga();
        const resultado = await apiPost('/prediccion/crear/', datosClinico);
        ocultarCarga();
        
        mostrarAlerta('Predicción generada exitosamente', 'success');
        return resultado;
    } catch (error) {
        ocultarCarga();
        console.error('Error:', error);
    }
}
