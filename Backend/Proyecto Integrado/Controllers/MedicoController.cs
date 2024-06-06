using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Proyecto_Integrado.Entidades.BBDD;
using System.Text;
using System.Security.Cryptography;
using System.Linq.Expressions;
using System.Text.Json.Serialization;
using System.Text.Json;
using NHibernate.Criterion;
using Expression = System.Linq.Expressions.Expression;


namespace Proyecto_Integrado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicoController : BaseController<Medico>
    {
        public MedicoController(ISessionFactory sessionFactory) : base(sessionFactory)
        {

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
        public override IActionResult Create([FromBody] Medico medico)
        {
            try
            {
                if (medico == null)
                {
                    return BadRequest("Los datos del medico no pueden ser nulos");
                }

                // Verificar si el correo electrónico ya existe en la base de datos
                using (var session = _sessionFactory.OpenSession())
                {
                    var existingMedico = session.QueryOver<Medico>()
                        .Where(p => p.CorreoElectronico == medico.CorreoElectronico)
                        .SingleOrDefault();
                    if (existingMedico != null)
                    {
                        // El correo electrónico ya está en uso
                        return Conflict(new { message = "El correo electrónico ya está registrado" });
                    }
                }

                if (!string.IsNullOrEmpty(medico.Contrasena))
                {
                    // Hashear la contraseña
                    medico.Contrasena = HashPassword(medico.Contrasena);
                }

                using (var session = _sessionFactory.OpenSession())
                using (var transaction = session.BeginTransaction())
                {
                    session.Save(medico);
                    transaction.Commit();
                }
                return Ok(new { message = "Medico creado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al crear medico: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public override IActionResult Update(int id, [FromBody] Medico entity)
        {
            try
            {
                if (entity == null)
                {
                    return BadRequest("Los datos del médico no pueden ser nulos");
                }

                // Verificar si el correo electrónico ya existe en la base de datos
                using (var session = _sessionFactory.OpenSession())
                {
                    var existingMedico = session.QueryOver<Medico>()
                        .Where(p => p.CorreoElectronico == entity.CorreoElectronico)
                        .SingleOrDefault();

                    if (existingMedico != null && existingMedico.Id != id)
                    {
                        // El correo electrónico ya está en uso por otro medico
                        return Conflict(new { message = "El correo electrónico ya está registrado por otro medico" });
                    }
                }

                using (var session = _sessionFactory.OpenSession())
                using (var transaction = session.BeginTransaction())
                {
                    var existingEntity = session.Load<Medico>(id);
                    if (existingEntity == null)
                    {
                        return NotFound($"Médico con ID {id} no encontrado");
                    }

                    existingEntity.Nombre = entity.Nombre;
                    existingEntity.Apellidos = entity.Apellidos;
                    existingEntity.CorreoElectronico = entity.CorreoElectronico;
                    existingEntity.HorarioLaboral= entity.HorarioLaboral;
                    existingEntity.Especialidad = entity.Especialidad;

                    session.Update(existingEntity);
                    transaction.Commit();
                }
                return Ok(new { message = $"Médico con ID {id} actualizado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar médico: {ex.Message}");
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
                        var medicoId = session.QueryOver<Medico>()
                                .Where(p => p.CorreoElectronico == correo)
                                .Select(p => p.Id)
                                .SingleOrDefault<int>();

                        transaction.Commit();
                        return OkJson(medicoId);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al recuperar medicos: {ex.Message}");
            }
        }

        [HttpGet("getCantidad")]
        public IActionResult GetCantidad(int page, int size, string sortField, int sortOrder, [FromQuery] string filters)
        {
            var filtersDictionary = JsonSerializer.Deserialize<Dictionary<string, Dictionary<string, string>>>(filters);
            try
            {
                using (var session = _sessionFactory.OpenSession())
                {
                    // Calculate total records
                    var totalRecords = session.QueryOver<Medico>().RowCount();

                    var query = session.QueryOver<Medico>();

                    // Apply global filter if exists
                    if (filtersDictionary != null && filtersDictionary.ContainsKey("global"))
                    {
                        var globalFilter = filtersDictionary["global"];
                        if (globalFilter.ContainsKey("value") && globalFilter.ContainsKey("matchMode"))
                        {
                            string filterValue = globalFilter["value"];
                            query = query.Where(
                                Restrictions.On<Medico>(m => m.Nombre).IsLike(filterValue, MatchMode.Anywhere) ||
                                Restrictions.On<Medico>(m => m.Apellidos).IsLike(filterValue, MatchMode.Anywhere) ||
                                Restrictions.On<Medico>(m => m.CorreoElectronico).IsLike(filterValue, MatchMode.Anywhere) ||
                                Restrictions.On<Medico>(m => m.HorarioLaboral).IsLike(filterValue, MatchMode.Anywhere) ||
                                Restrictions.On<Medico>(m => m.Especialidad).IsLike(filterValue, MatchMode.Anywhere));
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
                                        query = query.Where(Restrictions.On<Medico>(m => m.CorreoElectronico).IsLike(filter.Value["value"], MatchMode.Anywhere));
                                        break;
                                    case "Nombre":
                                        query = query.Where(Restrictions.On<Medico>(m => m.Nombre).IsLike(filter.Value["value"], MatchMode.Anywhere));
                                        break;
                                    case "Apellidos":
                                        query = query.Where(Restrictions.On<Medico>(m => m.Apellidos).IsLike(filter.Value["value"], MatchMode.Anywhere));
                                        break;
                                    case "Especialidad":
                                        query = query.Where(Restrictions.On<Medico>(m => m.Especialidad).IsLike(filter.Value["value"], MatchMode.Anywhere));
                                        break;
                                    case "HorarioLaboral":
                                        query = query.Where(Restrictions.On<Medico>(m => m.HorarioLaboral).IsLike(filter.Value["value"], MatchMode.Anywhere));
                                        break;
                                }
                            }
                        }
                    }

                    // Dictionary to map sortField to expressions (excluding ListaVisitas)
                    var sortExpressions = new Dictionary<string, Expression<Func<Medico, object>>>
                        {
                            { "CorreoElectronico", m => m.CorreoElectronico },
                            { "Nombre", m => m.Nombre },
                            { "Apellidos", m => m.Apellidos },
                            { "HorarioLaboral", m => m.HorarioLaboral },
                            { "Especialidad", m => m.Especialidad }
                        };

                    // Apply sorting
                    if (!string.IsNullOrEmpty(sortField) && sortExpressions.ContainsKey(sortField))
                    {
                        var sortExpression = GetSortExpression<Medico>(sortField);
                        query = sortOrder == 1
                            ? query.OrderBy(sortExpression).Asc
                            : query.OrderBy(sortExpression).Desc;
                    }

                    // Fetch paginated patients (Select only necessary properties)
                    var medicos = query.Skip(page * size).Take(size).List();

                    var medicosDto = medicos.Select(m => new
                    {
                        m.Id,
                        m.CorreoElectronico,
                        m.Nombre,
                        m.Apellidos,
                        m.Especialidad,
                        m.HorarioLaboral,
                        TotalRecords = totalRecords
                    }).ToList();

                    var options = new JsonSerializerOptions
                    {
                        ReferenceHandler = ReferenceHandler.IgnoreCycles,
                        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
                    };

                    var json = JsonSerializer.Serialize(medicosDto, options);

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


