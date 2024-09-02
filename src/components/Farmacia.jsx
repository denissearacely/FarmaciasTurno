import { useEffect, useState } from 'react';

function Pharmacies() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);

    fetch(`https://api.boostr.cl/pharmacies/24h.json`)
      .then((response) => response.json())
      .then((data) => setData(data.data))
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Ha ocurrido un error: {error.message}</p>;
  }

  return (
    <>
      {data.length > 0 ? (
        <div>
          {data.map((pharmacy, index) => (
            <div key={index}>
              <p>Farmacia: {pharmacy.name}</p>
              <p>Teléfono: {pharmacy.phone}</p>
              <p>Dirección: {pharmacy.street}</p>
              <p>Ciudad: {pharmacy.city}</p>
              <p>------------------------</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No se encontraron farmacias abiertas.</p>
      )}
    </>
  );
}


export default Pharmacies;