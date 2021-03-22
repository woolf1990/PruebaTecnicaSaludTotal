using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

namespace EdgarNietoPrueba.MasterPages
{
    public partial class SiteModules : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            ScriptManager.RegisterStartupScript(this, this.GetType(), "IsPostBack", "var isPostBack = false;", true);
            if (IsPostBack)
            {
                // NOTE: the following uses an overload of RegisterClientScriptBlock() 
                // that will surround our string with the needed script tags 
                //ClientScript.RegisterClientScriptBlock(GetType(), "IsPostBack", "var isPostBack = true;", true);
                ScriptManager.RegisterStartupScript(this, this.GetType(), "IsPostBack", "var isPostBack = true;", true);
            }
            //Crear colores por Version
            System.Configuration.Configuration rootWebConfig1 = System.Web.Configuration.WebConfigurationManager.OpenWebConfiguration("~/");

                Page.Header.DataBind();
                HtmlLink link = new HtmlLink();
                link.Attributes.Add("rel", "stylesheet");
                link.Attributes.Add("type", "text/css");
                //link.Href = ResolveUrl("~/assets/css/theme_dark.css");
                link.Href = ResolveUrl("~/assets/css/theme_light.css");
                link.Attributes.Add("media", "screen, projection");
                this.Page.Header.Controls.Add(link);
                Lbl_ImagenSabueso.Text = "<img class='img-responsive' src='" + ResolveClientUrl("~/Img/LogoSabueso_2.png") + "'/>";

        }
    }
}