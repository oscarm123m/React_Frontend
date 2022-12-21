import { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import Perfil from "../../../modelos/Perfil";
import Usuario from "../../../modelos/Usuario";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";

export const ListarUsuario = () => {

    const [arregloUsuario, setArregloUsuario] = useState<Usuario[]>([]);
    const [arregloPerfil, setArregloPerfil] = useState<Perfil[]>([]);

    const [objUsuario, setObjUsuario] = useState<Usuario>(new Usuario("", "", "", "", "", "", ""));

    const listarUsuarios = async () => {
        const url = miApiBack.URL + miApiBack.OBTENER_USUARIOS;
        const resultado = await ServicioPrivado.peticionGET(url);
        setArregloUsuario(resultado);
        return resultado;
    }

    useEffect(() => {
        listarUsuarios()
    }, [])




    return (
        <main id="main" className="main">
            {/* INICIO: BREADCRUM  */}
            <div className="pagetitle">
                <h1>Listar los Usuarios</h1>

                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item"> Usuarios</li>
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
                                    <th style={{ width: "10%" }}>Orden</th>
                                    <th style={{ width: "10%" }}>Nombre Usuario</th>
                                    <th style={{ width: "10%" }}>Documento</th>
                                    <th style={{ width: "10%" }}>Nacimiento</th>
                                    <th style={{ width: "10%" }}>Correo</th>
                                    <th style={{ width: "10%" }}>Perfil</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arregloUsuario.map((miUsuario: Usuario, indice: number) => (
                                        <tr key={indice}>
                                            <td>{indice + 1}</td>
                                            <td>{miUsuario._id}</td>
                                            <th>{arregloPerfil.map((miMarquita: Perfil) => (

                                                String(miMarquita._id) == miUsuario._id && (
                                                    <p>{miMarquita.nombrePerfil}</p>
                                                )

                                            ))}</th>
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
