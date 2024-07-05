import {validarSesion, obtenerValorInput, imprimir} from "../utils/helpers.js";
import {RequestsAPI} from "../RequestsAPI.js";

validarSesion();

  document
    .querySelector("#form-register-submit")
    .addEventListener("click", () => {
      const nombre = obtenerValorInput("form-register-name");
      const email = obtenerValorInput("form-register-email");
      const password = obtenerValorInput("form-register-password");
  
      if (!nombre || !email || !password) {
        imprimir("form-register-error", "Por favor complete todos los campos");
        return;
      }
  
    const body = JSON.stringify({ nombre, email, password });
    RequestsAPI.register(body)
      .then(() => {
          console.log("Registro exitoso");
          imprimir("form-register-success", "Registro exitoso, ya puedes iniciar sesión.");
      })
      .catch((error) => {
        imprimir("form-register-error", error);
      });
  });