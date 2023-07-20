using ApiRestPruebaTecnica.ConfigErrores;
using ApiRestPruebaTecnica.DataAccess;
using Model.Models.Cuentas;

namespace ApiRestPruebaTecnica.LogicBunisess.Cuenta
{
    public class Cuenta : ICuenta
    {
        public SqlHelper? SqlHelper { get; set; }
        public IErrorSistema? ErrorSistema { get; set; }

        public async Task Grabar(CuentaModel cuentas)
        {
            await SqlHelper.EjecutarSpEscalarAsync("RegistrarCuenta", new
            {

                cuentas.NumeroCuenta,
                cuentas.TipoCuenta,
                cuentas.SaldoInicial,
                cuentas.Estado,
                cuentas.ClienteId,


            });
        }

        public async Task<List<CuentaModel>> Obtener(string tipo)
        {
            return await SqlHelper.ListarAsync<CuentaModel>("Obtener", parametros: new { tipo });
        }

        public async Task<List<CuentaModel>> Listar()
        {
            return await SqlHelper.ListarAsync<CuentaModel>("ListarCuentas");
        }
        public async Task<CuentaModel> Buscar(string identificacion)
        {
            return await SqlHelper.ConsultarAsync<CuentaModel>("BuscarporIdentificacion", new { identificacion });
        }

        public async Task Editar(CuentaModel cuentas)
        {
            await SqlHelper.EjecutarSpEscalarAsync("Actualizar", new
            {

                cuentas.NumeroCuenta,
                cuentas.TipoCuenta,
                cuentas.SaldoInicial,
                cuentas.Estado,
                cuentas.Cliente
            });
        }

 
    }
}
