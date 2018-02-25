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
  const validationResults = formValues.reduce((partialResults, item) => {
    //console.log(item);
    const id = Object.keys(item)[0];
    const value = Object.values(item)[0];
    switch (id) {
      case 'cn':
        partialResults[id] = validateCardNumber(value)
        break;
      case 'exp':
        partialResults[id] = validateExpirationDate(value)
        break;
      case 'cvv':
        partialResults[id] = validateCvv(value)
        break;
      case 'name':
        partialResults[id] = validateCardholderName(value)
        break;
      default:
      return partialResults
    }
    return partialResults
  }, {})
  console.log(validationResults);
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
  return true
}

/* ---------- función que valida la fecha de expiración ---------- */
const validateExpirationDate = date => {
  console.log(date);
  return true
}

/* ---------- función que valida el cvv ---------- */
const validateCvv = cvv => {
  console.log(cvv);
  return true
}

/* ---------- función que valida el nombre de tarjetahabiente ---------- */
const validateCardholderName = cardholder => {
  if(cardholder === ""){
    return false
  }
  if(cardholder.indexOf(' ') === 0){
    return false
  }
  const arrayWords = cardholder
    .split(" ")
    .filter(word => word !== '')
  if(arrayWords.length < 2) {
    return false
  }
  const arrayShortWords = arrayWords.filter(word => word.length < 30);
  if(arrayShortWords.length !== arrayWords.length){
    return false
  }
  if(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(cardholder)){
    return false
  }
   return true
}
