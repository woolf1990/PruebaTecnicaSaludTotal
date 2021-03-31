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
    public class  Brk_T003_Empleados
    {

        public List<T003_Empleado> get()
        {
            List<T003_Empleado> list = new List<T003_Empleado>();
            try
            {
                IDataReader data;
                Conexion conexion = new Conexion();
                var db = conexion.ClaseConexion();
                using (db.conexion())
                {
                    List<SqlParameter> listprms = new List<SqlParameter>();
                    listprms.Add(new SqlParameter("@f003_id", -1));
                    listprms.Add(new SqlParameter("@f003_username", ""));
                    using (IDbCommand comando = db.executeStoredProcedure("stp_empleado_get", listprms))
                    {                  
                        data = comando.ExecuteReader();

                        while (data.Read())
                        {
                            T003_Empleado obj = new T003_Empleado();
                            obj.F003_id = (data["f003_id"] != DBNull.Value) ? Int32.Parse(data["f003_id"].ToString()) : 0;
                            obj.F003_nombre = (data["f003_nombre"] != DBNull.Value) ? data["f003_nombre"].ToString() : string.Empty;
                            obj.F003_apellido = (data["f003_apellido"] != DBNull.Value) ? data["f003_apellido"].ToString() : string.Empty;
                            obj.F003_alive = Convert.ToInt32((data["f003_alive"] != DBNull.Value) ? Boolean.Parse(data["f003_alive"].ToString()) : false );
                            obj.F003_fullname = (data["f003_fullname"] != DBNull.Value) ? data["f003_fullname"].ToString() : string.Empty;

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
