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
    public partial class Create : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!IsPostBack)
                {
                    LlenarListas();
                    id.Enabled = false;
                    FcdAdministration fcdAdministration = new FcdAdministration();
                    string AccionUser = "";

                    if ((Request.QueryString["action"] != null))
                    {
                        AccionUser = Request.QueryString["action"];
                    }
                    if (AccionUser.Equals("create"))
                    {
                        div_id.Visible = false;
                        CreateReg.Visible = true;
                        UpdateReg.Visible = false;
                    }
                    else if (AccionUser.Equals("update"))
                    {
                        UpdateReg.Visible = true;
                        CreateReg.Visible = false;

                        T005_Requerimiento_Filtro filtro = new T005_Requerimiento_Filtro();
                        filtro.F005_id = Int32.Parse(Request.QueryString["AppID"].Trim());
                        filtro.ValF005_id = true;

                        List<T005_Requerimiento> list = new List<T005_Requerimiento>();
                        list = fcdAdministration.f005_requerimiento_Get(filtro);

                        if (list.Count() > 0)
                        {
                            id.Text = list[0].F005_id.ToString();
                            f005_area.SelectedValue = list[0].F005_area.F001_id.ToString();
                            f005_aplicativo.SelectedValue = list[0].F005_aplicativo.F002_id.ToString();
                            f005_ingeniero.SelectedValue = list[0].F005_ingeniero.F003_id.ToString();
                            f005_prioridad.SelectedValue = list[0].F005_prioridad.F004_id.ToString();
                            f005_alcance.Text = list[0].F005_alcance;
                            f005_dias_desarrollo.Text = list[0].F005_dias_desarrollo.ToString();
                            TxtFechaInicial.Text = list[0].F005_fecha_solicitud;
                            TxtFechaFinal.Text = list[0].F005_fecha_desarrollo;
                        }
                        else
                        {
                            var FailureText = "Registro no encontrado";
                            Response.Redirect("Index?FailureText=" + FailureText + "");
                        }
                    }
                    else
                    {
                        Response.Redirect("Index");
                    }
                }
            }
            catch (Exception es)
            {
                FailureText.Text = es.ToString();
                ErrorMessage.Visible = true;
                ScriptManager.RegisterStartupScript(this, this.GetType(), "Pop", "CheckearControl();", true);
            }
        }

        protected void Cancel(object sender, EventArgs e)
        {
            Response.Redirect("Index");
        }

        protected void Create_Click(object sender, EventArgs e)
        {
            try
            {
                if (Page.IsValid)
                {
                    T005_Requerimiento obj = new T005_Requerimiento();
                    obj.F005_area = new T001_Area();
                    obj.F005_area.F001_id = Int32.Parse(f005_area.SelectedValue.ToString());
                    obj.F005_aplicativo = new T002_Aplicativo();
                    obj.F005_aplicativo.F002_id = Int32.Parse(f005_aplicativo.SelectedValue.ToString());
                    obj.F005_ingeniero = new T003_Empleado();
                    obj.F005_ingeniero.F003_id = Int32.Parse(f005_ingeniero.SelectedValue.ToString());
                    obj.F005_prioridad = new T004_Prioridad();
                    obj.F005_prioridad.F004_id = Int32.Parse(f005_prioridad.SelectedValue.ToString());
                    obj.F005_alcance = f005_alcance.Text;
                    obj.F005_dias_desarrollo = Int32.Parse(f005_dias_desarrollo.Text);
                    obj.F005_fecha_solicitud = TxtFechaInicial.Text;
                    obj.F005_fecha_desarrollo = TxtFechaFinal.Text;
                    if (habilitado.Checked)
                    {
                        obj.F005_alive = 1;
                    }
                    else {
                        obj.F005_alive = 0;
                    }

                    FcdAdministration fcdAdministration = new FcdAdministration();
                    bool res = fcdAdministration.f005_requerimiento_insert(obj);
                    if (res)
                    {
                        var FailureText = "Grabación Exitosa";
                        Response.Redirect("Index?FailureText=" + FailureText + "");
                    }
                    else
                    {
                        FailureText.Text = "Ocurrió un problema mientras se grababan los datos, por favor intente nuevamente.";
                        ErrorMessage.Visible = true;
                        ScriptManager.RegisterStartupScript(this, this.GetType(), "Pop", "CheckearControl();", true);
                    }
                }
                else
                {
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "Pop", "CheckearControl();", true);
                }
            }
            catch (Exception es)
            {
                FailureText.Text = es.ToString();
                ErrorMessage.Visible = true;
                ScriptManager.RegisterStartupScript(this, this.GetType(), "Pop", "CheckearControl();", true);
            }
        }

        protected void Update_Click(object sender, EventArgs e)
        {
            try
            {
                T005_Requerimiento obj = new T005_Requerimiento();
                obj.F005_area = new T001_Area();
                obj.F005_id = Int32.Parse(id.Text);
                obj.F005_area.F001_id = Int32.Parse(f005_area.SelectedValue.ToString());
                obj.F005_aplicativo = new T002_Aplicativo();
                obj.F005_aplicativo.F002_id = Int32.Parse(f005_aplicativo.SelectedValue.ToString());
                obj.F005_ingeniero = new T003_Empleado();
                obj.F005_ingeniero.F003_id = Int32.Parse(f005_ingeniero.SelectedValue.ToString());
                obj.F005_prioridad = new T004_Prioridad();
                obj.F005_prioridad.F004_id = Int32.Parse(f005_prioridad.SelectedValue.ToString());
                obj.F005_alcance = f005_alcance.Text;
                obj.F005_dias_desarrollo = Int32.Parse(f005_dias_desarrollo.Text);
                obj.F005_fecha_solicitud = TxtFechaInicial.Text;
                obj.F005_fecha_desarrollo = TxtFechaFinal.Text;
                if (habilitado.Checked)
                {
                    obj.F005_alive = 1;
                }
                else
                {
                    obj.F005_alive = 0;
                }

                FcdAdministration fcdAdministration = new FcdAdministration();
                bool res = fcdAdministration.f005_requerimiento_insert(obj);
                if (res)
                {
                    var FailureText = "Grabación Exitosa";
                    Response.Redirect("Index?FailureText=" + FailureText + "");
                }
                else
                {
                    FailureText.Text = "Ocurrió un problema mientras se grababan los datos, por favor intente nuevamente.";
                    ErrorMessage.Visible = true;
                    ScriptManager.RegisterStartupScript(this, this.GetType(), "Pop", "CheckearControl();", true);
                }
            }
            catch (Exception es)
            {
                FailureText.Text = es.ToString();
                ErrorMessage.Visible = true;
                ScriptManager.RegisterStartupScript(this, this.GetType(), "Pop", "CheckearControl();", true);
            }
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