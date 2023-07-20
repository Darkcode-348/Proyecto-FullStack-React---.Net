using ApiRestPruebaTecnica.ConfigErrores;
using ApiRestPruebaTecnica.DataAccess;
using Model.Models.Movimiento;

namespace ApiRestPruebaTecnica.LogicBunisess.Movimiento
{
    public class Movimiento : IMovimiento
    {
        public SqlHelper? SqlHelper { get; set; }
        public IErrorSistema? ErrorSistema { get; set; }


        public async Task Grabar(MovimientoModel movimiento)
        {
            await SqlHelper.EjecutarSpEscalarAsync("RegistrarTransaccion", new
            {

                movimiento.Fecha,
                movimiento.NumeroCuenta,
                movimiento.Saldo,
                movimiento.TipoMovimiento,
                movimiento.Valor,


            });
        }
        public async Task<List<MovimientoModel>> Listar()
        {
            return await SqlHelper.ListarAsync<MovimientoModel>("ListarMovimientos");
        }
        public async Task<MovimientoModel> Buscar(string numerocuenta)
        {
            return await SqlHelper.ConsultarAsync<MovimientoModel>("Buscarnumerocuenta", new { numerocuenta });
        }

        public async Task<byte[]> GenerarPdf()
        {
            var reporte = await Listar();
            var reportePdf = new ReportePdf();
            reportePdf.MovimientoModel = reporte;
            return reportePdf.GenerarPdfByte();
        }
    }
}
 