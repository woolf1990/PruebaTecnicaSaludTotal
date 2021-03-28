using Entity;
using Facade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EdgarNietoPrueba.Arl
{
    public partial class Index : System.Web.UI.Page
    {
        public string Titulo = "";
        protected void Page_Load(object sender, EventArgs e)
        {
            
            try
            {
                if (!IsPostBack)
                {
                    LlenarListas();
                    cargarView();
                }
            }
            catch (Exception es)
            {
                FailureText.Text = es.ToString();
                ErrorMessage.Visible = true;
            }
        }


        private void cargarView()
        {
            FcdAdministration fcdAdministration = new FcdAdministration();
            Arl_Filtro objFiltros = new Arl_Filtro();

            #region Filtros
            if (usuario.Text.Trim().Length>0) {
                objFiltros.ValUsuariocreacion = true;
                objFiltros.Usuariocreacion = usuario.Text;
            }

            if (ddlHabilitado.SelectedValue != "")
            {
                objFiltros.Valhabilitado = true;
                if (ddlHabilitado.SelectedValue == "1") {
                    objFiltros.Habilitado = true;
                }
                else {
                    objFiltros.Habilitado = false;
                }
            }

            if (valor_inicial.Text.Trim().Length > 0)
            {
                objFiltros.ValValor_mayor_igual = true;
                objFiltros.Valor_mayor_igual = Int32.Parse(valor_inicial.Text);
            }

            if (valor_final.Text.Trim().Length > 0)
            {
                objFiltros.ValValor_menor_igual = true;
                objFiltros.Valor_menor_igual = Int32.Parse(valor_final.Text);
            }

            if (TxtFechaInicial.Text.Trim().Length > 0)
            {
                objFiltros.ValFechacreacionInicial = true;
                objFiltros.FechacreacionInicial = TxtFechaInicial.Text;
            }

            if (TxtFechaFinal.Text.Trim().Length > 0)
            {
                objFiltros.ValFechacreacionFinal = true;
                objFiltros.FechacreacionFinal = TxtFechaFinal.Text;
            }
            #endregion

            gvMenus.DataSource = fcdAdministration.arlGet(objFiltros);
            gvMenus.DataBind();
        }

        protected void Buscar(object sender, EventArgs e)
        {
            cargarView();
        }
        
        private string TraeGetURL(string valor)
        {
            return "";
        }
       
        protected void gvMenus_RowEditing(object sender, GridViewEditEventArgs e)
        {
            Response.Redirect("Create?AppID=" + gvMenus.Rows[e.NewEditIndex].Cells[0].Text + "&action=update");
        }
       
        protected void gvMenus_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            gvMenus.PageIndex = e.NewPageIndex;
            cargarView();
        }
        
        protected void Cancelar(object sender, EventArgs e)
        {
            Response.Redirect("Index");
        }

        public void LlenarListas() {
            ddlHabilitado.Items.Add(new ListItem("----Seleccione una opción----", ""));
            ddlHabilitado.Items.Add(new ListItem("Habilitado", "1"));
            ddlHabilitado.Items.Add(new ListItem("No habilitado", "0"));
            ddlHabilitado.SelectedValue = "";
        }
    }
}