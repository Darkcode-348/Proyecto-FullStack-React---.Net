using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace ApiRestPruebaTecnica.DataAccess
{
    public class Configuracion
    {
        public string Conexion_Puente { get; }

        public Configuracion(string ConexionPuente)
        {
            Conexion_Puente = ConexionPuente;
        }
    }
}
