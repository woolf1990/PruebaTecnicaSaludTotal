using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Nomina_Entity
    {
		int idnovedadnomina;
		int idcontrato;
		String periodolaborado;
		int horaslaboradas;
		int horaextradiurna;
		int horaextranocturna;
		int horaextradominical;
		int horaextrafestiva;
		int descuentos;
		String usuariocreacion;
		String fechacreacion;

        public int Idnovedadnomina { get => idnovedadnomina; set => idnovedadnomina = value; }
        public int Idcontrato { get => idcontrato; set => idcontrato = value; }
        public string Periodolaborado { get => periodolaborado; set => periodolaborado = value; }
        public int Horaslaboradas { get => horaslaboradas; set => horaslaboradas = value; }
        public int Horaextradiurna { get => horaextradiurna; set => horaextradiurna = value; }
        public int Horaextranocturna { get => horaextranocturna; set => horaextranocturna = value; }
        public int Horaextradominical { get => horaextradominical; set => horaextradominical = value; }
        public int Horaextrafestiva { get => horaextrafestiva; set => horaextrafestiva = value; }
        public int Descuentos { get => descuentos; set => descuentos = value; }
        public string Usuariocreacion { get => usuariocreacion; set => usuariocreacion = value; }
        public string Fechacreacion { get => fechacreacion; set => fechacreacion = value; }
    }
}
