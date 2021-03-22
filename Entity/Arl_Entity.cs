using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Arl_Entity
    {
        int idarl;
        int valor;
        String usuariocreacion;
        String fechacreacion;
        Boolean habilitado;

        public int Idarl { get => idarl; set => idarl = value; }
        public int Valor { get => valor; set => valor = value; }
        public string Usuariocreacion { get => usuariocreacion; set => usuariocreacion = value; }
        public string Fechacreacion { get => fechacreacion; set => fechacreacion = value; }
        public bool Habilitado { get => habilitado; set => habilitado = value; }
    }
}
