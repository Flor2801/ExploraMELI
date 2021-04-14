import "./index.css";
import "./app.scss";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faSearch } from '@fortawesome/free-solid-svg-icons'
import logo from "./components/binoculars.png";
import React, { useState, useEffect } from "react";
import Tarjeta from "tarjeta.js";

const App = () => {
  const [productos, setProductos] = useState([]);
  const [value, setValue] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [item, setItem] = useState("");
  const [rutaInicial, setRuta] = useState("sites/MLA/search?q=");
  const [detalle, setDetalle] = useState(true)

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setBusqueda(value);
  };

  const verDetalleProductoApp = (id) => {
    setItem(id);
    setBusqueda(id);
    setRuta("items/");
    setDetalle(false)
  };

  useEffect(() => {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${busqueda}`)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.results);
      });
  }, [busqueda, item]);

  return (
    <div>
      <div>
        <div className="barra-busqueda">
          <div className="logo">
            {" "}
            <img src={logo}></img>
            <p>ExploraMELI</p>
          </div>
          <div className="input">
            <form>
              <input
                type="text"
                placeholder="Buscá lo que querés, encontrá más de lo que imaginás"
                onChange={handleChange}
                value={value}
              ></input>
              <input
                className="submit"
                type="submit"
                onClick={handleClick}
                value="Buscar!"
              ></input>
            </form>
          </div>
          <div className="ayuda">
            <p>Ayuda</p>
          </div>
        </div>

        <div className="main">
          <div className="contenedor-filtros">
            <div className="filtros">
              <h3>FILTROS</h3>
              <h5>Envío Gratis</h5> 
              <input type="checkbox"></input>
              <h5>Ordenar por mayor valor</h5>
              <input type="checkbox"></input>
              <h5>Ordenar por menor valor</h5>
              <input type="checkbox"></input>
              <h5>Por Localidad</h5>
              <input type="checkbox"></input>
              <h5>Tiendas Oficiales</h5>
              <input type="checkbox"></input>
            </div>
          </div>
          <div className="resultados">
            
            {productos.map((producto) => (
              <Tarjeta
                key={producto.id}
                id={producto.id}
                precio={producto.price}
                titulo={producto.title}
                foto={producto.thumbnail}
                envio={producto.shipping}
                ver={verDetalleProductoApp}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
