import { useState, useEffect } from 'react';
import { createReceta, getRecetaById, updateReceta } from '../services/RecetaServices';
import './Registrar.css';

const CATEGORIAS = ['Entrada', 'Plato Principal', 'Postre', 'Bebida'];
const ESTADOS = ['Activa', 'Inactiva'];

const Registrar = ({ recetaId, onRecetaRegistrada, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    ingredientes: '',
    instrucciones: '',
    categoria: '',
    imagenUrl: '',
    estado: 'Activa' // Estado por defecto
  });
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  useEffect(() => {
    if (recetaId) {
      cargarReceta();
    }
  }, [recetaId]);

  const cargarReceta = async () => {
    try {
      setLoading(true);
      const data = await getRecetaById(recetaId);
      if (data) {
        setFormData({
          nombre: data.nombre || '',
          ingredientes: data.ingredientes || '',
          instrucciones: data.instrucciones || '',
          categoria: data.categoria || '',
          imagenUrl: data.imagenUrl || '',
          estado: data.estado || 'Activa'
        });
      }
    } catch (error) {
      console.error('Error al cargar la receta:', error);
      mostrarMensaje('Error al cargar la receta', 'error');
    } finally {
      setLoading(false);
    }
  };

  const mostrarMensaje = (texto, tipo) => {
    setMensaje({ texto, tipo });
    setTimeout(() => {
      setMensaje({ texto: '', tipo: '' });
    }, 3000);
  };

  const validarFormulario = () => {
    if (!formData.nombre.trim()) {
      mostrarMensaje('El nombre es obligatorio', 'error');
      return false;
    }
    if (!formData.ingredientes.trim()) {
      mostrarMensaje('Los ingredientes son obligatorios', 'error');
      return false;
    }
    if (!formData.instrucciones.trim()) {
      mostrarMensaje('Las instrucciones son obligatorias', 'error');
      return false;
    }
    if (!formData.categoria) {
      mostrarMensaje('La categoría es obligatoria', 'error');
      return false;
    }
    if (!formData.estado) {
      mostrarMensaje('El estado es obligatorio', 'error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    try {
      setLoading(true);
      const dataToSend = {
        ...formData,
        imagenUrl: formData.imagenUrl.trim() || ''
      };

      if (recetaId) {
        await updateReceta(recetaId, dataToSend);
        mostrarMensaje('Receta actualizada con éxito', 'exito');
      } else {
        await createReceta(dataToSend);
        mostrarMensaje('Receta creada con éxito', 'exito');
      }
      
      if (onRecetaRegistrada) {
        onRecetaRegistrada();
      }
    } catch (error) {
      console.error('Error:', error);
      mostrarMensaje('Error al guardar la receta', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (loading) {
    return (
      <div className="registrar-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="registrar-container">
      <h2>{recetaId ? 'Editar Receta' : 'Nueva Receta'}</h2>
      
      <form onSubmit={handleSubmit} className="registrar-form">
        <div className="form-group">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            placeholder="Nombre de la receta"
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
          >
            <option value="">Seleccione una categoría</option>
            {CATEGORIAS.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="estado">Estado:</label>
          <select
            id="estado"
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
          >
            {ESTADOS.map(estado => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="ingredientes">Ingredientes:</label>
          <textarea
            id="ingredientes"
            name="ingredientes"
            value={formData.ingredientes}
            onChange={handleInputChange}
            placeholder="Ingrese los ingredientes (uno por línea)"
            rows="4"
          />
        </div>

        <div className="form-group">
          <label htmlFor="instrucciones">Instrucciones:</label>
          <textarea
            id="instrucciones"
            name="instrucciones"
            value={formData.instrucciones}
            onChange={handleInputChange}
            placeholder="Ingrese las instrucciones paso a paso"
            rows="6"
          />
        </div>

        <div className="form-group">
          <label htmlFor="imagenUrl">URL de la imagen:</label>
          <input
            type="url"
            id="imagenUrl"
            name="imagenUrl"
            value={formData.imagenUrl}
            onChange={handleInputChange}
            placeholder="https://ejemplo.com/imagen.jpg"
          />
        </div>

        {mensaje.texto && (
          <div className={`mensaje ${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}

        <div className="form-buttons">
          <button type="submit" className="submit-btn" disabled={loading}>
            {recetaId ? 'Actualizar' : 'Crear'} Receta
          </button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={onCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registrar;
