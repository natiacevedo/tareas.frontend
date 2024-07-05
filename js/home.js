import Tarea from "../Models/Tarea.js";
import { RequestsAPI } from "../RequestsAPI.js";
import { imprimir, obtenerValorInput, validarSesion, eventoClickCerrarSesion, aplicarNombreUsuario } from "../utils/helpers.js";

validarSesion();
aplicarNombreUsuario();
eventoClickCerrarSesion();

const mostrarListaTareas = (data) => {
    imprimir("lista-error",  "");

    if(data.length === 0){
        imprimir("lista-error", "No hay tareas para mostrar");
        imprimir("listado", "");
        return
    }
    const headerListado = "<tr><th>Asunto</th><th>Equipo</th><th>Usuario</th><th>Fecha de entrega</th><th>Prioridad</th><th>Estado</th></tr>";

    const tareas = data.map((tarea) => new Tarea(tarea.id, tarea.asunto,
        tarea.equipo, tarea.usuario, tarea.fechaEntrega, tarea.prioridad, tarea.descripcion, tarea.estado).mostrarEnLista());

    imprimir("listado", `<table>${headerListado}${tareas.join("")}</table>`);

    document.querySelectorAll(".item-lista-tarea").forEach((itemListado) => {
        itemListado.addEventListener("click", () => {
            document.location.replace(`detalle-tarea.html?id=${itemListado.id}`);
        })
    })
}

const mostrarError = (error) => {
    imprimir("lista-error", error);
}

document.querySelector("#boton-filtro").addEventListener("click", () => {
    const filtroUsuario = obtenerValorInput("input-filtro-nombre");
    const filtroPrioridad = obtenerValorInput("input-filtro-prioridad");
    const filtroEstado = obtenerValorInput("input-filtro-estado");

    RequestsAPI.getTareas({filtroUsuario, filtroPrioridad, filtroEstado})
    .then(mostrarListaTareas)
    .catch(mostrarError)
})

RequestsAPI.getTareas()
    .then(mostrarListaTareas)
    .catch(mostrarError)
