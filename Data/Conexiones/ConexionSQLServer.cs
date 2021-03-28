using Data.Conexiones;
using Microsoft.SqlServer;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class ConexionSQLServer : IConexion
    {
        private string connection = ConfigurationManager.ConnectionStrings["SqlServer"].ConnectionString;

        private static SqlConnection connect;
        private static IDbCommand comando;
        public static IDataReader reader;
        public static IDbTransaction transaccion;
        public static IDataRecord update;

        public IDbConnection conexion()//con este metodo se abre la conexion
        {
            connect = new SqlConnection(connection);
            connect.Open();
            return connect;
        }

        public IDbCommand executeQuery(string sql)/// este metodo recibe la cadena con la sentencia
        {
            try
            {
                comando = connect.CreateCommand();
                comando.CommandText = sql;
            }
            catch (Exception ex)
            {
            }
            finally {
            }
            return comando;
        }

        public void insertQuery(String sql)// este metodo recibe la cadena con la sentencia
        {
            comando = connect.CreateCommand();
            comando.Transaction = transaccion;
            comando.CommandText = sql;
            comando.ExecuteScalar();
        }

        public void desconectar()//este metodo cierra la conexion del query
        {
            // reader.Close();
            comando.Dispose();
            connect.Close();
        }

        public void desconectarinsert()// este metodo cierra la conexion del insert y update
        {
            comando.Dispose();
            connect.Close();
        }
    }
}
