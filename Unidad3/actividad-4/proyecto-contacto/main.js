// importamos las definiciones de los webcomponents
import './WCComponents/WCModalDialog.js';
import './WCComponents/WCContactForm.js';

document.addEventListener('DOMContentLoaded', async () => {
  // esperamos que los custom elements estén definidos para evitar race conditions
  await customElements.whenDefined('wc-modal-dialog');
  await customElements.whenDefined('wc-contact-form');

  const btn = document.getElementById('btnContactar');
  const modal = document.getElementById('modalContacto');

  // seguridad: comprobamos que el método exista
  if (!modal || typeof modal.open !== 'function') {
    console.error('El componente wc-modal-dialog no está listo o no expone open().');
    return;
  }

  btn.addEventListener('click', () => modal.open());
});
