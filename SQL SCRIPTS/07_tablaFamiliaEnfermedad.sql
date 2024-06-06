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
