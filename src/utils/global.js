export const popSuccess = (
  setIsAnyError,
  setIsAnySuccess,
  setSuccessText,
  successText
) => {
  setIsAnyError(false);
  setIsAnySuccess(true);
  setSuccessText(successText);
};

export const popError = (
  setIsAnyError,
  setIsAnySuccess,
  setErrorText,
  errorText
) => {
  setIsAnyError(true);
  setIsAnySuccess(false);
  setErrorText(errorText);
};
