const miApiBack = {
  URL: "http://localhost:3500",
  REGISTRO: "/api/public/register/signup",
  SESION: "/api/public/access/signin",

  OBTENER_PERFILES: "/api/private/profile/all",
  OBTENER_PERFIL: "/api/private/profile/one",
  AGREGAR_PERFILES: "/api/private/profile/add",
  MODIFICAR_PERFILES: "/api/private/profile/update",
  ELIMINAR_PERFILES: "/api/private/profile/delete",

  OBTENER_USUARIOS: "/api/private/usuario/all",
  OBTENER_USUARIO: "/api/private/usuario/one",
  AGREGAR_USUARIOS: "/api/private/usuario/add",
  MODIFICAR_USUARIOS: "/api/private/usuario/update",
  ELIMINAR_USUARIOS: "/api/private/usuario/delete",

  OBTENER_HAM: "/api/private/ham/all",
  AGREGAR_HAM: "/api/private/ham/add",
  MODIFICAR_HAM: "/api/private/ham/update",

  OBTENER_VID: "/api/private/vid/all",
  AGREGAR_VID: "/api/private/vid/add",

  OBTENER_LIBS: "/api/private/lib/all",
  OBTENER_LIB: "/api/private/lib/one",
  AGREGAR_LIB: "/api/private/lib/add",
  MODIFICAR_LIB: "/api/private/lib/update",
  ELIMINAR_LIB: "/api/private/lib/delete",

  OBTENER_Ciudad: "/api/private/ciudad/all",
  OBTENER_Empresa: "/api/private/empresa/all",
  OBTENER_CINS: "/api/private/cin/all",
  AGREGAR_CIN: "/api/private/cin/add",
  ELIMINAR_CIN: "/api/private/cin/delete",
  OBTENER_CIN: "/api/private/cin/one",

  
};

export default miApiBack;
