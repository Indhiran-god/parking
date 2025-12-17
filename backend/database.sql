-- Vehicle Parking Slot Management System Database Schema
-- For use with MySQL (XAMPP)

CREATE DATABASE IF NOT EXISTS parking_management;
USE parking_management;

-- Admin users table
CREATE TABLE IF NOT EXISTS admins (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Users (vehicle owners/drivers) table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vehicle_registration VARCHAR(20) UNIQUE NOT NULL,
    owner_name VARCHAR(100) NOT NULL,
    contact_number VARCHAR(15),
    email VARCHAR(100),
    password_hash VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Parking slots table
CREATE TABLE IF NOT EXISTS parking_slots (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slot_number VARCHAR(10) UNIQUE NOT NULL,
    slot_type ENUM('Car', 'Bike', 'SUV', 'Truck', 'Handicapped') DEFAULT 'Car',
    status ENUM('Free', 'Occupied', 'Reserved', 'Maintenance') DEFAULT 'Free',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Vehicle parking records table
CREATE TABLE IF NOT EXISTS parking_records (
    id INT PRIMARY KEY AUTO_INCREMENT,
    vehicle_registration VARCHAR(20) NOT NULL,
    slot_id INT NOT NULL,
    owner_name VARCHAR(100),
    contact_number VARCHAR(15),
    vehicle_type ENUM('Car', 'Bike', 'SUV', 'Truck', 'Other') DEFAULT 'Car',
    entry_time DATETIME NOT NULL,
    exit_time DATETIME,
    parking_duration_minutes INT DEFAULT 0,
    fee_amount DECIMAL(10, 2) DEFAULT 0.00,
    payment_status ENUM('Pending', 'Paid', 'Free') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (slot_id) REFERENCES parking_slots(id) ON DELETE RESTRICT
);

-- System settings table
CREATE TABLE IF NOT EXISTS system_settings (
    id INT PRIMARY KEY AUTO_INCREMENT,
    setting_key VARCHAR(50) UNIQUE NOT NULL,
    setting_value TEXT,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert default admin (username: admin, password: admin123)
INSERT INTO admins (username, password_hash, full_name, email) 
VALUES ('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMye7Z7lW6L7HjJ7qJ7J7J7J7J7J7J7J7J7', 'System Administrator', 'admin@parking.com');

-- Insert default parking slots (1-50)
DELIMITER $$
CREATE PROCEDURE InsertDefaultSlots()
BEGIN
    DECLARE i INT DEFAULT 1;
    WHILE i <= 50 DO
        INSERT INTO parking_slots (slot_number, slot_type, status) 
        VALUES (CONCAT('A-', LPAD(i, 3, '0')), 'Car', 'Free')
        ON DUPLICATE KEY UPDATE slot_number = slot_number;
        SET i = i + 1;
    END WHILE;
END$$
DELIMITER ;

CALL InsertDefaultSlots();

-- Insert default system settings
INSERT INTO system_settings (setting_key, setting_value, description) VALUES
('hourly_rate', '50', 'Parking fee per hour in local currency'),
('parking_capacity', '50', 'Total number of parking slots'),
('system_name', 'Vehicle Parking Management System', 'Name of the parking system'),
('currency', 'INR', 'Currency used for parking fees');

-- Create indexes for better performance
CREATE INDEX idx_parking_records_vehicle ON parking_records(vehicle_registration);
CREATE INDEX idx_parking_records_slot ON parking_records(slot_id);
CREATE INDEX idx_parking_records_entry_time ON parking_records(entry_time);
CREATE INDEX idx_parking_slots_status ON parking_slots(status);
CREATE INDEX idx_parking_slots_number ON parking_slots(slot_number);
