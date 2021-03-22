function CheckearControl() {
    //Inicializo lo visual de Material Design
    $.material.init();
    //Inicializo nuevamente los Tooltip
    $('[data-toggle="tooltip"]').tooltip();

    //Inicializo nuevamente el boton estilo toggle
    $("[data-check='MaestrasActivos']").bootstrapToggle('destroy');
    $("[data-check='MaestrasActivos']").bootstrapToggle();
    $("#ContentPlaceHolder1_Txt_Id_Categoria").prop("disabled", false);

    //Asigno nuevamente los Placeholder al Text de los lable, para efecto
    $("input").each(function (index) {
        if (this.id.length > 0)
            placeHolderText(this.id);
    });
}

//Fin Check Box