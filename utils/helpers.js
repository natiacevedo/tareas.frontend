import { RequestsAPI } from "../RequestsAPI.js";

export const obtenerValorInput = (idInput) => 
    document.getElementById(idInput).value;

export const imprimir = (elemento, contenido) => {
    document.querySelector(`#${elemento}`).innerHTML = contenido
}

export const validarSesion = () => {
    const usuarioLogueado = sessionStorage.getItem("session");
    const estaEnLogin = document.location.pathname.includes("index.html");
    const estaEnRegister = document.location.pathname.includes("index.html");
    
    const estaEnPaginaPublica = estaEnLogin || estaEnRegister;
    
    if (usuarioLogueado) {
        if(estaEnPaginaPublica) {
            document.location.replace("home.html");
        }
    } else {
        if (!estaEnPaginaPublica) {
        document.location.replace("home.html");
    }
    }
}

export const eventoClickCerrarSesion = () => {
    const cerrarSesion = document.querySelector("#boton-logout").addEventListener("click", () => {
        sessionStorage.removeItem("session");
        RequestsAPI.logout().then(() => {
            document.location.replace("index.html");
        })
    })
}

export const aplicarNombreUsuario = () => {
    const usuario = JSON.parse(sessionStorage.getItem("user"));
    if (usuario && usuario.nombre) {
        const nombreCapitalizado = usuario.nombre.charAt(0).toUpperCase() + usuario.nombre.slice(1);
        const usuarioElemento = document.querySelector(".usuario");
        
        usuarioElemento.innerHTML = `<i class="fas fa-user"></i> ${nombreCapitalizado}`;
    }
}