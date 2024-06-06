using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Proyecto_Integrado.Entidades.BBDD;

namespace Proyecto_Integrado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnfermedadController : BaseController<Enfermedad>
    {      

        public EnfermedadController(ISessionFactory sessionFactory) : base(sessionFactory)
        {
  
        }

        [HttpGet("{id}/Familia")]
        public IActionResult ObtenerFamiliaDeEnfermedad(int id)
        {
            using (var session = _sessionFactory.OpenSession())
            {
                Enfermedad enfermedadAlias = null;
                FamiliaEnfermedad familiaAlias = null;

                var familiaEnfermedad = session.QueryOver<Enfermedad>(() => enfermedadAlias)
                    .JoinAlias(() => enfermedadAlias.IdFamiliaEnfermedad, () => familiaAlias)
                    .Where(() => enfermedadAlias.Id == id)
                    .Select(x => familiaAlias)
                    .SingleOrDefault<FamiliaEnfermedad>();

                if (familiaEnfermedad == null)
                {
                    return NotFound(); // Si no se encuentra ninguna familia asociada, se devuelve un 404
                }

                return Ok(familiaEnfermedad);
            }
        }

        [HttpGet("getIdByNombre/{nombre}")]
        public IActionResult GetIdByCorreo(string nombre)
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                {
                    using (var transaction = session.BeginTransaction())
                    {
                        var enfermedadId = session.QueryOver<Enfermedad>()
                                .Where(p => p.Nombre == nombre)
                                .Select(p => p.Id)
                                .SingleOrDefault<int>();

                        transaction.Commit();
                        return OkJson(enfermedadId);
                    }
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al recuperar pacientes: {ex.Message}");
            }
        }
    }
}
