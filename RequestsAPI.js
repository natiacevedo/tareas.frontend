const obtenerUrl = (ruta) => `${RequestsAPI.urlBaseBackend}/${ruta}`
const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
}

const token = sessionStorage.getItem("session");
if (token) {
    headers.authorization = token;
}

const procesarRespuesta = (res) => {
    return res.json()
    .then((data) => {
        if (data.error) {
            throw new Error(data?.error);
        }
        return data;
    });
}

const manejarErrores = (error = new Error("Error desconocido")) => {
    console.error("Ha ocurrido un error:", error.message)
    throw error.message;
}

export class RequestsAPI {
    static urlBaseBackend = "https://tareas-backend-rhww.onrender.com";

    static login(email, password) {
        const body = JSON.stringify({email, password});

        return fetch(obtenerUrl("login"), {method: "POST", body, headers})
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }

    static logout() {
        return fetch(obtenerUrl("logout"), { method: "POST", headers })
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }

    static register(body) {
        return fetch(obtenerUrl("registrar"), {method: "POST", body, headers})
          .then(procesarRespuesta)
          .catch(manejarErrores);
      }

    static getTareas(opciones = {}) {
        const queryParams = new URLSearchParams({});

        if (opciones.filtroUsuario) {
            queryParams.set("usuario", opciones.filtroUsuario);
        }

        if (opciones.filtroPrioridad) {
            queryParams.set("prioridad", opciones.filtroPrioridad);
        }

        if (opciones.filtroEstado) {
            queryParams.set("estado", opciones.filtroEstado);
        }

        return fetch(obtenerUrl("tareas?"+queryParams), {headers})
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }

    static getTarea(idTarea) {
        return fetch(obtenerUrl(`tarea/${idTarea}`), {headers})
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }

    static postTarea(asunto, equipo, usuario, fechaEntrega, prioridad, descripcion, estado) {
        const body = JSON.stringify({asunto, equipo, usuario, fechaEntrega, prioridad, descripcion, estado});
        return fetch(obtenerUrl("tarea"), {method: "POST", headers, body})
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }

    static putTarea(idTarea, asunto, equipo, usuario, fechaEntrega, prioridad, descripcion, estado) {
        const body = JSON.stringify({asunto, equipo, usuario, fechaEntrega, prioridad, descripcion, estado});
        return fetch(obtenerUrl(`tarea/${idTarea}`), {method: "PUT", headers, body})
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }

    static deleteTarea(idTarea) {
        return fetch(obtenerUrl(`tarea/${idTarea}`), {method: "DELETE", headers})
        .then(procesarRespuesta)
        .catch(manejarErrores);
    }
}