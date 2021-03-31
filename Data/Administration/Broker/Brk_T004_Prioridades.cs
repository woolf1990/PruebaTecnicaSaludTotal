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
    public class  Brk_T004_Prioridad
    {

        public List<T004_Prioridad> get()
        {
            List<T004_Prioridad> list = new List<T004_Prioridad>();
            try
            {
                IDataReader data;
                Conexion conexion = new Conexion();
                var db = conexion.ClaseConexion();
                using (db.conexion())
                {
                    List<SqlParameter> listprms = new List<SqlParameter>();
                    listprms.Add(new SqlParameter("@f004_id", -1));
                    listprms.Add(new SqlParameter("@f004_descripcion", ""));
                    using (IDbCommand comando = db.executeStoredProcedure("stp_prioridad_get", listprms))
                    {                  
                        data = comando.ExecuteReader();

                        while (data.Read())
                        {
                            T004_Prioridad obj = new T004_Prioridad();
                            obj.F004_id = (data["f004_id"] != DBNull.Value) ? Int32.Parse(data["f004_id"].ToString()) : 0;
                            obj.F004_descripcion = (data["f004_descripcion"] != DBNull.Value) ? data["f004_descripcion"].ToString() : string.Empty;
                            obj.F004_alive = Convert.ToInt32((data["f004_alive"] != DBNull.Value) ? Boolean.Parse(data["f004_alive"].ToString()) : false );

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
