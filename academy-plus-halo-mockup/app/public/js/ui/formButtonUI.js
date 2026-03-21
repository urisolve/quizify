/**
 * Disables the given button until all required text/email/password fields in the form are filled.
 * @param {HTMLFormElement|string} form - The form element or its ID.
 * @param {HTMLButtonElement|string} button - The button element or its ID.
 */
export function enableButtonOnFilledFields(form, button) {
  if (typeof form === 'string') form = document.getElementById(form);
  if (typeof button === 'string') button = document.getElementById(button);
  if (!form || !button) return;

  // Only select required, non-checkbox, non-radio inputs
  const inputs = form.querySelectorAll('input[required]:not([type="checkbox"]):not([type="radio"])');

  function checkFields() {
    const allFilled = Array.from(inputs).every(input => input.value.trim());
    button.disabled = !allFilled;
  }

  inputs.forEach(input => {
    input.addEventListener('input', checkFields);
  });

  checkFields(); // Initial check
}