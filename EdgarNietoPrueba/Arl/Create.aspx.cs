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
    public partial class Create : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!IsPostBack)
                {
                    id.Enabled = false;
                    FcdAdministration fcdAdministration = new FcdAdministration();
                    string AccionUser = "";
                    //Traigo las variables de la url para dejar activo el menu
                    if ((Request.QueryString["action"] != null))
                    {
                        AccionUser = Request.QueryString["action"];
                    }
                    if (AccionUser.Equals("create"))
                    {
                        CreateReg.Visible = true;
                        UpdateReg.Visible = false;
                    }
                    else if (AccionUser.Equals("update"))
                    {
                        UpdateReg.Visible = true;
                        CreateReg.Visible = false;

                        Arl_Filtro filtro = new Arl_Filtro();
                        filtro.Idarl = Int32.Parse(Request.QueryString["AppID"].Trim());
                        filtro.ValIdarl = true;

                        List<Arl_Entity> list = new List<Arl_Entity>();
                        list = fcdAdministration.arlGet(filtro);

                        if (list.Count() > 0) {
                            id.Text = list[0].Idarl.ToString();
                            usuario.Text = list[0].Usuariocreacion.ToString();
                            TxtFechaInicial.Text = list[0].Fechacreacion.ToString();
                            habilitado.Checked= list[0].Habilitado;
                            valor.Text = list[0].Valor.ToString();
                        }
                        else {
                            var FailureText = "Registro no encontrado";
                            Response.Redirect("Index?FailureText=" + FailureText + "");
                        }
                    }
                    else {
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

        /// <summary>
        /// Cancela la creacion del usuario
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
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
                    Arl_Entity obj = new Arl_Entity();
                    obj.Idarl = -1;
                    obj.Usuariocreacion = usuario.Text.Trim();
                    obj.Valor = Int32.Parse(valor.Text.Trim());
                    obj.Habilitado = habilitado.Checked;
                    obj.Fechacreacion = TxtFechaInicial.Text;

                    FcdAdministration fcdAdministration = new FcdAdministration();
                    bool res = fcdAdministration.arlInsert(obj);
                    if (true)
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
                Arl_Entity obj = new Arl_Entity();
                obj.Idarl = Int32.Parse(id.Text);
                obj.Usuariocreacion = usuario.Text.Trim();
                obj.Valor = Int32.Parse(valor.Text.Trim());
                obj.Habilitado = habilitado.Checked;
                obj.Fechacreacion = TxtFechaInicial.Text;

                FcdAdministration fcdAdministration = new FcdAdministration();
                bool res = fcdAdministration.arlUpdate(obj);
                if (true)
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

    }
}