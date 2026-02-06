require('dotenv').config();
const { neon } = require('@neondatabase/serverless');

async function seed() {
    const sql = neon(process.env.DATABASE_URL);
    
    console.log('🌱 Starting database seeding...\n');
    
    try {
        // Insert Categories
        console.log('📂 Inserting categories...');
        const categories = [
            { name: 'Infectious Diseases', description: 'Diseases caused by pathogens' },
            { name: 'Respiratory Diseases', description: 'Diseases affecting the respiratory system' },
            { name: 'Cardiovascular Diseases', description: 'Diseases affecting the heart and blood vessels' },
            { name: 'Metabolic Diseases', description: 'Diseases affecting metabolism' },
            { name: 'Neurological Diseases', description: 'Diseases affecting the nervous system' },
            { name: 'Mental Health Disorders', description: 'Disorders affecting mental health' }
        ];
        
        for (const cat of categories) {
            await sql`
                INSERT INTO categories (name, description)
                VALUES (${cat.name}, ${cat.description})
                ON CONFLICT (name) DO NOTHING
            `;
        }
        console.log(`✅ Inserted ${categories.length} categories\n`);
        
        // Get category IDs
        const catRows = await sql`SELECT id, name FROM categories`;
        const catMap = {};
        catRows.forEach(row => { catMap[row.name] = row.id; });
        
        // Insert Diseases
        console.log('💊 Inserting diseases...');
        const diseases = [
            {
                name: 'Common Cold',
                category: 'Infectious Diseases',
                symptoms: ['Runny nose', 'Sore throat', 'Cough', 'Sneezing', 'Mild fever'],
                treatment: 'Rest, fluids, over-the-counter cold medications. Symptoms usually resolve in 7-10 days.',
                prevention: 'Frequent handwashing, avoid close contact with sick individuals, maintain good hygiene.',
                image_url: 'images/cold.jpg'
            },
            {
                name: 'Influenza (Flu)',
                category: 'Infectious Diseases',
                symptoms: ['High fever', 'Body aches', 'Fatigue', 'Cough', 'Headache'],
                treatment: 'Antiviral medications if taken early, rest, fluids, pain relievers.',
                prevention: 'Annual flu vaccination, good hygiene practices, avoid crowded places during flu season.',
                image_url: 'images/flu.jpg'
            },
            {
                name: 'Diabetes',
                category: 'Metabolic Diseases',
                symptoms: ['Increased thirst', 'Frequent urination', 'Fatigue', 'Blurred vision', 'Slow healing wounds'],
                treatment: 'Type 1: Insulin therapy. Type 2: Lifestyle changes, oral medications, possibly insulin.',
                prevention: 'Maintain healthy weight, regular exercise, balanced diet, limit sugar intake.',
                image_url: 'images/diabetes.jpg'
            },
            {
                name: 'Hypertension',
                category: 'Cardiovascular Diseases',
                symptoms: ['Often asymptomatic', 'Headaches', 'Shortness of breath', 'Nosebleeds'],
                treatment: 'Lifestyle modifications, antihypertensive medications, regular monitoring.',
                prevention: 'Reduce salt intake, exercise regularly, maintain healthy weight, limit alcohol.',
                image_url: 'images/hypertension.jpg'
            },
            {
                name: 'Asthma',
                category: 'Respiratory Diseases',
                symptoms: ['Wheezing', 'Shortness of breath', 'Chest tightness', 'Coughing'],
                treatment: 'Inhalers (bronchodilators and corticosteroids), avoid triggers, action plan.',
                prevention: 'Identify and avoid triggers, regular check-ups, maintain clean environment.',
                image_url: 'images/asthma.jpg'
            },
            {
                name: 'Depression',
                category: 'Mental Health Disorders',
                symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Sleep changes', 'Difficulty concentrating'],
                treatment: 'Psychotherapy, antidepressant medications, lifestyle changes, support groups.',
                prevention: 'Regular exercise, healthy diet, stress management, social connections.',
                image_url: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400'
            },
            {
                name: 'Tuberculosis',
                category: 'Infectious Diseases',
                symptoms: ['Persistent cough', 'Chest pain', 'Coughing up blood', 'Fatigue', 'Weight loss', 'Night sweats'],
                treatment: 'Long-term antibiotic therapy (6-9 months), directly observed therapy.',
                prevention: 'BCG vaccination, early detection and treatment, avoid close contact with infected individuals.',
                image_url: 'images/tuberclousis.jpg'
            },
            {
                name: 'Malaria',
                category: 'Infectious Diseases',
                symptoms: ['High fever', 'Chills', 'Sweating', 'Headache', 'Nausea', 'Vomiting'],
                treatment: 'Antimalarial medications (chloroquine, artemisinin-based combinations).',
                prevention: 'Mosquito nets, insect repellent, antimalarial prophylaxis in endemic areas.',
                image_url: 'images/mlaria.jpg'
            },
            {
                name: 'COVID-19',
                category: 'Infectious Diseases',
                symptoms: ['Fever', 'Dry cough', 'Fatigue', 'Loss of taste/smell', 'Difficulty breathing'],
                treatment: 'Supportive care, antiviral medications, oxygen therapy if needed, vaccination.',
                prevention: 'Vaccination, mask-wearing, social distancing, hand hygiene.',
                image_url: 'images/covid.jpg'
            },
            {
                name: "Alzheimer's Disease",
                category: 'Neurological Diseases',
                symptoms: ['Memory loss', 'Confusion', 'Difficulty with familiar tasks', 'Personality changes'],
                treatment: 'Medications to manage symptoms, cognitive therapy, supportive care.',
                prevention: 'Mental stimulation, physical exercise, healthy diet, social engagement.',
                image_url: 'images/alzheimer.jpg'
            }
        ];
        
        for (const disease of diseases) {
            await sql`
                INSERT INTO diseases (name, category_id, symptoms, treatment, prevention, image_url)
                VALUES (
                    ${disease.name},
                    ${catMap[disease.category]},
                    ${disease.symptoms},
                    ${disease.treatment},
                    ${disease.prevention},
                    ${disease.image_url}
                )
                ON CONFLICT DO NOTHING
            `;
        }
        console.log(`✅ Inserted ${diseases.length} diseases\n`);
        
        // Insert Health Tips
        console.log('💡 Inserting health tips...');
        const tips = [
            { title: 'Stay Hydrated', content: 'Drink 8-10 glasses of water daily for optimal health.', category: 'General' },
            { title: 'Regular Exercise', content: 'Aim for 30 minutes of moderate exercise 5 days a week.', category: 'Fitness' },
            { title: 'Balanced Diet', content: 'Include fruits, vegetables, whole grains, and lean proteins in your diet.', category: 'Nutrition' },
            { title: 'Quality Sleep', content: 'Get 7-9 hours of sleep each night for better health.', category: 'Wellness' },
            { title: 'Stress Management', content: 'Practice meditation, yoga, or deep breathing exercises daily.', category: 'Mental Health' }
        ];
        
        for (const tip of tips) {
            await sql`
                INSERT INTO health_tips (title, content, category)
                VALUES (${tip.title}, ${tip.content}, ${tip.category})
            `;
        }
        console.log(`✅ Inserted ${tips.length} health tips\n`);
        
        // Insert Emergency Contacts
        console.log('🚨 Inserting emergency contacts...');
        const contacts = [
            { service: 'Emergency Services', phone: '911', country: 'USA' },
            { service: 'Ambulance', phone: '108', country: 'India' },
            { service: 'Fire Department', phone: '101', country: 'India' },
            { service: 'Police', phone: '100', country: 'India' },
            { service: 'Poison Control', phone: '1-800-222-1222', country: 'USA' }
        ];
        
        for (const contact of contacts) {
            await sql`
                INSERT INTO emergency_contacts (service_name, phone_number, country)
                VALUES (${contact.service}, ${contact.phone}, ${contact.country})
            `;
        }
        console.log(`✅ Inserted ${contacts.length} emergency contacts\n`);
        
        console.log('✨ Seeding completed successfully!');
        
        // Display summary
        const diseaseCount = await sql`SELECT COUNT(*) as count FROM diseases`;
        const tipCount = await sql`SELECT COUNT(*) as count FROM health_tips`;
        const contactCount = await sql`SELECT COUNT(*) as count FROM emergency_contacts`;
        
        console.log('\n📊 Database Summary:');
        console.log(`   Categories: ${categories.length}`);
        console.log(`   Diseases: ${diseaseCount[0].count}`);
        console.log(`   Health Tips: ${tipCount[0].count}`);
        console.log(`   Emergency Contacts: ${contactCount[0].count}`);
        
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        console.error(error);
        process.exit(1);
    }
}

seed();
