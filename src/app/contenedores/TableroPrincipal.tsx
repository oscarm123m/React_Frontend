import { Cabecera } from "./Cabecera";
import { MenuLateral } from "./MenuLateral";
import { RuteoTablero } from "../utilidades/rutas/RuteoTablero";

export const TableroPrincipal = () => {
  return (
    <div>
      <Cabecera />
      <MenuLateral />
      <RuteoTablero />
    </div>
  );
};
