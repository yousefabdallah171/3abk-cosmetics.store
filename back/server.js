const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const dbPath = path.resolve(__dirname, 'products.db');
const db = new sqlite3.Database(dbPath);

app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Create tables if they do not exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            price TEXT,
            description TEXT,
            image TEXT,
            rating INTEGER,
            starColor TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating products table:', err);
        } else {
            console.log('Products table created successfully');
        }
    });

    db.run(`
        CREATE TABLE IF NOT EXISTS top_sales (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            price TEXT,
            description TEXT,
            image TEXT,
            rating INTEGER,
            starColor TEXT
        )
    `, (err) => {
        if (err) {
            console.error('Error creating top_sales table:', err);
        } else {
            console.log('Top Sales table created successfully');
        }
    });
});

// API to add a product
app.post('/api/products', (req, res) => {
    const { name, price, description, image, rating, starColor } = req.body;

    if (!name || !price || !description || !image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    db.run('INSERT INTO products (name, price, description, image, rating, starColor) VALUES (?, ?, ?, ?, ?, ?)', [name, price, description, image, rating, starColor], function (err) {
        if (err) {
            console.error('Error inserting product:', err);
            return res.status(500).json({ success: false, message: 'Failed to add product' });
        }
        res.json({ success: true, productId: this.lastID });
    });
});

// API to get all products
app.get('/api/products', (req, res) => {
    db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
            console.error('Error fetching products:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch products' });
        }
        res.json(rows);
    });
});

// API to get a product by ID
app.get('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM products WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Error fetching product:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch product' });
        }
        if (!row) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json(row);
    });
});

// API to update a product
app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description, image, rating, starColor } = req.body;

    if (!name || !price || !description || !image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    db.run('UPDATE products SET name = ?, price = ?, description = ?, image = ?, rating = ?, starColor = ? WHERE id = ?', [name, price, description, image, rating, starColor, id], function (err) {
        if (err) {
            console.error('Error updating product:', err);
            return res.status(500).json({ success: false, message: 'Failed to update product' });
        }
        res.json({ success: true });
    });
});

// API to delete a product
app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM products WHERE id = ?', [id], function (err) {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).json({ success: false, message: 'Failed to delete product' });
        }
        res.json({ success: true, deletedRows: this.changes });
    });
});

// API to add a top sales product
app.post('/api/topsales', (req, res) => {
    const { name, price, description, image, rating, starColor } = req.body;

    if (!name || !price || !description || !image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    db.run('INSERT INTO top_sales (name, price, description, image, rating, starColor) VALUES (?, ?, ?, ?, ?, ?)', [name, price, description, image, rating, starColor], function (err) {
        if (err) {
            console.error('Error inserting top sales product:', err);
            return res.status(500).json({ success: false, message: 'Failed to add top sales product' });
        }
        res.json({ success: true, productId: this.lastID });
    });
});

// API to get all top sales products
app.get('/api/topsales', (req, res) => {
    db.all('SELECT * FROM top_sales', (err, rows) => {
        if (err) {
            console.error('Error fetching top sales products:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch top sales products' });
        }
        res.json(rows);
    });
});

// API to get a top sales product by ID
app.get('/api/topsales/:id', (req, res) => {
    const { id } = req.params;
    db.get('SELECT * FROM top_sales WHERE id = ?', [id], (err, row) => {
        if (err) {
            console.error('Error fetching top sales product:', err);
            return res.status(500).json({ success: false, message: 'Failed to fetch top sales product' });
        }
        if (!row) {
            return res.status(404).json({ success: false, message: 'Top sales product not found' });
        }
        res.json(row);
    });
});

// API to update a top sales product
app.put('/api/topsales/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description, image, rating, starColor } = req.body;

    if (!name || !price || !description || !image) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    db.run('UPDATE top_sales SET name = ?, price = ?, description = ?, image = ?, rating = ?, starColor = ? WHERE id = ?', [name, price, description, image, rating, starColor, id], function (err) {
        if (err) {
            console.error('Error updating top sales product:', err);
            return res.status(500).json({ success: false, message: 'Failed to update top sales product' });
        }
        res.json({ success: true });
    });
});

// API to delete a top sales product
app.delete('/api/topsales/:id', (req, res) => {
    const { id } = req.params;
    db.run('DELETE FROM top_sales WHERE id = ?', [id], function (err) {
        if (err) {
            console.error('Error deleting top sales product:', err);
            return res.status(500).json({ success: false, message: 'Failed to delete top sales product' });
        }
        res.json({ success: true, deletedRows: this.changes });
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});





