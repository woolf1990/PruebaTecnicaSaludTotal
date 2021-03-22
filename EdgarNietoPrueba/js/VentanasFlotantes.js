



//#region Funciones Generales

/*
 * ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 * INICIO Funciones Generales que aplica para todas las ventanas flotantes
 * ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

//INICIO (AplicarSeleccionados)  Este metodo se encarga de que en las ventanas flotantes que se pueden seleccionar varios responsables, escucha el boton de aplicar
//                              y revisa en la tabla cuales datos han sido seleccionados para luego enviarle esa información al codebehind

//En caso de que se instale sabueso sobre una subcarpeta se debera escribir, en caso contrario se dejará solo
//Ejemplo http://localhost.com/sabueso.app/ lo que debe de colocar en la variable es: '/sabueso.app/' Sin comillas simples
//En caso de que se instale bajo http://localhost.com en la variable de Coloca '/'Sin comillas simples
var NombredelaSubcarpeta = "/localhost/";

function AplicarSeleccionados(divContenido, divContenidoResul, PnlActual, DatoVisible, DatoParaElCodigo, TipoCatalogo) {

    var checkedCheckboxes = $("#TblResponsable :checkbox:checked"), arr = [];
    var checkboxValue = "";
    for (var i = 0; i < checkedCheckboxes.length; i++) {
        var checkbox = $(checkedCheckboxes[i]);
        checkboxValue += $.trim(checkbox.val()) + "|";
    }
    if (checkedCheckboxes.length >= 1) {

        var actionData = "{'nombre': '" + checkboxValue + "','TipoCatalogo':'" + TipoCatalogo + "','divContenido':'" + divContenido + "','divContenidoResul':'" + divContenidoResul + "','DatoVisible':'" + DatoVisible + "','DatoParaElCodigo':'" + DatoParaElCodigo + "'}";
        var session = '';
        var variableconDatos = '';
        var VariableTabla = '';
        $.ajax(
        {
            url: "Create.aspx/ModidicarSession",
            data: actionData,
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                var prov = msg.d;
                VariableTabla = "<div class='panel-group accordion-custom accordion-teal' id='accordion'><div class='panel panel-default'><div class='panel-heading'><h4 class='panel-title'><a class='accordion-toggle collapsed' data-toggle='collapse' data-parent='#accordion' href='#collapse" + TipoCatalogo + "'><i class='icon-arrow'></i>Ítems seleccionados</a></h4></div><div id='collapse" + TipoCatalogo + "' class='panel-collapse collapse'><div class='panel-body'><div class='table-responsive'>" + prov.VariableTabla + "</div></div></div></div></div>";
                variableconDatos = prov.variableconDatos;
                $("#" + divContenido).html(VariableTabla);
                document.getElementById("" + DatoVisible).value = "";
                document.getElementById("" + DatoVisible).value = "Múltiples Ítems Elegidos";
                document.getElementById("" + DatoParaElCodigo).value = "";
                document.getElementById("" + DatoParaElCodigo).value = variableconDatos;
                $("#" + divContenidoResul).html("Seleccione al menos un parámetro");
                $("[data-check='responsableslist']").bootstrapToggle();
                if (variableconDatos == "") {
                    $("#" + DatoVisible).val($("#" + DatoVisible).attr("placeholder"));
                    $('#' + divContenido).html("");
                    $("#" + divContenidoResul).html("");
                } else {
                    document.getElementById("" + DatoVisible).value = "";
                    document.getElementById("" + DatoVisible).value = "Múltiples Ítems Elegidos";
                }

                $("#" + DatoVisible).trigger('keyup');
                $('#' + PnlActual).modal('toggle');
                document.getElementById("TxtTextCargarDivUpdatePanel").value = "1";
                $('[data-toggle="tooltip"]').tooltip();
            },
            error: function (result) {
                alert("ERROR " + result.status + ' ' + result.statusText);
            }
        });
    } else {
        $('#' + PnlActual).modal('toggle');
    }

}
//FIN (AplicarSeleccionados)

//INICIO (MostrarResultadoCreateInv) Método que se encarga de que lo que recibe por párametro lo busca en el codebehind, igualmente organiza la informacion para mostrarla en la interfaz
function MostrarResultadoCreateInv(nombre, identificacion, divContenido, divMensaje, btnAdicionar, IconoBtn, TipoCatalogo) {
    var actionData = "{'nombre': '" + nombre + "','identificacion': '" + identificacion + "', 'TipoCatalogo': '" + TipoCatalogo + "'}";
    //Valido la pagina actual, esto para poder reutilizar el codigo
    var pathname = window.location.pathname;
    var res = pathname.split("/");
    var pagina = res[res.length - 1];
    //Declaro paneles para mostrar Mensajes
    IconoBtn.removeClass("fa fa-search");
    IconoBtn.addClass("fa fa-spinner fa-spin");
    divMensaje.addClass('none');
    btnAdicionar.addClass("not-active");
    divContenido.html("");
    divContenido.html("<center><i class='fa fa-spinner fa-spin'></i>&nbsp;Buscando datos un momento por favor...</center>");
    $.ajax(
    {
        url: pagina + ".aspx/GetDataAjax",
        data: actionData,
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (msg) {
            divMensaje.html("");
            divMensaje.html("Resultado de la busqueda");
            divMensaje.addClass('none');
            divContenido.html("");
            divContenido.html("<table class='table table-bordered table-hover' id='TblResponsable'><thead><tr class='filters1'><th>Acción</th><th>Descripción</th><th>Identificación</th><tbody>" + msg.d + "</tbody></table>");
            $('[data-toggle="tooltip"]').tooltip();
            //Boton que actualiza la clase
            IconoBtn.removeClass("fa fa-spinner fa-spin");
            IconoBtn.addClass("fa fa-search");
            btnAdicionar.removeClass("not-active");
            $("[data-check='responsableslist']").bootstrapToggle();
        },
        error: function (result) {
            divMensaje.html("");
            divMensaje.html("<div class='alert alert-danger'>Error: <strong>" + result.status + '</strong> ' + result.statusText + "</div>");
            divMensaje.removeClass('none');
            divMensaje.addClass('inline');
            divContenido.addClass('none');
            IconoBtn.removeClass("fa fa-spinner fa-spin");
            IconoBtn.addClass("fa fa-search");
            btnAdicionar.removeClass("not-active");
        }
    });
}
//FIN (GetMostrarResultado)

//INICIO (eliminarElemento)     Escucha el botón de eliminar en la ventana flotante y lo quita de la lista
function eliminarElemento(id, divContenido, divContenidoResul, DatoVisible, DatoParaElCodigo, TipoCatalogo) {
    var actionData = "{'nombre': '" + id + "','TipoCatalogo':'" + TipoCatalogo + "','divContenido':'" + divContenido + "','divContenidoResul':'" + divContenidoResul + "','DatoVisible':'" + DatoVisible + "','DatoParaElCodigo':'" + DatoParaElCodigo + "'}";
    var session = '';
    var variableconDatos = '';
    var VariableTabla = '';

    $.ajax(
    {
        url: "Create.aspx/ModidicarSessionEliminar",
        data: actionData,
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (msg) {
            var prov = msg.d;
            VariableTabla = "<div class='panel-group accordion-custom accordion-teal' id='accordion'><div class='panel panel-primary'><div class='panel-heading'><h4 class='panel-title'><a class='accordion-toggle' data-toggle='collapse' data-parent='#accordion' href='#collapse" + TipoCatalogo + "'><i class='icon-arrow'></i>Ítems seleccionados</a></h4></div><div id='collapse" + TipoCatalogo + "' class='panel-collapse collapse'><div class='panel-body'><div class='table-responsive'>" + prov.VariableTabla + "</div></div></div></div></div>";
            variableconDatos = prov.variableconDatos;
            $('#' + divContenido).html(VariableTabla);
            document.getElementById("" + DatoParaElCodigo).value = "";
            document.getElementById("" + DatoParaElCodigo).value = variableconDatos;
            $('#' + divContenidoResul).html("Seleccione al menos un parámetro");
            if (variableconDatos == "") {
                $("#" + DatoVisible).val($("#" + DatoVisible).attr("placeholder"));
                $('#' + divContenido).html("");
                $("#" + divContenidoResul).html("");
            } else {
                document.getElementById("" + DatoVisible).value = "";
                document.getElementById("" + DatoVisible).value = "Múltiples Ítems Elegidos";
            }
            $('[data-toggle="tooltip"]').tooltip()
        },
        error: function (result) {
            alert("ERROR " + result.status + ' ' + result.statusText);
        }
    });
}
//FIN (eliminarElemento)


//Funcion Para Marcar los seleccionados

function AbrirDIV(divContenido, divContenidoResul, PnlActual, DatoVisible, DatoParaElCodigo, DatoUpdatePanel, TipoCatalogo) {

    var textoUpdate = document.getElementById("" + DatoUpdatePanel).value;

    if (textoUpdate == 2) {
        var Valores = document.getElementById("" + DatoParaElCodigo).value;
        var actionData = "{'nombre': '" + Valores + "','TipoCatalogo':'" + TipoCatalogo + "','divContenido':'" + divContenido + "','divContenidoResul':'" + divContenidoResul + "','DatoVisible':'" + DatoVisible + "','DatoParaElCodigo':'" + DatoParaElCodigo + "'}";
        var session = '';
        var variableconDatos = '';
        var VariableTabla = '';
        $('#' + PnlActual).modal('toggle');
        $("#" + divContenido).html("<center><i class='fa fa-spinner fa-spin'></i>&nbsp;Buscando datos un momento por favor...</center>");
        $.ajax(
        {
            url: "Create.aspx/ModidicarSession",
            data: actionData,
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                var prov = msg.d;
                VariableTabla = "<div class='panel-group accordion-custom accordion-teal' id='accordion'><div class='panel panel-primary'><div class='panel-heading'><h4 class='panel-title'><a class='accordion-toggle collapsed' data-toggle='collapse' data-parent='#accordion' href='#collapse" + TipoCatalogo + "'><i class='icon-arrow'></i>Ítems seleccionados</a></h4></div><div id='collapse" + TipoCatalogo + "' class='panel-collapse collapse'><div class='panel-body'><div class='table-responsive'>" + prov.VariableTabla + "</div></div></div></div></div>";
                variableconDatos = prov.variableconDatos;
                $("#" + divContenido).html(VariableTabla);
                document.getElementById("" + DatoVisible).value = "";
                document.getElementById("" + DatoVisible).value = "Múltiples Ítems Elegidos";
                document.getElementById("" + DatoParaElCodigo).value = "";
                document.getElementById("" + DatoParaElCodigo).value = variableconDatos;
                $("#" + divContenidoResul).html("Seleccione al menos un parámetro");
                $("[data-check='responsableslist']").bootstrapToggle();
                if (variableconDatos == "") {
                    $("#" + DatoVisible).val($("#" + DatoVisible).attr("placeholder"));
                    $('#' + divContenido).html("");
                    $("#" + divContenidoResul).html("");
                } else {
                    document.getElementById("" + DatoVisible).value = "";
                    document.getElementById("" + DatoVisible).value = "Múltiples Ítems Elegidos";
                }
                document.getElementById("" + DatoUpdatePanel).value = "1";
                $('[data-toggle="tooltip"]').tooltip()
            },
            error: function (result) {
                alert("ERROR " + result.status + ' ' + result.statusText);
            }
        });
    } else {
        $('#' + PnlActual).modal('toggle');
    }

}
// FIN FUNCIOS

//INICIO (GetMostrarResultado) Método que se encarga de que lo que recibe por párametro lo busca en el codebehind, igualmente organiza la informacion para mostrarla en la interfaz
function GetMostrarResultado(nombre, identificacion, divContenido, MensajePanel, btnAdicionar, IconoBtn, TipoCatalogo, IDVentana, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante) {
    var actionData = "{'nombre': '" + nombre + "','identificacion': '" + identificacion + "', 'TipoCatalogo': '" + TipoCatalogo + "','MensajePanel':'" + MensajePanel + "','IDVentana':'" + IDVentana + "','divContenido':'" + divContenido + "','Txt_Descripcion_Formulario':'" + Txt_Descripcion_Formulario + "','Txt_Id_Formulario':'" + Txt_Id_Formulario + "','Txt_Descripcion_Flotante':'" + Txt_Descripcion_Flotante + "','Txt_Id_Flotante':'" + Txt_Id_Flotante + "'}";
    //Declaro paneles para mostrar Mensajes
    IconoBtn.removeClass("fa fa-search");
    IconoBtn.addClass("fa fa-spinner fa-spin");
    $("#" + MensajePanel).addClass('none');
    btnAdicionar.addClass("not-active");

    $("#" + divContenido).html("");
    $("#" + divContenido).html("<center><i class='fa fa-spinner fa-spin'></i>&nbsp;Buscando datos un momento por favor...</center>");
    $.ajax(
    {
        url: location.origin + NombredelaSubcarpeta + "Default.aspx/ObtenerResultadosVentanas",
        data: actionData,
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (msg) {
            $("#" + MensajePanel).html("");
            $("#" + MensajePanel).html("Resultado de la busqueda");
            $("#" + MensajePanel).addClass('none');
            $("#" + divContenido).html("");
            $("#" + divContenido).html("<table class='table table-bordered table-hover' id='TblResponsable'><thead><tr class='filters1'><th>Acción</th><th>Descripción</th><th>Identificación</th><tbody>" + msg.d + "</tbody></table>");
            $('[data-toggle="tooltip"]').tooltip();
            //Boton que actualiza la clase
            IconoBtn.removeClass("fa fa-spinner fa-spin");
            IconoBtn.addClass("fa fa-search");
            btnAdicionar.removeClass("not-active");
            $("[data-check='responsableslist']").bootstrapToggle();
        },
        error: function (result) {
            $("#" + MensajePanel).html("");
            $("#" + MensajePanel).html("<div class='alert alert-danger'>Error: <strong>" + result.status + '</strong> ' + result.statusText + "</div>");
            $("#" + MensajePanel).removeClass('none');
            $("#" + MensajePanel).addClass('inline');
            $("#" + divContenido).addClass('none');
            $("#" + divContenido).html("");
            IconoBtn.removeClass("fa fa-spinner fa-spin");
            IconoBtn.addClass("fa fa-search");
            btnAdicionar.removeClass("not-active");
        }
    });
}
//FIN (GetMostrarResultado)
/* ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 * FIN Funciones Generales
 * ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 */

//INICIO (AplicarEscribirInfo) Escucha el boton de seleccion de responsable en la ventana Flotante
function AplicarEscribirInfo(nombre, id, MensajePanel, IDVentana, divContenido1, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante) {
    document.getElementById("" + Txt_Descripcion_Formulario).value = "";
    document.getElementById("" + Txt_Descripcion_Formulario).value = nombre;
    $('#' + Txt_Descripcion_Formulario).trigger({ type: "keydown", which: 85 });
    $('#' + Txt_Descripcion_Formulario).focusNextInputField();
    document.getElementById("" + Txt_Id_Formulario).value = "";
    document.getElementById("" + Txt_Id_Formulario).value = id;
    document.getElementById('' + Txt_Descripcion_Flotante).value = "";
    document.getElementById('' + Txt_Id_Flotante).value = "";
    divContenido = document.getElementById('' + divContenido1);
    divMensaje = document.getElementById('' + MensajePanel + '');
    divContenido.innerHTML = "";
    divMensaje.innerHTML = "Seleccione un parámetro de búsqueda.";
    divMensaje.style.display = 'inline';
    $('#' + IDVentana).modal('toggle');
}
//FIN (AplicarEscribirInfo)


$(document).ready(function () {

    //Sentencia que me abre hace el foco sobre el primer campo de texto
    //$('#pnlAddClassModal').on('shown', function () {
    //    $(this).find('input[type=text]:visible:first').focus();
    //});

    //$('.modal').success(function () {
        //$('input:text:visible:first').focus();
    //});

    $.fn.focusNextInputField = function () {
        return this.each(function () {
            var fields = $(this).parents('form:eq(0),body').find('button,input,textarea,select,a');
            var index = fields.index(this);
            if (index > -1 && (index + 1) < fields.length) {
                fields.eq(index + 1).focus();
            }
            return false;
        });
    };

    //Inicio HotKeys Responsables
    $("#TituloFlotResponable").html("Seleccione un registro de " + $('#CbxResponsable_1').attr("placeholder"));
    $('#pnlAddClassModal').on('shown.bs.modal', function () { $('#Txt_ResponsableDescripcion').focus() });
    $('#CbxResponsable_1').focusin(function () {
        if (!isPostBack) {
            $('#pnlAddClassModal').modal('toggle');
        }
        setTimeout(function () { $("#Txt_ResponsableDescripcion").focus(); }, 800);
    });
    $('#Txt_ResponsableDescripcion').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarResponsable').click();
        }
    });
    $('#Txt_ResponsableId').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarResponsable').click();
        }
    });

    $('#pnlAddClassModal').on('shown.bs.modal', function () {
        $('#Txt_ResponsableDescripcion').focus()
    })

    //Inicio Cenco
    $("#TituloFlotCenco").html("Seleccione un registro de " + $('#Txt_Descripcion_CentroCosto').attr("placeholder"));
    $('#pnlCentroCosto').on('shown.bs.modal', function () { $('#Txt_Descripcion_CentroCosto_ft').focus() });
    $('#Txt_Descripcion_CentroCosto').focusin(function () {
        if (!isPostBack) {
            $('#pnlCentroCosto').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_CentroCosto_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_CentroCosto_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCentroCosto').click();
        }
    });
    $('#Txt_Id_CentroCosto_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCentroCosto').click();
        }
    });
    //Fin Cenco

    //Inicio UEN
    $("#TituloFlotUEN").html("Seleccione un registro de " + $('#Txt_Descripcion_UEN').attr("placeholder"));
    $('#pnlUEN').on('shown.bs.modal', function () { $('#Txt_Descripcion_UEN_ft').focus() });
    $('#Txt_Descripcion_UEN').focus(function () {
        if (!isPostBack) {
            $('#pnlUEN').modal('toggle');
        }
        setTimeout(function() { $("#Txt_Descripcion_UEN_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_UEN_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarUEN').click();
        }
    });
    $('#Txt_Id_UEN_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarUEN').click();
        }
    });
    //Fin UEN

    //Inicio AreaDepartamento
    $("#TituloFlotArea").html("Seleccione un registro de " + $('#Txt_Descripcion_Area').attr("placeholder"));
    $('#pnlArea').on('shown.bs.modal', function () { $('#Txt_Descripcion_Area_ft').focus() });
    $('#Txt_Descripcion_Area').focus(function () {
        if (!isPostBack) {
            $('#pnlArea').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Area_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Area_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarArea').click();
        }
    });
    $('#Txt_Id_Area_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarArea').click();
        }
    });
    //Fin AreaDepartamento

    //Inicio Ubicacion
    $("#TituloFlotUbicacion").html("Seleccione un registro de " + $('#Txt_Descripcion_Ubicacion').attr("placeholder"));
    $('#pnlUbicacion').on('shown.bs.modal', function () { $('#Txt_Descripcion_Ubicacion_ft').focus() });
    $('#Txt_Descripcion_Ubicacion').focus(function () {
        if (!isPostBack) {
            $('#pnlUbicacion').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Ubicacion_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Ubicacion_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarUbicacion').click();
        }
    });
    $('#Txt_Id_Ubicacion_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarUbicacion').click();
        }
    });
    //Fin Ubicacion

    //Inicio Direccion
    $("#TituloFlotDireccion").html("Seleccione un registro de " + $('#Txt_Descripcion_Direccion').attr("placeholder"));
    $('#pnlDireccion').on('shown.bs.modal', function () { $('#Txt_Descripcion_Direccion_ft').focus() });
    $('#Txt_Descripcion_Direccion').focus(function () {
        if (!isPostBack) {
            $('#pnlDireccion').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Direccion_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Direccion_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarDireccion').click();
        }
    });
    $('#Txt_Id_Direccion_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarDireccion').click();
        }
    });
    //Fin Direccion

    //Inicio Empresa
    $("#TituloFlotEmpresa").html("Seleccione un registro de " + $('#Txt_Descripcion_Empresa').attr("placeholder"));
    $('#pnlEmpresa').on('shown.bs.modal', function () { $('#Txt_Descripcion_Empresa_ft').focus() });
    $('#Txt_Descripcion_Empresa').focus(function () {
        if (!isPostBack) {
            $('#pnlEmpresa').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Empresa_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Empresa_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarEmpresa').click();
        }
    });
    $('#Txt_Id_Empresa_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarEmpresa').click();
        }
    });
    //Fin Empresa

    //Inicio Grupo
    $("#TituloFlotGrupo").html("Seleccione un registro de " + $('#Txt_Descripcion_Grupo').attr("placeholder"));
    $('#pnlGrupo').on('shown.bs.modal', function () { $('#Txt_Descripcion_Grupo_ft').focus() });
    $('#Txt_Descripcion_Grupo').focus(function () {
        if (!isPostBack) {
            $('#pnlGrupo').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Grupo_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Grupo_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarGrupo').click();
        }
    });
    $('#Txt_Id_Grupo_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarGrupo').click();
        }
    });
    //Fin Grupo

    //Inicio Regional
    $("#TituloFlotRegional").html("Seleccione un registro de " + $('#Txt_Descripcion_Regional').attr("placeholder"));
    $('#pnlRegional').on('shown.bs.modal', function () { $('#Txt_Descripcion_Regional_ft').focus() });
    $('#Txt_Descripcion_Regional').focus(function () {
        if (!isPostBack) {
            $('#pnlRegional').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Regional_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Regional_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarRegional').click();
        }
    });
    $('#Txt_Id_Regional_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarRegional').click();
        }
    });
    //Fin Regional

    //Inicio Ciudad
    $("#TituloFlotCiudad").html("Seleccione un registro de " + $('#Txt_Descripcion_Ciudad').attr("placeholder"));
    $('#pnlCiudad').on('shown.bs.modal', function () { $('#Txt_Descripcion_Ciudad_ft').focus() });
    $('#Txt_Descripcion_Ciudad').focus(function () {
        if (!isPostBack) {
            $('#pnlCiudad').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Ciudad_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Ciudad_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCiudad').click();
        }
    });
    $('#Txt_Id_Ciudad_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCiudad').click();
        }
    });
    //Fin Ciudad

    //Inicio Catalogo7
    $("#TituloFlotCatalogo7").html("Seleccione un registro de " + $('#Txt_Descripcion_Catalogo7').attr("placeholder"));
    $('#pnlCatalogo7').on('shown.bs.modal', function () { $('#Txt_Descripcion_Catalogo7_ft').focus() });
    $('#Txt_Descripcion_Catalogo7').focus(function () {
        if (!isPostBack) {
            $('#pnlCatalogo7').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Catalogo7_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Catalogo7_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo7').click();
        }
    });
    $('#Txt_Id_Catalogo7_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo7').click();
        }
    });
    //Fin Catalogo7

    //Inicio Catalogo8
    $("#TituloFlotCatalogo8").html("Seleccione un registro de " + $('#Txt_Descripcion_Catalogo8').attr("placeholder"));
    $('#pnlCatalogo8').on('shown.bs.modal', function () { $('#Txt_Descripcion_Catalogo8_ft').focus() });
    $('#Txt_Descripcion_Catalogo8').focus(function () {
        if (!isPostBack) {
            $('#pnlCatalogo8').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Catalogo8_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Catalogo8_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo8').click();
        }
    });
    $('#Txt_Id_Catalogo8_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo8').click();
        }
    });
    //Fin Catalogo8

    //Inicio Catalogo9
    $("#TituloFlotCatalogo9").html("Seleccione un registro de " + $('#Txt_Descripcion_Catalogo9').attr("placeholder"));
    $('#pnlCatalogo9').on('shown.bs.modal', function () { $('#Txt_Descripcion_Catalogo9_ft').focus() });
    $('#Txt_Descripcion_Catalogo9').focus(function () {
        if (!isPostBack) {
            $('#pnlCatalogo9').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Catalogo9_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Catalogo9_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo9').click();
        }
    });
    $('#Txt_Id_Catalogo9_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo9').click();
        }
    });
    //Fin Catalogo9

    //Inicio Tipo Activo
    $("#TituloFlotTipoActivo").html("Seleccione un registro de " + $('#Txt_Descripcion_TipoActivo').attr("placeholder"));
    $('#pnlTipoActivo').on('shown.bs.modal', function () { $('#Txt_Descripcion_TipoActivo_ft').focus() });
    $('#Txt_Descripcion_Color').focus(function () {
        if (!isPostBack) {
            $('#pnlTipoActivo').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_TipoActivo_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_TipoActivo_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarTipoActivo').click();
        }
    });
    $('#Txt_Id_TipoActivo_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarTipoActivo').click();
        }
    });
    //Fin Tipo Activo

    //Inicio Color
    $("#TituloFlotColor").html("Seleccione un registro de " + $('#Txt_Descripcion_Color').attr("placeholder"));
    $('#pnlColor').on('shown.bs.modal', function () { $('#Txt_Descripcion_Color_ft').focus() });
    $('#Txt_Descripcion_Color').focus(function () {
        if (!isPostBack) {
            $('#pnlColor').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Color_ft").focus(); }, 800);
    }); 
    $('#Txt_Descripcion_Color_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarColor').click();
        }
    });
    $('#Txt_Id_Color_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarColor').click();
        }
    });
    //Fin Color

    //Inicio Material
    $("#TituloFlotMaterial").html("Seleccione un registro de " + $('#Txt_Descripcion_Material').attr("placeholder"));
    $('#pnlMaterial').on('shown.bs.modal', function () { $('#Txt_Descripcion_Material_ft').focus() });
    $('#Txt_Descripcion_Material').focus(function () {
        if (!isPostBack) {
            $('#pnlMaterial').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Material_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Material_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarMaterial').click();
        }
    });
    $('#Txt_Id_Material_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarMaterial').click();
        }
    });
    //Fin Material

    //Inicio Proveedor
    $("#TituloFlotProveedor").html("Seleccione un registro de " + $('#Txt_Descripcion_Proveedor').attr("placeholder"));
    $('#pnlProveedor').on('shown.bs.modal', function () { $('#Txt_Descripcion_Proveedor_ft').focus() });
    $('#Txt_Descripcion_Proveedor').focus(function () {
        if (!isPostBack) {
            $('#pnlProveedor').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Proveedor_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Proveedor_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarProveedor').click();
        }
    });
    $('#Txt_Id_Proveedor_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarProveedor').click();
        }
    });
    //Fin Proveedor

    //Inicio Marca
    $("#TituloFlotMarca").html("Seleccione un registro de " + $('#Txt_Descripcion_Marca').attr("placeholder"));
    $('#pnlMarca').on('shown.bs.modal', function () { $('#Txt_Descripcion_Marca_ft').focus() });
    $('#Txt_Descripcion_Marca').focus(function () {
        if (!isPostBack) {
            $('#pnlMarca').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Marca_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Marca_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarMarca').click();
        }
    });
    $('#Txt_Id_Marca_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarMarca').click();
        }
    });
    //Fin Marca

    //Inicio Catalogo 4
    $("#TituloFlotCatalogo4").html("Seleccione un registro de " + $('#Txt_Descripcion_Catalogo4').attr("placeholder"));
    $('#pnlCatalogo4').on('shown.bs.modal', function () { $('#Txt_Descripcion_Catalogo4_ft').focus() });
    $('#Txt_Descripcion_Catalogo4').focus(function () {
        if (!isPostBack) {
            $('#pnlCatalogo4').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Catalogo4_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Catalogo4_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo4').click();
        }
    });
    $('#Txt_Id_Catalogo4_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo4').click();
        }
    });
    //Fin Catalogo 4

    //Inicio Catalogo 5
    $("#TituloFlotCatalogo5").html("Seleccione un registro de " + $('#Txt_Descripcion_Catalogo5').attr("placeholder"));
    $('#pnlCatalogo5').on('shown.bs.modal', function () { $('#Txt_Descripcion_Catalogo5_ft').focus() });
    $('#Txt_Descripcion_Catalogo5').focus(function () {
        if (!isPostBack) {
            $('#pnlCatalogo5').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Catalogo5_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Catalogo5_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo5').click();
        }
    });
    $('#Txt_Id_Catalogo5_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo5').click();
        }
    });
    //Fin Catalogo 5

    //Inicio Catalogo 6
    $("#TituloFlotCatalogo6").html("Seleccione un registro de " + $('#Txt_Descripcion_Catalogo6').attr("placeholder"));
    $('#pnlCatalogo5').on('shown.bs.modal', function () { $('#Txt_Descripcion_Catalogo6_ft').focus() });
    $('#pnlCatalogo6').focus(function () {
        if (!isPostBack) {
            $('#pnlCatalogo6').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Catalogo6_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Catalogo6_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo6').click();
        }
    });
    $('#Txt_Id_Catalogo6_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo6').click();
        }
    });
    //Fin Catalogo 6

    //Inicio Descripcion
    $("#TituloFlotDescripcion").html("Seleccione un registro de " + $('#Txt_Descripcion_Descripcion').attr("placeholder"));
    $('#pnlDescripcion').on('shown.bs.modal', function () { $('#Txt_Descripcion_Descripcion_ft').focus() });
    $('#Txt_Descripcion_Descripcion').focus(function () {
        if (!isPostBack) {
            $('#pnlDescripcion').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Descripcion_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Descripcion_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarDescripcion').click();
        }
    });
    $('#Txt_Id_Descripcion_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarDescripcion').click();
        }
    });
    //Fin Descripcion

    //Inicio Categoria
    $("#TituloFlotCategoria").html("Seleccione un registro de " + $('#Txt_Descripcion_Categoria').attr("placeholder"));
    $('#pnlCategoria').on('shown.bs.modal', function () { $('#Txt_Descripcion_Categoria_ft').focus() });
    $('#Txt_Descripcion_Categoria').focus(function () {
        if (!isPostBack) {
            $('#pnlCategoria').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Categoria_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Categoria_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCategoria').click();
        }
    });
    $('#Txt_Id_Categoria_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCategoria').click();
        }
    });
    //Fin Categoria

    //Inicio SubCategoria
    $("#TituloFlotSubCategoria").html("Seleccione un registro de " + $('#Txt_Descripcion_SubCategoria').attr("placeholder"));
    $('#pnlSubCategoria').on('shown.bs.modal', function () { $('#Txt_Descripcion_SubCategoria_ft').focus() });
    $('#Txt_Descripcion_SubCategoria').focus(function () {
        if (!isPostBack) {
            $('#pnlSubCategoria').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_SubCategoria_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_SubCategoria_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarSubCategoria').click();
        }
    });
    $('#Txt_Id_SubCategoria_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarSubCategoria').click();
        }
    });
    //Fin SubCategoria

    //Inicio Catalogo 1
    $("#TituloFlotSubCatalogo1").html("Seleccione un registro de " + $('#Txt_Descripcion_Catalogo1').attr("placeholder"));
    $('#pnlCatalogo1').on('shown.bs.modal', function () { $('#Txt_Descripcion_Catalogo1_ft').focus() });
    $('#Txt_Descripcion_Catalogo1').focus(function () {
        if (!isPostBack) {
            $('#pnlCatalogo1').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Catalogo1_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Catalogo1_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo1').click();
        }
    });
    $('#Txt_Id_Catalogo1_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo1').click();
        }
    });
    //Fin Catalogo 1

    //Inicio Catalogo 2
    $("#TituloFlotSubCatalogo2").html("Seleccione un registro de " + $('#Txt_Descripcion_Catalogo2').attr("placeholder"));
    $('#pnlCatalogo2').on('shown.bs.modal', function () { $('#Txt_Descripcion_Catalogo2_ft').focus() });
    $('#Txt_Descripcion_Catalogo2').focus(function () {
        if (!isPostBack) {
            $('#pnlCatalogo2').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Catalogo2_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Catalogo2_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo2').click();
        }
    });
    $('#Txt_Id_Catalogo2_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo2').click();
        }
    });
    //Fin Catalogo 2

    //Inicio Catalogo 3
    $("#TituloFlotSubCatalogo3").html("Seleccione un registro de " + $('#Txt_Descripcion_Catalogo3').attr("placeholder"));
    $('#pnlCatalogo3').on('shown.bs.modal', function () { $('#Txt_Descripcion_Catalogo3_ft').focus() });
    $('#Txt_Descripcion_Catalogo3').focus(function () {
        if (!isPostBack) {
            $('#pnlCatalogo3').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Catalogo3_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Catalogo3_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo3').click();
        }
    });
    $('#Txt_Id_Catalogo3_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo3').click();
        }
    });
    //Fin Catalogo 3

    //Inicio Catalogo 10
    $("#TituloFlotCatalogo10").html("Seleccione un registro de " + $('#Txt_Descripcion_Catalogo10').attr("placeholder"));
    $('#pnlCatalogo10').on('shown.bs.modal', function () { $('#Txt_Descripcion_Catalogo10_ft').focus() });
    $('#Txt_Descripcion_Catalogo10').focus(function () {
        if (!isPostBack) {
            $('#pnlCatalogo10').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Catalogo10_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Catalogo10_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo10').click();
        }
    });
    $('#Txt_Id_Catalogo10_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo10').click();
        }
    });
    //Fin Catalogo 10

    //Inicio Catalogo 11
    $("#TituloFlotCatalogo11").html("Seleccione un registro de " + $('#Txt_Descripcion_Catalogo11').attr("placeholder"));
    $('#pnlCatalogo11').on('shown.bs.modal', function () { $('#Txt_Descripcion_Catalogo11_ft').focus() });
    $('#Txt_Descripcion_Catalogo11').focus(function () {
        if (!isPostBack) {
            $('#pnlCatalogo11').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Catalogo11_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Catalogo11_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo11').click();
        }
    });
    $('#Txt_Id_Catalogo11_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo11').click();
        }
    });
    //Fin Catalogo 11

    //Inicio Catalogo 12
    $("#TituloFlotCatalogo12").html("Seleccione un registro de " + $('#Txt_Descripcion_Catalogo12').attr("placeholder"));
    $('#pnlCatalogo12').on('shown.bs.modal', function () { $('#Txt_Descripcion_Catalogo12_ft').focus() });
    $('#Txt_Descripcion_Catalogo12').focus(function () {
        if (!isPostBack) {
            $('#pnlCatalogo12').modal('toggle');
        }
        setTimeout(function () { $("#Txt_Descripcion_Catalogo12_ft").focus(); }, 800);
    });
    $('#Txt_Descripcion_Catalogo12_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo12').click();
        }
    });
    $('#Txt_Id_Catalogo12_ft').keydown(function (event) {
        if (event.which == '13') {
            $('#BtnBuscarCatalogo12').click();
        }
    });
    //Fin Catalogo 12
});

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de Responsable
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

$(document).ready(function () {
    //INICIO (BtnBuscarResponsable) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarResponsable').click(function () {

        //Declare las variables de la ventana flotante
        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_ResponsableDescripcion";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_ResponsableId";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResponsablesResultado";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarResponsable";
        //Icono Boton 06
        var IconoBtn = "boton_serach";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlAddClassModal";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "CbxResponsable_1";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_IdResponsable";
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Responsable";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarResponsable)

    //INICIO (BtnBuscarCentroCosto) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCentroCosto').click(function () {

        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_CentroCosto_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_CentroCosto_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_CentroCosto";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_CentroCosto";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCentroCosto";
        //Icono Boton 06
        var IconoBtn = "boton_serach_CentroCosto";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCentroCosto";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_CentroCosto";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_CentroCosto";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "CentroCosto";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCentroCosto)

    //INICIO (BtnBuscarUEN) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarUEN').click(function () {

        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_UEN_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_UEN_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_UEN";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_UEN";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarUEN";
        //Icono Boton 06
        var IconoBtn = "boton_serach_UEN";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlUEN";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_UEN";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_UEN";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "UEN";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarUEN)

    //INICIO (BtnBuscarArea) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarArea').click(function () {

        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Area_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Area_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Area";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Area";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarArea";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Area";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlArea";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Area";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Area";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Area";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarArea)

    //INICIO (BtnBuscarUbicacion) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarUbicacion').click(function () {

        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Ubicacion_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Ubicacion_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Ubicacion";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Ubicacion";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarUbicacion";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Ubicacion";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlUbicacion";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Ubicacion";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Ubicacion";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Ubicacion";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarUbicacion)

    //INICIO (BtnBuscarDireccion) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarDireccion').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Direccion_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Direccion_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Direccion";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Direccion";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarDireccion";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Direccion";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlDireccion";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Direccion";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Direccion";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Direccion";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarDireccion)

    //INICIO (BtnBuscarEmpresa) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarEmpresa').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Empresa_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Empresa_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Empresa";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Empresa";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarEmpresa";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Empresa";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlEmpresa";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Empresa";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Empresa";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Empresa";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarEmpresa)

    //INICIO (BtnBuscarGrupo) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarGrupo').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Grupo_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Grupo_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Grupo";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Grupo";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarGrupo";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Grupo";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlGrupo";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Grupo";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Grupo";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Grupo";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarGrupo)

    //INICIO (BtnBuscarRegional) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarRegional').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Regional_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Regional_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Regional";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Regional";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarRegional";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Regional";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlRegional";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Regional";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Regional";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Regional";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarRegional)

    //INICIO (BtnBuscarCiudad) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCiudad').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Ciudad_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Ciudad_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Ciudad";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Ciudad";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCiudad";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Ciudad";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCiudad";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Ciudad";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Ciudad";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Ciudad";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCiudad)

    //INICIO (BtnBuscarCatalogo7) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo7').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Catalogo7_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Catalogo7_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Catalogo7";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Catalogo7";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCatalogo7";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Catalogo7";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCatalogo7";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Catalogo7";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Catalogo7";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo7";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCatalogo7)

    //INICIO (BtnBuscarCatalogo8) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo8').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Catalogo8_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Catalogo8_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Catalogo8";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Catalogo8";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCatalogo8";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Catalogo8";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCatalogo8";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Catalogo8";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Catalogo8";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo8";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCatalogo8)

    //INICIO (BtnBuscarCatalogo9) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo9').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Catalogo9_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Catalogo9_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Catalogo9";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Catalogo9";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCatalogo9";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Catalogo9";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCatalogo9";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Catalogo9";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Catalogo9";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo9";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCatalogo9)

    //INICIO (BtnBuscarColor) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarColor').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Color_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Color_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Color";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Color";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarColor";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Color";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlColor";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Color";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Color";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Color";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCatalogo9)

    //INICIO (BtnBuscarMaterial) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarMaterial').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Material_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Material_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Material";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Material";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarMaterial";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Material";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlMaterial";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Material";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Material";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Material";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarMaterial)

    //INICIO (BtnBuscarProveedor) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarProveedor').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Proveedor_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Proveedor_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Proveedor";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Proveedor";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarProveedor";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Proveedor";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlProveedor";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Proveedor";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Proveedor";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Proveedor";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarProveedor)

    //INICIO (BtnBuscarMarca) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarMarca').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Marca_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Marca_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Marca";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Marca";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarMarca";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Marca";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlMarca";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Marca";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Marca";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Marca";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarMarca)

    //INICIO (BtnBuscarTipoActivo) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarTipoActivo').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_TipoActivo_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_TipoActivo_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_TipoActivo";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_TipoActivo";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarTipoActivo";
        //Icono Boton 06
        var IconoBtn = "boton_serach_TipoActivo";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlTipoActivo";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_TipoActivo";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_TipoActivo";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "TipoActivo";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarTipoActivo)

    //INICIO (BtnBuscarCatalogo4) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo4').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Catalogo4_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Catalogo4_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Catalogo4";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Catalogo4";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCatalogo4";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Catalogo4";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCatalogo4";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Catalogo4";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Catalogo4";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo4";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCatalogo4)

    //INICIO (BtnBuscarCatalogo5) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo5').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Catalogo5_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Catalogo5_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Catalogo5";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Catalogo5";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCatalogo5";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Catalogo5";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCatalogo5";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Catalogo5";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Catalogo5";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo5";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCatalogo5)

    //INICIO (BtnBuscarCatalogo6) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo6').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Catalogo6_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Catalogo6_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Catalogo6";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Catalogo6";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCatalogo6";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Catalogo6";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCatalogo6";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Catalogo6";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Catalogo6";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo6";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCatalogo6)

    //INICIO (BtnBuscarDescripcion) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarDescripcion').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Descripcion_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Descripcion_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Descripcion";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Descripcion";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarDescripcion";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Descripcion";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlDescripcion";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Descripcion";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Descripcion";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Descripcion";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarDescripcion)

    //INICIO (BtnBuscarCategoria) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCategoria').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Categoria_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Categoria_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Categoria";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Categoria";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCategoria";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Categoria";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCategoria";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Categoria";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Categoria";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Categoria";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCategoria)

    //INICIO (BtnBuscarSubCategoria) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarSubCategoria').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_SubCategoria_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_SubCategoria_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_SubCategoria";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_SubCategoria";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarSubCategoria";
        //Icono Boton 06
        var IconoBtn = "boton_serach_SubCategoria";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlSubCategoria";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_SubCategoria";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_SubCategoria";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "SubCategoria";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarSubCategoria)

    //INICIO (BtnBuscarCatalogo1) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo1').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Catalogo1_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Catalogo1_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Catalogo1";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Catalogo1";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCatalogo1";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Catalogo1";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCatalogo1";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Catalogo1";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Catalogo1";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo1";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCatalogo1)

    //INICIO (BtnBuscarCatalogo2) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo2').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Catalogo2_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Catalogo2_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Catalogo2";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Catalogo2";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCatalogo2";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Catalogo2";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCatalogo2";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Catalogo2";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Catalogo2";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo2";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCatalogo2)

    //INICIO (BtnBuscarCatalogo3) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo3').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Catalogo3_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Catalogo3_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Catalogo3";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Catalogo3";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCatalogo3";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Catalogo3";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCatalogo3";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Catalogo3";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Catalogo3";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo3";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCatalogo3)

    //INICIO (BtnBuscarCatalogo10) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo10').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Catalogo10_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Catalogo10_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Catalogo10";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Catalogo10";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCatalogo10";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Catalogo10";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCatalogo10";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Catalogo10";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Catalogo10";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo10";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCatalogo10)

    //INICIO (BtnBuscarCatalogo11) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo11').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Catalogo11_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Catalogo11_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Catalogo11";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Catalogo11";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCatalogo11";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Catalogo11";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCatalogo11";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Catalogo11";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Catalogo11";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo11";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCatalogo11)

    //INICIO (BtnBuscarCatalogo12) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo12').click(function () {
        //Declare las variables de la ventana flotante

        //Texto 01 de la ventana flotante
        var Txt_Descripcion_Flotante = "Txt_Descripcion_Catalogo12_ft";
        var nombre = $('#' + Txt_Descripcion_Flotante).val();
        //Texto 02 de la ventana flotante
        var Txt_Id_Flotante = "Txt_Id_Catalogo12_ft";
        var identificacion = $('#' + Txt_Id_Flotante).val();
        //Div Mensaje 03
        var MensajeDiv = "mensaje_Catalogo12";
        divMensaje = document.getElementById('' + MensajeDiv);
        //Div Panel 04
        var MensajeDivResul = "MostrarResultado_Catalogo12";
        divContenido = document.getElementById('' + MensajeDivResul);
        //Boton Buscar 05
        var BtnBuscar = "BtnBuscarCatalogo12";
        //Icono Boton 06
        var IconoBtn = "boton_serach_Catalogo12";
        //Panel Ventana donde final mente se muestra toda la ventana flotante 07
        var Pnl_AddInfo = "pnlCatalogo12";

        //Texto Descripcion Que se Muestra en el formulario dependiendo del que se seleccione
        var Txt_Descripcion_Formulario = "Txt_Descripcion_Catalogo12";
        //Texto ID Que captura el Id que se seleccione
        var Txt_Id_Formulario = "Txt_Id_Catalogo12";

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo12";
            GetMostrarResultado(nombre, identificacion, MensajeDivResul, MensajeDiv, $('#' + BtnBuscar), $("#" + IconoBtn), TipoCatalogo, Pnl_AddInfo, Txt_Descripcion_Formulario, Txt_Id_Formulario, Txt_Descripcion_Flotante, Txt_Id_Flotante);
        }
    });
    //FIN (BtnBuscarCatalogo12)

});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas Flotantes
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
//#endregion Responsable

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de Responsable de Inventario (usuario)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

$(document).ready(function () {
    //INICIO (BtnBuscarResponsable) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarUser').click(function () {
        var nombre = $('#Txt_UserDescripcion').val();
        var identificacion = $('#Txt_UserId').val();
        divMensaje = document.getElementById('mensaje');
        divContenido = document.getElementById('MostrarUserResultado');
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "User";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarUserResultado'), $("#mensajeUser"), $('#BtnBuscarUser'), $("#boton_serachUser"), TipoCatalogo);
        }
    });
    //FIN (BtnBuscarResponsable)


});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas de Responsable de Inventario (usuario)
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
//#endregion Usuario

//#region CentroCosto

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de CentroCosto
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
$(document).ready(function () {
    //INICIO (BtnBuscarCenco) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCenco_inv').click(function () {
        var nombre = $('#Txt_CencoDescripcion').val();
        var identificacion = $('#Txt_CencoId').val();
        divMensaje = document.getElementById('mensajeCenco');
        divContenido = document.getElementById('MostrarcencoResultado');
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "CentroCosto";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarcencoResultado'), $("#mensajeCenco"), $('#BtnBuscarCenco'), $("#boton_serachCenco"), TipoCatalogo);
        }

    });
    //FIN (BtnBuscarCenco)
});

$(document).ready(function () {
    //INICIO (BtnBuscarCenco) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarResponsable_Inv').click(function () {
        var nombre = $('#Txt_ResponsableDescripcion_Inv').val();
        var identificacion = $('#Txt_ResponsableId_Inv').val();
        divMensaje = document.getElementById('mensaje_Resp');
        divContenido = document.getElementById('MostrarResponsablesResultado_Inv');

        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Responsable";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarResponsablesResultado_Inv'), $("#mensaje_Resp"), $('#BtnBuscarResponsable_Inv'), $("#boton_serach"), TipoCatalogo);
        }
    });
    //FIN (BtnBuscarCenco)
});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas de CentroCosto
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//#endregion CentroCosto

//#region UEN

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de Unidad de Negocio
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
$(document).ready(function () {
    //INICIO (BtnBuscarCenco) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarUEN_inv').click(function () {
        var nombre = $('#Txt_UENDescripcion').val();
        var identificacion = $('#Txt_UENId').val();
        divMensaje = document.getElementById('mensajeUEN');
        divContenido = document.getElementById('MostrarUENResultado');
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "UEN";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarUENResultado'), $("#mensajeUEN"), $('#BtnBuscarUEN_inv'), $("#boton_serachUEN"), TipoCatalogo);
        }
    });
    //FIN (BtnBuscarCenco)
});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas de Unidad de Negocio
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//#endregion UEN

//#region Departamento

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de Departamento
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
$(document).ready(function () {
    //INICIO (BtnBuscarCenco) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarDepartamento_Inv').click(function () {
        var nombre = $('#Txt_DepartamentoDescripcion').val();
        var identificacion = $('#Txt_DepartamentoId').val();
        divMensaje = document.getElementById('mensajeDepartamento');
        divContenido = document.getElementById('MostrarDepartamentoResultado');
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Departamento";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarDepartamentoResultado'), $("#mensajeDepartamento"), $('#BtnBuscarDepartamento'), $("#boton_serachDepartamento"), TipoCatalogo);
        }
    });
    //FIN (BtnBuscarCenco)
});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas de Departamento
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//#endregion Departamento

//#region Ubicacion

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de Ubicacion
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
$(document).ready(function () {
    //INICIO (BtnBuscarUbicacion) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarUbicacion_Inv').click(function () {
        var nombre = $('#Txt_UbicacionDescripcion').val();
        var identificacion = $('#Txt_UbicacionId').val();
        divMensaje = document.getElementById('mensajeUbicacion');
        divContenido = document.getElementById('MostrarUbicacionResultado');
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Ubicacion";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarUbicacionResultado'), $("#mensajeUbicacion"), $('#BtnBuscarUbicacion'), $("#boton_serachUbicacion"), TipoCatalogo);
        }
    });
    //FIN (BtnBuscarUbicacion)
});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas de Ubicacion
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//#endregion Ubicacion

//#region Direccion

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de Direccion
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
$(document).ready(function () {
    //INICIO (BtnBuscarUbicacion) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarDireccion_Inv').click(function () {
        var nombre = $('#Txt_DireccionDescripcion').val();
        var identificacion = $('#Txt_DireccionId').val();
        divMensaje = document.getElementById('mensajeDireccion');
        divContenido = document.getElementById('MostrarDireccionResultado');
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Direccion";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarDireccionResultado'), $("#mensajeDireccion"), $('#BtnBuscarDireccion'), $("#boton_serachDireccion"), TipoCatalogo);
        }
    });
    //FIN (BtnBuscarUbicacion)
});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas de Direccion
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//#endregion Direccion

//#region Empresa

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de Empresa
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
$(document).ready(function () {
    //INICIO (BtnBuscarUbicacion) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarEmpresa_Inv').click(function () {
        var nombre = $('#Txt_EmpresaDescripcion').val();
        var identificacion = $('#Txt_EmpresaId').val();
        divMensaje = document.getElementById('mensajeEmpresa');
        divContenido = document.getElementById('MostrarEmpresaResultado');
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Empresa";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarEmpresaResultado'), $("#mensajeEmpresa"), $('#BtnBuscarEmpresa'), $("#boton_serachEmpresa"), TipoCatalogo);
        }
    });
    //FIN (BtnBuscarUbicacion)
});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas de Empresa
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//#endregion Empresa

//#region Grupo

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de Grupo
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
$(document).ready(function () {
    //INICIO (BtnBuscarUbicacion) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarGrupo_Inv').click(function () {
        var nombre = $('#Txt_GrupoDescripcion').val();
        var identificacion = $('#Txt_GrupoId').val();
        divMensaje = document.getElementById('mensajeGrupo');
        divContenido = document.getElementById('MostrarGrupoResultado');
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Grupo";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarGrupoResultado'), $("#mensajeGrupo"), $('#BtnBuscarGrupo'), $("#boton_serachGrupo"), TipoCatalogo);
        }
    });
    //FIN (BtnBuscarUbicacion)
});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas de Grupo
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//#endregion Grupo

//#region Regional

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de Regional
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
$(document).ready(function () {
    //INICIO (BtnBuscarRegional) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarRegional_Inv').click(function () {
        var nombre = $('#Txt_RegionalDescripcion').val();
        var identificacion = $('#Txt_RegionalId').val();
        divMensaje = document.getElementById('mensajeRegional');
        divContenido = document.getElementById('MostrarRegionalResultado');
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Regional";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarRegionalResultado'), $("#mensajeRegional"), $('#BtnBuscarRegional'), $("#boton_serachRegional"), TipoCatalogo);
        }
    });
    //FIN (BtnBuscarRegional)
});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas de Regional
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//#endregion Regional

//#region Ciudad

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de Ciudad
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
$(document).ready(function () {
    //INICIO (BtnBuscarRegional) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCiudad_Inv').click(function () {
        var nombre = $('#Txt_CiudadDescripcion').val();
        var identificacion = $('#Txt_CiudadId').val();
        divMensaje = document.getElementById('mensajeCiudad');
        divContenido = document.getElementById('MostrarCiudadResultado');
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Ciudad";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarCiudadResultado'), $("#mensajeCiudad"), $('#BtnBuscarCiudad'), $("#boton_serachCiudad"), TipoCatalogo);
        }
    });
    //FIN (BtnBuscarRegional)
});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas de Ciudad
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//#endregion Ciudad

//#region Catalogo7

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de Catalogo7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
$(document).ready(function () {
    //INICIO (BtnBuscarCatalogo7) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo7_Inv').click(function () {
        var nombre = $('#Txt_Catalogo7Descripcion').val();
        var identificacion = $('#Txt_Catalogo7Id').val();
        divMensaje = document.getElementById('mensajeCatalogo7');
        divContenido = document.getElementById('MostrarCatalogo7Resultado');
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo7";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarCatalogo7Resultado'), $("#mensajeCatalogo7"), $('#BtnBuscarCatalogo7'), $("#boton_serachCatalogo7"), TipoCatalogo);
        }
    });
    //FIN (BtnBuscarCatalogo7)
});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas de Catalogo7
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//#endregion Catalogo7

//#region Catalogo8

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de Catalogo8
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
$(document).ready(function () {
    //INICIO (BtnBuscarCatalogo8) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo8_Inv').click(function () {
        var nombre = $('#Txt_Catalogo8Descripcion').val();
        var identificacion = $('#Txt_Catalogo8Id').val();
        divMensaje = document.getElementById('mensajeCatalogo8');
        divContenido = document.getElementById('MostrarCatalogo8Resultado');
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo8";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarCatalogo8Resultado'), $("#mensajeCatalogo8"), $('#BtnBuscarCatalogo8'), $("#boton_serachCatalogo8"), TipoCatalogo);
        }
    });
    //FIN (BtnBuscarCatalogo8)
});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas de Catalogo8
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//#endregion 

//#region Catalogo9

/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
INICIO Seccion de ventanas de Catalogo9
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/
$(document).ready(function () {
    //INICIO (BtnBuscarCatalogo9) escucha cuando el usuario selecciona el boton de buscar en la ventana flotante
    $('#BtnBuscarCatalogo9_Inv').click(function () {
        var nombre = $('#Txt_Catalogo9Descripcion').val();
        var identificacion = $('#Txt_Catalogo9Id').val();
        divMensaje = document.getElementById('mensajeCatalogo9');
        divContenido = document.getElementById('MostrarCatalogo9Resultado');
        if ($.trim(nombre) == '' && $.trim(identificacion) == '') {
            divMensaje.innerHTML = "Seleccione al menos un parámetro";
            divContenido.style.display = 'none';
            divMensaje.style.display = 'inline';
        } else {
            divContenido.style.display = "inline";
            var TipoCatalogo = "Catalogo9";
            MostrarResultadoCreateInv(nombre, identificacion, $('#MostrarCatalogo9Resultado'), $("#mensajeCatalogo9"), $('#BtnBuscarCatalogo9'), $("#boton_serachCatalogo9"), TipoCatalogo);
        }
    });
    //FIN (BtnBuscarCatalogo9)
});
/*
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
FIN de Seccion de ventanas de Catalogo9
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
*/

//#endregion Catalogo9

//#region BusquedaFacilActivo

function BuscarActivoFacil(MostrarResultadoActivo, MostrarTitulo, MostrarResultadoActivoParaBotonMaster) {
    var NumeroActivo = $('#Txt_BuscarNumeroActivoMaster').val();
    var actionData = "{'NumeroActivo': '" + NumeroActivo + "'}";
    $('#' + MostrarResultadoActivo).html("");
    $('#' + MostrarResultadoActivo).html("<center><i class='fa fa-spinner fa-spin'></i>&nbsp;Buscando datos un momento por favor...</center>");
    var isChecked = $('#Check_Activo_DescripcionMaster').is(':checked');
    if (!isChecked) {
        $('#' + MostrarResultadoActivo).load(location.origin + NombredelaSubcarpeta + 'Informes/ActivosFijos/HojadeVida?AppID=' + NumeroActivo + '&id=1074&su=1073&action=update&Visualizacion=2');
        $('#' + MostrarTitulo).html("<center><h4>Informacion para activo Número: <span class='label label-success'>" + NumeroActivo + "</span><span class='label label-warning'>Hoja de Vida</span></h4></center>");
        $('#' + MostrarResultadoActivoParaBotonMaster).html("<hr/>.<center><a target='_blank' href='" + location.origin + NombredelaSubcarpeta + "Informes/ActivosFijos/HojadeVida?AppID=" + NumeroActivo + "&id=1074&su=1073&action=update' data-toggle='tooltip' data-placement='bottom' title='Ver Hoja de Vida / Impresión' class='btn-raised btn btn-warning btn-fab-mini btn-fab'><i class='material-icons'>print</i></a><center><hr/>.");
        $('[data-toggle="tooltip"]').tooltip();
    } else {
        $('#' + MostrarResultadoActivoParaBotonMaster).html("");
        $.ajax(
        {
            url: location.origin + NombredelaSubcarpeta + 'Default.aspx/ConsultarNumeroActivo',
            data: actionData,
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                var prov = msg.d;
                $('#' + MostrarTitulo).html("");
                $('#' + MostrarTitulo).html(prov.Encabezado);
                $('#' + MostrarResultadoActivo).html("");
                $('#' + MostrarResultadoActivo).html(prov.Detallado);
            },
            error: function (result) {
                $('#' + MostrarResultadoActivo).html("");
                $('#' + MostrarResultadoActivo).html("<div class='alert alert-danger'>Error: <strong>" + result.status + '</strong>: ' + result.statusText + "</div>");
            }
        });
    }
}
//#endregion

//Exporto Boton temporal de inventarios
$(document).ready(function () {
    $('#downloadinvuser').click(function () {
        $("#DivMostrarInformacion").html("<div class='alert alert-dismissible alert-info'><i class='fa fa-refresh fa fa-spin' aria-hidden='true'></i> Realizando Informe </h5></center></div>");
        var NumeroInventario = $("#numeroinventario").html();
        var actionData = "{'NumeroInventario': '" + NumeroInventario + "'}";
        $.ajax(
        {
            url: location.origin + NombredelaSubcarpeta + "Informes/Inventarios/Index.aspx/ExportarInformePrevio",
            data: actionData,
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (msg) {
                var prov = msg.d;
                if (prov.Detallado != "404") {
                    $("#DivMostrarInformacion").html("");
                    $("#DivMostrarInformacion").html("<div class='alert alert-success'> Archivo creado satisfactoriamente por favor de click <a href='" + location.origin + NombredelaSubcarpeta + prov.Encabezado + "'>Aquí</a> para descargar el informe</div>");
                    $('[data-toggle="tooltip"]').tooltip();
                    window.location.href = location.origin + NombredelaSubcarpeta + prov.Encabezado;
                } else {
                    $("#DivMostrarInformacion").html("");
                    $("#DivMostrarInformacion").html("<div class='alert alert-danger'>Se produjo un error al generar el archivo: <strong>Archivo vacio</strong>, vuelva a intentarlo mas tarde, si el problema persiste contacte al administrador.<br/>Para mas detalles verifique esta informacion:<br/>" + prov.Encabezado + "</div>");
                }
            },
            error: function (result) {
                $("#DivMostrarInformacion").html("");
                $("#DivMostrarInformacion").html("<div class='alert alert-danger'>Error: <strong>" + result.status + '</strong> ' + result.statusText + "</div>");
            }
        });
    });
});
