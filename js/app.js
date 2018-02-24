const form = document.querySelector("form");
const formArray = Array.from(form);
console.log(formArray);

form.addEventListener("submit", e => {
  e.preventDefault();
  if (validateCardDetails(formArray)) {
    console.log("datos válido... enviar...");
  } else {
    console.log("datos inválidos");
  }
});

/* ---------- función centralizadora de la validación de los datos del tarjetahabiente ---------- */
const validateCardDetails = element => {
  const formValues = getFormValues(element);
  formValues.map(item => {
    const id = Object.keys(item)[0]
    const value = Object.values(item)[0]
    switch (id) {
      case 'cn':
        validateCardNumber(value)
        break;
      case 'exp':
        validateExpirationDate(value)
        break;
      case 'cvv':
        validateCvv(value)
        break;
      case 'name':
        validateCardholderName(value)
        break;
      default:
    }
  })
}

/* ---------- función que recorre array con datos y obtiene el valor de cada uno ---------- */
const getFormValues = element => {
  const formValues = element.map(item => {
    const formData = {};
    formData[item.id] = item.value
    return formData
  })
  return formValues
}

/* ---------- función que valida el número de tarjeta ---------- */
const validateCardNumber = card => {
  console.log(card);
}

/* ---------- función que valida la fecha de expiración ---------- */
const validateExpirationDate = date => {
  console.log(date);
}

/* ---------- función que valida el cvv ---------- */
const validateCvv = cvv => {
  console.log(cvv);
}

/* ---------- función que valida el nombre de tarjetahabiente ---------- */
const validateCardholderName = cardholder => {
  console.log(cardholder);
}
