import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, ToastContainer } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Hamburguesa from "../../../modelos/Hamburguesa";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";
import { useFormulario } from "../../../utilidades/mishocks/useFormulario";

export const CrearH = () => {
    type formHtml = React.FormEvent<HTMLFormElement>;

    let { codigo } = useParams();

    const [enProceso, setEnProceso] = useState<boolean>(false);

    let { tipo, precio, disponibilidad, dobleEnlace, objeto } = useFormulario(new Hamburguesa("", "", "", ""));

    const navegacion = useNavigate();



    const enviarFormulario = async (fh: formHtml) => {
        fh.preventDefault();
        setEnProceso(true);

        const formulario = fh.currentTarget;

        if (formulario.checkValidity() === false) {
            fh.preventDefault();
            fh.stopPropagation();
        } else {

            const url = miApiBack.URL + miApiBack.AGREGAR_HAM;
            const resultado = await ServicioPrivado.peticionPOST(url, objeto);

            if (resultado.objeto._id) {
                setEnProceso(false);
                navegacion("/home/listham");
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
                                        <option value={1}>Big chiquita</option>
                                        <option value={2}>Pequeña pero grande</option>
                                        <option value={3}>Jaguayana</option>
                                        <option value={4}>Vegetariana</option>
                                        <option value={5}>Sólida</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Seleccione el tipo de ham
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} className="mb-3" controlId="disponibilidad">
                                <Form.Label column sm={2}>
                                    Dsisponibilidad
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Select
                                        required
                                        name="disponibilidad"
                                        value={disponibilidad}
                                        onChange={dobleEnlace}
                                    >
                                        <option value="">Seleccione la disponibilidad</option>
                                        <option value={1}>SI</option>
                                        <option value={2}>NO</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Seleccione el disponibilidad de la ham
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>

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
