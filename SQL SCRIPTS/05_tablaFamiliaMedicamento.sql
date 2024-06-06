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
