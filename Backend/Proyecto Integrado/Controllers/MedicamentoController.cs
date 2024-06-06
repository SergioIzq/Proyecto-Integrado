using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Proyecto_Integrado.Entidades.BBDD;

namespace Proyecto_Integrado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MedicamentoController : BaseController<Medicamento>
        {
            public MedicamentoController(ISessionFactory sessionFactory) : base(sessionFactory)
            {
            
            }


        [HttpGet("getIdByNombre/{nombre}")]
        public IActionResult GetIdByNombre(string nombre)
        {
            try
            {
                using (var session = _sessionFactory.OpenSession())
                {
                    using (var transaction = session.BeginTransaction())
                    {
                        var enfermedadId = session.QueryOver<Medicamento>()
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

    