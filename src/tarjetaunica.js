import "./app.scss";

const TarjetaUnica = ({ titulo, precio, estado, foto, descripcion, id }) => {
  const nuevo = estado;
  const foto2 = foto[0].secure_url;


  return (
    <div>
      <div className="contenedor-detalle">
        <div className="detalle-foto">
          <img className="foto" src={foto2}></img>
        </div>
        <div className="detalle-texto">
          <p>{titulo}</p>
          <p>{precio}</p>
          {nuevo === "new" ? <p>Nuevo</p> : <p>Usado </p>}
          <p>{descripcion}</p>
          {/* <link href={`https://api.mercadolibre.com/${titulo}/p${id}`} >Comprar</link> */}
        </div>
      </div>
    </div>
  );
};

export default TarjetaUnica;


