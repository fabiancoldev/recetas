import { useState, useEffect } from 'react';
import { getRecetas } from '../services/RecetaServices';
import RecetaCardSimple from '../components/RecetaCardSimple';
import './Home.css';

const Home = () => {
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarRecetas = async () => {
      try {
        const data = await getRecetas();
        // Filtrar solo las recetas activas
        const recetasActivas = data.filter(receta => receta.estado === 'Activa');
        setRecetas(recetasActivas);
      } catch (err) {
        setError('Error al cargar las recetas');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    cargarRecetas();
  }, []);

  if (loading) {
    return <div className="loading">Cargando recetas...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>Nuestras Recetas</h1>
        <p>Descubre nuestra selección de deliciosas recetas</p>
      </div>

      <div className="categorias-grid">
        {['Entrada', 'Plato Principal', 'Postre', 'Bebida'].map(categoria => {
          const recetasCategoria = recetas.filter(
            receta => receta.categoria === categoria
          );

          return recetasCategoria.length > 0 ? (
            <div key={categoria} className="categoria-section">
              <h2>{categoria}</h2>
              <div className="recetas-grid">
                {recetasCategoria.map(receta => (
                  <RecetaCardSimple key={receta._id} receta={receta} />
                ))}
              </div>
            </div>
          ) : null;
        })}
      </div>
    </div>
  );
};


export default Home;