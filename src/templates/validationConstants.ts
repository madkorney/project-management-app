export const RegExpPasswordValidation =
  /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g;

export const RegExpLoginValidation = /^[a-z]+([-_]?[a-z0-9]+){0,2}|[а-я]+([-_]?[а-яё0-9]+){0,2}$/i;

export const RegExpNameValidation =
  /^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ']+( [^ ]+[a-zA-Zа-яА-ЯёЁ'])+?$/;
