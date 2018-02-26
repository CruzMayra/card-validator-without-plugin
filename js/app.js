const form = document.querySelector("form");
const formArray = Array.from(form);

form.addEventListener("submit", e => {
  e.preventDefault();
  validateCardDetails(formArray)
});

/* ---------- función centralizadora de la validación de los datos del tarjetahabiente ---------- */
const validateCardDetails = element => {
  const formValues = getFormValues(element);
  const validationResults = formValues.reduce((partialResults, item) => {
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
  paintValidation(validationResults);
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
  if(card === "") {
    return false
  }
  return isValidCard(card)
}

function isValidCard(cardNumber){
  const validation =  cardNumber
    .split("")
    .map(item => parseInt(item))
    .reverse()
    .map((current, index, array) => {
     if( index % 2){
       let evenPosition = current * 2;
       return evenPosition > 9
         ? 1 + (evenPosition % 10)
         : evenPosition
     } else {
       return current
     }
   })
   .reduce((previous, current) =>{
      return previous + current
    });
    return validation % 10 === 0
}

/* ---------- función que valida la fecha de expiración ---------- */
const validateExpirationDate = date => {
  const expDate = Date.parse(date);
  const currentDate = Date.now();
  if(date === ""){
    return false
  }
  if(expDate <= currentDate){
    return false
  }
  return true
}

/* ---------- función que valida el cvv ---------- */
const validateCvv = cvv => {
  if(cvv === ""){
    return false
  }
  if(cvv.length !== 3){
    return false
  }
  if(parseInt(cvv) < 0){
    return false
  }
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
  if(/^([A-ZÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/.test(cardholder) === false){
    return false
  }
   return true
}

const paintValidation = (object) => {
  for(key in object) {
    const labelNode = document.getElementById(key).parentNode.parentNode;
    if (object[key]) {
      labelNode.classList.remove('error')
      labelNode.classList.add('success')
    } else {
      labelNode.classList.remove('success')
      labelNode.classList.add('error')
    }
  }
}
