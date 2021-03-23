using Entity;
using Facade;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EdgarNietoPrueba.Nomina
{
    public partial class Create : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!IsPostBack)
                {
                    idcontrato.Enabled = false;
                    FcdAdministration fcdAdministration = new FcdAdministration();
                    string AccionUser = "";
                    
                    //Traigo las variables de la url para dejar activo el menu
                    if ((Request.QueryString["action"] != null))
                    {
                        AccionUser = Request.QueryString["action"];
                    }
                    if ((Request.QueryString["AppID"] != null))
                    {
                        idcontrato.Text = Request.QueryString["AppID"].Trim();
                    }
                    if (AccionUser.Equals("create") && idcontrato.Text.Trim().Length > 0)
                    {
                        CreateReg.Visible = true;
                    }
                    else
                    {
                        Response.Redirect("~/Contratos/Index");
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

        /// <summary>
        /// Cancela la creacion del usuario
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Cancel(object sender, EventArgs e)
        {
            Response.Redirect("~/Contratos/Index");
        }

        protected void Create_Click(object sender, EventArgs e)
        {
            try
            {
                if (Page.IsValid)
                {
                    Nomina_Entity obj = new Nomina_Entity();
                    obj.Idcontrato = Int32.Parse(idcontrato.Text);
                    obj.Periodolaborado = periodo.Text;
                    obj.Horaslaboradas = Int32.Parse(horaslaboradas.Text);
                    obj.Horaextradiurna = Int32.Parse(horaextradiurna.Text);
                    obj.Horaextradominical = Int32.Parse(horaextradominical.Text);
                    obj.Horaextranocturna = Int32.Parse(horaextranocturna.Text);
                    obj.Horaextrafestiva= Int32.Parse(horaextrafestiva.Text);
                    obj.Descuentos = Int32.Parse(descuentos.Text);

                    FcdAdministration fcdAdministration = new FcdAdministration();
                    bool res = fcdAdministration.nominaInsert(obj);
                    if (true)
                    {
                        var FailureText = "Grabación Exitosa";
                        Response.Redirect("~/Contratos/Index?FailureText=" + FailureText + "");
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
    }
}