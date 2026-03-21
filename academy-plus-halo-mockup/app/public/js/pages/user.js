import { registerSidebarUI } from '../ui/sidebarUI.js';

document.addEventListener('DOMContentLoaded', () => {
  registerSidebarUI();

  const menuItems = document.querySelectorAll('.user-menu-category');
  const sections = document.querySelectorAll('.user-section');

  // Menu navigation and form reset
  menuItems.forEach(item => {
    item.addEventListener('click', function () {
      menuItems.forEach(i => i.classList.remove('active'));
      this.classList.add('active');
      const section = this.getAttribute('data-section');
      sections.forEach(sec => {
        sec.style.display = sec.id === `section-${section}` ? 'block' : 'none';
      });
      // Reset all forms and disable their update buttons
      document.querySelectorAll('.update-user-form').forEach(form => {
        form.reset();
        form.querySelectorAll('.update-button').forEach(btn => btn.disabled = true);
      });
    });
  });

  // Show first section by default
  if (menuItems[0]) menuItems[0].click();

  // Form submission handlers
  document.addEventListener('submit', async function (e) {
    // Profile form
    if (e.target.matches('#profile-form')) {
      e.preventDefault();
      const form = e.target;
      const updates = {};
      const input = form['profile-name'];
      if (input.value) updates.username = input.value;
      if (Object.keys(updates).length === 0) return;

      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      const msgDiv = document.getElementById('profile-data-message');
      msgDiv.textContent = data.success ? 'Username updated!' : (data.message || 'Update failed');
      msgDiv.style.color = data.success ? 'green' : 'red';
      if (data.success) {
        document.querySelectorAll('.user-name').forEach(el => {
          el.textContent = updates.username;
        });
      }
      return;
    }

    // Personal data form
    if (e.target.matches('#personal-data-form')) {
      e.preventDefault();
      const form = e.target;
      const updates = {};
      form.querySelectorAll('input').forEach(input => {
        if (input.value.trim()) {
          updates[input.name] = input.value.trim();
        }
      });
      if (Object.keys(updates).length === 0) return;

      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      const msgDiv = document.getElementById('personal-data-message');
      msgDiv.textContent = data.success ? 'Update successful!' : (data.message || 'Update failed');
      msgDiv.style.color = data.success ? 'green' : 'red';
      return;
    }

    // Change password form
    if (e.target.matches('#change-password-form')) {
      e.preventDefault();
      const form = e.target;
      const passwordData = {
        currentPassword: form.currentPassword.value,
        newPassword: form.newPassword.value,
        confirmPassword: form.confirmPassword.value
      };
      const res = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(passwordData)
      });
      const data = await res.json();
      const msgDiv = document.getElementById('change-password-message');
      msgDiv.textContent = data.success ? 'Password changed successfully!' : (data.message || 'Password change failed');
      msgDiv.style.color = data.success ? 'green' : 'red';
      return;
    }

    // Privacy form
    if (e.target.matches('#privacy-form')) {
      e.preventDefault();
      const form = e.target;
      const updates = {};
      form.querySelectorAll('input[type="checkbox"]').forEach(input => {
        updates[input.name] = input.checked;
      });
      
      const res = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      });
      const data = await res.json();
      const msgDiv = document.getElementById('privacy-message');
      msgDiv.textContent = data.success ? 'Privacy settings updated!' : (data.message || 'Update failed');
      msgDiv.style.color = data.success ? 'green' : 'red';
      return;
    }
  });

  // Avatar dropdown logic
  document.querySelectorAll('.avatar-dropdown').forEach(dropdown => {
    const trigger = dropdown.querySelector('.avatar-trigger');
    const menu = dropdown.querySelector('.avatar-menu');
    if (trigger && menu) {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
      });
      document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
          menu.style.display = 'none';
        }
      });
    }
  });

  // Enable update button if any input has a value or is checked
  document.querySelectorAll('.update-user-form').forEach(form => {
    const button = form.querySelector('.update-button');
    const inputs = form.querySelectorAll('input, textarea, select');

    function checkFormFilled() {
      let filled = false;
      inputs.forEach(input => {
        if (input.type === 'checkbox') {
          // For checkboxes, consider them "changed" if their current state differs from original
          const originalChecked = input.hasAttribute('checked');
          if (input.checked !== originalChecked) filled = true;
        } else if (input.type === 'file') {
          if (input.files && input.files.length > 0) filled = true;
        } else {
          if (input.value && input.value.trim() !== '') filled = true;
        }
      });
      button.disabled = !filled;
    }

    inputs.forEach(input => {
      input.addEventListener('input', checkFormFilled);
      input.addEventListener('change', checkFormFilled);
    });

    // Initial check
    checkFormFilled();
  });
});