import PropTypes from 'prop-types';
import './RecetaCard.css';

const RecetaCard = ({ receta, onEdit, onInactivate, onDelete }) => {
  return (
    <div className="receta-card">
      <div className="receta-card-header">
        <h3>{receta.nombre}</h3>
        <span className={`estado-badge ${receta.estado.toLowerCase()}`}>
          {receta.estado}
        </span>
      </div>
      
      <div className="receta-card-content">
        <p className="categoria">
          <strong>Categoría:</strong> {receta.categoria}
        </p>
        <p className="ingredientes">
          <strong>Ingredientes:</strong>
          <span className="ingredientes-preview">
            {receta.ingredientes.split('\n')[0]}...
          </span>
        </p>
      </div>

      <div className="receta-actions">
        <button 
          onClick={() => onEdit(receta._id)} 
          className="edit-btn"
          title="Editar receta"
        >
          Editar
        </button>
        <button 
          onClick={() => onInactivate(receta._id)} 
          className="inactivate-btn"
          title={receta.estado === 'Activa' ? 'Inactivar receta' : 'Activar receta'}
        >
          {receta.estado === 'Activa' ? 'Inactivar' : 'Activar'}
        </button>
        <button 
          onClick={() => onDelete(receta._id)} 
          className="delete-btn"
          title="Eliminar receta"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

RecetaCard.propTypes = {
  receta: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    nombre: PropTypes.string.isRequired,
    ingredientes: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired
  }).isRequired,
  onEdit: PropTypes.func.isRequired,
  onInactivate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default RecetaCard;
