import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import './assets/css/estilos.css';
import App from './App.jsx';
import Recetas from "./pages/Recetas.jsx";
import Registrar from "./pages/Registrar.jsx";
import Home from "./pages/Home.jsx";
import RecetaDetalle from "./pages/RecetaDetalle.jsx";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}> 
        <Route index element={<Home />} />  {/* Ruta predeterminada */}
        <Route path="recetas" element={<Recetas />} />  
        <Route path="registrar" element={<Registrar />} />
        <Route path="registrar/:id" element={<Registrar />} />  {/* Ruta para editar */}
        <Route path="receta/:id" element={<RecetaDetalle />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
