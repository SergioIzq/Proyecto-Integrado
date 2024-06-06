using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Proyecto_Integrado.Entidades.BBDD;

namespace Proyecto_Integrado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SintomaController : BaseController<Sintoma>
    {
        public SintomaController(ISessionFactory sessionFactory) : base(sessionFactory)
        {

        }
    }       
}
