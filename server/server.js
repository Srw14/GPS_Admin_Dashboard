import express, { response } from 'express';
import cors from 'cors';
import mysql from 'mysql';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';

const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5174"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dashbord"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL server.');
});

//employee

app.post('/addemployee', (req, res) => {
    const { user_first, user_last, user_position, user_phone, user_pass, user_email, user_address } = req.body;

    if (!user_pass) {
        return res.status(400).json({ Error: "Password is required" });
    }

    const sql = "INSERT INTO users (user_first, user_last, user_position, user_phone, user_pass, user_email, user_address) VALUES (?)";
    bcrypt.hash(user_pass.toString(), saltRounds, (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" });
        const values = [
            user_first,
            user_last,
            user_position,
            user_phone,
            hash,
            user_email,
            user_address
        ];
        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Insert error" });
            return res.json({ Status: "Success" });
        });
    });
});

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM users WHERE user_email = ?';
    db.query(sql, [req.body.user_email], (err, data) => {
        if (err) return res.json({ Error: "Error login" });
        if (data.length > 0) {
            bcrypt.compare(req.body.user_pass.toString(), data[0].user_pass, (err, response) => {
                if (err) return res.json({ Error: "Password error" });
                if (response) {
                    const user_email = data[0].user_email;
                    const user_first = data[0].user_first;
                    const token = jwt.sign({ user_email }, "jwt-secret-key", { expiresIn: '1d' });
                    res.cookie('token', token, { httpOnly: true });
                    return res.json({ Status: "Success", user_first });
                } else {
                    return res.json({ Error: "Password not matched" });
                }
            });
        } else {
            return res.json({ Error: "No email existed" });
        }
    });
});


app.put('/updateemployee/:id', (req, res) => {
    const { id } = req.params;
    const { user_first, user_last, user_position, user_phone, user_email, user_address } = req.body;

    const sql = "UPDATE users SET user_first = ?, user_last = ?, user_position = ?, user_phone = ?, user_email = ?, user_address = ? WHERE user_id = ?";
    const values = [user_first, user_last, user_position, user_phone, user_email, user_address, id];

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Update error" });
        return res.json({ Status: "Success" });
    });
});


app.get('/getemployee', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
});

app.get('/getemployee/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM users WHERE user_id = ?';
    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        if (data.length > 0) {
            return res.json(data[0]);
        } else {
            return res.status(404).json({ Error: "Employee not found" });
        }
    });
});

app.delete('/deleteemployee/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE user_id = ?';
    db.query(sql, [id], (err, result) => {
      if (err) {
        console.error("Error deleting employee:", err);
        return res.status(500).json({ Error: "Delete error" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ Error: "Employee not found" });
      }
      console.log("Employee deleted successfully");
      return res.json({ Status: "Success" });
    });
  });
  
//customer
app.post('/register', (req, res) => {
    const { customers_email,customers_username,customers_pass,customers_first,customers_last } = req.body;

    if (!customers_pass) {
        return res.status(400).json({ Error: "Password is required" });
    }

    const sql = "INSERT INTO customers (customers_email,customers_username,customers_pass,customers_first,customers_last) VALUES (?)";
    bcrypt.hash(customers_pass.toString(), saltRounds, (err, hash) => {
        if (err) return res.json({ Error: "Error hashing password" });
        const values = [
            customers_email,
            customers_username,
            hash,
            customers_first,
            customers_last
        ];
        db.query(sql, [values], (err, result) => {
            if (err) return res.json({ Error: "Insert error" });
            return res.json({ Status: "Success" });
        });
    });
});

app.get('/getcustomer', (req, res) => {
    const sql = 'SELECT * FROM customers';
    db.query(sql, (err, data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
});

app.get('/getcustomer/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'SELECT * FROM customers WHERE customers_id = ?';
    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        if (data.length > 0) {
            return res.json(data[0]);
        } else {
            return res.status(404).json({ Error: "Employee not found" });
        }
    });
});

app.put('/updatecustomer/:id', (req, res) => {
    const { id } = req.params;
    const { customers_email, customers_username, customers_first,customers_last} = req.body;

    const sql = "UPDATE customers SET customers_email = ?, customers_username = ?, customers_first = ?, customers_last = ? WHERE customers_id = ?";
    const values = [customers_email, customers_username, customers_first,customers_last, id];

    db.query(sql, values, (err, result) => {
        if (err) return res.json({ Error: "Update error" });
        return res.json({ Status: "Success" });
    });
});

app.delete('/deletecustomer/:id', (req, res) => {
    const customerId = req.params.id;
    const sql = 'DELETE FROM customers WHERE customers_id = ?';
    db.query(sql, [customerId], (err, result) => {
        if(err) return res.json("Error");
        return res.json("Customer deleted successfully");
    });
});


app.listen(8081, () => {
    console.log("Running on port 8081");
});
