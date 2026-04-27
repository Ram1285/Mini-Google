/* ─── Search Engine ──────────────────────────────────────────────────────── */
/* Three search strategies, all returning { doc, score }[] sorted descending. */

/* ── 1. Keyword Search ────────────────────────────────────────────────────── */
/**
 * Multi-term OR search ranked by cumulative TF-IDF.
 * @param {string} query
 * @returns {{ doc: object, score: number }[]}
 */
function keywordSearch(query) {
  const tokens = preprocess(query);
  if (!tokens.length) return [];

  const scores = {};
  tokens.forEach(term => {
    (invertedIndex[term] || []).forEach(di => {
      scores[di] = (scores[di] || 0) + tfidf(term, di);
    });
  });

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([di, score]) => ({ doc: DOCS[+di], score }));
}

/* ── 2. Phrase Search ─────────────────────────────────────────────────────── */
/**
 * Exact substring match; TF-IDF used as a secondary ranking signal.
 * @param {string} query
 * @returns {{ doc: object, score: number }[]}
 */
function phraseSearch(query) {
  const phrase = query.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();
  const results = [];

  DOCS.forEach(doc => {
    const fullText = (doc.content + ' ' + doc.title).toLowerCase();
    if (fullText.includes(phrase)) {
      const tokens = preprocess(query);
      // Boost phrase matches by +2 over keyword score
      const score = tokens.reduce((s, t) => s + tfidf(t, doc.id), 0) + 2;
      results.push({ doc, score });
    }
  });

  return results.sort((a, b) => b.score - a.score);
}

/* ── 3. Fuzzy Search (Levenshtein) ───────────────────────────────────────── */
/**
 * Compute edit distance between two strings (full DP matrix).
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

/**
 * Fuzzy search with typo tolerance (edit distance ≤ 1 for short words, ≤ 2 for longer).
 * Approximate matches are discounted by 30% relative to exact hits.
 * @param {string} query
 * @returns {{ doc: object, score: number }[]}
 */
function fuzzySearch(query) {
  const tokens   = preprocess(query);
  const allTerms = Object.keys(invertedIndex);
  const scores   = {};

  tokens.forEach(qt => {
    const maxDist = qt.length <= 4 ? 1 : 2;

    allTerms.forEach(term => {
      if (levenshtein(qt, term) <= maxDist) {
        const weight = term === qt ? 1.0 : 0.7;   // penalise approximate hits
        (invertedIndex[term] || []).forEach(di => {
          scores[di] = (scores[di] || 0) + tfidf(term, di) * weight;
        });
      }
    });
  });

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .map(([di, score]) => ({ doc: DOCS[+di], score }));
}
