using ApiRestPruebaTecnica.ConfigErrores;
using ApiRestPruebaTecnica.DataAccess;
using Model.Models.Movimiento;

namespace ApiRestPruebaTecnica.LogicBunisess.Movimiento
{
    public class OperadorMovimiento
    {
        private readonly SqlHelper _sqlHelper;
        private readonly IErrorSistema _error;
        private readonly IMovimiento _movimiento;

        public OperadorMovimiento(SqlHelper sqlHelper, IErrorSistema error, IMovimiento movimiento)
        {
            _sqlHelper = sqlHelper;
            _error = error;
            _movimiento = movimiento;

        }

        public async Task GrabarAsync(MovimientoModel model)
        {
            try
            {
                _sqlHelper.IniciarTransaccion();
                _movimiento.SqlHelper = _sqlHelper;
                _movimiento.ErrorSistema = _error;
                await _movimiento.Grabar(model);
                _sqlHelper.ConfirmarTransaccion();
            }
            catch (Exception e)
            {
                _sqlHelper.AbortarTransaccion();
                _error.MostrarError(e.Message);
            }
        }

        public async Task<List<MovimientoModel>> Listar()
        {
            _movimiento.SqlHelper = _sqlHelper;
            return await _movimiento.Listar();
        }

        public async Task<MovimientoModel> Buscar(string numerocuenta)
        {
            _movimiento.SqlHelper = _sqlHelper;
            return await _movimiento.Buscar(numerocuenta);
        }

        public async Task<byte[]> GenerarPdf()
        {
            _movimiento.SqlHelper = _sqlHelper;
            _movimiento.SqlHelper = _sqlHelper;
            return await _movimiento.GenerarPdf();
        }
    }
}
