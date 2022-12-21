import { Link } from "react-router-dom";

export const MenuLateral = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link to="/home" className="nav-link collapsed">
            <i className="bi bi-grid"></i>
            <span>Inicio</span>
          </Link>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            href="/#"
            aria-expanded="true"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Usuarios</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="tables-nav"
            className="nav-content collapse show"
            data-bs-parent="#sidebar-nav"
            style={{}}
          >
            <li>
              <Link to="/home/listuser">
                <i className="bi bi-circle"></i>
                <span>Listar Usuarios</span>
              </Link>
            </li>
            <li>
              <Link to="/home/admuser">
                <i className="bi bi-circle"></i>
                <span>Administrar Usuarios</span>
              </Link>
            </li>

            <li>
              <Link to="/home/adduser">
                <i className="bi bi-circle"></i>
                <span>Crear Usuarios</span>
              </Link>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            href="/#"
            aria-expanded="true"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Perfiles</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="tables-nav"
            className="nav-content collapse show"
            data-bs-parent="#sidebar-nav"
            style={{}}
          >
            <li>
              <Link to="/home/listprofile">
                <i className="bi bi-circle"></i>
                <span>Listar Perfiles</span>
              </Link>
            </li>
            <li>
              <Link to="/home/admprofile">
                <i className="bi bi-circle"></i>
                <span>Administrar Perfiles</span>
              </Link>
            </li>

            <li>
              <Link to="/home/addprofile">
                <i className="bi bi-circle"></i>
                <span>Crear Perfiles</span>
              </Link>
            </li>
          </ul>
          
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            href="/#"
            aria-expanded="true"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>VideoJuegos</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="tables-nav"
            className="nav-content collapse show"
            data-bs-parent="#sidebar-nav"
            style={{}}
          >
            <li>
              <Link to="/home/listvid">
                <i className="bi bi-circle"></i>
                <span>Listar Video</span>
              </Link>
            </li>
            <li>
              <Link to="/home/admvid">
                <i className="bi bi-circle"></i>
                <span>Administrar video</span>
              </Link>
            </li>

            <li>
              <Link to="/home/addvid">
                <i className="bi bi-circle"></i>
                <span>Crear video</span>
              </Link>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            href="/#"
            aria-expanded="true"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Libros</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="tables-nav"
            className="nav-content collapse show"
            data-bs-parent="#sidebar-nav"
            style={{}}
          >
            <li>
              <Link to="/home/listlib">
                <i className="bi bi-circle"></i>
                <span>Listar Libros</span>
              </Link>
            </li>

            <li>
              <Link to="/home/addlib">
                <i className="bi bi-circle"></i>
                <span>Crear Libros</span>
              </Link>
            </li>
            <li>
              <Link to="/home/admlib">
                <i className="bi bi-circle"></i>
                <span>Administrar Libros</span>
              </Link>
            </li>
          </ul>
        </li>


        <li className="nav-item">
          <a
            className="nav-link"
            data-bs-target="#tables-nav"
            data-bs-toggle="collapse"
            href="/#"
            aria-expanded="true"
          >
            <i className="bi bi-layout-text-window-reverse"></i>
            <span>Cines</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="tables-nav"
            className="nav-content collapse show"
            data-bs-parent="#sidebar-nav"
            style={{}}
          >
            <li>
              <Link to="/home/listcin">
                <i className="bi bi-circle"></i>
                <span>Listar Cines</span>
              </Link>
            </li>

            <li>
              <Link to="/home/addcin">
                <i className="bi bi-circle"></i>
                <span>Crear Cines</span>
              </Link>
            </li>
            <li>
              <Link to="/home/admcin">
                <i className="bi bi-circle"></i>
                <span>Administrar Cines</span>
              </Link>
            </li>
          </ul>
        </li>

      </ul>
    </aside>
  );
};
