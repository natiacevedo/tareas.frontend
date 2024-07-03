import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, obtenerValorInput, validarSesion } from "../utils/helpers.js";

validarSesion()

document.querySelector("#boton-nueva-tarea").addEventListener("click", () => {
    const asunto = obtenerValorInput("nuevo-asunto");
    const equipo = obtenerValorInput("nuevo-equipo");
    const usuario = obtenerValorInput("nuevo-usuario");
    const fecha = obtenerValorInput("nueva-fecha");
    const prioridad = obtenerValorInput("nueva-prioridad");
    const desc = obtenerValorInput("nueva-desc");
    const estado = obtenerValorInput("nuevo-estado");
    
    if (!asunto || !equipo || !usuario || !fecha || !prioridad || !desc || !estado) {
        imprimir("nueva-tarea-error", "Faltan campos por rellenar");
        return;
    }

    RequestsAPI.postTarea(asunto, equipo, usuario, fecha, prioridad, desc, estado)
    .then(() => {
        document.location.replace("home.html");
    })
    .catch((error) => {
        imprimir("nueva-tarea-error", "No se pudo agregar la tarea.");
    });
})