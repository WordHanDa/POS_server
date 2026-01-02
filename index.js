const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.dbhost,
    user: process.env.dbuser,
    password: process.env.dbpassword,
    database: process.env.database,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
});
db.getConnection((err, connection) => {
    if (err) {
        console.error('Database Pool connection failed:', err);
    } else {
        console.log('Connected to MySQL pool successfully');
        connection.release(); // 務必釋放連線
    }
});
app.get('/ITEM', (req, res) => {
    db.query("SELECT * FROM `ITEM`", (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(results);
        }
    });
});

// Get a specific item by ID
app.get('/ITEM/:id', (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM `ITEM` WHERE item_id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Item not found' });
        } else {
            res.json(results[0]);
        }
    });
});

// Create a new item
app.post('/ITEM', (req, res) => {
    const { name, price, description } = req.body; // Adjust fields as per your table schema
    db.query("INSERT INTO `ITEM` (name, price, description) VALUES (?, ?, ?)", [name, price, description], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(201).json({ message: 'Item created', item_id: results.insertId });
        }
    });
});

// Update an item by ID
app.put('/ITEM/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body; // Adjust fields as per your table schema
    db.query("UPDATE `ITEM` SET name = ?, price = ?, description = ? WHERE item_id = ?", [name, price, description, id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Item not found' });
        } else {
            res.json({ message: 'Item updated' });
        }
    });
});

// Delete an item by ID
app.delete('/ITEM/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM `ITEM` WHERE item_id = ?", [id], (err, results) => {
        if (err) {
            res.status(500).json({ error: err });
        } else if (results.affectedRows === 0) {
            res.status(404).json({ message: 'Item not found' });
        } else {
            res.json({ message: 'Item deleted' });
        }
    });
});

app.listen(3002, () => {
    console.log('OK, server is running on port 3002');
});
