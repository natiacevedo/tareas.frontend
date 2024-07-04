
export default class Tarea {
    id;
    asunto;
    equipo;
    usuario;
    fechaEntrega;
    prioridad;
    descripcion;
    estado;
  
    constructor(id = 0, asunto = "", equipo = "", usuario = "", fechaEntrega = "", prioridad = "", descripcion = "", estado = "") {
      this.id = id;
      this.asunto = asunto;
      this.equipo = equipo;
      this.usuario = usuario;
      this.fechaEntrega = fechaEntrega;
      this.prioridad = prioridad;
      this.descripcion = descripcion;
      this.estado = estado;
    }
    
    mostrarEnLista() {
      return `
        <tr class="item-lista-tarea" id="${this.id}">
          <td>${this.asunto}</td>
          <td>${this.equipo}</td>
          <td>${this.usuario}</td>
          <td>${this.fechaEntrega}</td>
          <td>${this.prioridad}</td>
          <td class="estado">${this.estado}</td>
        </tr>
      `;
    }
    mostrarDetalle() {
      return `
      <table>
        <tr><td><b>Asunto</b></td><td>${this.asunto}</td></tr>
        <tr><td><b>Equipo</b></td><td>${this.equipo}</td></tr>
        <tr><td><b>Usuario</b></td><td>${this.usuario}</td></tr>
        <tr><td><b>Fecha Entrega</b></td><td>${this.fechaEntrega}</td></tr>
          <tr><td><b>Prioridad</b></td><td>${this.prioridad}</td></tr>
          <tr><td><b>Descripción</b></td><td>${this.descripcion}</td></tr>
          <tr><td><b>Estado</b></td><td>${this.estado}</td></tr>
          </table>
      `;
    }
  }
  