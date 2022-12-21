import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { TableroPrincipal } from "../../contenedores/TableroPrincipal";
import { Registro } from "../../vistas/publico/Registro";
import { InicioSesion } from "../../vistas/publico/InicioSesion";
import { NoEncontrado } from "../../vistas/compartidas/NoEncontrado";
import { Vigilante } from "../../seguridad/Vigilante";

const LazyRegistro = lazy(() =>
  import("../../vistas/publico/Registro").then(() => ({
    default: Registro,
  }))
);

const LazyInicio = lazy(() =>
  import("../../vistas/publico/InicioSesion").then(() => ({
    default: InicioSesion,
  }))
);

const LazyNoEncontrado = lazy(() =>
  import("../../vistas/compartidas/NoEncontrado").then(() => ({
    default: NoEncontrado,
  }))
);

const LazyTableroPrincipal = lazy(() =>
  import("../../contenedores/TableroPrincipal").then(() => ({
    default: TableroPrincipal,
  }))
);

export const RuteoCompleto = () => {
  return (
    <Routes>
      <Route path="/" element={<LazyInicio />} />

      <Route path="/signup" element={<LazyRegistro />} />

      <Route element={<Vigilante />}>
        <Route path="/home/*" element={<LazyTableroPrincipal />} />
      </Route>

      <Route path="/*" element={<LazyNoEncontrado />} />
    </Routes>
  );
};
