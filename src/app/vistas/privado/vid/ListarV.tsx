import { useEffect, useState } from "react";
import { Button, Modal, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import Video from "../../../modelos/Video";


import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";
import { obtenerFechaLocal } from "../../../utilidades/funciones/FormatoFecha";

export const ListarV = () => {

    const [arregloVideo, setArregloVideo] = useState<Video[]>([]);
    const [modalShow, setModalShow] = useState(false);

    const handleClose = () => setModalShow(false);

    const [objVid, setObjVid] = useState<Video>(new Video("", "", "", "", "", "", "", ""));

    const listarVideo = async () => {
        const url = miApiBack.URL + miApiBack.OBTENER_VID;
        const resultado = await ServicioPrivado.peticionGET(url);
        setArregloVideo(resultado);
        return resultado;
    }

    useEffect(() => {
        listarVideo()
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
                <h1>Listar las vido</h1>

                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item"> vidsd</li>
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
                                    <th style={{ width: "10%" }}>tipo</th>
                                    <th style={{ width: "10%" }}>nombre</th>
                                    <th style={{ width: "10%" }}>desarrollador</th>
                                    <th style={{ width: "10%" }}>precio</th>
                                    <th style={{ width: "10%" }}>año</th>
                                    <th style={{ width: "10%" }}>imagen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arregloVideo.map((mivid, indice) => (
                                        <tr key={indice}>
                                            <td>{indice + 1}</td>
                                            <td>{(mivid.tipo == "1") ? "Arcade" : (mivid.tipo == "2") ? "Simulación" : (mivid.tipo == "3") ? "Estrategia" : (mivid.tipo == "4") ? "Deportes  " : ""}</td>
                                            <td>{mivid.nombre}</td>
                                            <td>{mivid.desarrollador}</td>
                                            <td>{mivid.precio}</td>
                                            <td>{mivid.ao}</td>
                                            <td>
                                                <a href="/#" onClick={(e) => { e.preventDefault(); setModalShow(true); setObjVid(mivid) }}>
                                                    <img src={mivid.base64ImagenCamisa} alt="" className="sizeImage" />
                                                </a></td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            <Modal
                                show={modalShow}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Libro: {objVid.nombre}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <img src={objVid.base64ImagenCamisa} alt="error" className='imagenModal imagen' />
                                <br/>
                                <strong>Genero:</strong>{obtenerGeneros(objVid.tipo)}
                                <br/>
                                <strong>FechaPublicacion :</strong>{objVid.ao}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary">Understood</Button>
                                </Modal.Footer>
                            </Modal>

                        </table>

                        {/* ACA va la modal de borrar */}
                    </div>
                </div>
                <ToastContainer />
            </div>
        </main>
    );
};
