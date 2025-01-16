import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRecetaById } from '../services/RecetaServices';
import imagenGenerica from '../assets/img/generica.webp';
import './RecetaDetalle.css';

const RecetaDetalle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [receta, setReceta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarReceta = async () => {
      try {
        setLoading(true);
        const data = await getRecetaById(id);
        if (!data) {
          throw new Error('No se encontró la receta');
        }
        console.log('Receta cargada:', data);
        setReceta(data);
        setError(null);
      } catch (err) {
        console.error('Error al cargar la receta:', err);
        setError('No se pudo cargar la receta. Por favor, intenta de nuevo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    cargarReceta();
  }, [id]);

  const handleVolver = () => {
    navigate(-1);
  };

  const renderIngredientes = (ingredientes) => {
    if (!ingredientes) return null;
    return ingredientes.split('\n').map((ingrediente, index) => (
      <li key={index} className="ingrediente-item">
        <span className="bullet">•</span>
        {ingrediente.trim()}
      </li>
    ));
  };

  const renderInstrucciones = (instrucciones) => {
    if (!instrucciones) return null;
    return instrucciones.split('\n').map((paso, index) => (
      <div key={index} className="paso-item">
        <div className="paso-numero">{index + 1}</div>
        <p className="paso-texto">{paso.trim()}</p>
      </div>
    ));
  };

  // Función para manejar la URL de la imagen
  const getImageUrl = () => {
    if (!receta) return imagenGenerica;
    console.log('Receta en detalle:', receta);
    console.log('URL de imagen en detalle:', receta.imagenUrl);
    return receta.imagenUrl && receta.imagenUrl.trim() !== '' 
      ? receta.imagenUrl 
      : imagenGenerica;
  };

  const handleImageError = (e) => {
    console.log('Error al cargar la imagen en detalle, usando imagen genérica');
    e.target.src = imagenGenerica;
    e.target.onerror = null; // Previene loop infinito
  };

  if (loading) {
    return (
      <div className="receta-detalle-container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Cargando receta...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="receta-detalle-container">
        <div className="error-container">
          <p className="error-message">{error}</p>
          <button onClick={handleVolver} className="volver-btn">
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (!receta) {
    return (
      <div className="receta-detalle-container">
        <div className="error-container">
          <p className="error-message">No se encontró la receta</p>
          <button onClick={handleVolver} className="volver-btn">
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="receta-detalle-container">
      <button onClick={handleVolver} className="volver-btn">
        ← Volver
      </button>

      <div className="receta-header">
        <div className="receta-titulo-container">
          <h1>{receta.nombre}</h1>
          <span className={`categoria-badge ${receta.categoria.toLowerCase().replace(/\s+/g, '-')}`}>
            {receta.categoria}
          </span>
        </div>
      </div>

      <div className="receta-content">
        <div className="receta-imagen-container">
          <img 
            src={getImageUrl()} 
            alt={receta.nombre}
            className="receta-imagen"
            onError={handleImageError}
          />
        </div>

        <div className="receta-info">
          <section className="seccion-ingredientes">
            <h2>Ingredientes</h2>
            <ul className="ingredientes-lista">
              {renderIngredientes(receta.ingredientes)}
            </ul>
          </section>

          <section className="seccion-preparacion">
            <h2>Preparación</h2>
            <div className="pasos-lista">
              {renderInstrucciones(receta.instrucciones)}
            </div>
          </section>

          {receta.tiempo_preparacion && (
            <section className="seccion-tiempo">
              <h2>Tiempo de Preparación</h2>
              <p>{receta.tiempo_preparacion}</p>
            </section>
          )}

          {receta.porciones && (
            <section className="seccion-porciones">
              <h2>Porciones</h2>
              <p>{receta.porciones}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecetaDetalle;
