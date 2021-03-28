﻿using Data.Administration.Broker;
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
        #region Arl
        public List<Arl_Entity> arlGetAll() {
            BrkArl obj = new BrkArl();
            return obj.getAll();
        }

        public List<Arl_Entity> arlGet(Arl_Filtro objFiltro)
        {
            BrkArl obj = new BrkArl();
            return obj.get(objFiltro);
        }

        public bool arlInsert(Arl_Entity objDatos) {
            BrkArl brkArl = new BrkArl();
            return brkArl.insert(objDatos);
        }

        public bool arlUpdate(Arl_Entity objDatos)
        {
            BrkArl brkArl = new BrkArl();
            return brkArl.update(objDatos);
        }
        #endregion

    }
}
