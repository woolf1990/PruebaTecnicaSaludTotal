using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Arl_Filtro
    {
        Boolean? valIdarl;
        Boolean? valValor_menor_igual;
        Boolean? valValor_mayor_igual;
        Boolean? valUsuariocreacion;
        Boolean? valFechacreacionInicial;
        Boolean? valFechacreacionFinal;
        Boolean? valhabilitado;

        int idarl;
        int valor_menor_igual;
        int valor_mayor_igual;
        String usuariocreacion;
        String fechacreacionInicial;
        String fechacreacionFinal;
        Boolean habilitado;

        public bool? ValIdarl { get => valIdarl; set => valIdarl = value; }
        public bool? ValValor_menor_igual { get => valValor_menor_igual; set => valValor_menor_igual = value; }
        public bool? ValValor_mayor_igual { get => valValor_mayor_igual; set => valValor_mayor_igual = value; }
        public bool? ValUsuariocreacion { get => valUsuariocreacion; set => valUsuariocreacion = value; }
        public bool? ValFechacreacionInicial { get => valFechacreacionInicial; set => valFechacreacionInicial = value; }
        public bool? ValFechacreacionFinal { get => valFechacreacionFinal; set => valFechacreacionFinal = value; }
        public bool? Valhabilitado { get => valhabilitado; set => valhabilitado = value; }

        public int Idarl { get => idarl; set => idarl = value; }
        public int Valor_menor_igual { get => valor_menor_igual; set => valor_menor_igual = value; }
        public int Valor_mayor_igual { get => valor_mayor_igual; set => valor_mayor_igual = value; }
        public string Usuariocreacion { get => usuariocreacion; set => usuariocreacion = value; }
        public string FechacreacionInicial { get => fechacreacionInicial; set => fechacreacionInicial = value; }
        public string FechacreacionFinal { get => fechacreacionFinal; set => fechacreacionFinal = value; }
        public bool Habilitado { get => habilitado; set => habilitado = value; }
    }
}
