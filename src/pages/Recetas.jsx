import { useState, useEffect } from 'react';
import { getRecetas, deleteReceta, inactivateReceta, searchRecetasByNombre } from '../services/RecetaServices';
import Registrar from './Registrar';

const Recetas = () => {
  const [recetas, setRecetas] = useState([]);
  const [filteredRecetas, setFilteredRecetas] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    loadRecetas();
  }, []);

  const loadRecetas = async () => {
    const data = await getRecetas();
    setRecetas(data);
    setFilteredRecetas(data);
  };

  const handleSearch = async () => {
    if (searchQuery.trim() === '') {
      setFilteredRecetas(recetas);
      return;
    }
    const data = await searchRecetasByNombre(searchQuery);
    setFilteredRecetas(data);
  };

  const handleEdit = (id) => {
    setEditingId(id); // Activar el modo de edición
  };

  const handleInactivate = async (id) => {
    await inactivateReceta(id);
    loadRecetas();
  };

  const handleDelete = async (id) => {
    await deleteReceta(id);
    loadRecetas();
  };

  return (
    <div className="listar-recetas">
      <h2>Lista de Recetas</h2>
      {/* Barra de búsqueda */}
      <div>
        <label>Buscar por nombre:</label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {/* Tabla de recetas */}
      <ul>
        {filteredRecetas.map((receta) => (
          <li key={receta._id}>
            <strong>{receta.nombre}</strong> - {receta.categoria} - {receta.estado}
            <br />
            <button onClick={() => handleEdit(receta._id)}>Editar</button>
            <button onClick={() => handleInactivate(receta._id)}>Inactivar</button>
            <button onClick={() => handleDelete(receta._id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {/* Componente de registro/edición */}
      {editingId && <Registrar recetaId={editingId} onRecetaRegistrada={loadRecetas} />}
    </div>
  );
};

export default Recetas;
