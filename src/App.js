import "./index.css";
import "./app.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import logo from "./components/binoculars.png";
import React, { useState, useEffect } from "react";
import Tarjeta from "tarjeta.js";
import TarjetaUnica from "tarjetaunica.js";

const App = () => {
  const [productos, setProductos] = useState([]);
  const [value, setValue] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [item, setItem] = useState("");
  const [rutaInicial, setRuta] = useState("sites/MLA/search?q=");
  const [detalle, setDetalle] = useState(false);
  const [verEnvio, setVerEnvio] = useState(false);
  // const [verTiendas, setVerTiendas] = useState(false);
  // const [producto, setProducto] = useState({})
   const [valueCheck, setValueCheck] = useState(false);
   const [checkInbox, setCheckInbox] = useState(false);
  

  
  const handleCheckbox = (e) => { 
    setCheckInbox(e.target.value)
    console.log(checkInbox, valueCheck)
  }

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setBusqueda(value);
    setDetalle(false);
    setRuta("sites/MLA/search?q=");
    setVerEnvio(false);
    setCheckInbox(true)

  };

  const verDetalleProductoApp = (id) => {
    setItem(id);
    setBusqueda(id);
    setRuta("items/");
    setDetalle(true);
    setVerEnvio(false);
    setProductos(productos);
  };

  useEffect(() => {
    fetch(`https://api.mercadolibre.com/${rutaInicial}${busqueda}`)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.results);
        console.log(data.results)
        // setProdUnico(data);
      });
  }, [busqueda, item]);

  // const copiaProductos = [...productos]

  const verEnvioGratis = () => {
    setVerEnvio(true);
    setProductos([
      ...productos.filter(
        (producto) => producto.shipping.free_shipping === true
      ),
    ]);
  };

  // const verTiendasOficiales = () => {
  //   setVerTiendas(true);
  //   setProductos([
  //     ...productos.filter(
  //       (producto) => producto.official_store_id !== 0
  //     )
  //   ]);
  // };

  // let valor = (false)



  return (
    <div>
      <div>
        <div className="barra-busqueda">
          <div className="logo">
            {/* <img src={logo}></img> */}
            <p className="explora">Explora</p>
            <p className="meli">MELI</p>
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
            <FontAwesomeIcon className="help" icon={faQuestionCircle} />
          </div>
        </div>

        <div className="main">
          {/* <h3>Resultados</h3> */}
          {!detalle && (
            <div className="contenedor-filtros">
              <div className="filtros">
                <h3>FILTROS</h3>
                <h5>Envío Gratis</h5>
                <input
                  type="checkbox"
                  onClick={verEnvioGratis}
                  onChange={handleCheckbox}
                  className="check-envio"
                  value={valueCheck}
                ></input>
                <h5>Ordenar por mayor valor</h5>
                <input type="checkbox"></input>
                <h5>Ordenar por menor valor</h5>
                <input type="checkbox"></input>
                <h5>Por Localidad</h5>
                <select><option>a</option><option>b</option></select>
                <h5>Tiendas Oficiales</h5>
                <input type="checkbox" ></input>
              </div>
            </div>
          )}
          <div className="resultados">

            {productos &&
              productos.map((producto) => (
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


            {detalle && 
              <div className="contenedor-vista-detalle">
                <div className="volver"> <FontAwesomeIcon className="help" icon={faArrowCircleLeft} />
                <button onClick={handleClick}>VOLVER</button> </div>
                <div className="tarjeta-detalle">DETALLE DE LA TARJETA</div>
                
              </div>
          }

            {verEnvio &&
              productos.map((producto) => (
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

                   {/* {verTiendas &&
              productos.map((producto) => (
                <Tarjeta
                  key={producto.id}
                  id={producto.id}
                  precio={producto.price}
                  titulo={producto.title}
                  foto={producto.thumbnail}
                  envio={producto.shipping}
                  ver={verDetalleProductoApp}
                />
              ))} */}


          </div>
        </div>

        <div className="footer">
          <p>Hecho con REACT por Flor en ADA Itw</p>
        </div>
      </div>
    </div>
  );
};

export default App;
