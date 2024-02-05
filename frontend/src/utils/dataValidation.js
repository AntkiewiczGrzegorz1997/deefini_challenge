export function validateFormInput(processedFormInput) {
  const validationMessages = [];

  if (processedFormInput.lat < -90 || processedFormInput.lat > 90) {
    validationMessages.push(
      'Invalid Latitude. Please enter a value between -90 and 90.'
    );
  }

  if (processedFormInput.lon < -180 || processedFormInput.lon > 180) {
    validationMessages.push(
      'Invalid Longitude. Please enter a value between -180 and 180.'
    );
  }

  if (processedFormInput.days === 0) {
    validationMessages.push(
      'Invalid number of days. Please enter a value higher than 0.'
    );
  }

  return validationMessages;
}
