using Microsoft.AspNetCore.Mvc;
using NHibernate;
using NHibernate.Linq;
using NHibernate.Util;
using Proyecto_Integrado.Entidades.BBDD;
using System.Collections.Generic;
using System.Linq;
using System.Transactions;

namespace Proyecto_Integrado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VisitaSintomaEnfermedadController : BaseController<VisitaSintomaEnfermedad>
    {
        private readonly ISessionFactory _sessionFactory;

        public VisitaSintomaEnfermedadController(ISessionFactory sessionFactory) : base(sessionFactory)
        {
            _sessionFactory = sessionFactory;
        }


        [HttpPost("create-list")]
        public IActionResult Create([FromBody] List<VisitaSintomaEnfermedad> entities)
        {
            try
            {
                // Obtener el último ID de la entidad Visita
                var ultimoIdVisita = ObtenerUltimoIdVisita();

                using (var session = _sessionFactory.OpenSession())
                using (var transaction = session.BeginTransaction())
                {
                    foreach (var entity in entities)
                    {
                        var nuevaEntidad = new VisitaSintomaEnfermedad();
                        nuevaEntidad.Id_SintomaEnfermedad = entity.Id_SintomaEnfermedad;
                        nuevaEntidad.Id_Visita = ultimoIdVisita;

                        // Guardar la nueva instancia en la base de datos
                        session.Save(nuevaEntidad);
                    }

                    transaction.Commit();
                    return OkJson(new { message = $"{typeof(VisitaSintomaEnfermedad).Name} creado exitosamente" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al crear entidad: {ex.Message}");
            }
        }

        private int ObtenerUltimoIdVisita()
        {
            using (var session = _sessionFactory.OpenSession())
            using (var transaction = session.BeginTransaction())
            {
                var ultimoIdVisita = session.Query<Visita>().Max(v => (int?)v.Id) ?? 0;
                return ultimoIdVisita;
            }
        }

        [HttpPut("update-list/{id}")]

        public IActionResult Update(int id, [FromBody] List<VisitaSintomaEnfermedad> entities)
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                using (var transaction = session.BeginTransaction())
                {
                    var idVisita = entities.First().Id_Visita;

                    // Eliminar todas las instancias de VisitaSintomaEnfermedad asociadas a la visita proporcionada
                    var existingEntities = session.QueryOver<VisitaSintomaEnfermedad>()
                .Where(e => e.Id_Visita == idVisita)
                .List();
                    // Eliminar las instancias obtenidas
                    foreach (var entity in existingEntities)
                    {
                        session.Delete(entity);
                    }
                    // Insertar las nuevas instancias proporcionadas en la lista
                    foreach (var entity in entities)
                    {
                        session.Save(entity);
                    }

                    transaction.Commit();

                    return Ok(new { message = $"{typeof(VisitaSintomaEnfermedad).Name} actualizado exitosamente" });
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al actualizar entidad: {ex.Message}");
            }
        }



    }
}
