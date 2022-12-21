class Libro {
    public _id: string;
    public generoLibro: number;
    public nombreLibro: string;
    public autorLibro: string;
    public fechaPublicacionLibro: Date;
    public cantidadPaginasLibro: number;
    public nombreImagencamisa: string;
    public base64ImagenCamisa: string;


    constructor(id: string, gen: number, nom: string, aut: string, fecha: Date, can: number, nomi: string,
        bas: string) {
        this._id = id;
        this.generoLibro = gen;
        this.nombreLibro = nom;
        this.autorLibro = aut;
        this.fechaPublicacionLibro = fecha;
        this.cantidadPaginasLibro = can;
        this.nombreImagencamisa = nomi;
        this.base64ImagenCamisa = bas;
    }
}

export default Libro;
