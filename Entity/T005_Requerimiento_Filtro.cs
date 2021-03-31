using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class T005_Requerimiento_Filtro
    {
        Boolean valF005_id = false;
        Boolean valFf005_area = false;
        Boolean valFf005_aplicativo = false;
        Boolean valFf005_ingeniero = false;
        Boolean valFf005_prioridad = false;

        int f005_id;
        int f005_area;
        int f005_aplicativo;
        int f005_ingeniero;
        int f005_prioridad;

        public bool ValF005_id { get => valF005_id; set => valF005_id = value; }
        public bool ValFf005_area { get => valFf005_area; set => valFf005_area = value; }
        public bool ValFf005_aplicativo { get => valFf005_aplicativo; set => valFf005_aplicativo = value; }
        public bool ValFf005_ingeniero { get => valFf005_ingeniero; set => valFf005_ingeniero = value; }
        public bool ValFf005_prioridad { get => valFf005_prioridad; set => valFf005_prioridad = value; }

        public int F005_id { get => f005_id; set => f005_id = value; }
        public int F005_area { get => f005_area; set => f005_area = value; }
        public int F005_aplicativo { get => f005_aplicativo; set => f005_aplicativo = value; }
        public int F005_ingeniero { get => f005_ingeniero; set => f005_ingeniero = value; }
        public int F005_prioridad { get => f005_prioridad; set => f005_prioridad = value; }
    }
}
