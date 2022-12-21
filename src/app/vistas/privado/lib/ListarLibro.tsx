import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Libro from "../../../modelos/Libro";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { obtenerFechaLocal } from "../../../utilidades/funciones/FormatoFecha";

export const ListarLibro = () => {
    const [arregloLibro, setArregloLibro] = useState<Libro[]>([]);
    const [modalShow, setModalShow] = useState(false);

    const handleClose = () => setModalShow(false);

    const [objVid, setObjVid] = useState<Libro>(new Libro("", 0, "", "", new Date(), 0, "", ""));

    const listarLibro = async () => {
        const url = miApiBack.URL + miApiBack.OBTENER_LIBS;
        const resultado = await ServicioPrivado.peticionGET(url);
        setArregloLibro(resultado);
        return resultado;
    }

    useEffect(() => {
        listarLibro()
    }, []);

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
    return (
        <main id="main" className="main">

            {/* Navegación estilo breadcrumb: Inicio */}
            <div className="pagetitle">
                <h1>Libros</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            {/*  <Link to="/home">Inicio</Link> */}
                        </li>
                        <li className="breadcrumb-item active">Listar</li>
                    </ol>
                </nav>
            </div>
            {/* Navegación estilo breadcrumb: Fin */}


            {/* Ejemplo de una tabla para presentación de datos: Inicio */}
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th style={{ width: "10%" }}>Orden</th>
                                    <th style={{ width: "15%" }}>Genero</th>
                                    <th style={{ width: "20%" }}>Nombre Libro</th>
                                    <th style={{ width: "15%" }}>Autor </th>
                                    <th style={{ width: "15%" }}>Fecha Publicacion </th>
                                    <th style={{ width: "15%" }}>Cantidad Paginas</th>
                                    <th style={{ width: "10%" }}>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    arregloLibro.map((miLib, indice) => (
                                        <tr key={indice}>
                                            <td>{indice + 1}</td>
                                            <td>{obtenerGeneros(miLib.generoLibro)}</td>
                                            <td>{miLib.nombreLibro}</td>
                                            <td>{miLib.autorLibro}</td>
                                            <td>{obtenerFechaLocal(miLib.fechaPublicacionLibro)}</td>
                                            <td>{miLib.cantidadPaginasLibro}</td>
                                            <td>
                                                <a href="/#" onClick={(e) => { e.preventDefault(); setModalShow(true); setObjVid(miLib) }}>
                                                    <img src={miLib.base64ImagenCamisa} alt="" className="sizeImage" />
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
                                    <Modal.Title>Libro: {objVid.nombreLibro}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                <img src={objVid.base64ImagenCamisa} alt="error" className='imagenModal imagen' />
                                <br/>
                                <strong>Genero:</strong>{obtenerGeneros(objVid.generoLibro)}
                                <br/>
                                <strong>FechaPublicacion :</strong>{obtenerFechaLocal(objVid.fechaPublicacionLibro)}
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose}>
                                        Close
                                    </Button>
                                    <Button variant="primary">Understood</Button>
                                </Modal.Footer>
                            </Modal>
                        </table>

                    </div>
                </div>
            </div>
            {/* Ejemplo de una tabla para presentación de datos: Fin */}

        </main>
    );
};
