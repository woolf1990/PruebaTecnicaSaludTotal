<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Create.aspx.cs" Inherits="EdgarNietoPrueba.Arl.Create" MasterPageFile="~/MasterPages/SiteModules.Master" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <asp:ScriptManager ID="ScriptManager1" runat="server" />
    <script language="javascript" type="text/javascript">
    <!-- 
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
        //alert('Hola 1');
        $("#icon_update").removeClass("fa fa-refresh");
        $("#icon_save").removeClass("fa fa-floppy-o");
        $("#icon_update").addClass("fa fa-spinner fa-spin");
        $("#icon_save").addClass("fa fa-spinner fa-spin");
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
        if (postBackElement.id == 'UpdateUser') {
            alert('Hola actualizar');
        }
    }
    </script>
    <ol class="breadcrumb">
		<li>
			<i class="<%Response.Write(Session["menuIcon"]); %>"></i>
			<a href="#">
				Crear Arl
			</a>
		</li>
	</ol>
    <div class="page-header">
		<h1 id="animacion">
            ARL <small>crear / actualizar</small>
        </h1>
	</div>
    <asp:UpdatePanel ID="UpdatePanel1" UpdateMode="Conditional" runat="server" RenderMode="Inline">
    <ContentTemplate>
    <div class="box-register login example2">
        <div class="col-xs-12 col-sm-8 col-md-8 col-sm-offset-2 col-md-offset-2">
            <div class="panel panel-default">
				<div class="panel-heading">
					<i class="fa fa-external-link-square"></i>
					<asp:Label runat="server" ID="lbltittlepage"></asp:Label>
					<div class="panel-tools">
					</div>
				</div>
			<div class="panel-body buttons-widget" id="form_insert_panel">
                <asp:UpdateProgress ID="UpdateProgress1" runat="server">
                <ProgressTemplate>
                </ProgressTemplate>
                </asp:UpdateProgress>
                <asp:PlaceHolder runat="server" ID="ErrorMessage" Visible="false">
                    <p class="text-danger1">
                        <div class='alert alert-warning'><button data-dismiss='alert' class='close'>&times;</button><i class='fa fa-info-circle'></i>
                            <asp:Literal runat="server" ID="FailureText" />
                        </div>
                    </p><hr />
                </asp:PlaceHolder>

            <p>
				Ingrese la siguiente información
			</p>
                <asp:Label runat="server" ID="Error"
                    Visible="false" ForeColor="Red" EnableViewState="false" />
                <asp:Label runat="server" ID="InvalidUserNameOrPasswordMessage"
                    Visible="false" ForeColor="Red" EnableViewState="false" />
                <fieldset>
                    <div class="form-group label-floating"  runat="server" id = "div_id">
                        <label for="id" class="control-label">Usuario creación</label>
                        <asp:TextBox runat="server" ID="id" placeholder="ID" CssClass="form-control" />
				    </div>
                    <div class="form-group label-floating">
                        <label for="usuario" class="control-label">Usuario creación</label>
                        <asp:TextBox runat="server" ID="usuario" placeholder="Usuario creación" CssClass="form-control" />
				    </div>
                    <div class="form-group label-floating">
                        <label for="valor" class="control-label">Valor</label>
                        <asp:TextBox runat="server" ID="valor" placeholder="Valor" CssClass="form-control"  type="number" />
				    </div>
				    <div class="form-group label-floating">
                        <div class="input-group">
                        <span class="input-group-addon"><i class="material-icons">date_range</i></span>
                        <label for="TxtFechaInicial" class="control-label">Fecha inicial</label>
                        <asp:TextBox runat="server" ID="TxtFechaInicial" autocomplete="off" CssClass="form-control" placeholder="Fecha mayor igual" MaxLength="50" />
                    </div>
				    </div>
                    <center>
                        <input runat="server" id="habilitado" type="checkbox" data-check='MaestrasActivos' data-offstyle="bricky" data-toggle="toggle" data-size="small" data-on="Activo" data-off="Inactivo" checked="checked"/>
                    </center>
                </fieldset>
                <div class="form-actions">
                    <asp:LinkButton runat="server" OnClick="Cancel" class="btn active go-back btn-raised" CausesValidation="False" ><i class="fa fa-arrow-circle-left"></i> Volver</asp:LinkButton>
                    <asp:LinkButton runat="server" ID="CreateReg" CausesValidation="true" class="btn btn-danger pull-right btn-raised" OnClick="Create_Click" >Guardar <i id="icon_save" class="fa fa-floppy-o"></i></asp:LinkButton>
                    <asp:LinkButton runat="server" ID="UpdateReg"  CausesValidation="true" class="btn btn-danger pull-right btn-raised" OnClick="Update_Click" >Actualizar <i id="icon_update" class="fa fa-refresh"></i></asp:LinkButton>
				</div>
            </div>
        </div>
        </div>
    </div>
    </ContentTemplate>
    </asp:UpdatePanel>
    <script src="<%= ResolveClientUrl("~/js/CheckBox.js") %>"></script>
</asp:Content>
