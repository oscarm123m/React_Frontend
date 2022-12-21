class Cine {
    public _id: string;
    public ciudad:string;
    public empresa:string;
    public nombre:string;


    constructor(id:string, ciu:string, emp:string, nom:string){
        this._id=id;
        this.ciudad=ciu;
        this.empresa=emp;
        this.nombre=nom;
    }
}

export default Cine;
