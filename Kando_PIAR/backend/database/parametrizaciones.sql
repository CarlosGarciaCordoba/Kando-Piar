-- Tablas de parametrización para el sistema PIAR
-- Estos datos serán configurables desde la pantalla de parametrizaciones

-- Tabla de tipos de documento
CREATE TABLE IF NOT EXISTS tipos_documento (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de géneros
CREATE TABLE IF NOT EXISTS generos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(50) NOT NULL,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de barrios
CREATE TABLE IF NOT EXISTS barrios (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    municipio VARCHAR(100) DEFAULT 'Floridablanca',
    departamento VARCHAR(100) DEFAULT 'Santander',
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de EPS
CREATE TABLE IF NOT EXISTS eps (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(150) NOT NULL,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de instituciones de rehabilitación
CREATE TABLE IF NOT EXISTS instituciones_rehabilitacion (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(200) NOT NULL,
    direccion VARCHAR(300),
    telefono VARCHAR(20),
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de frecuencias de rehabilitación
CREATE TABLE IF NOT EXISTS frecuencias_rehabilitacion (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    descripcion VARCHAR(200),
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de departamentos y municipios (básica para Colombia)
CREATE TABLE IF NOT EXISTS departamentos (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    activo BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS municipios (
    id SERIAL PRIMARY KEY,
    codigo VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    departamento_id INTEGER REFERENCES departamentos(id),
    activo BOOLEAN DEFAULT true
);

-- Insertar datos dummy para tipos de documento
INSERT INTO tipos_documento (codigo, nombre) VALUES
('CC', 'Cédula de Ciudadanía'),
('TI', 'Tarjeta de Identidad'),
('RC', 'Registro Civil'),
('CE', 'Cédula de Extranjería'),
('PP', 'Pasaporte'),
('MS', 'Menor Sin Identificación'),
('AS', 'Adulto Sin Identificación'),
('CD', 'Carné Diplomático');

-- Insertar datos dummy para géneros
INSERT INTO generos (codigo, nombre) VALUES
('M', 'Masculino'),
('F', 'Femenino'),
('O', 'Otro'),
('NR', 'Prefiere no responder');

-- Insertar datos dummy para barrios de Floridablanca
INSERT INTO barrios (codigo, nombre) VALUES
('CASCO', 'Casco Urbano'),
('VILLABEL', 'Villa del Rosario'),
('BOSQUES', 'Bosques de Floridablanca'),
('ALPES', 'Alpes'),
('CAÑAVERAL', 'Cañaveral'),
('LAGOS1', 'Lagos del Cacique I'),
('LAGOS2', 'Lagos del Cacique II'),
('COUNTRY', 'Country'),
('TERRAZAS', 'Terrazas'),
('ALEJAND', 'Alejandría'),
('CARACOLI', 'Caracolí'),
('MENSULI', 'Mensulí'),
('PIAMONTE', 'Piamonte'),
('RUITOQUE', 'Ruitoque'),
('SANTAFE', 'Santa Fe');

-- Insertar datos dummy para EPS
INSERT INTO eps (codigo, nombre) VALUES
('SURA', 'EPS SURA'),
('NUEVAEPS', 'Nueva EPS'),
('SANITAS', 'EPS Sanitas'),
('FAMISANAR', 'Famisanar EPS'),
('COMFENALCO', 'EPS Comfenalco Valle'),
('SALUD_TOTAL', 'EPS Salud Total'),
('COMPENSAR', 'EPS Compensar'),
('COOSALUD', 'Coosalud EPS'),
('ALIANSALUD', 'Aliansalud EPS'),
('GOLDEN_GROUP', 'Golden Group EPS'),
('EOC', 'EOC EPS'),
('CAPITAL_SALUD', 'Capital Salud EPS'),
('MEDIMAS', 'Medimás EPS'),
('MUTUAL_SER', 'Mutual Ser'),
('SISBEN', 'Régimen Subsidiado (SISBEN)');

-- Insertar datos dummy para instituciones de rehabilitación
INSERT INTO instituciones_rehabilitacion (codigo, nombre, direccion, telefono) VALUES
('FOSCAL', 'Fundación Oftalmológica de Santander (FOSCAL)', 'Calle 155A #23-09, Floridablanca', '607-6796767'),
('REHABIL_INTE', 'Centro de Rehabilitación Integral', 'Carrera 27 #45-32, Bucaramanga', '607-6456789'),
('CLINICA_GIRON', 'Clínica de Rehabilitación Girón', 'Calle 30 #25-15, Girón', '607-6123456'),
('FUNDACION_CARDIO', 'Fundación Cardiovascular', 'Calle 155A #23-58, Floridablanca', '607-6757575'),
('CENTRO_TERAPIA', 'Centro de Terapia Física', 'Carrera 35 #56-12, Bucaramanga', '607-6789012'),
('REHAB_NEURO', 'Centro de Rehabilitación Neurológica', 'Calle 48 #27-83, Bucaramanga', '607-6234567'),
('INST_CEGUERA', 'Instituto para Ciegos', 'Carrera 17 #35-40, Bucaramanga', '607-6345678'),
('FUND_AUDI', 'Fundación para Sordos', 'Calle 45 #19-25, Bucaramanga', '607-6456789'),
('HOGAR_INFANTIL', 'Hogar Infantil Especializado', 'Carrera 22 #48-15, Floridablanca', '607-6567890'),
('CLINICA_OCCIDENTE', 'Clínica de Occidente', 'Carrera 23 #35-22, Bucaramanga', '607-6678901');

-- Insertar datos dummy para frecuencias de rehabilitación
INSERT INTO frecuencias_rehabilitacion (codigo, nombre, descripcion) VALUES
('DIARIA', 'Diaria', 'Sesiones todos los días'),
('INTER_DIARIA', 'Interdiaria', 'Sesiones día por medio'),
('SEMANAL', 'Semanal', 'Una vez por semana'),
('BI_SEMANAL', 'Bisemanal', 'Dos veces por semana'),
('TRI_SEMANAL', 'Trisemanal', 'Tres veces por semana'),
('QUINCENAL', 'Quincenal', 'Cada quince días'),
('MENSUAL', 'Mensual', 'Una vez al mes'),
('BIMESTRAL', 'Bimestral', 'Cada dos meses'),
('TRIMESTRAL', 'Trimestral', 'Cada tres meses'),
('OCASIONAL', 'Ocasional', 'Según necesidad médica');

-- Insertar datos básicos de departamentos (algunos principales)
INSERT INTO departamentos (codigo, nombre) VALUES
('05', 'Antioquia'),
('08', 'Atlántico'),
('11', 'Bogotá D.C.'),
('13', 'Bolívar'),
('15', 'Boyacá'),
('17', 'Caldas'),
('18', 'Caquetá'),
('19', 'Cauca'),
('20', 'Cesar'),
('23', 'Córdoba'),
('25', 'Cundinamarca'),
('27', 'Chocó'),
('41', 'Huila'),
('44', 'La Guajira'),
('47', 'Magdalena'),
('50', 'Meta'),
('52', 'Nariño'),
('54', 'Norte de Santander'),
('63', 'Quindío'),
('66', 'Risaralda'),
('68', 'Santander'),
('70', 'Sucre'),
('73', 'Tolima'),
('76', 'Valle del Cauca');

-- Insertar algunos municipios de Santander
INSERT INTO municipios (codigo, nombre, departamento_id) VALUES
('68001', 'Bucaramanga', (SELECT id FROM departamentos WHERE codigo = '68')),
('68276', 'Floridablanca', (SELECT id FROM departamentos WHERE codigo = '68')),
('68307', 'Girón', (SELECT id FROM departamentos WHERE codigo = '68')),
('68547', 'Piedecuesta', (SELECT id FROM departamentos WHERE codigo = '68')),
('68081', 'Barrancabermeja', (SELECT id FROM departamentos WHERE codigo = '68')),
('68679', 'San Gil', (SELECT id FROM departamentos WHERE codigo = '68')),
('68573', 'Puerto Wilches', (SELECT id FROM departamentos WHERE codigo = '68')),
('68385', 'Lebrija', (SELECT id FROM departamentos WHERE codigo = '68')),
('68895', 'Vélez', (SELECT id FROM departamentos WHERE codigo = '68')),
('68502', 'Palmas del Socorro', (SELECT id FROM departamentos WHERE codigo = '68'));

-- Verificar las inserciones
SELECT 'Tipos de documento' as tabla, COUNT(*) as registros FROM tipos_documento
UNION ALL
SELECT 'Géneros', COUNT(*) FROM generos
UNION ALL
SELECT 'Barrios', COUNT(*) FROM barrios
UNION ALL
SELECT 'EPS', COUNT(*) FROM eps
UNION ALL
SELECT 'Instituciones rehabilitación', COUNT(*) FROM instituciones_rehabilitacion
UNION ALL
SELECT 'Frecuencias rehabilitación', COUNT(*) FROM frecuencias_rehabilitacion
UNION ALL
SELECT 'Departamentos', COUNT(*) FROM departamentos
UNION ALL
SELECT 'Municipios', COUNT(*) FROM municipios;
