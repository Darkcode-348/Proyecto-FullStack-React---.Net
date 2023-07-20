using ApiRestPruebaTecnica.ConfigErrores;
using ApiRestPruebaTecnica.DataAccess;
using Model.Models.Movimiento;

namespace ApiRestPruebaTecnica.LogicBunisess.Movimiento
{
    public interface IMovimiento
    {
        SqlHelper? SqlHelper { set; get; }
        IErrorSistema? ErrorSistema { set; get; }
        Task<List<MovimientoModel>> Listar();
        Task Grabar(MovimientoModel cuentas);
        Task<MovimientoModel> Buscar(string numerocuenta);
        Task<byte[]> GenerarPdf();
    }
}
