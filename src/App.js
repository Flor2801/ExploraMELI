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
  const [producto, setProducto] = useState({});
  const [description, setDescription] = useState("");

  const [valorEnvio, setValorEnvio] = useState(false);

  const handleCheckbox = (e) => {
    setValorEnvio(e.target.checked);
    valorEnvio ? setVerEnvio(false) : setVerEnvio(true);
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setBusqueda(value);
    setDetalle(false);
    setRuta("sites/MLA/search?q=");
  };

  const verDetalleProductoApp = (id) => {
    setItem(id);
    setBusqueda(id);
    setRuta("items/");
    setDetalle(true);
    setVerEnvio(false);
    // setProductos(productos);
  };

  useEffect(() => {
    fetch(`https://api.mercadolibre.com/${rutaInicial}${busqueda}`)
      .then((res) => res.json())
      .then((data) => {
        verEnvio
          ? setProductos([
              ...productos.filter(
                (producto) => producto.shipping.free_shipping === true
              ),
            ])
          : setProductos(data.results);
        detalle && setProducto(data);
        console.log(producto);
      });
  }, [busqueda, item, valorEnvio]);

  
  useEffect(() => {
    fetch(`https://api.mercadolibre.com/${rutaInicial}${busqueda}/description`)
      .then((res) => res.json())
      .then((data) => {
        setDescription(data.plain_text);
      });
  }, [detalle]);



  //   setProductos([
  //     ...productos.filter(
  //       (producto) => producto.official_store_id !== 0

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

        {detalle && (
              <div className="contenedor-vista-detalle">
                <div className="volver">
                  <FontAwesomeIcon className="help" icon={faArrowCircleLeft} />
                  <button onClick={handleClick}>VOLVER</button>{" "}
                </div>
                <TarjetaUnica
                  titulo={producto.title}
                  precio={producto.price}
                  estado={producto.condition}
                  foto={producto.thumbnail}
                  // vendidos={producto.condition}
                  descripcion={description}
                  key={producto.id}
                  id={producto.id}
               
                />
              </div>
            )}

          {/* <h3>Resultados</h3> */}
          {!detalle && (
            <div className="contenedor-filtros">
              <div className="filtros">
                <h3>FILTROS</h3>
                <h5>Envío Gratis</h5>
                <input
                  type="checkbox"
                  // onClick={verEnvioGratis}
                  checked={valorEnvio}
                  onChange={handleCheckbox}
                  className="check-envio"
                  // value={valueCheck}
                ></input>
                <h5>Ordenar por mayor valor</h5>
                <input type="checkbox"></input>
                <h5>Ordenar por menor valor</h5>
                <input type="checkbox"></input>
                <h5>Por Localidad</h5>
                <select>
                  <option>a</option>
                  <option>b</option>
                </select>
                <h5>Tiendas Oficiales</h5>
                <input type="checkbox"></input>
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
