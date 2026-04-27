/* ─── TF-IDF Scoring ─────────────────────────────────────────────────────── */
/* TF  = termCount / totalTermsInDoc  (normalised term frequency)             */
/* IDF = log((N+1) / (df+1)) + 1     (smoothed inverse document frequency)   */
/* Score = TF × IDF                                                           */

/**
 * Compute the TF-IDF score for a term in a specific document.
 * @param {string} term
 * @param {number} docId
 * @returns {number}
 */
function tfidf(term, docId) {
  const docTerms  = termFreq[docId];
  const totalTerms = Object.values(docTerms).reduce((a, b) => a + b, 0);

  const tf  = (docTerms[term] || 0) / totalTerms;
  const df  = docFreq[term] || 1;
  const idf = Math.log((DOCS.length + 1) / (df + 1)) + 1;

  return tf * idf;
}
