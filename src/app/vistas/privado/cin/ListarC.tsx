import { useEffect, useState } from "react";
import { Button, Modal, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cine from "../../../modelos/Cine";


import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";
import { obtenerFechaLocal } from "../../../utilidades/funciones/FormatoFecha";

export const ListarC = () => {

    const [arregloCine, setArregloCine] = useState<Cine[]>([]);
    const [modalShow, setModalShow] = useState(false);

    const handleClose = () => setModalShow(false);

    const [objVid, setObjVid] = useState<Cine>(new Cine("", "", "", ""));

    const listarCine = async () => {
        const url = miApiBack.URL + miApiBack.OBTENER_CINS;
        const resultado = await ServicioPrivado.peticionGET(url);
        setArregloCine(resultado);
        return resultado;
    }

    useEffect(() => {
        listarCine()
    }, [])

    const obtenerGeneros = (valor: string) => {
        let textoEstado = "";
        switch (valor) {
            case "1":
                textoEstado = "Narrativo"
                break;
            case "2":
                textoEstado = "Lirirco"
                break;
            case "3":
                textoEstado = "Dramatico"
                break;
            case "4":
                textoEstado = "Didactico"
                break;

            default:
                textoEstado = "No encontrado"
                break;
        }
        return textoEstado;
    }




    return (
        <main id="main" className="main">
            {/* INICIO: BREADCRUM  */}
            <div className="pagetitle">
                <h1>Listar las cines</h1>

                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item"> cines</li>
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
                                    <th style={{ width: "10%" }}>ciudad</th>
                                    <th style={{ width: "10%" }}>empresa</th>
                                    <th style={{ width: "10%" }}>nombre</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arregloCine.map((micin, indice) => (
                                        <tr key={indice}>
                                            <td>{indice + 1}</td>  
                                            <td>{micin.ciudad}</td>                                          
                                            <td>{micin.empresa}</td>
                                            <td>{micin.nombre}</td>
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
