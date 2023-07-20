using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Model.Models.Cuentas
{
    public class CuentaModel
    {
        public int CuentaId { get; set; }
        public string NumeroCuenta { get; set; }
        public string TipoCuenta { get; set; }
        public decimal SaldoInicial { get; set; }
        public bool Estado { get; set; } 
        public int ClienteId { get; set; }
        public string? Cliente { get; set; }
        public string? Identificacion { get; set; }
        public decimal? Saldo { get; set; }


    }
}
