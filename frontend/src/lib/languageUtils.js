import { LANGUAGE_TO_FLAG } from "../constants";

/**
 * Get the flag image for a given language
 * @param {string} language - The language name
 * @returns {JSX.Element|null} - Flag image element or null
 */
export function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="h-3 mr-1 inline-block"
      />
    );
  }
  return null;
}
