/* ─── Preprocessor ───────────────────────────────────────────────────────── */
/* Cleans raw text into a list of lowercase tokens, stripping punctuation.    */
/* Optionally removes stopwords based on global `useStopwords` flag.          */

/**
 * @param {string} text - Raw input string.
 * @returns {string[]} Array of cleaned tokens.
 */
function preprocess(text) {
  let tokens = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')   // strip punctuation
    .split(/\s+/)                     // split on whitespace
    .filter(t => t.length > 1);      // drop single-char tokens

  if (useStopwords) {
    tokens = tokens.filter(t => !STOPWORDS.has(t));
  }

  return tokens;
}
