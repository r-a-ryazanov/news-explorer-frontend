//---------------Функция управления активностью кнопки формы------------------------------
export function toggleButtonState(form, setIsButtonDisabled) {
  if (form) {
    const inputList = Array.from(form.querySelectorAll("input"));
//---------------Функция проверки валидности всех инпутов в форме------------------------------
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
//---------------Функция проверки валидности формы и выведения ошибки------------------------------
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