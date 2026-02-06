# Health Website - Neon Postgres Setup

## 🚀 Quick Start

### 1. Get Neon Postgres Connection String

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign in or create a free account
3. Create a new project
4. Copy your connection string (looks like: `postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require`)

### 2. Configure Environment

Edit the `.env` file and replace the placeholder with your actual Neon connection string:

```env
DATABASE_URL=your_actual_connection_string_here
PORT=3000
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Run Database Migration

This creates all the necessary tables:

```bash
npm run migrate
```

### 5. Seed Database with Data

This populates the database with initial data:

```bash
npm run seed
```

### 6. Start the Server

```bash
npm start
```

The server will run on `http://localhost:3000`

## 📊 Database Schema

### Tables Created:

1. **categories** - Disease categories (Infectious, Respiratory, etc.)
2. **diseases** - Complete disease information with symptoms, treatment, prevention
3. **health_tips** - Health and wellness tips
4. **emergency_contacts** - Emergency phone numbers by country
5. **user_health_records** - User health tracking data (BMI, water intake, etc.)

## 🔌 API Endpoints

### Diseases
- `GET /api/diseases` - Get all diseases
- `GET /api/diseases/:id` - Get specific disease
- `GET /api/diseases/search/:query` - Search diseases

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id/diseases` - Get diseases by category

### Health Tips
- `GET /api/health-tips` - Get all health tips

### Emergency Contacts
- `GET /api/emergency-contacts` - Get emergency contacts

### User Health Records
- `POST /api/health-records` - Save health record
- `GET /api/health-records/:userId` - Get user's health records

### Health Check
- `GET /api/health` - Check if API is running

## 📝 Example API Usage

### Fetch All Diseases (JavaScript)
```javascript
fetch('http://localhost:3000/api/diseases')
    .then(response => response.json())
    .then(data => console.log(data));
```

### Save Health Record
```javascript
fetch('http://localhost:3000/api/health-records', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        user_id: 'user123',
        record_type: 'bmi',
        record_data: { weight: 70, height: 175, bmi: 22.9 }
    })
});
```

## 🔧 Available Commands

- `npm run migrate` - Create database tables
- `npm run seed` - Populate database with initial data
- `npm start` - Start the API server
- `npm run dev` - Start development server

## 🌐 Neon Postgres Features

- ✅ Serverless Postgres (auto-scaling)
- ✅ Free tier available (0.5 GB storage)
- ✅ Built-in connection pooling
- ✅ Automatic backups
- ✅ Branch your database for testing

## 📚 Next Steps

1. Update `.env` with your real Neon connection string
2. Run migrations to create tables
3. Run seed script to populate data
4. Test API endpoints
5. Integrate API with your frontend

## 🛡️ Security Notes

- Never commit `.env` file to GitHub (already in `.gitignore`)
- Use environment variables for sensitive data
- Enable SSL mode for production
- Implement authentication for write operations

## 🔗 Resources

- [Neon Documentation](https://neon.tech/docs)
- [Neon Serverless Driver](https://github.com/neondatabase/serverless)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
