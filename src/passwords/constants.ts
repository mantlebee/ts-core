/**
 * Names of the built-in password requirements, used as validation messages.
 */
export enum PasswordRequirementsDefaultNames {
  length = "Length",
  lowercaseLetter = "IncludesLowercaseLetter",
  matchPassword = "MatchPassword",
  noWhitespaces = "NoWhitespaces",
  number = "IncludesNumber",
  symbol = "IncludesSymbol",
  uppercaseLetter = "IncludesUppercaseLetter",
}

/**
 * Symbols accepted by default by {@link PasswordRequirementIncludesSymbol}.
 */
export const PasswordSymbolsDefault = "!@#$%^&*()_+=-{}[];',./<>?:\"";
