import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css'

function Welcome() {
  return (
    <div>
      <div className="welcome">
      <h1>Welcome to Train Booking Webpage 🚉</h1>
      <p className='welcome-pare'>
        Login for an admin..?{' '}
      </p>  <Link to="/adminsignup" className='welcome-link'>Signup</Link>
      <p className='welcome-pare'>
        Login for a user..?{' '}
      </p>
      <Link to="/signup" className='welcome-link'>Signup</Link>

      </div>
    </div>
  );
}

export default Welcome;
