# Train Ticket Booking System

A comprehensive application for booking train tickets, featuring separate dashboards for users and administrators.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This project allows users to book train tickets and provides administrators the ability to manage train schedules. It consists of a welcome page with options for user signup and admin signup. Upon successful login, users are directed to their respective dashboards:

- **Admin Dashboard**: Admins can update train schedules, and the changes will be reflected in real-time for users.
- **User Dashboard**: Users can view available trains and book tickets using a unique ticket number.

## Features

- User and Admin sign-up with details stored in a MySQL database.
- Separate dashboards for users and administrators.
- Real-time updates to train schedules by admins.
- Ticket booking functionality for users.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Mahesh21092000/irctc.git

2.Navigate to the project directory: cd irctc
3.Install dependencies for both backend and frontend:npm install    # For backend and frontend

## Usage
1.Start the backend server: Navigate to the backend directory and run:nodemon server.js
2.Start the frontend application: Navigate to the frontend directory and run: npm start
Access the application: Open your browser and go to http://localhost:3000 (or the port specified in your frontend setup).

##  API Endpoints
Admin Signup
Endpoint: /adminsignup
Method: POST
Description: Create a new admin account.

User Signup
Endpoint: /usersignup
Method: POST
Description: Create a new user account.

Admin Login
Endpoint: /adminlogin
Method: POST
Description: Authenticate an admin and redirect to the admin dashboard.

User Login
Endpoint: /userlogin
Method: POST
Description: Authenticate a user and redirect to the user dashboard.


