const API_URL = 'http://localhost:3000';

// Obtener todas las recetas
export const getRecetas = async () => {
  try {
    console.log('Llamando a getRecetas');
    const response = await fetch(`${API_URL}/recetas`);
    if (!response.ok) {
      throw new Error('Error al obtener las recetas');
    }
    const data = await response.json();
    console.log('Datos recibidos de la API:', data);
    return data;
  } catch (error) {
    console.error('Error en getRecetas:', error);
    throw error;
  }
};

// Obtener una receta por ID
export const getRecetaById = async (id) => {
  try {
    console.log('Llamando a getRecetaById con id:', id);
    const response = await fetch(`${API_URL}/recetas/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener la receta');
    }
    const data = await response.json();
    console.log('Datos de la receta recibidos:', data);
    return data;
  } catch (error) {
    console.error('Error en getRecetaById:', error);
    throw error;
  }
};

// Buscar recetas por nombre
export const searchRecetasByNombre = async (nombre) => {
  const response = await fetch(`${API_URL}/buscar/${nombre}`);
  return await response.json();
};

// Crear una nueva receta
export const createReceta = async (recetaData) => {
  try {
    console.log('Datos a enviar en createReceta:', recetaData);
    const response = await fetch(`${API_URL}/recetas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recetaData),
    });
    if (!response.ok) {
      throw new Error('Error al crear la receta');
    }
    const data = await response.json();
    console.log('Respuesta de createReceta:', data);
    return data;
  } catch (error) {
    console.error('Error en createReceta:', error);
    throw error;
  }
};

// Actualizar una receta existente
export const updateReceta = async (id, recetaData) => {
  try {
    console.log('Actualizando receta con id:', id);
    console.log('Datos a actualizar:', recetaData);
    const response = await fetch(`${API_URL}/recetas/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(recetaData),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar la receta');
    }
    const data = await response.json();
    console.log('Respuesta de updateReceta:', data);
    return data;
  } catch (error) {
    console.error('Error en updateReceta:', error);
    throw error;
  }
};

// Inactivar una receta
export const inactivateReceta = async (id) => {
  const response = await fetch(`${API_URL}/recetas/${id}/inactivar`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
  });
  return await response.json();
};

// Eliminar una receta
export const deleteReceta = async (id) => {
  try {
    const response = await fetch(`${API_URL}/recetas/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar la receta');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en deleteReceta:', error);
    throw error;
  }
};