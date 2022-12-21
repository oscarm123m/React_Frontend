import { useEffect, useState } from "react";
import Cine from "../../../modelos/Cine";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";
import { obtenerFechaLocal } from "../../../utilidades/funciones/FormatoFecha";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export const AdministrarC = () => {

    const [arregloCine, setArregloCine] = useState<Cine[]>([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //const handleClose = () => setShow(false);

    const [objCine, setObjCine] = useState<Cine>(new Cine("", "", "", ""));


    const obtenerCines = async () => {
        const url = miApiBack.URL + miApiBack.OBTENER_CINS;
        const resultado = await ServicioPrivado.peticionGET(url);
        setArregloCine(resultado);
        return resultado;
    }

    useEffect(() => {
        obtenerCines()
    }, [])

    const obtenerGeneros = (valor: number) => {
        let textoEstado = "";
        switch (valor) {
            case 1:
                textoEstado = "Narrativo"
                break;
            case 2:
                textoEstado = "Lirirco"
                break;
            case 3:
                textoEstado = "Dramatico"
                break;
            case 4:
                textoEstado = "Didactico"
                break;

            default:
                textoEstado = "No encontrado"
                break;
        }
        return textoEstado;
    }

    const borrarCine = async (codCine: string) => {
        const urlBorrar = miApiBack.URL + miApiBack.ELIMINAR_CIN + "/" + codCine;

        const resultado = await ServicioPrivado.peticionDELETE(urlBorrar);
        console.log(resultado);

        if (typeof resultado.eliminado === "undefined") {
            MensajeToastify("error", "Fallo al Borrar el Cine", 6000);
        } else {
            MensajeToastify("Succcess", "Exito al Borrar el Cine", 6000);
        }
        obtenerCines();
    }

    return (
        <main id="main" className="main">

            {/* Navegación estilo breadcrumb: Inicio */}
            <div className="pagetitle">
                <h1>Cines</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            {/*   <Link to="/home">Inicio</Link> */}
                        </li>
                        <li className="breadcrumb-item active">Listar</li>
                    </ol>
                </nav>
            </div>
            {/* Navegación estilo breadcrumb: Fin */}


            {/* Ejemplo de una tabla para presentación de datos: Inicio */}
            <div className="col-lg-12">
                {/*  <ToastContainer /> */}
                <div className="card">
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}>Orden</th>
                                    <th style={{ width: "15%" }}>ciudad</th>
                                    <th style={{ width: "20%" }}>empresa</th>
                                    <th style={{ width: "15%" }}>nombre </th>
                                    <th style={{ width: "10%" }}>&nbsp;</th>
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
                                            <td className="text-center align-middle">
                                                
                                                <a
                                                    href="/#"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setShow(true);
                                                        setObjCine(micin);
                                                    }}
                                                >
                                                    <i
                                                        className="fa-solid fa-trash-can fa-sm"
                                                        style={{ color: "#990000" }}
                                                    ></i>
                                                </a>{" "}
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>

                            {/* Modal para eliminar */}
                            {/* *********************************************************************************/}
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title>Eliminar perfil</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    ¿Realmente desea eleminar el perfil?
                                    <br />
                                    <strong>
                                        {objCine.nombre} - {objCine.ciudad}
                                    </strong>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        onClick={(e) => {
                                            setShow(false);
                                        }}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={(e) => {
                                            borrarCine(objCine._id);
                                            setShow(false);
                                        }}
                                    >
                                        Eliminar
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {/* *********************************************************************************/}
                        </table>
                    </div>
                </div>
            </div>
            {/* Ejemplo de una tabla para presentación de datos: Fin */}

        </main>
    );
};
