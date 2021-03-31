<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="EdgarNietoPrueba.Requerimientos.Index" Title="Requerimientos" MasterPageFile="~/MasterPages/SiteModules.Master"  %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server"></asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <script src="<%# ResolveClientUrl("~/assets/plugins/jquery-ui/jquery-ui-1.10.2.custom.min.js") %>"></script>
    <style>
        #buscarDiv {
            display: none;
        }
    </style>
    <ol class="breadcrumb">
        <li>
            <i class="fa fa-home"></i>
            <a href="#">Maestras</a>
        </li>
        <li class="active">ARL
        </li>
        <li class="active">
            Consultar
        </li>
    </ol>

    <div class="page-header">
        <h1 id="animacion">
            <div class="pull-right BtnSuperPone" role="group" aria-label="...">
                <a onclick="mostrarDiv('buscarDiv');"href="javascript:void(0)" class="btn btn-lg btn-danger btn-raised btn-fab" data-toggle="tooltip" data-placement="bottom" title="Buscar"><i class="material-icons">search</i></a>
                <a href="<%= ResolveClientUrl("Create?action=create") %>" class="btn btn-danger btn-raised btn-fab" data-toggle="tooltip" data-placement="bottom" title="Nuevo"><i class="material-icons">add</i></a>
            </div>
            Consultar <small>Actualización, inactivación &amp; consulta</small>
        </h1>
    </div>

    <div id="buscarDiv" class="buscarDiv card">
        <div class="col-sm-12 col-xs-12 col-md-12 col-lg-12">
            <div class="form-group label-floating col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label for="f005_id" class="control-label">Usuario creación</label>
                <asp:TextBox runat="server" ID="f005_id" placeholder="Id de requerimiento" CssClass="form-control"  type="number" />
            </div>
            <div class="form-group label-floating col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label for="f005_area" class="control-label">Area</label>
                        <asp:DropDownList ID="f005_area" runat="server" CssClass="form-control" placeholder="Area" data-toggle="tooltip" data-placement="top"></asp:DropDownList>
            </div>
            <div class="form-group label-floating col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label for="f005_aplicativo" class="control-label">Aplicativo</label>
                        <asp:DropDownList ID="f005_aplicativo" runat="server" CssClass="form-control" placeholder="Aplicativo" data-toggle="tooltip" data-placement="top"></asp:DropDownList>
            </div>
            <div class="form-group label-floating col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label for="f005_ingeniero" class="control-label">Ingeniero</label>
                        <asp:DropDownList ID="f005_ingeniero" runat="server" CssClass="form-control" placeholder="Ingeniero" data-toggle="tooltip" data-placement="top"></asp:DropDownList>
            </div>
            <div class="form-group label-floating col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label for="f005_prioridad" class="control-label">Prioridad</label>
                <asp:DropDownList ID="f005_prioridad" runat="server" CssClass="form-control" placeholder="Prioridad" data-toggle="tooltip" data-placement="top"></asp:DropDownList>
            </div>
            
            <div class="btn-group pull-right" role="group">
                <asp:Button runat="server" OnClick="Buscar" Text="Buscar" CssClass="btn btn-raised btn-warning btn-sm" />
                <asp:Button runat="server" OnClick="Cancelar" Text="Cancelar" CssClass="btn btn-raised btn-default btn-sm" />
            </div>
        </div>
        <!-- /.col-lg-6 -->
    </div>
    <br />
    <asp:PlaceHolder runat="server" ID="ErrorMessage" Visible="false">
        <p class="text-danger1">
            <hr />
            <div class='alert alert-success'>
                <button data-dismiss='alert' class='close'>&times;</button><i class='fa fa-info-circle'></i>
                <asp:Literal runat="server" ID="FailureText" />
            </div>
        </p>
    </asp:PlaceHolder>
    <div class="card"><div class="card-body">
        <div class="col-sm-12 col-xs-12 col-md-12 col-lg-12">
        <div class="table-responsive">
        
        <asp:GridView ID="gvMenus" runat="server" CssClass="table table-striped table-hover" AllowPaging="True" AutoGenerateColumns="False"
            CellPadding="3" GridLines="None" OnRowEditing="gvMenus_RowEditing"
            CellSpacing="2" OnPageIndexChanging="gvMenus_PageIndexChanging"
            EmptyDataText="No se encontraron registros" PagerStyle-CssClass="bs-pagination center">
            <AlternatingRowStyle BackColor="White" ForeColor="#284775" />
            <Columns>
                <asp:BoundField DataField="f005_id" HeaderText="Id"></asp:BoundField>
                <asp:BoundField DataField="F005_area.F001_descripcion" HeaderText="Area"></asp:BoundField>
                <asp:BoundField DataField="F005_aplicativo.F002_descripcion" HeaderText="Aplicacion"></asp:BoundField>
                <asp:BoundField DataField="F005_ingeniero.F003_fullname" HeaderText="Ingeniero"></asp:BoundField>
                <asp:BoundField DataField="F005_prioridad.F004_descripcion" HeaderText="Prioridad"></asp:BoundField>
                <asp:CommandField ButtonType="Link" ShowEditButton="True" EditText="<i style='color:#ffffff' class='material-icons'>edit</i>">
                        <ControlStyle CssClass="BotonLista BotonEditar btn btn-raised btn-info btn-fab-mini btn-fab"></ControlStyle>
                    <ItemStyle HorizontalAlign="Center"/>
                </asp:CommandField>
            </Columns>
            <PagerSettings FirstPageText="&lt;&lt;" LastPageText="&gt;&gt;" Mode="NumericFirstLast" PageButtonCount="5" />

            <PagerStyle CssClass="bs-pagination center"></PagerStyle>
        </asp:GridView>
    </div></div></div>
    </div>


</asp:Content>

