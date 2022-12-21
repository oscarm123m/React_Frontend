import React, { Suspense } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { RuteoCompleto } from "./app/utilidades/rutas/RuteoCompleto";

function App() {
  return (
    <BrowserRouter>
      <Suspense>
        <RuteoCompleto></RuteoCompleto>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
