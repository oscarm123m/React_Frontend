import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, ToastContainer } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";
import { useFormulario } from "../../../utilidades/mishocks/useFormulario";
import Video from "../../../modelos/Video";
import {ConvertirBase64} from "../../../utilidades/funciones/ConvertirBase64";
import noFoto from "../../../../assets/images/no-image.png";

export const CrearV = () => {
    type formHtml = React.FormEvent<HTMLFormElement>;

    const [imagenMiniatura, setImagenMiniatura] = useState(noFoto);
    const [imgBase64, setImageBase64] = useState<string>("");

    let { codigo } = useParams();

    const [enProceso, setEnProceso] = useState<boolean>(false);

    let { tipo, nombre, desarrollador, ao, precio, nombreImagencamisa, dobleEnlace, objeto } = useFormulario<Video>(new Video("", "", "", "", "", "", "", ""));

    const navegacion = useNavigate();

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

        

        if (formulario.checkValidity() === false) {
            fh.preventDefault();
            fh.stopPropagation();
        } else {

            const url = miApiBack.URL + miApiBack.AGREGAR_VID;
            objeto.base64ImagenCamisa = imgBase64;
            const resultado = await ServicioPrivado.peticionPOST(url, objeto);
            console.log(resultado);
            console.log(objeto);

            if (resultado.objeto._id) {
                setEnProceso(false);
                navegacion("/home/listvid");
            } else {
                MensajeToastify("error", "fallo al editar elemento", 6000);
                // limpiar caja
            }

        }
    }




    return (
        <main id="main" className="main">
            {/* INICIO: BREADCRUM */}
            <div className="pagetitle">
                <h1>Crear Perfil</h1>

                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item"> Hamburguesas</li>
                        <li className="breadcrumb-item"> <Link to="/home/admprofile">
                            Administrar</Link> </li>
                        <li className="breadcrumb-item active"> Crear</li>
                    </ol>
                </nav>
            </div>
            {/* FIN: BREADCRUM */}
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Formulario Crear hamburguesa</h5>

                        <Form noValidate validated={enProceso}
                            onSubmit={enviarFormulario}>
                            <Form.Group controlId="precio">
                                <Form.Label>
                                    Precio
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    name="precio"
                                    className="form-control"
                                    required
                                    value={precio}
                                    onChange={dobleEnlace}
                                />

                                <Form.Control.Feedback type="invalid">
                                    precio Ham obligatorio
                                </Form.Control.Feedback>

                            </Form.Group>


                            <Form.Group as={Row} className="mb-3" controlId="tipo">
                                <Form.Label column sm={2}>
                                    Tipo
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Select
                                        required
                                        name="tipo"
                                        value={tipo}
                                        onChange={dobleEnlace}
                                    >
                                        <option value="">Seleccione el tipo</option>
                                        <option value={1}>Arcade</option>
                                        <option value={2}>Simulación</option>
                                        <option value={3}>Estrategia</option>
                                        <option value={4}>Deportes</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Seleccione el tipo de video
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>



                            <Form.Group controlId="nombre">
                                <Form.Label>
                                    nombre
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    name="nombre"
                                    className="form-control"
                                    required
                                    value={nombre}
                                    onChange={dobleEnlace}
                                />

                                <Form.Control.Feedback type="invalid">
                                    nombre Ham obligatorio
                                </Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group controlId="desarrollador">
                                <Form.Label>
                                    desarrollador
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    name="desarrollador"
                                    className="form-control"
                                    required
                                    value={desarrollador}
                                    onChange={dobleEnlace}
                                />

                                <Form.Control.Feedback type="invalid">
                                    desarrollador Ham obligatorio
                                </Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group controlId="ao">
                                <Form.Label>
                                    año
                                </Form.Label>

                                <Form.Control
                                    type="text"
                                    name="ao"
                                    className="form-control"
                                    required
                                    value={ao}
                                    onChange={dobleEnlace}
                                />

                                <Form.Control.Feedback type="invalid">
                                    año obligatorio
                                </Form.Control.Feedback>

                            </Form.Group>

                            <Form.Group controlId="nombreImagencamisa">
                                <Form.Label>
                                    <span></span>Imagen video
                                </Form.Label>
                                <Form.Control
                                    size="sm"
                                    required
                                    type="file"
                                    name="nombreImagencamisa"
                                    onChange={cargarImagen}
                                />
                            </Form.Group>
                            <div className="mb-3">
                                <div className="d-flex justify-content-center">
                                    <img src={imagenMiniatura} alt="no image" className="tamanoMaximoNoFoto imagen" />
                                </div>
                            </div>

                            <br />
                            <div className="d-flex justify-content-center">
                                <div className="col-4">
                                    <button className="btn btn-primary w-100" type="submit">
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </Form>




                    </div>
                </div>
                <ToastContainer />
            </div>


        </main>
    );
};
