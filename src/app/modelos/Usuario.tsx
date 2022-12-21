
class Usuario{

    public _id: string;
    public nombreUsuario:string;
    public documentoUsuario: string;
    public fechaNacimientoUsuario: string;
    public correoUsuario: string;
    public claveUsuario: string;
    public codPerfil: string;

    constructor(id: string, nom:string, doc:string, fec:string, corr:string, cla:string, cod:string){
        this._id = id;
        this.nombreUsuario=nom;
        this.documentoUsuario=doc;
        this.fechaNacimientoUsuario=fec;
        this.correoUsuario=corr;
        this.claveUsuario=cla;
        this.codPerfil=cod;
    }
}

export default Usuario;
