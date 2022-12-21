class Video {

    public _id: String;
    public tipo: string;
    public nombre: string;
    public desarrollador: string;
    public ao: string;
    public precio: string;
    public nombreImagencamisa: string;
    public base64ImagenCamisa: string;

    constructor(id: String, nom:string, tip: string, des:string, ao:string, pre: string, nomi: string,
        bas: string) {
        this._id = id;
        this.tipo = tip;
        this.nombre = nom;
        this.desarrollador = des;
        this.ao = ao;
        this.precio = pre;
        this.nombreImagencamisa = nomi;
        this.base64ImagenCamisa = bas;
    }


}


export default Video;