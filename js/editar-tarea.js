import { validarSesion, imprimir, obtenerValorInput, aplicarNombreUsuario } from "../utils/helpers.js";
import { RequestsAPI } from "../RequestsAPI.js";

validarSesion();
aplicarNombreUsuario();

const params = new URLSearchParams(window.location.search);
const idTarea = params.get("id");

const mostrarError = (error) => {
    imprimir("editar-mascota-error", error);
}

const  popularCampos = (data) => {
    document.querySelector("#editar-asunto").value = data.asunto;
    document.querySelector("#editar-equipo").value = data.equipo;
    document.querySelector("#editar-usuario").value = data.usuario;
    document.querySelector("#editar-fecha").value = data.fechaEntrega;
    document.querySelector("#editar-prioridad").value = data.prioridad;
    document.querySelector("#editar-desc").value = data.descripcion;
    document.querySelector("#editar-estado").value = data.estado;
}

RequestsAPI.getTarea(idTarea)
.then(popularCampos)
.catch((error) => {
    mostrarError(error);
});

document.querySelector("#boton-actualizar-tarea").addEventListener("click", () => {
    const asunto = obtenerValorInput("editar-asunto");
    const equipo = obtenerValorInput("editar-equipo");
    const usuario = obtenerValorInput("editar-usuario");
    const fecha = obtenerValorInput("editar-fecha");
    const prioridad = obtenerValorInput("editar-prioridad");
    const desc = obtenerValorInput("editar-desc");
    const estado = obtenerValorInput("editar-estado");
    
    if (!asunto || !equipo || !usuario || !fecha || !prioridad || !desc || !estado) {
        imprimir("nueva-tarea-error", "Faltan campos por rellenar");
        return;
    }

    RequestsAPI.putTarea(idTarea, asunto, equipo, usuario, fecha, prioridad, desc, estado)
    .then(() => {
        document.location.replace(`detalle-tarea.html?id=${idTarea}`);
    })
    .catch((error) => {
        imprimir("editar-tarea-error", "No se pudo agregar la tarea.");
    });
})