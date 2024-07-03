import { RequestsAPI } from "../RequestsAPI.js";
import { obtenerValorInput, imprimir, validarSesion } from "../utils/helpers.js";

validarSesion();
const botonLogin = document.querySelector("#form-login-submit");

botonLogin.addEventListener("click", () => {
    const email = obtenerValorInput("form-login-email");
    const password = obtenerValorInput("form-login-password");

    RequestsAPI.login(email, password)
        .then((data => {
            sessionStorage.setItem("session", data.session);
            sessionStorage.setItem("user", JSON.stringify(data.user));
            document.location.replace("home.html");
        }))
        .catch((error) => {
            console.error(error);
            imprimir("form-login-error", error);
        })
})