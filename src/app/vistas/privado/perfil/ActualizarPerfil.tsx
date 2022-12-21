import { useEffect, useState } from "react";
import { Form, ToastContainer } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import Perfil from "../../../modelos/Perfil";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";
import { useFormulario } from "../../../utilidades/mishocks/useFormulario";

export const ActualizarPerfil = () => {
    type formHtml = React.FormEvent<HTMLFormElement>;

    let { codigo } = useParams();

    const [enProceso, setEnProceso] = useState<boolean>(false);
    const [todoListo, setTodoListo] = useState<boolean>(false);

    let { nombrePerfil, dobleEnlace, objeto } = useFormulario(new Perfil("", ""));

    const navegacion = useNavigate();

    const obtenerElPerfil = async () => {
        const url = miApiBack.URL + miApiBack.OBTENER_PERFIL + "/" + codigo;
        const perfilObtenido = await ServicioPrivado.peticionGET(url);
        objeto._id = perfilObtenido._id;
        objeto.nombrePerfil = perfilObtenido.nombrePerfil;
        if (perfilObtenido) {
            setTodoListo(true);
        }
    }

    const cargaFinalizada = todoListo !== undefined;

    const enviarFormulario = async (fh: formHtml) => {
        fh.preventDefault();
        setEnProceso(true);

        const formulario = fh.currentTarget;

        if (formulario.checkValidity() === false) {
            fh.preventDefault();
            fh.stopPropagation();
        } else {

            const url = miApiBack.URL + miApiBack.MODIFICAR_PERFILES + "/" + codigo;
            const resultado = await ServicioPrivado.peticionPUT(url, objeto);

            if (resultado.objeto._id) {
                setEnProceso(false);
                navegacion("/home/admprofile");
            } else {
                MensajeToastify("error", "fallo al editar elemento", 6000);
                // limpiar caja
            }

        }
    }

    useEffect(() => {
        obtenerElPerfil()
    }, []);


    return (
        <main id="main" className="main">
            {/* INICIO: BREADCRUM */}
            <div className="pagetitle">
                <h1>Listado de Perfiles</h1>

                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item"> Perfiles</li>
                        <li className="breadcrumb-item"> <Link to="/home/admprofile">
                            Administrar</Link> </li>
                        <li className="breadcrumb-item active"> Actualizar</li>
                    </ol>
                </nav>
            </div>
            {/* FIN: BREADCRUM */}
            <div className="col-md-12">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Formulario Edicion</h5>
                        {cargaFinalizada ? (
                            <Form noValidate validated={enProceso}
                                onSubmit={enviarFormulario}>
                                <Form.Group controlId="nombrePerfil">
                                    <Form.Label>
                                        Nombre Perfil
                                    </Form.Label>

                                    <Form.Control
                                        type="text"
                                        name="nombrePerfil"
                                        className="form-control"
                                        required
                                        value={nombrePerfil}
                                        onChange={dobleEnlace}
                                    />

                                    <Form.Control.Feedback type="invalid">
                                        Nombre Perfil obligatorio
                                    </Form.Control.Feedback>

                                </Form.Group>
                                <br />
                                <div className="d-flex justify-content-center">
                                    <div className="col-4">
                                        <button className="btn btn-primary w-100" type="submit">
                                            GUARDAR
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        ) :
                            <div>
                                cargando información para Editar
                            </div>

                        }

                    </div>
                </div>
                <ToastContainer />
            </div>


        </main>
    );
};
