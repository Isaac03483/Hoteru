CREATE DATABASE IF NOT EXISTS hoteru;
USE hoteru;

-- Tabla que almacena los diferentes tipos de empleados.
CREATE TABLE IF NOT EXISTS employee_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL
);

-- Tabla que almacena la información de cada empleado, incluyendo a qué tipo pertenece.
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    employee_type_id INT,
    FOREIGN KEY (employee_type_id) REFERENCES employee_types (id)
);

-- Tabla que define los tipos de habitaciones disponibles y su costo por día.
CREATE TABLE IF NOT EXISTS room_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(255) NOT NULL,
    cost_per_day DECIMAL(10,2) NOT NULL
);

-- Tabla que almacena las habitaciones disponibles, su estado y a qué tipo pertenecen.
CREATE TABLE IF NOT EXISTS rooms (
    id INT AUTO_INCREMENT PRIMARY KEY,
    state VARCHAR(50) NOT NULL,
    room_type_id INT,
    FOREIGN KEY (room_type_id) REFERENCES room_types(id)
    );

-- Tabla que registra las reservaciones hechas por los clientes, habitación reservada,
-- empleado que realizó la reserva y fechas de inicio y fin de la reservación.
CREATE TABLE IF NOT EXISTS reservations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    client_nit INT,
    room_id INT,
    init_date DATE NOT NULL,
    end_date DATE NOT NULL,
    total DECIMAL(10,2),
    FOREIGN KEY (room_id) REFERENCES rooms(id)
    );

-- tabla para las tareas de los empleados
CREATE TABLE IF NOT EXISTS tasks(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    task_description TEXT,
    date DATE NOT NULL,
    employee_id INT,
    state VARCHAR(255)
);
