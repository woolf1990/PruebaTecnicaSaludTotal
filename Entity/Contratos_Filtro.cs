using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Contratos_Filtro
    {
        bool? valNumeroDocumento;

        Int32 numeroDcoumento;


        public bool? ValNumeroDocumento { get => valNumeroDocumento; set => valNumeroDocumento = value; }
        public Int32 NumeroDcoumento { get => numeroDcoumento; set => numeroDcoumento = value; }
    }
}
