class Hamburguesa {

    public _id: string;
    public tipo: string;
    public precio: string;
    public disponibilidad: string;

    constructor(id: string, tip: string, pre: string, dis: string) {
        this._id = id;
        this.tipo = tip;
        this.precio = pre;
        this.disponibilidad = dis;
    }


}


export default Hamburguesa;