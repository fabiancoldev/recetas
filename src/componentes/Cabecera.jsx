import { Link } from "react-router";

const Cabecera = () => {
  return (
    <>
      {/* Encabezado */}
      <header>
        <h1>Página de Recetas</h1>
        {/* Icono del menú hamburguesa */}
        <div className="menu-toggle" id="menu-toggle">
          ☰
        </div>
      </header>

      {/* Navegación */}
      <nav id="menu">
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/recetas">Recetas</Link></li>
          <li><Link to="/registrar">Registrar</Link></li>
        </ul>
      </nav>
    </>
  );
}

export default Cabecera;
