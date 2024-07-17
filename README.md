# Proyecto Integrado (Aplicación de Salud Médica)

# Índice

1. [Introducción](#introducción)

2. [Tecnologías Utilizadas](#tecnologías-utilizadas)
   - [Angular](#angular)
   - [C# y NHibernate](#c-y-nhibernate)
   - [Librería de Machine Learning en C#](#librería-de-machine-learning-en-c)
     
3. [Arquitectura de la Aplicación](#arquitectura-de-la-aplicación)
   
4. [Descripción de Funcionalidades](#descripción-de-funcionalidades)
   - [Registro e Inicio de Sesión](#registro-e-inicio-de-sesión)
   - [Gestión de Perfiles](#gestión-de-perfiles)
   - [Gestión de Medicación](#gestión-de-medicación)
   - [Gestión de Citas](#gestión-de-citas)
     
5. [Configuración de la Base de Datos](#configuración-de-la-base-de-datos)
   - [Scripts de la Base de Datos](#scripts-de-la-base-de-datos)
     
6. [Conclusión](#conclusión)
   
7. [Flujo para Pacientes](#flujo-para-pacientes)
   - [Registro del Paciente](#registro-del-paciente)
   - [Inicio de Sesión del Paciente](#inicio-de-sesión-del-paciente)
   - [Perfil del Paciente](#perfil-del-paciente)
   - [Consulta de Medicamentos](#consulta-de-medicamentos)
   - [Consulta de Enfermedades](#consulta-de-enfermedades)
   - [Consulta de Historial de Visitas](#consulta-de-historial-de-visitas)
     
8. [Flujo para Profesionales de la Salud](#flujo-para-profesionales-de-la-salud)
   - [Registro del Médico](#registro-del-médico)
   - [Inicio de Sesión del Médico](#inicio-de-sesión-del-médico)
   - [Perfil del Médico](#perfil-del-médico)
   - [Gestión de Citas](#gestión-de-citas)
   - [Consulta de Medicamentos](#consulta-de-medicamentos)
   - [Consulta de Enfermedades](#consulta-de-enfermedades)
     
---

## Introducción

Este proyecto consiste en el desarrollo de una aplicación de salud médica que permite la gestión de perfiles, citas y medicación tanto para pacientes como para profesionales de la salud. La aplicación se desarrollará utilizando tecnologías modernas como Angular para el frontend, C# con NHibernate para el backend, y ML.NET para la predicción y análisis de datos médicos.

## Tecnologías Utilizadas

### Angular

**Qué es Angular:** Angular es un framework de desarrollo de aplicaciones web de código abierto mantenido por Google. Está diseñado para facilitar la creación de aplicaciones web dinámicas y de alta calidad mediante la utilización de TypeScript. En este proyecto, he utilizado Angular 16 y NodeJS 16.14.0.

**Principales Beneficios de Angular:**
- **Component-Based Architecture:** Permite una mejor organización y reutilización del código.
- **Two-Way Data Binding:** Facilita la sincronización entre el modelo y la vista.
- **Dependency Injection:** Promueve la modularidad y la facilidad de pruebas.
- **Rich Ecosystem:** Amplia colección de herramientas y bibliotecas integradas.
- **Active Community and Support:** Gran comunidad de desarrolladores y soporte continuo de Google.

### C# y NHibernate

**Qué es C#:** C# es un lenguaje de programación orientado a objetos desarrollado por Microsoft como parte de su plataforma .NET. Es conocido por su robustez, facilidad de uso y amplia compatibilidad con diferentes tipos de aplicaciones.

**Qué es NHibernate:** NHibernate es una herramienta de mapeo objeto-relacional (ORM) para la plataforma .NET. Permite a los desarrolladores trabajar con bases de datos utilizando objetos de C# en lugar de sentencias SQL.

En la solución del backend, además del API REST ProyectoIntegrado, hay un Windows Form llamado NHTools que asegura que la base de datos esté correctamente configurada. Esta herramienta puede mostrar un error de validación debido a problemas de versiones en el dialecto con SQL, pero si falta alguna tabla, campo o clave en la base de datos, NHTools lo notifica y genera el SQL necesario para solucionarlo.

**Principales Beneficios de NHibernate:**
- **Abstracción del SQL:** Facilita la interacción con la base de datos sin necesidad de escribir SQL manualmente.
- **Mantenimiento Simplificado:** Reduce la cantidad de código boilerplate y mejora la mantenibilidad.
- **Soporte para Transacciones:** Gestión avanzada de transacciones y concurrencia.
- **Mapeo Flexible:** Soporta un mapeo complejo de objetos a tablas de la base de datos.

### ML.NET

**Qué es ML.NET:** ML.NET es una biblioteca de machine learning de código abierto desarrollada por Microsoft para .NET. Permite a los desarrolladores de .NET crear, entrenar y desplegar modelos de machine learning utilizando C# o F#.

**Algoritmo de Regresión en ML.NET:** La regresión es un tipo de algoritmo de machine learning utilizado para predecir un valor continuo. En ML.NET, los algoritmos de regresión permiten hacer predicciones basadas en datos históricos, útil para tareas como la predicción de medicamentos, enfermedades, estimación de dosis de medicación, etc.

**Principales Beneficios de ML.NET:**
- **Integración Nativa con .NET:** Facilita el uso de machine learning en aplicaciones .NET existentes.
- **Amplia Gama de Algoritmos:** Soporte para varios tipos de algoritmos de machine learning, incluyendo regresión, clasificación, clustering, etc.
- **Entrenamiento y Evaluación:** Herramientas integradas para el entrenamiento y evaluación de modelos.
- **Despliegue Sencillo:** Permite el despliegue de modelos entrenados directamente en aplicaciones .NET.

## Arquitectura de la Aplicación

- **Frontend (Cliente)**
  - Desarrollado con Angular.
  - Manejo de la interfaz de usuario, navegación y lógica de presentación.
  - Consumo de API RESTful para interactuar con el backend.

- **Backend (Servidor)**
  - Desarrollado con C# y .NET.
  - Uso de NHibernate para la interacción con la base de datos.
  - Exposición de API RESTful para ser consumidas por el frontend.

- **Machine Learning**
  - Integración de ML.NET para tareas de predicción y análisis de datos.
  - Implementación de algoritmos de regresión para la predicción de valores continuos, como la estimación de parámetros médicos.

## Descripción de Funcionalidades

### Registro e Inicio de Sesión
- ** Los usuarios pueden registrarse y autenticarse en la aplicación.**

### Gestión de Perfiles
- **Los pacientes y médicos pueden crear y editar sus perfiles.**

### Gestión de Medicación
- **Los pacientes pueden ver y gestionar su medicación.**

### Gestión de Citas
- **Los médicos y pacientes pueden programar, ver, reprogramar y cancelar citas.**

## Configuración de la Base de Datos

Para la configuración de la BBDD es muy importante el archivo `hibernate.cfg.xml` alojado en la carpeta `ProyectoIntegrado/NHibernate` que contiene la configuración necesaria para conectar con NHibernate con la BBDD, siendo la línea:

```xml
<property name="connection.connection_string">Data Source=.\SQLEXPRESS;Initial Catalog=ProyectoIntegrado;Integrated Security=True</property>
```

La más importante ya que tiene el catalog que es el nombre de la base de datos y el source que en este caso accede al servidor local de SQL Express. Para ello, recomiendo instalar SQL Express y SQL Server Management Studio y ejecutar los scripts en SQL Server Management Studio.

## Scripts de la Base de Datos
He utilizado SQL Server Management Studio para la base de datos, de la cual he extraído los scripts para crear la base de datos con todas sus tablas y relaciones. Estos scripts están adjuntos en la carpeta SCRIPTS SQL. Constan de 11 scripts con títulos descriptivos de lo que hace cada uno y deben ser ejecutados en orden de 1 a 11. Además, hay un script.sql que contiene todo el código de los 11 scripts almacenado en uno solo. Puedes decidir ejecutar los 11 uno por uno o ejecutar directamente el script.sql que contiene todo.

## Conclusión
La combinación de Angular, C#, NHibernate y ML.NET ofrece una plataforma robusta, escalable y fácil de mantener para el desarrollo de aplicaciones de salud médica. Este stack tecnológico no solo garantiza una experiencia de usuario rica y fluida, sino que también proporciona capacidades avanzadas de análisis y predicción, fundamentales para mejorar la atención médica.

### Flujo para Pacientes
---
   **Registro del Paciente**

   - **El paciente abre la aplicación y selecciona "Registrarse".**
   - **Completa un formulario con información básica (nombre, edad, sexo, correo electrónico, contraseña, etc.).**
   - **El paciente confirma su correo y puede proceder a iniciar sesión.**

   **Inicio de Sesión del Paciente**

   - **El paciente abre la aplicación y selecciona "Iniciar Sesión".**
   - **Introduce su correo electrónico y contraseña.**
   - **Accede al panel de control del paciente.**

   **Perfil del Paciente**

   - **En el panel de control, el paciente selecciona "Perfil".**
   - **Puede visualizar y editar su información personal y médica.**

   **Consulta de Medicamentos**

   - **El profesional selecciona medicamentos y consulta el nombre del medicamento, su familia, precio y descripción.**

   **Consulta de Enfermedades**

   - **El profesional selecciona enfermedades y consulta el nombre de las enfermedades y su familia.**

   **Consulta de Historial de Visitas**

   - **En el panel de control, el paciente selecciona "Historial Visitas".**
   - **Puede ver el historial de citas.**

### Flujo para Profesionales de la Salud
---
   **Registro del Médico**

   - **El profesional de la salud abre la aplicación y selecciona "Registrarse".**
   - **Completa un formulario con información profesional (nombre, especialidad, correo electrónico, contraseña, etc.).**

   **Inicio de Sesión del Médico**

   - **El profesional de la salud abre la aplicación y selecciona "Iniciar Sesión".**
   - **Introduce su correo electrónico y contraseña.**
   - **Accede al panel de control del médico.**

   **Perfil del Médico**

   - **En el panel de control, el médico selecciona "Modificar Perfil".**
   - **Puede visualizar y editar su información profesional.**
   - **Actualiza horarios de consulta, correo, nombre, etc.**

   **Gestión de Citas**

   - **En el panel de control, el médico selecciona "Visitas".**
   - **Visualiza una lista de citas.**
   - **Puede confirmar, reprogramar o cancelar citas.**
   - **Para reprogramar, selecciona la cita, elige una nueva hora y fecha.**
   - **Para cancelar, selecciona la cita y elimínala.**
   - **Visualiza el historial de citas con cada paciente.**

   **Consulta de Medicamentos**

   - **El profesional selecciona medicamentos y consulta el nombre del medicamento, su familia, precio y descripción.**

   **Consulta de Enfermedades**

   - **El profesional selecciona enfermedades y consulta el nombre de las enfermedades y su familia.**
