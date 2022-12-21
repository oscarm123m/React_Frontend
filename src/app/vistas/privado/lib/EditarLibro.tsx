import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-bootstrap";
import Libro from "../../../modelos/Libro";
import noFoto from "../../../../assets/images/no-image.png";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";
import { useFormulario } from "../../../utilidades/mishocks/useFormulario";
import { Button, Col, Form, Row } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';
import { ConvertirBase64 } from "../../../utilidades/funciones/ConvertirBase64";

export const EditarLibro = () => {

    type formHtml = React.FormEvent<HTMLFormElement>;

    let { codigo } = useParams();

    const [enProceso, setEnProceso] = useState<boolean>(false);
    const [todoListo, setTodoListo] = useState<boolean>(false);
    const fechaVacia = new Date();

    const [imagenMiniatura, setImagenMiniatura] = useState(noFoto);
    const [imgBase64, setImageBase64] = useState<string>("");
    const [nombreimagenTempo, setNombreimagenTempo] = useState<string>("");

    let { nombreLibro, autorLibro, generoLibro, fechaPublicacionLibro, cantidadPaginasLibro, nombreImagencamisa, base64ImagenCamisa, dobleEnlace, objeto } = useFormulario<Libro>(new Libro("", 0, "", "", fechaVacia, 0, "", ""));

    const navegacion = useNavigate();
    const [fechaInicio, setFechaInicio] = useState(null);
    registerLocale("es", es);

    const obtenerElLibro = async () => {
        const url = miApiBack.URL + miApiBack.OBTENER_LIB + "/" + codigo;
        const LibroObtenido = await ServicioPrivado.peticionGET(url);
        objeto._id = LibroObtenido._id;
        objeto.nombreLibro = LibroObtenido.nombreLibro;
        objeto.autorLibro = LibroObtenido.autorLibro;
        objeto.generoLibro = LibroObtenido.generoLibro;
        objeto.fechaPublicacionLibro = LibroObtenido.fechaPublicacionLibro;
        objeto.cantidadPaginasLibro = LibroObtenido.cantidadPaginasLibro;
        //objeto.nombreImagencamisa=LibroObtenido.nombreImagencamisa;
        objeto.base64ImagenCamisa = LibroObtenido.base64ImagenCamisa;
        if (LibroObtenido) {
            setImageBase64(LibroObtenido.base64ImagenCamisa);
            setImagenMiniatura(LibroObtenido.base64ImagenCamisa);
            setNombreimagenTempo(LibroObtenido.nombreImagencamisa);
            setTodoListo(true);
          }
        if (LibroObtenido) {
            setTodoListo(true);
        }
    }

    {/*const obtenerElLibro = async () => {
        const urlCargarUnUsuario = miApiBack.OBTENER_LIB + "/" + codigo;
        const LibroObtenido = await ServicioPrivado.peticionGET(urlCargarUnUsuario);
        if (LibroObtenido) {
          objeto.nombreLibro = LibroObtenido.nombreLibro;
          objeto.autorLibro = LibroObtenido.autorLibro;
          objeto.generoLibro = LibroObtenido.generoLibro;
          // Input file es inmutable !!!. La siguiente linea no se puede habilitar
          // objeto.nombreImagenUsuario = LibroObtenido.nombreImagenUsuario;
          objeto.avatarUsuario = LibroObtenido.avatarUsuario;
          objeto.fechaPublicacionLibro = LibroObtenido.fechaPublicacionLibro;
          objeto.cantidadPaginasLibro = LibroObtenido.cantidadPaginasLibro;
          objeto.fechaPublicacionLibro = LibroObtenido.fechaPublicacionLibro;
    
          if (LibroObtenido) {
            setAvatarBase64(LibroObtenido.avatarUsuario);
            setImagenMiniatura(LibroObtenido.avatarUsuario);
            setNombreimagenTempo(LibroObtenido.nombreImagenUsuario);
            setTodoListo(true);
          }
        }
      };*/}

    {/*const cargaFinalizada = todoListo !== undefined;*/ }
    let cargaFinalizada = todoListo !== false;

    const cargarImagen = async (e: any) => {
        const archivos = e.target.files;
        const imagen = archivos[0];
        setImagenMiniatura(URL.createObjectURL(imagen));
        dobleEnlace(e);
        const base64 = await ConvertirBase64(imagen);
        setImageBase64(String(base64));
      };

    const enviarFormulario = async (fh: formHtml) => {
        fh.preventDefault();
        setEnProceso(true);

        const formulario = fh.currentTarget;
        formulario.classList.add("was-validated");

        if (formulario.checkValidity() === false) {
            fh.preventDefault();
            fh.stopPropagation();
        } else {

            const url = miApiBack.URL + miApiBack.MODIFICAR_LIB + "/" + codigo;
            objeto.base64ImagenCamisa = base64ImagenCamisa;
            objeto.base64ImagenCamisa = imgBase64;
            const objetoActualizar = new Libro(objeto._id, objeto.generoLibro, objeto.nombreLibro, objeto.autorLibro, objeto.fechaPublicacionLibro,
                objeto.cantidadPaginasLibro, nombreImagencamisa !== "" ? nombreImagencamisa : nombreimagenTempo, objeto.base64ImagenCamisa);
            const resultado = await ServicioPrivado.peticionPUT(url, objetoActualizar);
            console.log(objetoActualizar);
            console.log(resultado);

            if (resultado.objeto._id) {
                setEnProceso(false);
                navegacion("/home/admlib");
            } else {
                MensajeToastify("error", "fallo al editar elemento", 6000);
                // limpiar caja
            }

        }
    }

    useEffect(() => {
        obtenerElLibro()
    }, []);


    return (
        <main id="main" className="main">

            {/* Navegación estilo breadcrumb: Inicio */}
            <div className="pagetitle">
                <h1>Libro</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            {/*  <Link to="/home">Inicio</Link> */}
                        </li>
                        <li className="breadcrumb-item">
                            {/*  <Link to="/home/admbook">Administrar</Link> */}
                        </li>
                        <li className="breadcrumb-item active">Crear Libro</li>
                    </ol>
                </nav>
            </div>
            {/* Navegación estilo breadcrumb: Fin */}


            {/* Ejemplo de formulario: Inicio */}
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Formulario de creación</h5>
                        {cargaFinalizada ? (
                            <Form noValidate validated={enProceso} onSubmit={enviarFormulario}>
                                <Form.Group as={Row} className="mb-3" controlId="nombreLibro">
                                    <Form.Label column sm={2}>
                                        Nombre libro
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="nombreLibro"
                                            className="form-control"
                                            value={nombreLibro}
                                            onChange={dobleEnlace}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Nombre del libro es obligatorio
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="autorLibro">
                                    <Form.Label column sm={2}>
                                        Nombre autor
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="autorLibro"
                                            className="form-control"
                                            value={autorLibro}
                                            onChange={dobleEnlace}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Nombre del autor obligatorio
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="generoLibro">
                                    <Form.Label column sm={2}>
                                        Genero Libro
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Select
                                            size="sm"
                                            required
                                            name="generoLibro"
                                            value={generoLibro}
                                            onChange={dobleEnlace}
                                        >
                                            <option value="">Seleccione el genero</option>
                                            <option value={1}>Narrativo</option>
                                            <option value={2}>Lirico</option>
                                            <option value={3}>Dramático</option>
                                            <option value={4}>Didáctico</option>
                                        </Form.Select>
                                        <Form.Control.Feedback type="invalid">
                                            Nombre del autor obligatorio
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="fechaPublicacionLibro">
                                    <Form.Label column sm={2}>
                                        Fecha Publicacion Libro
                                    </Form.Label>
                                    <Col sm={10}>
                                        {<DatePicker
                                            required
                                            value={objeto.fechaPublicacionLibro + ""}
                                            selected={fechaInicio}
                                            onChange={(fechaSeleccionada: any) => {
                                                setFechaInicio(fechaSeleccionada);
                                                objeto.fechaPublicacionLibro = fechaSeleccionada;
                                            }}
                                            isClearable
                                            locale="es"
                                            dateFormat="dd/MM/YYYY"
                                            className="form-control form-control-sm"
                                        />}
                                        <Form.Control.Feedback type="invalid">
                                            Nombre del autor obligatorio
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="cantidadPaginasLibro">
                                    <Form.Label column sm={2}>
                                        Cantidad Paginas  Libro
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control
                                            required
                                            type="text"
                                            name="cantidadPaginasLibro"
                                            className="form-control"
                                            value={cantidadPaginasLibro}
                                            onChange={dobleEnlace}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Nombre del autor obligatorio
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>


                                <Form.Group
                                    as={Row}
                                    className="mb-3"
                                    controlId="nombreImagencamisa"
                                >
                                    <Form.Label column sm={3}>
                                        <div>
                                            <span className="text-success">Foto actual: </span>
                                            <span>
                                                <small>{nombreimagenTempo}</small>
                                            </span>
                                        </div>
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control
                                            size="sm"
                                            accept="image/png, image/jpeg"
                                            type="file"
                                            name="nombreImagencamisa"
                                            className="form-control"
                                            value={nombreImagencamisa}
                                            onChange={cargarImagen}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            Debe seleccionar un avatar para el usuario
                                        </Form.Control.Feedback>
                                    </Col>
                                </Form.Group>



                                <div className="mb-3 row">
                                    <div className="col-sm-3"></div>
                                    <div className="d-flex justify-content-center col-sm-9">
                                        <img
                                            onError={({ currentTarget }) => {
                                                currentTarget.onerror = null;
                                                currentTarget.src = noFoto;
                                            }}
                                            src={imagenMiniatura}
                                            alt="Profile"
                                            className="maxTamanoFoto"
                                        />
                                    </div>
                                </div>

                                <Form.Group className="mb-3">
                                    <div className="d-flex justify-content-center">
                                        <Button type="submit" className="col-md-4">Editar Libro</Button>
                                    </div>

                                </Form.Group>
                            </Form>
                        ) : (
                            <div>Cargando información para la edición</div>
                        )}


                    </div>

                </div>
            </div>
            {/* Ejemplo de formulario: Inicio */}


            {/* Requerido para presentar los mensajes Toast: Inicio */}
            <ToastContainer />
            {/* Requerido para presentar los mensajes Toast: Fin */}

        </main >
    );
};
