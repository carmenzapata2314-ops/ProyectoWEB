import { useState, useEffect } from "react";

export const DashboardCliente = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProductos(data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Catálogo</h1>

      {productos.length === 0 ? (
        <p>Cargando...</p>
      ) : (
        productos.map((p) => (
          <div key={p.id}>
            <img src={p.image} alt={p.title} width="100" />
            <p>{p.title}</p>
            <p>${p.price}</p>
          </div>
        ))
      )}
    </div>
  );
};
