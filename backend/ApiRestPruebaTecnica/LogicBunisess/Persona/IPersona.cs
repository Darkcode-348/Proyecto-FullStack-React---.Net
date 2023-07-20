using ApiRestPruebaTecnica.ConfigErrores;
using ApiRestPruebaTecnica.DataAccess;
using Model.Models.Persona;

namespace ApiRestPruebaTecnica.LogicBunisess.Persona
{
    public interface IPersona
    {
        SqlHelper? SqlHelper { set; get; }
        IErrorSistema? ErrorSistema { set; get; }
        Task<List<PersonaModel>> Listar();
        Task Grabar(PersonaModel persona);
        Task<PersonaModel> Buscar(int codigo);
        Task<List<PersonaModel>> Obtener(string tipo);

    }
}
