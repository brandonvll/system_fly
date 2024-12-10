import React, { useState } from 'react';

function UserForm( airports, flights, onReserve ) {
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [equipaje, setEquipaje] = useState('');
  const [edad, setEdad] = useState('');
  const [selectedAirport, setSelectedAirport] = useState('');
  const [selectedFlight, setSelectedFlight] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      cedula,
      nombre,
      equipaje,
      edad,
      selectedAirport,
      selectedFlight,
    };
    onReserve(userData);
    // Aquí puedes agregar la lógica para guardar los datos del usuario
  };

  return (
    <div className="UserForm">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Cédula:</label>
          <input
            type="text"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Tipo de Equipaje:</label>
          <select
            value={equipaje}
            onChange={(e) => setEquipaje(e.target.value)}
            required
          >
            <option value="">Seleccione</option>
            <option value="Equipaje Mano">Equipaje Mano</option>
            <option value="Bolso">Bolso</option>
          </select>
        </div>
        <div>
          <label>Edad:</label>
          <input
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Aeropuerto:</label>
          <select
            value={selectedAirport}
            onChange={(e) => setSelectedAirport(e.target.value)}
            required
          >
            <option value="">Seleccione</option>
            {airports.map((airport) => (
              <option key={airport.id} value={airport.id}>
                {airport.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Vuelo:</label>
          <select
            value={selectedFlight}
            onChange={(e) => setSelectedFlight(e.target.value)}
            required
          >
            <option value="">Seleccione</option>
            {flights.map((flight, index) => (
              <option key={index} value={flight.flightOrtrainNumber}>
                {flight.flightOrtrainNumber} - {flight.locationId.departureCity} to {flight.locationId.arrivalCity}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Reservar</button>
      </form>
    </div>
  );
}

export default UserForm;