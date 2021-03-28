<%@ Page Title="Consultar ARL" Language="C#" MasterPageFile="~/MasterPages/SiteModules.Master" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="EdgarNietoPrueba.Arl.Index" %>

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
                <label for="usuario" class="control-label">Usuario creación</label>
                <asp:TextBox runat="server" ID="usuario" placeholder="Usuario creación" CssClass="form-control" />
            </div>
            <div class="form-group label-floating col-md-6 col-lg-6 col-sm-12 col-xs-12">
                    <asp:DropDownList ID="ddlHabilitado" runat="server" CssClass="form-control" placeholder="Habilitado" data-toggle="tooltip" data-placement="top"></asp:DropDownList>
            </div>
            <div class="form-group label-floating col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="input-group">
                    <span class="input-group-addon"><i class="material-icons">date_range</i></span>
                    <label for="TxtFechaInicial" class="control-label">Fecha inicial</label>
                    <asp:TextBox runat="server" ID="TxtFechaInicial" autocomplete="off" CssClass="form-control" placeholder="Fecha mayor igual" MaxLength="50" />
                </div>
            </div>
            <div class="form-group label-floating col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <div class="input-group">
                    <span class="input-group-addon"><i class="material-icons">date_range</i></span>
                    <label for="TxtFechaFinal" class="control-label">Fecha final</label>
                    <asp:TextBox runat="server" ID="TxtFechaFinal" autocomplete="off" CssClass="form-control" placeholder="Fecha menor igual" MaxLength="50" />
                </div>
            </div>
            <div class="form-group label-floating col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label for="valor_inicial" class="control-label">Valor inicial</label>
                <asp:TextBox runat="server" ID="valor_inicial" placeholder="Valor mayor igual" CssClass="form-control"  type="number" />
            </div>
            <div class="form-group label-floating col-md-6 col-lg-6 col-sm-12 col-xs-12">
                <label for="valor_final" class="control-label">Valor final</label>
                <asp:TextBox runat="server" ID="valor_final" placeholder="Valor menor igual" CssClass="form-control"  type="number" />

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
                <asp:BoundField DataField="Idarl" HeaderText="Id"></asp:BoundField>
                <asp:BoundField DataField="Valor" HeaderText="Valor"></asp:BoundField>
                <asp:BoundField DataField="Usuariocreacion" HeaderText="Usuario creación"></asp:BoundField>
                <asp:BoundField DataField="Fechacreacion" HeaderText="Fecha creación"></asp:BoundField>
                <asp:CheckBoxField DataField="Habilitado" HeaderText="Habilitado" ReadOnly="true">
                    <ItemStyle HorizontalAlign="Center"/>
                </asp:CheckBoxField>
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

