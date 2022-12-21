import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormulario } from "../../../utilidades/mishocks/useFormulario";
import noFoto from "../../../../assets/images/no-image.png";
import Libro from "../../../modelos/Libro";
import { ConvertirBase64 } from "../../../utilidades/funciones/ConvertirBase64";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import es from 'date-fns/locale/es';
import { Button, Col, Form, Row } from "react-bootstrap";


export const CrearLibro = () => {
    type formHtml = React.FormEvent<HTMLFormElement>;

    const [imagenMiniatura, setImagenMiniatura] = useState(noFoto);
    const [imgBase64, setImageBase64] = useState<string>("");
    const fechaVacia=new Date();

    let { codigo } = useParams();

    const [enProceso, setEnProceso] = useState<boolean>(false);

    let { nombreLibro, autorLibro, generoLibro, fechaPublicacionLibro, cantidadPaginasLibro, nombreImagencamisa, dobleEnlace, objeto } = useFormulario<Libro>(new Libro("", 0, "", "", fechaVacia, 0, "", ""));

    const navegacion = useNavigate();
    const [fechaInicio, setFechaInicio]=useState(null);
    registerLocale("es",es);

    const cargarImagen = async(e:any)=>{
        const archivos = e.target.files;
        const imagen = archivos[0];
  
        setImagenMiniatura(URL.createObjectURL(imagen));
        dobleEnlace(e);
        const miBase64 = await ConvertirBase64(imagen);
  
        setImageBase64(String(miBase64));
      }



    const enviarFormulario = async (fh: formHtml) => {
        fh.preventDefault();
        setEnProceso(true);

        const formulario = fh.currentTarget;

        formulario.classList.add("was-validated");

        if (formulario.checkValidity() === false) {
            fh.preventDefault();
            fh.stopPropagation();
        } else {

            const url = miApiBack.URL + miApiBack.AGREGAR_LIB;
            objeto.base64ImagenCamisa = imgBase64;
            const resultado = await ServicioPrivado.peticionPOST(url, objeto);
            console.log(objeto);
            console.log(resultado);
            console.log(objeto);

            if (resultado.objeto._id) {
                setEnProceso(false);
                navegacion("/home/listlib");
            } else {
                MensajeToastify("error", "fallo al editar elemento", 6000);
                // limpiar caja
            }

        }
    }
    return (
        <main id="main" className="main">

            {/* Navegación estilo breadcrumb: Inicio */}
            <div className="pagetitle">
                <h1>Perfiles</h1>
                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="index.html">Inicio</a>
                        </li>
                        <li className="breadcrumb-item active">Crear perfil</li>
                    </ol>
                </nav>
            </div>
            {/* Navegación estilo breadcrumb: Fin */}


            {/* Ejemplo de formulario: Inicio */}
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Formulario de creación</h5>

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
                                    <DatePicker
                                        required
                                        selected={fechaInicio}
                                        onChange={(fechaSeleccionada: any) => {
                                            setFechaInicio(fechaSeleccionada);
                                            objeto.fechaPublicacionLibro = fechaSeleccionada;
                                        }}
                                        isClearable
                                        locale="es"
                                        dateFormat="yyyy-MM-dd"
                                        className="form-control form-control-sm"
                                    />
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


                            <Form.Group as={Row} className="mb-3" controlId="nombreImagencamisa" >
                                <Form.Label column sm={2}>
                                    Imagen Libro
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control
                                        type="file"
                                        className="form-control"
                                        name="nombreImagencamisa"
                                        value={nombreImagencamisa}
                                        onChange={cargarImagen}
                                        required />
                                    <Form.Control.Feedback type="invalid">
                                        Nombre del autor obligatorio
                                    </Form.Control.Feedback>
                                </Col >

                            </Form.Group>

                            <div className="mb-3">
                                <div className="d-flex justify-content-center">
                                    <img src={imagenMiniatura} alt="no foto" className="tamanoMaximoNoFoto imagen" />
                                </div>
                            </div>

                            <Form.Group className="mb-3">
                                <div className="d-flex justify-content-center">
                                    <Button type="submit" className="col-md-4">Crear Libro</Button>
                                </div>

                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
            {/* Ejemplo de formulario: Inicio */}


            {/* Requerido para presentar los mensajes Toast: Inicio */}
            {/*   <ToastContainer /> */}
            {/* Requerido para presentar los mensajes Toast: Fin */}

        </main>
    );
};
