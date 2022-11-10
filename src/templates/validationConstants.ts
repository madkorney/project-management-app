export const RegExpPasswordValidation =
  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;

export const RegExpLoginValidation = /^[a-z]+([-_]?[a-z0-9]+){0,2}$/i;
