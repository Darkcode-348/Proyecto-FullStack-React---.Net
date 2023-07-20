using System.Runtime.Serialization;

namespace ApiRestPruebaTecnica.ConfigErrores
{
    [Serializable]
    public class NegocioException : Exception
    {
        public NegocioException()
        {
        }

        public NegocioException(string message) : base(message)
        {
        }

        public NegocioException(string message, Exception innerException) : base(message, innerException)
        {
        }

        protected NegocioException(SerializationInfo info, StreamingContext context) : base(info, context)
        {
        }
    }
}
