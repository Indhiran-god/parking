const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Create connection without database first
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  port: process.env.DB_PORT || 3306
});

console.log('Setting up parking management database...');

connection.connect(async (err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    process.exit(1);
  }

  console.log('Connected to MySQL server');

  try {
    // Read SQL file
    const sqlFile = fs.readFileSync(path.join(__dirname, 'database.sql'), 'utf8');
    
    // Split into individual statements
    const statements = sqlFile
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    console.log(`Found ${statements.length} SQL statements to execute`);
    
    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      try {
        await query(stmt);
        console.log(`✓ Executed statement ${i + 1}/${statements.length}`);
      } catch (error) {
        // Ignore "database already exists" errors
        if (!error.message.includes('database exists') && !error.message.includes('Duplicate')) {
          console.warn(`Warning on statement ${i + 1}:`, error.message);
        }
      }
    }
    
    console.log('\n✅ Database setup completed successfully!');
    console.log('\nDatabase Information:');
    console.log('- Database: parking_management');
    console.log('- Default admin: admin / admin123');
    console.log('- 50 default parking slots created');
    console.log('- System settings initialized');
    
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    connection.end();
    console.log('\nYou can now run the seed script: node seed.js');
  }
});

function query(sql, params = []) {
  return new Promise((resolve, reject) => {
    connection.query(sql, params, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}
