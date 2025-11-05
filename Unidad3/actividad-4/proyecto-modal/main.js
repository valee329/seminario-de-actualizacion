import './WCComponents/WCModalDialog.js';

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('miModal');
  const btnAbrir = document.getElementById('btnAbrir');

  // Abre el modal al hacer clic
  btnAbrir.addEventListener('click', () => modal.open());
});
