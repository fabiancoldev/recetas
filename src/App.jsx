
import Cabecera from "./componentes/Cabecera";
import Footer from "./componentes/Footer";
import "./App.css";
import { Outlet } from "react-router";


function App() {
  return (
    <>
      <Cabecera />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
