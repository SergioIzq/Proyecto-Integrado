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
