using ApiRestPruebaTecnica.LogicBunisess.Reportes;
using DocumentFormat.OpenXml.Wordprocessing;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Model.Models.Movimiento;
using System.Xml.Linq;
using Document = iTextSharp.text.Document;
using PageSize = iTextSharp.text.PageSize;
using Paragraph = iTextSharp.text.Paragraph;

namespace ApiRestPruebaTecnica.LogicBunisess.Movimiento
{
    public class ReportePdf : DocumentoPdf { 
   public List<MovimientoModel> MovimientoModel { get; set; }

    public const string NombreEmpresa = "BANCO PICHINCHA";

    public const string NombreTodos = "Reporte financiero";

    public override void Contenido()
    {
        var tablaPersona = TablaPersnoa();


        PdfDoc.Add(new Paragraph(NombreEmpresa));
        PdfDoc.Add(new Paragraph(NombreTodos));
        PdfDoc.Add(tablaPersona);
    }

    public override void GenerarPdf()
    {
        Inicializa();
        PdfDoc = new Document(PageSize.A4, 15f, 15f, 25f, 20f);
        using var fileStream = new FileStream(NombreArchivo, FileMode.Create);
        PdfWriter = PdfWriter.GetInstance(PdfDoc, fileStream);
        PdfDoc.AddAuthor(NombreEmpresa);
        PdfDoc.AddCreator(NombreEmpresa);
        PdfDoc.AddTitle(NombreTodos);
        PdfDoc.AddCreationDate();
        PdfDoc.Open();
        Contenido();
        PdfDoc.Close();
        PdfWriter.Close();
    }

    public override byte[] GenerarPdfByte()
    {
        Inicializa();

        PdfDoc = new Document(PageSize.A4, 15f, 15f, 25f, 20f);
        using var ms = new MemoryStream();
        PdfWriter = PdfWriter.GetInstance(PdfDoc, ms);
        PdfDoc.AddAuthor(NombreEmpresa);
        PdfDoc.AddCreator(NombreEmpresa);
        PdfDoc.AddTitle(NombreTodos);
        PdfDoc.AddCreationDate();

        PdfDoc.Open();

        Contenido();

        PdfDoc.Close();
        PdfWriter.Close();

        return ms.ToArray();

    }

    public override void Inicializa()
    {
        NombreDocumento = NombreTodos;
        NombreArchivo = NombreTodos;
    }

    private PdfPTable TablaPersnoa()
    {
        var tablaDetalles = new PdfPTable(9)
        {
            WidthPercentage = 100f,
            SpacingBefore = 10f,
        };
        /*CABECERA TABLA*/
        tablaDetalles.AddCell(CeldaTituloTabla("Fecha"));
        tablaDetalles.AddCell(CeldaTituloTabla("N° Cuenta"));
        tablaDetalles.AddCell(CeldaTituloTabla("Títular"));
        tablaDetalles.AddCell(CeldaTituloTabla("Tipo de cuenta"));
        tablaDetalles.AddCell(CeldaTituloTabla("Saldo inicial"));
        tablaDetalles.AddCell(CeldaTituloTabla("Estado"));
        tablaDetalles.AddCell(CeldaTituloTabla("Movimiento"));
        tablaDetalles.AddCell(CeldaTituloTabla("Valor"));
        tablaDetalles.AddCell(CeldaTituloTabla("Saldo Disponible"));


        foreach (var i in MovimientoModel)
        {
            tablaDetalles.AddCell(CeldaValorTabla(i.Fecha.ToString(), Element.ALIGN_LEFT));
            tablaDetalles.AddCell(CeldaValorTabla(i.NumeroCuenta, Element.ALIGN_LEFT));
            tablaDetalles.AddCell(CeldaValorTabla(i.Titular, Element.ALIGN_LEFT));
            tablaDetalles.AddCell(CeldaValorTabla(i.TipoCuenta, Element.ALIGN_CENTER));
            tablaDetalles.AddCell(CeldaValorTabla(i.SaldoInicial.ToString(), Element.ALIGN_CENTER));
            tablaDetalles.AddCell(CeldaValorTabla(i.EstadoString.ToString(), Element.ALIGN_CENTER));
            tablaDetalles.AddCell(CeldaValorTabla(i.TipoMovimiento, Element.ALIGN_CENTER));
            tablaDetalles.AddCell(CeldaValorTabla(i.Valor.ToString(), Element.ALIGN_LEFT));
            tablaDetalles.AddCell(CeldaValorTabla(i.SaldoDisponible.ToString(), Element.ALIGN_LEFT));

        }

        return tablaDetalles;
        }
    }
}
