<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Aportes.aspx.cs" Inherits="EdgarNietoPrueba.Contratos.Aportes" MasterPageFile="~/MasterPages/SiteModules.Master" Title="Consultar Contratos" %>

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
        <h1 id="animacion">
            Consultar <small>Actualización, inactivación &amp; consulta</small>
        </h1>
    </div>

    <div id="buscarDiv" class="buscarDiv card">
        <div class="col-sm-12 col-xs-12 col-md-12 col-lg-12">
            
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
        <!-- -->
            <h2>Salario: <label id="lb_salario" runat="server"></label></h2>
            <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th >Aporte</th>
                <th >% Empeador</th>
                <th >% Trabajador</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td >Salud</td>
                <td >12.5%</td>
                <td >4.0%</td>
              </tr>
              <tr>
                <td >Pension</td>
                <td >16.0%</td>
                <td >4.0%</td>
              </tr>
            </tbody>
            </table>
            <br />
            <br />

            <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th >Aporte</th>
                <th >% Empeador</th>
                  <th >Valor</th>
                <th >% Trabajador</th>
                  <th >Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td >Salud</td>
                <td >12.5%</td>
                  <th ><label id="lb_salud_empelador" runat="server"></label></th>
                <td >4.0%</td>
                  <th ><label id="lb_salud_trabajador" runat="server"></label></th>
              </tr>
              <tr>
                <td >Pension</td>
                <td >16.0%</td>
                  <th ><label id="lb_pension_empelador" runat="server"></label></th>
                <td >4.0%</td>
                  <th ><label id="lb_pension_trabajador" runat="server"></label></th>
              </tr>
            </tbody>
            </table>
    </div></div></div>
    </div>


</asp:Content>

