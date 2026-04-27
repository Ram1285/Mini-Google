/* ─── Highlight ──────────────────────────────────────────────────────────── */
/* Extracts the most relevant 240-character snippet from a document and       */
/* wraps matched tokens in <mark> tags for display.                           */

const SNIPPET_LENGTH = 240;
const SNIPPET_LEAD   = 40;   // characters before first match to include

/**
 * Extract a highlighted snippet from raw text.
 * @param {string}   text   - Full document content.
 * @param {string[]} tokens - Preprocessed query tokens to highlight.
 * @returns {string} HTML string with <mark> tags.
 */
function highlightText(text, tokens) {
  const lower = text.toLowerCase();

  // Find the earliest match to centre the snippet around
  const firstIndices = tokens
    .map(t => lower.indexOf(t))
    .filter(i => i >= 0);

  const start = firstIndices.length
    ? Math.max(0, Math.min(...firstIndices) - SNIPPET_LEAD)
    : 0;

  let snippet = text.slice(start, start + SNIPPET_LENGTH);
  if (text.length > start + SNIPPET_LENGTH) snippet += '…';

  // Wrap each matched token in <mark>
  tokens.forEach(token => {
    const escaped = token.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`(${escaped})`, 'gi');
    snippet = snippet.replace(re, '<mark>$1</mark>');
  });

  return snippet;
}
