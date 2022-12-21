export const obtenerFechaLocal=(fecha:Date | string)=>{
    const fechaLocal=new Date(fecha);
    return fechaLocal.toLocaleDateString();
}