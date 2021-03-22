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
        /// <summary>
        /// Arl
        /// </summary>
        /// <returns></returns>
        public List<Arl_Entity> getAll()
        {
            List<Arl_Entity> list = new List<Arl_Entity>();
            try
            {
                IDataReader data;
                Conexion db = new Conexion();
                using (db.conexion())
                {
                    using (IDbCommand comando = db.executeQuery("SELECT idarl, valor, usuariocreacion, to_char(fechacreacion, 'YYYY-MM-DD') fechacreacion, habilitado FROM pruebatecnica.arl"))
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


        /// <summary>
        /// Arl
        /// </summary>
        /// <returns></returns>
        public List<Arl_Entity> get(Arl_Filtro filtro)
        {
            List<Arl_Entity> list = new List<Arl_Entity>();
            try
            {
                String where = " where 1=1 ";
                #region Filtros
                if (filtro.ValIdarl == true)
                {
                    where += String.Format(" and idarl = {0} ", filtro.Idarl);
                }

                if (filtro.ValUsuariocreacion == true) {
                    where += String.Format(" and usuariocreacion like '%{0}%' ", filtro.Usuariocreacion);
                }

                if (filtro.ValFechacreacionInicial == true)
                {
                    where += String.Format(" and  TO_DATE(to_char(fechacreacion, 'YYYY-MM-DD'), 'YYYY-MM-DD') >= TO_DATE('{0}', 'YYYY-MM-DD') ", filtro.FechacreacionInicial);
                }

                if (filtro.ValFechacreacionFinal == true)
                {
                    where += String.Format(" and  TO_DATE(to_char(fechacreacion, 'YYYY-MM-DD'), 'YYYY-MM-DD') <= TO_DATE('{0}', 'YYYY-MM-DD') ", filtro.FechacreacionFinal);
                }

                if (filtro.ValValor_mayor_igual == true)
                {
                    where += String.Format(" and  valor >= {0} ", filtro.Valor_mayor_igual);
                }

                if (filtro.ValValor_menor_igual == true)
                {
                    where += String.Format(" and  valor <= {0} ", filtro.Valor_menor_igual);
                }

                if (filtro.Valhabilitado == true)
                {
                    where += String.Format(" and  habilitado = {0} ", filtro.Habilitado);
                }
                #endregion
                IDataReader data;
                Conexion db = new Conexion();
                using (db.conexion())
                {
                    String query = String.Format("SELECT idarl, valor, usuariocreacion, to_char(fechacreacion, 'YYYY-MM-DD') fechacreacion, habilitado FROM pruebatecnica.arl {0}", where);
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
                Conexion db = new Conexion();
                using (db.conexion())
                {
                    // String query = String.Format("INSERT INTO pruebatecnica.arl (valor, usuariocreacion, fechacreacion, habilitado) VALUES({0}, '{1}', now(), {3})"
                    String query = String.Format("INSERT INTO pruebatecnica.arl (valor, usuariocreacion, fechacreacion, habilitado) VALUES ({0}, '{1}', TO_DATE('{2}', 'YYYY-MM-DD'), {3})"
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
                Conexion db = new Conexion();
                using (db.conexion())
                {
                    // String query = String.Format("INSERT INTO pruebatecnica.arl (valor, usuariocreacion, fechacreacion, habilitado) VALUES({0}, '{1}', now(), {3})"
                    String query = String.Format("UPDATE pruebatecnica.arl SET valor={1}, usuariocreacion='{2}', fechacreacion=TO_DATE('{3}', 'YYYY-MM-DD'), habilitado={4} WHERE idarl= {0}"
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
