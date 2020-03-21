export const validatePassword = (password) => {
  const regexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/);
  return regexp.test(password);
}