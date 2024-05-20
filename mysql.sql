drop database if exists Restaurant_Frijolito;
create database if not exists Restaurant_Frijolito;
use Restaurant_Frijolito;

-- Crear la tabla Usuarios
CREATE TABLE Usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    foto_perfil VARCHAR(255) 
);
CREATE TABLE cliente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    nombre VARCHAR(255) NOT NULL,
    telefono VARCHAR(20),
    direccion VARCHAR(255),
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id)
);

-- Crear la tabla Mesa
CREATE TABLE Mesa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    numero_mesa INT NOT NULL,
    capacidad INT NOT NULL,
    disponible ENUM('disponible', 'NO disponible') DEFAULT 'disponible'
);

-- Crear la tabla Orden
CREATE TABLE Orden (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_mesa INT,
    fecha_hora DATETIME,
    estado ENUM('en_preparacion', 'servida', 'pagada') DEFAULT 'en_preparacion',
    FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
    FOREIGN KEY (id_mesa) REFERENCES Mesa(id)
);

-- Crear la tabla Producto
CREATE TABLE Producto (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(255)
);

ALTER TABLE Producto ADD COLUMN foto VARCHAR(255);

-- Crear la tabla DetalleOrden
CREATE TABLE DetalleOrden (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_orden INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(10, 2),
    FOREIGN KEY (id_orden) REFERENCES Orden(id),
    FOREIGN KEY (id_producto) REFERENCES Producto(id)
);

-- Crear la tabla Roles (si es necesario)
CREATE TABLE Roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL
);





-- insert--

-- Generar 100 productos ficticios con precios en pesos chilenos
INSERT INTO Producto (nombre, precio, categoria) VALUES
('Hamburguesa Clásica', 5000, 'Platos Principales'),
('Pizza Margarita', 4500, 'Platos Principales'),
('Ensalada César', 3000, 'Entradas'),
('Papas Fritas', 1500, 'Acompañamientos'),
('Soda Cola', 1000, 'Bebidas'),
('Agua Mineral', 500, 'Bebidas'),
('Tarta de Manzana', 4000, 'Postres'),
('Helado de Vainilla', 3500, 'Postres'),
('Sándwich de Pollo', 4500, 'Platos Principales'),
('Pasta Alfredo', 6000, 'Platos Principales'),
('Ensalada Griega', 4500, 'Entradas'),
('Onion Rings', 2500, 'Acompañamientos'),
('Limonada', 1500, 'Bebidas'),
('Refresco de Naranja', 1000, 'Bebidas'),
('Tiramisú', 4000, 'Postres'),
('Helado de Chocolate', 3500, 'Postres'),
('Sándwich de Pavo', 4000, 'Platos Principales'),
('Pasta Carbonara', 6500, 'Platos Principales'),
('Ensalada Caprese', 5000, 'Entradas'),
('Nachos', 3000, 'Acompañamientos'),
('Té Helado', 1500, 'Bebidas'),
('Limonada de Fresa', 1500, 'Bebidas'),
('Cheesecake', 4500, 'Postres'),
('Helado de Fresa', 3500, 'Postres'),
('Sándwich de Atún', 4500, 'Platos Principales'),
('Pasta Primavera', 6000, 'Platos Principales'),
('Ensalada Waldorf', 4500, 'Entradas'),
('Papas Asadas', 2500, 'Acompañamientos'),
('Café', 1000, 'Bebidas'),
('Té', 1000, 'Bebidas'),
('Pastel de Zanahoria', 4000, 'Postres'),
('Helado de Menta', 3500, 'Postres'),
('Sándwich de Jamón y Queso', 4000, 'Platos Principales'),
('Pasta Boloñesa', 6500, 'Platos Principales'),
('Ensalada de Frutas', 3000, 'Entradas'),
('Palitos de Queso', 2500, 'Acompañamientos'),
('Smoothie de Frutas', 2000, 'Bebidas'),
('Milkshake de Vainilla', 2000, 'Bebidas'),
('Pastel de Chocolate', 4500, 'Postres'),
('Helado de Caramelo', 3500, 'Postres'),
('Sándwich de Roast Beef', 5000, 'Platos Principales'),
('Pasta Pesto', 6000, 'Platos Principales'),
('Ensalada de Pollo', 4500, 'Entradas'),
('Tacos', 3500, 'Acompañamientos'),
('Jugo de Naranja', 1500, 'Bebidas'),
('Cerveza', 2000, 'Bebidas'),
('Pie de Limón', 3000, 'Postres'),
('Helado de Mango', 3500, 'Postres'),
('Sándwich Vegetariano', 4500, 'Platos Principales'),
('Pasta Marinara', 6000, 'Platos Principales'),
('Ensalada de Espinacas', 3000, 'Entradas'),
('Papas Bravas', 2500, 'Acompañamientos'),
('Limonada con Menta', 2000, 'Bebidas'),
('Café Helado', 1500, 'Bebidas'),
('Pastel de Queso', 4500, 'Postres'),
('Helado de Pistacho', 3500, 'Postres'),
('Sándwich de Pollo a la Parrilla', 5000, 'Platos Principales'),
('Pasta Arrabbiata', 6500, 'Platos Principales'),
('Ensalada de Tomate y Mozzarella', 5000, 'Entradas'),
('Chips de Plátano', 2500, 'Acompañamientos'),
('Agua de Coco', 1000, 'Bebidas'),
('Mojito', 2500, 'Bebidas'),
('Brownie', 4000, 'Postres'),
('Helado de Nata', 3500, 'Postres'),
('Sándwich de Salchicha', 4000, 'Platos Principales'),
('Pasta con Camarones', 7500, 'Platos Principales'),
('Ensalada de Quinoa', 4500, 'Entradas'),
('Rollitos de Primavera', 3000, 'Acompañamientos'),
('Limonada de Mango', 2000, 'Bebidas'),
('Margarita', 3000, 'Bebidas'),
('Tarta de Queso', 4500, 'Postres'),
('Helado de Coco', 3500, 'Postres'),
('Sándwich de Carne Asada', 5000, 'Platos Principales'),
('Pasta con Pesto de Calabacín', 7000, 'Platos Principales'),
('Ensalada de Pasta', 3000, 'Entradas'),
('Batatas Fritas', 2500, 'Acompañamientos'),
('Granizado de Limón', 1500, 'Bebidas'),
('Piña Colada', 3000, 'Bebidas'),
('Crumble de Manzana', 4000, 'Postres'),
('Helado de Almendra', 3500, 'Postres');


-- Insertar 50 mesas con distintas cantidades
INSERT INTO Mesa (numero_mesa, capacidad) VALUES 
(1, 2), (2, 2), (3, 2), (4, 2), (5, 2),
(6, 2), (7, 2), (8, 2), (9, 2), (10, 2),
(11, 4), (12, 4), (13, 4), (14, 4), (15, 4),
(16, 4), (17, 4), (18, 4), (19, 4), (20, 4),
(21, 6), (22, 6), (23, 6), (24, 6), (25, 6),
(26, 6), (27, 6), (28, 6), (29, 6), (30, 6),
(31, 8), (32, 8), (33, 8), (34, 8), (35, 8),
(36, 8), (37, 8), (38, 8), (39, 8), (40, 8),
(41, 10), (42, 10), (43, 10), (44, 10), (45, 10),
(46, 10), (47, 10), (48, 10), (49, 10), (50, 10);