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
