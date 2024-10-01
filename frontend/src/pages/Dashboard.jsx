import React, { useEffect, useState } from "react";

function Dashboard() {
  const [trains, setTrains] = useState([]);
  const [count, setCount] = useState(0);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    trainName: "",
    trainNumber: "",
    date: "",
  });

  useEffect(() => {
    fetch("http://localhost:8081/trains")
      .then((response) => response.json())
      .then((data) => setTrains(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  const RandomNumber = () => {
    return Math.floor(Math.random() * 9000) + 1000; // Generates a random number between 1000 and 9999
  };

  const Increment = () => {
    setCount(count + 1);
  };

  const Decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const randomNum = RandomNumber();

    // Alert with form details and random number
    alert(`Train Booking Details:\n
      From: ${formData.from}\n
      To: ${formData.to}\n
      Train Name: ${formData.trainName}\n
      Train Number: ${formData.trainNumber}\n
      Date: ${formData.date}\n
      Seats: ${count}\n
      Booking Reference Number: ${randomNum}
    `);

    // Here, you can store the data to your desired component or API
    // For example, if you have a function to save data:
    // saveBooking({ ...formData, seats: count, referenceNumber: randomNum });

    // Reset form and count after submission
    setFormData({
      from: "",
      to: "",
      trainName: "",
      trainNumber: "",
      date: "",
    });
    setCount(0);
  };

  return (
    <div className="userdashboard">
        <h1 className="user-heading">User DashBoard</h1>
      <div>
      
        <ul>
          {trains.map((train) => (
            <li key={train.id} className="train-details">
              <div className="train-data">
                <p className="train-heading">
                  {" "}
                  Train Name / Number: <br /> <span> {train.train_name}</span>
                </p>
              </div>
              <div className="train-data">
                <p className="train-heading">
                  {" "}
                  Departure: <br /> <span> {train.departure_time}</span>
                </p>
              </div>
              <div className="train-data">
                <p className="train-heading">
                  {" "}
                  Arrival: <br /> <span> {train.arrival_time}</span>
                </p>
              </div>
              <div className="train-data">
                <p className="train-heading">
                  {" "}
                  From: <br /> <span> {train.source}</span>
                </p>
              </div>
              <div className="train-data">
                <p className="train-heading">
                  {" "}
                  To: <br /> <span> {train.destination}</span>
                </p>
              </div>
              <div className="train-data">
                <p className="train-heading">
                  {" "}
                  Availabilable Seats <br />{" "}
                  <span> {train.available_seats}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="booking">
          <form onSubmit={handleSubmit} className="booking-form">
            <h2>Book the Train Ticket</h2>
            <div className="booking-form-data">
              <div className="booking-details">
                <label htmlFor="from">From :</label> <br />
                <input
                  type="text"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  placeholder="Enter Your Source Place"
                  required
                />
              </div>

              <div className="booking-details">
                <label htmlFor="to">To:</label> <br />
                <input
                  type="text"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  placeholder="Enter Your Destination Place"
                  required
                />
              </div>
            </div>
            <div className="booking-form-data">
              <div className="booking-details">
                <label htmlFor="trainName">Train Name</label> <br />
                <input
                  type="text"
                  name="trainName"
                  value={formData.trainName}
                  onChange={handleChange}
                  placeholder="Enter Train Name"
                  required
                />
              </div>

              <div className="booking-details">
                <label htmlFor="trainNumber">Train Number</label> <br />
                <input
                  type="text"
                  name="trainNumber"
                  value={formData.trainNumber}
                  onChange={handleChange}
                  placeholder="Enter Train Number"
                  required
                />
              </div>
            </div>
            <div className="booking-details">
              <div>
                <label htmlFor="date">Date</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="seats-available">
                <label htmlFor="seats">Seats</label>
                <p>
                  <button onClick={Increment}> + </button>
                  {count} <button onClick={Decrement}> - </button>
                </p>
              </div>
            </div>

            <button type="submit"  className="booking-btn">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
