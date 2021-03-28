using Data.Conexiones;
using Data.Queries;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data
{
    public class Conexion
    {
        public IConexion ClaseConexion() {
            String motor = ConfigurationManager.AppSettings["motor"].ToString();
            IConexion obj = new ConexionSQLServer();

            switch (motor)
            {
                case "SqlServer":
                    obj = new ConexionSQLServer();
                    break;
                case "PostgreSql":
                    obj = new ConexionPostgreSql();
                    break;
                default:
                    obj = new ConexionSQLServer();
                    break;
            }

            return obj;
        }

        public IQueries ClaseQueries() {
            String motor = ConfigurationManager.AppSettings["motor"].ToString();
            IQueries obj = new QuerySqlServer();

            switch (motor)
            {
                case "SqlServer":
                    obj = new QuerySqlServer();
                    break;
                case "PostgreSql":
                    obj = new QueryPostgresSql();
                    break;
                default:
                    obj = new QuerySqlServer();
                    break;
            }

            return obj;
        }
    }
}
