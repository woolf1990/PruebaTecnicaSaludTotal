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
    public class Brk_T005_Requerimientos
    {

        public List<T005_Requerimiento> get(T005_Requerimiento_Filtro filtros)
        {
            List<T005_Requerimiento> list = new List<T005_Requerimiento>();
            try
            {
                IDataReader data;
                Conexion conexion = new Conexion();
                var db = conexion.ClaseConexion();
                using (db.conexion())
                {
                    List<SqlParameter> listprms = new List<SqlParameter>();
                    
                    listprms.Add(new SqlParameter("@f005_id", filtros.ValF005_id ? filtros.F005_id : -1));
                    listprms.Add(new SqlParameter("@f005_area", filtros.ValFf005_area ? filtros.F005_area : -1));
                    listprms.Add(new SqlParameter("@f005_aplicativo", filtros.ValFf005_aplicativo ? filtros.F005_aplicativo : -1));
                    listprms.Add(new SqlParameter("@f005_ingeniero", filtros.ValFf005_ingeniero ? filtros.F005_ingeniero : -1));
                    listprms.Add(new SqlParameter("@f005_prioridad", filtros.ValFf005_prioridad ? filtros.F005_prioridad : -1));

                    using (IDbCommand comando = db.executeStoredProcedure("stp_requerimientos_get", listprms))
                    {                  
                        data = comando.ExecuteReader();

                        while (data.Read())
                        {
                            T005_Requerimiento obj = new T005_Requerimiento();
                            obj.F005_id = (data["f005_id"] != DBNull.Value) ? Int32.Parse(data["f005_id"].ToString()) : 0;
                            obj.F005_area = new T001_Area();
                            obj.F005_prioridad = new T004_Prioridad();
                            obj.F005_ingeniero = new T003_Empleado();
                            obj.F005_aplicativo = new T002_Aplicativo();

                            obj.F005_area.F001_id = (data["f005_area"] != DBNull.Value) ? Int32.Parse(data["f005_area"].ToString()) : 0;
                            obj.F005_area.F001_descripcion = (data["f001_descripcion"] != DBNull.Value) ? data["f001_descripcion"].ToString() : string.Empty;

                            obj.F005_aplicativo.F002_id = (data["f005_aplicativo"] != DBNull.Value) ? Int32.Parse(data["f005_aplicativo"].ToString()) : 0;
                            obj.F005_aplicativo.F002_descripcion = (data["f002_descripcion"] != DBNull.Value) ? data["f002_descripcion"].ToString() : string.Empty;

                            obj.F005_ingeniero.F003_id = (data["f005_ingeniero"] != DBNull.Value) ? Int32.Parse(data["f005_ingeniero"].ToString()) : 0;
                            obj.F005_ingeniero.F003_fullname = (data["f003_fullname"] != DBNull.Value) ? data["f003_fullname"].ToString() : string.Empty;
                            
                            obj.F005_prioridad.F004_id = (data["f005_prioridad"] != DBNull.Value) ? Int32.Parse(data["f005_prioridad"].ToString()) : 0;
                            obj.F005_prioridad.F004_descripcion = (data["f004_descripcion"] != DBNull.Value) ? data["f004_descripcion"].ToString() : string.Empty;

                            obj.F005_alcance = (data["F005_alcance"] != DBNull.Value) ? data["F005_alcance"].ToString() : string.Empty;
                            obj.F005_dias_desarrollo = (data["f005_dias_desarrollo"] != DBNull.Value) ? Int32.Parse(data["f005_dias_desarrollo"].ToString()) : 0;
                            obj.F005_fecha_solicitud = (data["f005_fecha_solicitud"] != DBNull.Value) ? data["f005_fecha_solicitud"].ToString() : string.Empty;
                            obj.F005_fecha_desarrollo = (data["f005_fecha_desarrollo"] != DBNull.Value) ? data["f005_fecha_desarrollo"].ToString() : string.Empty;
                            obj.F005_alive = Convert.ToInt32((data["f005_alive"] != DBNull.Value) ? Boolean.Parse(data["f005_alive"].ToString()) : false);
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

        public Boolean insert(T005_Requerimiento obj)
        {
            try
            {
                IDataReader data;
                Conexion conexion = new Conexion();
                var db = conexion.ClaseConexion();
                using (db.conexion())
                {
                    List<SqlParameter> listprms = new List<SqlParameter>();
                    listprms.Add(new SqlParameter("@f005_area", obj.F005_area.F001_id));
                    listprms.Add(new SqlParameter("@f005_aplicativo", obj.F005_aplicativo.F002_id));
                    listprms.Add(new SqlParameter("@f005_ingeniero", obj.F005_ingeniero.F003_id));
                    listprms.Add(new SqlParameter("@f005_prioridad", obj.F005_prioridad.F004_id));
                    listprms.Add(new SqlParameter("@f005_alcance", obj.F005_alcance));
                    listprms.Add(new SqlParameter("@f005_dias_desarrollo", obj.F005_dias_desarrollo));
                    listprms.Add(new SqlParameter("@f005_fecha_solicitud", obj.F005_fecha_solicitud));
                    listprms.Add(new SqlParameter("@f005_fecha_desarrollo", obj.F005_fecha_desarrollo));
                    using (IDbCommand comando = db.executeStoredProcedure("stp_requerimiento_insert", listprms))
                    {
                        data = comando.ExecuteReader();
                        data.Close();
                    }
                    db.desconectar();
                }
            }
            catch (Exception ex)
            {
                String error = ex.ToString();
                return false;
            }
            return true;
        }
    }
}
