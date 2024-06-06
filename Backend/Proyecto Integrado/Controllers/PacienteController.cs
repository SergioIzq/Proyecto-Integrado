using Microsoft.AspNetCore.Http.Json;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Proyecto_Integrado.Entidades.BBDD;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;
using System.Text.Json;
using System.Linq.Expressions;
using NHibernate.Criterion;
using Expression = System.Linq.Expressions.Expression;

namespace Proyecto_Integrado.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class PacienteController : BaseController<Paciente>
    {
        private readonly JsonSerializerOptions _jsonOptions;
        public PacienteController(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            _jsonOptions = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                // Evitar la inclusión de los campos $id y $ref
                // PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                IgnoreNullValues = true,
                IgnoreReadOnlyProperties = true
            };
        }

        private string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                // Convert byte array to a string
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        [HttpPost]
        public override IActionResult Create([FromBody] Paciente paciente)
        {
            try
            {
                if (paciente == null)
                {
                    return BadRequest("Los datos del paciente no pueden ser nulos");
                }

                // Verificar si el correo electrónico ya existe en la base de datos
                using (var session = _sessionFactory.OpenSession())
                {
                    var existingPaciente = session.QueryOver<Paciente>()
                        .Where(p => p.CorreoElectronico == paciente.CorreoElectronico)
                        .SingleOrDefault();
                    if (existingPaciente != null)
                    {
                        // El correo electrónico ya está en uso
                        return Conflict(new { message = "El correo electrónico ya está registrado" });
                    }
                }

                if (!string.IsNullOrEmpty(paciente.Contrasena))
                {
                    // Hashear la contraseña
                    paciente.Contrasena = HashPassword(paciente.Contrasena);
                }

                using (var session = _sessionFactory.OpenSession())
                using (var transaction = session.BeginTransaction())
                {
                    session.Save(paciente);
                    transaction.Commit();
                }
                return Ok(new { message = "Paciente creado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al crear paciente: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] Paciente entity)
        {
            try
            {
                if (entity == null)
                {
                    return BadRequest("Los datos del paciente no pueden ser nulos");
                }

                // Verificar si el correo electrónico ya existe en la base de datos
                using (var session = _sessionFactory.OpenSession())
                {
                    var existingPaciente = session.QueryOver<Paciente>()
                        .Where(p => p.CorreoElectronico == entity.CorreoElectronico)
                        .SingleOrDefault();

                    if (existingPaciente != null && existingPaciente.Id != id)
                    {
                        // El correo electrónico ya está en uso por otro paciente
                        return Conflict(new { message = "El correo electrónico ya está registrado por otro paciente" });
                    }
                }

                using (var session = _sessionFactory.OpenSession())
                using (var transaction = session.BeginTransaction())
                {
                    var existingEntity = session.Load<Paciente>(id);
                    if (existingEntity == null)
                    {
                        return NotFound($"Paciente con ID {id} no encontrado");
                    }

                    existingEntity.Nombre = entity.Nombre;
                    existingEntity.Apellidos = entity.Apellidos;
                    existingEntity.CorreoElectronico = entity.CorreoElectronico;
                    existingEntity.Edad = entity.Edad;

                    session.Update(existingEntity);
                    transaction.Commit();
                }
                return Ok(new { message = $"Paciente con ID {id} actualizado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar paciente: {ex.Message}");
            }
        }

        [HttpGet]
        public override IActionResult GetAll()
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                {
                    using (var transaction = session.BeginTransaction())
                    {
                        var pacientes = session.QueryOver<Paciente>().List();

                        transaction.Commit();
                        return OkJson(pacientes);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al recuperar pacientes: {ex.Message}");
            }
        }

        [HttpGet("getIdByCorreo/{correo}")]
        public IActionResult GetIdByCorreo(string correo)
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                {
                    using (var transaction = session.BeginTransaction())
                    {
                        var pacienteId = session.QueryOver<Paciente>()
                                .Where(p => p.CorreoElectronico == correo)
                                .Select(p => p.Id)
                                .SingleOrDefault<int>();
                        if (pacienteId == default(int))
                        {
                            return NotFound("Paciente no encontrado");
                        }
                        transaction.Commit();
                        return OkJson(pacienteId);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al recuperar pacientes: {ex.Message}");
            }
        }

        [HttpGet("getCantidad")]
        public IActionResult GetCantidad(int page, int size, string sortField, int sortOrder, [FromQuery] string filters)
        {
            try
            {
                var filtersDictionary = JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, string>>>(filters);

                using (var session = _sessionFactory.OpenSession())
                {
                    var query = session.QueryOver<Paciente>();

                    // Apply global filter if exists
                    if (filtersDictionary != null && filtersDictionary.ContainsKey("global"))
                    {
                        var globalFilter = filtersDictionary["global"];
                        if (globalFilter.ContainsKey("value") && globalFilter.ContainsKey("matchMode"))
                        {
                            string filterValue = globalFilter["value"];
                            query.Where(
                                Restrictions.On<Paciente>(p => p.Nombre).IsLike(filterValue, MatchMode.Anywhere) ||
                                Restrictions.On<Paciente>(p => p.Apellidos).IsLike(filterValue, MatchMode.Anywhere) ||
                                Restrictions.On<Paciente>(p => p.CorreoElectronico).IsLike(filterValue, MatchMode.Anywhere));
                        }
                    }

                    // Apply filters
                    if (filtersDictionary != null)
                    {
                        foreach (var filter in filtersDictionary)
                        {
                            if (filter.Key != "global")
                            {
                                switch (filter.Key)
                                {
                                    case "CorreoElectronico":
                                        query.Where(Restrictions.On<Paciente>(p => p.CorreoElectronico).IsLike(filter.Value["value"], MatchMode.Anywhere));
                                        break;
                                    case "Nombre":
                                        query.Where(Restrictions.On<Paciente>(p => p.Nombre).IsLike(filter.Value["value"], MatchMode.Anywhere));
                                        break;
                                    case "Apellidos":
                                        query.Where(Restrictions.On<Paciente>(p => p.Apellidos).IsLike(filter.Value["value"], MatchMode.Anywhere));
                                        break;
                                    case "Edad":
                                        if (int.TryParse(filter.Value["value"], out int edad))
                                        {
                                            query.Where(p => p.Edad == edad);
                                        }
                                        break;
                                }
                            }
                        }
                    }

                    // Calculate total records
                    var totalRecords = query.ToRowCountQuery().RowCount();

                    // Dictionary to map sortField to expressions
                    var sortExpressions = new Dictionary<string, Expression<Func<Paciente, object>>>
                    {
                        { "CorreoElectronico", p => p.CorreoElectronico },
                        { "Nombre", p => p.Nombre },
                        { "Apellidos", p => p.Apellidos },
                        { "Edad", p => p.Edad }
                    };

                    // Apply sorting
                    if (!string.IsNullOrEmpty(sortField) && sortExpressions.ContainsKey(sortField))
                    {
                        var sortExpression = sortExpressions[sortField];
                        query = sortOrder == 1
                            ? query.OrderBy(sortExpression).Asc
                            : query.OrderBy(sortExpression).Desc;
                    }

                    // Fetch paginated patients
                    var pacientes = query.Skip(page * size).Take(size).List();

                    var pacientesDto = pacientes.Select(p => new
                    {
                        p.Id,
                        p.CorreoElectronico,
                        p.Nombre,
                        p.Apellidos,
                        p.Edad,
                        TotalRecords = totalRecords
                    }).ToList();

                    var options = new JsonSerializerOptions
                    {
                        ReferenceHandler = ReferenceHandler.IgnoreCycles,
                        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                    };

                    var json = JsonSerializer.Serialize(pacientesDto, options);

                    return Ok(json);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al obtener pacientes por cantidad: {ex.Message}");
            }
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