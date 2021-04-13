import "./app.scss";

const Tarjeta = ({ precio, titulo, foto }) => {
  return (
    <>
      <div className="contenedor-tarjeta">
        <div className="imagen-producto">
        <img src={foto}></img>
        </div>
      
        <div className="precio-producto">
        <p>$ {precio}</p>
        </div>
        <div className="descripcion-producto">
          <p>{titulo}</p>
        </div>
        <div className="ver-detalle-producto">
          <button>
            <p>VER MAS</p>
          </button>
        </div>
      </div>
    </>
  );
};

export default Tarjeta;
