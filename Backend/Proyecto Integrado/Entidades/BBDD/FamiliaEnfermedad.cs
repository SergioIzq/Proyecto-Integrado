namespace Proyecto_Integrado.Entidades.BBDD

{
    public class FamiliaEnfermedad
    {
        public FamiliaEnfermedad()
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



        private string _Descripcion;
        public virtual string Descripcion
        {
            get
            {
                return this._Descripcion;
            }
            set
            {
                if (this._Descripcion != value)
                {
                    this._Descripcion = value;
                }
            }
        }

    }

}

