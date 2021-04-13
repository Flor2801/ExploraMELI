import "./app.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTruck } from '@fortawesome/free-solid-svg-icons'

const Tarjeta = ({ id, precio, titulo, foto, envio, verDetalleProducto}) => {

const envioGratis = envio.free_shipping

const ver = () => {
  verDetalleProducto(id)
}



  return (
    <>
      <div className="contenedor-tarjeta">
        <div className="imagen-producto">
        <img src={foto}></img>
        </div>
        <div className="envio-producto">
        {envioGratis && <FontAwesomeIcon className="camioncito" icon={faTruck}/>}
        </div>
        <div className="precio-producto">
        <p>$ {precio}</p>
        </div>
        <div className="descripcion-producto">
          <p>{titulo}</p>
        </div>
        <div className="ver-detalle-producto">
          <button onClick={ver}>
            <p>VER MAS</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Tarjeta;
