document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('custom-validation-form');
  
  const emailInput = document.getElementById('input-email');
  const passwordInput = document.getElementById('input-password');
  const profileSelect = document.getElementById('select-profile');

  function validateField(field, validationFn) {
      const value = field.value;
      if (!validationFn(value)) {
          field.classList.add('is-invalid');
          field.classList.remove('is-valid');
      } else {
          field.classList.remove('is-invalid');
          field.classList.add('is-valid');
      }
  }

  emailInput.addEventListener('blur', function () {
      validateField(emailInput, validateEmail);
  });

  passwordInput.addEventListener('blur', function () {
      validateField(passwordInput, validatePassword);
  });

  profileSelect.addEventListener('change', function () {
      validateField(profileSelect, validateProfile);
  });

  form.addEventListener('submit', function (event) {
      let isValid = true;

      validateField(emailInput, validateEmail);
      validateField(passwordInput, validatePassword);
      validateField(profileSelect, validateProfile);

      if (emailInput.classList.contains('is-invalid') || 
          passwordInput.classList.contains('is-invalid') || 
          profileSelect.classList.contains('is-invalid')) {
          isValid = false;
      }

      if (!isValid) {
          event.preventDefault();
          event.stopPropagation();
      }

      form.classList.add('was-validated');
  });

  function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
      return password.length >= 8 && password.length <= 20;
  }

  function validateProfile(profile) {
      return profile !== "";
  }
});
