import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Bienvenida } from "../../contenedores/Bienvenida";
import { NoEncontrado } from "../../vistas/compartidas/NoEncontrado";
import RutasPrivadas from "./RutasPrivadas";

const RecursoNoEncontrado = lazy(() =>
  import("../../vistas/compartidas/NoEncontrado").then(() => ({
    default: NoEncontrado,
  }))
);

const LazyBienvenida = lazy(() =>
  import("../../contenedores/Bienvenida").then(() => ({ default: Bienvenida }))
);

export const RuteoTablero = () => {
  return (
    <Suspense>
      <Routes>
        {RutasPrivadas.map((ruta: any, indice: number) => {
          return (
            ruta.element && (
              <Route
                key={indice}
                path={ruta.path}
                element={<ruta.element />}
              ></Route>
            )
          );
        })}

        <Route path="/" element={<LazyBienvenida />}></Route>
        <Route path="*" element={<RecursoNoEncontrado />}></Route>
      </Routes>
    </Suspense>
  );
};
