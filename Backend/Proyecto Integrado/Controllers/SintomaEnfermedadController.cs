using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Proyecto_Integrado.Entidades.BBDD;
using System.Collections.Generic;
using System.Linq;

namespace Proyecto_Integrado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SintomaEnfermedadController : BaseController<SintomaEnfermedad>
    {
        public SintomaEnfermedadController(ISessionFactory sessionFactory) : base(sessionFactory)
        {
        }

        [HttpGet("enfermedades-por-sintoma/{sintomaId}")]
        public IActionResult GetEnfermedadesPorSintoma(int sintomaId)
        {
            using (var session = _sessionFactory.OpenSession())
            using (var transaction = session.BeginTransaction())
            {
                var sintomaEnfermedades = session.Query<SintomaEnfermedad>().Where(se => se.IdSintoma == sintomaId).ToList();
                var enfermedadIds = sintomaEnfermedades.Select(se => se.IdEnfermedad).ToList();
                var enfermedades = session.Query<Enfermedad>().Where(e => enfermedadIds.Contains(e.Id)).ToList();

                var enfermedadesDto = enfermedades.Select(enfermedad => new
                {
                    Nombre = enfermedad.Nombre,
                    // Agrega aquí otras propiedades que necesites
                });

                return Ok(enfermedadesDto);
            }
        }

        [HttpGet("sintomas-unicos")]
        public IActionResult GetSintomasUnicos()
        {
            using (var session = _sessionFactory.OpenSession())
            using (var transaction = session.BeginTransaction())
            {
                var sintomasUnicos = session.Query<SintomaEnfermedad>()
                                            .Select(se => se.IdSintoma)
                                            .Distinct()
                                            .ToList();

                var sintomas = session.Query<Sintoma>()
                                      .Where(s => sintomasUnicos.Contains(s.Id))
                                      .Select(s => new { Nombre = s.Nombre }) // Corregir el nombre de la propiedad
                                      .ToList();

                return Ok(sintomas);
            }
        }

        [HttpPost("enfermedades-por-sintomas")]
        public IActionResult GetEnfermedadesPorSintomas([FromBody] List<int> sintomaIds)
        {
            using (var session = _sessionFactory.OpenSession())
            using (var transaction = session.BeginTransaction())
            {
                var sintomaEnfermedades = session.Query<SintomaEnfermedad>()
                                                 .Where(se => sintomaIds.Contains(se.IdSintoma))
                                                 .ToList();
                var enfermedadIds = sintomaEnfermedades.Select(se => se.IdEnfermedad).Distinct().ToList();
                var enfermedades = session.Query<Enfermedad>()
                                          .Where(e => enfermedadIds.Contains(e.Id))
                                          .ToList();

                return OkJson(enfermedades);
            }
        }

        [HttpPost("ids-por-sintomas")]
        public IActionResult GetIdsSintomaEnfermedadPorSintomas([FromBody] List<int> sintomaIds)
        {
            using (var session = _sessionFactory.OpenSession())
            using (var transaction = session.BeginTransaction())
            {
                var idsSintomaEnfermedad = session.Query<SintomaEnfermedad>()
                                                  .Where(se => sintomaIds.Contains(se.IdSintoma))
                                                  .GroupBy(se => se.IdSintoma) // Agrupar por IdSintoma
                                                  .Select(group => group.First().IdSintoma) // Seleccionar la columna IdSintoma del primer elemento de cada grupo
                                                  .ToList();
                return Ok(idsSintomaEnfermedad);
            }
        }

    }
}
