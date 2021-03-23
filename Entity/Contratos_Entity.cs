using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class Contratos_Entity
    {
		int idcontrato;
		Estado_Entity estado;
		Arl_Entity arl;
		Cargo_Entity cargo;
		TipoDoc_Entity tipo_documento;
		Int32 numerodocumento;
		String primerapellido;
		String segundoapellido;
		String primernombre;
		String segundonombre;
		String fechainicio;
		String fechafin;
		float salario;
		String usuariocreacion;
		String fechacreacion;

        public int Idcontrato { get => idcontrato; set => idcontrato = value; }
        public Estado_Entity Estado { get => estado; set => estado = value; }
        public Arl_Entity Arl { get => arl; set => arl = value; }
        public Cargo_Entity Cargo { get => cargo; set => cargo = value; }
        public TipoDoc_Entity Tipo_documento { get => tipo_documento; set => tipo_documento = value; }
        public Int32 Numerodocumento { get => numerodocumento; set => numerodocumento = value; }
        public string Primerapellido { get => primerapellido; set => primerapellido = value; }
        public string Segundoapellido { get => segundoapellido; set => segundoapellido = value; }
        public string Primernombre { get => primernombre; set => primernombre = value; }
        public string Segundonombre { get => segundonombre; set => segundonombre = value; }
        public string Fechainicio { get => fechainicio; set => fechainicio = value; }
        public string Fechafin { get => fechafin; set => fechafin = value; }
        public float Salario { get => salario; set => salario = value; }
        public string Usuariocreacion { get => usuariocreacion; set => usuariocreacion = value; }
        public string Fechacreacion { get => fechacreacion; set => fechacreacion = value; }
    }
}
