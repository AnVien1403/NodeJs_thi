const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const connection = require("./database/create_database")

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'product_management'
});
//thêm 
app.post('/api/products', (req, res) => {
    const { product_code, product_name, product_date, price, quantity, origin } = req.body;
    const query = 'INSERT INTO products (product_code, product_name, product_date, price, quantity, origin) VALUES (?, ?, ?, ?, ?, ?)';
    db.execute(query, [product_code, product_name, product_date, price, quantity, origin], (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

//xoá
app.post('/api/products/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    db.execute(query, [id], (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});
;
//hiển thị
app.get('/', (req, res) => {
    const query = 'SELECT * FROM products ORDER BY product_code DESC';
    db.execute(query, (err, results) => {
        if (err) throw err;
        res.render('index', { products: results });
    });
});


db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
