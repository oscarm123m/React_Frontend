import { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import Hamburguesa from "../../../modelos/Hamburguesa";

import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";

export const ListarH = () => {

    const [arregloHamburguesa, setArregloHamburguesa] = useState<Hamburguesa[]>([]);

    const [objHam, setObjHam] = useState<Hamburguesa>(new Hamburguesa("", "", "", ""));

    const listarHamburguesas = async () => {
        const url = miApiBack.URL + miApiBack.OBTENER_HAM;
        const resultado = await ServicioPrivado.peticionGET(url);
        setArregloHamburguesa(resultado);
        return resultado;
    }

    useEffect(() => {
        listarHamburguesas()
    }, [])

    


    return (
        <main id="main" className="main">
            {/* INICIO: BREADCRUM  */}
            <div className="pagetitle">
                <h1>Listar las Hamburguesa</h1>

                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item"> Hamburguesas</li>
                        <li className="breadcrumb-item active"> Listar</li>
                    </ol>
                </nav>
            </div>
            {/* FIN: BREADCRUM  */}


            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{ width: "20%" }}>Orden</th>
                                    <th style={{ width: "20%" }}>tipo</th>
                                    <th style={{ width: "20%" }}>precio</th>
                                    <th style={{ width: "20%" }}>disponibilidad</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arregloHamburguesa.map((miHambur, indice) => (
                                        <tr key={indice}>
                                            <td>{indice + 1}</td>
                                            <td>{(miHambur.tipo=="1") ? "Big chiquita" : (miHambur.tipo == "2") ? "Pequeña pero grande" : (miHambur.tipo == "3") ? "Jaguayana" : (miHambur.tipo == "4") ? "Vegetariana" : (miHambur.tipo == "5") ? "Solida": "" }</td>
                                            <td>{miHambur.precio}</td>
                                            <td>{(miHambur.disponibilidad=="1") ? "SI" : "NO"}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                        </table>

                        {/* ACA va la modal de borrar */}
                    </div>
                </div>
                <ToastContainer />
            </div>
        </main>
    );
};
