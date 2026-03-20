CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    campo1 VARCHAR(255) NOT NULL, -- Nombre
    campo2 VARCHAR(255) NOT NULL, -- Marca
    campo3 VARCHAR(255) NOT NULL, -- Categoría
    campo4 INTEGER NOT NULL,      -- Stock
    campo5 DECIMAL(10,2) NOT NULL, -- Precio
    campo6 BOOLEAN NOT NULL       -- Disponible
);

-- Datos iniciales para pruebas
INSERT INTO products (campo1, campo2, campo3, campo4, campo5, campo6) 
VALUES ('Monitor Dell 24', 'Dell', 'Monitores', 10, 199.99, true);