import miApiBack from "../utilidades/dominios/miApiBack";

class ServiciosPublicos {
  public static async registrarUsuario(objeto: any) {
    const datosEnviar = {
      method: "POST",
      body: JSON.stringify(objeto),
      headers: { "Content-Type": "application/json; chatset=UTF-8" },
    };
    const url = miApiBack.URL + miApiBack.REGISTRO;
    const respuesta = fetch(url, datosEnviar)
      .then((resPeticion) => resPeticion.json())
      .then((datos) => {
        return datos;
      })
      .catch((miError) => {
        return miError;
      });

    return respuesta;
  }

  public static async inicioSesion(objeto: any) {

    const datosEnviar = {
      method: "POST",
      body: JSON.stringify(objeto),
      headers: { "Content-Type": "application/json; chatset=UTF-8" },
    }

    const url = miApiBack.URL + miApiBack.SESION;
    const respuesta = fetch(url, datosEnviar)
      .then((resPeticion) => resPeticion.json())
      .then((datos) => {
        return datos;
      })
      .catch((miErrosito) => {
        return miErrosito;
      })
    return respuesta;
  }


}

export default ServiciosPublicos;
