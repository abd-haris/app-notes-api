const form = document.querySelector('form');
const titleInput = form.elements.title;
const shortDescription = form.elements.shortDescription;

form.addEventListener('submit', (event) => event.preventDefault());

const customValidationTitleHandler = (event) => {
  event.target.setCustomValidity('');

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity('Judul wajib diisi!');
    return;
  }

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity('Panjang judul minimal 10 karakter');
    return;
  }

  if (event.target.validity.patternMismatch) {
    event.target.setCustomValidity(
      'Setiap kata harus diawali dengan huruf kapital!'
    );
  }
  return;
};

titleInput.addEventListener('change', customValidationTitleHandler);
titleInput.addEventListener('invalid', customValidationTitleHandler);

titleInput.addEventListener('blur', (event) => {
  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;

  const connectedTitleValidationId =
    event.target.getAttribute('aria-describedby');
  const connectedTitleValidationEl = connectedTitleValidationId
    ? document.getElementById(connectedTitleValidationId)
    : null;

  if (connectedTitleValidationEl && errorMessage && !isValid) {
    connectedTitleValidationEl.innerText = errorMessage;
  } else {
    connectedTitleValidationEl.innerText = '';
  }
});

const customValidationDescriptionHandler = (event) => {
  event.target.setCustomValidity('');

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity('Wajib diisi!');
    return;
  }

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity('Kurang dari 15 karakter!');
    return;
  }
};

shortDescription.addEventListener('change', customValidationDescriptionHandler);
shortDescription.addEventListener(
  'invalid',
  customValidationDescriptionHandler
);

shortDescription.addEventListener('blur', (event) => {
  const isValid = event.target.validity.valid;
  const errorMessage = event.target.validationMessage;

  const connectedDescribValidationId =
    event.target.getAttribute('aria-describedby');
  const connectedDescribValidationEl = connectedDescribValidationId
    ? document.getElementById(connectedDescribValidationId)
    : null;

  if (connectedDescribValidationEl && errorMessage && !isValid) {
    connectedDescribValidationEl.innerText = errorMessage;
  } else {
    connectedDescribValidationEl.innerText = '';
  }
});
