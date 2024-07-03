import Tarea from "../Models/Tarea.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, validarSesion } from "../utils/helpers.js";

validarSesion();

const params = new URLSearchParams(window.location.search);
const idTarea = params.get("id");

const mostrarError = (error) => {
    imprimir("detalle-error", error);
}

const mostrarDetalle = (data) => {
    const tarea = new Tarea(data.id, data.asunto, data.equipo, data.usuario, data.fechaEntrega, data.prioridad, data.descripcion, data.estado);
    imprimir("detalle", tarea.mostrarDetalle())
}

document.querySelector("#boton-editar-tarea").addEventListener
("click", () => {
        document.location.replace(`editar-tarea.html?id=${idTarea}`)
    })

document.querySelector("#boton-eliminar-tarea").addEventListener
("click", () => {
        RequestsAPI.deleteTarea(idTarea)
        .then(() => {
            document.location.replace("home.html");
        })
        .catch((error) => {
            mostrarError(error);
        });
    })

RequestsAPI.getTarea(idTarea)
.then(mostrarDetalle)
.catch((error) => {
    mostrarError(error);
});
    