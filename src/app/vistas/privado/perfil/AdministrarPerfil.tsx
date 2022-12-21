import { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import Perfil from "../../../modelos/Perfil";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";

export const AdministarPerfil = () => {

    const [arregloPerfil, setArregloPerfil] = useState<Perfil[]>([]);

    const [objPerfil, setObjPerfil] = useState<Perfil>(new Perfil("", ""));

    const obtenerPerfiles = async () => {
        const url = miApiBack.URL + miApiBack.OBTENER_PERFILES;
        const resultado = await ServicioPrivado.peticionGET(url);
        setArregloPerfil(resultado);
        return resultado;
    }

    useEffect(() => {
        obtenerPerfiles()
    }, [])

    const borrarPerfil = async (codPerfil: string) => {
        const urlBorrar = miApiBack.URL + miApiBack.ELIMINAR_PERFILES + "/" + codPerfil;

        const resultado = await ServicioPrivado.peticionDELETE(urlBorrar);

        if (typeof resultado.eliminado === "undefined") {
            MensajeToastify("error", "Fallo al Borrar el perfil", 6000);
        } else {
            MensajeToastify("Succcess", "Exito al Borrar el Perfil", 6000);
        }
        obtenerPerfiles();
    }


    return (
        <main id="main" className="main">
            {/* INICIO: BREADCRUM  */}
            <div className="pagetitle">
                <h1>Administracion de perfiles</h1>

                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item"> Perfiles</li>
                        <li className="breadcrumb-item active"> Administrar</li>
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
                                    <th style={{ width: "10%" }}>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arregloPerfil.map((miPerfilsito, indice) => (
                                        <tr key={indice}>
                                            <td>{indice + 1}</td>
                                            <td>{miPerfilsito.nombrePerfil}</td>
                                            <td>
                                                <Link to={"/home/updateprofile/" + miPerfilsito._id}>
                                                    <i className="fa fa-edit iconoEditar"></i>
                                                </Link>
                                                {" "}
                                                <a href="/home/admprofile" >
                                                    <i className="fa fa-trash-alt iconoBorrar"></i>
                                                </a>

                                            </td>
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
