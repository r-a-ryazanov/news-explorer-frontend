//---------------Компонент возвращает разметку всплывающего окна авторизации------------------------------
export function toggleButtonState(form, setIsButtonDisabled) {
  if (form) {
    const inputList = Array.from(form.querySelectorAll("input"));

    function hasInvalidInput() {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    }
    if (hasInvalidInput()) {

      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  }
}

export function formValidator(form, input, setValidationMessage, setIsButtonDisabled) {
  if (input) {
    if (!input.validity.valid) {
      setValidationMessage(input.validationMessage);
    } else {
      setValidationMessage("");
    }
  }
  toggleButtonState(form, setIsButtonDisabled);
}