using Data.Conexiones;
using Npgsql;
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
    public class ConexionPostgreSql : IConexion
    {
        private string connection = ConfigurationManager.ConnectionStrings["PostgreSql"].ConnectionString;

        private static IDbConnection connect;
        private static IDbCommand comando;
        public static IDataReader reader;
        public static IDbTransaction transaccion;
        public static IDataRecord update;

        public IDbConnection conexion()//con este metodo se abre la conexion
        {
            connect = new NpgsqlConnection(connection);
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

        public void updateQuery(String sql)// este metodo recibe la cadena con la sentencia
        {
            NpgsqlConnection conn = new NpgsqlConnection(connection);
            conn.Open();
            NpgsqlCommand comando = new NpgsqlCommand(sql, conn);

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

        public IDbCommand executeStoredProcedure(string stored, List<SqlParameter> list_prms)
        {
            throw new NotImplementedException();
        }
    }
}
