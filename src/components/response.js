
import React, { useState } from 'react';
import UserForm from './userForm';

function Response() {
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);
  const [reservations, setReservations] = useState([]);


  const fetchAirports = async (code) => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/api/airports", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });
      if (!response.ok) {
        setAirports([]);
        const errorData = await response.json();
        return { status: response.status, message: errorData.message || 'Error fetching airports' };
      }
      const data = await response.json();
      setAirports(data);
      return { status: response.status };
    } catch (error) {
      console.error('Error fetching airports:', error);
    }
  };

  const fetchFlights = async (departureCity, arrivalCity, hour) => {
    const requestBody = {
      searchs: 250,
      qtyPassengers: 1,
      adult: 1,
      itinerary: [
        {
          departureCity,
          arrivalCity,
          hour,
        },
      ],
    };

    try {
      const response = await fetch(process.env.REACT_APP_API_URL + "/api/flights", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        setFlights([]);
        const errorData = await response.json();
        return { status: response.status, message: errorData.message || 'Error fetching flights' };
        
      }
      const data = await response.json();
      setFlights(data);
      return { status: response.status };
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
    
  };

  const handleReserve = (userData) => {
    setReservations([...reservations, userData]);
  };

  return (
    <div className="Response">
      <UserForm airports={airports} flights={flights}  onReserve={handleReserve} fetchAirports={fetchAirports} fetchFlights={fetchFlights} />
      
      {airports.length > 0 && (
        <>
        <h2>Aeropuertos</h2>
        <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ciudad</th>
            <th>Nombre</th>
            <th>País</th>
            <th>IATA</th>
            <th>Creado en</th>
            <th>Actualizado en</th>
          </tr>
        </thead>
        <tbody>
          {airports.map((airport, index) => (
            <tr key={index}>
              <td>{airport.id}</td>
              <td>{airport.city}</td>
              <td>{airport.name}</td>
              <td>{airport.country}</td>
              <td>{airport.iata}</td>
              <td>{airport.created_at}</td>
              <td>{airport.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
      )}
      {flights.length > 0 && (
        <>
        <h2>Vuelos</h2>
        <table>
          <thead>
            <tr>
              <th>Date of Departure</th>
              <th>Time of Departure</th>
              <th>Date of Arrival</th>
              <th>Time of Arrival</th>
              <th>Marketing Carrier</th>
              <th>Flight/Train Number</th>
              <th>Departure City</th>
              <th>Arrival City</th>
            </tr>
          </thead>
          <tbody>
            {flights.map((flight, index) => (
              <tr key={index}>
                <td>{flight.dateOfDeparture}</td>
                <td>{flight.timeOfDeparture}</td>
                <td>{flight.dateOfArrival}</td>
                <td>{flight.timeOfArrival}</td>
                <td>{flight.marketingCarrier}</td>
                <td>{flight.flightOrtrainNumber}</td>
                <td>{flight.locationId.departureCity}</td>
                <td>{flight.locationId.arrivalCity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </>
      )}
    </div>
  );
}

export default Response;