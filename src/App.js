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

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setBusqueda(value);
  };

  const verDetalleProducto = (id) => {
    setItem(id);
  };

  useEffect(() => {
    fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${busqueda}`)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.results);
      });
  }, [busqueda]);

  useEffect(() => {
    fetch(`https://api.mercadolibre.com/items/${item}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      });
  }, [item]);

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
                placeholder="Buscá lo que querés, encontrá más"
                onChange={handleChange}
                value={value}
              ></input>
              <input
                className="submit"
                type="submit"
                onClick={handleClick}
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
              <p>FILTROS</p>
              <p>Envío Gratis</p>
              <p>Ordenar por mayor valor</p>
              <p>Ordenar por menor valor</p>
              <p>Por Localidad</p>
              <p>Tiendas Oficiales</p>
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
                ver={verDetalleProducto}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
