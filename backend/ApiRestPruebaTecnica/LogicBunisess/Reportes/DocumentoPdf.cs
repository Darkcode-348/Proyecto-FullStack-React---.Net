using iTextSharp.text.pdf;
using iTextSharp.text;

namespace ApiRestPruebaTecnica.LogicBunisess.Reportes
{
    public abstract class DocumentoPdf
    {
        public string NombreArchivo { get; set; }
        public string NombreEmpresa { get; set; }

        private const int TipoLetra = Font.HELVETICA;
        private static readonly BaseColor Color = BaseColor.Black;
        protected byte[] Logo { get; set; }
        protected static Font FuenteTitulo(float size = 11) =>
                    new(TipoLetra, size, Font.BOLD, Color);
        protected static Font FuenteLabel(float size = 8) =>
            new(TipoLetra, size, Font.BOLD, Color);
        protected static Font FuenteValue(float size = 7) =>
            new(TipoLetra, size, Font.NORMAL, Color);
        private static Font FuenteHeadTabla(float size = 7) =>
            new(TipoLetra, size, Font.BOLD, Color);
        private static Font FuenteBodyTabla(float size = 6) =>
            new(TipoLetra, size, Font.NORMAL, Color);

        protected Document PdfDoc { get; set; }
        protected PdfWriter PdfWriter { get; set; }
        protected string NombreDocumento { get; set; }
        protected string NumeroDocumento { get; set; }
        protected string FechaAutorizacion { get; set; }
        protected string ClaveAcceso { get; set; }
        public abstract void GenerarPdf();
        public abstract byte[] GenerarPdfByte();

        public abstract void Inicializa();
        public abstract void Contenido();

        public void EliminarArchivo()
        {
            File.Delete(NombreArchivo);
        }

        protected static PdfPCell CeldaTituloTabla(
            string titulo)
        {
            return new PdfPCell(new Phrase(titulo, FuenteHeadTabla()))
            {
                HorizontalAlignment = Element.ALIGN_CENTER,
                VerticalAlignment = Element.ALIGN_MIDDLE,
                Border = Rectangle.BOX,
                BorderWidth = 0.5f
            };
        }

        protected static PdfPCell CeldaValorTabla(
            string titulo,
            int alineacion,
            float sizeLetter = 6f,
            float padding = 3f)
        {
            return new PdfPCell(new Phrase(titulo, FuenteBodyTabla(sizeLetter)))
            {
                HorizontalAlignment = alineacion,
                VerticalAlignment = Element.ALIGN_MIDDLE,
                Border = Rectangle.BOX,
                BorderWidth = 0.5f,
                PaddingRight = padding,
                PaddingLeft = padding

            };
        }

        protected static PdfPCell CeldaTitulo(
            string texto,
            byte colspan = 1,
            int border = Rectangle.NO_BORDER,
            int horizontalAlignment = 0,
            float sizeLetter = 11f,
            float paddingTopBottom = 5f)
        {
            return new PdfPCell(new Phrase(texto, FuenteTitulo(sizeLetter)))
            {
                Colspan = colspan,
                Border = border,
                PaddingTop = paddingTopBottom,
                PaddingBottom = paddingTopBottom,
                HorizontalAlignment = horizontalAlignment
            };
        }

        protected static PdfPCell CeldaEtiqueta(
            string texto,
            byte colspan = 1,
            int border = Rectangle.NO_BORDER,
            int alineacion = Element.ALIGN_LEFT,
            float sizeLetter = 8f,
            float paddingTopBottom = 3f,
            float paddingLeftRight = 5f)
        {
            return new PdfPCell(new Phrase(texto, FuenteLabel(sizeLetter)))
            {
                Colspan = colspan,
                Border = border,
                PaddingTop = paddingTopBottom,
                PaddingBottom = paddingTopBottom,
                HorizontalAlignment = alineacion,
                PaddingLeft = paddingLeftRight,
                PaddingRight = paddingLeftRight,
            };
        }

        protected PdfPCell CeldaValor(
            string texto,
            byte colspan = 1,
            int border = Rectangle.NO_BORDER,
            int alineacion = Element.ALIGN_LEFT,
            float sizeLetter = 7,
            float paddingTopBottom = 3f,
            float paddingLeftRight = 5f)
        {
            return new PdfPCell(new Phrase(texto, FuenteValue(sizeLetter)))
            {
                Colspan = colspan,
                Border = border,
                PaddingTop = paddingTopBottom,
                PaddingBottom = paddingTopBottom,
                HorizontalAlignment = alineacion,
                PaddingLeft = paddingLeftRight,
                PaddingRight = paddingLeftRight,
            };
        }

        private PdfPCell CeldaCodigoBarra()
        {
            var code128 = new Barcode128
            {
                CodeType = Barcode.CODE128,
                ChecksumText = true,
                GenerateChecksum = true,
                StartStopText = true,
                Code = ClaveAcceso
            };

            var barrasImg = code128.CreateImageWithBarcode(
                PdfWriter.DirectContent,
                BaseColor.Black,
                BaseColor.Black);

            barrasImg.ScalePercent(90);

            var celda = new PdfPCell(barrasImg)
            {
                Colspan = 2,
                Border = Rectangle.NO_BORDER,
                PaddingLeft = 5
            };
            return celda;
        }
    }
}

