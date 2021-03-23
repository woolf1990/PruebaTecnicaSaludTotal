<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="EdgarNietoPrueba.Contratos.Index"  MasterPageFile="~/MasterPages/SiteModules.Master" Title="Consultar Contratos" %>

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
        <li class="active">Contratos
        </li>
        <li class="active">
            Consultar
        </li>
    </ol>

    <div class="page-header">
        <div class="pull-right BtnSuperPone" role="group" aria-label="...">
                <a onclick="mostrarDiv('buscarDiv');"href="javascript:void(0)" class="btn btn-lg btn-danger btn-raised btn-fab" data-toggle="tooltip" data-placement="bottom" title="Buscar"><i class="material-icons">search</i></a>
            </div>
        <h1 id="animacion">
            Consultar <small>Actualización, inactivación &amp; consulta</small>
        </h1>
    </div>

    <div id="buscarDiv" class="buscarDiv card">
        <div class="col-sm-12 col-xs-12 col-md-12 col-lg-12">
            <div class="form-group label-floating col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label for="numerodocumento" class="control-label">Numero de documento</label>
                <asp:TextBox runat="server" ID="numerodocumento" placeholder="Numero de documento" CssClass="form-control"  type="number" />
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
            CellPadding="3" GridLines="None"  OnRowEditing="gvMenus_RowEditing"
            CellSpacing="2" OnPageIndexChanging="gvMenus_PageIndexChanging"
            OnRowCommand="gvMenus_RowCommand"
            EmptyDataText="No se encontraron registros" PagerStyle-CssClass="bs-pagination center">
            <AlternatingRowStyle BackColor="White" ForeColor="#284775" />
            <Columns>
                <asp:BoundField DataField="Idcontrato" HeaderText="Id contrato"></asp:BoundField>
                <asp:BoundField DataField="Estado.Nombre" HeaderText="Estado"></asp:BoundField>
                <asp:BoundField DataField="Arl.Nombre" HeaderText="Arl"></asp:BoundField>
                <asp:BoundField DataField="Cargo.Nombre" HeaderText="Cargo"></asp:BoundField>
                <asp:BoundField DataField="Tipo_documento.Nombre" HeaderText="Tipo documento"></asp:BoundField>
                <asp:BoundField DataField="Numerodocumento" HeaderText="Numero de documento"></asp:BoundField>
                <asp:BoundField DataField="Primerapellido" HeaderText="Primer apellido"></asp:BoundField>
                <asp:BoundField DataField="Segundoapellido" HeaderText="Segundo apellido"></asp:BoundField>
                <asp:BoundField DataField="Primernombre" HeaderText="Primer nombre"></asp:BoundField>
                <asp:BoundField DataField="Segundonombre" HeaderText="Segundo nombre"></asp:BoundField>
                <asp:BoundField DataField="Fechainicio" HeaderText="Fecha inicio"></asp:BoundField>
                <asp:BoundField DataField="Fechafin" HeaderText="Fecha fin"></asp:BoundField>
                <asp:BoundField DataField="Salario" HeaderText="Salario"></asp:BoundField>
                <asp:BoundField DataField="Usuariocreacion" HeaderText="Usuario creación"></asp:BoundField>
                <asp:BoundField DataField="Fechacreacion" HeaderText="Fecha creación"></asp:BoundField>
                <asp:CommandField ButtonType="Link" ShowEditButton="True" EditText="<i style='color:#ffffff' class='material-icons'>edit</i>" HeaderText="Nomina">
                        <ControlStyle CssClass="BotonLista BotonEditar btn btn-raised btn-info btn-fab-mini btn-fab"></ControlStyle>
                    <ItemStyle HorizontalAlign="Center"/>
                </asp:CommandField>
                <asp:ButtonField CommandName="Aportes" Text="<i style='color:#ffffff' class='material-icons'>check_circle</i>">
                                <ControlStyle CssClass="BotonLista BotonProgramar btn btn-raised btn-success btn-fab-mini btn-fab"></ControlStyle>
                                <ItemStyle HorizontalAlign="Center" />
                            </asp:ButtonField>
            </Columns>
            <PagerSettings FirstPageText="&lt;&lt;" LastPageText="&gt;&gt;" Mode="NumericFirstLast" PageButtonCount="5" />

            <PagerStyle CssClass="bs-pagination center"></PagerStyle>
        </asp:GridView>
    </div></div></div>
    </div>


</asp:Content>

