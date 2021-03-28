var prm = Sys.WebForms.PageRequestManager.getInstance();
function CancelAsyncPostBack() {
    if (prm.get_isInAsyncPostBack()) {
        prm.abortPostBack();
    }
}
prm.add_initializeRequest(InitializeRequest);
prm.add_endRequest(EndRequest);
var postBackElement;
function InitializeRequest(sender, args) {
    if (prm.get_isInAsyncPostBack()) {
        args.set_cancel(true);
    }
    postBackElement = args.get_postBackElement();
    if (postBackElement.id == 'BtnLogin') {
        document.getElementById('<%= BtnLogin.ClientID %>').disabled = true;
        $("#iconLogin").removeClass("fa fa-arrow-circle-right");
        $("#iconLogin").addClass("fa fa-spinner fa-spin");
    }
}