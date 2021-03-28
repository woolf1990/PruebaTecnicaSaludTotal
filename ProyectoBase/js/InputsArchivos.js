

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
