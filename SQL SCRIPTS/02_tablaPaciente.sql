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
