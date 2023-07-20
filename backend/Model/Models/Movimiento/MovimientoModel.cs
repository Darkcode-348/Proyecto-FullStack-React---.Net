using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models.Movimiento
{
    public class MovimientoModel
    {
        public DateTime Fecha { get; set; }
        public string NumeroCuenta { get; set; }
        public string? Titular { get; set; }
        public string? TipoCuenta { get; set; }
        public decimal SaldoInicial { get; set; }
        public decimal Saldo { get; set; }
        public bool Estado { get; set; }
        public string? EstadoString => Estado ? "Activo" : "Inactivo";
        public string TipoMovimiento { get; set; }
        public string? Movimiento { get; set; }
        public decimal? SaldoDisponible { get; set; }
        public decimal Valor { get; set; }

    }
}
