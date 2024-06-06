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
