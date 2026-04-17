// Language index mapping for JSON columns stored as [PT, EN].
// PT is the fallback (index 0).
const LANG_INDEX = { pt: 0, en: 1 };
 
/**
 * Normalize a language code like 'pt', 'en', 'pt-PT', 'en-US' to an index.
 * @param {string} lang
 * @returns {number} 0 for PT, 1 for EN
 */
function getLocaleIndex(lang) {
  if (!lang) return 0;
  const code = String(lang).toLowerCase().split('-')[0];
  return LANG_INDEX[code] ?? 0;
}

/**
 * If the value is a JSON-looking string, parse it. Otherwise return as-is.
 * Some DB drivers return JSON columns as strings instead of parsed objects.
 */
function ensureParsed(value) {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  if (!trimmed) return trimmed;
  const first = trimmed[0];
  if (first !== '[' && first !== '{') return trimmed;
  try {
    return JSON.parse(trimmed);
  } catch (_err) {
    return trimmed;
  }
}
 
/**
 * Pick the localized string from a [PT, EN] JSON array (or stringified array).
 */
function pickLocale(value, lang) {
  if (value == null) return '';
  const parsed = ensureParsed(value);
  if (typeof parsed === 'string') return parsed;       // plain legacy string
  if (!Array.isArray(parsed)) return String(parsed);
  const idx = getLocaleIndex(lang);
  return parsed[idx] ?? parsed[0] ?? '';
}
 
/**
 * Pick the localized array from a [[PT items], [EN items]] JSON structure
 * (or its stringified form). Used for `incorrect_answer`.
 */
function pickLocaleArray(value, lang) {
  if (value == null) return [];
  const parsed = ensureParsed(value);
  if (!Array.isArray(parsed)) return [];
  const idx = getLocaleIndex(lang);
  const arr = parsed[idx] ?? parsed[0] ?? [];
  return Array.isArray(arr) ? arr : [];
}
 
module.exports = { getLocaleIndex, pickLocale, pickLocaleArray, ensureParsed };