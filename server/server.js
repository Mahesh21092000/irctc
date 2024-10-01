import express from 'express';
import mysql from 'mysql2';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();  
app.use(express.json());
app.use(cors());

const saltRounds = 10; 
const jwtSecret = 'E0vP7mqL8yR2k5XJpV9qkO0hP6TzX';


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mahesh@123", 
    database: "mahesh", 
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// SIGNUP Route
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return res.status(500).json({ error: "Error hashing password" });

        const sql = "INSERT INTO signupuser (user_name, user_mail, user_password) VALUES (?, ?, ?)";
        db.query(sql, [name, email, hash], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ error: "Error inserting user" });
            }
            return res.status(200).json({ message: "User registered successfully" });
        });
    });
});

// LOGIN Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if email exists
    const sql = "SELECT * FROM signupuser WHERE user_mail = ?";
    db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (result.length === 0) return res.status(401).json({ error: "User not found" });

        const user = result[0];

        // Compare password
        bcrypt.compare(password, user.user_password, (err, isMatch) => {
            if (err) return res.status(500).json({ error: "Password comparison error" });
            if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

            // Generate JWT token if password matches
            const token = jwt.sign({ id: user.user_id }, jwtSecret, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login successful", token });
        });
    });
});

/// ADMIN SIGNUP Route
app.post('/adminsignup', (req, res) => {
    const { name, email, password } = req.body;

    
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) return res.status(500).json({ error: "Error hashing password" });

        const sql = "INSERT INTO adminsignup (admin_name, admin_mail, admin_password) VALUES (?, ?, ?)";
        db.query(sql, [name, email, hash], (err, result) => {
            if (err) {
                console.error('Error inserting user:', err);
                return res.status(500).json({ error: "Error inserting user" });
            }
            return res.status(200).json({ message: "Admin registered successfully" });
        });
    });
});

// ADMIN LOGIN Route
app.post('/adminlogin', (req, res) => {
    const { email, password } = req.body;

    // Check if email exists in the adminsignup table
    const sql = "SELECT * FROM adminsignup WHERE admin_mail = ?"; // Changed to 'user_mail'
    db.query(sql, [email], (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (result.length === 0) return res.status(401).json({ error: "Admin not found" });

        const admin = result[0];

        // Compare password
        bcrypt.compare(password, admin.admin_password, (err, isMatch) => { // Changed to 'user_password'
            if (err) return res.status(500).json({ error: "Password comparison error" });
            if (!isMatch) return res.status(401).json({ error: "Incorrect password" });

            // Generate JWT token if password matches
            const token = jwt.sign({ id: admin.admin_id }, jwtSecret, { expiresIn: '1h' });
            return res.status(200).json({ message: "Login successful", token });
        });
    });
});

// Add Train Route
app.post('/admindashboard', (req, res) => {
    const { train_name, total_seats, available_seats, source, destination, departure_time, arrival_time } = req.body;

    console.log('Train data to be inserted:', { train_name, total_seats, available_seats, source, destination, departure_time, arrival_time }); // Debugging line

    const sql = "INSERT INTO trains (train_name, total_seats, available_seats, source, destination, departure_time, arrival_time) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [train_name, total_seats, available_seats, source, destination, departure_time, arrival_time], (err, result) => {  
        if (err) {
            console.error('Error inserting train:', err); // Log the error
            return res.status(500).json({ error: "Error inserting train" });
        }
        return res.status(200).json({ message: "Train added successfully" });
    });
});

// Fetch trains
app.get('/trains', (req, res) => {
    const sql = 'SELECT * FROM trains'; // Adjust table name if necessary
    db.query(sql, (err, results) => {
        if (err) throw err; 
        res.json(results);
    });
});

// Start the server
app.listen(8081, () => {
    console.log('Server running on port 8081');
});
