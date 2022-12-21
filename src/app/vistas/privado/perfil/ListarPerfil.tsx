import { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import Perfil from "../../../modelos/Perfil";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";

export const ListarPerfil = () => {

    const [arregloPerfil, setArregloPerfil] = useState<Perfil[]>([]);

    const [objPerfil, setObjPerfil] = useState<Perfil>(new Perfil("", ""));

    const listarPerfiles = async () => {
        const url = miApiBack.URL + miApiBack.OBTENER_PERFILES;
        const resultado = await ServicioPrivado.peticionGET(url);
        setArregloPerfil(resultado);
        return resultado;
    }

    useEffect(() => {
        listarPerfiles()
    }, [])

    


    return (
        <main id="main" className="main">
            {/* INICIO: BREADCRUM  */}
            <div className="pagetitle">
                <h1>Listar los perfiles</h1>

                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item"> Perfiles</li>
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
                                    <th style={{ width: "70%" }}>Nombre Perfil</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arregloPerfil.map((miPerfilsito, indice) => (
                                        <tr key={indice}>
                                            <td>{indice + 1}</td>
                                            <td>{miPerfilsito.nombrePerfil}</td>
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
