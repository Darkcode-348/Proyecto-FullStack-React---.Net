using ApiRestPruebaTecnica.ConfigErrores;
using ApiRestPruebaTecnica.DataAccess;
using ApiRestPruebaTecnica.LogicBunisess.Persona;
using ApiRestPruebaTecnica.LogicBunisess.Cuenta;
using ApiRestPruebaTecnica.LogicBunisess.Movimiento;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



builder.Services.AddCors(options =>
{
    options.AddPolicy("PolicyADM",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "*").WithMethods("POST", "PUT", "DELETE", "GET");
        });
});

var sqlConnectionString = builder.Configuration.GetConnectionString("ConexionSQL");
var configuration = new Configuracion(sqlConnectionString);
builder.Services.AddSingleton(configuration);

builder.Services.AddSingleton<IErrorSistema, ErrorSistema>();
builder.Services.AddTransient<SqlHelper>();


builder.Services.AddTransient<IPersona, Persona>();
builder.Services.AddTransient<OperadorPersona>();
builder.Services.AddTransient<ICuenta, Cuenta>();
builder.Services.AddTransient<OperadorCuenta>();
builder.Services.AddTransient<IMovimiento, Movimiento>();
builder.Services.AddTransient<OperadorMovimiento>();

var app = builder.Build();

app.UseExceptionHandler(appError =>
{
    appError.Run(async context =>
    {
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;
        context.Response.ContentType = System.Net.Mime.MediaTypeNames.Text.Plain;
        var contextFeature = context.Features.Get<Microsoft.AspNetCore.Diagnostics.IExceptionHandlerFeature>();
        if (contextFeature != null) await context.Response.WriteAsync(contextFeature.Error.Message);

    });
});



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors(c => c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());



app.UseHttpsRedirection();



app.UseAuthorization();

app.MapControllers();

app.Run();
