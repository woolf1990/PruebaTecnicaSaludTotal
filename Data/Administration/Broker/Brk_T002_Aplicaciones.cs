using Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Administration.Broker
{
    public class Brk_T002_Aplicaciones
    {

        public List<T002_Aplicativo> get()
        {
            List<T002_Aplicativo> list = new List<T002_Aplicativo>();
            try
            {
                IDataReader data;
                Conexion conexion = new Conexion();
                var db = conexion.ClaseConexion();
                using (db.conexion())
                {
                    List<SqlParameter> listprms = new List<SqlParameter>();
                    listprms.Add(new SqlParameter("@f002_id", -1));
                    listprms.Add(new SqlParameter("@f002_descripcion", ""));
                    using (IDbCommand comando = db.executeStoredProcedure("stp_aplicativo_get", listprms))
                    {                  
                        data = comando.ExecuteReader();

                        while (data.Read())
                        {
                            T002_Aplicativo obj = new T002_Aplicativo();
                            obj.F002_id = (data["f002_id"] != DBNull.Value) ? Int32.Parse(data["f002_id"].ToString()) : 0;
                            obj.F002_descripcion = (data["f002_descripcion"] != DBNull.Value) ? data["f002_descripcion"].ToString() : string.Empty;
                            obj.F002_alive = Convert.ToInt32((data["f002_alive"] != DBNull.Value) ? Boolean.Parse(data["f002_alive"].ToString()) : false );

                            list.Add(obj);
                        }
                        data.Close();
                    }
                    db.desconectar();
                }
            }
            catch (Exception ex)
            {
                String error = ex.ToString();
                throw;
            }
            return list;
        }

    }
}
