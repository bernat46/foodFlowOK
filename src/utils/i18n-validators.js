/* eslint-disable no-useless-escape */
import * as validators from "@vuelidate/validators";
import i18n from "@/locale/i18n";

// or import { createI18nMessage } from '@vuelidate/validators'
const { createI18nMessage, helpers } = validators;

// Create your i18n message instance. Used for vue-i18n@9
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) });
// for vue-i18n@8
// const withI18nMessage = createI18nMessage({ t: i18n.t.bind(i18n) })
const telephoneValidate = helpers.regex(
  /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/
);
const prefixValidate = helpers.regex(
  /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{1,3}\)?$/
);
const numberValidate = helpers.regex(
  /^\d{2}[\s.-]?\d{3}[\s.-]?\d{4}|\d{3}[\s.-]?\d{3}[\s.-]?\d{4}$/
);
// wrap each validator.
export const required = withI18nMessage(validators.required, {
  messagePath: () => "validation.required",
});
export const invalidEmail = withI18nMessage(validators.email, {
  messagePath: () => "validation.invalidEmail",
});
export const invalidTelephone = withI18nMessage(telephoneValidate, {
  messagePath: () => "validation.invalidTelephone",
});
export const invalidNumber = withI18nMessage(numberValidate, {
  messagePath: () => "validation.invalidNumber",
});
export const invalidPrefix = withI18nMessage(prefixValidate, {
  messagePath: () => "validation.invalidPrefix",
});
export function requiredIf(input) {
  return withI18nMessage(validators.requiredIf(input), {
    messagePath: () => "validation.required",
  });
}

export const decimal = withI18nMessage(validators.decimal, {
  messagePath: () => "validation.invalid",
});
export const url = withI18nMessage(validators.url, {
  messagePath: () => "validation.url",
});
export const containsUppercase = withI18nMessage(
  (value) => /[A-Z]/.test(value),
  { messagePath: () => "validation.uppercase" }
);
export const isTrue = withI18nMessage(
  (value) => value === true,
  { messagePath: () => "validation.required" }
);

export const containsLowercase = withI18nMessage(
  (value) => /[a-z]/.test(value),
  { messagePath: () => "validation.lowercase" }
);

export const containsNumber = withI18nMessage((value) => /[0-9]/.test(value), {
  messagePath: () => "validation.number",
});
export const containsSpecial = withI18nMessage(
  (value) => /[#?!@$%^&*-]/.test(value),
  { messagePath: () => "validation.special" }
);
export const minValue = (min) =>
withI18nMessage(validators.minValue(min), {
  messagePath: () => "validation.minValue0",
  params: { min },
});
export const minLength = (min) =>
withI18nMessage(validators.minLength(min), {
  messagePath: () => "validation.minLength8",
  params: { min },
});
export const sameAs = (field) =>
withI18nMessage(validators.sameAs(field), {
  messagePath: () => "validation.sameAs",
  params: { field },
});
export function userExists(value) {
  if (value === true) {
    //withI18nMessage needs validator as first parameter
    return withI18nMessage(validators.url, {
      messagePath: () => "validation.userExists", 
    });
  }
  return true; // Si el valor no es true, la validación pasa sin errores
}
export function emailExists(value) {
  if (value === true) {
    //withI18nMessage needs validator as first parameter
    return withI18nMessage(validators.url, {
      messagePath: () => "validation.emailExists", 
    });
  }
  return true; 
}
export function phoneExists(value) {
  if (value === true) {
    //withI18nMessage needs validator as first parameter
    return withI18nMessage(validators.url, {
      messagePath: () => "validation.phoneExists", 
    });
  }
  return true; 
}
export function isValidCountryPhoneNumber(value) {
  if (value === false) {
    //withI18nMessage needs validator as first parameter
    //
    return withI18nMessage(validators.email, {
      messagePath: () => "validation.invalidPhoneNumber", 
    });
  }
  return true; 
}