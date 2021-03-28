using Data.Queries;
using Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Administration.Broker
{
    
    public class BrkArl
    {
        public List<Arl_Entity> getAll()
        {
            List<Arl_Entity> list = new List<Arl_Entity>();
            try
            {
                IDataReader data;
                Conexion conexion = new Conexion();
                var db = conexion.ClaseConexion();
                using (db.conexion())
                {
                    IQueries objQueries = conexion.ClaseQueries();
                    using (IDbCommand comando = db.executeQuery(objQueries.getQuery("getAll")))
                    {
                        data = comando.ExecuteReader();

                        while (data.Read())
                        {
                            Arl_Entity obj = new Arl_Entity();
                            obj.Idarl = (data["idarl"] != DBNull.Value) ? Int32.Parse(data["idarl"].ToString()) : 0;
                            obj.Valor = (int)((data["valor"] != DBNull.Value) ? float.Parse(data["valor"].ToString()) : 0);
                            obj.Usuariocreacion = (data["usuariocreacion"] != DBNull.Value) ? data["usuariocreacion"].ToString() : string.Empty;
                            obj.Fechacreacion = (data["fechacreacion"] != DBNull.Value) ? data["fechacreacion"].ToString() : string.Empty;
                            obj.Habilitado = (data["habilitado"] != DBNull.Value) ? Boolean.Parse(data["habilitado"].ToString()) : false;

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

        public List<Arl_Entity> get(Arl_Filtro filtro)
        {
            List<Arl_Entity> list = new List<Arl_Entity>();
            try
            {
                Conexion conexion = new Conexion();
                IQueries objQueries = conexion.ClaseQueries();
                objQueries.setListas();

                String where = " where 1=1 ";
                #region Filtros
                if (filtro.ValIdarl == true)
                {
                    where += String.Format(objQueries.getWhere("idarl"), filtro.Idarl);
                }

                if (filtro.ValUsuariocreacion == true) {
                    where += String.Format(objQueries.getWhere("usuariocreacion"), filtro.Usuariocreacion);
                }

                if (filtro.ValFechacreacionInicial == true)
                {
                    where += String.Format(objQueries.getWhere("fechacreacion_inicial"), filtro.FechacreacionInicial);
                }

                if (filtro.ValFechacreacionFinal == true)
                {
                    where += String.Format(objQueries.getWhere("fechacreacion_final"), filtro.FechacreacionFinal);
                }

                if (filtro.ValValor_mayor_igual == true)
                {
                    where += String.Format(objQueries.getWhere("valor_mayor_igual"), filtro.Valor_mayor_igual);
                }

                if (filtro.ValValor_menor_igual == true)
                {
                    where += String.Format(objQueries.getWhere("valor_mayor_igual"), filtro.Valor_menor_igual);
                }

                if (filtro.Valhabilitado == true)
                {
                    where += String.Format(objQueries.getWhere("habilitado"), filtro.Habilitado);
                }
                #endregion
                IDataReader data;
                var db = conexion.ClaseConexion();
                using (db.conexion())
                {
                    String query = String.Format(objQueries.getQuery("arl_get"), where);
                    using (IDbCommand comando = db.executeQuery(query))
                    {
                        data = comando.ExecuteReader();

                        while (data.Read())
                        {
                            Arl_Entity obj = new Arl_Entity();
                            obj.Idarl = (data["idarl"] != DBNull.Value) ? Int32.Parse(data["idarl"].ToString()) : 0;
                            obj.Valor = (int)((data["valor"] != DBNull.Value) ? float.Parse(data["valor"].ToString()) : 0);
                            obj.Usuariocreacion = (data["usuariocreacion"] != DBNull.Value) ? data["usuariocreacion"].ToString() : string.Empty;
                            obj.Fechacreacion = (data["fechacreacion"] != DBNull.Value) ? data["fechacreacion"].ToString() : string.Empty;
                            obj.Habilitado = (data["habilitado"] != DBNull.Value) ? Boolean.Parse(data["habilitado"].ToString()) : false;

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

        public bool insert(Arl_Entity obj)
        {
            try
            {
                Conexion conexion = new Conexion();
                IQueries objQueries = conexion.ClaseQueries();
                objQueries.setListas();
                var db = conexion.ClaseConexion();
                using (db.conexion())
                {
                    String query = String.Format(objQueries.getQuery("arl_insert")
                        , obj.Valor
                        , obj.Usuariocreacion
                        , obj.Fechacreacion
                        , obj.Habilitado);
                    db.insertQuery(query);
                    db.desconectarinsert();
                }
                return true;
            }
            catch (Exception ex)
            {
                String error = ex.ToString();
                throw;
            }
            return false;
        }

        public bool update(Arl_Entity obj)
        {
            try
            {
                Conexion conexion = new Conexion();
                IQueries objQueries = conexion.ClaseQueries();
                objQueries.setListas();
                var db = conexion.ClaseConexion();
                using (db.conexion())
                {
                    String query = String.Format(objQueries.getQuery("arl_update")
                        , obj.Idarl
                        , obj.Valor
                        , obj.Usuariocreacion
                        , obj.Fechacreacion
                        , obj.Habilitado);
                    db.insertQuery(query);
                    db.desconectarinsert();
                }
                return true;
            }
            catch (Exception ex)
            {
                String error = ex.ToString();
                throw;
            }
            return false;
        }
    }
}
