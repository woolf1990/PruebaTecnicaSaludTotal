using Data.Administration.Broker;
using Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Facade
{
    public class FcdAdministration
    {
        #region Area
        public List<T001_Area> f001_area_Get()
        {
            Brk_T001_Area obj = new Brk_T001_Area();
            return obj.get();
        }
        #endregion

        #region Aplicativo
        public List<T002_Aplicativo> f002_aplicacion_Get()
        {
            Brk_T002_Aplicaciones obj = new Brk_T002_Aplicaciones();
            return obj.get();
        }
        #endregion

        #region Empleado
        public List<T003_Empleado> f003_empleado_Get()
        {
            Brk_T003_Empleados obj = new Brk_T003_Empleados();
            return obj.get();
        }
        #endregion

        #region Prioridad
        public List<T004_Prioridad> f004_prioridad_Get()
        {
            Brk_T004_Prioridad obj = new Brk_T004_Prioridad();
            return obj.get();
        }
        #endregion

        #region Requerimientos

        public List<T005_Requerimiento> f005_requerimiento_Get(T005_Requerimiento_Filtro filtros) {
            Brk_T005_Requerimientos obj = new Brk_T005_Requerimientos();
            return obj.get(filtros);
        }

        public bool f005_requerimiento_insert(T005_Requerimiento prms) {
            Brk_T005_Requerimientos obj = new Brk_T005_Requerimientos();
            return obj.insert(prms);
        }
        #endregion
    }
}
