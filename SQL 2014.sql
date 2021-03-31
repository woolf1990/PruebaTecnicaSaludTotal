create database PruebaTecnicaEdgarEnriqueNietoValdes
USE [PruebaTecnicaEdgarEnriqueNietoValdes]
GO
/****** Object:  Table [dbo].[f005_requerimiento]    Script Date: 31/03/2021 1:06:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[f005_requerimiento](
	[f005_id] [int] IDENTITY(1,1) NOT NULL,
	[f005_area] [int] NOT NULL,
	[f005_aplicativo] [int] NOT NULL,
	[f005_prioridad] [int] NOT NULL,
	[f005_ingeniero] [int] NOT NULL,
	[f005_alcance] [varchar](800) NOT NULL,
	[f005_dias_desarrollo] [int] NOT NULL,
	[f005_fecha_solicitud] [date] NOT NULL,
	[f005_fecha_desarrollo] [date] NULL,
	[f005_alive] [int] NULL,
 CONSTRAINT [PK_f005_requerimiento] PRIMARY KEY CLUSTERED 
(
	[f005_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[t001_area]    Script Date: 31/03/2021 1:06:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t001_area](
	[f001_id] [int] IDENTITY(1,1) NOT NULL,
	[f001_descripcion] [varchar](50) NULL,
	[f001_alive] [bit] NOT NULL,
 CONSTRAINT [PK_t001_area] PRIMARY KEY CLUSTERED 
(
	[f001_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[t002_aplicativo]    Script Date: 31/03/2021 1:06:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t002_aplicativo](
	[f002_id] [int] IDENTITY(1,1) NOT NULL,
	[f002_descripcion] [varchar](50) NULL,
	[f002_alive] [bit] NOT NULL,
 CONSTRAINT [PK_t002_aplicativo] PRIMARY KEY CLUSTERED 
(
	[f002_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[t003_empleado]    Script Date: 31/03/2021 1:06:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t003_empleado](
	[f003_id] [int] IDENTITY(1,1) NOT NULL,
	[f003_username] [varchar](20) NOT NULL,
	[f003_nombre] [varchar](25) NOT NULL,
	[f003_apellido] [varchar](25) NOT NULL,
	[f003_titulo] [varchar](25) NULL,
	[f003_cargo] [varchar](25) NULL,
	[f003_alive] [bit] NOT NULL,
 CONSTRAINT [PK_t003_empleado] PRIMARY KEY CLUSTERED 
(
	[f003_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[t004_prioridad]    Script Date: 31/03/2021 1:06:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[t004_prioridad](
	[f004_id] [int] IDENTITY(1,1) NOT NULL,
	[f004_descripcion] [nchar](10) NULL,
	[f004_order] [int] NOT NULL,
	[f004_alive] [bit] NOT NULL,
 CONSTRAINT [PK_t004_prioridad] PRIMARY KEY CLUSTERED 
(
	[f004_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[f005_requerimiento] ON 
GO
INSERT [dbo].[f005_requerimiento] ([f005_id], [f005_area], [f005_aplicativo], [f005_prioridad], [f005_ingeniero], [f005_alcance], [f005_dias_desarrollo], [f005_fecha_solicitud], [f005_fecha_desarrollo], [f005_alive]) VALUES (1, 3, 3, 4, 2, N'Agregar columna nombre al reporte de clientes', 1, CAST(N'2021-03-30' AS Date), CAST(N'1900-01-01' AS Date), 1)
GO
INSERT [dbo].[f005_requerimiento] ([f005_id], [f005_area], [f005_aplicativo], [f005_prioridad], [f005_ingeniero], [f005_alcance], [f005_dias_desarrollo], [f005_fecha_solicitud], [f005_fecha_desarrollo], [f005_alive]) VALUES (2, 3, 3, 3, 1, N'Agregar columna nombre al reporte de clientes', 1, CAST(N'2021-03-30' AS Date), CAST(N'2021-03-31' AS Date), 1)
GO
SET IDENTITY_INSERT [dbo].[f005_requerimiento] OFF
GO
SET IDENTITY_INSERT [dbo].[t001_area] ON 
GO
INSERT [dbo].[t001_area] ([f001_id], [f001_descripcion], [f001_alive]) VALUES (1, N'Contabilidad', 1)
GO
INSERT [dbo].[t001_area] ([f001_id], [f001_descripcion], [f001_alive]) VALUES (2, N'Gestion humana', 1)
GO
INSERT [dbo].[t001_area] ([f001_id], [f001_descripcion], [f001_alive]) VALUES (3, N'Seguridad', 1)
GO
SET IDENTITY_INSERT [dbo].[t001_area] OFF
GO
SET IDENTITY_INSERT [dbo].[t002_aplicativo] ON 
GO
INSERT [dbo].[t002_aplicativo] ([f002_id], [f002_descripcion], [f002_alive]) VALUES (1, N'CRM', 1)
GO
INSERT [dbo].[t002_aplicativo] ([f002_id], [f002_descripcion], [f002_alive]) VALUES (2, N'e-commerce', 1)
GO
INSERT [dbo].[t002_aplicativo] ([f002_id], [f002_descripcion], [f002_alive]) VALUES (3, N'Biometrico', 1)
GO
SET IDENTITY_INSERT [dbo].[t002_aplicativo] OFF
GO
SET IDENTITY_INSERT [dbo].[t003_empleado] ON 
GO
INSERT [dbo].[t003_empleado] ([f003_id], [f003_username], [f003_nombre], [f003_apellido], [f003_titulo], [f003_cargo], [f003_alive]) VALUES (1, N'enieto', N'Edgar', N'Nieto', N'Ingeniero', N'Desarrollador .Net', 1)
GO
INSERT [dbo].[t003_empleado] ([f003_id], [f003_username], [f003_nombre], [f003_apellido], [f003_titulo], [f003_cargo], [f003_alive]) VALUES (2, N'gperez', N'Gabriel', N'Perez', N'Ingeniero', N'Desarrollador Angular', 1)
GO
SET IDENTITY_INSERT [dbo].[t003_empleado] OFF
GO
SET IDENTITY_INSERT [dbo].[t004_prioridad] ON 
GO
INSERT [dbo].[t004_prioridad] ([f004_id], [f004_descripcion], [f004_order], [f004_alive]) VALUES (1, N'Baja      ', 1, 1)
GO
INSERT [dbo].[t004_prioridad] ([f004_id], [f004_descripcion], [f004_order], [f004_alive]) VALUES (2, N'Medio     ', 2, 1)
GO
INSERT [dbo].[t004_prioridad] ([f004_id], [f004_descripcion], [f004_order], [f004_alive]) VALUES (3, N'Alto      ', 3, 1)
GO
INSERT [dbo].[t004_prioridad] ([f004_id], [f004_descripcion], [f004_order], [f004_alive]) VALUES (4, N'No aplica ', 4, 1)
GO
SET IDENTITY_INSERT [dbo].[t004_prioridad] OFF
GO
/****** Object:  Index [IX_t002_aplicativo]    Script Date: 31/03/2021 1:06:52 ******/
ALTER TABLE [dbo].[t002_aplicativo] ADD  CONSTRAINT [IX_t002_aplicativo] UNIQUE NONCLUSTERED 
(
	[f002_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[t001_area] ADD  CONSTRAINT [DF_t001_area_f001_alive]  DEFAULT ((1)) FOR [f001_alive]
GO
ALTER TABLE [dbo].[t002_aplicativo] ADD  CONSTRAINT [DF_t002_aplicativo_f002_alive]  DEFAULT ((1)) FOR [f002_alive]
GO
ALTER TABLE [dbo].[t003_empleado] ADD  CONSTRAINT [DF_t003_empleado_f003_alive]  DEFAULT ((1)) FOR [f003_alive]
GO
ALTER TABLE [dbo].[t004_prioridad] ADD  CONSTRAINT [DF_t004_prioridad_f004_alive]  DEFAULT ((1)) FOR [f004_alive]
GO
ALTER TABLE [dbo].[f005_requerimiento]  WITH CHECK ADD  CONSTRAINT [FK_f005_requerimiento_f005_requerimiento] FOREIGN KEY([f005_id])
REFERENCES [dbo].[f005_requerimiento] ([f005_id])
GO
ALTER TABLE [dbo].[f005_requerimiento] CHECK CONSTRAINT [FK_f005_requerimiento_f005_requerimiento]
GO
ALTER TABLE [dbo].[f005_requerimiento]  WITH CHECK ADD  CONSTRAINT [FK_f005_requerimiento_t001_area] FOREIGN KEY([f005_area])
REFERENCES [dbo].[t001_area] ([f001_id])
GO
ALTER TABLE [dbo].[f005_requerimiento] CHECK CONSTRAINT [FK_f005_requerimiento_t001_area]
GO
ALTER TABLE [dbo].[f005_requerimiento]  WITH CHECK ADD  CONSTRAINT [FK_f005_requerimiento_t002_aplicativo] FOREIGN KEY([f005_aplicativo])
REFERENCES [dbo].[t002_aplicativo] ([f002_id])
GO
ALTER TABLE [dbo].[f005_requerimiento] CHECK CONSTRAINT [FK_f005_requerimiento_t002_aplicativo]
GO
ALTER TABLE [dbo].[f005_requerimiento]  WITH CHECK ADD  CONSTRAINT [FK_f005_requerimiento_t003_empleado] FOREIGN KEY([f005_ingeniero])
REFERENCES [dbo].[t003_empleado] ([f003_id])
GO
ALTER TABLE [dbo].[f005_requerimiento] CHECK CONSTRAINT [FK_f005_requerimiento_t003_empleado]
GO
ALTER TABLE [dbo].[f005_requerimiento]  WITH CHECK ADD  CONSTRAINT [FK_f005_requerimiento_t004_prioridad] FOREIGN KEY([f005_prioridad])
REFERENCES [dbo].[t004_prioridad] ([f004_id])
GO
ALTER TABLE [dbo].[f005_requerimiento] CHECK CONSTRAINT [FK_f005_requerimiento_t004_prioridad]
GO
/****** Object:  StoredProcedure [dbo].[stp_aplicativo_get]    Script Date: 31/03/2021 1:06:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Edgar Nieto
-- Create date: 2021 03 30
-- Description:	Trae todas los aplicativos de alive = 1
-- =============================================
CREATE PROCEDURE [dbo].[stp_aplicativo_get] 
	@f002_id int,
	@f002_descripcion varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	declare @sql varchar(800) 
	set @sql = ' ';
	SET NOCOUNT ON;
	if @f002_id > 0 
		set @sql += ' AND f002_id = ' + CAST(@f002_id AS VARCHAR(11));
	if NOT RTRIM(LTRIM(@f002_descripcion)) = ''
		set @sql += ' AND f002_descripcion LIKE ' + CHAR(39) + '%' + @f002_id + '%' + CHAR(39);

    -- Insert statements for procedure here
	set @sql = ' SELECT f002_id, f002_descripcion, f002_alive from t002_aplicativo where f002_alive = 1 ' + @sql

	exec(@sql)
END


GO
/****** Object:  StoredProcedure [dbo].[stp_area_get]    Script Date: 31/03/2021 1:06:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[stp_area_get] 
	@f001_id int,
	@f001_descripcion varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	declare @sql varchar(800) 
	set @sql = ' ';
	SET NOCOUNT ON;
	if @f001_id > 0 
		set @sql += ' AND f001_id = ' + CAST(@f001_id AS VARCHAR(11));
	if NOT RTRIM(LTRIM(@f001_descripcion)) = ''
		set @sql += ' AND f001_descripcion LIKE ' + CHAR(39) + '%' + @f001_id + '%' + CHAR(39);

    -- Insert statements for procedure here
	set @sql = ' SELECT f001_id, f001_descripcion, f001_alive from t001_area where f001_alive = 1 ' + @sql

	exec(@sql)
END


GO
/****** Object:  StoredProcedure [dbo].[stp_area_get_all]    Script Date: 31/03/2021 1:06:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Edgar Nieto
-- Create date: 2021 03 30
-- Description:	Trae todas las areas
-- =============================================
CREATE PROCEDURE [dbo].[stp_area_get_all] 
	-- Add the parameters for the stored procedure here
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	SELECT * from t001_area
END
GO
/****** Object:  StoredProcedure [dbo].[stp_empleado_get]    Script Date: 31/03/2021 1:06:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Edgar Nieto
-- Create date: 2021 03 30
-- Description:	Trae todas los empleados de alive = 1
-- =============================================
CREATE PROCEDURE [dbo].[stp_empleado_get] 
	@f003_id int,
	@f003_username varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	declare @sql varchar(800) 
	set @sql = ' ';
	SET NOCOUNT ON;
	if @f003_id > 0 
		set @sql += ' AND f003_id = ' + CAST(@f003_id AS VARCHAR(11));
	if NOT RTRIM(LTRIM(@f003_username)) = ''
		set @sql += ' AND f003_username LIKE ' + CHAR(39) + '%' + @f003_username + '%' + CHAR(39);

    -- Insert statements for procedure here
	set @sql = ' SELECT f003_id, f003_username, f003_nombre, f003_apellido, f003_titulo, f003_cargo, f003_alive,f003_nombre + ' +char(39) +' ' + char(39)+ ' + f003_apellido f003_fullname from t003_empleado where f003_alive = 1 ' + @sql

	exec(@sql)
END;
GO
/****** Object:  StoredProcedure [dbo].[stp_prioridad_get]    Script Date: 31/03/2021 1:06:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[stp_prioridad_get] 
	@f004_id int,
	@f004_descripcion varchar(50)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	declare @sql varchar(800) 
	set @sql = ' ';
	SET NOCOUNT ON;
	if @f004_id > 0 
		set @sql += ' AND f004_id = ' + CAST(@f004_id AS VARCHAR(11));
	if NOT RTRIM(LTRIM(@f004_descripcion)) = ''
		set @sql += ' AND f004_descripcion LIKE ' + CHAR(39) + '%' + @f004_descripcion + '%' + CHAR(39);

    -- Insert statements for procedure here
	set @sql = ' SELECT f004_id, f004_descripcion, f004_order, f004_alive from t004_prioridad where f004_alive = 1 ' + @sql + ' order by f004_order'

	exec(@sql)
END;
GO
/****** Object:  StoredProcedure [dbo].[stp_requerimiento_insert]    Script Date: 31/03/2021 1:06:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Edgar nieto
-- Create date: 2021 03 30
-- Description:	Inserta un registro de requerimiento
-- =============================================
CREATE PROCEDURE [dbo].[stp_requerimiento_insert] 
	-- Add the parameters for the stored procedure here
	@f005_area int, 
	@f005_aplicativo int, 
	@f005_prioridad int, 
	@f005_ingeniero int, 
	@f005_alcance varchar(800), 
	@f005_dias_desarrollo int, 
	@f005_fecha_solicitud varchar(10), 
	@f005_fecha_desarrollo varchar(10),
	@f005_alive int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
		INSERT INTO PruebaTecnicaEdgarEnriqueNietoValdes.dbo.f005_requerimiento
	(f005_area, f005_aplicativo, f005_prioridad, f005_ingeniero, f005_alcance, f005_dias_desarrollo, f005_fecha_solicitud, f005_fecha_desarrollo, f005_alive)
	VALUES(@f005_area, @f005_aplicativo, @f005_prioridad, @f005_ingeniero, @f005_alcance, @f005_dias_desarrollo, CONVERT(DATE,@f005_fecha_solicitud,23), @f005_fecha_desarrollo, @f005_alive);
END
GO
/****** Object:  StoredProcedure [dbo].[stp_requerimiento_update]    Script Date: 31/03/2021 1:06:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Edgar Nieto
-- Create date: 2021 03 30
-- Description:	Procedimiento para actualizar registros
-- =============================================
CREATE PROCEDURE [dbo].[stp_requerimiento_update]
	-- Add the parameters for the stored procedure here
	@f005_id int,
	@f005_area int, 
	@f005_aplicativo int, 
	@f005_prioridad int, 
	@f005_ingeniero int, 
	@f005_alcance varchar(800), 
	@f005_dias_desarrollo int, 
	@f005_fecha_solicitud varchar(10), 
	@f005_fecha_desarrollo varchar(10),
	@f005_alive int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	UPDATE
	PruebaTecnicaEdgarEnriqueNietoValdes.dbo.f005_requerimiento
SET
	f005_area = @f005_area,
	f005_aplicativo = @f005_aplicativo,
	f005_prioridad = @f005_prioridad,
	f005_ingeniero = @f005_ingeniero,
	f005_alcance = @f005_alcance,
	f005_dias_desarrollo = @f005_dias_desarrollo,
	f005_fecha_solicitud = CONVERT(DATE,@f005_fecha_solicitud,23),
	f005_fecha_desarrollo = CONVERT(DATE,@f005_fecha_desarrollo,23),
	f005_alive = @f005_alive
WHERE
	f005_id = @f005_id;
END
GO
/****** Object:  StoredProcedure [dbo].[stp_requerimientos_get]    Script Date: 31/03/2021 1:06:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Edgar Nieto
-- Create date: 2021 03 30
-- Description:	Procedimiento para consultar los requerimientos
-- =============================================
CREATE PROCEDURE [dbo].[stp_requerimientos_get]
	-- Add the parameters for the stored procedure here
	@f005_id int,
	@f005_area int,
	@f005_aplicativo int,
	@f005_ingeniero int,
	@f005_prioridad int

AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    declare @sql varchar(8000) 
	set @sql = ' ';
	SET NOCOUNT ON;
	if @f005_id > 0 
		set @sql += ' AND f005_id = ' + CAST(@f005_id AS VARCHAR(11));
	if @f005_area > 0 
		set @sql += ' AND f005_area = ' + CAST(@f005_area AS VARCHAR(11));
	if @f005_aplicativo > 0 
		set @sql += ' AND f005_aplicativo = ' + CAST(@f005_aplicativo AS VARCHAR(11));
	if @f005_prioridad > 0 
		set @sql += ' AND f005_prioridad = ' + CAST(@f005_prioridad AS VARCHAR(11));
	if @f005_ingeniero > 0 
		set @sql += ' AND f005_ingeniero = ' + CAST(@f005_ingeniero AS VARCHAR(11));
	

    -- Insert statements for procedure here
	set @sql = ' SELECT 
				f005_id,
				f005_area,
				f001_descripcion, 
				f005_aplicativo,
				f002_descripcion,
				f005_prioridad,
				f004_descripcion,
				f005_ingeniero,
				f003_nombre + '+CHAR(39)+' '+CHAR(39)+' + f003_apellido f003_fullname,
				f005_alcance,
				f005_dias_desarrollo,
				CONVERT(VARCHAR(10), f005_fecha_solicitud,23) f005_fecha_solicitud, 
				CASE WHEN CONVERT(VARCHAR(10),f005_fecha_desarrollo,23) = CONVERT(DATE,'+CHAR(39)+'1900-01-01'+CHAR(39)+',23) THEN  NULL ELSE CONVERT(VARCHAR(10),f005_fecha_desarrollo,23) END f005_fecha_desarrollo,
				f005_alive
				from f005_requerimiento
				LEFT JOIN t001_area ON
					f001_id = f005_area 
				LEFT JOIN t002_aplicativo ON
					f002_id = f005_aplicativo 
				LEFT JOIN t003_empleado ON
					f003_id = f005_ingeniero 
				LEFT JOIN t004_prioridad ON
					f004_id = f005_prioridad 
				where 1=1 ' + @sql + ' order by f005_id'
	-- SELECT @sql
	exec(@sql)
	
END
GO
