using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Proyecto_Integrado.Entidades.BBDD;

namespace Proyecto_Integrado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FamiliaMedicamentoController : BaseController<FamiliaMedicamento>
    {
        public FamiliaMedicamentoController(ISessionFactory sessionFactory) : base(sessionFactory)
        {

        }
    }       
}
