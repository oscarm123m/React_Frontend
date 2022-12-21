import { useEffect, useState } from "react";
import Libro from "../../../modelos/Libro";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";
import { obtenerFechaLocal } from "../../../utilidades/funciones/FormatoFecha";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

export const AdministrarLibro = () => {

    const [arregloLibro, setArregloLibro] = useState<Libro[]>([]);

    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    const [show, setShow] = useState(false);
    //const handleClose = () => setShow(false);

    const [objLibro, setObjLibro] = useState<Libro>(new Libro("", 0, "", "", new Date(), 0, "", ""));
    

    const obtenerLibros = async () => {
        const url = miApiBack.URL + miApiBack.OBTENER_LIBS;
        const resultado = await ServicioPrivado.peticionGET(url);
        setArregloLibro(resultado);
        return resultado;
    }

    useEffect(() => {
        obtenerLibros()
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

    const borrarLibro = async (codLibro: string) => {
        const urlBorrar = miApiBack.URL + miApiBack.ELIMINAR_LIB + "/" + codLibro;

        const resultado = await ServicioPrivado.peticionDELETE(urlBorrar);
        console.log(resultado);

        if (typeof resultado.eliminado === "undefined") {
            MensajeToastify("error", "Fallo al Borrar el Libro", 6000);
        } else {
            MensajeToastify("Succcess", "Exito al Borrar el Libro", 6000);
        }
        obtenerLibros();
    }

    return (
        <main id="main" className="main">

            {/* Navegación estilo breadcrumb: Inicio */}
            <div className="pagetitle">
                <h1>Libros</h1>
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
                                            {/*<td>
                                                <a href="/#" onClick={(e) => { e.preventDefault(); setModalShow(true); setObjLibro(miLib) }}>
                                                    <img src={miLib.base64ImagenCamisa} alt="" className="sizeImage" />
                                                </a>
                                    </td>*/}
                                            <td>
                                                <Link to={"/home/updatelib/" + miLib._id}>
                                                    <i className="fa fa-edit iconoEditar"></i>
                                                </Link>
                                                <a
                      href="/#"
                      onClick={(e) => {
                        e.preventDefault();
                        setModalShow(true);
                        setObjLibro(miLib);
                      }}
                    >
                      <i
                        className="fa-solid fa-trash-can fa-sm"
                        style={{ color: "#990000" }}
                      ></i>
                    </a>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                            
                             {/* Modal para eliminar */}
          {/* *********************************************************************************/}
          <Modal
                                show={modalShow}
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
                {objLibro.nombreLibro} - {objLibro.autorLibro}
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
                    borrarLibro(objLibro._id);
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
