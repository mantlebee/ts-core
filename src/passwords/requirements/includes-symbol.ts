import {
  PasswordRequirementsDefaultNames,
  PasswordSymbolsDefault,
} from "../constants";
import { PasswordRequirement } from "../models";

/**
 * The password must include at least one of the given symbols.
 */
export class PasswordRequirementIncludesSymbol extends PasswordRequirement {
  /**
   * @param symbols Accepted symbols, default {@link PasswordSymbolsDefault}.
   */
  public constructor(symbols = PasswordSymbolsDefault) {
    super(
      PasswordRequirementsDefaultNames.symbol,
      // Inside a character class only \ ] ^ - must be escaped.
      new RegExp(`[${symbols.replace(/[\\\]^-]/g, "\\$&")}]`),
      symbols
    );
  }
}
