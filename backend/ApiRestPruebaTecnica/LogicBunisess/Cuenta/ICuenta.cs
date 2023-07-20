using ApiRestPruebaTecnica.ConfigErrores;
using ApiRestPruebaTecnica.DataAccess;
using Model.Models.Cuentas;

namespace ApiRestPruebaTecnica.LogicBunisess.Cuenta
{
    public interface ICuenta
    {
        SqlHelper? SqlHelper { set; get; }
        IErrorSistema? ErrorSistema { set; get; }
        Task<List<CuentaModel>> Listar();
        Task Grabar(CuentaModel cuentas);
        Task<CuentaModel> Buscar(string identificacion);
    }
}
