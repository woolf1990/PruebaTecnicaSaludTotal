using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Queries
{
    public class QuerySqlServer : IQueries
    {
        private class dict{
            String llave;
            String query;

            public dict(String llave, String query) {
                this.llave = llave;
                this.query = query;
            }

            public string Llave { get => llave; set => llave = value; }
            public string Query { get => query; set => query = value; }
        }

        List<dict> listaQueries = new List<dict>();
        List<dict> listaWhere = new List<dict>();

        public void setListas() {
            listaQueries.Add(new dict("arl_GetAll", "SELECT idarl, valor, usuariocreacion, CONVERT(VARCHAR(10), fechacreacion, 120) fechacreacion, habilitado FROM arl"));
            listaQueries.Add(new dict("arl_get", "SELECT idarl, valor, usuariocreacion, CONVERT(VARCHAR(10), fechacreacion, 120) fechacreacion, habilitado FROM arl {0}"));

            listaWhere.Add(new dict("idarl", " and idarl = {0} "));
            listaWhere.Add(new dict("usuariocreacion", " and usuariocreacion like '%{0}%' "));
            listaWhere.Add(new dict("fechacreacion_inicial", " and  CONVERT(DATE, fechacreacion, 23) >= CONVERT(DATE, '{0}', 23) "));
            listaWhere.Add(new dict("fechacreacion_final", " and  CONVERT(DATE, fechacreacion, 23) <= CONVERT(DATE, '{0}', 23) "));
            listaWhere.Add(new dict("valor_mayor_igual", " and  valor >= {0} "));
            listaWhere.Add(new dict("valor_mayor_igual", " and  valor <= {0} "));
            listaWhere.Add(new dict("habilitado", " and  habilitado = CASE WHEN '{0}' = 'True' THEN 1 ELSE 0 END "));

            listaQueries.Add(new dict("arl_insert", "INSERT INTO arl (valor, usuariocreacion, fechacreacion, habilitado) VALUES ({0}, '{1}', CONVERT(DATE, '{2}', 23), CASE WHEN '{3}' = 'True' THEN 1 ELSE 0 END )"));
            listaQueries.Add(new dict("arl_update", "UPDATE arl SET valor={1}, usuariocreacion='{2}', fechacreacion = CONVERT(DATE, '{3}', 23), habilitado= CASE WHEN '{4}' = 'True' THEN 1 ELSE 0 END  WHERE idarl= {0}"));
        }

        public String getQuery(String llave) {
            int index = listaQueries.FindIndex(x => x.Llave.Equals(llave));
            if (index > -1)
            {
                return listaQueries[index].Query;
            }
            else {
                return "";
            }
        }

        public String getWhere(String llave)
        {
            int index = listaWhere.FindIndex(x => x.Llave.Equals(llave));
            if (index > -1)
            {
                return listaWhere[index].Query;
            }
            else
            {
                return "";
            }
        }
    }
}
