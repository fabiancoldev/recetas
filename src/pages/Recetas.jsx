import { useState, useEffect } from 'react';
import { getRecetas, deleteReceta, inactivateReceta, searchRecetasByNombre } from '../services/RecetaServices';
import Registrar from './Registrar';
import './Recetas.css';

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
      <h2 className="titulo">Lista de Recetas</h2>
      <div className="barra-busqueda">
        <label htmlFor="search">Buscar por nombre:</label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-busqueda"
        />
        <button onClick={handleSearch} className="boton-buscar">Buscar</button>
      </div>

      <ul className="lista-recetas">
        {filteredRecetas.map((receta) => (
          <li key={receta._id} className="receta-card">
            <div className="receta-content">
              <h3>{receta.nombre}</h3>
              <p>Categoria: {receta.categoria}</p>
              <p>Estado: {receta.estado}</p>
              <div className="receta-actions">
                <button onClick={() => handleEdit(receta._id)} className="boton-editar">Editar</button>
                <button onClick={() => handleInactivate(receta._id)} className="boton-inactivar">Inactivar</button>
                <button onClick={() => handleDelete(receta._id)} className="boton-eliminar">Eliminar</button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {editingId && <Registrar recetaId={editingId} onRecetaRegistrada={loadRecetas} />}
    </div>
  );
};

export default Recetas;
