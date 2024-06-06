namespace Proyecto_Integrado.Entidades.BBDD

{
    public class Paciente
    {
        public Paciente()
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

        private string _Apellidos;
        public virtual string Apellidos
        {
            get
            {
                return this._Apellidos;
            }
            set
            {
                if (this._Apellidos != value)
                {
                    this._Apellidos = value;
                }
            }
        }

        private int _Edad;
        public virtual int Edad
        {
            get
            {
                return this._Edad;
            }
            set
            {
                if (this._Edad != value)
                {
                    this._Edad = value;
                }
            }
        }

        private string _CorreoElectronico;
        public virtual string CorreoElectronico
        {
            get
            {
                return this._CorreoElectronico;
            }
            set
            {
                if (this._CorreoElectronico != value)
                {
                    this._CorreoElectronico = value;
                }
            }
        }

        private string _Contrasena;
        public virtual string Contrasena
        {
            get
            {
                return this._Contrasena;
            }
            set
            {
                if (this._Contrasena != value)
                {
                    this._Contrasena = value;
                }
            }
        }

        private DateTime _FechaRegistro = DateTime.Now;
        public virtual DateTime FechaRegistro
        {
            get
            {
                return this._FechaRegistro;
            }
            set
            {
                if (this._FechaRegistro != value)
                {
                    this._FechaRegistro = value;
                }
            }
        }

        private string _Rol;
        public virtual string Rol
        {
            get
            {
                return this._Rol;
            }
            set
            {
                if (this._Rol != value)
                {
                    this._Rol = value;
                }
            }
        }

        private IList<Visita> _ListaVisitas = new List<Visita>();
        public virtual IList<Visita> ListaVisitas
        {
            get
            {
                return this._ListaVisitas;
            }
            set
            {
                this._ListaVisitas = value;
            }
        }

    }

}

