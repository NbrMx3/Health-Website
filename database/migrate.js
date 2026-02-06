require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function migrate() {
    const sql = neon(process.env.DATABASE_URL);
    
    console.log('🚀 Starting database migration...\n');
    
    try {
        // Create Categories Table
        console.log('📋 Creating categories table...');
        await sql`
            CREATE TABLE IF NOT EXISTS categories (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL UNIQUE,
                description TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('✅ Categories table created\n');
        
        // Create Diseases Table
        console.log('📋 Creating diseases table...');
        await sql`
            CREATE TABLE IF NOT EXISTS diseases (
                id SERIAL PRIMARY KEY,
                name VARCHAR(200) NOT NULL,
                category_id INTEGER REFERENCES categories(id),
                description TEXT,
                symptoms TEXT[],
                treatment TEXT,
                prevention TEXT,
                image_url VARCHAR(500),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('✅ Diseases table created\n');
        
        // Create Health Tips Table
        console.log('📋 Creating health_tips table...');
        await sql`
            CREATE TABLE IF NOT EXISTS health_tips (
                id SERIAL PRIMARY KEY,
                title VARCHAR(200) NOT NULL,
                content TEXT NOT NULL,
                category VARCHAR(100),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('✅ Health tips table created\n');
        
        // Create Emergency Contacts Table
        console.log('📋 Creating emergency_contacts table...');
        await sql`
            CREATE TABLE IF NOT EXISTS emergency_contacts (
                id SERIAL PRIMARY KEY,
                service_name VARCHAR(100) NOT NULL,
                phone_number VARCHAR(50) NOT NULL,
                country VARCHAR(100) DEFAULT 'General',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('✅ Emergency contacts table created\n');
        
        // Create User Health Records Table
        console.log('📋 Creating user_health_records table...');
        await sql`
            CREATE TABLE IF NOT EXISTS user_health_records (
                id SERIAL PRIMARY KEY,
                user_id VARCHAR(100),
                record_type VARCHAR(50),
                record_data JSONB,
                recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `;
        console.log('✅ User health records table created\n');
        
        // Create Indexes
        console.log('🔍 Creating indexes...');
        await sql`CREATE INDEX IF NOT EXISTS idx_diseases_category ON diseases(category_id)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_diseases_name ON diseases(name)`;
        await sql`CREATE INDEX IF NOT EXISTS idx_health_tips_category ON health_tips(category)`;
        console.log('✅ Indexes created\n');
        
        console.log('✨ Migration completed successfully!');
        
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    }
}

migrate();
