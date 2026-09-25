const navToggle = document.querySelector('#navToggle');
const navLinks = document.querySelector('#navLinks');

function closeMenu() {
  navLinks?.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}

navToggle?.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isOpen));
  navLinks?.classList.toggle('open', !isOpen);
});

navLinks?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeMenu);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();

  if ((event.key === 'Enter' || event.key === ' ') && event.target.matches('.side-nav label, .quick-links label, .segmented label')) {
    event.preventDefault();
    event.target.click();
  }
});

document.querySelectorAll('.side-nav label, .quick-links label, .segmented label').forEach((label) => {
  label.tabIndex = 0;
});

document.querySelectorAll('[data-newsletter-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.nextElementSibling.textContent = 'Newsletter sign-up is not connected to a service in this static demo.';
  });
});

const roastButtons = document.querySelectorAll('[data-roast]');
const selectedRoast = document.querySelector('#selectedRoast');

roastButtons.forEach((button) => {
  button.addEventListener('click', () => {
    roastButtons.forEach((option) => {
      const isSelected = option === button;
      option.classList.toggle('active', isSelected);
      option.setAttribute('aria-pressed', String(isSelected));
    });
    if (selectedRoast) selectedRoast.value = button.dataset.roast;
  });
});

document.querySelector('#subscriptionForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#subscriptionStatus').textContent = 'No subscription was placed. This demo is not connected to checkout yet.';
});

document.querySelector('[data-dashboard-save="preferences"]')?.addEventListener('click', () => {
  const selected = document.querySelector('input[name="roast-level"]:checked');
  const roast = selected ? document.querySelector(`label[for="${selected.id}"]`).textContent : 'Medium';
  document.querySelector('.roast-card p').textContent = `${roast} roast, for your next shipment.`;
  document.querySelector('[data-dashboard-status="preferences"]').textContent = 'Preferences updated on this page only. Account saving is not connected.';
});

document.querySelector('[data-dashboard-save="account"]')?.addEventListener('click', () => {
  const fields = ['#fullname', '#email'].map((selector) => document.querySelector(selector));
  const invalidField = fields.find((field) => !field.checkValidity());
  if (invalidField) {
    invalidField.reportValidity();
    return;
  }
  document.querySelector('[data-dashboard-status="account"]').textContent = 'Profile values checked. Account saving is not connected.';
});

const addressForm = document.querySelector('[data-address-form]');
const addressButton = document.querySelector('[data-edit-address]');

addressButton?.addEventListener('click', () => {
  addressForm.hidden = !addressForm.hidden;
  addressButton.textContent = addressForm.hidden ? 'Edit address' : 'Cancel editing';
  document.querySelector('[data-dashboard-status="address"]').textContent = '';
});

addressForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('[data-address-street]').textContent = addressForm.elements.street.value;
  document.querySelector('[data-address-city]').textContent = addressForm.elements.city.value;
  addressForm.hidden = true;
  addressButton.textContent = 'Edit address';
  document.querySelector('[data-dashboard-status="address"]').textContent = 'Address updated on this page only. Account saving is not connected.';
});