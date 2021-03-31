using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class T005_Requerimiento
    {
        int f005_id;
        T001_Area f005_area;
        T002_Aplicativo f005_aplicativo;
        T003_Empleado f005_ingeniero;
        T004_Prioridad f005_prioridad;
        String f005_alcance;
        int f005_dias_desarrollo;
        String f005_fecha_solicitud;
        String f005_fecha_desarrollo;
        int f005_alive;

        public int F005_id { get => f005_id; set => f005_id = value; }
        public T001_Area F005_area { get => f005_area; set => f005_area = value; }
        public T002_Aplicativo F005_aplicativo { get => f005_aplicativo; set => f005_aplicativo = value; }
        public T003_Empleado F005_ingeniero { get => f005_ingeniero; set => f005_ingeniero = value; }
        public T004_Prioridad F005_prioridad { get => f005_prioridad; set => f005_prioridad = value; }
        public string F005_alcance { get => f005_alcance; set => f005_alcance = value; }
        public int F005_dias_desarrollo { get => f005_dias_desarrollo; set => f005_dias_desarrollo = value; }
        public string F005_fecha_solicitud { get => f005_fecha_solicitud; set => f005_fecha_solicitud = value; }
        public string F005_fecha_desarrollo { get => f005_fecha_desarrollo; set => f005_fecha_desarrollo = value; }
        public int F005_alive { get => f005_alive; set => f005_alive = value; }
    }
}
