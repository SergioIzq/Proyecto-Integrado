using Microsoft.AspNetCore.Mvc;
using NHibernate;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Proyecto_Integrado.Controllers
{
    public abstract class BaseController<T> : ControllerBase where T : class
    {
        protected readonly ISessionFactory _sessionFactory;
        private readonly JsonSerializerOptions _jsonOptions;
        public BaseController(ISessionFactory sessionFactory)
        {
            _sessionFactory = sessionFactory ?? throw new ArgumentNullException(nameof(sessionFactory));
            _jsonOptions = new JsonSerializerOptions
            {
                ReferenceHandler = ReferenceHandler.IgnoreCycles,
                // Evitar la inclusión de los campos $id y $ref
                // PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                IgnoreNullValues = true,
                IgnoreReadOnlyProperties = true
            };
        }

        protected IActionResult OkJson(object value)
        {
            return new JsonResult(value, _jsonOptions);
        }

        protected IActionResult OkJson(object value, JsonSerializerOptions options)
        {
            return new JsonResult(value, options);
        }

        [HttpGet]
        public virtual IActionResult GetAll()
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                {
                    var entities = session.QueryOver<T>().List();
                    return OkJson(entities);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al recuperar entidades: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public virtual IActionResult GetById(int id)
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                {
                    var entity = session.Get<T>(id);
                    if (entity == null)
                    {
                        return NotFound($"Entidad con ID {id} no encontrada");
                    }
                    return OkJson(entity);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al recuperar entidad: {ex.Message}");
            }
        }

        [HttpPost]
        public virtual IActionResult Create([FromBody] T entity)
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                using (var transaction = session.BeginTransaction())
                {
                    session.Save(entity);
                    transaction.Commit();
                }
                return OkJson(new { message = $"{typeof(T).Name} creado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al crear entidad: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public virtual IActionResult Update(int id, [FromBody] T entity)
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                using (var transaction = session.BeginTransaction())
                {
                    var existingEntity = session.Load<T>(id);
                    if (existingEntity == null)
                    {
                        return NotFound($"Entidad con ID {id} no encontrada");
                    }
                    session.Update(entity);
                    transaction.Commit();
                }
                return OkJson(new { message = $"{typeof(T).Name} con ID {id} actualizado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar entidad: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public virtual IActionResult Delete(int id)
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                using (var transaction = session.BeginTransaction())
                {
                    var entity = session.Get<T>(id);
                    if (entity == null)
                    {
                        return NotFound($"Entidad con ID {id} no encontrada");
                    }
                    session.Delete(entity);
                    transaction.Commit();
                }
                return OkJson(new { message = $"{typeof(T).Name} con ID {id} eliminado exitosamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al eliminar entidad: {ex.Message}");
            }
        }
    }
}
