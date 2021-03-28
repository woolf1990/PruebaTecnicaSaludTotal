//#region CargarDatosdeTabla Concurrente
jQuery(document).ready(function () {

    function OnSuccess(response) {
        var xmlDoc = $.parseXML(response.d);
        var xml = $(xmlDoc);
        var customers = xml.find("Table");
        var row = $("[id*=gvCustomers] tr:last-child").clone(true);
        $("[id*=gvCustomers] tr").not($("[id*=gvCustomers] tr:first-child")).remove();
        $.each(customers, function () {
            var customer = $(this);
            $("td", row).eq(0).html($(this).find("CustomerID").text());
            $("td", row).eq(1).html($(this).find("ContactName").text());
            $("td", row).eq(2).html($(this).find("City").text());
            $("[id*=gvCustomers]").append(row);
            row = $("[id*=gvCustomers] tr:last-child").clone(true);
        });
    }

    CargarDatosdeTabla("MostrarResultadosFormulario");
    function CargarDatosdeTabla(divContenido) {
        //var actionData = "{'nombre': '" + checkboxValue + "','TipoCatalogo':'" + TipoCatalogo + "','divContenido':'" + divContenido + "','divContenidoResul':'" + divContenidoResul + "','DatoVisible':'" + DatoVisible + "','DatoParaElCodigo':'" + DatoParaElCodigo + "'}";
        var actionData = "{'nombre':'1','identificacion':'2','TipoCatalogo':'3'}";
        var session = '';
        var variableconDatos = '';
        var VariableTabla = '';
        var el = $('#waitProceso');
        el.block({
            overlayCSS: {
                backgroundColor: '#fff'
            },
            message: '<i class="fa fa-spinner fa-spin"></i> Un momento por favor,<br/> estamos cargando los datos...',
            css: {
                border: 'none',
                color: '#333',
                background: 'none'
            }
        });

        //$.ajax(
        //{
        //    url: "Index.aspx/GetDataAjax",
        //    data: actionData,
        //    dataType: "json",
        //    type: "POST",
        //    contentType: "application/json; charset=utf-8",
        //    success: function (msg) {
        //        //msg.d;
        //        VariableTabla = msg.d;
        //        //variableconDatos = prov.variableconDatos;
        //        $("#" + divContenido).html('<table class="table table-striped table-bordered table-hover table-full-width" id="sample_1"><thead><tr><th>Id</th><th class="hidden-xs">Descripcion</th><th>Fecha/Hora Inicio</th><th class="hidden-xs">Fecha Final</th><th>Estado</th></tr></thead><tbody>' + VariableTabla + '</tbody></table>');
        //        el.unblock();
        //        TableData.init();
        //    },
        //    error: function (result) {
        //        $("#" + divContenido).html("ERROR " + result.status + ' ' + result.statusText);
        //        el.unblock();
        //    }
        //});

    }
});
//#endregion