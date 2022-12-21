import { lazy } from "react";
import { ActualizarPerfil } from "../../vistas/privado/perfil/ActualizarPerfil";
import { AdministarPerfil } from "../../vistas/privado/perfil/AdministrarPerfil";
import { CrearPerfil } from "../../vistas/privado/perfil/CrearPerfil";
import { ListarPerfil } from "../../vistas/privado/perfil/ListarPerfil";
import { AdministarUsuario } from "../../vistas/privado/usuario/AdministrarUsuario";
import { CrearUsuario } from "../../vistas/privado/usuario/CrearUsuario";
import { ListarUsuario } from "../../vistas/privado/usuario/ListarUsuario";
import { CrearH } from "../../vistas/privado/ham/CrearH";
import { ListarH } from "../../vistas/privado/ham/ListarH";
import { AdministrarH } from "../../vistas/privado/ham/AdministrarH";
import { AdministrarC } from "../../vistas/privado/cin/AdministrarC";
import { CrearV } from "../../vistas/privado/vid/CrearV";
import { CrearC } from "../../vistas/privado/cin/CrearC";
import { ListarV } from "../../vistas/privado/vid/ListarV";
import { ListarLibro } from "../../vistas/privado/lib/ListarLibro";
import { CrearLibro } from "../../vistas/privado/lib/CrearLibro";
import { AdministrarLibro } from "../../vistas/privado/lib/AdministrarLibro";
import { EditarLibro } from "../../vistas/privado/lib/EditarLibro";
import { ListarC } from "../../vistas/privado/cin/ListarC";

const LazyCrearUsuario = lazy(() =>
  import("../../vistas/privado/usuario/CrearUsuario").then(() => ({
    default: CrearUsuario,
  }))
);
const LazyAdministrarUsuario = lazy(() =>
  import("../../vistas/privado/usuario/AdministrarUsuario").then(() => ({
    default: AdministarUsuario,
  }))
);
const LazyListarUsuario = lazy(() =>
  import("../../vistas/privado/usuario/ListarUsuario").then(() => ({
    default: ListarUsuario,
  }))
);

const LazyListarPerfiles = lazy(() =>
  import("../../vistas/privado/perfil/ListarPerfil").then(() => ({
    default: ListarPerfil,
  }))
);
const LazyAdministrarPerfiles = lazy(() =>
  import("../../vistas/privado/perfil/AdministrarPerfil").then(() => ({
    default: AdministarPerfil,
  }))
);
const LazyCrearPerfiles = lazy(() =>
  import("../../vistas/privado/perfil/CrearPerfil").then(() => ({
    default: CrearPerfil,
  }))
);
const LazyActualizarPerfiles = lazy(() =>
  import("../../vistas/privado/perfil/ActualizarPerfil").then(() => ({
    default: ActualizarPerfil,
  }))
);

const LazyListarHamburguesas = lazy(() =>
  import("../../vistas/privado/ham/ListarH").then(() => ({
    default: ListarH,
  }))
);

const LazyCrearHamburguesas = lazy(() =>
  import("../../vistas/privado/ham/CrearH").then(() => ({
    default: CrearH,
  }))
);
const LazyAdministrarHamburguesas = lazy(() =>
  import("../../vistas/privado/ham/AdministrarH").then(() => ({
    default: AdministrarH,
  }))
);

const LazyListarVideo = lazy(() =>
  import("../../vistas/privado/vid/ListarV").then(() => ({
    default: ListarV,
  }))
);

const LazyCrearVideo = lazy(() =>
  import("../../vistas/privado/vid/CrearV").then(() => ({
    default: CrearV,
  }))
);



const LazyListarLibros = lazy(() =>
  import("../../vistas/privado/lib/ListarLibro").then(() => ({
    default: ListarLibro,
  }))
);
const LazyCrearLibros = lazy(() =>
  import("../../vistas/privado/lib/CrearLibro").then(() => ({
    default: CrearLibro,
  }))
);
const LazyAdministrarLibros = lazy(() =>
  import("../../vistas/privado/lib/AdministrarLibro").then(() => ({
    default: AdministrarLibro,
  }))
);
const LazyActualizarLibros = lazy(() =>
  import("../../vistas/privado/lib/EditarLibro").then(() => ({
    default: EditarLibro,
  }))
);


const LazyListarCine = lazy(() =>
  import("../../vistas/privado/cin/ListarC").then(() => ({
    default: ListarC,
  }))
);
const LazyCrearCine = lazy(() =>
  import("../../vistas/privado/cin/CrearC").then(() => ({
    default: CrearC,
  }))
);
const LazyAdministrarCine = lazy(() =>
  import("../../vistas/privado/cin/AdministrarC").then(() => ({
    default: AdministrarC,
  }))
);



const RutasPrivadas = [
  { path: "/listuser", element: LazyListarUsuario },
  { path: "/admuser", element: LazyAdministrarUsuario },
  { path: "/adduser", element: LazyCrearUsuario },

  { path: "/listprofile", element: LazyListarPerfiles },
  { path: "/admprofile", element: LazyAdministrarPerfiles },
  { path: "/addprofile", element: LazyCrearPerfiles },
  { path: "/updateprofile/:codigo", element: LazyActualizarPerfiles },

  { path: "/listham", element: LazyListarHamburguesas},
  { path: "/admham", element: LazyAdministrarHamburguesas},
  { path: "/addham", element: LazyCrearHamburguesas },

  { path: "/listvid", element: LazyListarVideo},
  { path: "/addvid", element: LazyCrearVideo },

  { path: "/listlib", element: LazyListarLibros },
  { path: "/addlib", element: LazyCrearLibros },
  { path: "/admlib", element: LazyAdministrarLibros },
  { path: "/updatelib/:codigo", element: LazyActualizarLibros },

  { path: "/listcin", element: LazyListarCine },
  { path: "/addcin", element: LazyCrearCine },
  { path: "/admcin", element: LazyAdministrarCine },
];

export default RutasPrivadas;
