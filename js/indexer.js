/* ─── Indexer ────────────────────────────────────────────────────────────── */
/* Builds the inverted index (term → [docIds]) and per-document term          */
/* frequency tables. Also populates the Trie with all indexed terms.          */

let invertedIndex = {};   // { term: [docId, ...] }
let docFreq       = {};   // { term: numberOfDocsContainingTerm }
let termFreq      = [];   // termFreq[docId] = { term: count, ... }

/**
 * (Re)build all index structures from DOCS.
 * Called on startup and whenever stopword mode changes.
 */
function buildIndex() {
  invertedIndex = {};
  docFreq       = {};
  termFreq      = [];
  trieReset();

  DOCS.forEach((doc, di) => {
    const tokens = preprocess(doc.content + ' ' + doc.title);

    // Per-document term frequency
    const freq = {};
    tokens.forEach(t => { freq[t] = (freq[t] || 0) + 1; });
    termFreq[di] = freq;
    doc.words = tokens.length;

    // Inverted index + document frequency
    Object.keys(freq).forEach(term => {
      if (!invertedIndex[term]) invertedIndex[term] = [];
      invertedIndex[term].push(di);
      docFreq[term] = (docFreq[term] || 0) + 1;
    });

    // Populate Trie
    Object.keys(freq).forEach(w => trieInsert(w));
  });

  renderDocs();   // refresh the UI panel
}
