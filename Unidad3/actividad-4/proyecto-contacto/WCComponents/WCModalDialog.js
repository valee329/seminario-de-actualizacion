export class WCModalDialog extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const title = this.getAttribute('title') || 'Diálogo';
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
      <style>
        /* pequeño override para asegurar que el modal ocupe toda la ventana */
        .w3-modal { display: none; position: fixed; z-index: 9999; left:0; top:0; width:100%; height:100%; overflow:auto; background-color: rgba(0,0,0,0.4); }
        .w3-modal-content { margin: 4% auto; display: block; }
      </style>

      <div id="modal" class="w3-modal" style="display:none;">
        <div class="w3-modal-content w3-animate-top w3-card-4" style="max-width:600px;">
          <header class="w3-container w3-blue">
            <span id="closeBtn" class="w3-button w3-display-topright" title="Cerrar">&times;</span>
            <h2>${title}</h2>
          </header>
          <div class="w3-container">
            <slot></slot>
          </div>
          <footer class="w3-container w3-padding w3-right-align">
            <button id="cancelBtn" class="w3-button w3-light-grey">Cancelar</button>
            <button id="okBtn" class="w3-button w3-blue">Enviar</button>
          </footer>
        </div>
      </div>
    `;

    // referencias
    this.modal = this.shadowRoot.getElementById('modal');
    this.closeBtn = this.shadowRoot.getElementById('closeBtn');
    this.cancelBtn = this.shadowRoot.getElementById('cancelBtn');
    this.okBtn = this.shadowRoot.getElementById('okBtn');

    // listeners
    this._closeHandler = () => this.close();
    this._acceptHandler = () => this.accept();

    this.closeBtn.addEventListener('click', this._closeHandler);
    this.cancelBtn.addEventListener('click', this._closeHandler);
    this.okBtn.addEventListener('click', this._acceptHandler);

    // clic fuera del contenido: escuchamos en el modal (shadow) y comprobamos target === modal
    this._outsideClickHandler = (e) => {
      if (e.target === this.modal) this.close();
    };
    this.modal.addEventListener('click', this._outsideClickHandler);
  }

  disconnectedCallback() {
    // limpiamos listeners si se remueve
    if (this.closeBtn) this.closeBtn.removeEventListener('click', this._closeHandler);
    if (this.cancelBtn) this.cancelBtn.removeEventListener('click', this._closeHandler);
    if (this.okBtn) this.okBtn.removeEventListener('click', this._acceptHandler);
    if (this.modal) this.modal.removeEventListener('click', this._outsideClickHandler);
  }

  // Métodos públicos
  open() {
    if (!this.modal) {
      console.warn('Modal aún no inicializado.');
      return;
    }
    this.modal.style.display = 'block';

    // opcional: enfoque al primer input en el slot para accesibilidad
    // buscamos dentro del light DOM proyectado
    requestAnimationFrame(() => {
      const assigned = this.shadowRoot.querySelector('slot')?.assignedNodes({flatten:true}) || [];
      // buscar primer input/textarea dentro de assigned nodes
      for (const node of assigned) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const input = node.querySelector && node.querySelector('input, textarea, select, button');
          if (input) { input.focus(); break; }
        }
      }
    });
  }

  close() {
    if (!this.modal) return;
    this.modal.style.display = 'none';
  }

  accept() {
    // Si el formulario del slot expone un método validate/submit, podríamos llamarlo.
    // Pero la consigna pide solo simular envío con alert()
    window.alert('Su consulta fue recibida. A la brevedad lo contactaremos. Gracias.');
    this.close();
  }
}

customElements.define('wc-modal-dialog', WCModalDialog);
