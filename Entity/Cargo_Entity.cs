using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Cargo_Entity
    {
        int idcargo;
        String nombre;
        String usuariocreacion;
        String fechacreacion;

        public int Idcargo { get => idcargo; set => idcargo = value; }
        public string Nombre { get => nombre; set => nombre = value; }
        public string Usuariocreacion { get => usuariocreacion; set => usuariocreacion = value; }
        public string Fechacreacion { get => fechacreacion; set => fechacreacion = value; }
    }
}
