const mysql = require('mysql2');
require('dotenv').config();

// Create connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'parking_management',
  port: process.env.DB_PORT || 3306
});

// Connect to database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1);
  }
  
  console.log('Connected to MySQL database');
  seedDatabase();
});

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');
    
    // Clear existing data (except admins and system settings)
    await query('DELETE FROM parking_records');
    await query('DELETE FROM users');
    await query('DELETE FROM parking_slots WHERE slot_number NOT LIKE "A-%"');
    
    console.log('Cleared existing sample data');
    
    // Add sample users
    const users = [
      ['MH-12-AB-1234', 'Rajesh Kumar', '9876543210', 'rajesh@example.com'],
      ['DL-01-CD-5678', 'Priya Sharma', '9876543211', 'priya@example.com'],
      ['KA-05-EF-9012', 'Amit Patel', '9876543212', 'amit@example.com'],
      ['TN-22-GH-3456', 'Sneha Reddy', '9876543213', 'sneha@example.com'],
      ['GJ-03-IJ-7890', 'Vikram Singh', '9876543214', 'vikram@example.com']
    ];
    
    for (const user of users) {
      await query(
        'INSERT INTO users (vehicle_registration, owner_name, contact_number, email) VALUES (?, ?, ?, ?)',
        user
      );
    }
    
    console.log(`Added ${users.length} sample users`);
    
    // Add additional parking slots
    const additionalSlots = [];
    for (let i = 51; i <= 70; i++) {
      additionalSlots.push([`B-${String(i-50).padStart(3, '0')}`, 'Car', 'Free']);
    }
    
    for (const slot of additionalSlots) {
      await query(
        'INSERT INTO parking_slots (slot_number, slot_type, status) VALUES (?, ?, ?)',
        slot
      );
    }
    
    console.log(`Added ${additionalSlots.length} additional parking slots`);
    
    // First, ensure we have the A- series slots (1-50)
    for (let i = 1; i <= 50; i++) {
      const slotNumber = `A-${String(i).padStart(3, '0')}`;
      try {
        await query(
          'INSERT IGNORE INTO parking_slots (slot_number, slot_type, status) VALUES (?, ?, ?)',
          [slotNumber, 'Car', 'Free']
        );
      } catch (error) {
        // Slot already exists, ignore
      }
    }
    
    // Mark some slots as occupied and create parking records
    const slotsToOccupy = ['A-001', 'A-005', 'A-010', 'B-001', 'B-005'];
    const vehicleRegistrations = ['MH-12-AB-1234', 'DL-01-CD-5678', 'KA-05-EF-9012', 'TN-22-GH-3456', 'GJ-03-IJ-7890'];
    
    for (let i = 0; i < slotsToOccupy.length; i++) {
      const slotNumber = slotsToOccupy[i];
      const vehicleReg = vehicleRegistrations[i];
      
      // Get slot ID - create if doesn't exist
      let slotRows = await query('SELECT id FROM parking_slots WHERE slot_number = ?', [slotNumber]);
      
      if (!slotRows || slotRows.length === 0) {
        // Create the slot
        await query(
          'INSERT INTO parking_slots (slot_number, slot_type, status) VALUES (?, ?, ?)',
          [slotNumber, 'Car', 'Free']
        );
        slotRows = await query('SELECT id FROM parking_slots WHERE slot_number = ?', [slotNumber]);
      }
      
      const slotId = slotRows[0].id;
      
      // Get user info
      const userRows = await query('SELECT owner_name FROM users WHERE vehicle_registration = ?', [vehicleReg]);
      const ownerName = userRows[0].owner_name;
      
      // Update slot status
      await query('UPDATE parking_slots SET status = "Occupied" WHERE id = ?', [slotId]);
      
      // Create parking record (entry 2-4 hours ago)
      const entryTime = new Date(Date.now() - (2 + i) * 60 * 60 * 1000);
      await query(
        `INSERT INTO parking_records 
         (vehicle_registration, slot_id, owner_name, contact_number, vehicle_type, entry_time) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [vehicleReg, slotId, ownerName, `987654321${i}`, 'Car', entryTime]
      );
    }
    
    console.log(`Created ${slotsToOccupy.length} active parking records`);
    
    // Create some completed parking records (from yesterday)
    const completedSlots = ['A-002', 'A-003', 'A-004'];
    const completedVehicles = ['MH-12-AB-1234', 'DL-01-CD-5678', 'KA-05-EF-9012'];
    
    for (let i = 0; i < completedSlots.length; i++) {
      const slotNumber = completedSlots[i];
      const vehicleReg = completedVehicles[i];
      
      // Get slot ID
      const slotRows = await query('SELECT id FROM parking_slots WHERE slot_number = ?', [slotNumber]);
      const slotId = slotRows[0].id;
      
      // Get user info
      const userRows = await query('SELECT owner_name FROM users WHERE vehicle_registration = ?', [vehicleReg]);
      const ownerName = userRows[0].owner_name;
      
      // Create completed parking record (yesterday)
      const entryTime = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const exitTime = new Date(entryTime.getTime() + (3 + i) * 60 * 60 * 1000);
      const durationMinutes = Math.floor((exitTime - entryTime) / (1000 * 60));
      const feeAmount = Math.ceil(durationMinutes / 60) * 50; // 50 INR per hour
      
      await query(
        `INSERT INTO parking_records 
         (vehicle_registration, slot_id, owner_name, contact_number, vehicle_type, 
          entry_time, exit_time, parking_duration_minutes, fee_amount, payment_status) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [vehicleReg, slotId, ownerName, `987654321${i}`, 'Car', 
         entryTime, exitTime, durationMinutes, feeAmount, 'Paid']
      );
    }
    
    console.log(`Created ${completedSlots.length} completed parking records`);
    
    // Mark some slots as reserved and maintenance
    await query('UPDATE parking_slots SET status = "Reserved" WHERE slot_number IN ("A-020", "A-021")');
    await query('UPDATE parking_slots SET status = "Maintenance" WHERE slot_number IN ("A-025", "A-026")');
    
    console.log('Marked some slots as Reserved and Maintenance');
    
    // Update system settings
    await query('UPDATE system_settings SET setting_value = "60" WHERE setting_key = "hourly_rate"');
    await query('UPDATE system_settings SET setting_value = "70" WHERE setting_key = "parking_capacity"');
    
    console.log('Updated system settings');
    
    console.log('\n✅ Database seeding completed successfully!');
    console.log('\nSample Data Summary:');
    console.log('- 5 sample users created');
    console.log('- 20 additional parking slots (B-001 to B-020)');
    console.log('- 5 currently parked vehicles');
    console.log('- 3 completed parking records');
    console.log('- 2 reserved slots (A-020, A-021)');
    console.log('- 2 maintenance slots (A-025, A-026)');
    console.log('- Hourly rate updated to 60 INR');
    console.log('- Parking capacity updated to 70 slots');
    
    connection.end();
    
  } catch (error) {
    console.error('Error seeding database:', error);
    connection.end();
    process.exit(1);
  }
}

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
