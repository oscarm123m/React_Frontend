import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

type propsVigilante = { children?: any };

export const Vigilante = ({ children }: propsVigilante) => {
  if (localStorage.getItem("tokenUSTA")) {
    const elToken = String(localStorage.getItem("tokenUSTA"));
    try {
      jwtDecode(elToken);
    } catch {
      <Navigate to="/" />;
    }
  } else {
    return <Navigate to="/" />;
  }

  return children ? children : <Outlet />;
};
