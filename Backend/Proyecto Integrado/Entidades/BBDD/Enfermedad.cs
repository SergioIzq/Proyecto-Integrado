namespace Proyecto_Integrado.Entidades.BBDD

{
    public class Enfermedad
    {
        public Enfermedad()
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
        // public virtual FamiliaEnfermedad FamiliaEnfermedad { get; set; }
        private int _IdFamiliaEnfermedad;        

        public virtual int IdFamiliaEnfermedad
        {
            get
            {
                return this._IdFamiliaEnfermedad;
            }
            set
            {
                if (this._IdFamiliaEnfermedad != value)
                {
                    this._IdFamiliaEnfermedad = value;
                }
            }
        }
    }

}

