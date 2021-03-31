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
    public class  Brk_T001_Area
    {

        public List<T001_Area> get()
        {
            List<T001_Area> list = new List<T001_Area>();
            try
            {
                IDataReader data;
                Conexion conexion = new Conexion();
                var db = conexion.ClaseConexion();
                using (db.conexion())
                {
                    List<SqlParameter> listprms = new List<SqlParameter>();
                    listprms.Add(new SqlParameter("@f001_id", -1));
                    listprms.Add(new SqlParameter("@f001_descripcion", ""));
                    using (IDbCommand comando = db.executeStoredProcedure("stp_area_get", listprms))
                    {                  
                        data = comando.ExecuteReader();

                        while (data.Read())
                        {
                            T001_Area obj = new T001_Area();
                            obj.F001_id = (data["f001_id"] != DBNull.Value) ? Int32.Parse(data["f001_id"].ToString()) : 0;
                            obj.F001_descripcion = (data["f001_descripcion"] != DBNull.Value) ? data["f001_descripcion"].ToString() : string.Empty;
                            obj.F001_alive = Convert.ToInt32((data["f001_alive"] != DBNull.Value) ? Boolean.Parse(data["f001_alive"].ToString()) : false );

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
