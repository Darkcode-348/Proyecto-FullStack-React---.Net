using ApiRestPruebaTecnica.ConfigErrores;
using ApiRestPruebaTecnica.DataAccess;
using Model.Models.Cuentas;

namespace ApiRestPruebaTecnica.LogicBunisess.Cuenta
{
    public class OperadorCuenta
    {
        private readonly SqlHelper _sqlHelper;
        private readonly IErrorSistema _error;
        private readonly ICuenta _cuenta;

        public OperadorCuenta(SqlHelper sqlHelper, IErrorSistema error, ICuenta cuenta)
        {
            _sqlHelper = sqlHelper;
            _error = error;
            _cuenta = cuenta;

        }

        public async Task<List<CuentaModel>> Listar()
        {
            _cuenta.SqlHelper = _sqlHelper;
            return await _cuenta.Listar();
        }

        public async Task GrabarAsync(CuentaModel model)
        {
            try
            {
                _sqlHelper.IniciarTransaccion();
                _cuenta.SqlHelper = _sqlHelper;
                _cuenta.ErrorSistema = _error;
                await _cuenta.Grabar(model);
                _sqlHelper.ConfirmarTransaccion();
            }
            catch (Exception e)
            {
                _sqlHelper.AbortarTransaccion();
                _error.MostrarError(e.Message);
            }
        }
        public async Task<CuentaModel> Buscar(string identificacion)
        {
            _cuenta.SqlHelper = _sqlHelper;
            return await _cuenta.Buscar(identificacion);
        }

    }
}
