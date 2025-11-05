export class WCModalDialog extends HTMLElement {
  constructor() {
    super();

    // Creamos un Shadow DOM para encapsular el estilo y contenido
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
      <style>
        .w3-modal {
          display: none;
          position: fixed;
          z-index: 3;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          overflow: auto;
          background-color: rgba(0,0,0,0.4);
        }
      </style>

      <div class="w3-modal">
        <div class="w3-modal-content w3-animate-top w3-card-4">
          <div class="w3-container">
            <span class="w3-button w3-display-topright">&times;</span>
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.modal = this.shadowRoot.querySelector('.w3-modal');
    this.btnCerrar = this.shadowRoot.querySelector('span');

    // Cerrar al hacer clic en la "x"
    this.btnCerrar.addEventListener('click', () => this.close());

    // Cerrar al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.close();
      }
    });
  }

  // Métodos públicos para abrir/cerrar el modal
  open() {
    this.modal.style.display = 'block';
  }

  close() {
    this.modal.style.display = 'none';
  }
}

// Registrar el componente
customElements.define('wc-modal-dialog', WCModalDialog);
