/* =========================================================
Nombre Aplicacion:        Todos
Modulo:                   Todos
Version:                  1.0
Nombre de Funcion:        mostrarDiv
Descripcion:              Se encarga de mostrar una division usando el efecto slide down
Autor:                    
Cargo:                    
Empresa:                  PINE
Fecha:                    27 Junio 2014
========================================================= */

function mostrarDiv(id) {
    $("#" + id).slideDown(500);
    $(".BtnSuperPone").hide();
}
/* =========================================================
Nombre Aplicacion:        Todos
Modulo:                   Todos
Version:                  1.0
Nombre de Funcion:        ocultarDiv
Descripcion:              Se encarga de ocultar una division usando el efecto slide up
Autor:                   
Cargo:                    
Empresa:                  PINE
Fecha:                    27 Junio 2014
========================================================= */

function ocultarDiv(id) {
    $("#" + id).slideUp(500);
}
/* =========================================================
Nombre Aplicacion:        Todos
Modulo:                   Todos
Version:                  1.0
Nombre de Funcion:        ocultarDiv
Descripcion:              Se encarga de cargar el select dependiente
Autor:                    
Cargo:                    
Empresa:                  PINE
Fecha:                    27 Junio 2014
========================================================= */
function cargarSelectDependiente(urlAjax, data, id) {
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: urlAjax,
        data: data,
        dataType: "json",
        success: function (res) {
            $("#" + id).html(res.d);
        },
        error: function (msg) {
            alert("Error en ajax"+msg);
        }
    });
}

function cargarDiv(id, cadena, tipo, urlAjax) {
    //if(id!=null){
        var data = "{cadena:'" + cadena + "'}";

        //alert("cadena " + data);
        //if ($('#cargando').length) {
        //    $('#cargando').html('<strong>Por favor Espere </strong><img id="imgcargando" src="../img/cargando.gif" alt="">');
        //}
        //debugger;
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            url: urlAjax,
            data: data,
            dataType: "json",
            success: function (res) {
                $("#" + id).html(res.d);
                $.material.init();
                //Inicializo nuevamente los Tooltip
                $('[data-toggle="tooltip"]').tooltip();
                $("input").each(function (index) {
                    if (this.id.length > 0)
                        placeHolderText(this.id);
                });
            },
            error: function (msg) {
                alert("Error en ajax" + msg);
            }
        });
    //}
    
}


function InformeCoomevaConcurrenteTotalEncontrados(Metodo, btn) {
    $('#InformacionUsuario').html('');
        $.ajax({
            url: "Index.aspx/" + Metodo,
            data: "{'f042_FechaProgramacionInicial':'" + QuitarUndefinied($('#ContentPlaceHolder1_TxtFechaProgramacionInicial_Inv')) + "','f042_FechaProgramacionFinal':'" + QuitarUndefinied($('#ContentPlaceHolder1_TxtFechaProgramacionFinal_Inv')) + "','f017_IdResponsable':'" + QuitarUndefinied($('#Txt_IdResponsable')) + "','f018_IdCentroCosto':'" + QuitarUndefinied($('#Txt_Id_CentroCosto')) + "','f019_IdUnidadNegocio':'" + QuitarUndefinied($('#Txt_Id_UEN')) + "','f020_IdAreaDepartamento':'" + QuitarUndefinied($('#Txt_Id_Area')) + "','f021_IdUbicacion':'" + QuitarUndefinied($('#Txt_Id_Ubicacion')) + "','f022_IdDireccion':'" + QuitarUndefinied($('#Txt_Id_Direccion')) + "','f023_IdEmpresa':'" + QuitarUndefinied($('#Txt_Id_Empresa')) + "','f024_IdGrupo':'" + QuitarUndefinied($('#Txt_Id_Grupo')) + "','f025_IdRegional':'" + QuitarUndefinied($('#Txt_Id_Regional')) + "','f026_IdCiudad':'" + QuitarUndefinied($('#Txt_Id_Ciudad')) + "','f033_IdCatalogo7':'" + QuitarUndefinied($('#Txt_Id_Catalogo7')) + "','f034_IdCatalogo8':'" + QuitarUndefinied($('#Txt_Id_Catalogo8')) + "','f035_IdCatalogo9':'" + QuitarUndefinied($('#Txt_Id_Catalogo9')) + "'}",
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (msj) {
                //alert(msj.d);
                $('#InformacionUsuario').html("<div class='alert alert-success' role='alert'><center>" + msj.d + "</center></div>");
                btn.disabled = true;
                location.reload();
            },
            error: function (result) {
                alert("ERROR " + result.status + ' ' + result.statusText);
            }
        });
        return false;
}

function QuitarUndefinied(valor) {
    if (typeof valor.val() === "undefined") {
        return "";
    }
    return valor.val();
}

function QuitarBoton(boton) {
    boton.style.display = "none";
    $('#EstadoInforme').style.display = "none";
}

var myTemporizador;

function IniciarTempo() {
    myTemporizador = setInterval(HacerPing, 5000);
}

function HacerPing() {
    $.ajax({
        url: "Index.aspx/KeepActiveSession",
        data: "",
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (msj) {
            if (msj.d != true) {
                alert("Error generando el informe, por favor intentelo de nuevo.");
            }
        },
        error: function (result) {
            alert("ERROR " + result.status + ' ' + result.statusText);
        }
    });
    return false;
}