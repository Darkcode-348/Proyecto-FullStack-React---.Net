using ApiRestPruebaTecnica.LogicBunisess.Cuenta;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Model.Models.Cuentas;

namespace ApiRestPruebaTecnica.Controllers.Cuenta
{
    [Route("api/cuentas")]
    [ApiController]
    [EnableCors]
    public class CuentaController : ControllerBase
    {
        private readonly OperadorCuenta _cuentas;
        public CuentaController(OperadorCuenta cuenta)
        { _cuentas = cuenta; }



        //[Authorize]
        [HttpGet("Listar")]
        public async Task<IActionResult> GetAll()
        {
            var cuentas = await _cuentas.Listar();
            return Ok(cuentas);
        }

        ////[Authorize]
        //[HttpGet("obtener")]
        ////[EnableCors]
        //public async Task<IActionResult> Obtener(string tipo)
        //{
        //    var obtener = await _cuentas.Obtener(tipo);
        //    return Ok(obtener);
        //}


        //[EnableCors]
        //[Authorize]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CuentaModel cuenta)
        {
            if (cuenta == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _cuentas.GrabarAsync(cuenta);
            return Ok(200);
        }

        //[EnableCors]
        //[Authorize]
        [HttpGet("buscar")]
        //[EnableCors("PolicyADM")]
        public async Task<IActionResult> Buscar(string identificacion)
        {
            var buscar = await _cuentas.Buscar(identificacion);
            return Ok(buscar);
        }

        ////[EnableCors]
        ////[Authorize]
        //[HttpGet("Mycuenta")]
        ////[EnableCors("PolicyADM")]
        //public async Task<IActionResult> MyCuenta(string usuario)
        //{
        //    var extraer = await _cuentas.MyCuenta(usuario);
        //    return Ok(extraer);
        //}

        ////[EnableCors]
        ////[Authorize]
        //[HttpPost("editar")]
        //public async Task<IActionResult> Put([FromBody] PersonaModel persona)
        //{

        //    if (persona == null) return BadRequest();
        //    if (!ModelState.IsValid) return BadRequest(ModelState);

        //    try
        //    {
        //        await _cuentas.EditarAsync(persona);
        //        return Ok(200);
        //    }
        //    catch (Exception e)
        //    {
        //        return BadRequest(e.Message);
        //    }

        //}

    }
}
