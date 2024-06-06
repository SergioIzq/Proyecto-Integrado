using Microsoft.AspNetCore.Mvc;
using NHibernate;
using Proyecto_Integrado.Entidades.BBDD;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Cryptography;
using System.Security.Claims;

namespace Proyecto_Integrado.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ISessionFactory _sessionFactory;
        private readonly string _jwtSecret;
        private readonly int _jwtExpirationDays;

        public AuthenticationController(ISessionFactory sessionFactory, IConfiguration configuration)
        {
            _sessionFactory = sessionFactory;
            _jwtSecret = configuration["Jwt:SecretKey"];
            _jwtExpirationDays = 1;
        }

        private string HashPassword(string password)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                // ComputeHash - returns byte array
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                // Convert byte array to a string
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }

        [HttpPost("login/medico")]
        public IActionResult LoginMedico(MedicoLoginModel model)
        {
            // Validar modelo
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (var session = _sessionFactory.OpenSession())
            {
                try
                {
                    // Buscar el médico en la base de datos
                    var medico = session.QueryOver<Medico>()
                        .Where(m => m.CorreoElectronico == model.CorreoElectronico)
                        .SingleOrDefault();
                    if (medico == null)
                    {
                        // No se encontró ningún médico con el correo electrónico proporcionado
                        return Unauthorized("Credenciales inválidas");
                    }

                    // Hashear la contraseña proporcionada por el usuario y comparar con el hash almacenado
                    string hashedPassword = HashPassword(model.Contrasena);
                    if (medico.Contrasena != hashedPassword)
                    {
                        return Unauthorized("Credenciales inválidas");
                    }

                    // Generar el JWT  
                    var token = GenerateJwtToken("M", medico.Id.ToString());

                    // Devolver el token JWT, ID y rol del médico en la respuesta
                    return Ok(new { token });
                }
                catch (Exception ex)
                {
                    // Manejar cualquier excepción que pueda ocurrir durante la recuperación del médico
                    return StatusCode(500, "Error interno del servidor: " + ex.Message);
                }
            }
        }

        [HttpPost("login/paciente")]
        public IActionResult LoginPaciente(PacienteLoginModel model)
        {
            // Validar modelo
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (var session = _sessionFactory.OpenSession())
            {
                try
                {
                    // Buscar el paciente en la base de datos
                    var paciente = session.QueryOver<Paciente>()
                        .Where(p => p.CorreoElectronico == model.CorreoElectronico)
                        .SingleOrDefault();
                    if (paciente == null)
                    {
                        // No se encontró ningún paciente con el correo electrónico proporcionado
                        return Unauthorized("Credenciales inválidas");
                    }

                    // Hashear la contraseña proporcionada por el usuario y comparar con el hash almacenado
                    string hashedPassword = HashPassword(model.Contrasena);
                    if (paciente.Contrasena != hashedPassword)
                    {
                        return Unauthorized("Credenciales inválidas");
                    }

                    // Generar el JWT
                    var token = GenerateJwtToken("P", paciente.Id.ToString());

                    // Devolver el token JWT, ID del paciente en la respuesta                    
                    return Ok(new { token });
                }
                catch (Exception ex)
                {
                    // Manejar cualquier excepción que pueda ocurrir durante la recuperación del paciente
                    return StatusCode(500, "Error interno del servidor: " + ex.Message);
                }
            }
        }

        private string GenerateJwtToken(string rol, string id)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtSecret);

            // Crea los reclamos (claims)
            var claims = new ClaimsIdentity();
            claims.AddClaim(new Claim(ClaimTypes.Role, rol));
            claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, id));

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddDays(_jwtExpirationDays),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
