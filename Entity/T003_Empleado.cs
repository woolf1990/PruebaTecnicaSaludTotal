using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entity
{
    public class T003_Empleado
    {

        int f003_id;
        String f003_username;
        String f003_nombre;
        String f003_apellido;
        String f003_titulo;
        String f003_cargo;
        int f003_alive;
        String fullname;

        public int F003_id { get => f003_id; set => f003_id = value; }
        public string F003_username { get => f003_username; set => f003_username = value; }
        public string F003_nombre { get => f003_nombre; set => f003_nombre = value; }
        public string F003_apellido { get => f003_apellido; set => f003_apellido = value; }
        public string F003_titulo { get => f003_titulo; set => f003_titulo = value; }
        public string F003_cargo { get => f003_cargo; set => f003_cargo = value; }
        public int F003_alive { get => f003_alive; set => f003_alive = value; }
        public string F003_fullname { get => fullname; set => fullname = value; }
    }
}
