const mysql = require('mysql2');

// Tạo kết nối đến MySQL server
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345'
});

// Kết nối đến MySQL server
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');

    // Tạo cơ sở dữ liệu
    db.query('CREATE DATABASE IF NOT EXISTS product_management', (err, result) => {
        if (err) throw err;
        console.log('Database created');

        // Sử dụng cơ sở dữ liệu vừa tạo
        db.query('USE product_management', (err, result) => {
            if (err) throw err;

            // Tạo bảng sản phẩm
            const createProductsTable = `
                CREATE TABLE IF NOT EXISTS products (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    product_code VARCHAR(255) NOT NULL,
                    product_name VARCHAR(255) NOT NULL,
                    product_date DATE NOT NULL,
                    price DECIMAL(10, 2) NOT NULL,
                    quantity INT NOT NULL,
                    origin VARCHAR(255) NOT NULL
                )
            `;
            db.query(createProductsTable, (err, result) => {
                if (err) throw err;
                console.log('Products table created');
                db.end();
            });
        });
    });
});
