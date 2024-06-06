using NHibernate;
using Proyecto_Integrado.Entidades.BBDD;


public class NHibernateHelper
{
    private static ISessionFactory _sessionFactory;

    public static ISessionFactory GetSessionFactory()
    {
        if (_sessionFactory == null)
        {
            

            NHibernate.Cfg.Configuration configuration = new NHibernate.Cfg.Configuration();


            configuration.AddAssembly(typeof(Visita).Assembly);
            

            configuration.Configure();

            _sessionFactory = configuration.BuildSessionFactory();
        }
        return _sessionFactory;
    }
}
