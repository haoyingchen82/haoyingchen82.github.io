// Enhance the upstream checkbox menu without replacing the theme header.
const toggle = document.getElementById('nav-toggle');
const trigger = document.querySelector('label[for="nav-toggle"]');
const menu = document.getElementById('nav-menu');

if (toggle && trigger && menu) {
  const sync = () => {
    trigger.setAttribute('aria-expanded', String(toggle.checked));
    trigger.setAttribute('aria-label', toggle.checked ? 'Close menu' : 'Open menu');
  };
  const close = () => {
    toggle.checked = false;
    sync();
  };
  trigger.setAttribute('role', 'button');
  trigger.setAttribute('tabindex', '0');
  trigger.setAttribute('aria-controls', menu.id);
  toggle.addEventListener('change', sync);
  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggle.checked = !toggle.checked;
      sync();
    }
  });
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) close();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.checked) {
      close();
      trigger.focus();
    }
  });
  sync();
}
