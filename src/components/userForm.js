import React, { useState } from 'react';
import { Button } from '@mui/material';


function UserForm({ onReserve, fetchAirports, fetchFlights }) {
  const [departureCity, setDepartureCity] = useState('');
  const [arrivalCity, setArrivalCity] = useState('');
  const [departureTime, setDepartureTime] = useState('');
  const [departureCityFetch, setDepartureCityFetch] = useState('');
  const [arrivalCityFetch, setArrivalCityFetch] = useState('');
  const [departureTimeFetch, setDepartureTimeFetch] = useState('');
  const [arrivalDate, setArrivalDate] = useState('');
  const [cityCode, setCityCode] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessageAirport, setErrorMessageAirport] = useState('');
  const [errorMessageFlight, setErrorMessageFlight] = useState('');

  const handleSubmitAirports = async (event) => {
    event.preventDefault();
    const peticion = await fetchAirports(cityCode);
    if(peticion.status !== 200){
      setErrorMessageAirport(peticion.message);
      setTimeout(() => {
        setErrorMessageAirport('');
      }, 3000);
    }
    
  };
  
  const handleSubmitFlights = async (event) => {
    event.preventDefault();
    const peticion = await fetchFlights(departureCityFetch, arrivalCityFetch, departureTimeFetch);
    if(peticion.status !== 200){
      setErrorMessageFlight(peticion.message);
      setTimeout(() => {
        setErrorMessageFlight('');
      }, 3000);
    }
    
  };

  const reserveFlight = async (event) => {
    event.preventDefault();
    const userData = {
      departureCity,
      arrivalCity,
      departureTime,
      itineraries: [
        {
          origin: departureCity,
          destination: arrivalCity,
          departureDate: departureTime,
          arrivalDate: arrivalDate,
        },
      ],
    };
    onReserve(userData);
  
    if(userData){
      try {
        const response = await fetch(process.env.REACT_APP_API_URL+'/api/reserve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        }
  
        const result = await response.json();
        console.log('Respuesta de la API:', result);
        setSuccessMessage(result.message);
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    }
  };

  return (
    <div className="UserForm">
      <h2>Registro de Reserva de Vuelos</h2>
      <form onSubmit={reserveFlight}>
        <div>
          <label>Ciudad de Salida:</label>
          <input
            type="text"
            value={departureCity}
            onChange={(e) => setDepartureCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ciudad de Llegada:</label>
          <input
            type="text"
            value={arrivalCity}
            onChange={(e) => setArrivalCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Hora de Salida:</label>
          <input
            type="datetime-local"
            value={departureTime}
            onChange={(e) => setDepartureTime(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha de Llegada:</label>
          <input
            type="datetime-local"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            required
          />
        </div>
        <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
          Registrar reserva
        </Button>
      </form>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <hr></hr>
      <h2>Buscar Aeropuertos</h2>
      <form onSubmit={handleSubmitAirports}>
        <div>
          <label>Código de la Ciudad:</label>
          <input
            type="text"
            value={cityCode}
            onChange={(e) => setCityCode(e.target.value)}
            required
          />
        </div>
        <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
          Buscar
        </Button>
        
        <div>
        <br></br>
          {errorMessageAirport && <div className="error-message">{errorMessageAirport}</div>}
        </div>
        

      </form>
      <hr></hr>
      <h2>Buscar Vuelos</h2>
      <form onSubmit={handleSubmitFlights}>
        <div>
          <label>Ciudad de origen:</label>
          <input
            type="text"
            value={departureCityFetch}
            onChange={(e) => setDepartureCityFetch(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Ciudad de destino:</label>
          <input
            type="text"
            value={arrivalCityFetch}
            onChange={(e) => setArrivalCityFetch(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Fecha:</label>
          <input
            type="datetime-local"
            value={departureTimeFetch }
            onChange={(e) => setDepartureTimeFetch(e.target.value)}
            required
          />
        </div>
        <Button type="submit" variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
          Buscar
        </Button>
        <div>
        <br></br>
          {errorMessageFlight && <div className="error-message">{errorMessageFlight}</div>}
        </div>
      </form>
    </div>
  );
}

export default UserForm;