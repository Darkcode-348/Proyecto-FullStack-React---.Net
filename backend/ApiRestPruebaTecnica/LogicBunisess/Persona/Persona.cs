using ApiRestPruebaTecnica.ConfigErrores;
using ApiRestPruebaTecnica.DataAccess;
using Model.Models.Persona;
using SpreadsheetLight;

namespace ApiRestPruebaTecnica.LogicBunisess.Persona
{
    public class Persona : IPersona
    {
        public SqlHelper? SqlHelper { get; set; }
        public IErrorSistema? ErrorSistema { get; set; }

        public async Task Grabar(PersonaModel persona)
        {
            await SqlHelper.EjecutarSpEscalarAsync("RegistrarPersona", new
            {
              
                persona.Nombre,
                persona.Genero,
                persona.Edad,
                persona.Identificacion,
                persona.Direccion,
                persona.telefono,
                persona.Contraseña,
                persona.Estado


            });
        }

        public async Task<List<PersonaModel>> Obtener(string tipo)
        {
            return await SqlHelper.ListarAsync<PersonaModel>("Obtener", parametros: new { tipo });
        }

        public async Task<List<PersonaModel>> Listar()
        {
            return await SqlHelper.ListarAsync<PersonaModel>("ListarPersonas");
        }
        public async Task<PersonaModel> Buscar(int codigo)
        {
            return await SqlHelper.ConsultarAsync<PersonaModel>("Buscarpersona", new { codigo });
        }
   
    }
}
