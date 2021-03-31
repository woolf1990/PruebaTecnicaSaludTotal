using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Conexiones
{
    public interface IConexion
    {
        IDbConnection conexion();
        IDbCommand executeQuery(string sql);
        void insertQuery(String sql);
        void desconectar();
        void desconectarinsert();
        IDbCommand executeStoredProcedure(String stored, List<SqlParameter> list_prms);
    }
}
