using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Queries
{
    public class QueryPostgresSql : IQueries
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
            listaQueries.Add(new dict("arl_GetAll", "SELECT idarl, valor, usuariocreacion, to_char(fechacreacion, 'YYYY-MM-DD') fechacreacion, habilitado FROM pruebatecnica.arl"));
            listaQueries.Add(new dict("arl_get", "SELECT idarl, valor, usuariocreacion, to_char(fechacreacion, 'YYYY-MM-DD') fechacreacion, habilitado FROM pruebatecnica.arl {0}"));

            listaWhere.Add(new dict("idarl", " and idarl = {0} "));
            listaWhere.Add(new dict("usuariocreacion", " and usuariocreacion like '%{0}%' "));
            listaWhere.Add(new dict("fechacreacion_inicial", " and  TO_DATE(to_char(fechacreacion, 'YYYY-MM-DD'), 'YYYY-MM-DD') >= TO_DATE('{0}', 'YYYY-MM-DD') "));
            listaWhere.Add(new dict("fechacreacion_final", " and  TO_DATE(to_char(fechacreacion, 'YYYY-MM-DD'), 'YYYY-MM-DD') <= TO_DATE('{0}', 'YYYY-MM-DD') "));
            listaWhere.Add(new dict("valor_mayor_igual", " and  valor >= {0} "));
            listaWhere.Add(new dict("valor_mayor_igual", " and  valor <= {0} "));
            listaWhere.Add(new dict("habilitado", " and  habilitado = {0} "));

            listaQueries.Add(new dict("arl_insert", "INSERT INTO pruebatecnica.arl (valor, usuariocreacion, fechacreacion, habilitado) VALUES ({0}, '{1}', TO_DATE('{2}', 'YYYY-MM-DD'), {3})"));
            listaQueries.Add(new dict("arl_update", "UPDATE pruebatecnica.arl SET valor={1}, usuariocreacion='{2}', fechacreacion=TO_DATE('{3}', 'YYYY-MM-DD'), habilitado={4} WHERE idarl= {0}"));
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
