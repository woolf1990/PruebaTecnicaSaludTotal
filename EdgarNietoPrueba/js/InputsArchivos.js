

//INICIO (eliminarElemento)     Escucha el botón de eliminar en la ventana flotante y lo quita de la lista
function CargueMasivoImagenes() {
    //var actionData = "{'nombre': '" + id + "','TipoCatalogo':'" + TipoCatalogo + "','divContenido':'" + divContenido + "','divContenidoResul':'" + divContenidoResul + "','DatoVisible':'" + DatoVisible + "','DatoParaElCodigo':'" + DatoParaElCodigo + "'}";
    var session = '';

    var variableconDatos = '';
    var VariableTabla = 'Por Favor espere..';
    $("#btn_Cargar").attr('disabled', 'disabled');
    $('#panelEsperar').html(VariableTabla);
    $('#icon_imagen').removeClass("fa fa-picture-o");
    $('#icon_imagen').addClass("fa fa-spinner fa-spin");
    $.ajax(
    {
        url: "Index.aspx/CarguedeImagenes",
        data: "",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (msg) {
            var prov = msg.d;
            if (prov.CantidaddeImagenes == "-1") {
                variableconDatos = "<div class='panel-group accordion-custom accordion-teal' id='accordion'><div class='panel panel-primary'><div class='panel-heading'><h4 class='panel-title'><a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion' href='#collapse1'><i class='icon-arrow'></i>Detalle del Error</a></h4></div><div id='collapse1' class='panel-collapse collapse'><div class='panel-body'><div class='table-responsive'>" + prov.NombresImagenes + "</div></div></div></div></div>";
                VariableTabla = "Ocurrió un error mientras se procesaba la solicitud, por favor revise el detalle del error e inténtelo nuevamente:<hr/>" + variableconDatos;
            } else {
                variableconDatos = "<div class='panel-group accordion-custom accordion-teal' id='accordion'><div class='panel panel-primary'><div class='panel-heading'><h4 class='panel-title'><a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion' href='#collapse1'><i class='icon-arrow'></i>Imágenes Cargadas</a></h4></div><div id='collapse1' class='panel-collapse collapse'><div class='panel-body'><div class='table-responsive'><table class='table table-bordered table-hover'><thead><tr><th>Nombre de Archivo</th><th>Validación</th></tr></thead><tbody>" + prov.NombresImagenes + "</tdody></table></div></div></div></div></div>";
                VariableTabla = "Se terminó de procesar correctamente <strong>" + prov.CantidaddeImagenes + "</strong> imágenes para obtener detalles del proceso efectuado revise la siguiente información:<hr/>" + variableconDatos;
            }
            $('#icon_imagen').removeClass("fa fa-spinner fa-spin");
            $('#icon_imagen').addClass("fa fa-picture-o");
            $('#panelEsperar').html(VariableTabla);
            $("#btn_Cargar").removeAttr('disabled');
        },
        error: function (result) {
            alert("ERROR " + result.status + ' ' + result.statusText);
            $("#btn_Cargar").removeAttr('disabled');
        }
    });
}
//FIN (eliminarElemento)




$(document).ready(function () {

    $('.solo_numeros').keyup(function () {
        this.value = (this.value + '').replace(/[^0-9]/g, '');
        /*No se admiten ceros*/
        if (this.value <= 0) {
            $(this).val('');
        }
    });

    /*
    Clase para ver la presion de los botones en inventario
    */
    $('.btn_presion').click(function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass("btn-success");
            $(this).addClass("btn-info");
        } else {
            $(this).removeClass("btn-info");
            $(this).addClass("btn-success");
        }
    });

    /*
    Inicializar componentes del tooltip para las listas, esto por que ASP no permite inicializar en sus componentes esta opcion
    */
    $('.BotonLista').attr('data-toggle', 'tooltip');
    $('.BotonLista').attr('data-placement', 'top');
    $('.BotonListaVerActivos').attr('title', 'Ver Activos');
    $('.BotonEditar').attr('title', 'Editar');
    $('.BotonEliminar').attr('title', 'Eliminar');
    $('.BotonProgramar').attr('title', 'Programar');
    $('.BotonListaConstancia').attr('title', 'Constancia de Inventario');
    $('.BotonListaConstanciaResponsable').attr('title', 'Constancia por Responsable');
    $('.BotonListaDetalleActivos').attr('title', 'Detalle Activos');
    $('.BotonListaActaInv').attr('title', 'Acta de Inventario');
    $('.BotonListaExpMod').attr('title', 'Exportar Modificados');
    $('.BotonListaExportSob').attr('title', 'Exportar Sobrantes');
    $('.BotonListaExportBancoDatos').attr('title', 'Exportar Banco de datos');
    $('.BotonCambiarClave').attr('title', 'Cambiar Clave');
    $('.BotonDesbloquear').attr('title', 'Desbloquear');
    $('.BotonAdquisicion').attr('title', 'Adquisición');
    $('.BotonListaVerDetalle').attr('title', 'Ver Detalle');
    $('.BotonListaAdquisicion').attr('title', 'Adquisición');
    $('.BotonListaAsignacion').attr('title', 'Asignación');
    $('.BotonHojadeVida').attr('title', 'Hoja de Vida');
    $('.BotonExportar').attr('title', 'Exportar');
    $('.BotonExportarModificados').attr('title', 'Exportar Modificados');
    $('.BotonListaIngresoDetalle').attr('title', 'Ingreso Detalle'); 
    $('.BotonListaPendienteporCerrar').attr('title', 'Pendiente Por Cerrar'); 
    $('.BotonListaCerarMan').attr('title', 'Cerrar');

    $('.BotonAceptarCambio').attr('title', 'Aceptar');
    $('.BotonRechazarCambio').attr('title', 'Rechazar');
    $('.BotonAceptadoCambio').attr('title', 'Sincronizado');
    $('.BotonRechazadoCambio').attr('title', 'Rechazado');
    $('.BotonDarBaja').attr('title', 'Dar de Baja');
    $('.BotonListaVerMovimientosInventarios').attr('title', 'Ver Movimientos');

});

$(document).ready(function () {

    /*
    Inicio Zona de Botones en consolidado de Activos
    */
    $("#cbResponsableC").change(function () {
        var isChecked = $("#cbResponsableC").is(':checked');
        if (isChecked) {
            //Boton a Ocultar
            $('#btnSeleccionar').show();
            //Inputs a Reiniciar
            $('#CbxResponsable_1').val("");
            $('#Txt_IdResponsable').val("");
            $("#cbCentroC").bootstrapToggle("off");
            $("#cbUnidadC").bootstrapToggle("off");
            $("#cbAreaC").bootstrapToggle("off");
            $("#cbUbicacionC").bootstrapToggle("off");
            $("#cbDireccionC").bootstrapToggle("off");
            $("#cbEmpresaC").bootstrapToggle("off");
            $("#cbGrupoC").bootstrapToggle("off");
            $("#cbRegionalC").bootstrapToggle("off");
            $("#cbCiudadC").bootstrapToggle("off");
            $("#cbCatalogo7C").bootstrapToggle("off");
            $("#cbCatalogo8C").bootstrapToggle("off");
            $("#cbCatalogo9C").bootstrapToggle("off");
        } else {
            //Boton a Ocultar
            $('#btnSeleccionar').hide();
            //Inputs a Reiniciar
            $('#Txt_IdResponsable').val("");
            $('#CbxResponsable_1').val("");
            var $formGroup = $('#CbxResponsable_1').closest(".form-group");
            $formGroup.addClass("is-empty");
        }
    });

    $("#cbCentroC").change(function () {
        var isChecked = $("#cbCentroC").is(':checked');
        if (isChecked) {
            //Boton a Ocultar
            $('#btnSeleccionarCenco').show();
            //Inputs a Reiniciar
            $('#Txt_Descripcion_CentroCosto').val("");
            $('#Txt_Id_CentroCosto').val("");
            $("#cbResponsableC").bootstrapToggle("off");
            $("#cbUnidadC").bootstrapToggle("off");
            $("#cbAreaC").bootstrapToggle("off");
            $("#cbUbicacionC").bootstrapToggle("off");
            $("#cbDireccionC").bootstrapToggle("off");
            $("#cbEmpresaC").bootstrapToggle("off");
            $("#cbGrupoC").bootstrapToggle("off");
            $("#cbRegionalC").bootstrapToggle("off");
            $("#cbCiudadC").bootstrapToggle("off");
            $("#cbCatalogo7C").bootstrapToggle("off");
            $("#cbCatalogo8C").bootstrapToggle("off");
            $("#cbCatalogo9C").bootstrapToggle("off");
        } else {
            //Boton a Ocultar
            $('#btnSeleccionarCenco').hide();
            //Inputs a Reiniciar
            $('#Txt_Id_CentroCosto').val("");
            $('#Txt_Descripcion_CentroCosto').val("");
            var $formGroup = $('#Txt_Descripcion_CentroCosto').closest(".form-group");
            $formGroup.addClass("is-empty");
        }
    });

    $("#cbUnidadC").change(function () {
        var isChecked = $("#cbUnidadC").is(':checked');
        var Boton = $('#btnSeleccionarUEN');
        var TxtId = $('#Txt_Id_UEN');
        var TxtDesc = $('#Txt_Descripcion_UEN');
        if (isChecked) {
            //Boton a Ocultar
            Boton.show();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            $("#cbResponsableC").bootstrapToggle("off");
            $("#cbCentroC").bootstrapToggle("off");
            $("#cbAreaC").bootstrapToggle("off");
            $("#cbUbicacionC").bootstrapToggle("off");
            $("#cbDireccionC").bootstrapToggle("off");
            $("#cbEmpresaC").bootstrapToggle("off");
            $("#cbGrupoC").bootstrapToggle("off");
            $("#cbRegionalC").bootstrapToggle("off");
            $("#cbCiudadC").bootstrapToggle("off");
            $("#cbCatalogo7C").bootstrapToggle("off");
            $("#cbCatalogo8C").bootstrapToggle("off");
            $("#cbCatalogo9C").bootstrapToggle("off");
        } else {
            //Boton a Ocultar
            Boton.hide();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            var $formGroup = TxtDesc.closest(".form-group");
            $formGroup.addClass("is-empty");
        }
    });

    $("#cbAreaC").change(function () {
        var isChecked = $("#cbAreaC").is(':checked');
        var Boton = $('#btnSeleccionarArea');
        var TxtId = $('#Txt_Id_Area');
        var TxtDesc = $('#Txt_Descripcion_Area');
        if (isChecked) {
            //Boton a Ocultar
            Boton.show();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            $("#cbResponsableC").bootstrapToggle("off");
            $("#cbCentroC").bootstrapToggle("off");
            $("#cbUnidadC").bootstrapToggle("off");
            $("#cbUbicacionC").bootstrapToggle("off");
            $("#cbDireccionC").bootstrapToggle("off");
            $("#cbEmpresaC").bootstrapToggle("off");
            $("#cbGrupoC").bootstrapToggle("off");
            $("#cbRegionalC").bootstrapToggle("off");
            $("#cbCiudadC").bootstrapToggle("off");
            $("#cbCatalogo7C").bootstrapToggle("off");
            $("#cbCatalogo8C").bootstrapToggle("off");
            $("#cbCatalogo9C").bootstrapToggle("off");
        } else {
            //Boton a Ocultar
            Boton.hide();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            var $formGroup = TxtDesc.closest(".form-group");
            $formGroup.addClass("is-empty");
        }
    });

    $("#cbUbicacionC").change(function () {
        var isChecked = $("#cbUbicacionC").is(':checked');
        var Boton = $('#btnSeleccionarUbicacion');
        var TxtId = $('#Txt_Id_Ubicacion');
        var TxtDesc = $('#Txt_Descripcion_Ubicacion');
        if (isChecked) {
            //Boton a Ocultar
            Boton.show();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            $("#cbResponsableC").bootstrapToggle("off");
            $("#cbCentroC").bootstrapToggle("off");
            $("#cbUnidadC").bootstrapToggle("off");
            $("#cbAreaC").bootstrapToggle("off");
            $("#cbDireccionC").bootstrapToggle("off");
            $("#cbEmpresaC").bootstrapToggle("off");
            $("#cbGrupoC").bootstrapToggle("off");
            $("#cbRegionalC").bootstrapToggle("off");
            $("#cbCiudadC").bootstrapToggle("off");
            $("#cbCatalogo7C").bootstrapToggle("off");
            $("#cbCatalogo8C").bootstrapToggle("off");
            $("#cbCatalogo9C").bootstrapToggle("off");
        } else {
            //Boton a Ocultar
            Boton.hide();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            var $formGroup = TxtDesc.closest(".form-group");
            $formGroup.addClass("is-empty");
        }
    });

    $("#cbDireccionC").change(function () {
        var isChecked = $("#cbDireccionC").is(':checked');
        var Boton = $('#btnSeleccionarDireccion');
        var TxtId = $('#Txt_Id_Direccion');
        var TxtDesc = $('#Txt_Descripcion_Direccion');
        if (isChecked) {
            //Boton a Ocultar
            Boton.show();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            $("#cbResponsableC").bootstrapToggle("off");
            $("#cbCentroC").bootstrapToggle("off");
            $("#cbUnidadC").bootstrapToggle("off");
            $("#cbAreaC").bootstrapToggle("off");
            $("#cbUbicacionC").bootstrapToggle("off");
            $("#cbEmpresaC").bootstrapToggle("off");
            $("#cbGrupoC").bootstrapToggle("off");
            $("#cbRegionalC").bootstrapToggle("off");
            $("#cbCiudadC").bootstrapToggle("off");
            $("#cbCatalogo7C").bootstrapToggle("off");
            $("#cbCatalogo8C").bootstrapToggle("off");
            $("#cbCatalogo9C").bootstrapToggle("off");
        } else {
            //Boton a Ocultar
            Boton.hide();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            var $formGroup = TxtDesc.closest(".form-group");
            $formGroup.addClass("is-empty");
        }
    });

    $("#cbEmpresaC").change(function () {
        var isChecked = $("#cbEmpresaC").is(':checked');
        var Boton = $('#btnSeleccionarEmpresa');
        var TxtId = $('#Txt_Id_Empresa');
        var TxtDesc = $('#Txt_Descripcion_Empresa');
        if (isChecked) {
            //Boton a Ocultar
            Boton.show();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            $("#cbResponsableC").bootstrapToggle("off");
            $("#cbCentroC").bootstrapToggle("off");
            $("#cbUnidadC").bootstrapToggle("off");
            $("#cbAreaC").bootstrapToggle("off");
            $("#cbUbicacionC").bootstrapToggle("off");
            $("#cbDireccionC").bootstrapToggle("off");
            $("#cbGrupoC").bootstrapToggle("off");
            $("#cbRegionalC").bootstrapToggle("off");
            $("#cbCiudadC").bootstrapToggle("off");
            $("#cbCatalogo7C").bootstrapToggle("off");
            $("#cbCatalogo8C").bootstrapToggle("off");
            $("#cbCatalogo9C").bootstrapToggle("off");
        } else {
            //Boton a Ocultar
            Boton.hide();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            var $formGroup = TxtDesc.closest(".form-group");
            $formGroup.addClass("is-empty");
        }
    });

    $("#cbGrupoC").change(function () {
        var isChecked = $("#cbGrupoC").is(':checked');
        var Boton = $('#btnSeleccionarGrupo');
        var TxtId = $('#Txt_Id_Grupo');
        var TxtDesc = $('#Txt_Descripcion_Grupo');
        if (isChecked) {
            //Boton a Ocultar
            Boton.show();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            $("#cbResponsableC").bootstrapToggle("off");
            $("#cbCentroC").bootstrapToggle("off");
            $("#cbUnidadC").bootstrapToggle("off");
            $("#cbAreaC").bootstrapToggle("off");
            $("#cbUbicacionC").bootstrapToggle("off");
            $("#cbDireccionC").bootstrapToggle("off");
            $("#cbEmpresaC").bootstrapToggle("off");
            $("#cbRegionalC").bootstrapToggle("off");
            $("#cbCiudadC").bootstrapToggle("off");
            $("#cbCatalogo7C").bootstrapToggle("off");
            $("#cbCatalogo8C").bootstrapToggle("off");
            $("#cbCatalogo9C").bootstrapToggle("off");
        } else {
            //Boton a Ocultar
            Boton.hide();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            var $formGroup = TxtDesc.closest(".form-group");
            $formGroup.addClass("is-empty");
        }
    });

    $("#cbRegionalC").change(function () {
        
        var isChecked = $("#cbRegionalC").is(':checked');
        var Boton = $('#btnSeleccionarRegional');
        var TxtId = $('#Txt_Id_Regional');
        var TxtDesc = $('#Txt_Descripcion_Regional');
        if (isChecked) {
            //Boton a Ocultar
            Boton.show();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            $("#cbResponsableC").bootstrapToggle("off");
            $("#cbCentroC").bootstrapToggle("off");
            $("#cbUnidadC").bootstrapToggle("off");
            $("#cbAreaC").bootstrapToggle("off");
            $("#cbUbicacionC").bootstrapToggle("off");
            $("#cbDireccionC").bootstrapToggle("off");
            $("#cbEmpresaC").bootstrapToggle("off");
            $("#cbGrupoC").bootstrapToggle("off");
            $("#cbCiudadC").bootstrapToggle("off");
            $("#cbCatalogo7C").bootstrapToggle("off");
            $("#cbCatalogo8C").bootstrapToggle("off");
            $("#cbCatalogo9C").bootstrapToggle("off");
        } else {
            //Boton a Ocultar
            Boton.hide();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            var $formGroup = TxtDesc.closest(".form-group");
            $formGroup.addClass("is-empty");
        }
    });

    $("#cbCiudadC").change(function () {
        
        var isChecked = $("#cbCiudadC").is(':checked');
        var Boton = $('#btnSeleccionarCiudad');
        var TxtId = $('#Txt_Id_Ciudad');
        var TxtDesc = $('#Txt_Descripcion_Ciudad');
        if (isChecked) {
            //Boton a Ocultar
            Boton.show();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            $("#cbResponsableC").bootstrapToggle("off");
            $("#cbCentroC").bootstrapToggle("off");
            $("#cbUnidadC").bootstrapToggle("off");
            $("#cbAreaC").bootstrapToggle("off");
            $("#cbUbicacionC").bootstrapToggle("off");
            $("#cbDireccionC").bootstrapToggle("off");
            $("#cbEmpresaC").bootstrapToggle("off");
            $("#cbGrupoC").bootstrapToggle("off");
            $("#cbRegionalC").bootstrapToggle("off");
            $("#cbCatalogo7C").bootstrapToggle("off");
            $("#cbCatalogo8C").bootstrapToggle("off");
            $("#cbCatalogo9C").bootstrapToggle("off");
        } else {
            //Boton a Ocultar
            Boton.hide();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            var $formGroup = TxtDesc.closest(".form-group");
            $formGroup.addClass("is-empty");
        }
    });

    $("#cbCatalogo7C").change(function () {
        var isChecked = $("#cbCatalogo7C").is(':checked');
        var Boton = $('#btnSeleccionarCatalogo7');
        var TxtId = $('#Txt_Id_Catalogo7');
        var TxtDesc = $('#Txt_Descripcion_Catalogo7');
        if (isChecked) {
            //Boton a Ocultar
            Boton.show();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            $("#cbResponsableC").bootstrapToggle("off");
            $("#cbCentroC").bootstrapToggle("off");
            $("#cbUnidadC").bootstrapToggle("off");
            $("#cbAreaC").bootstrapToggle("off");
            $("#cbUbicacionC").bootstrapToggle("off");
            $("#cbDireccionC").bootstrapToggle("off");
            $("#cbEmpresaC").bootstrapToggle("off");
            $("#cbGrupoC").bootstrapToggle("off");
            $("#cbRegionalC").bootstrapToggle("off");
            $("#cbCiudadC").bootstrapToggle("off");
            $("#cbCatalogo8C").bootstrapToggle("off");
            $("#cbCatalogo9C").bootstrapToggle("off");
        } else {
            //Boton a Ocultar
            Boton.hide();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            var $formGroup = TxtDesc.closest(".form-group");
            $formGroup.addClass("is-empty");
        }
    });

    $("#cbCatalogo8C").change(function () {
        
        var isChecked = $("#cbCatalogo8C").is(':checked');
        var Boton = $('#btnSeleccionarCatalogo8');
        var TxtId = $('#Txt_Id_Catalogo8');
        var TxtDesc = $('#Txt_Descripcion_Catalogo8');
        if (isChecked) {
            //Boton a Ocultar
            Boton.show();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            $("#cbResponsableC").bootstrapToggle("off");
            $("#cbCentroC").bootstrapToggle("off");
            $("#cbUnidadC").bootstrapToggle("off");
            $("#cbAreaC").bootstrapToggle("off");
            $("#cbUbicacionC").bootstrapToggle("off");
            $("#cbDireccionC").bootstrapToggle("off");
            $("#cbEmpresaC").bootstrapToggle("off");
            $("#cbGrupoC").bootstrapToggle("off");
            $("#cbRegionalC").bootstrapToggle("off");
            $("#cbCiudadC").bootstrapToggle("off");
            $("#cbCatalogo7C").bootstrapToggle("off");
            $("#cbCatalogo9C").bootstrapToggle("off");
        } else {
            //Boton a Ocultar
            Boton.hide();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            var $formGroup = TxtDesc.closest(".form-group");
            $formGroup.addClass("is-empty");
        }
    });

    $("#cbCatalogo9C").change(function () {
        
        var isChecked = $("#cbCatalogo9C").is(':checked');
        var Boton = $('#btnSeleccionarCatalogo9');
        var TxtId = $('#Txt_Id_Catalogo9');
        var TxtDesc = $('#Txt_Descripcion_Catalogo9');
        if (isChecked) {
            //Boton a Ocultar
            Boton.show();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            $("#cbResponsableC").bootstrapToggle("off");
            $("#cbCentroC").bootstrapToggle("off");
            $("#cbUnidadC").bootstrapToggle("off");
            $("#cbAreaC").bootstrapToggle("off");
            $("#cbUbicacionC").bootstrapToggle("off");
            $("#cbDireccionC").bootstrapToggle("off");
            $("#cbEmpresaC").bootstrapToggle("off");
            $("#cbGrupoC").bootstrapToggle("off");
            $("#cbRegionalC").bootstrapToggle("off");
            $("#cbCiudadC").bootstrapToggle("off");
            $("#cbCatalogo7C").bootstrapToggle("off");
            $("#cbCatalogo8C").bootstrapToggle("off");
        } else {
            //Boton a Ocultar
            Boton.hide();
            //Inputs a Reiniciar
            TxtId.val("");
            TxtDesc.val("");
            var $formGroup = TxtDesc.closest(".form-group");
            $formGroup.addClass("is-empty");
        }
    });

    /*
    Fin Zona de Botones en consolidado de Activos
    */
});
//Para el consolidado de Activos Fijos
//$(document).ready(function () {
    
//});

//deescarga de todas las tablas de la base de datos
$(document).ready(function () {

    $("#ContentPlaceHolder1_cbxDownLoadAll").change(function () {

        var isChecked = $("#ContentPlaceHolder1_cbxDownLoadAll").is(':checked');

        if (isChecked) {
            $("#ContentPlaceHolder1_t001").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t002").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t003").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t004").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t005").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t0051").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t006").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t007").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t008").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t009").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t010").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t011").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t012").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t013").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t014").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t015").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t016").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t017").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t018").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t019").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t020").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t021").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t022").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t023").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t024").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t025").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t026").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t027").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t028").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t029").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t030").bootstrapToggle("on");

            $("#ContentPlaceHolder1_t031").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t032").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t033").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t034").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t035").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t036").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t0361").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t037").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t038").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t0381").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t039").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t040").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t042").bootstrapToggle("on");

            $("#ContentPlaceHolder1_t0421").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t0422").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t0423").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t0424").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t0425").bootstrapToggle("on");

            $("#ContentPlaceHolder1_t043").bootstrapToggle("on");


            $("#ContentPlaceHolder1_t0431").bootstrapToggle("on");

            $("#ContentPlaceHolder1_t044").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t045").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t047").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t0426").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t048").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t049").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t050").bootstrapToggle("on");
            $("#ContentPlaceHolder1_t051").bootstrapToggle("on");
        }

    });
});

//$(document).ready(function () {

//    //$("#loader").show();
//    $.ajax({
//        type: "GET",
//        url: "Index.aspx/cargarView",
//        data: "{}",
//        contentType: "application/json",
//        dataType: "json",
//        success: function (data) {
//            //$("#loader").hide();
//            //$(#dvgrid).html(data);
//        },
//        // it's good to have an error fallback
//        error: function (jqhxr, stat, err) {
//            //$("#loader").hide();
//            //$(#dvgrid).html('');
//            //$("#error").show();
//        }
//    });
//});


/*
Se inserta una nueva funcion para inabilitar los botones una vez se da clien en uno de ellos
*/
function EliminacionFrm() {
    $("#icon_update").removeClass("fa fa-minus-circle");
    $("#icon_update").addClass("fa fa-spinner fa-spin");
    var el = $('#form_insert_panel');
    el.block({
        overlayCSS: {
            backgroundColor: '#fff'
        },
        message: '<i class="fa fa-spinner fa-spin"></i> Un momento por favor...',
        css: {
            border: 'none',
            color: '#333',
            background: 'none'
        }
    });
}

function Guardar() {
    if (Page_ClientValidate()) {
        $("#icon_save").removeClass("fa fa-floppy-o");
        $("#icon_save").addClass("fa fa-spinner fa-spin");
        var el = $('#form_insert_panel');
        el.block({
            overlayCSS: {
                backgroundColor: '#fff'
            },
            message: '<i class="fa fa-spinner fa-spin"></i> Guardando, un momento por favor...',
            css: {
                border: 'none',
                color: '#333',
                background: 'none'
            }
        });
    }
}

function Actualizar() {
    if (Page_ClientValidate()) {
        $("#icon_update").removeClass("fa fa-refresh");
        $("#icon_update").addClass("fa fa-spinner fa-spin");
        var el = $('#form_insert_panel');
        el.block({
            overlayCSS: {
                backgroundColor: '#fff'
            },
            message: '<i class="fa fa-spinner fa-spin"></i> Actualizando, un momento por favor...',
            css: {
                border: 'none',
                color: '#333',
                background: 'none'
            }
        });
    }
}

function AsignarValor() {
    if (Page_ClientValidate()) {
        $("#icon_update").removeClass("fa fa-exchange");
        $("#icon_update").addClass("fa fa-spinner fa-spin");
        var el = $('#form_insert_panel');
        el.block({
            overlayCSS: {
                backgroundColor: '#fff'
            },
            message: '<i class="fa fa-spinner fa-spin"></i> Asignando, un momento por favor...',
            css: {
                border: 'none',
                color: '#333',
                background: 'none'
            }
        });
    }
}

function Actualizar_SinVal() {
    $("#icon_update").removeClass("fa fa-refresh");
    $("#icon_update").addClass("fa fa-spinner fa-spin");
    var el = $('#form_insert_panel');
    el.block({
        overlayCSS: {
            backgroundColor: '#fff'
        },
        message: '<i class="fa fa-spinner fa-spin"></i> Actualizando, un momento por favor...',
        css: {
            border: 'none',
            color: '#333',
            background: 'none'
        }
    });
}

$(function () {
    $('.button-checkbox').each(function () {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'fa fa-check-circle'
                },
                off: {
                    icon: 'fa fa-circle'
                }
            };

        // Event Handlers
        $button.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            }
            else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }
        init();
    });
});
//Fin Check BOX

/*

Chechear controles luego de que lanza un error un formulario

*/
$(document).ready(function () {
    var isChecked = $("#ContentPlaceHolder1_Activo_LogeoDA").is(':checked');
    if (isChecked) {
        $("#Informacion_DA").html("<div class='alert alert-info'><i class='material-icons size-18'>info</i> El usuario inicia sesión con las credenciales del dominio <strong>exceptuando Sabueso móvil</strong> (Aplicativo en terminal móvil) ahí se tendrá que digitar la contraseña escrita a continuación.</div>");
    } else {
        $("#Informacion_DA").html("<div class='alert alert-danger'><i class='material-icons size-18'>info</i> El usuario inicia sesión con las credenciales (usuario y clave) que están digitadas a continuación y omite las credenciales del dominio.</div>");
    }


    $("#ContentPlaceHolder1_RadioUpdate").change(function () {
        var isChecked = $("#ContentPlaceHolder1_RadioUpdate").is(':checked');
        if (isChecked) {
            $("#Informacion_AD").html("<div class='alert alert-info'>SI decide actualizar el ID de esta maestra se borraran los inventarios que estén creados y/o programados (Pendientes por descarga en la móvil).</div>");
            $("#ContentPlaceHolder1_Txt_Id_Categoria").prop("disabled", !isChecked);
        } else {
            $("#Informacion_AD").html("Ingrese la siguiente información");
            $("#ContentPlaceHolder1_Txt_Id_Categoria").prop("disabled", !isChecked);
            $("#ContentPlaceHolder1_Txt_Id_Categoria").val($("#txttmp").val());
        }
    });

    $("#ContentPlaceHolder1_Activo_LogeoDA").change(function () {
        var isChecked = $("#ContentPlaceHolder1_Activo_LogeoDA").is(':checked');
        if (isChecked) {
            $("#Informacion_DA").html("<div class='alert alert-info'><i class='material-icons size-18'>info</i> El usuario inicia sesión con las credenciales del dominio <strong>exceptuando Sabueso móvil</strong> (Aplicativo en terminal móvil) ahí se tendrá que digitar la contraseña escrita a continuación.</div>");
        } else {
            $("#Informacion_DA").html("<div class='alert alert-danger'><i class='material-icons size-18'>info</i> El usuario inicia sesión con las credenciales (usuario y clave) que están digitadas a continuación y omite las credenciales del dominio.</div>");
        }
    });

    var isChecked = $("#ContentPlaceHolder1_Activo_Descripcion").is(':checked');

    $("#ContentPlaceHolder1_text_Descripcion").prop("readonly", !isChecked);

    if (isChecked) {
        $("#ContentPlaceHolder1_Impresion_Descripcion").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Descripcion").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Descripcion").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Impresion_Descripcion").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Descripcion").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Descripcion").bootstrapToggle("disable");
    }

    isChecked = $('#ContentPlaceHolder1_Activo_Categoria').is(':checked');

    if (isChecked) {
        $("#ContentPlaceHolder1_Impresion_Categoria").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Categoria").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Categoria").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Impresion_Categoria").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Categoria").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Categoria").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Categoria").prop("readonly", !isChecked);
    $("#ContentPlaceHolder1_Posicion_Maestra_IdCategoria").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_Maestra_DesCategoria").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_SubCategoria').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Impresion_SubCategoria").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_SubCategoria").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_SubCategoria").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Impresion_SubCategoria").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_SubCategoria").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_SubCategoria").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_SubCategoria").prop("readonly", !isChecked);
    $("#ContentPlaceHolder1_Posicion_SubCategoria").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Catalogo1').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Impresion_Catalogo1").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo1").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo1").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Impresion_Catalogo1").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo1").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo1").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Catalogo1").prop("readonly", !isChecked);
    $("#ContentPlaceHolder1_Posicion_Catalogo1").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Catalogo2').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Impresion_Catalogo2").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo2").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo2").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Impresion_Catalogo2").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo2").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo2").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Catalogo2").prop("readonly", !isChecked);
    $("#ContentPlaceHolder1_Posicion_Catalogo2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Catalogo3').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Impresion_Catalogo3").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo3").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo3").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Impresion_Catalogo3").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo3").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo3").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Catalogo3").prop("readonly", !isChecked);
    $("#ContentPlaceHolder1_Posicion_Catalogo3").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_TipoActivo').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Impresion_TipoActivo").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_TipoActivo").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_TipoActivo").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Impresion_TipoActivo").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_TipoActivo").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_TipoActivo").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_TipoActivo").prop("readonly", !isChecked);
    $("#ContentPlaceHolder1_Posicion_TipoActivo").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Marca').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Impresion_Marca").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Marca").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Marca").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Impresion_Marca").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Marca").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Marca").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Marca").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Proveedor').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Obligatorio_Proveedor").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_Proveedor").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Proveedor").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Obligatorio_Proveedor").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_Proveedor").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Proveedor").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Proveedor").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Material').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Impresion_Material").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Material").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Material").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Impresion_Material").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Material").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Material").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Material").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Color').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Impresion_Color").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Color").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Color").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Impresion_Color").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Color").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Color").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Color").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Catalogo4').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Impresion_Catalogo4").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo4").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo4").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Impresion_Catalogo4").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo4").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo4").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Catalogo4").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Catalogo5').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Impresion_Catalogo5").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo5").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo5").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Impresion_Catalogo5").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo5").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo5").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Catalogo5").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Catalogo6').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Impresion_Catalogo6").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo6").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo6").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Impresion_Catalogo6").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo6").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo6").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Catalogo6").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_EstadoFisico').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_EstadoFisico").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_EstadoFisico").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_EstadoFisico").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_EstadoFisico").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_EstadoFisico").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_EstadoFisico").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_EstadoFisico").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_EstadoFisico").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_EstadoFisico").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Responsable').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_Responsable").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_Responsable").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Responsable").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Responsable").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Prestamo_Responsable").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_Responsable").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_Responsable").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Responsable").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Responsable").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Prestamo_Responsable").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Responsable").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_CentroDeCostos').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_CentroDeCostos").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_CentroDeCostos").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_CentroDeCostos").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_CentroDeCostos").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Prestamo_CentroCosto").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_CentroDeCostos").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_CentroDeCostos").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_CentroDeCostos").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_CentroDeCostos").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Prestamo_CentroCosto").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_CentroDeCostos").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_UnidadNegocio').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_UnidadNegocio").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_UnidadNegocio").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_UnidadNegocio").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_UnidadNegocio").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Prestamo_UnidadNegocio").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_UnidadNegocio").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_UnidadNegocio").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_UnidadNegocio").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_UnidadNegocio").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Prestamo_UnidadNegocio").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_UnidadNegocio").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_AreaDepartamento').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_AreaDepartamento").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_AreaDepartamento").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_AreaDepartamento").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_AreaDepartamento").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Prestamo_AreaDepartamento").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_AreaDepartamento").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_AreaDepartamento").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_AreaDepartamento").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_AreaDepartamento").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Prestamo_AreaDepartamento").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_AreaDepartamento").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Ubicacion').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_Ubicacion").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_Ubicacion").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Ubicacion").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Ubicacion").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Prestamo_Ubicacion").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_Ubicacion").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_Ubicacion").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Ubicacion").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Ubicacion").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Prestamo_Ubicacion").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Ubicacion").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Direccion').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_Direccion").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_Direccion").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Direccion").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Direccion").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Prestamo_Direccion").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_Direccion").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_Direccion").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Direccion").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Direccion").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Prestamo_Direccion").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Direccion").prop("readonly", !isChecked);
    /////////////////////////////////////////////////////////////////////////////////////////

    isChecked = $('#ContentPlaceHolder1_Activo_Empresa').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_Empresa").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_Empresa").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Empresa").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Empresa").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Prestamo_Empresa").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_Empresa").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_Empresa").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Empresa").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Empresa").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Prestamo_Empresa").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Empresa").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Grupo').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_Grupo").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_Grupo").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Grupo").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Grupo").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Prestamo_Grupo").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_Grupo").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_Grupo").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Grupo").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Grupo").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Prestamo_Grupo").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Grupo").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Regional').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_Regional").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_Regional").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Regional").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Regional").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Prestamo_Regional").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_Regional").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_Regional").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Regional").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Regional").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Prestamo_Regional").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Regional").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Ciudad').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_Ciudad").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_Ciudad").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Ciudad").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Ciudad").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Prestamo_Ciudad").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_Ciudad").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_Ciudad").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Ciudad").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Ciudad").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Prestamo_Ciudad").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Ciudad").prop("readonly", !isChecked);
    ///////////////////////////////////////////////////////////////////////////////////////////////
    isChecked = $('#ContentPlaceHolder1_Activo_Catalogo7').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_Catalogo7").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_Catalogo7").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo7").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo7").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Prestamo_Catalogo7").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_Catalogo7").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_Catalogo7").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo7").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo7").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Prestamo_Catalogo7").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Catalogo7").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Catalogo8').is(':checked');

    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_Catalogo8").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_Catalogo8").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo8").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo8").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Prestamo_Catalogo8").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_Catalogo8").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_Catalogo8").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo8").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo8").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Prestamo_Catalogo8").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Catalogo8").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Catalogo9').is(':checked');
    if (isChecked) {
        $("#ContentPlaceHolder1_Inventario_Catalogo9").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Impresion_Catalogo9").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo9").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo9").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Prestamo_Catalogo9").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Inventario_Catalogo9").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Impresion_Catalogo9").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Obligatorio_Catalogo9").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo9").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Prestamo_Catalogo9").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_text_Catalogo9").prop("readonly", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Impresion').is(':checked');

    if (isChecked) {
        $("#ContentPlaceHolder1_Activo_Impresoras").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_Activo_Formatos").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Activo_Impresoras").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_Activo_Formatos").bootstrapToggle("disable");
    }
    $("#ContentPlaceHolder1_Activo_Impresoras").prop("checked", isChecked);
    $("#ContentPlaceHolder1_Activo_Formatos").prop("checked", isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Descripcion1_new').is(':checked');

    $("#ContentPlaceHolder1_Titulo_Descripcion1").prop("disabled", !isChecked);
    //$("#ContentPlaceHolder1_Obligatorio_Descripcion1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_Descripcion1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Descripcion1_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Descripcion1_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Descripcion1_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Descripcion2_new').is(':checked');

    $("#ContentPlaceHolder1_Titulo_Descripcion2").prop("disabled", !isChecked);
    //$("#ContentPlaceHolder1_Obligatorio_Descripcion2").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_Descripcion2").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Descripcion2_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Descripcion2_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Descripcion2_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Descripcion3').is(':checked');

    $("#ContentPlaceHolder1_Titulo_Descripcion3").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_Descripcion3").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Descripcion3_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Descripcion3_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Descripcion3_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_FechaAdquisicion').is(':checked');

    $("#ContentPlaceHolder1_Posicion_FechaAdquisicion").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_FechaInicialGarantia').is(':checked');

    $("#ContentPlaceHolder1_Posicion_FechaInicialGarantia").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_FechaFinalGarantia').is(':checked');

    $("#ContentPlaceHolder1_Posicion_FechaFinalGarantia").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_NumeroOrdenCompra').is(':checked');

    $("#ContentPlaceHolder1_Titulo_NumeroOrdenCompra").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_NumeroOrdenCompra").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_NumeroOrdenCompra_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_NumeroOrdenCompra_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_NumeroOrdenCompra_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_NumeroFactura').is(':checked');

    $("#ContentPlaceHolder1_Titulo_NumeroFactura").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_NumeroFactura").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_NumeroFactura_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_NumeroFactura_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_NumeroFactura_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Modelo').is(':checked');

    $("#ContentPlaceHolder1_Titulo_Modelo").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_Modelo").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Modelo_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Modelo_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Modelo_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_UrlFoto').is(':checked');

    $("#ContentPlaceHolder1_Posicion_UrlFoto").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Unidades').is(':checked');

    $("#ContentPlaceHolder1_Posicion_Unidades").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Unidades').is(':checked');

    $("#ContentPlaceHolder1_Posicion_Unidades").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_CostoUnidad').is(':checked');

    $("#ContentPlaceHolder1_Posicion_CostoUnidad").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_ValorTotal').is(':checked');

    $("#ContentPlaceHolder1_Titulo_ValorTotal").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_ValorTotal").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_ValorTotal_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_ValorTotal_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_ValorTotal_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_AdDescripcion1').is(':checked');

    $("#ContentPlaceHolder1_Titulo_AdDescripcion1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_AdDescripcion1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AdDescripcion1_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AdDescripcion1_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AdDescripcion1_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_AdDescripcion2').is(':checked');

    $("#ContentPlaceHolder1_Titulo_AdDescripcion2").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_AdDescripcion2").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AdDescripcion2_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AdDescripcion2_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AdDescripcion2_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_AdDescripcion3').is(':checked');

    $("#ContentPlaceHolder1_Titulo_AdDescripcion3").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_AdDescripcion3").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AdDescripcion3_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AdDescripcion3_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AdDescripcion3_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_VidaUtil').is(':checked');

    $("#ContentPlaceHolder1_Posicion_VidaUtil").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_VidaUtilNif').is(':checked');

    $("#ContentPlaceHolder1_Posicion_VidaUtilNif").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_VidaUtilFiscal').is(':checked');

    $("#ContentPlaceHolder1_Posicion_VidaUtilFiscal").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_NumeroActivo').is(':checked');

    $("#ContentPlaceHolder1_Posicion_NumeroActivo").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_NumeroErp').is(':checked');

    $("#ContentPlaceHolder1_Posicion_NumeroErp").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_NumeroTag').is(':checked');

    $("#ContentPlaceHolder1_Posicion_NumeroTag").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_Serie').is(':checked');

    $("#ContentPlaceHolder1_Titulo_Serie").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_Serie").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Serie_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Serie_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_Serie_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_AsiDescripcio1').is(':checked');

    $("#ContentPlaceHolder1_Titulo_AsiDescripcio1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_AsiDescripcio1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AsiDescripcio1_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AsiDescripcio1_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AsiDescripcio1_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_AsiDescripcio2').is(':checked');
    $("#ContentPlaceHolder1_Titulo_AsiDescripcio2").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_AsiDescripcio2").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AsiDescripcio2_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AsiDescripcio2_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AsiDescripcio2_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_AsiDescripcion3').is(':checked');

    $("#ContentPlaceHolder1_Titulo_AsiDescripcion3").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Posicion_AsiDescripcion3").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AsiDescripcion3_0").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AsiDescripcion3_1").prop("disabled", !isChecked);
    $("#ContentPlaceHolder1_Option_AsiDescripcion3_2").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_ApruebaBaja').is(':checked');

    $("#ContentPlaceHolder1_Posicion_ApruebaBaja").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_ObservacionesBaja').is(':checked');

    $("#ContentPlaceHolder1_Posicion_ObservacionesBaja").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_EstadoVigencia').is(':checked');

    $("#ContentPlaceHolder1_Posicion_EstadoVigencia").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_VidaUtil').is(':checked');

    $("#ContentPlaceHolder1_Posicion_VidaUtil").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_VidaUtilNif').is(':checked');

    $("#ContentPlaceHolder1_Posicion_VidaUtilNif").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_VidaUtilFiscal').is(':checked');

    $("#ContentPlaceHolder1_Posicion_VidaUtilFiscal").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_NumeroActivo').is(':checked');

    $("#ContentPlaceHolder1_Posicion_NumeroActivo").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_NumeroErp').is(':checked');

    $("#ContentPlaceHolder1_Posicion_NumeroErp").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_NumeroTag').is(':checked');

    $("#ContentPlaceHolder1_Posicion_NumeroTag").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_EstadoVigencia').is(':checked');

    $("#ContentPlaceHolder1_Posicion_EstadoVigencia").prop("disabled", !isChecked);

    isChecked = $('#ContentPlaceHolder1_Activo_ApruebaBaja').is(':checked');

    $("#ContentPlaceHolder1_Posicion_ApruebaBaja").prop("disabled", !isChecked);


    $("#ContentPlaceHolder1_Activo_CreacionActivo").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_CreacionActivo').is(':checked');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Descripcion").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Descripcion").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Descripcion").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Categoria").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Categoria").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Categoria").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_SubCategoria").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_SubCategoria").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_SubCategoria").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Catalogo1").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Catalogo1").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Catalogo1").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Catalogo2").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Catalogo2").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Catalogo2").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Catalogo3").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Catalogo3").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Catalogo3").trigger('click');
    });

    $("#ContentPlaceHolder1_Activo_Descripcion").change(function () {

        var isChecked = $('#ContentPlaceHolder1_Activo_Descripcion').is(':checked');

        $("#ContentPlaceHolder1_text_Descripcion").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Impresion_Descripcion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Descripcion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Descripcion').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Impresion_Descripcion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Descripcion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Descripcion').bootstrapToggle('disable');
        }

        $("#ContentPlaceHolder1_Posicion_Descripcion").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_Categoria").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Categoria').is(':checked');

        $("#ContentPlaceHolder1_text_Categoria").prop("readonly", !isChecked);

        if (isChecked) {
            $('#ContentPlaceHolder1_Impresion_Categoria').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Categoria').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Categoria').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Impresion_Categoria').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Categoria').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Categoria').bootstrapToggle('disable');
        }

        $("#ContentPlaceHolder1_Posicion_Maestra_IdCategoria").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_Maestra_DesCategoria").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_SubCategoria").change(function () {

        var isChecked = $('#ContentPlaceHolder1_Activo_SubCategoria').is(':checked');

        $("#ContentPlaceHolder1_text_SubCategoria").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Impresion_SubCategoria').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_SubCategoria').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_SubCategoria').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Impresion_SubCategoria').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_SubCategoria').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_SubCategoria').bootstrapToggle('disable');
        }


        $("#ContentPlaceHolder1_Posicion_Maestra_IdSubCategoria").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_Maestra_DesSubCategoria").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_Catalogo1").change(function () {

        var isChecked = $('#ContentPlaceHolder1_Activo_Catalogo1').is(':checked');

        $("#ContentPlaceHolder1_text_Catalogo1").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Impresion_Catalogo1').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Catalogo1').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo1').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Impresion_Catalogo1').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Catalogo1').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo1').bootstrapToggle('disable');
        }

        $("#ContentPlaceHolder1_Posicion_Maestra_IdCatalogo1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_Maestra_DesCatalogo1").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_Catalogo2").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Catalogo2').is(':checked');

        $("#ContentPlaceHolder1_text_Catalogo2").prop("readonly", !isChecked);

        if (isChecked) {
            $('#ContentPlaceHolder1_Impresion_Catalogo2').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Catalogo2').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo2').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Impresion_Catalogo2').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Catalogo2').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo2').bootstrapToggle('disable');
        }

        $("#ContentPlaceHolder1_Posicion_Maestra_IdCatalogo2").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_Maestra_DesCatalogo2").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_Catalogo3").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Catalogo3').is(':checked');

        $("#ContentPlaceHolder1_text_Catalogo3").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Impresion_Catalogo3').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Catalogo3').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo3').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Impresion_Catalogo3').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Catalogo3').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo3').bootstrapToggle('disable');
        }

        $("#ContentPlaceHolder1_Posicion_Maestra_IdCatalogo3").prop("disabled", !isChecked);

        $("#ContentPlaceHolder1_Posicion_Maestra_DesCatalogo3").prop("disabled", !isChecked);

    });

    /* +++++++++++++++++++++++++++++++++++++++++++++Campos adicionales de descripcion++++++++++++++++++++++++++++++++++++++ */

    $("#ContentPlaceHolder1_Activo_Descripcion1_new").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Descripcion1_new').is(':checked');

        $("#ContentPlaceHolder1_Titulo_Descripcion1").prop("readonly", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Descripcion1').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Descripcion1').bootstrapToggle('disable');
        }

        $("#ContentPlaceHolder1_Posicion_Descripcion1").prop("disabled", !isChecked);

        $("#ContentPlaceHolder1_Option_Descripcion1_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_Descripcion1_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_Descripcion1_2").prop("disabled", !isChecked);


    });

    $("#ContentPlaceHolder1_Activo_Descripcion2_new").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Descripcion2_new').is(':checked');

        $("#ContentPlaceHolder1_Titulo_Descripcion2").prop("readonly", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Descripcion2').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Descripcion2').bootstrapToggle('disable');
        }

        $("#ContentPlaceHolder1_Posicion_Descripcion2").prop("disabled", !isChecked);

        $("#ContentPlaceHolder1_Option_Descripcion2_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_Descripcion2_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_Descripcion2_2").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_Descripcion3").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Descripcion3').is(':checked');

        $("#ContentPlaceHolder1_Titulo_Descripcion3").prop("disabled", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Descripcion3').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Descripcion3').bootstrapToggle('disable');
        }

        $("#ContentPlaceHolder1_Posicion_Descripcion3").prop("disabled", !isChecked);

        $("#ContentPlaceHolder1_Option_Descripcion3_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_Descripcion3_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_Descripcion3_2").prop("disabled", !isChecked);


    });

    $("#ContentPlaceHolder1_Activo_FechaAdquisicion").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_FechaAdquisicion').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_FechaAdquisicion').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_FechaAdquisicion').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_FechaAdquisicion").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_FechaInicialGarantia").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_FechaInicialGarantia').is(':checked');
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_FechaInicialGarantia').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_FechaInicialGarantia').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_FechaInicialGarantia").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_FechaFinalGarantia").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_FechaFinalGarantia').is(':checked');
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_FechaFinalGarantia').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_FechaFinalGarantia').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_FechaFinalGarantia").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_NumeroOrdenCompra").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_NumeroOrdenCompra').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_NumeroOrdenCompra').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_NumeroOrdenCompra').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Titulo_NumeroOrdenCompra").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_NumeroOrdenCompra").prop("disabled", !isChecked);

        $("#ContentPlaceHolder1_Option_NumeroOrdenCompra_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_NumeroOrdenCompra_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_NumeroOrdenCompra_2").prop("disabled", !isChecked);
    });

    $("#ContentPlaceHolder1_Activo_NumeroFactura").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_NumeroFactura').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_NumeroFactura').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_NumeroFactura').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Titulo_NumeroFactura").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_NumeroFactura").prop("disabled", !isChecked);

        $("#ContentPlaceHolder1_Option_NumeroFactura_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_NumeroFactura_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_NumeroFactura_2").prop("disabled", !isChecked);
    });

    $("#ContentPlaceHolder1_Activo_Modelo").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Modelo').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Modelo').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Modelo').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Titulo_Modelo").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_Modelo").prop("disabled", !isChecked);

        $("#ContentPlaceHolder1_Option_Modelo_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_Modelo_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_Modelo_2").prop("disabled", !isChecked);
    });

    $("#ContentPlaceHolder1_Activo_UrlFoto").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_UrlFoto').is(':checked');
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_UrlFoto').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_UrlFoto').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_UrlFoto").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_Unidades").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Unidades').is(':checked');
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Unidades').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Unidades').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_Unidades").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_CostoUnidad").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_CostoUnidad').is(':checked');
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_CostoUnidad').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_CostoUnidad').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_CostoUnidad").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_ValorTotal").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_ValorTotal').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_ValorTotal').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_ValorTotal').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Titulo_ValorTotal").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_ValorTotal").prop("disabled", !isChecked);

        $("#ContentPlaceHolder1_Option_ValorTotal_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_ValorTotal_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_ValorTotal_2").prop("disabled", !isChecked);
    });

    $("#ContentPlaceHolder1_Activo_AdDescripcion1").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_AdDescripcion1').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_AdDescripcion1').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_AdDescripcion1').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Titulo_AdDescripcion1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_AdDescripcion1").prop("disabled", !isChecked);

        $("#ContentPlaceHolder1_Option_AdDescripcion1_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AdDescripcion1_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AdDescripcion1_2").prop("disabled", !isChecked);
    });

    $("#ContentPlaceHolder1_Activo_AdDescripcion2").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_AdDescripcion2').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_AdDescripcion2').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_AdDescripcion2').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Titulo_AdDescripcion2").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_AdDescripcion2").prop("disabled", !isChecked);

        $("#ContentPlaceHolder1_Option_AdDescripcion2_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AdDescripcion2_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AdDescripcion2_2").prop("disabled", !isChecked);
    });

    $("#ContentPlaceHolder1_Activo_AdDescripcion3").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_AdDescripcion3').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_AdDescripcion3').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_AdDescripcion3').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Titulo_AdDescripcion3").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_AdDescripcion3").prop("disabled", !isChecked);

        $("#ContentPlaceHolder1_Option_AdDescripcion3_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AdDescripcion3_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AdDescripcion3_2").prop("disabled", !isChecked);
    });

    $("#ContentPlaceHolder1_Activo_VidaUtil").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_VidaUtil').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_VidaUtil').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_VidaUtil').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_VidaUtil").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_VidaUtilNif").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_VidaUtilNif').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_VidaUtilNif').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_VidaUtilNif').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_VidaUtilNif").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_VidaUtilFiscal").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_VidaUtilFiscal').is(':checked');


        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_VidaUtilFiscal').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_VidaUtilFiscal').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_VidaUtilFiscal").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_NumeroActivo").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_NumeroActivo').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_NumeroActivo').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_NumeroActivo').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_NumeroActivo").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_NumeroErp").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_NumeroErp').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_NumeroErp').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_NumeroErp').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_NumeroErp").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_NumeroTag").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_NumeroTag').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_NumeroTag').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_NumeroTag').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_NumeroTag").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_Serie").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Serie').is(':checked');


        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Serie').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Serie').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Titulo_Serie").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_Serie").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_Serie_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_Serie_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_Serie_2").prop("disabled", !isChecked);
    });

    $("#ContentPlaceHolder1_Activo_AsiDescripcio1").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_AsiDescripcio1').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_AsiDescripcio1').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_AsiDescripcio1').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Titulo_AsiDescripcio1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_AsiDescripcio1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AsiDescripcio1_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AsiDescripcio1_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AsiDescripcio1_2").prop("disabled", !isChecked);
    });

    $("#ContentPlaceHolder1_Activo_AsiDescripcio2").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_AsiDescripcio2').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_AsiDescripcio2').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_AsiDescripcio2').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Titulo_AsiDescripcio2").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_AsiDescripcio2").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AsiDescripcio2_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AsiDescripcio2_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AsiDescripcio2_2").prop("disabled", !isChecked);
    });

    $("#ContentPlaceHolder1_Activo_AsiDescripcion3").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_AsiDescripcion3').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_AsiDescripcion3').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_AsiDescripcion3').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Titulo_AsiDescripcion3").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Posicion_AsiDescripcion3").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AsiDescripcion3_0").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AsiDescripcion3_1").prop("disabled", !isChecked);
        $("#ContentPlaceHolder1_Option_AsiDescripcion3_2").prop("disabled", !isChecked);
    });

    $("#ContentPlaceHolder1_Activo_ApruebaBaja").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_ApruebaBaja').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_ApruebaBaja').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_ApruebaBaja').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_ApruebaBaja").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_ObservacionesBaja").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_ObservacionesBaja').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_ObservacionesBaja').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_ObservacionesBaja').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_ObservacionesBaja").prop("disabled", !isChecked);

    });

    $("#ContentPlaceHolder1_Activo_EstadoVigencia").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_EstadoVigencia').is(':checked');

        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_EstadoVigencia').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_EstadoVigencia').bootstrapToggle('disable');
        }
        $("#ContentPlaceHolder1_Posicion_EstadoVigencia").prop("disabled", !isChecked);

    });


    /*****************Adquisicion activo fijo**************************************************/

    $("#ContentPlaceHolder1_Activo_AdquisicionActivo").change(function () {

        var isChecked = $('#ContentPlaceHolder1_Activo_AdquisicionActivo').is(':checked');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_TipoActivo").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_TipoActivo").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_TipoActivo").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Marca").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Marca").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Marca").trigger('click');


        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Proveedor").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Proveedor").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Proveedor").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Material").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Material").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Material").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Color").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Color").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Color").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Catalogo4").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Catalogo4").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Catalogo4").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Catalogo5").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Catalogo5").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Catalogo5").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Catalogo6").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Catalogo6").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Catalogo6").trigger('click');



    });

    $("#ContentPlaceHolder1_Activo_TipoActivo").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_TipoActivo').is(':checked');

        $("#ContentPlaceHolder1_text_TipoActivo").prop("readonly", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_TipoActivo').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_TipoActivo').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_TipoActivo').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_TipoActivo').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_TipoActivo').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_TipoActivo').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_Marca").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Marca').is(':checked');

        $("#ContentPlaceHolder1_text_Marca").prop("readonly", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Marca').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Marca').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Marca').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Marca').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Marca').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Marca').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_Proveedor").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Proveedor').is(':checked');

        $("#ContentPlaceHolder1_text_Proveedor").prop("readonly", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Proveedor').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Proveedor').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Proveedor').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Proveedor').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Proveedor').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Proveedor').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_Material").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Material').is(':checked');

        $("#ContentPlaceHolder1_text_Material").prop("readonly", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Material').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Material').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Material').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Material').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Material').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Material').bootstrapToggle('disable');
        }
    });

    $("#ContentPlaceHolder1_Activo_Color").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Color').is(':checked');

        $("#ContentPlaceHolder1_text_Color").prop("readonly", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Color').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Color').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Color').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Color').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Color').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Color').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_Catalogo4").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Catalogo4').is(':checked');

        $("#ContentPlaceHolder1_text_Catalogo4").prop("readonly", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Catalogo4').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Catalogo4').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo4').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Catalogo4').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Catalogo4').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo4').bootstrapToggle('disable');
        }
    });

    $("#ContentPlaceHolder1_Activo_Catalogo5").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Catalogo5').is(':checked');

        $("#ContentPlaceHolder1_text_Catalogo5").prop("readonly", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Catalogo5').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Catalogo5').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo5').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Catalogo5').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Catalogo5').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo5').bootstrapToggle('disable');
        }
    });

    $("#ContentPlaceHolder1_Activo_Catalogo6").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Catalogo6').is(':checked');

        $("#ContentPlaceHolder1_text_Catalogo6").prop("readonly", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Catalogo6').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Catalogo6').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo6').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Catalogo6').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Catalogo6').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo6').bootstrapToggle('disable');
        }
    });

    /*****************Adquisicion activo fijo**************************************************/

    /*****************Asignacion activo fijo**************************************************/

    $("#ContentPlaceHolder1_Activo_AsignacionActivoFijo").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_AsignacionActivoFijo').is(':checked');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_EstadoFisico").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_EstadoFisico").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_EstadoFisico").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Responsable").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Responsable").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Responsable").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_CentroDeCostos").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_CentroDeCostos").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_CentroDeCostos").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_UnidadNegocio").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_UnidadNegocio").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_UnidadNegocio").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_AreaDepartamento").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_AreaDepartamento").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_AreaDepartamento").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Ubicacion").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Ubicacion").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Ubicacion").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Direccion").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Direccion").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Direccion").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Empresa").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Empresa").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Empresa").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Grupo").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Grupo").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Grupo").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Regional").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Regional").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Regional").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Ciudad").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Ciudad").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Ciudad").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Catalogo7").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Catalogo7").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Catalogo7").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Catalogo8").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Catalogo8").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Catalogo8").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_Catalogo9").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_Catalogo9").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_Catalogo9").trigger('click');

    });

    $("#ContentPlaceHolder1_Activo_EstadoFisico").change(function () {

        var isChecked = $('#ContentPlaceHolder1_Activo_EstadoFisico').is(':checked');

        $("#ContentPlaceHolder1_text_EstadoFisico").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_EstadoFisico').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_EstadoFisico').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_EstadoFisico').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_EstadoFisico').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_EstadoFisico').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_EstadoFisico').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_EstadoFisico').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_EstadoFisico').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_Responsable").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Responsable').is(':checked');

        $("#ContentPlaceHolder1_text_Responsable").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_Responsable').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Responsable').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Responsable').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Responsable').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Prestamo_Responsable').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_Responsable').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Responsable').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Responsable').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Responsable').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Prestamo_Responsable').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_CentroDeCostos").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_CentroDeCostos').is(':checked');

        $("#ContentPlaceHolder1_text_CentroDeCostos").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_CentroDeCostos').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_CentroDeCostos').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_CentroDeCostos').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_CentroDeCostos').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Prestamo_CentroCosto').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_CentroDeCostos').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_CentroDeCostos').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_CentroDeCostos').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_CentroDeCostos').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Prestamo_CentroCosto').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_UnidadNegocio").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_UnidadNegocio').is(':checked');

        $("#ContentPlaceHolder1_text_UnidadNegocio").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_UnidadNegocio').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_UnidadNegocio').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_UnidadNegocio').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_UnidadNegocio').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Prestamo_UnidadNegocio').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_UnidadNegocio').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_UnidadNegocio').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_UnidadNegocio').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_UnidadNegocio').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Prestamo_UnidadNegocio').bootstrapToggle('disable');
        }
    });

    $("#ContentPlaceHolder1_Activo_AreaDepartamento").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_AreaDepartamento').is(':checked');

        $("#ContentPlaceHolder1_text_AreaDepartamento").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_AreaDepartamento').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_AreaDepartamento').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_AreaDepartamento').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_AreaDepartamento').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Prestamo_AreaDepartamento').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_AreaDepartamento').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_AreaDepartamento').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_AreaDepartamento').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_AreaDepartamento').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Prestamo_AreaDepartamento').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_Ubicacion").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Ubicacion').is(':checked');
        $("#ContentPlaceHolder1_text_Ubicacion").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_Ubicacion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Ubicacion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Ubicacion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Ubicacion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Prestamo_Ubicacion').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_Ubicacion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Ubicacion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Ubicacion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Ubicacion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Prestamo_Ubicacion').bootstrapToggle('disable');
        }


    });

    $("#ContentPlaceHolder1_Activo_Direccion").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Direccion').is(':checked');

        $("#ContentPlaceHolder1_text_Direccion").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_Direccion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Direccion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Direccion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Direccion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Prestamo_Direccion').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_Direccion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Direccion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Direccion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Direccion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Prestamo_Direccion').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_Empresa").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Empresa').is(':checked');

        $("#ContentPlaceHolder1_text_Empresa").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_Empresa').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Empresa').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Empresa').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Empresa').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Prestamo_Empresa').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_Empresa').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Empresa').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Empresa').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Empresa').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Prestamo_Empresa').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_Grupo").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Grupo').is(':checked');

        $("#ContentPlaceHolder1_text_Grupo").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_Grupo').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Grupo').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Grupo').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Grupo').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Prestamo_Grupo').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_Grupo').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Grupo').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Grupo').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Grupo').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Prestamo_Grupo').bootstrapToggle('disable');
        }


    });

    $("#ContentPlaceHolder1_Activo_Regional").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Regional').is(':checked');

        $("#ContentPlaceHolder1_text_Regional").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_Regional').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Regional').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Regional').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Regional').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Prestamo_Regional').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_Regional').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Regional').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Regional').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Regional').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Prestamo_Regional').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_Ciudad").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Ciudad').is(':checked');

        $("#ContentPlaceHolder1_text_Ciudad").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_Ciudad').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Ciudad').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Ciudad').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Ciudad').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Prestamo_Ciudad').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_Ciudad').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Ciudad').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Ciudad').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Ciudad').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Prestamo_Ciudad').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_Catalogo7").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Catalogo7').is(':checked');

        $("#ContentPlaceHolder1_text_Catalogo7").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_Catalogo7').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Catalogo7').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Catalogo7').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo7').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Prestamo_Catalogo7').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_Catalogo7').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Catalogo7').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Catalogo7').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo7').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Prestamo_Catalogo7').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_Catalogo8").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Catalogo8').is(':checked');

        $("#ContentPlaceHolder1_text_Catalogo8").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_Catalogo8').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Catalogo8').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Catalogo8').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo8').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Prestamo_Catalogo8').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_Catalogo8').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Catalogo8').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Catalogo8').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo8').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Prestamo_Catalogo8').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_Catalogo9").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Catalogo9').is(':checked');

        $("#ContentPlaceHolder1_text_Catalogo9").prop("readonly", !isChecked);
        if (isChecked) {
            $('#ContentPlaceHolder1_Inventario_Catalogo9').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Impresion_Catalogo9').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Obligatorio_Catalogo9').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo9').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Prestamo_Catalogo9').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Inventario_Catalogo9').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Impresion_Catalogo9').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Obligatorio_Catalogo9').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo9').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Prestamo_Catalogo9').bootstrapToggle('disable');
        }

    });

    /*****************Asignacion activo fijo**************************************************/
    /*****************Mantenimiento activo fijo**************************************************/

    $("#ContentPlaceHolder1_Activo_Impresion").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Impresion').is(':checked');

        if (isChecked) {
            $('#ContentPlaceHolder1_Activo_Impresoras').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_Formatos').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Activo_Impresoras').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_Formatos').bootstrapToggle('disable');
        }


    });

    /*****************Modulo de Prestamo********************************************/
    $("#ContentPlaceHolder1_Activo_MaestraPrestamo").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_MaestraPrestamo').is(':checked');
        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo10").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo10").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo10").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo11").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo11").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo11").trigger('click');

        if (isChecked) {
            $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo12").bootstrapToggle("on");
        } else {
            $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo12").bootstrapToggle("off");
        }
        $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo12").trigger('click');
    });

    $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo10").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo10').is(':checked');

        $("#ContentPlaceHolder1_Text_Catalogo10").prop("readonly", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Catalogo10').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo10').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Catalogo10').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo10').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo11").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo11').is(':checked');

        $("#ContentPlaceHolder1_Text_Catalogo11").prop("readonly", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Catalogo11').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo11').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Catalogo11').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo11').bootstrapToggle('disable');
        }

    });

    $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo12").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo12').is(':checked');

        $("#ContentPlaceHolder1_Text_Catalogo12").prop("readonly", !isChecked);
        if ($(this).prop('checked')) {
            $('#ContentPlaceHolder1_Obligatorio_Catalogo12').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo12').bootstrapToggle('enable');
        } else {
            $('#ContentPlaceHolder1_Obligatorio_Catalogo12').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_AutoIncremento_Catalogo12').bootstrapToggle('disable');
        }

    });

    var isChecked = $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo10").is(':checked');

    $("#ContentPlaceHolder1_Text_Catalogo10").prop("readonly", !isChecked);

    if (isChecked) {
        $("#ContentPlaceHolder1_Obligatorio_Catalogo10").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo10").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Obligatorio_Catalogo10").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo10").bootstrapToggle("disable");
    }

    var isChecked = $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo11").is(':checked');

    $("#ContentPlaceHolder1_Text_Catalogo11").prop("readonly", !isChecked);

    if (isChecked) {
        $("#ContentPlaceHolder1_Obligatorio_Catalogo11").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo11").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Obligatorio_Catalogo11").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo11").bootstrapToggle("disable");
    }

    var isChecked = $("#ContentPlaceHolder1_Activo_MaestraPrestamo_Catalogo12").is(':checked');

    $("#ContentPlaceHolder1_Text_Catalogo12").prop("readonly", !isChecked);

    if (isChecked) {
        $("#ContentPlaceHolder1_Obligatorio_Catalogo12").bootstrapToggle("enable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo12").bootstrapToggle("enable");
    } else {
        $("#ContentPlaceHolder1_Obligatorio_Catalogo12").bootstrapToggle("disable");
        $("#ContentPlaceHolder1_AutoIncremento_Catalogo12").bootstrapToggle("disable");
    }

    $("#ContentPlaceHolder1_Activo_Prestamo").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Prestamo').is(':checked');
        if (isChecked) {
            $('#ContentPlaceHolder1_Activo_PAsignacion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_PProgramar').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_PTerminados').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_PEnPrestamo').bootstrapToggle('enable');

            $('#ContentPlaceHolder1_Activo_PAsignacion').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_PProgramar').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_PTerminados').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_PEnPrestamo').bootstrapToggle('on');
        } else {
            $('#ContentPlaceHolder1_Activo_PAsignacion').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_PProgramar').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_PTerminados').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_PEnPrestamo').bootstrapToggle('off');

            $('#ContentPlaceHolder1_Activo_PAsignacion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_PProgramar').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_PTerminados').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_PEnPrestamo').bootstrapToggle('disable');

        }
    });

    /*****************Fin Prestamo**************************************************/


    /*****************impresion activo fijo**************************************************/

    $("#ContentPlaceHolder1_Activo_MaestraMantenimiento").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_MaestraMantenimiento').is(':checked');
        $("#ContentPlaceHolder1_Activo_MaestraMantenimiento_Responsable").prop("checked", isChecked);
    });

    /*****************impresion activo fijo**************************************************/
    /*****************Gestion de Activos Fijos**************************************************/

    $("#ContentPlaceHolder1_Activo_GestionActivosFijos").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_GestionActivosFijos').is(':checked');

        $("#ContentPlaceHolder1_Activo_CargueInformacion").prop("checked", isChecked);
        $("#ContentPlaceHolder1_Activo_Creacion").prop("checked", isChecked);
        $("#ContentPlaceHolder1_Activo_Asignacion").prop("checked", isChecked);
        $("#ContentPlaceHolder1_Activo_Reasignacion").prop("checked", isChecked);
        $("#ContentPlaceHolder1_Activo_AsignacionTag").prop("checked", isChecked);
        $("#ContentPlaceHolder1_Activo_DarBaja").prop("checked", isChecked);

    });

    /*****************Gestion de Activos Fijos**************************************************/
    /*****************Impresion**************************************************/

    $("#ContentPlaceHolder1_Activo_ModImpresion").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_ModImpresion').is(':checked');

        if (isChecked) {
            $('#ContentPlaceHolder1_Activo_TagDuros').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_Masivo').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_ActivoFijo').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_TagDuros').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_Masivo').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_ActivoFijo').bootstrapToggle('on');
        } else {
            $('#ContentPlaceHolder1_Activo_TagDuros').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_Masivo').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_ActivoFijo').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_TagDuros').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_Masivo').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_ActivoFijo').bootstrapToggle('disable');
        }

    });

    /*****************Impresion**************************************************/
    /*****************Inventarios**************************************************/

    $("#ContentPlaceHolder1_Activo_Inventario").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Inventario').is(':checked');

        if (isChecked) {
            $('#ContentPlaceHolder1_Activo_InvCreacion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_Programadas').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_EnEjecucion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_Cerradas').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_InvCreacion').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_Programadas').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_EnEjecucion').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_Cerradas').bootstrapToggle('on');

        } else {
            $('#ContentPlaceHolder1_Activo_InvCreacion').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_Programadas').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_EnEjecucion').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_Cerradas').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_InvCreacion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_Programadas').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_EnEjecucion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_Cerradas').bootstrapToggle('disable');

        }

    });

    /*****************Inventarios**************************************************/

    /*****************Mantenimiento**************************************************/

    $("#ContentPlaceHolder1_Activo_Mantenimiento").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Mantenimiento').is(':checked');


        if (isChecked) {
            $('#ContentPlaceHolder1_Activo_OrdenDeServicio').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_MAsignacion').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_Bitacora').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_PorCierre').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_Cerrados').bootstrapToggle('enable');

            $('#ContentPlaceHolder1_Activo_OrdenDeServicio').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_MAsignacion').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_Bitacora').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_PorCierre').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_Cerrados').bootstrapToggle('on');
        } else {
            $('#ContentPlaceHolder1_Activo_OrdenDeServicio').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_MAsignacion').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_Bitacora').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_PorCierre').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_Cerrados').bootstrapToggle('off');

            $('#ContentPlaceHolder1_Activo_OrdenDeServicio').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_MAsignacion').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_Bitacora').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_PorCierre').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_Cerrados').bootstrapToggle('disable');

        }
    });

    /*****************Mantenimiento**************************************************/

    $("#ContentPlaceHolder1_Activo_Informes").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Informes').is(':checked');
        if (isChecked) {
            $('#ContentPlaceHolder1_Activo_ActivosFijos').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_InfInventeario').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_ConsolidadoSabueso').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_InfMantenimiento').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_InfPrestamo').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_ConsolidadoActivosFijos').bootstrapToggle('enable');
            $('#ContentPlaceHolder1_Activo_Tag').bootstrapToggle('enable');

            $('#ContentPlaceHolder1_Activo_ActivosFijos').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_InfInventeario').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_ConsolidadoSabueso').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_InfMantenimiento').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_InfPrestamo').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_ConsolidadoActivosFijos').bootstrapToggle('on');
            $('#ContentPlaceHolder1_Activo_Tag').bootstrapToggle('on');
        } else {
            $('#ContentPlaceHolder1_Activo_ActivosFijos').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_InfInventeario').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_ConsolidadoSabueso').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_InfMantenimiento').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_InfPrestamo').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_ConsolidadoActivosFijos').bootstrapToggle('off');
            $('#ContentPlaceHolder1_Activo_Tag').bootstrapToggle('off');

            $('#ContentPlaceHolder1_Activo_ActivosFijos').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_InfInventeario').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_ConsolidadoSabueso').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_InfMantenimiento').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_InfPrestamo').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_ConsolidadoActivosFijos').bootstrapToggle('disable');
            $('#ContentPlaceHolder1_Activo_Tag').bootstrapToggle('disable');
        }
    });

    /*****************Informes**************************************************/

    $("#ContentPlaceHolder1_Activo_Informes").change(function () {
        var isChecked = $('#ContentPlaceHolder1_Activo_Informes').is(':checked');

        $("#ContentPlaceHolder1_Activo_ActivosFijos").prop("checked", isChecked);
        $("#ContentPlaceHolder1_Activo_InfInventeario").prop("checked", isChecked);
        $("#ContentPlaceHolder1_Activo_ConsolidadoSabueso").prop("checked", isChecked);
        $("#ContentPlaceHolder1_Activo_InfMantenimiento").prop("checked", isChecked);
        $("#ContentPlaceHolder1_Activo_ConsolidadoActivosFijos").prop("checked", isChecked);
        $("#ContentPlaceHolder1_Activo_Tag").prop("checked", isChecked);

    });

    /*****************Mantenimiento**************************************************/

    /*
    Correccion de Error, habilitando inhabilitando todos los check box en la configuracion de campos
    */
    if (loco == 2) {
        $('#ContentPlaceHolder1_Obligatorio_Maestra_idDescripcion').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Descripcion').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Categoria').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_SubCategoria').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Catalogo1').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Catalogo2').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Catalogo3').bootstrapToggle('disable');

        $('#ContentPlaceHolder1_Obligatorio_TipoActivo').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Marca').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Proveedor').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Material').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Color').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Catalogo4').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Catalogo5').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Catalogo6').bootstrapToggle('disable');

        $('#ContentPlaceHolder1_Obligatorio_Estadofisico').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Reponsable').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_CentroCosto').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_UnidadNegocio').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_AreaDepartamento').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Ubicacion').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Direccion').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Empresa').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Grupo').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Regional').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Ciudad').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Catalogo7').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Catalogo8').bootstrapToggle('disable');
        $('#ContentPlaceHolder1_Obligatorio_Catalogo9').bootstrapToggle('disable');
    }

});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
});


$(".alert button.close").click(function (e) {
    setTimeout(function () {
        $('.alert').fadeTo("slow", 0.1, function () {
            $('.alert').alert('close')
        });
    }, 3000)
});

$('#animacion').removeClass();
$('#animacion').addClass("fadeIn");

$('#imagendefault').removeClass();
$('#imagendefault').addClass("slideRight");

$('#botonInicio').removeClass();
$('#botonInicio').addClass("fadeIn");

$('#IconSabuedoDefault').removeClass();
$('#IconSabuedoDefault').addClass("fadeIn");

jQuery(document).ready(function () {
    var isChecked = $("#ContentPlaceHolder1_Btn_Todos").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_Btn_Todos').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_Btn_Todos').parents('label').removeClass("active");
    }

    var isChecked = $("#ContentPlaceHolder1_Btn_Encontrados").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_Btn_Encontrados').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_Btn_Encontrados').parents('label').removeClass("active");
    }

    var isChecked = $("#ContentPlaceHolder1_Btn_Faltantes").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_Btn_Faltantes').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_Btn_Faltantes').parents('label').removeClass("active");
    }

    var isChecked = $("#ContentPlaceHolder1_Btn_Sobrantes").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_Btn_Sobrantes').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_Btn_Sobrantes').parents('label').removeClass("active");
    }

    var isChecked = $("#ContentPlaceHolder1_Btn_FueraInv").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_Btn_FueraInv').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_Btn_FueraInv').parents('label').removeClass("active");
    }

    var isChecked = $("#ContentPlaceHolder1_Rd_Todos").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_Rd_Todos').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_Rd_Todos').parents('label').removeClass("active");
    }
    var isChecked = $("#ContentPlaceHolder1_Rd_Encontrados").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_Rd_Encontrados').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_Rd_Encontrados').parents('label').removeClass("active");
    }
    var isChecked = $("#ContentPlaceHolder1_Rd_Faltantes").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_Rd_Faltantes').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_Rd_Faltantes').parents('label').removeClass("active");
    }
    var isChecked = $("#ContentPlaceHolder1_Rd_Sobrantes").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_Rd_Sobrantes').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_Rd_Sobrantes').parents('label').removeClass("active");
    }
    var isChecked = $("#ContentPlaceHolder1_Rd_FueraInventario").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_Rd_FueraInventario').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_Rd_FueraInventario').parents('label').removeClass("active");
    }


    var isChecked = $("#ContentPlaceHolder1_btn_TodosPDF").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_btn_TodosPDF').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_btn_TodosPDF').parents('label').removeClass("active");
    }
    var isChecked = $("#ContentPlaceHolder1_btn_EncontradosPDF").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_btn_EncontradosPDF').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_btn_EncontradosPDF').parents('label').removeClass("active");
    }
    var isChecked = $("#ContentPlaceHolder1_btn_FaltantesPDF").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_btn_FaltantesPDF').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_btn_FaltantesPDF').parents('label').removeClass("active");
    }
    var isChecked = $("#ContentPlaceHolder1_btn_SobrantesPDF").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_btn_SobrantesPDF').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_btn_SobrantesPDF').parents('label').removeClass("active");
    }
    var isChecked = $("#ContentPlaceHolder1_btn_FueraInvPDF").is(':checked');
    if (isChecked) {
        $('#ContentPlaceHolder1_btn_FueraInvPDF').parents('label').addClass("active");
    } else {
        $('#ContentPlaceHolder1_btn_FueraInvPDF').parents('label').removeClass("active");
    }
    //$('.loco').daterangepicker({
    //    minDate: moment().startOf('day'),
    //    autoclose: true,
    //    format: 'YYYY/MM/DD'
    //});
    //$('.FormatoSabueso').daterangepicker({
    //    autoclose: true,
    //    format: 'YYYY/MM/DD'
    //});
});

jQuery(document).ready(function () {
    $.material.init();
    Main.init();
    UIModals.init();
    UIElements.init();
    
    TableData.init();
    
    //FormElements.init();
    
    Animation.init();
    UIButtons.init();
    
    /*
    //////////////////////////////////////////////////////////////
    /////////        Ventanas Flotantes Inventario      /////////
    ////////////////////////////////////////////////////////////
    */
    $("#BtnConstanciaInv").unbind("click").click(function (e) {
        var BtnTodos = $("#BtnTodos").is(':checked');
        var BtnEncontrados = $("#Btn_Encontrados").is(':checked');
        var BtnFaltantes = $("#Btn_Faltantes").is(':checked');
        var BtnSobrantes = $("#Btn_Sobrantes").is(':checked');
        var BtnFueraInv = $("#Btn_FueraInv").is(':checked');
        var Filtro = "";
        var IdInventario = $("#NumInventarioConstancia").val();
        if (BtnTodos)
        {
            Filtro += "1,";
        }
        if (BtnFaltantes)
        {
            Filtro += "3,";
        }
        if (BtnFueraInv)
        {
            Filtro += "5,";
        }
        if (BtnEncontrados)
        {
            Filtro += "2,";
        }
        if (BtnSobrantes)
        {
            Filtro += "4,";
        }
        window.open('InformeInventario?AppID=' + IdInventario + '&Pag=' + Filtro, '_blank');
    });

    $("#ContentPlaceHolder1_UsrRespPDF").val($("#DropMenuResponsablePersonablizado").val());
    $("#DropMenuResponsablePersonablizado").change(function () {
        $("#ContentPlaceHolder1_UsrRespPDF").val($("#DropMenuResponsablePersonablizado").val());
    });


    $("#ContentPlaceHolder1_UsrRespConstancia").val($("#DropMenuResponsable").val());
    $("#DropMenuResponsable").change(function () {
        $("#ContentPlaceHolder1_UsrRespConstancia").val($("#DropMenuResponsable").val());
    });

    $("#btnSaveImagePassword").unbind("click").click(function (e) {
        //var query = $("#txt_observacion").val();
        // la g indica de forma global
        //var regex = new RegExp("'", "g");
        //var res = query.replace(regex, "#");
        var isChecked = $('#ContentPlaceHolder1_Activo_Responsable').is(':checked');
        $('#FailureText').html("");
        $('#FailureText').html("<div class='alert alert-info'><button data-dismiss='alert' class='close'>&times;</button><i class='fa fa-info-circle'></i>Por favor espere Mientras se ejecuta el Query</div>");
        $('#icon_update').removeClass('fa fa-refresh');
        $('#icon_update').addClass('fa fa-spinner fa-spin');
        var file = $("#APQuery").get(0).files[0];
        var NombreArchivo = $("#APQuery").get(0).files[0].name;
        var r = new FileReader();
        r.onload = function () {
            var binimage = r.result;
            var actionData = "{'password': '" + $("#txt_Password").val() + "','Query':'" + binimage + "', 'tipoQuery': '" + isChecked + "','NombreArchivo':'" + NombreArchivo + "'}";
            $.ajax(
            {
                url: "Index.aspx/EnviarQuery",
                data: actionData,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    var prov = msg.d;
                    $('#icon_update').removeClass('fa fa-spinner fa-spin');
                    $('#icon_update').addClass('fa fa-refresh');
                    $('#FailureText').html("");
                    $('#FailureText').html("<div class='alert alert-success'><button data-dismiss='alert' class='close'>&times;</button><i class='fa fa-info-circle'></i>" + prov.MensajedeApp + "</div>");
                    if (prov.EstadoProceso != 2) {
                        $('#Lbl_VersionBD').addClass('label label-default');
                        $('#Lbl_VersionBD').html('');
                        $('#Lbl_VersionBD').html('Esperando Versión..');
                        setTimeout("location.href='Index';", 3000);
                    }
                },
                error: function (result) {
                    $('#icon_update').removeClass('fa fa-spinner fa-spin');
                    $('#icon_update').addClass('fa fa-refresh');
                    $('#FailureText').html("");
                    $('#FailureText').html("<div class='alert alert-danger'>Error: <strong>" + result.status + '</strong>: ' + result.statusText + "</div>");
                }
            });
        };
        r.readAsDataURL(file);
    });

    //Boton de eliminar Inventario en ejecucion
    $("#btnSaveImageDeleteEjecucion").unbind("click").click(function (e) {
        var query = $("#NumerodeIventarioEliminar").val();
        var actionData = "{'ObservacionEliminacion': '" + $("#TxtObservacionEliminacion").val() + "','IdInventario':'" + query + "'}";
        if ($("#TxtObservacionEliminacion").val() == "") {
            $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>Campo en blanco</strong>: Por favor ingresa una observacion válida</div>");
        } else {
            $.ajax(
            {
                url: "EnEjecucion.aspx/DeleteInventario",
                data: actionData,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    var prov = msg.d;
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-success'><button data-dismiss='alert' class='close'>&times;</button><i class='fa fa-info-circle'></i> " + prov + "</div>");
                    setTimeout(window.location = location.href, 2000);
                },
                error: function (result) {
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>" + result.status + '</strong>: ' + result.statusText + "</div>");
                }
            });
        }
    });

    //Boton de eliminar Inventario en Programadas
    $("#btnSaveImageDeleteProgramadas").unbind("click").click(function (e) {
        var query = $("#NumerodeIventarioEliminar").val();
        var actionData = "{'ObservacionEliminacion': '" + $("#TxtObservacionEliminacion").val() + "','IdInventario':'" + query + "'}";
        if ($("#TxtObservacionEliminacion").val() == "") {
            $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>Campo en blanco</strong>: Por favor ingresa una observacion válida</div>");
        } else {
            $.ajax(
            {
                url: "Programadas.aspx/DeleteInventario",
                data: actionData,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    var prov = msg.d;
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-success'><button data-dismiss='alert' class='close'>&times;</button><i class='fa fa-info-circle'></i> " + prov + "</div>");
                    setTimeout(window.location = location.href, 2000);
                },
                error: function (result) {
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>" + result.status + '</strong>: ' + result.statusText + "</div>");
                }
            });
        }
    });

    //Boton de eliminar En el kardex
    $("#Btn_Eliminar_Kardex").unbind("click").click(function (e) {
        var query = $("#NumerodeKardexEliminar").val();
        var actionData = "{'ObservacionEliminacion': '" + $("#TxtObservacionEliminacion").val() + "','IdInventario':'" + query + "'}";
        if ($("#TxtObservacionEliminacion").val() == "") {
            $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>Campo en blanco</strong>: Por favor ingresa una observacion válida</div>");
        } else {
            $.ajax(
            {
                url: "Index.aspx/DeleteInventario",
                data: actionData,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    var prov = msg.d;
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-success'><button data-dismiss='alert' class='close'>&times;</button><i class='fa fa-info-circle'></i> " + prov + "</div>");
                    setTimeout(window.location = location.href + "&FailureText=" + prov, 2000);
                },
                error: function (result) {
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>" + result.status + '</strong>: ' + result.statusText + "</div>");
                }
            });
        }
    });

    //Boton Dar de Baja en Kardex
    $("#Btn_DarBaja_enKardex").unbind("click").click(function (e) {
        var actionData = "{'ObservacionBaja': '" + $("#ObservacionBaja").val() + "','txtAprueba':'" + $("#txtAprueba").val() + "'}";
        if ($("#ObservacionBaja").val() == "" || $("#txtAprueba").val() == "") {
            $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>Campo en blanco</strong>: Por favor ingresa una observacion válida</div>");
        } else {
            $.ajax(
            {
                url: "Index.aspx/DarDeBaja",
                data: actionData,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    var prov = msg.d;
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-success'><button data-dismiss='alert' class='close'>&times;</button><i class='fa fa-info-circle'></i> " + prov + "</div>");
                    setTimeout(window.location = location.href + "&FailureText=" + prov, 2000);
                },
                error: function (result) {
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>" + result.status + '</strong>: ' + result.statusText + "</div>");
                }
            });
        }
    });

    //Boton Insertar Valor en Mantenimiento
    $("#BtnValorInjoy").unbind("click").click(function (e) {
        var query = $("#NumerodeMantenimientoACerrar").val();
        var actionData = "{'valor': '" + $("#Txt_Costo").val() + "','idmantenimiento':'" + query + "'}";
        if ($("#Txt_Costo").val() == "") {
            $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>Campo en blanco</strong>: Por favor ingresa un valor</div>");
        } else {
            $.ajax(
            {
                url: "Index.aspx/InsertarValor",
                data: actionData,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    var prov = msg.d;
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-success'><button data-dismiss='alert' class='close'>&times;</button><i class='fa fa-info-circle'></i> " + prov + "</div>");
                    setTimeout(window.location = location.href, 2000);
                },
                error: function (result) {
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>" + result.status + '</strong>: ' + result.statusText + "</div>");
                }
            });
        }
    });

    //Boton Insertar observacion de Bitacora
    $("#BtnEnjoyBitacora").unbind("click").click(function (e) {
        var query = $("#NumerodeMantenimientoEliminarid2").val();
        var actionData = "{'ObservacionBitacora': '" + $("#txt_observacion").val() + "','IdMantenimiento':'" + query + "','TxtOrdenMantenimiento':'" + $("#TxtOrdenMantenimiento").val() + "'}";
        if ($("#txt_observacion").val() == "") {
            $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>Campo en blanco</strong>: Por favor ingresa un valor</div>");
        } else {
            $.ajax(
            {
                url: "Index.aspx/IngresarBitacora",
                data: actionData,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    var prov = msg.d;
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-success'><button data-dismiss='alert' class='close'>&times;</button><i class='fa fa-info-circle'></i> " + prov + "</div>");
                    $("#txt_observacion").val("");
                },
                error: function (result) {
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>" + result.status + '</strong>: ' + result.statusText + "</div>");
                }
            });
        }
    });

    //Boton Actualizar Informacion de Asignacion
    $("#BtnAsignacion").unbind("click").click(function (e) {
        var query = $("#NumerodeMantenimientoEliminarid2").val();
        var actionData = "{'Txt_Id_Direccion': '" + $("#Txt_Id_Direccion").val() + "','Txt_Id_Ubicacion':'" + $("#Txt_Id_Ubicacion").val() + "','Txt_Id_Area':'" + $("#Txt_Id_Area").val() + "','Txt_Descripcion2':'" + $("#Txt_Descripcion2").val() + "'}";
        if ($("#Txt_Id_Direccion").val() == "") {
            $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>Campo en blanco</strong>: Por favor ingresa un valor</div>");
        } else {
            $.ajax(
            {
                url: "Index.aspx/IngresarAsignacion",
                data: actionData,
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (msg) {
                    var prov = msg.d;
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-success'><button data-dismiss='alert' class='close'>&times;</button><i class='fa fa-info-circle'></i> " + prov + "</div>");
                    $("#txt_observacion").val("");
                },
                error: function (result) {
                    $('#InformacionAcercadeTodo').html("");
                    $('#InformacionAcercadeTodo').html("<div class='alert alert-danger'> Error: <strong>" + result.status + '</strong>: ' + result.statusText + "</div>");
                }
            });
        }
    });

    $("#ContentPlaceHolder1_btnTodosPDF").change(function () {
        var isChecked = $("#ContentPlaceHolder1_btnTodosPDF").is(':checked');
        $("#ContentPlaceHolder1_btn_TodosPDF").prop("checked", isChecked);
    });

    $("#ContentPlaceHolder1_btnEncontradosPDF").change(function () {
        var isChecked = $("#ContentPlaceHolder1_btnEncontradosPDF").is(':checked');
        $("#ContentPlaceHolder1_btn_EncontradosPDF").prop("checked", isChecked);
    });
    $("#ContentPlaceHolder1_btnFaltantesPDF").change(function () {
        var isChecked = $("#ContentPlaceHolder1_btnFaltantesPDF").is(':checked');
        $("#ContentPlaceHolder1_btn_FaltantesPDF").prop("checked", isChecked);
    });
    $("#ContentPlaceHolder1_btnSobrantesPDF").change(function () {
        var isChecked = $("#ContentPlaceHolder1_btnSobrantesPDF").is(':checked');
        $("#ContentPlaceHolder1_btn_SobrantesPDF").prop("checked", isChecked);
    });
    $("#ContentPlaceHolder1_btnFueraInvPDF").change(function () {
        var isChecked = $("#ContentPlaceHolder1_btnFueraInvPDF").is(':checked');
        $("#ContentPlaceHolder1_btn_FueraInvPDF").prop("checked", isChecked);
    });

    //Constancia por inventario
    $("#ContentPlaceHolder1_RdTodos").change(function () {
        var isChecked = $("#ContentPlaceHolder1_RdTodos").is(':checked');
        $("#ContentPlaceHolder1_Rd_Todos").prop("checked", isChecked);
    });
    $("#ContentPlaceHolder1_RdEncontrados").change(function () {
        var isChecked = $("#ContentPlaceHolder1_RdEncontrados").is(':checked');
        $("#ContentPlaceHolder1_Rd_Encontrados").prop("checked", isChecked);
    });
    $("#ContentPlaceHolder1_RdFaltantes").change(function () {
        var isChecked = $("#ContentPlaceHolder1_RdFaltantes").is(':checked');
        $("#ContentPlaceHolder1_Rd_Faltantes").prop("checked", isChecked);
    });
    $("#ContentPlaceHolder1_RdSobrantes").change(function () {
        var isChecked = $("#ContentPlaceHolder1_RdSobrantes").is(':checked');
        $("#ContentPlaceHolder1_Rd_Sobrantes").prop("checked", isChecked);
    });
    $("#ContentPlaceHolder1_RdFueraInventario").change(function () {
        var isChecked = $("#ContentPlaceHolder1_RdFueraInventario").is(':checked');
        $("#ContentPlaceHolder1_Rd_FueraInventario").prop("checked", isChecked);
    });

    //Boton editar en Kardex
    $("#Btn_Cambiar").unbind("click").click(function (e) {
        $('#lbl_descripcion').css('display', 'none');
        $('#Btn_Cambiar').css('display', 'none');
        $('#EditDesc').css('display', 'inherit');
        
    });
    $("#Btn_Actualizar").unbind("click").click(function (e) {
        var actionData = "{'Descripcion': '" + $("#Txt_Descripcion_ACtivo").val() + "'}";
        $("#icon_actualizar").removeClass("fa fa-check-circle");
        $("#icon_actualizar").addClass("fa fa-spinner fa-spin");
        $("#Btn_Actualizar").prop("disabled", true);
        $.ajax(
        {
            url: "Index.aspx/CambiarDescripcion",
            data: actionData,
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                var prov = msg.d;
                $("#icon_actualizar").removeClass("fa fa-spinner fa-spin");
                $("#icon_actualizar").addClass("fa fa-check-circle");
                $("#Btn_Actualizar").prop("disabled", false);
                $('#lbl_descripcion').css('display', 'inline');
                $('#Btn_Cambiar').css('display', 'inline');
                $('#EditDesc').css('display', 'none');
                $('#lbl_descripcion').html(" - "+$("#Txt_Descripcion_ACtivo").val()+" ");
            },
            error: function (result) {
                $("#icon_actualizar").removeClass("fa fa-spinner fa-spin");
                $("#icon_actualizar").addClass("fa fa-check-circle");
                $("#Btn_Actualizar").prop("disabled", false);
                alert("ERROR " + result.status + ' ' + result.statusText);
            }
        });
    });
});


//Fin ToolTip

//Manejalo todos los script desde este...
//cargarDiv('ValoresDiv', $('#<%=DesValor.ClientID %>').val(), 'cargarValores', 'Create.aspx/Cargar_Div_Evento');

function agregarCampo(idAgregar, idCaja, idDiv, tipo, urlAjax) {
    var array = idAgregar.split("~");
    var continuar = true;
    /* for(var i=0;i<array.length;i++) {
         if(array[i]=="") {
             continuar = false;
             break;
         }
     }*/

    if (continuar) {
        var val = $("#" + idCaja).val();
        var bandera = "";
        if (val != "") {
            bandera = "|";
        }
        $("#" + idCaja).val(val + bandera + idAgregar);
    }
    cargarDiv(idDiv, $("#" + idCaja).val(), tipo, urlAjax);
}

function eliminarCampo(idEliminar, idCaja, idDiv, tipo, urlAjax) {
    var cadena = "";
    var bandera = "";
    var array = $("#" + idCaja).val().split("|");
    for (var i = 0; i < array.length; i++) {
        if (array[i] != idEliminar) {
            cadena += bandera + array[i];
            bandera = "|";
        }
    }
    $("#" + idCaja).val(cadena);
    cargarDiv(idDiv, $("#" + idCaja).val(), tipo, urlAjax);
}

function soloNumeros(e) {
    var key = window.Event ? e.which : e.keyCode
    return (key >= 48 && key <= 57)
}
