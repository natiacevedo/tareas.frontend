import {validarSesion, obtenerValorInput, imprimir} from "../utils/helpers.js";
import {RequestsAPI} from "../RequestsAPI.js";
validarSesion();

  document
    .querySelector("#form-register-submit")
    .addEventListener("click", () => {
      const nombre = obtenerValorInput("form-register-name");
      const apellido = obtenerValorInput("form-register-lastname");
      const email = obtenerValorInput("form-register-email");
      const password = obtenerValorInput("form-register-password");
  
      if (!nombre || !apellido || !email || !password) {
        imprimir("form-register-error", "Por favor complete todos los campos");
        return;
      }
  
      const body = JSON.stringify({ nombre, apellido, email, password });
      RequestsAPI.register(body)
        .then(() => {
          document.location.replace("home.html");
        })
        .catch((error) => {
          imprimir("form-register-error", error);
        });
    });