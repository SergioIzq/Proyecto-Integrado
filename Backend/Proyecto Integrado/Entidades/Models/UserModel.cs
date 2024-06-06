using System.ComponentModel.DataAnnotations;

public class MedicoRegistrationModel
{
    [Required(ErrorMessage = "El nombre es requerido")]
    public string Nombre { get; set; }

    [Required(ErrorMessage = "Apellidos es requerido")]
    public string Apellidos { get; set; }

    [Required(ErrorMessage = "El correo electrónico es requerido")]
    [EmailAddress(ErrorMessage = "El correo electrónico no es válido")]
    public string CorreoElectronico { get; set; }

    [Required(ErrorMessage = "La contraseña es requerida")]
    public string Contrasena { get; set; }

    [Required(ErrorMessage = "La especialidad es requerida")]
    public string Especialidad { get; set; }

    [Required(ErrorMessage = "El horario laboral es requerido")]
    public string HorarioLaboral { get; set; }

    [Required(ErrorMessage = "El rol es requerido")]
    public string Rol { get; set; }
}

public class PacienteRegistrationModel
{
    [Required(ErrorMessage = "El nombre es requerido")]
    public string Nombre { get; set; }

    [Required(ErrorMessage = "Apellidos es requerido")]
    public string Apellidos { get; set; }

    [Required(ErrorMessage = "El correo electrónico es requerido")]
    [EmailAddress(ErrorMessage = "El correo electrónico no es válido")]
    public string CorreoElectronico { get; set; }

    [Required(ErrorMessage = "La contraseña es requerida")]
    public string Contrasena { get; set; }

    [Required(ErrorMessage = "La edad es requerida")]
    public int Edad { get; set; }

    [Required(ErrorMessage = "El rol es requerido")]
    public string Rol { get; set; }
}
public class MedicoLoginModel
{
    [Required(ErrorMessage = "El correo electrónico es requerido")]
    [EmailAddress(ErrorMessage = "El correo electrónico no es válido")]
    public string CorreoElectronico { get; set; }

    [Required(ErrorMessage = "La contraseña es requerida")]
    public string Contrasena { get; set; }
}

public class PacienteLoginModel
{
    [Required(ErrorMessage = "El correo electrónico es requerido")]
    [EmailAddress(ErrorMessage = "El correo electrónico no es válido")]
    public string CorreoElectronico { get; set; }

    [Required(ErrorMessage = "La contraseña es requerida")]
    public string Contrasena { get; set; }
}

