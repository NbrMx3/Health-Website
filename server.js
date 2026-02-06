require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { neon } = require('@neondatabase/serverless');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.')); // Serve static files

// Database connection
const sql = neon(process.env.DATABASE_URL);

// API Routes

// Get all diseases
app.get('/api/diseases', async (req, res) => {
    try {
        const diseases = await sql`
            SELECT d.*, c.name as category_name 
            FROM diseases d
            LEFT JOIN categories c ON d.category_id = c.id
            ORDER BY d.name
        `;
        res.json(diseases);
    } catch (error) {
        console.error('Error fetching diseases:', error);
        res.status(500).json({ error: 'Failed to fetch diseases' });
    }
});

// Get disease by ID
app.get('/api/diseases/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const disease = await sql`
            SELECT d.*, c.name as category_name 
            FROM diseases d
            LEFT JOIN categories c ON d.category_id = c.id
            WHERE d.id = ${id}
        `;
        
        if (disease.length === 0) {
            return res.status(404).json({ error: 'Disease not found' });
        }
        
        res.json(disease[0]);
    } catch (error) {
        console.error('Error fetching disease:', error);
        res.status(500).json({ error: 'Failed to fetch disease' });
    }
});

// Search diseases
app.get('/api/diseases/search/:query', async (req, res) => {
    try {
        const { query } = req.params;
        const diseases = await sql`
            SELECT d.*, c.name as category_name 
            FROM diseases d
            LEFT JOIN categories c ON d.category_id = c.id
            WHERE d.name ILIKE ${'%' + query + '%'}
            ORDER BY d.name
        `;
        res.json(diseases);
    } catch (error) {
        console.error('Error searching diseases:', error);
        res.status(500).json({ error: 'Failed to search diseases' });
    }
});

// Get all categories
app.get('/api/categories', async (req, res) => {
    try {
        const categories = await sql`SELECT * FROM categories ORDER BY name`;
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Get diseases by category
app.get('/api/categories/:id/diseases', async (req, res) => {
    try {
        const { id } = req.params;
        const diseases = await sql`
            SELECT d.*, c.name as category_name 
            FROM diseases d
            LEFT JOIN categories c ON d.category_id = c.id
            WHERE d.category_id = ${id}
            ORDER BY d.name
        `;
        res.json(diseases);
    } catch (error) {
        console.error('Error fetching category diseases:', error);
        res.status(500).json({ error: 'Failed to fetch diseases' });
    }
});

// Get all health tips
app.get('/api/health-tips', async (req, res) => {
    try {
        const tips = await sql`SELECT * FROM health_tips ORDER BY created_at DESC`;
        res.json(tips);
    } catch (error) {
        console.error('Error fetching health tips:', error);
        res.status(500).json({ error: 'Failed to fetch health tips' });
    }
});

// Get emergency contacts
app.get('/api/emergency-contacts', async (req, res) => {
    try {
        const contacts = await sql`SELECT * FROM emergency_contacts ORDER BY country, service_name`;
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching emergency contacts:', error);
        res.status(500).json({ error: 'Failed to fetch emergency contacts' });
    }
});

// Save user health record
app.post('/api/health-records', async (req, res) => {
    try {
        const { user_id, record_type, record_data } = req.body;
        
        const result = await sql`
            INSERT INTO user_health_records (user_id, record_type, record_data)
            VALUES (${user_id}, ${record_type}, ${JSON.stringify(record_data)})
            RETURNING *
        `;
        
        res.status(201).json(result[0]);
    } catch (error) {
        console.error('Error saving health record:', error);
        res.status(500).json({ error: 'Failed to save health record' });
    }
});

// Get user health records
app.get('/api/health-records/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const records = await sql`
            SELECT * FROM user_health_records 
            WHERE user_id = ${userId}
            ORDER BY recorded_at DESC
        `;
        res.json(records);
    } catch (error) {
        console.error('Error fetching health records:', error);
        res.status(500).json({ error: 'Failed to fetch health records' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Health Website API is running' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API endpoints available at http://localhost:${PORT}/api`);
});
