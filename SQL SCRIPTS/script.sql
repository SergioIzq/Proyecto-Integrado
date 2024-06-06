USE [master]
GO

/****** Object:  Database [ProyectoIntegrado]    Script Date: 06/06/2024 8:34:10 ******/
CREATE DATABASE [ProyectoIntegrado]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'HelloNHibernateGO', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\HelloNHibernateGO.mdf' , SIZE = 73728KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'HelloNHibernateGO_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\HelloNHibernateGO_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ProyectoIntegrado].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [ProyectoIntegrado] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET ARITHABORT OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET AUTO_CLOSE ON 
GO

ALTER DATABASE [ProyectoIntegrado] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [ProyectoIntegrado] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [ProyectoIntegrado] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET  ENABLE_BROKER 
GO

ALTER DATABASE [ProyectoIntegrado] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [ProyectoIntegrado] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [ProyectoIntegrado] SET  MULTI_USER 
GO

ALTER DATABASE [ProyectoIntegrado] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [ProyectoIntegrado] SET DB_CHAINING OFF 
GO

ALTER DATABASE [ProyectoIntegrado] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [ProyectoIntegrado] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO

ALTER DATABASE [ProyectoIntegrado] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [ProyectoIntegrado] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO

ALTER DATABASE [ProyectoIntegrado] SET QUERY_STORE = ON
GO

ALTER DATABASE [ProyectoIntegrado] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO

ALTER DATABASE [ProyectoIntegrado] SET  READ_WRITE 
GO

USE [ProyectoIntegrado]
GO

/****** Object:  Table [dbo].[PACIENTE]    Script Date: 06/06/2024 8:35:01 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[PACIENTE](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NOMBRE] [varchar](50) NOT NULL,
	[APELLIDOS] [varchar](150) NOT NULL,
	[EDAD] [int] NOT NULL,
	[CORREO_ELECTRONICO] [varchar](100) NOT NULL,
	[CONTRASENA] [varchar](100) NOT NULL,
	[FECHA_REGISTRO] [datetime] NOT NULL,
	[ROL] [varchar](1) NOT NULL,
 CONSTRAINT [PK_PACIENTES] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


USE [ProyectoIntegrado]
GO

INSERT INTO [dbo].[PACIENTE]
           ([NOMBRE]
           ,[APELLIDOS]
           ,[EDAD]
           ,[CORREO_ELECTRONICO]
           ,[CONTRASENA]
           ,[FECHA_REGISTRO]
           ,[ROL])
     VALUES
           ('Sergio', 'Izquierdo Moreno', 19, 'seizquie@gmail.com', '4a9bced82f22bfd4d4356f6707827e37233c80489fec88bd33a445c173cc76c5', '2024-05-22 13:21:48.790', 'P')
GO

INSERT INTO [dbo].[PACIENTE]
           ([NOMBRE]
           ,[APELLIDOS]
           ,[EDAD]
           ,[CORREO_ELECTRONICO]
           ,[CONTRASENA]
           ,[FECHA_REGISTRO]
           ,[ROL])
     VALUES
           ('Pablo', 'Ramos', 34, 'pablo@ejemplo.es', '81a4e2e6f173385502575515f0934b5a992de8a677c4fd82494c7c7920f2b281', '2024-05-27 07:17:15.140', 'P')
GO

INSERT INTO [dbo].[PACIENTE]
           ([NOMBRE]
           ,[APELLIDOS]
           ,[EDAD]
           ,[CORREO_ELECTRONICO]
           ,[CONTRASENA]
           ,[FECHA_REGISTRO]
           ,[ROL])
     VALUES
           ('Enrique', 'Soto', 49, 'enrique@ejemplo.es', 'bb619105049ca3cf690aaf863e42a5e28539daf5f32aa565329dd654bd5c4e8f', '2024-05-27 07:17:39.713', 'P')
GO

INSERT INTO [dbo].[PACIENTE]
           ([NOMBRE]
           ,[APELLIDOS]
           ,[EDAD]
           ,[CORREO_ELECTRONICO]
           ,[CONTRASENA]
           ,[FECHA_REGISTRO]
           ,[ROL])
     VALUES
           ('Jose', 'Iglesias', 19, 'jose@ejemplo.es', '45caf7cf8bb39dfafde7618fc4c06391db96b77a2b957e72e1f5589d2a23c508', '2024-05-27 07:18:30.890', 'P')
GO

INSERT INTO [dbo].[PACIENTE]
           ([NOMBRE]
           ,[APELLIDOS]
           ,[EDAD]
           ,[CORREO_ELECTRONICO]
           ,[CONTRASENA]
           ,[FECHA_REGISTRO]
           ,[ROL])
     VALUES
           ('Hector', 'Martinez', 29, 'hector@ejemplo.es', '48666084e35a5a5cdedbdadc7e2c6d1f1e57903bdc0f11e467b824cd214b3c10', '2024-05-27 07:18:59.393', 'P')
GO

INSERT INTO [dbo].[PACIENTE]
           ([NOMBRE]
           ,[APELLIDOS]
           ,[EDAD]
           ,[CORREO_ELECTRONICO]
           ,[CONTRASENA]
           ,[FECHA_REGISTRO]
           ,[ROL])
     VALUES
           ('Silvia', 'Izquierdo', 22, 'silvia@ejemplo.es', 'ec3210d4549919e5e195b71b8361aae495feef01fc1bebae7d49e691a9ddba84', '2024-05-27 07:19:15.587', 'P')
GO

INSERT INTO [dbo].[PACIENTE]
           ([NOMBRE]
           ,[APELLIDOS]
           ,[EDAD]
           ,[CORREO_ELECTRONICO]
           ,[CONTRASENA]
           ,[FECHA_REGISTRO]
           ,[ROL])
     VALUES
           ('Raquel', 'Izquierdo', 27, 'raquel@ejemplo.es', 'f426b4df53f633c8ecbff9d89c4e7ca050b5f346f01d89c4e62dce913e0804df', '2024-05-27 07:19:36.817', 'P')
GO

INSERT INTO [dbo].[PACIENTE]
           ([NOMBRE]
           ,[APELLIDOS]
           ,[EDAD]
           ,[CORREO_ELECTRONICO]
           ,[CONTRASENA]
           ,[FECHA_REGISTRO]
           ,[ROL])
     VALUES
           ('Juan', 'Golondrina', 79, 'juan@ejemplo.es', '5b065b0996c44ab2e641e24472b28d3e38554ce13d06d72b1aa93480dda21d43', '2024-05-27 07:19:56.330', 'P')
GO

INSERT INTO [dbo].[PACIENTE]
           ([NOMBRE]
           ,[APELLIDOS]
           ,[EDAD]
           ,[CORREO_ELECTRONICO]
           ,[CONTRASENA]
           ,[FECHA_REGISTRO]
           ,[ROL])
     VALUES
           ('Diego', 'Ruiz', 34, 'diego@ejemplo.es', '01e362a576c9d71a767c2d69d0477ca63002e6722d62eb72352b62195d1500c9', '2024-06-06 06:22:51.720', 'P')
GO

INSERT INTO [dbo].[PACIENTE]
           ([NOMBRE]
           ,[APELLIDOS]
           ,[EDAD]
           ,[CORREO_ELECTRONICO]
           ,[CONTRASENA]
           ,[FECHA_REGISTRO]
           ,[ROL])
     VALUES
           ('Juan', 'García', 45, 'juanito@ejemplo.es', '5b065b0996c44ab2e641e24472b28d3e38554ce13d06d72b1aa93480dda21d43', '2024-06-06 06:23:35.687', 'P')
GO

INSERT INTO [dbo].[PACIENTE]
           ([NOMBRE]
           ,[APELLIDOS]
           ,[EDAD]
           ,[CORREO_ELECTRONICO]
           ,[CONTRASENA]
           ,[FECHA_REGISTRO]
           ,[ROL])
     VALUES
           ('Manuel', 'Lama', 68, 'manolo@ejemplo.es', '7a407bf4b43aabe8dd5f1d354bd57c1f62fe16dff9e253da90f31dfabd608076', '2024-06-06 06:24:06.230', 'P')
GO

USE [ProyectoIntegrado]
GO

/****** Object:  Table [dbo].[MEDICO]    Script Date: 06/06/2024 8:39:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MEDICO](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	  NOT NULL,
	  NOT NULL,
	  NOT NULL,
	[HORARIO_LABORAL] [varchar](11) NOT NULL,
	[CORREO_ELECTRONICO] [varchar](100) NOT NULL,
	  NOT NULL,
	[FECHA_REGISTRO] [datetime] NOT NULL,
	  NOT NULL,
 CONSTRAINT [PK_MEDICO] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

INSERT INTO [dbo].[MEDICO]
           ([NOMBRE]
           ,[APELLIDOS]
           ,[ESPECIALIDAD]
           ,[HORARIO_LABORAL]
           ,[CORREO_ELECTRONICO]
           ,[CONTRASENA]
           ,[FECHA_REGISTRO]
           ,[ROL])
     VALUES
           ('nini', 'nini', 'Neumologo', '22:00-23:00', 'nini@ejemplo.es', 'cb6d23ac297720093a4be4c1fa39a507fe02aad24a96904bb9a14e929dafdea5', '2024-05-20 12:07:15.937', 'M'),
           ('María', 'García', 'Cardiologa', '11:00-20:00', 'maria@ejemplo.es', '2cf4dfd593eff7369ff907f11a49e782466ffafca801bef4a9d7fcbba262ef13', '2024-05-27 07:22:04.720', 'M'),
           ('Carlos', 'Pérez', 'Dermatólogo', '11:00-20:00', 'carlos@ejemplo.com', 'b9514f81bd1bd7ad93b66a3fb03b4245a399dcba8f8947dd5bb607bc8c2fb2e2', '2024-06-06 06:16:59.443', 'M'),
           ('Ana', 'López', 'Pediatra', '09:00-18:00', 'ana@ejemplo.es', '482673bdd029354608338c077b71e987ba5571dfe7cd87329c50df73eae34fac', '2024-06-06 06:17:30.543', 'M'),
           ('Javier', 'Fernández', 'Oftalmólogo', '10:00-19:00', 'javier@ejemplo.es', 'd7ab5f740662f1b579501621e952963462bbce4b1c9e963a025c7d8b3ed21cdc', '2024-06-06 06:18:05.697', 'M'),
           ('Lucía', 'Martínez', 'Neuróloga', '07:00-15:00', 'lucia@ejemplo.es', 'eec61f75d186d07a21017f52bddb72b0323aebfdf8a748b84a8a8588fbb0b65c', '2024-06-06 06:18:42.840', 'M'),
           ('Miguel', 'González', 'Ginecólogo', '12:00-21:00', 'miguel@ejemplo.es', '0ecccc89d8559278e3b6de2db5676fe9854c82166c471b40359d49626c670201', '2024-06-06 06:19:17.760', 'M'),
           ('Laura', 'Hernández', 'Oncóloga', '08:00-17:00', 'laura@ejemplo.es', '9b90295825aa9d31e5bd10add837d8d0488cb1b0d23bf797fbf8fb11d4b7457a', '2024-06-06 06:19:51.343', 'M'),
           ('David', 'Ruiz', 'Traumatólogo', '09:00-18:00', 'david@ejemplo.es', 'f96b28548cde7a2c7c81aeb6c20508487197143a4c17a097d3766bc7a9f56ed3', '2024-06-06 06:20:36.903', 'M'),
           ('Isabel', 'Moreno', 'Endocrinóloga', '10:00-19:00', 'isabel@ejemplo.es', '09e56d9c5ba02f93f4f8cfc59440381ff1b45c9b1ecb85630d7f099114ca87a7', '2024-06-06 06:21:08.520', 'M'),
           ('Francisco', 'Ramírez', 'Psiquiatra', '11:00-22:00', 'francisco@ejemplo.es', '92075eae0dbaf8d885acc2cf22f2b76512cbe38699ab149b8a61131549d3967a', '2024-06-06 06:21:40.560', 'M')
GO

USE [ProyectoIntegrado]
GO

/****** Object:  Table [dbo].[SINTOMA]    Script Date: 06/06/2024 8:42:12 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SINTOMA](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	  NOT NULL,
	  NOT NULL,
 CONSTRAINT [PK_SINTOMA] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

INSERT INTO [dbo].[SINTOMA] ([NOMBRE], [TIPO])
VALUES
    ('Dolor de cabeza', 'Físico'),
    ('Mareos', 'Físico'),
    ('Visión borrosa', 'Físico'),
    ('Fatiga', 'Físico'),
    ('Pérdida temporal del conocimiento', 'Físico'),
    ('Sensación de desmayo', 'Físico'),
    ('Aumento de la sed', 'Físico'),
    ('Micción frecuente', 'Físico'),
    ('Debilidad muscular', 'Físico'),
    ('Dolor torácico', 'Físico'),
    ('Falta de aire', 'Físico'),
    ('Náuseas', 'Físico'),
    ('Sudoración excesiva', 'Físico'),
    ('Hinchazón en las piernas, tobillos o abdomen', 'Físico'),
    ('Confusión', 'Físico'),
    ('Tos seca o con flema', 'Físico'),
    ('Dolor en el pecho al respirar o toser', 'Físico'),
    ('Fiebre', 'Físico'),
    ('Escalofríos y temblores', 'Físico'),
    ('Tos con flema amarilla, verde o marrón', 'Físico'),
    ('Sensación de que el corazón late de forma irregular', 'Físico'),
    ('Palpitaciones', 'Físico'),
    ('Debilidad o entumecimiento en la cara, brazo o pierna, especialmente en un lado del cuerpo', 'Físico'),
    ('Problemas de visión en uno o ambos ojos', 'Físico'),
    ('Producción excesiva de esputo', 'Físico'),
    ('Tos persistente', 'Físico'),
    ('Cambios extremos de humor', 'Mental'),
    ('Periodos de alta energía', 'Mental'),
    ('Periodos de depresión', 'Mental'),
    ('Problemas de sueño', 'Mental'),
    ('Preocupación excesiva', 'Mental'),
    ('Inquietud', 'Mental'),
    ('Dificultad para concentrarse', 'Mental')
GO

USE [ProyectoIntegrado]
GO

/****** Object:  Table [dbo].[FAMILIA_MEDICAMENTO]    Script Date: 06/06/2024 8:43:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FAMILIA_MEDICAMENTO](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	  NOT NULL,
	  NULL,
 CONSTRAINT [PK_FAMILIA_MEDICAMENTO] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

INSERT INTO [dbo].[FAMILIA_MEDICAMENTO] ([NOMBRE], [DESCRIPCION])
VALUES
    ('Antagonista del receptor de angiotensina II', 'Utilizados principalmente para tratar la hipertensión y algunas enfermedades renales crónicas.'),
    ('Antidiabéticos', 'Se clasificaría en la familia de los agentes antidiabéticos, utilizados para el tratamiento de la diabetes mellitus.'),
    ('Estabilizador del estado de ánimo', 'Comúnmente utilizado en el tratamiento del trastorno bipolar.'),
    ('Diurético', 'Se utiliza para tratar la insuficiencia cardíaca, entre otras condiciones.'),
    ('Agente estimulante de la eritropoyesis', 'Es una citocina glucoproteica que estimula la formación de eritrocitos y es el principal agente estimulador de la eritropoyesis natural.'),
    ('Salicilatos', 'Se utiliza como medicamento para tratar el dolor, la fiebre y la inflamación, debido a su efecto inhibitorio, no selectivo, de la ciclooxigenasa.'),
    ('Inhibidores de la neuraminidasa', 'Funciona por medio de detener la propagación del virus de influenza en el cuerpo.'),
    ('Antibiótico', 'Funcionan matando las bacterias o dificultando su crecimiento y multiplicación.'),
    ('Antiarrítimico', 'Se utilizan para tratar las alteraciones del ritmo cardíaco denominadas arritmias y para aliviar los síntomas relacionados con ellas.'),
    ('Corticoide', 'Estas sustancias son esenciales para la vida y regulan funciones cardiovasculares, metabólicas, inmunológicas, y homeostáticas.'),
    ('Inhibidor selectivo de la recaptación de serotonina', NULL),
    ('Antagonistas del receptor de la aldosterona', NULL),
    ('Inhibidores de la enzima convertidora de la angiotensina (ACE)', NULL),
    ('Trombolíticos', NULL),
    ('Broncodilatador anticolinérgico.', NULL)
GO

USE [ProyectoIntegrado]
GO

/****** Object:  Table [dbo].[MEDICAMENTO]    Script Date: 06/06/2024 8:45:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[MEDICAMENTO](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_FAMILIA_MEDICAMENTO] [int] NOT NULL,
	  NOT NULL,
	  NULL,
	[PRECIO] [decimal](18, 2) NOT NULL,
 CONSTRAINT [PK_MEDICAMENTO] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[MEDICAMENTO]  WITH CHECK ADD  CONSTRAINT [FK_MEDICAMENTO_FAMILIA_MEDICAMENTO] FOREIGN KEY([ID_FAMILIA_MEDICAMENTO])
REFERENCES [dbo].[FAMILIA_MEDICAMENTO] ([ID])
GO

ALTER TABLE [dbo].[MEDICAMENTO] CHECK CONSTRAINT [FK_MEDICAMENTO_FAMILIA_MEDICAMENTO]
GO

-- Obtener los IDs de la tabla FAMILIA_MEDICAMENTO
DECLARE @AntagonistaAngiotensinaII INT,
        @Antidiabeticos INT,
        @EstabilizadorEstadoAnimo INT,
        @Diuretico INT,
        @AgenteEstimulanteEritropoyesis INT,
        @Salicilatos INT,
        @InhibidoresNeuraminidasa INT,
        @Antibiotico INT,
        @Antiarrítmico INT,
        @Corticoide INT,
        @InhibidorSelectivoSerotonina INT,
        @AntagonistasReceptorAldosterona INT,
        @InhibidoresEnzimaConvertidoraAngiotensina INT,
        @Tromboliticos INT,
        @BroncodilatadorAnticolinergico INT,
        @PruebaFamilia INT;

-- Asignar los valores de los IDs
SELECT 
    @AntagonistaAngiotensinaII = ID,
    @Antidiabeticos = ID,
    @EstabilizadorEstadoAnimo = ID,
    @Diuretico = ID,
    @AgenteEstimulanteEritropoyesis = ID,
    @Salicilatos = ID,
    @InhibidoresNeuraminidasa = ID,
    @Antibiotico = ID,
    @Antiarrítmico = ID,
    @Corticoide = ID,
    @InhibidorSelectivoSerotonina = ID,
    @AntagonistasReceptorAldosterona = ID,
    @InhibidoresEnzimaConvertidoraAngiotensina = ID,
    @Tromboliticos = ID,
    @BroncodilatadorAnticolinergico = ID,
    @PruebaFamilia = ID
FROM FAMILIA_MEDICAMENTO
WHERE NOMBRE IN (
    'Antagonista del receptor de angiotensina II',
    'Antidiabéticos',
    'Estabilizador del estado de ánimo',
    'Diurético',
    'Agente estimulante de la eritropoyesis',
    'Salicilatos',
    'Inhibidores de la neuraminidasa',
    'Antibiótico',
    'Antiarrítimico',
    'Corticoide',
    'Inhibidor selectivo de la recaptación de serotonina',
    'Antagonistas del receptor de la aldosterona',
    'Inhibidores de la enzima convertidora de la angiotensina (ACE)',
    'Trombolíticos',
    'Broncodilatador anticolinérgico.',
    'PruebaFamilia'
);

-- Insertar registros en la tabla MEDICAMENTO
INSERT INTO MEDICAMENTO (ID_FAMILIA_MEDICAMENTO, NOMBRE, DESCRIPCION, PRECIO)
VALUES
    (@AntagonistaAngiotensinaII, 'Losartán', 'Medicamento que se usa para tratar la presión arterial alta. El losartán potásico bloquea la acción de las sustancias químicas que hacen contraer (hacer más estrechos) los vasos sanguíneos.', 7.00),
    (@AgenteEstimulanteEritropoyesis, 'Eritropoyetina', 'Sustancia fabricada naturalmente por los riñones y que estimula la médula ósea para que produzca glóbulos rojos.', 15.00),
    (@Antidiabeticos, 'Insulina', 'La insulina es una hormona liberada por el páncreas como respuesta a la presencia de glucosa en la sangre.', 7.00),
	(@Antidiabeticos, 'Desmopresina', 'Análogo sintético de la arginina vasopresina (hormona antidiurética [ADH]), con un efecto más potente y prolongado que esta, pero sin su efecto vasopresor.', 12.00),
    (@EstabilizadorEstadoAnimo, 'Litio', 'Se utiliza para tratar y prevenir los episodios de manía (ánimo frenético, anormalmente emocionado) en las personas con trastorno bipolar.', 15.00),
    (@InhibidorSelectivoSerotonina, 'Sertralina', 'Su acción consiste en aumentar la cantidad de serotonina, una sustancia natural del cerebro que ayuda a mantener el equilibrio mental.', 20.00),
	(@Salicilatos, 'Aspirina', 'Su acción consiste en detener la producción de ciertas sustancias naturales que causan fiebre, dolor, inflamación y coágulos sanguíneos.', 10.00),
	(@AntagonistasReceptorAldosterona, 'Espironolactona', 'Hace que los riñones eliminen en la orina el agua y el sodio innecesarios del cuerpo, pero reduce la pérdida de potasio del cuerpo.', 7.00),
	(@InhibidoresNeuraminidasa, 'Oseltamivir', 'Estos medicamentos previenen la propagación del virus de la gripe dentro del cuerpo. Ayudan a aliviar o a prevenir los síntomas de la infección por el virus de la gripe.', 25.00),
	(@Antibiotico, 'Azitromicina', 'Su acción consiste en detener el crecimiento de las bacterias. Los antibióticos como la azitromicina no actúan para combatir resfriados, influenza u otras infecciones virales.', 8.00),
    (@InhibidoresEnzimaConvertidoraAngiotensina, 'Enalapril', 'Controla la presión arterial alta y la insuficiencia cardíaca, pero no las cura. Siga tomando el enalapril aunque se sienta bien.', 3.00),    
    (@Antiarrítmico, 'Amiodarona', 'Medicamento que se usa para tratar ciertos tipos de ritmos cardíacos anormales que no mejoraron con otros medicamentos. El clorhidrato de amiodarona afecta la actividad eléctrica del corazón. Es un tipo de antiarrítmico. También se llama Corderone.', 15.00),
    (@Diuretico, 'Manitol', 'Medicamento usado para disminuir la inflamación del cerebro y para tratar la insuficiencia renal.', 7.00),
    (@Tromboliticos, 'Alteplasa', 'Forma de activador del plasminógeno tisular que se produce en el laboratorio. Ayuda a disolver los coágulos de sangre y se usa para tratar ataques cardíacos, accidentes cerebrovasculares y coágulos en los pulmones.', 600.00),
    (@BroncodilatadorAnticolinergico, 'Tiotropio', 'El tiotropio pertenece a una clase de medicamentos llamados broncodilatadores. Actúa relajando y abriendo las vías respiratorias que van a los pulmones para facilitar la respiración.', 50.00),
    (@Corticoide, 'Prednisona', 'Se utiliza para tratar una variedad de condiciones médicas, incluyendo trastornos inflamatorios, alergias, enfermedades autoinmunes y algunos tipos de cáncer.', 6.00)
;
    
    
    
USE [ProyectoIntegrado]
GO

/****** Object:  Table [dbo].[FAMILIA_ENFERMEDAD]    Script Date: 06/06/2024 9:04:42 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[FAMILIA_ENFERMEDAD](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[NOMBRE] [varchar](50) NOT NULL,
	[TIPO] [varchar](50) NOT NULL,
	[DESCRIPCION] [varchar](255) NULL,
 CONSTRAINT [PK_FAMILIA_ENFERMEDAD] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO


INSERT INTO [dbo].[FAMILIA_ENFERMEDAD] ([NOMBRE], [TIPO], [DESCRIPCION])
VALUES ('Hipertensión', 'Tastorno cardiovascular', 'Enfermedad caracterizada por una presión arterial elevada.'),
       ('Diabetes', 'Trastorno Metabólico', 'Enfermedad metabólica que resulta en niveles elevados de azúcar en la sangre.'),
       ('Arteriosclerosis Coronaria', 'Enfermedad Cardiovascular', 'Enfermedades que afectan a las arterias coronarias, que suministran sangre al músculo cardíaco.'),
       ('Depresión Mental', 'Trastorno del Estado de Ánimo', 'Trastorno del estado de ánimo que provoca sentimientos persistentes de tristeza y pérdida de interés.'),
       ('Neumonía', 'Infección Pulmonar', 'Infección respiratoria que inflama los sacos aéreos de los pulmones.'),
       ('Insuficiencia Cardíaca Congestiva', 'Trastorno Cardiaco', 'Condición crónica en la que el corazón no puede bombear suficiente sangre para satisfacer las necesidades del cuerpo.'),
       ('Accidente Cerebrovascular', 'Trastorno Cerebrovascular', 'Interrupción del flujo sanguíneo al cerebro, lo que causa daño cerebral.'),
       ('Asma', 'Trastorno Respiratorio', 'Enfermedad crónica de las vías respiratorias que causa dificultad para respirar.');

USE [ProyectoIntegrado]
GO

/****** Object:  Table [dbo].[ENFERMEDAD]    Script Date: 06/06/2024 9:06:23 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[ENFERMEDAD](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_FAMILIA_ENFERMEDAD] [int] NOT NULL,
	[NOMBRE] [varchar](50) NOT NULL,
 CONSTRAINT [PK_ENFERMEDAD] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[ENFERMEDAD]  WITH CHECK ADD  CONSTRAINT [FK_ENFERMEDAD_FAMILIA_ENFERMEDAD] FOREIGN KEY([ID_FAMILIA_ENFERMEDAD])
REFERENCES [dbo].[FAMILIA_ENFERMEDAD] ([ID])
GO

ALTER TABLE [dbo].[ENFERMEDAD] CHECK CONSTRAINT [FK_ENFERMEDAD_FAMILIA_ENFERMEDAD]
GO


-- Obtener los IDs de la tabla FAMILIA_ENFERMEDAD
DECLARE @Hipertension INT,
        @Diabetes INT,
        @DepresionMental INT,
        @ArteriosclerosisCoronaria INT,
        @Neumonia INT,
        @InsuficienciaCardiacaCongestiva INT,
        @AccidenteCerebrovascular INT,
        @Asma INT;

-- Asignar los valores de los IDs
SELECT 
    @Hipertension = ID,
    @Diabetes = ID,
    @DepresionMental = ID,
    @ArteriosclerosisCoronaria = ID,
    @Neumonia = ID,
    @InsuficienciaCardiacaCongestiva = ID,
    @AccidenteCerebrovascular = ID,
    @Asma = ID
FROM FAMILIA_ENFERMEDAD
WHERE NOMBRE IN (
    'Hipertensión',
    'Diabetes',
    'Depresión Mental',
    'Arteriosclerosis Coronaria',
    'Neumonía',
    'Insuficiencia Cardiaca Congestiva',
    'Accidente Cerebrovascular',
    'Asma'
);

-- Insertar registros en la tabla enfermedad
INSERT INTO ENFERMEDAD (ID_FAMILIA_ENFERMEDAD, NOMBRE)
VALUES
    (@Hipertension, 'Hipertensión'),
    (@Hipertension, 'Sincope hipotensivo'),
    (@Diabetes, 'Diabetes Gestacional'),
    (@Diabetes, 'Diabetes Insípida'),
    (@DepresionMental, 'Trastorno Bipolar'),
    (@DepresionMental, 'Trastorno de Ansiedad'),
    (@ArteriosclerosisCoronaria, 'Infarto de Miocardio'),
    (@ArteriosclerosisCoronaria, 'Insuficiencia Cardíaca'),
    (@Neumonia, 'Neumonía Viral'),
    (@Neumonia, 'Neumonía Bacteriana'),
    (@InsuficienciaCardiacaCongestiva, 'Cardiomiopatía'),
    (@AccidenteCerebrovascular, 'Arritmia Cardiaca'),
    (@Asma, 'Hemorragia Cerebral'),
    (@Asma, 'Isquemia Cerebral'),
    (@Asma, 'Enfermedad Pulmonar Obstructiva Crónica (EPOC)'),
    (@Asma, 'Bronquitis Crónica')
;

USE [ProyectoIntegrado]
GO

/****** Object:  Table [dbo].[SINTOMA_ENFERMEDAD]    Script Date: 06/06/2024 9:14:38 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SINTOMA_ENFERMEDAD](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_ENFERMEDAD] [int] NOT NULL,
	[ID_SINTOMA] [int] NOT NULL,
 CONSTRAINT [PK_SINTOMA_ENFERMEDAD] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[SINTOMA_ENFERMEDAD]  WITH CHECK ADD  CONSTRAINT [FK_SINTOMA_ENFERMEDAD_ENFERMEDAD] FOREIGN KEY([ID_ENFERMEDAD])
REFERENCES [dbo].[ENFERMEDAD] ([ID])
GO

ALTER TABLE [dbo].[SINTOMA_ENFERMEDAD] CHECK CONSTRAINT [FK_SINTOMA_ENFERMEDAD_ENFERMEDAD]
GO

ALTER TABLE [dbo].[SINTOMA_ENFERMEDAD]  WITH CHECK ADD  CONSTRAINT [FK_SINTOMA_ENFERMEDAD_SINTOMA] FOREIGN KEY([ID_SINTOMA])
REFERENCES [dbo].[SINTOMA] ([ID])
GO

ALTER TABLE [dbo].[SINTOMA_ENFERMEDAD] CHECK CONSTRAINT [FK_SINTOMA_ENFERMEDAD_SINTOMA]
GO


-- Insertar dinámicamente el ID de enfermedad y síntoma por su nombre
INSERT INTO SINTOMA_ENFERMEDAD (ID_ENFERMEDAD, ID_SINTOMA)
VALUES 
    -- Hipertensión - Dolor de cabeza
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Hipertensión'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Dolor de cabeza')
    ),
    -- Hipertensión - Mareos
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Hipertensión'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Mareos')
    ),
    -- Hipertensión - Visión borrosa
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Hipertensión'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Visión borrosa')
    ),
    -- Hipertensión - Fatiga
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Hipertensión'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Fatiga')
    ),
    -- Hipertensión - Pérdida temporal del conocimiento
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Hipertensión'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Pérdida temporal del conocimiento')
    ),
    -- Sincope hipotensivo - Sensación de desmayo
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Sincope hipotensivo'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Sensación de desmayo')
    ),
    -- Diabetes Gestacional - Aumento de la sed
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Diabetes Gestacional'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Aumento de la sed')
    ),
    -- Diabetes Gestacional - Micción frecuente
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Diabetes Gestacional'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Micción frecuente')
    ),
    -- Diabetes Insípida - Aumento de la sed
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Diabetes Insípida'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Aumento de la sed')
    ),
    -- Diabetes Insípida - Micción frecuente
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Diabetes Insípida'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Micción frecuente')
    ),
    -- Trastorno Bipolar - Cambios extremos de humor
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Trastorno Bipolar'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Cambios extremos de humor')
    ),
    -- Trastorno Bipolar - Periodos de alta energía
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Trastorno Bipolar'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Periodos de alta energía')
    ),
    -- Trastorno de Ansiedad - Preocupación excesiva
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Trastorno de Ansiedad'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Preocupación excesiva')
    ),
    -- Trastorno de Ansiedad - Inquietud
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Trastorno de Ansiedad'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Inquietud')
    ),
    -- Infarto de Miocardio - Dolor torácico
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Infarto de Miocardio'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Dolor torácico')
    ),
    -- Infarto de Miocardio - Falta de aire
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Infarto de Miocardio'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Falta de aire')
    ),
    -- Insuficiencia Cardíaca - Fatiga
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Insuficiencia Cardíaca'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Fatiga')
    ),
    -- Insuficiencia Cardíaca - Hinchazón en las piernas, tobillos o abdomen
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Insuficiencia Cardíaca'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Hinchazón en las piernas, tobillos o abdomen')
    ),
    -- Neumonía Viral - Tos seca o con flema
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Neumonía Viral'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Tos seca o con flema')
    ),
    -- Neumonía Viral - Dolor en el pecho al respirar o toser
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Neumonía Viral'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Dolor en el pecho al respirar o toser')
    ),
    -- Neumonía Bacteriana - Fiebre
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Neumonía Bacteriana'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Fiebre')
    ),
    -- Neumonía Bacteriana - Escalofríos y temblores
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Neumonía Bacteriana'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Escalofríos y temblores')
    ),
    -- Cardiomiopatía - Tos con flema amarilla, verde o marrón
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Cardiomiopatía'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Tos con flema amarilla, verde o marrón')
    ),
    -- Cardiomiopatía - Sensación de que el corazón late de forma irregular
    (
        (SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Cardiomiopatía'),
        (SELECT ID FROM SINTOMA WHERE NOMBRE = 'Siento de que el corazón late de forma irregular')
	),
	-- Arritmia Cardiaca - Palpitaciones
	(
	(SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Arritmia Cardiaca'),
	(SELECT ID FROM SINTOMA WHERE NOMBRE = 'Palpitaciones')
	),
	-- Hemorragia Cerebral - Debilidad o entumecimiento en la cara, brazo o pierna, especialmente en un lado del cuerpo
	(
	(SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Hemorragia Cerebral'),
	(SELECT ID FROM SINTOMA WHERE NOMBRE = 'Debilidad o entumecimiento en la cara, brazo o pierna, especialmente en un lado del cuerpo')
	),
	-- Hemorragia Cerebral - Problemas de visión en uno o ambos ojos
	(	
	(SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Hemorragia Cerebral'),
	(SELECT ID FROM SINTOMA WHERE NOMBRE = 'Problemas de visión en uno o ambos ojos')
	),
	-- Isquemia Cerebral - Producción excesiva de esputo
	(
	(SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Isquemia Cerebral'),
	(SELECT ID FROM SINTOMA WHERE NOMBRE = 'Producción excesiva de esputo')
	),
	-- Isquemia Cerebral - Tos persistente
	(
	(SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Isquemia Cerebral'),
	(SELECT ID FROM SINTOMA WHERE NOMBRE = 'Tos persistente')
	),
	-- Enfermedad Pulmonar Obstructiva Crónica (EPOC) - Falta de aire
	(
	(SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Enfermedad Pulmonar Obstructiva Crónica (EPOC)'),
	(SELECT ID FROM SINTOMA WHERE NOMBRE = 'Falta de aire')
	),
	-- Enfermedad Pulmonar Obstructiva Crónica (EPOC) - Tos con flema amarilla, verde o marrón
	(
	(SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Enfermedad Pulmonar Obstructiva Crónica (EPOC)'),
	(SELECT ID FROM SINTOMA WHERE NOMBRE = 'Tos con flema amarilla, verde o marrón')
	),
	-- Bronquitis Crónica - Tos persistente
	(
	(SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Bronquitis Crónica'),
	(SELECT ID FROM SINTOMA WHERE NOMBRE = 'Tos persistente')
	),
	-- Bronquitis Crónica - Producción excesiva de esputo
	(
	(SELECT ID FROM ENFERMEDAD WHERE NOMBRE = 'Bronquitis Crónica'),
	(SELECT ID FROM SINTOMA WHERE NOMBRE = 'Producción excesiva de esputo')
);	

USE [ProyectoIntegrado]
GO

/****** Object:  Table [dbo].[VISITA]    Script Date: 06/06/2024 13:37:18 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[VISITA](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_PACIENTE] [int] NOT NULL,
	[ID_MEDICO] [int] NOT NULL,
	[ID_ENFERMEDAD] [int] NOT NULL,
	[ID_MEDICAMENTO] [int] NOT NULL,
	[MOTIVO] [varchar](200) NULL,
	[FECHA_VISITA] [datetime2](7) NULL,
 CONSTRAINT [PK_VISITA_PACIENTE] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[VISITA]  WITH CHECK ADD  CONSTRAINT [FK_VISITA_ENFERMEDAD] FOREIGN KEY([ID_ENFERMEDAD])
REFERENCES [dbo].[ENFERMEDAD] ([ID])
GO

ALTER TABLE [dbo].[VISITA] CHECK CONSTRAINT [FK_VISITA_ENFERMEDAD]
GO

ALTER TABLE [dbo].[VISITA]  WITH CHECK ADD  CONSTRAINT [FK_VISITA_MEDICAMENTO] FOREIGN KEY([ID_MEDICAMENTO])
REFERENCES [dbo].[MEDICAMENTO] ([ID])
GO

ALTER TABLE [dbo].[VISITA] CHECK CONSTRAINT [FK_VISITA_MEDICAMENTO]
GO

ALTER TABLE [dbo].[VISITA]  WITH CHECK ADD  CONSTRAINT [FK_VISITA_MEDICO] FOREIGN KEY([ID_MEDICO])
REFERENCES [dbo].[MEDICO] ([ID])
ON DELETE CASCADE
GO

ALTER TABLE [dbo].[VISITA] CHECK CONSTRAINT [FK_VISITA_MEDICO]
GO

ALTER TABLE [dbo].[VISITA]  WITH CHECK ADD  CONSTRAINT [FK_VISITA_PACIENTE] FOREIGN KEY([ID_PACIENTE])
REFERENCES [dbo].[PACIENTE] ([ID])
GO

ALTER TABLE [dbo].[VISITA] CHECK CONSTRAINT [FK_VISITA_PACIENTE]
GO


USE [ProyectoIntegrado]
GO

/****** Object:  Table [dbo].[VISITA_SINTOMA_ENFERMEDAD]    Script Date: 06/06/2024 13:37:48 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[VISITA_SINTOMA_ENFERMEDAD](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[ID_VISITA] [int] NOT NULL,
	[ID_SINTOMA_ENFERMEDAD] [int] NOT NULL,
 CONSTRAINT [PK_VISITA_SINTOMA_ENFERMEDAD] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[VISITA_SINTOMA_ENFERMEDAD]  WITH CHECK ADD  CONSTRAINT [FK_D4687DFF] FOREIGN KEY([ID_VISITA])
REFERENCES [dbo].[VISITA] ([ID])
GO

ALTER TABLE [dbo].[VISITA_SINTOMA_ENFERMEDAD] CHECK CONSTRAINT [FK_D4687DFF]
GO

ALTER TABLE [dbo].[VISITA_SINTOMA_ENFERMEDAD]  WITH CHECK ADD  CONSTRAINT [FK_VISITA_SINTOMA_ENFERMEDAD_SINTOMA_ENFERMEDAD] FOREIGN KEY([ID_SINTOMA_ENFERMEDAD])
REFERENCES [dbo].[SINTOMA_ENFERMEDAD] ([ID])
GO

ALTER TABLE [dbo].[VISITA_SINTOMA_ENFERMEDAD] CHECK CONSTRAINT [FK_VISITA_SINTOMA_ENFERMEDAD_SINTOMA_ENFERMEDAD]
GO

ALTER TABLE [dbo].[VISITA_SINTOMA_ENFERMEDAD]  WITH CHECK ADD  CONSTRAINT [FK_VISITA_SINTOMA_ENFERMEDAD_VISITA] FOREIGN KEY([ID_VISITA])
REFERENCES [dbo].[VISITA] ([ID])
GO

ALTER TABLE [dbo].[VISITA_SINTOMA_ENFERMEDAD] CHECK CONSTRAINT [FK_VISITA_SINTOMA_ENFERMEDAD_VISITA]
GO


