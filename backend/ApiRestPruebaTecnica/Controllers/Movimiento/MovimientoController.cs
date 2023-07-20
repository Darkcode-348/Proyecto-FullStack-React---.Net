using ApiRestPruebaTecnica.LogicBunisess.Movimiento;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models.Movimiento;

namespace ApiRestPruebaTecnica.Controllers.Movimiento
{
    [Route("api/movimiento")]
    [ApiController]
    [EnableCors]
    public class MovimientoController : ControllerBase
    {
        private readonly OperadorMovimiento _movimiento;
        public MovimientoController(OperadorMovimiento movimiento)
        { _movimiento = movimiento; }


        [HttpGet("Listar")]
        public async Task<IActionResult> GetAll()
        {
            var movmiento = await _movimiento.Listar();
            return Ok(movmiento);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] MovimientoModel movimiento)
        {
            if (movimiento == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _movimiento.GrabarAsync(movimiento);
            return Ok(200);
        }


        [HttpGet("buscar")]
        public async Task<IActionResult> Buscar(string numerocuenta)
        {
            var movmiento = await _movimiento.Buscar(numerocuenta);
            return Ok(movmiento);
        }

    

        [HttpGet("generarpdf")]
        public async Task<IActionResult> GetPdf()
        {
            var movmiento = await _movimiento.GenerarPdf();
            return File(movmiento, "application/pdf", "ReporteFinanciero.pdf");
        }
    }
}
