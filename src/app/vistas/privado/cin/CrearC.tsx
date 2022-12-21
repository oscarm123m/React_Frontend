import { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Form, ToastContainer } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import ServicioPrivado from "../../../servicios/ServicioPrivado";
import miApiBack from "../../../utilidades/dominios/miApiBack";
import { MensajeToastify } from "../../../utilidades/funciones/MensajeToastify";
import { useFormulario } from "../../../utilidades/mishocks/useFormulario";
import Cine from "../../../modelos/Cine";
import { ConvertirBase64 } from "../../../utilidades/funciones/ConvertirBase64";
import noFoto from "../../../../assets/images/no-image.png";
import Ciudad from "../../../modelos/Ciudad";
import Empresa from "../../../modelos/Empresa";

export const CrearC = () => {
    type formHtml = React.FormEvent<HTMLFormElement>;

    

    let { codigo } = useParams();
    const [todoListo, setTodoListo] = useState<boolean>(false);

    const [enProceso, setEnProceso] = useState<boolean>(false);

    let { ciudad, empresa, nombre, dobleEnlace, objeto } = useFormulario<Cine>(new Cine("", "", "", ""));
    const [arregloCiudad, setArregloCiudad] = useState<Ciudad[]>([]);
    const [arregloEmpresa, setArregloEmpresa] = useState<Empresa[]>([]);
    
    const [arregloCine, setArregloCine] = useState<Cine[]>([]);

    const navegacion = useNavigate();



    const enviarFormulario = async (fh: formHtml) => {
        fh.preventDefault();
        setEnProceso(true);

        const formulario = fh.currentTarget;



        if (formulario.checkValidity() === false) {
            fh.preventDefault();
            fh.stopPropagation();
        } else {

            const url = miApiBack.URL + miApiBack.AGREGAR_CIN;

            const resultado = await ServicioPrivado.peticionPOST(url, objeto);
            console.log(resultado);
            console.log(objeto);

            if (resultado.objeto._id) {
                setEnProceso(false);
                navegacion("/home/listcin");
            } else {
                MensajeToastify("error", "fallo al editar elemento", 6000);
                // limpiar caja
            }

        }
    }

    const obtenerCiudades = async () => {
        const url = miApiBack.URL + miApiBack.OBTENER_Ciudad;
        const resultado = await ServicioPrivado.peticionGET(url);
        setArregloCiudad(resultado);
        if (resultado) { setTodoListo(true); }
      };

      const obtenerEmpresa = async () => {
        const url = miApiBack.URL + miApiBack.OBTENER_Empresa;
        const resultado = await ServicioPrivado.peticionGET(url);
        setArregloEmpresa(resultado);
        if (resultado) { setTodoListo(true); }
      };

    useEffect(() => {
        obtenerCiudades()
        obtenerEmpresa()
    }, [])




    return (
        <main id="main" className="main">
            {/* INICIO: BREADCRUM */}
            <div className="pagetitle">
                <h1>Crear Cines</h1>

                <nav>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="/home">Inicio</Link>
                        </li>
                        <li className="breadcrumb-item"> Cines</li>
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
                        <h5 className="card-title">Formulario Crear Cines</h5>

                        <Form noValidate validated={enProceso}
                            onSubmit={enviarFormulario}>

                            <Form.Group as={Row} className="mb-3" controlId="ciudad">
                                <Form.Label column sm={2}>
                                    ciudad
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Select
                                        size="sm"
                                        required
                                        name="ciudad"
                                        value={ciudad}
                                        onChange={dobleEnlace}>


                                        <option>Seleccione una ciudad</option>
                                        {arregloCiudad.map((miCiudad: Ciudad) => (
                                            <option key={miCiudad.nombre}
                                                value={miCiudad.nombre}>
                                                {miCiudad.nombre}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Seleccione el tipo de ciudad
                                    </Form.Control.Feedback>
                                </Col>
                            </Form.Group>


                            <Form.Group as={Row} className="mb-3" controlId="ciudad">
                                <Form.Label>
                                    <span className="rojo">*</span>empresa
                                </Form.Label>
                                <Form.Select
                                    size="sm"
                                    required
                                    name="empresa"
                                    value={empresa}
                                    onChange={dobleEnlace}>


                                    <option>Seleccione una empresa</option>
                                    {arregloEmpresa.map((miEmpresa, indice) => (
                                        <option key={indice}
                                            value={miEmpresa.nombre}>
                                            {miEmpresa.nombre}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">
                                    Seleccione el tipo de empresa
                                </Form.Control.Feedback>

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
                                    nombre del cine obligatorio
                                </Form.Control.Feedback>

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


        </main >
    );
};
