
import { useState } from "react";
import { Form, ToastContainer } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import RegistroUsuario from "../../modelos/RegistroUsuario";
import { useFormulario } from "../../utilidades/mishocks/useFormulario";
import * as cifrado from "js-sha512";
import ServiciosPublicos from "../../servicios/ServiciosPublicos";
import { MensajeToastify } from "../../utilidades/funciones/MensajeToastify";
import jwtDecode from "jwt-decode";

export const InicioSesion = () => {
  type formHtml = React.FormEvent<HTMLFormElement>;

  const navegacion = useNavigate();
  const [enProceso, setEnProceso] = useState<boolean>(false);

  let { correoUsuario, claveUsuario, dobleEnlace, objeto } = useFormulario(
    new RegistroUsuario("", "", "")
  )

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

      const resultado = await ServiciosPublicos.inicioSesion(objeto);

      if (resultado.tokenUSTA) {

        const objJWTRecibido = jwtDecode(resultado.tokenUSTA);
        console.log(objJWTRecibido);

        localStorage.setItem("tokenUSTA", resultado.tokenUSTA);
        navegacion("/home");
        setEnProceso(false);

      } else {
        MensajeToastify("error", "Fallo al iniciar sesion", 6000);
        limpiarCajas(formulario);
      }
    }
  }
  // funcion para limpiar cajas
  const limpiarCajas = (formulario: HTMLFormElement) => {
    formulario.reset();

    objeto.correoUsuario = "";
    objeto.claveUsuario = "";

    formulario.correoUsuario.value = "";
    formulario.claveUsuario.value = "";

    formulario.classList.remove("was-validated")
  }


  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a
                    href="index.html"
                    className="logo d-flex align-items-center w-auto"
                  >
                    <img src="assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">NiceAdmin</span>
                  </a>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        Accede con la Cuenta
                      </h5>
                      <p className="text-center small">
                        Ingrese Correo y Contraseña
                      </p>
                    </div>

                    <Form className="row g-3 needs-validation" noValidate
                      validated={enProceso}
                      onSubmit={enviarFormulario}>
                      <div className="col-12">
                        <Form.Group controlId="correoUsuario" >

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
                              type="text"
                              name="correoUsuario"
                              className="form-control"
                              required
                              value={correoUsuario}
                              onChange={dobleEnlace}
                            />
                            <Form.Control.Feedback type="invalid">
                              Ingresa el correo mompa
                            </Form.Control.Feedback>
                          </div>
                        </Form.Group>
                      </div>

                      <div className="col-12">
                        <Form.Group controlId="claveUsuario">

                          <Form.Label className="form-label">
                            Contraseña
                          </Form.Label>
                          <input
                            type="password"
                            name="claveUsuario"
                            className="form-control"
                            required
                            value={claveUsuario}
                            onChange={dobleEnlace}
                          />
                          <Form.Control.Feedback type="invalid">
                            Ingresa la contraseña mompa
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>


                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Acceder
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          Don't have account?
                          <Link to="/signup">Registo acá</Link>
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
        </section >
        <ToastContainer />
      </div >
    </main >
  );
};
