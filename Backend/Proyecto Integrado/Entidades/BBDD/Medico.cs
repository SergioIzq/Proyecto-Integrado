namespace Proyecto_Integrado.Entidades.BBDD

{
    public class Medico
    {
        public Medico()
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

        private string _Especialidad;
        public virtual string Especialidad
        {
            get
            {
                return this._Especialidad;
            }
            set
            {
                if (this._Especialidad != value)
                {
                    this._Especialidad = value;
                }
            }
        }

        private string _HorarioLaboral;
        public virtual string HorarioLaboral
        {
            get
            {
                return this._HorarioLaboral;
            }
            set
            {
                if (this._HorarioLaboral != value)
                {
                    this._HorarioLaboral = value;
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


    }

}

