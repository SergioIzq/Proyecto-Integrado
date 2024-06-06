
namespace Proyecto_Integrado.Entidades.BBDD

{
    public class SintomaEnfermedad
    {
        public SintomaEnfermedad()
        {

          
        }


        private int _Id;
        public virtual int Id
        {
            get
            {
                return this._Id;
            }
            set
            {
                if (this._Id != value)
                {
                    this._Id = value;
                }
            }
        }

        private int _IdSintoma;
        public virtual int IdSintoma
        {
            get
            {
                return this._IdSintoma;
            }
            set
            {
                if (this._IdSintoma != value)
                {
                    this._IdSintoma = value;
                }
            }
        }

        private int _IdEnfermedad;
        public virtual int IdEnfermedad
        {
            get
            {
                return this._IdEnfermedad;
            }
            set
            {
                if (this._IdEnfermedad != value)
                {
                    this._IdEnfermedad = value;
                }
            }
        }
    }

}

