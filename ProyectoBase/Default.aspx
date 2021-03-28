﻿<%@ Page Title="Home Page" Language="C#" MasterPageFile="~/MasterPages/SiteModules.Master" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="EdgarNietoPrueba._Default" %>

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
                                Base de datos: PostgreSQL 10.16, compiled by Visual C++ build 1800, 64-bit
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
                        Por ultimo se requiere configurar la cadena de conexion en el archivo web.config del proyecto EdgarNietoPrueba.
                        <br />Buscar la linea:
                        <br />connectionString="server=localhost; port=5432;Database=postgres;User ID=postgres;Password=123;Integrated Security=True"
                        <br />Y modificarla con los datos encesarios para establecer conexión con su servidor de base de datos.
                    </p>
                </div>  
    </div>
</asp:Content>