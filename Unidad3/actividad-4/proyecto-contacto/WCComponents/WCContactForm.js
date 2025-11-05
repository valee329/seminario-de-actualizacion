export class WCContactForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/5/w3.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
      <form id="form" class="w3-container w3-card-4 w3-light-grey w3-text-blue w3-margin">
        <h3 class="w3-center">Contáctenos</h3>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-user"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" name="first" type="text" placeholder="Nombre" />
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-envelope-o"></i></div>
          <div class="w3-rest">
            <input class="w3-input w3-border" name="email" type="email" placeholder="Email" />
          </div>
        </div>

        <div class="w3-row w3-section">
          <div class="w3-col" style="width:50px"><i class="w3-xxlarge fa fa-pencil"></i></div>
          <div class="w3-rest">
            <textarea class="w3-input w3-border" name="message" placeholder="Mensaje"></textarea>
          </div>
        </div>
      </form>
    `;

    // prevenimos envío real por si se presiona Enter dentro del form
    const form = this.shadowRoot.getElementById('form');
    form.addEventListener('submit', (e) => e.preventDefault());
  }
}

customElements.define('wc-contact-form', WCContactForm);
