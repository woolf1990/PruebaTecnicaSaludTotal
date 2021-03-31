using Entity;
using Facade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EdgarNietoPrueba.Requerimientos
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
            T005_Requerimiento_Filtro objFiltros = new T005_Requerimiento_Filtro();

            #region Filtros
            if (f005_id.Text.Trim().Length > 0)
            {
                objFiltros.ValF005_id = true;
                objFiltros.F005_id = Int32.Parse(f005_id.Text);
            }

            if (f005_area.SelectedValue != "")
            {
                objFiltros.ValFf005_area = true;
                objFiltros.F005_area = Int32.Parse(f005_area.SelectedValue);
            }

            if (f005_aplicativo.SelectedValue != "")
            {
                objFiltros.ValFf005_aplicativo = true;
                objFiltros.F005_aplicativo = Int32.Parse(f005_aplicativo.SelectedValue);
            }

            if (f005_ingeniero.SelectedValue != "")
            {
                objFiltros.ValFf005_ingeniero = true;
                objFiltros.F005_ingeniero = Int32.Parse(f005_ingeniero.SelectedValue);
            }

            if (f005_prioridad.SelectedValue != "")
            {
                objFiltros.ValFf005_prioridad = true;
                objFiltros.F005_prioridad = Int32.Parse(f005_prioridad.SelectedValue);
            }

            #endregion

            gvMenus.DataSource = fcdAdministration.f005_requerimiento_Get(objFiltros);
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

        public void LlenarListas()
        {
            FcdAdministration fcdAdministration = new FcdAdministration();

            f005_area.DataSource = fcdAdministration.f001_area_Get();
            f005_area.DataTextField = "f001_descripcion";
            f005_area.DataValueField = "f001_id";
            f005_area.DataBind();

            f005_area.Items.Add(new ListItem("----Seleccione una opción----", ""));
            f005_area.SelectedValue = "";

            f005_aplicativo.DataSource = fcdAdministration.f002_aplicacion_Get();
            f005_aplicativo.DataTextField = "f002_descripcion";
            f005_aplicativo.DataValueField = "f002_id";
            f005_aplicativo.DataBind();

            f005_aplicativo.Items.Add(new ListItem("----Seleccione una opción----", ""));
            f005_aplicativo.SelectedValue = "";

            f005_ingeniero.DataSource = fcdAdministration.f003_empleado_Get();
            f005_ingeniero.DataTextField = "f003_fullname";
            f005_ingeniero.DataValueField = "f003_id";
            f005_ingeniero.DataBind();

            f005_ingeniero.Items.Add(new ListItem("----Seleccione una opción----", ""));
            f005_ingeniero.SelectedValue = "";

            f005_prioridad.DataSource = fcdAdministration.f004_prioridad_Get();
            f005_prioridad.DataTextField = "f004_descripcion";
            f005_prioridad.DataValueField = "f004_id";
            f005_prioridad.DataBind();

            f005_prioridad.Items.Add(new ListItem("----Seleccione una opción----", ""));
            f005_prioridad.SelectedValue = "";
        }
    }
}