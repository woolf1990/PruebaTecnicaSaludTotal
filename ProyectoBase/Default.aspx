<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/MasterPages/SiteModules.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EdgarNietoPrueba._Default" %>

<asp:Content ID="BodyContent" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <div class="row fondoDefault" >
        <h1>Prueba tecnica Edgar Enrique Nieto</h1>
        <div class="col-md-4 well">
                    <h2>Especificaciones del desarrollo:</h2>
                    <p>
                        
                        <ul>
                            <li>
                                IDE de desarrollo: Microsoft Visual Studio Community 2019 (2) Version 16.9.2
                            </li>
                            <li>
                                Base de datos: Microsoft SQL Server 2017 (RTM-GDR) (KB4583456) - 14.0.2037.2 (X64)   Nov  2 2020 19:19:59   Copyright (C) 2017 Microsoft Corporation  Express Edition (64-bit) on Windows 10 Pro 10.0 <X64> (Build 19042: ) (Hypervisor) 
                            </li>
                            <li>
                                Lenguaje de programación backend: C# Asp.Net
                            </li>
                            <li>
                                Lenguaje de programación frontend: JQuery 
                            </li>
                            <li>
                                Libreria auxiliar: Bootstrap 
                            </li>
                            <li>
                                Framework: .Net Framework 4.6 
                            </li>
                        </ul>
                    </p>
                </div>  
        <div class="col-md-4 well">
                    <p>
                        <h2>Tener en cuenta para correr el proyecto de forma adecuada:</h2>
                        <ul>
                            <li>
                                Es importante tener instalado las siguientes librerias:
                            </li>
                                <ul>
                                    <ol>
                                        Entity
                                    </ol>
                                    <ol>
                                        EntityFramework
                                    </ol>
                                    <ol>
                                        EntityFramework.SqlServer
                                    </ol>
                                    <ol>
                                        EntityFramework6.Npgsql
                                    </ol>
                                    <ol>
                                        Npgsql
                                    </ol>
                                </ul>
                            </ul>
                        Descargar los paquetes Nuget
                        <ul>
                            <li>
                                EntityFramwork6.Npgsql
                            </li>
                        </ul>
                        Por ultimo se requiere configurar la cadena de conexion en el archivo web.config del proyecto ProyectoBase.
                        <br />Buscar la linea (46):
                        <br />connectionString="server=localhost\SQLEXPRESS2017;Database=PruebaTecnicaEdgarEnriqueNietoValdes;User Id=sa; Password=123;pooling=no;"
                        <br />Y modificarla con los datos encesarios para establecer conexión con su servidor de base de datos.
                    </p>
                </div>  
    </div>
</asp:Content>