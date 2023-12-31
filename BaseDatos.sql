USE [master]
GO
/****** Object:  Database [BaseDatos]    Script Date: 20/7/2023 8:21:49 ******/
CREATE DATABASE [BaseDatos]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'BaseDatos', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER2023\MSSQL\DATA\BaseDatos.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'BaseDatos_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER2023\MSSQL\DATA\BaseDatos_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [BaseDatos] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [BaseDatos].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [BaseDatos] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [BaseDatos] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [BaseDatos] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [BaseDatos] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [BaseDatos] SET ARITHABORT OFF 
GO
ALTER DATABASE [BaseDatos] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [BaseDatos] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [BaseDatos] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [BaseDatos] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [BaseDatos] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [BaseDatos] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [BaseDatos] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [BaseDatos] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [BaseDatos] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [BaseDatos] SET  DISABLE_BROKER 
GO
ALTER DATABASE [BaseDatos] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [BaseDatos] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [BaseDatos] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [BaseDatos] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [BaseDatos] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [BaseDatos] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [BaseDatos] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [BaseDatos] SET RECOVERY FULL 
GO
ALTER DATABASE [BaseDatos] SET  MULTI_USER 
GO
ALTER DATABASE [BaseDatos] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [BaseDatos] SET DB_CHAINING OFF 
GO
ALTER DATABASE [BaseDatos] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [BaseDatos] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [BaseDatos] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [BaseDatos] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'BaseDatos', N'ON'
GO
ALTER DATABASE [BaseDatos] SET QUERY_STORE = ON
GO
ALTER DATABASE [BaseDatos] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [BaseDatos]
GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 20/7/2023 8:21:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[ClienteId] [int] IDENTITY(1,1) NOT NULL,
	[PersonaId] [int] NOT NULL,
	[Contraseña] [nvarchar](100) NOT NULL,
	[Estado] [bit] NOT NULL,
 CONSTRAINT [PK__Cliente__71ABD087FE55BF51] PRIMARY KEY CLUSTERED 
(
	[ClienteId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Cuenta]    Script Date: 20/7/2023 8:21:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cuenta](
	[CuentaId] [int] IDENTITY(1,1) NOT NULL,
	[NumeroCuenta] [nvarchar](10) NOT NULL,
	[TipoCuenta] [nvarchar](10) NOT NULL,
	[SaldoInicial] [decimal](10, 2) NOT NULL,
	[Estado] [bit] NOT NULL,
	[ClienteId] [int] NOT NULL,
 CONSTRAINT [PK__Cuenta__40072E81DE284F65] PRIMARY KEY CLUSTERED 
(
	[CuentaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Cuenta_NumeroCuenta] UNIQUE NONCLUSTERED 
(
	[NumeroCuenta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Movimientos]    Script Date: 20/7/2023 8:21:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Movimientos](
	[MovimientoId] [int] IDENTITY(1,1) NOT NULL,
	[Fecha] [smalldatetime] NOT NULL,
	[NumeroCuenta] [nvarchar](10) NOT NULL,
	[Saldo] [decimal](10, 2) NOT NULL,
	[TipoMovimiento] [nvarchar](50) NOT NULL,
	[Valor] [decimal](10, 2) NOT NULL,
 CONSTRAINT [PK__Movimien__BF923C2CB6176613] PRIMARY KEY CLUSTERED 
(
	[MovimientoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY],
 CONSTRAINT [UQ_Movimientos_MovimientoId] UNIQUE NONCLUSTERED 
(
	[MovimientoId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Persona]    Script Date: 20/7/2023 8:21:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Persona](
	[PersonaId] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](100) NOT NULL,
	[Genero] [nvarchar](10) NOT NULL,
	[Edad] [nvarchar](20) NOT NULL,
	[Identificacion] [nvarchar](10) NOT NULL,
	[Direccion] [nvarchar](200) NULL,
	[Telefono] [nvarchar](20) NULL,
 CONSTRAINT [PK__Persona__7C34D30371C22470] PRIMARY KEY CLUSTERED 
(
	[PersonaId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Cliente]  WITH CHECK ADD  CONSTRAINT [FK__Cliente__Persona__398D8EEE] FOREIGN KEY([PersonaId])
REFERENCES [dbo].[Persona] ([PersonaId])
GO
ALTER TABLE [dbo].[Cliente] CHECK CONSTRAINT [FK__Cliente__Persona__398D8EEE]
GO
ALTER TABLE [dbo].[Cuenta]  WITH CHECK ADD  CONSTRAINT [FK_Cuenta_Cliente] FOREIGN KEY([ClienteId])
REFERENCES [dbo].[Cliente] ([ClienteId])
GO
ALTER TABLE [dbo].[Cuenta] CHECK CONSTRAINT [FK_Cuenta_Cliente]
GO
ALTER TABLE [dbo].[Movimientos]  WITH CHECK ADD  CONSTRAINT [FK_Movimientos_Cuenta] FOREIGN KEY([NumeroCuenta])
REFERENCES [dbo].[Cuenta] ([NumeroCuenta])
GO
ALTER TABLE [dbo].[Movimientos] CHECK CONSTRAINT [FK_Movimientos_Cuenta]
GO
/****** Object:  StoredProcedure [dbo].[Buscarnumerocuenta]    Script Date: 20/7/2023 8:21:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Buscarnumerocuenta]
@numerocuenta nvarchar(10)
AS
BEGIN

SELECT
	cu.TipoCuenta,
	pe.Nombre as 'titular',
	cu.SaldoInicial,
	cu.Estado

FROM
    Cuenta cu

    JOIN Cliente cl ON cu.ClienteId = cl.ClienteId
    JOIN Persona pe ON cl.PersonaId = pe.PersonaId
	where @numerocuenta = cu.NumeroCuenta;
end
GO
/****** Object:  StoredProcedure [dbo].[BuscarporIdentificacion]    Script Date: 20/7/2023 8:21:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[BuscarporIdentificacion]
@identificacion nvarchar(10)
AS
BEGIN
  SELECT 
    pe.Nombre AS 'cliente',
    cl.ClienteId
FROM Persona pe
JOIN Cliente cl ON pe.PersonaId = cl.PersonaId
WHERE pe.Identificacion = @identificacion;

END
GO
/****** Object:  StoredProcedure [dbo].[ListarCuentas]    Script Date: 20/7/2023 8:21:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[ListarCuentas]
AS
BEGIN
SELECT 
    cu.NumeroCuenta, 
    cu.TipoCuenta,
    cu.SaldoInicial,
    ISNULL(mo.Saldo, 0) AS Saldo,
    cu.Estado,
    pe.Nombre AS 'cliente'
FROM Cuenta cu
LEFT JOIN Movimientos mo ON mo.NumeroCuenta = cu.NumeroCuenta
JOIN Cliente cl ON cu.ClienteId = cl.ClienteId
JOIN Persona pe ON cl.PersonaId = pe.PersonaId;

END
GO
/****** Object:  StoredProcedure [dbo].[ListarMovimientos]    Script Date: 20/7/2023 8:21:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[ListarMovimientos]
as
begin
SELECT
    m.Fecha,
    cu.NumeroCuenta,
    pe.Nombre as 'Titular',
    cu.TipoCuenta,
    cu.SaldoInicial,
	m.Saldo,
    cu.Estado,
    m.TipoMovimiento,
	CONCAT(m.TipoMovimiento, ' de ', m.Valor) AS Movimiento,
    m.Valor,
    CASE
        WHEN m.TipoMovimiento = 'Deposito' THEN m.Saldo + m.Valor
        WHEN m.TipoMovimiento = 'Retiro' THEN m.Saldo - m.Valor
    END AS SaldoDisponible
FROM
    Movimientos m
	Join Cuenta cu ON cu.NumeroCuenta = m.NumeroCuenta 
    JOIN Cliente cl ON cu.ClienteId = cl.ClienteId
    JOIN Persona pe ON cl.PersonaId = pe.PersonaId
end
GO
/****** Object:  StoredProcedure [dbo].[ListarPersonas]    Script Date: 20/7/2023 8:21:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[ListarPersonas]
as
begin
SELECT Identificacion ,Nombre , Direccion, Telefono, Edad, estado FROM Persona AS P
JOIN Cliente AS C ON P.PersonaId = C.PersonaId;
end
GO
/****** Object:  StoredProcedure [dbo].[RegistrarCuenta]    Script Date: 20/7/2023 8:21:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROC [dbo].[RegistrarCuenta]
@NumeroCuenta nvarchar(10),
@TipoCuenta nvarchar(10),
@SaldoInicial decimal(10,2),
@Estado bit,
@ClienteId int
AS
BEGIN
    -- Verificar si el número de cuenta ya existe
    IF EXISTS (SELECT 1 FROM Cuenta WHERE NumeroCuenta = @NumeroCuenta)
    BEGIN
        -- El número de cuenta ya existe, lanzar un mensaje de error o una excepción
        RAISERROR ('El número de cuenta ya existe', 16, 1);
        RETURN; -- Salir del procedimiento sin realizar la inserción
    END

    -- Si el número de cuenta no existe, proceder a la inserción
    INSERT INTO Cuenta (NumeroCuenta, TipoCuenta, SaldoInicial, Estado, ClienteId)
    VALUES (@NumeroCuenta, @TipoCuenta, @SaldoInicial, @Estado, @ClienteId);
END
GO
/****** Object:  StoredProcedure [dbo].[RegistrarPersona]    Script Date: 20/7/2023 8:21:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RegistrarPersona]
    @Nombre VARCHAR(100),
    @Genero VARCHAR(10),
    @Edad NVARCHAR(2),
    @Identificacion VARCHAR(10),
    @Direccion VARCHAR(200),
    @Telefono VARCHAR(10),
    @Contraseña VARCHAR(100),
    @Estado BIT
AS
BEGIN
    -- Declarar la variable de salida @Personaid
    DECLARE @Personaid INT;

    -- Verificar si la identificación ya existe
    IF EXISTS (SELECT 1 FROM Persona WHERE Identificacion = @Identificacion)
    BEGIN
        -- La identificación ya existe, lanzar un mensaje de error o una excepción
        RAISERROR ('La identificación ya está registrada', 16, 1);
        RETURN; -- Salir del procedimiento sin realizar la inserción
    END

    -- Insertar en la tabla Persona
    INSERT INTO Persona (Nombre, Genero, Edad, Identificacion, Telefono, Direccion)
    VALUES (@Nombre, @Genero, @Edad, @Identificacion, @Telefono, @Direccion);

    -- Obtener el Personaid generado en la inserción
    SET @Personaid = SCOPE_IDENTITY();

    -- Insertar en la tabla Cliente con el Personaid relacionado
    INSERT INTO Cliente (Personaid, Contraseña, Estado)
    VALUES (@Personaid, @Contraseña, @Estado);

    -- Imprimir el valor del Personaid recién insertado (opcional)
    PRINT 'Personaid insertado: ' + CAST(@Personaid AS VARCHAR(10));
END

GO
/****** Object:  StoredProcedure [dbo].[RegistrarTransaccion]    Script Date: 20/7/2023 8:21:49 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[RegistrarTransaccion]
    @Fecha DATETIME,
    @NumeroCuenta NVARCHAR(10),
    @Saldo DECIMAL(10, 2),
    @TipoMovimiento NVARCHAR(50),
    @Valor DECIMAL(10, 2)
AS
BEGIN
    -- Declarar variable para almacenar el valor anterior de SaldoInicial
    DECLARE @SaldoInicialAnterior DECIMAL(10, 2);

    -- Obtener el valor actual de SaldoInicial y almacenarlo en la variable
    SELECT @SaldoInicialAnterior = SaldoInicial
    FROM Cuenta
    WHERE NumeroCuenta = @NumeroCuenta;

    -- Insertar el registro en la tabla de Movimientos con el valor anterior de SaldoInicial
    INSERT INTO Movimientos (Fecha, NumeroCuenta, Saldo, TipoMovimiento, Valor)
    VALUES (@Fecha, @NumeroCuenta, @SaldoInicialAnterior, @TipoMovimiento, @Valor);

    -- Actualizar el campo SaldoInicial en la tabla Cuenta
    IF (@TipoMovimiento = 'Deposito')
    BEGIN
        UPDATE Cuenta
        SET SaldoInicial = SaldoInicial + @Valor
        WHERE NumeroCuenta = @NumeroCuenta;
    END
    ELSE IF (@TipoMovimiento = 'Retiro')
    BEGIN
        UPDATE Cuenta
        SET SaldoInicial = SaldoInicial - @Valor
        WHERE NumeroCuenta = @NumeroCuenta;
    END
END
GO
USE [master]
GO
ALTER DATABASE [BaseDatos] SET  READ_WRITE 
GO
