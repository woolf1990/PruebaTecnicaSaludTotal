using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Administration.Broker
{
    public class BrkNomina
    {

        public bool insert(Nomina_Entity obj)
        {
            try
            {
                Conexion db = new Conexion();
                using (db.conexion())
                {
                    // String query = String.Format("INSERT INTO pruebatecnica.arl (valor, usuariocreacion, fechacreacion, habilitado) VALUES({0}, '{1}', now(), {3})"
                    String query = String.Format("" +
                        "INSERT INTO pruebatecnica.novedadesnomina (" +
                            "idcontrato, " +
                            "periodolaborado, " +
                            "horaslaboradas, " +
                            "horaextradiurna, " +
                            "horaextranocturna, " +
                            "horaextradominical, " +
                            "horaextrafestiva, " +
                            "descuentos, " +
                            "usuariocreacion, " +
                            "fechacreacion" +
                        ") VALUES(" +
                            "   {0}, " +
                            "'{1}', " +
                            "{2}, " +
                            "{3}, " +
                            "{4}, " +
                            "{5}, " +
                            "{6}, " +
                            "{7}, " +
                            "'{8}', " +
                            "now()" +
                        "); "
                        , obj.Idcontrato
                        , obj.Periodolaborado
                        , obj.Horaslaboradas
                        , obj.Horaextradiurna
                        , obj.Horaextranocturna
                        , obj.Horaextradominical
                        , obj.Horaextrafestiva
                        , obj.Descuentos
                        , obj.Usuariocreacion
                        );
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
