namespace Proyecto_Integrado.Entidades.BBDD

{
    public class Sintoma
    {
        public Sintoma()
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

        private string _Nombre;
        public virtual string Nombre
        {
            get
            {
                return this._Nombre;
            }
            set
            {
                if (this._Nombre != value)
                {
                    this._Nombre = value;
                }
            }
        }

        private string _Tipo;
        public virtual string Tipo
        {
            get
            {
                return this._Tipo;
            }
            set
            {
                if (this._Tipo != value)
                {
                    this._Tipo = value;
                }
            }
        }

    }

}

