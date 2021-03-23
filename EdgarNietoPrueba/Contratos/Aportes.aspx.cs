using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace EdgarNietoPrueba.Contratos
{
    public partial class Aportes : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                if (!IsPostBack)
                {

                    if ((Request.QueryString["salario"] != null))
                    {
                        int Salario = Int32.Parse(Request.QueryString["salario"].Trim());
                        float salud_empleado = (float)Salario * 4 /100;
                        float salud_empleador = (float)(Salario * 12.5 / 100);
                        float pension_empleado = (float)Salario * 4 / 100;
                        float pension_empleador = (float)Salario * 4 / 100;

                        lb_salud_empelador.InnerText = "$ "+ salud_empleador;
                        lb_salud_trabajador.InnerText = "$ " + salud_empleado;
                        lb_pension_empelador.InnerText = "$ "+ pension_empleado;
                        lb_pension_trabajador.InnerText = "$ "+ pension_empleador;
                        lb_salario.InnerText = "$ " + Salario;
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
    }
}