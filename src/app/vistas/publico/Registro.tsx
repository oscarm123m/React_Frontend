import { useState } from "react";
import { Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import RegistroUsuario from "../../modelos/RegistroUsuario";
import { useFormulario } from "../../utilidades/mishocks/useFormulario";

import * as cifrado from "js-sha512";
import { ToastContainer } from "react-toastify";
import ServiciosPublicos from "../../servicios/ServiciosPublicos";
import jwtDecode from "jwt-decode";
import { MensajeToastify } from "../../utilidades/funciones/MensajeToastify";

export const Registro = () => {
  type formHtml = React.FormEvent<HTMLFormElement>;

  const navegacion = useNavigate();

  const [enProceso, setEnProceso] = useState<boolean>(false);

  let { nombreUsuario, correoUsuario, claveUsuario, dobleEnlace, objeto } =
    useFormulario<RegistroUsuario>(new RegistroUsuario("", "", ""));

  // funcion enviar Formulario
  const enviarFormulario = async (fh: formHtml) => {
    fh.preventDefault();
    setEnProceso(true);
    const formulario = fh.currentTarget;
    formulario.classList.add("was-validated");

    if (formulario.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      const claveCifrada = cifrado.sha512(objeto.claveUsuario);
      objeto.claveUsuario = claveCifrada;

      const resultado = await ServiciosPublicos.registrarUsuario(objeto);

      if (resultado.tokenUSTA) {
        const objJWTRecibido: any = jwtDecode(resultado.tokenUSTA);
        console.log(objJWTRecibido);

        localStorage.setItem("tokenUSTA", resultado.tokenUSTA);
        navegacion("/home");
        setEnProceso(false);
      } else {
        limpiarCajas(formulario);
        MensajeToastify("error", "Fallo al realizar el registro", 5000);
      }
    }
  };

  // funcion para limpiar cajas
  const limpiarCajas = (formulario: HTMLFormElement) => {
    formulario.reset();

    objeto.nombreUsuario = "";
    objeto.correoUsuario = "";
    objeto.claveUsuario = "";

    formulario.nombreUsuario.value = "";
    formulario.correoUsuario.value = "";
    formulario.claveUsuario.value = "";

    formulario.classList.remove("was-validated");

  }


  return (
    <main>
      <div className="container">

        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <Link
                    to="/"
                    className="logo d-flex align-items-center w-auto"
                  >
                    <img src="assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">React Usta 2022</span>
                  </Link>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Crear Cuenta
                      </h5>
                      <p className="text-center small">
                        Complete la siguiente información personal
                      </p>
                    </div>

                    <Form
                      className="row g-3 "
                      noValidate
                      validated={enProceso}
                      onSubmit={enviarFormulario}
                    >
                      <div className="col-12">
                        <Form.Group controlId="nombreUsuario">
                          <Form.Label className="form-label">
                            Nombre Completo
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="nombreUsuario"
                            className="form-control"
                            value={nombreUsuario}
                            onChange={dobleEnlace}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Porfavor ingrese el nombre completo
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>

                      <div className="col-12">
                        <Form.Group controlId="correoUsuario">
                          <Form.Label className="form-label">
                            Correo Electrónico
                          </Form.Label>
                          <div className="input-group has-validation">
                            <span
                              className="input-group-text"
                              id="inputGroupPrepend"
                            >
                              @
                            </span>
                            <Form.Control
                              type="email"
                              name="correoUsuario"
                              className="form-control"
                              value={correoUsuario}
                              onChange={dobleEnlace}
                              required
                            />
                            <Form.Control.Feedback type="invalid">
                              Porfavor ingrese Correo Electrónico
                            </Form.Control.Feedback>
                          </div>
                        </Form.Group>
                      </div>

                      <div className="col-12">
                        <Form.Group controlId="claveUsuario">
                          <Form.Label className="form-label">
                            Contraseña
                          </Form.Label>
                          <Form.Control
                            type="password"
                            name="claveUsuario"
                            className="form-control"
                            value={claveUsuario}
                            onChange={dobleEnlace}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Ingrese la Contraseña
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>

                      <div className="col-12">
                        <Form.Group controlId="reClaveUsuario">
                          <Form.Label className="form-label">
                            Confirme Contraseña
                          </Form.Label>

                          <input
                            type="password"
                            name="reClaveUsuario"
                            className="form-control"
                            pattern={claveUsuario}
                            required
                          />
                          <Form.Control.Feedback type="invalid">
                            Las Contraseñas no coinciden
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Registrar Usuario
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          Ya tienes una Cuenta?{" "}
                          <Link to="/signin"> Inicia Sesion</Link>
                        </p>
                      </div>
                    </Form>
                  </div>
                </div>

                <div className="credits">
                  Designed by{" "}
                  <a href="https://bootstrapmade.com/">BootstrapMade</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ToastContainer />
      </div>
    </main>
  );
};
