// FILE: src/Home.js
import React, { useState } from 'react';
import UserForm from './userForm';

function Response() {
  const [airports, setAirports] = useState([]);
  const [flights, setFlights] = useState([]);
  const [reservations, setReservations] = useState([]);

  const fetchAirports = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_URL);
      const data = await response.json();
      setAirports(data);
    } catch (error) {
      console.error('Error fetching airports:', error);
    }
  };

  const fetchFlights = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_FLIGHTS_API_URL);
      const data = await response.json();
      setFlights(data);
    } catch (error) {
      console.error('Error fetching flights:', error);
    }
  };

    const handleReserve = (userData) => {
    setReservations([...reservations, userData]);
  };

  return (
    <div className="Response">
      <UserForm airports={airports} flights={flights} onReserve={handleReserve} />
      <h2>Aeropuertos</h2>
      <button onClick={fetchAirports}>Consultar Aeropuertos</button>
      {airports.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>City</th>
              <th>Name</th>
              <th>Country</th>
              <th>IATA</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
       <h2>Vuelos</h2>
      <button onClick={fetchFlights}>Consultar Vuelos</button>
      {flights.length > 0 && (
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
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Type Equipment</th>
              <th>Age</th>
              <th>Airport</th>
              <th>Fly</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation, index) => (
              <tr key={index}>
                <td>{reservation.id}</td>
                <td>{reservation.name}</td>
                <td>{reservation.equipment}</td>
                <td>{reservation.age}</td>
                <td>{reservation.selectedAirport}</td>
                <td>{reservation.selectedFlight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Response;