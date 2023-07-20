using ApiRestPruebaTecnica.LogicBunisess.Persona;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Model.Models.Persona;

namespace ApiRestPruebaTecnica.Controllers.Persona
{
    [Route("api/personas")]
    [ApiController]
    [EnableCors]
    public class PersonaController : ControllerBase
    {
        private readonly OperadorPersona _persona;
        public PersonaController(OperadorPersona persona)
        { _persona = persona; }


        [HttpGet("Listar")]
        public async Task<IActionResult> GetAll()
        {
            var personaes = await _persona.Listar();
            return Ok(personaes);
        }


        [HttpPost]
        public async Task<IActionResult> Post([FromBody] PersonaModel persona)
        {
            if (persona == null) return BadRequest();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            await _persona.GrabarAsync(persona);
            return Ok(200);
        }


    }
 }