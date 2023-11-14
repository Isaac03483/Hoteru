CREATE DATABASE IF NOT EXISTS hoteru;
USE hoteru;

-- Tabla que almacena los diferentes tipos de empleados.
CREATE TABLE IF NOT EXISTS employee_types (
                                             id_tipo INT AUTO_INCREMENT PRIMARY KEY,
                                             nombre_tipo VARCHAR(255) NOT NULL
    );

-- Tabla que almacena la información de cada empleado, incluyendo a qué tipo pertenece.
CREATE TABLE IF NOT EXISTS employees (
                                        id_empleado INT AUTO_INCREMENT PRIMARY KEY,
                                        nombre_empleado VARCHAR(255) NOT NULL,
                                        id_tipo INT,
    FOREIGN KEY (id_tipo) REFERENCES employee_types (id_tipo)
    );

-- Tabla que registra las entradas y salidas de los empleados.
CREATE TABLE IF NOT EXISTS empleado_e_s (
                                            id_registro INT AUTO_INCREMENT PRIMARY KEY,
                                            id_empleado INT,
                                            entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                            salida TIMESTAMP,
                                            FOREIGN KEY (id_empleado) REFERENCES employees(id_empleado)
    );

-- Tabla que almacena la información de los clientes.
CREATE TABLE IF NOT EXISTS cliente (
                                       nit INT PRIMARY KEY,
                                       nombre_cliente VARCHAR(255) NOT NULL
    );

-- Tabla que define los tipos de habitaciones disponibles y su costo por día.
CREATE TABLE IF NOT EXISTS tipo_habitacion (
                                               id_tipo INT AUTO_INCREMENT PRIMARY KEY,
                                               nombre_tipo VARCHAR(255) NOT NULL,
    costo_por_dia DECIMAL(10,2) NOT NULL
    );

-- Tabla que almacena las habitaciones disponibles, su estado y a qué tipo pertenecen.
CREATE TABLE IF NOT EXISTS habitacion (
                                          id_habitacion INT AUTO_INCREMENT PRIMARY KEY,
                                          estado_habitacion VARCHAR(50) NOT NULL,
    id_tipo INT,
    FOREIGN KEY (id_tipo) REFERENCES tipo_habitacion(id_tipo)
    );

-- Tabla que registra las reservaciones hechas por los clientes, habitación reservada,
-- empleado que realizó la reserva y fechas de inicio y fin de la reservación.
CREATE TABLE IF NOT EXISTS reservacion (
                                           id_reserva INT AUTO_INCREMENT PRIMARY KEY,
                                           nit_cliente INT,
                                           id_habitacion INT,
                                           id_empleado INT,
                                           fecha_inicio DATE NOT NULL,
                                           fecha_fin DATE NOT NULL,
                                           costo_total DECIMAL(10,2),
    FOREIGN KEY (nit_cliente) REFERENCES cliente(nit),
    FOREIGN KEY (id_habitacion) REFERENCES habitacion(id_habitacion),
    FOREIGN KEY (id_empleado) REFERENCES employees(id_empleado)
    );

--Tabla para las tareas de los empleados
CREATE TABLE IF NOT EXISTs tareras(
                                     id_tarea INT AUTO_INCREMENT PRIMARY KEY,
                                     nombre_tarea VARCHAR(255) NOT NULL,
    descripcion TEXT,
    fecha_tarea DATE NOT NULL,
    id_empleado INT,
    FOREIGN KEY (id_empleado) REFERENCES employees(id_empleado)
    );
