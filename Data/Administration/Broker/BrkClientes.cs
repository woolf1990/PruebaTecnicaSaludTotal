using System.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Microsoft.Practices.EnterpriseLibrary.Data;
using System.Data.Common;
using Entity;

namespace Data.Administration.Broker
{
    public class BrkClientes
    {
        /// <summary>
        /// t016_EstadoFisico con filtro
        /// </summary>
        /// <param name="t005_1_ean14"></param>
        /// <returns></returns>
        internal IDataReader stp_getall()
        {
            /*try
            {
                IDataReader data;
                Conexion db = new Conexion();

                using (IDbConnection connect = db.conexion()) {
                    connect.Open();
                    using (IDbCommand comando = db.executeQuery("SELECT * FROM pruebatecnica.arl", connect))
                    {
                        data = comando.ExecuteReader();
                        return data;
                    }
                }
                
            }
            catch (Exception ex)
            {
                String error = ex.ToString();
                throw;
            }*/
            return null;
        }
    }
}
