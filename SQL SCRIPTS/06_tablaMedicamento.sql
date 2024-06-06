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
    
    
    

