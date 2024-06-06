namespace Proyecto_Integrado.Entidades.BBDD

{
    public class Medicamento
    {
        public Medicamento()
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

        private float _Precio;
        public virtual float Precio
        {
            get
            {
                return this._Precio;
            }
            set
            {
                if (this._Precio != value)
                {
                    this._Precio = value;
                }
            }
        }

        private float _IdFamiliaMedicamento;
        public virtual float IdFamiliaMedicamento
        {
            get
            {
                return this._IdFamiliaMedicamento;
            }
            set
            {
                if (this._IdFamiliaMedicamento != value)
                {
                    this._IdFamiliaMedicamento = value;
                }
            }
        }
        // public virtual FamiliaMedicamento Familia { get; set; }

    }

}

