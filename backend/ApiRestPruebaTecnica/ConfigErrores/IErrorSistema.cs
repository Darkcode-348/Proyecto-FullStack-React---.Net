using System;
namespace ApiRestPruebaTecnica.ConfigErrores
{
    public interface IErrorSistema
    {
        Exception MostrarError(string error);
    }
}
