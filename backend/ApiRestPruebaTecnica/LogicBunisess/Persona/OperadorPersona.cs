using ApiRestPruebaTecnica.ConfigErrores;
using ApiRestPruebaTecnica.DataAccess;
using Model.Models.Persona;

namespace ApiRestPruebaTecnica.LogicBunisess.Persona
{
    public class OperadorPersona
    {
        private readonly SqlHelper _sqlHelper;
        private readonly IErrorSistema _error;
        private readonly IPersona _persona;

        public OperadorPersona(SqlHelper sqlHelper, IErrorSistema error, IPersona persona)
        {
            _sqlHelper = sqlHelper;
            _error = error;
            _persona = persona;

        }

        public async Task<List<PersonaModel>> Listar()
        {
            _persona.SqlHelper = _sqlHelper;
            return await _persona.Listar();
        }

        public async Task<List<PersonaModel>> Obtener(string tipo)
        {
            _persona.SqlHelper = _sqlHelper;
            return await _persona.Obtener(tipo);
        }


        public async Task GrabarAsync(PersonaModel model)
        {
            try
            {
                _sqlHelper.IniciarTransaccion();
                _persona.SqlHelper = _sqlHelper;
                _persona.ErrorSistema = _error;
                await _persona.Grabar(model);
                _sqlHelper.ConfirmarTransaccion();
            }
            catch (Exception e)
            {
                _sqlHelper.AbortarTransaccion();
                _error.MostrarError(e.Message);
            }
        }
        public async Task<PersonaModel> Buscar(int codigo)
        {
            _persona.SqlHelper = _sqlHelper;
            return await _persona.Buscar(codigo);
        }

    }
}
