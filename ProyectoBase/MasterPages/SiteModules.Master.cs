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
           
            Page.Header.DataBind();
            HtmlLink link = new HtmlLink();
            link.Attributes.Add("rel", "stylesheet");
            link.Attributes.Add("type", "text/css");
            link.Href = ResolveUrl("~/assets/css/theme_light.css");
            link.Attributes.Add("media", "screen, projection");
            this.Page.Header.Controls.Add(link);
        }
    }
}