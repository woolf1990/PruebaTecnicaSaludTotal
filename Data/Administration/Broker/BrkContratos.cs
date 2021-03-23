using Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Administration.Broker
{
    public class BrkContratos
    {

        /// <summary>
        /// Arl
        /// </summary>
        /// <returns></returns>
        public List<Contratos_Entity> get(Contratos_Filtro filtro)
        {
            List<Contratos_Entity> list = new List<Contratos_Entity>();
            try
            {
                String where = " where 1=1 ";
                #region Filtros

                if (filtro.ValNumeroDocumento == true)
                {
                    where += String.Format(" and numerodocumento = {0} ", filtro.NumeroDcoumento);
                }

                #endregion
                IDataReader data;
                Conexion db = new Conexion();
                using (db.conexion())
                {
                    String query = String.Format(
                            "select" +
                            "	idcontrato," +
                            "	pruebatecnica.estados.nombre nombre_estado," +
                            "	pruebatecnica.arl.nombre nombre_arl," +
                            "	pruebatecnica.cargos.nombre nombre_cargos," +
                            "	pruebatecnica.tipodocumento.nombre nombre_tipo_documentos," +
                            "	numerodocumento," +
                            "	primerapellido," +
                            "	segundoapellido," +
                            "	primernombre," +
                            "	segundonombre," +
                            "	to_char(fechainicio, 'YYYY-MM-DD') fechainicio," +
                            "	to_char(fechafin, 'YYYY-MM-DD') fechafin," +
                            "	salario," +
                            "	pruebatecnica.contratoslaborales.usuariocreacion," +
                            "	to_char(pruebatecnica.contratoslaborales.fechacreacion, 'YYYY-MM-DD') fechacreacion " +
                            " from " +
                            "	pruebatecnica.contratoslaborales" +
                            " left join pruebatecnica.estados on " +
                            "	pruebatecnica.estados.idestado = pruebatecnica.contratoslaborales.idestado" +
                            " left join pruebatecnica.arl on " +
                            "	pruebatecnica.arl.idarl = pruebatecnica.contratoslaborales.idarl " +
                            " left join pruebatecnica.cargos on" +
                            "	pruebatecnica.cargos.idcargo = pruebatecnica.contratoslaborales.idcargo " +
                            " left join pruebatecnica.tipodocumento on " +
                            "	pruebatecnica.tipodocumento.idtipodocumento = pruebatecnica.contratoslaborales.idtipodocumento {0} ", where);

                    using (IDbCommand comando = db.executeQuery(query))
                    {
                        data = comando.ExecuteReader();

                        while (data.Read())
                        {
                            Contratos_Entity obj = new Contratos_Entity();
                            obj.Idcontrato = (data["idcontrato"] != DBNull.Value) ? Int32.Parse(data["idcontrato"].ToString()) : 0;
                            obj.Estado = new Estado_Entity();
                            obj.Estado.Nombre = (data["nombre_estado"] != DBNull.Value) ? data["nombre_estado"].ToString() : string.Empty;
                            obj.Arl = new Arl_Entity();
                            obj.Arl.Nombre = (data["nombre_arl"] != DBNull.Value) ? data["nombre_arl"].ToString() : string.Empty;
                            obj.Cargo = new Cargo_Entity();
                            obj.Cargo.Nombre = (data["nombre_cargos"] != DBNull.Value) ? data["nombre_cargos"].ToString() : string.Empty;
                            obj.Tipo_documento = new TipoDoc_Entity();
                            obj.Tipo_documento.Nombre = (data["nombre_tipo_documentos"] != DBNull.Value) ? data["nombre_tipo_documentos"].ToString() : string.Empty;
                            obj.Numerodocumento = (data["numerodocumento"] != DBNull.Value) ? Int32.Parse(data["numerodocumento"].ToString()) : 0;
                            obj.Primerapellido = (data["primerapellido"] != DBNull.Value) ? data["primerapellido"].ToString() : string.Empty; ;
                            obj.Segundoapellido = (data["segundoapellido"] != DBNull.Value) ? data["segundoapellido"].ToString() : string.Empty; ;
                            obj.Primernombre = (data["primernombre"] != DBNull.Value) ? data["primernombre"].ToString() : string.Empty; ;
                            obj.Segundonombre = (data["segundonombre"] != DBNull.Value) ? data["segundonombre"].ToString() : string.Empty; ;
                            obj.Fechainicio = (data["fechainicio"] != DBNull.Value) ? data["fechainicio"].ToString() : string.Empty; ;
                            obj.Fechafin= (data["fechafin"] != DBNull.Value) ? data["fechafin"].ToString() : string.Empty; ;
                            obj.Salario = (int)((data["salario"] != DBNull.Value) ? float.Parse(data["salario"].ToString()) : 0); ;
                            obj.Usuariocreacion = (data["usuariocreacion"] != DBNull.Value) ? data["usuariocreacion"].ToString() : string.Empty;
                            obj.Fechacreacion = (data["fechacreacion"] != DBNull.Value) ? data["fechacreacion"].ToString() : string.Empty;
                            

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

    }
}
