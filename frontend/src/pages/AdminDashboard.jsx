import React, { useState, useEffect } from "react";
import axios from "axios";

function AdminDashboard() {
  const [trains, setTrains] = useState([]);
  const [trainData, setTrainData] = useState({
    train_id: "",
    train_name: "",
    total_seats: "",
    available_seats: "",
    source: "",
    destination: "",
    departure_time: "",
    arrival_time: "",
  });

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await axios.get("/api/trains");
      setTrains(response.data);
    } catch (error) {
      console.error("Error fetching trains:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrainData({ ...trainData, [name]: value });
  };

  const handleAddOrUpdateTrain = async (e) => {
    e.preventDefault();
    try {
      if (trainData.train_id) {
        await axios.put(
          `http://localhost:8081/admindashboard/${trainData.train_id}`,
          trainData
        );
      } else {
        await axios.post("http://localhost:8081/admindashboard", trainData);
        
        setTrains([...trains, trainData]);
      }
      setTrainData({
        train_id: "",
        train_name: "",
        total_seats: "",
        available_seats: "",
        source: "",
        destination: "",
        departure_time: "",
        arrival_time: "",
      });
      fetchTrains();
    } catch (error) {
      console.error("Error adding/updating train:", error);
    }
  };

  const handleEditTrain = (train) => {
    setTrainData(train);
  };

  return (
    <div>
      <h1 className="admin-hesing">Admin Dashboard</h1>
      <form onSubmit={handleAddOrUpdateTrain} className="admin-form">
        <input type="hidden" name="train_id" value={trainData.train_id} />
        <div className="admin-input-form">
          <div className="form-group">
            <label htmlFor="">Train Name / Number</label> <br />
            <input
              type="text"
              name="train_name"
              value={trainData.train_name}
              onChange={handleChange}
              placeholder="Train Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Total Seats</label> <br />
            <input
              type="number"
              name="total_seats"
              value={trainData.total_seats}
              onChange={handleChange}
              placeholder="Total Seats"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Avail Seats</label> <br />
            <input
              type="number"
              name="available_seats"
              value={trainData.available_seats}
              onChange={handleChange}
              placeholder="Available Seats"
              required
            />
          </div>
        </div>
        <div className="admin-input-form">
          <div className="form-group">
            <label htmlFor="">From :</label> <br />
            <input
              type="text"
              name="source"
              value={trainData.source}
              onChange={handleChange}
              placeholder="Source"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="">To :</label> <br />
            <input
              type="text"
              name="destination"
              value={trainData.destination}
              onChange={handleChange}
              placeholder="Destination"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="">Departure Time</label> <br />
            <input
              type="datetime-local"
              name="departure_time"
              value={trainData.departure_time}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      
       <div className="form-group">
          <label htmlFor="">Arrival Time</label> <br />
          <input
            type="datetime-local"
            name="arrival_time"
            value={trainData.arrival_time}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="admin-btn">
          {trainData.train_id ? "Update Train" : "Add Train"}
        </button>
       
      </form>
      <h2 className="admin-hesing">Existing Trains</h2>
      <ul className="admin-seats">
        {trains.map((train) => (
          <li key={train.train_id} >
            {train.train_name} - Available Seats: {train.available_seats}
            <button onClick={() => handleEditTrain(train)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
