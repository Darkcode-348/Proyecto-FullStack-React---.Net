using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models.Persona
{
    public class PersonaModel
    {
        public string Identificacion { get; set; }
        public string Nombre { get; set; }
        public string Genero { get; set; }
        public string Edad { get; set; }
        public string Direccion { get; set; }
        public string telefono { get; set; }
        public string? Contraseña { get; set; }
        public bool? Estado { get; set; }
    }
}
