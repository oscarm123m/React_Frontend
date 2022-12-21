import { useNavigate } from "react-router-dom";

export const NoEncontrado = () => {
  const regresar = useNavigate();

  return (
    <main>
      <div className="container">
        <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>404</h1>
          <h2>The page you are looking for doesn't exist.</h2>
          <button
            className="btn"
            type="button"
            onClick={() => {
              regresar(-1);
            }}
          >
            Back to home
          </button>
          <img
            src="assets/img/not-found.svg"
            className="img-fluid py-5"
            alt="Page Not Found"
          />
          <div className="credits">
            Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
          </div>
        </section>
      </div>
    </main>
  );
};
