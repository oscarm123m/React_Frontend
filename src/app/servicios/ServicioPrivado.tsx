class ServicioPrivado {

    public static async peticionPOST(url: string, objeto: any) {
        const bearer = "Bearer " + String(localStorage.getItem("tokenUSTA"));

        const datosEnviar = {
            method: "POST",
            body: JSON.stringify(objeto),
            headers: { "Content-Type": "application/json; chatset=UTF-8", authorization: bearer }
        }

        const respuesta = fetch(url, datosEnviar)
            .then((resPeticion) => resPeticion.json())
            .then((datos) => {
                return datos;
            })
            .catch((miErrorsito) => {
                return miErrorsito;
            })
        return respuesta;
    }

    public static async peticionGET(url: string) {
        const bearer = "Bearer " + String(localStorage.getItem("tokenUSTA"));

        const datosEnviar = {
            method: "GET",
            headers: { "Content-Type": "application/json; chatset=UTF-8", authorization: bearer }
        }

        const respuesta = fetch(url, datosEnviar)
            .then((resPeticion) => resPeticion.json())
            .then((datos) => {
                return datos;
            })
            .catch((miErrorsito) => {
                return miErrorsito;
            })
        return respuesta;

    }
    public static async peticionPUT(url: string, objeto: any) {
        const bearer = "Bearer " + String(localStorage.getItem("tokenUSTA"));

        const datosEnviar = {
            method: "PUT",
            body: JSON.stringify(objeto),
            headers: { "Content-Type": "application/json; chatset=UTF-8", authorization: bearer }
        }

        const respuesta = fetch(url, datosEnviar)
            .then((resPeticion) => resPeticion.json())
            .then((datos) => {
                return datos;
            })
            .catch((miErrorsito) => {
                return miErrorsito;
            })
        return respuesta;

    }
    public static async peticionDELETE(url: string) {
        const bearer = "Bearer " + String(localStorage.getItem("tokenUSTA"));

        const datosEnviar = {
            method: "DELETE",
            headers: { "Content-Type": "application/json; chatset=UTF-8", authorization: bearer }
        }

        const respuesta = fetch(url, datosEnviar)
            .then((resPeticion) => resPeticion.json())
            .then((datos) => {
                return datos;
            })
            .catch((miErrorsito) => {
                return miErrorsito;
            })
        return respuesta;

    }

}

export default ServicioPrivado;