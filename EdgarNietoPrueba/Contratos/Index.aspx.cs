using Entity;
using Facade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EdgarNietoPrueba.Contratos
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
            Contratos_Filtro objFiltros = new Contratos_Filtro();

            #region Filtros
            if (numerodocumento.Text.Trim().Length > 0)
            {
                objFiltros.ValNumeroDocumento = true;
                objFiltros.NumeroDcoumento = Int32.Parse(numerodocumento.Text.Trim());
            }
            #endregion

            gvMenus.DataSource = fcdAdministration.contratosGet(objFiltros);
            gvMenus.DataBind();
        }


        protected void Buscar(object sender, EventArgs e)
        {
            cargarView();
        }

        /// <summary>
        /// Me devuelve el valor de la variable a la que hago refencia, esto si la encuentra en la URL
        /// </summary>
        private string TraeGetURL(string valor)
        {
            return "";
        }

        /// <summary>
        /// Carga la pagina segun la paginacion indicada
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void gvMenus_PageIndexChanging(object sender, GridViewPageEventArgs e)
        {
            gvMenus.PageIndex = e.NewPageIndex;
            cargarView();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Cancelar(object sender, EventArgs e)
        {
            Response.Redirect("Index");
        }

        protected void gvMenus_RowEditing(object sender, GridViewEditEventArgs e)
        {
            Response.Redirect("~/Nomina/Create?AppID=" + gvMenus.Rows[e.NewEditIndex].Cells[0].Text + "&action=create");            
        }


        protected void gvMenus_RowCommand(object sender, GridViewCommandEventArgs e)
        {
            int index = 0;

            switch (e.CommandName)
            {
                case "Aportes":
                    index = Convert.ToInt32(e.CommandArgument);
                    Response.Redirect("Aportes?AppID=" + gvMenus.Rows[index].Cells[0].Text + "&salario=" + gvMenus.Rows[index].Cells[12].Text);
                    break;  
            }
        }
    }
}