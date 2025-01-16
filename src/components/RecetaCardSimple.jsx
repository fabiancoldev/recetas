import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import './RecetaCardSimple.css';

const RecetaCardSimple = ({ receta }) => {
  const navigate = useNavigate();

  const handleVerMas = () => {
    navigate(`/receta/${receta._id}`);
  };

  // Función para normalizar el nombre de la categoría
  const normalizarCategoria = (categoria) => {
    return categoria.toLowerCase().replace(/\s+/g, '-');
  };

  // Función para obtener el primer ingrediente
  const obtenerPrimerIngrediente = (ingredientes) => {
    if (!ingredientes) return '';
    const primerLinea = ingredientes.split('\n')[0];
    return primerLinea.length > 50 ? `${primerLinea.substring(0, 50)}...` : primerLinea;
  };

  return (
    <div className={`receta-card-simple ${normalizarCategoria(receta.categoria)}`} onClick={handleVerMas}>
      <div className="receta-imagen">
        {receta.imagenUrl && <img src={receta.imagenUrl} alt={receta.nombre} />}
      </div>
      <div className="receta-info">
        <h3>{receta.nombre}</h3>
        <p className="categoria">{receta.categoria}</p>
        <p className="ingredientes">{obtenerPrimerIngrediente(receta.ingredientes)}</p>
      </div>
    </div>
  );
};

RecetaCardSimple.propTypes = {
  receta: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    ingredientes: PropTypes.string,
    imagenUrl: PropTypes.string
  }).isRequired
};

export default RecetaCardSimple;
