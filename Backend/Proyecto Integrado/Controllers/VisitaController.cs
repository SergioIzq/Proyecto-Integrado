using Microsoft.AspNetCore.Mvc;
using NHibernate;
using NHibernate.Criterion;
using Proyecto_Integrado.Entidades.BBDD;
using System.Globalization;
using System.Linq.Expressions;
using System.Text.Json;
using System.Text.Json.Serialization;
using Expression = System.Linq.Expressions.Expression;

namespace Proyecto_Integrado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VisitaController : BaseController<Visita>
    {
        public VisitaController(ISessionFactory sessionFactory) : base(sessionFactory)
        {

        }

        [HttpPost]
        public override IActionResult Create([FromBody] Visita entity)
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                using (var transaction = session.BeginTransaction())
                {
                    // Obtener objetos relacionados de la base de datos
                    var paciente = session.QueryOver<Paciente>()
                        .Where(p => p.CorreoElectronico == entity.Paciente.CorreoElectronico)
                        .SingleOrDefault();

                    var medico = session.QueryOver<Medico>()
                        .Where(m => m.CorreoElectronico == entity.Medico.CorreoElectronico)
                        .SingleOrDefault();

                    var enfermedad = session.QueryOver<Enfermedad>()
                        .Where(e => e.Nombre == entity.Enfermedad.Nombre)
                        .SingleOrDefault();

                    var medicamento = session.QueryOver<Medicamento>()
                        .Where(m => m.Nombre == entity.Medicamento.Nombre)
                        .SingleOrDefault();

                    if (paciente == null || medico == null || enfermedad == null || medicamento == null)
                    {
                        return BadRequest("No se encontraron registros para los datos proporcionados.");
                    }

                    // Asignar los objetos obtenidos a la visita
                    entity.Paciente = paciente;
                    entity.Medico = medico;
                    entity.Enfermedad = enfermedad;
                    entity.Medicamento = medicamento;

                    // Verificar si el médico tiene otra visita programada en el mismo rango de tiempo
                    var visitasDelMedico = session.QueryOver<Visita>()
                        .Where(v => v.Medico.Id == medico.Id &&
                                    v.FechaVisita >= entity.FechaVisita.AddHours(-1) && // Al menos una hora antes
                                    v.FechaVisita <= entity.FechaVisita.AddHours(1))     // Al menos una hora después
                        .List();

                    if (visitasDelMedico.Any())
                    {
                        return BadRequest("El médico ya tiene otra visita programada en el mismo rango de tiempo.");
                    }

                    // Guardar la visita principal
                    session.Save(entity);

                    // Commit de la transacción para guardar la visita y sus asociaciones
                    transaction.Commit();
                }

                return OkJson(new { message = $"{typeof(Visita).Name} creado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al crear entidad: {ex.Message}");
            }
        }



        [HttpPut("updateVisita/{id}")]
        public IActionResult Update(int id, [FromBody] JsonElement json)
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                using (var transaction = session.BeginTransaction())
                {
                    // Obtener la visita existente de la base de datos
                    var existingVisita = session.Get<Visita>(id);
                    if (existingVisita == null)
                    {
                        return BadRequest($"No se encontró la visita con Id {id}");
                    }
                    
                    // Deserializar el JSON manualmente a un objeto de tipo Visita parcial
                    var entity = JsonSerializer.Deserialize<Visita>(json.ToString());
                    // Actualizar los campos de la visita con los datos recibidos del front-end, si están presentes
                    if (entity.Paciente != null)
                    {
                        existingVisita.Paciente.CorreoElectronico = entity.Paciente.CorreoElectronico;
                        // Repite el proceso para otras propiedades de Paciente según sea necesario
                    }

                    if (entity.Medico != null)
                    {
                        existingVisita.Medico.CorreoElectronico = entity.Medico.CorreoElectronico;
                        // Repite el proceso para otras propiedades de Medico según sea necesario
                    }

                    if (!string.IsNullOrEmpty(entity.Motivo))
                    {
                        existingVisita.Motivo = entity.Motivo;
                    }

                    // Actualizar enfermedad si se proporciona un nombre
                    if (entity.Enfermedad != null && !string.IsNullOrEmpty(entity.Enfermedad.Nombre))
                    {
                        var enfermedad = session.QueryOver<Enfermedad>()
                            .Where(e => e.Nombre == entity.Enfermedad.Nombre)
                            .SingleOrDefault();

                        existingVisita.Enfermedad = enfermedad ?? entity.Enfermedad;
                    }

                    // Actualizar medicamento si se proporciona un nombre
                    if (entity.Medicamento != null && !string.IsNullOrEmpty(entity.Medicamento.Nombre))
                    {
                        var medicamento = session.QueryOver<Medicamento>()
                            .Where(m => m.Nombre == entity.Medicamento.Nombre)
                            .SingleOrDefault();

                        existingVisita.Medicamento = medicamento ?? entity.Medicamento;
                    }
                    existingVisita.FechaVisita = entity.FechaVisita;

                    // Guardar los cambios en la base de datos
                    session.Update(existingVisita);
                    transaction.Commit();
                }

                return OkJson(new { message = $"{typeof(Visita).Name} actualizado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar entidad: {ex.Message}");
            }
        }



        [HttpDelete("{id}")]
        public override IActionResult Delete(int id)
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                using (var transaction = session.BeginTransaction())
                {
                    var visita = session.Get<Visita>(id);
                    if (visita == null)
                    {
                        return NotFound($"No se encontró la visita con ID {id}");
                    }

                    // Eliminar las entidades VisitaSintomaEnfermedad asociadas a la visita
                    foreach (var sintomaEnfermedad in visita.Sintomas)
                    {
                        session.Delete(sintomaEnfermedad);
                    }

                    // Eliminar la visita después de las entidades secundarias
                    session.Delete(visita);

                    transaction.Commit();
                }

                return OkJson(new { message = $"Visita con ID {id} eliminada exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar la visita: {ex.Message}");
            }
        }

        // Método para generar visitas automáticamente
        private void SeedVisitas(int cantidad)
        {
            using (var session = _sessionFactory.OpenSession())
            using (var transaction = session.BeginTransaction())
            {
                var random = new Random();

                // Crear una lista de pares coherentes de enfermedad y medicamento
                var enfermedadMedicamentoPairs = new List<(int enfermedadId, int medicamentoId)>
                    {
                        (1, 1),  // Hipertensión - Losartán
                        (2, 2),  // Sincope hipotensivo - Eritropoyetina
                        (3, 3),  // Diabetes Gestacional - Insulina
                        (4, 4),  // Diabetes Insípida - Desmopresina
                        (5, 5),  // Trastorno Bipolar - Litio
                        (6, 6),  // Trastorno de Ansiedad - Sertralina
                        (7, 7),  // Infarto de Miocardio - Aspirina
                        (8, 8),  // Insuficiencia Cardíaca - Espironolactona
                        (9, 9),  // Neumonía Viral - Oseltamivir
                        (10, 10),  // Neumonía Bacteriana - Azitromicina
                        (11, 11),  // Cardiomiopatía - Enalapril
                        (12, 12),  // Arritmia Cardiaca - Amiodarona
                        (13, 13),  // Hemorragia Cerebral - Manitol
                        (14, 14),  // Isquemia Cerebral - Alteplasa
                        (15, 15),  // Enfermedad Pulmonar Obstructiva Crónica (EPOC) - Tiotropio
                        (16, 16)  // Bronquitis Crónica - Prednisona
                    };

                for (int i = 0; i < cantidad; i++)
                {
                    DateTime fechaAleatoria = DateTime.Now.AddDays(random.Next(1, 365));

                    // Convertir la fecha aleatoria a una cadena de texto con el formato deseado
                    string fechaFormateada = fechaAleatoria.ToString("yyyy-MM-dd HH:mm:ss.fffffff");

                    // Imprimir la fecha aleatoria formateada
                    Console.WriteLine(fechaFormateada);

                    // Si necesitas usarla como DateTime nuevamente, puedes hacerlo:
                    DateTime fechaFormateadaComoDateTime = DateTime.ParseExact(fechaFormateada, "yyyy-MM-dd HH:mm:ss.fffffff", CultureInfo.InvariantCulture);
                    var pair = enfermedadMedicamentoPairs[random.Next(enfermedadMedicamentoPairs.Count)];

                    var visita = new Visita
                    {
                        Paciente = GetRandomPaciente(),
                        Medico = GetRandomMedico(),
                        Enfermedad = session.Get<Enfermedad>(pair.enfermedadId),
                        Medicamento = session.Get<Medicamento>(pair.medicamentoId),
                        FechaVisita = fechaFormateadaComoDateTime,
                        Motivo = $"Motivo de la visita {i + 1}",
                        //Sintomas = GetRandomSintomas(random.Next(1, 5)) // Generar de 1 a 5 síntomas aleatorios
                    };

                    session.Save(visita);

                    // Actualizar las entidades relacionadas
                    session.Flush(); // Guardar para que NHibernate asigne los IDs
                }

                transaction.Commit();
            }
        }
        // Endpoint para generar visitas automáticamente
        [HttpPost("seed/{cantidad}")]
        public IActionResult SeedVisitasEndpoint(int cantidad)
        {
            try
            {
                SeedVisitas(cantidad);
                return Ok(new { message = $"Se generaron {cantidad} visitas automáticamente." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Error al generar visitas automáticamente: {ex.Message}" });
            }
        }



        // Métodos para obtener entidades aleatorias
        private Paciente GetRandomPaciente()
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var pacientes = session.Query<Paciente>().Select(p => new Paciente
                {
                    Id = p.Id,
                    Nombre = p.Nombre,
                    Apellidos = p.Apellidos,
                    Edad = p.Edad,
                    CorreoElectronico = p.CorreoElectronico,
                    Contrasena = p.Contrasena,
                    FechaRegistro = p.FechaRegistro,
                    Rol = p.Rol
                }).ToList();

                var randomIndex = new Random().Next(pacientes.Count);
                return pacientes[randomIndex];
            }
        }


        private Medico GetRandomMedico()
        {
            using (var session = _sessionFactory.OpenSession())
            {
                var medicos = session.Query<Medico>().ToList();
                var randomIndex = new Random().Next(medicos.Count);
                return medicos[randomIndex];
            }
        }

        [HttpGet("getCantidad")]
        public IActionResult GetCantidad(int page, int size, string sortField, int sortOrder, [FromQuery] string filters)
        {
            try
            {
                // Deserializar los filtros desde JSON
                var filtersDictionary = JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, string>>>(filters);

                using (var session = _sessionFactory.OpenSession())
                {
                    // Alias para entidades relacionadas
                    Visita visitaAlias = null;
                    Paciente pacienteAlias = null;
                    Enfermedad enfermedadAlias = null;
                    Medicamento medicamentoAlias = null;
                    Medico medicoAlias = null;

                    // Query principal para obtener las visitas con alias
                    var query = session.QueryOver(() => visitaAlias)
                                       .JoinAlias(() => visitaAlias.Paciente, () => pacienteAlias)
                                       .JoinAlias(() => visitaAlias.Enfermedad, () => enfermedadAlias)
                                       .JoinAlias(() => visitaAlias.Medicamento, () => medicamentoAlias)
                                       .JoinAlias(() => visitaAlias.Medico, () => medicoAlias);

                    // Aplicar filtros globales si existen
                    if (filtersDictionary != null && filtersDictionary.ContainsKey("global"))
                    {
                        var globalFilter = filtersDictionary["global"];
                        if (globalFilter.ContainsKey("value") && globalFilter.ContainsKey("matchMode"))
                        {
                            string filterValue = globalFilter["value"];
                            query = ApplyGlobalFilter(query, filterValue, pacienteAlias, enfermedadAlias, medicamentoAlias, medicoAlias);
                        }
                    }

                    // Aplicar filtros específicos si existen
                    if (filtersDictionary != null)
                    {
                        foreach (var filter in filtersDictionary)
                        {
                            if (filter.Key != "global")
                            {
                                query = ApplySpecificFilter(query, filter, pacienteAlias, enfermedadAlias, medicamentoAlias, medicoAlias);
                            }
                        }
                    }

                    // Aplicar ordenamiento
                    query = ApplySorting(query, sortField, sortOrder, pacienteAlias, enfermedadAlias, medicamentoAlias, medicoAlias);

                    // Calcular el total de registros
                    var totalRecords = query.RowCount();

                    // Obtener las visitas paginadas
                    var visitas = query.Skip(page * size).Take(size).List();

                    // Mapear a DTOs
                    var visitaDTOs = visitas.Select(v => new VisitaDTO
                    {
                        Id = v.Id,
                        FechaVisita = v.FechaVisita,
                        Motivo = v.Motivo,
                        CorreoMedico = v.Medico.CorreoElectronico,
                        CorreoPaciente = v.Paciente.CorreoElectronico,
                        NombrePaciente = v.Paciente.Nombre,
                        ApellidosPaciente = v.Paciente.Apellidos,
                        EdadPaciente = v.Paciente.Edad,
                        NombreMedico = v.Medico.Nombre,
                        NombreEnfermedad = v.Enfermedad.Nombre,
                        NombreMedicamento = v.Medicamento.Nombre,
                        TotalRecords = totalRecords
                    }).ToList();

                    var options = new JsonSerializerOptions
                    {
                        ReferenceHandler = ReferenceHandler.IgnoreCycles,
                        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                    };

                    var json = JsonSerializer.Serialize(visitaDTOs, options);

                    return Ok(json);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener visitas por cantidad: {ex.Message}");
            }
        }

        private IQueryOver<Visita, Visita> ApplyGlobalFilter(IQueryOver<Visita, Visita> query, string filterValue, Paciente pacienteAlias, Enfermedad enfermedadAlias, Medicamento medicamentoAlias, Medico medicoAlias)
        {
            return query.Where(
                Restrictions.On(() => pacienteAlias.Nombre).IsLike(filterValue, MatchMode.Anywhere) ||
                Restrictions.On(() => pacienteAlias.Apellidos).IsLike(filterValue, MatchMode.Anywhere) ||
                Restrictions.On(() => pacienteAlias.CorreoElectronico).IsLike(filterValue, MatchMode.Anywhere) ||
                Restrictions.On(() => enfermedadAlias.Nombre).IsLike(filterValue, MatchMode.Anywhere) ||
                Restrictions.On(() => medicamentoAlias.Nombre).IsLike(filterValue, MatchMode.Anywhere) ||
                Restrictions.On(() => medicoAlias.Nombre).IsLike(filterValue, MatchMode.Anywhere) ||
                Restrictions.On(() => medicoAlias.CorreoElectronico).IsLike(filterValue, MatchMode.Anywhere)
            );
        }

        private IQueryOver<Visita, Visita> ApplySpecificFilter(IQueryOver<Visita, Visita> query, KeyValuePair<string, Dictionary<string, string>> filter, Paciente pacienteAlias, Enfermedad enfermedadAlias, Medicamento medicamentoAlias, Medico medicoAlias)
        {
            switch (filter.Key)
            {
                case "CorreoPaciente":
                    return query.Where(Restrictions.On(() => pacienteAlias.CorreoElectronico).IsLike(filter.Value["value"], MatchMode.Anywhere));
                case "NombreEnfermedad":
                    return query.Where(Restrictions.On(() => enfermedadAlias.Nombre).IsLike(filter.Value["value"], MatchMode.Anywhere));
                case "NombrePaciente":
                    return query.Where(Restrictions.On(() => pacienteAlias.Nombre).IsLike(filter.Value["value"], MatchMode.Anywhere));
                case "ApellidosPaciente":
                    return query.Where(Restrictions.On(() => pacienteAlias.Apellidos).IsLike(filter.Value["value"], MatchMode.Anywhere));
                case "EdadPaciente":
                    if (int.TryParse(filter.Value["value"], out int edad))
                    {
                        return query.Where(() => pacienteAlias.Edad == edad);
                    }
                    break;
                case "NombreMedicamento":
                    return query.Where(Restrictions.On(() => medicamentoAlias.Nombre).IsLike(filter.Value["value"], MatchMode.Anywhere));
                case "NombreMedico":
                    return query.Where(Restrictions.On(() => medicoAlias.Nombre).IsLike(filter.Value["value"], MatchMode.Anywhere));
                case "CorreoMedico":
                    return query.Where(Restrictions.On(() => medicoAlias.CorreoElectronico).IsLike(filter.Value["value"], MatchMode.Anywhere));
            }
            return query;
        }

        private IQueryOver<Visita, Visita> ApplySorting(IQueryOver<Visita, Visita> query, string sortField, int sortOrder, Paciente pacienteAlias, Enfermedad enfermedadAlias, Medicamento medicamentoAlias, Medico medicoAlias)
        {
            var sortExpressions = new Dictionary<string, Expression<Func<object>>>
    {
        { "CorreoPaciente", () => pacienteAlias.CorreoElectronico },
        { "NombrePaciente", () => pacienteAlias.Nombre },
        { "ApellidosPaciente", () => pacienteAlias.Apellidos },
        { "EdadPaciente", () => pacienteAlias.Edad },
        { "NombreEnfermedad", () => enfermedadAlias.Nombre },
        { "NombreMedicamento", () => medicamentoAlias.Nombre },
        { "NombreMedico", () => medicoAlias.Nombre },
            { "CorreoMedico", () => medicoAlias.CorreoElectronico }
        };

            // Aplicar ordenamiento
            if (!string.IsNullOrEmpty(sortField) && sortExpressions.ContainsKey(sortField))
            {
                var sortExpression = sortExpressions[sortField];
                query = sortOrder == 1
                    ? query.OrderBy(sortExpression).Asc
                    : query.OrderBy(sortExpression).Desc;
            }
            else
            {
                var defaultSortExpression = GetSortExpression<Visita>(sortField);
                query = sortOrder == 1
                    ? query.OrderBy(defaultSortExpression).Asc
                    : query.OrderBy(defaultSortExpression).Desc;
            }

            return query;
    }    


    // Helper method to get the sort expression
    private static Expression<Func<T, object>> GetSortExpression<T>(string sortField)
        {
            var param = Expression.Parameter(typeof(T), "x");
            var body = Expression.Convert(Expression.PropertyOrField(param, sortField), typeof(object));
            return Expression.Lambda<Func<T, object>>(body, param);
        }


    }
}
public class VisitaDTO
{
    public int Id { get; set; }
    public string NombrePaciente { get; set; }
    public string CorreoPaciente { get; set; }
    public string ApellidosPaciente { get; set; }
    public int EdadPaciente { get; set; }
    public DateTime FechaVisita { get; set; }
    public string Motivo { get; set; }
    public string NombreMedico { get; set; }
    public string CorreoMedico { get; set; }
    public string NombreEnfermedad { get; set; }
    public string NombreMedicamento { get; set; }
    public int TotalRecords { get; set; }

}
