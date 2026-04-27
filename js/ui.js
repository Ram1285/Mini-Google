/* ─── UI Rendering ───────────────────────────────────────────────────────── */
/* Pure rendering functions — no business logic here.                         */

/* ── Results ─────────────────────────────────────────────────────────────── */
/**
 * Render search results into #resultsArea.
 * @param {{ doc: object, score: number }[]} results
 * @param {string} query   - Original raw query string.
 * @param {number} ms      - Search duration in milliseconds.
 * @param {string} mode    - 'keyword' | 'phrase' | 'fuzzy'
 */
function renderResults(results, query, ms, mode) {
  const tokens = preprocess(query);
  const area   = document.getElementById('resultsArea');

  if (!results.length) {
    area.innerHTML = `
      <div class="empty">
        <div class="empty-icon">◈</div>
        <h3>No documents matched "${query}"</h3>
        <p>Try fuzzy mode for typo tolerance, or broaden your query.</p>
      </div>`;
    return;
  }

  const maxScore = results[0].score;

  const statsHtml = `
    <div class="stats-bar">
      <span>${results.length}</span> result${results.length > 1 ? 's' : ''} ·
      <span>${ms.toFixed(2)}ms</span> ·
      mode: <span>${mode}</span> ·
      index: <span>${Object.keys(invertedIndex).length}</span> terms
    </div>`;

  const cardsHtml = results.slice(0, 8).map((r) => {

  let doc = r.doc;

  if (!doc) {
    const index = r.id !== undefined ? r.id : r.docId;
    doc = DOCS[index];
  }

  if (!doc) return "";

  const score = r.score;

  const pct     = Math.round((score / maxScore) * 100);
  const snippet = highlightText(doc.content, tokens);
  const badge   = mode === 'phrase'
    ? `<span class="phrase-badge">phrase match</span>`
    : mode === 'fuzzy'
    ? `<span class="fuzzy-badge">fuzzy match</span>`
    : '';

  return `
    <div class="result-card">
      <div class="result-header">
        <div class="result-title">${doc.title}</div>
        <div class="result-score">
          TF-IDF: ${score.toFixed(4)}
          <div class="score-bar">
            <div class="score-fill" style="width:${pct}%"></div>
          </div>
        </div>
      </div>
      <div class="result-meta">
        <span>doc #${doc.id}</span>
        <span>${doc.category}</span>
        <span>${doc.words} tokens</span>
      </div>
      <div class="result-snippet">${snippet}</div>
      <div class="result-tags">
        ${tokens.map(t => `<span class="tag">${t}</span>`).join('')}
        ${badge}
      </div>
    </div>
  `;
}).join('');
  area.innerHTML = statsHtml + cardsHtml;
}

/* ── Indexed Docs Panel ──────────────────────────────────────────────────── */
/** Populate the collapsible docs grid. */
function renderDocs() {
  document.getElementById('docsGrid').innerHTML = DOCS.map(d => `
    <div class="doc-chip">
      <div class="doc-chip-name">${d.title}</div>
      <div class="doc-chip-words">${d.category} · ${d.words} tokens</div>
    </div>`).join('');
}

/* ── Autocomplete Dropdown ───────────────────────────────────────────────── */
/**
 * Show autocomplete suggestions for the current input value.
 * @param {string} val - Current input value.
 */
function updateAutocomplete(val) {
  const drop = document.getElementById('acDropdown');
  if (!val || val.length < 2) { hideAutocomplete(); return; }

  const words  = val.split(/\s+/);
  const prefix = words[words.length - 1].toLowerCase();
  if (!prefix) { hideAutocomplete(); return; }

  const suggestions = trieSearch(prefix).filter(w => w !== prefix);
  if (!suggestions.length) { hideAutocomplete(); return; }

  const pre = words.slice(0, -1).join(' ');

  drop.innerHTML = suggestions.map(s => `
    <div class="ac-item"
         data-full="${pre ? pre + ' ' + s : s}"
         onclick="selectAC(this)">
      <span class="ac-prefix">${prefix}</span>
      <span class="ac-suffix">${s.slice(prefix.length)}</span>
    </div>`).join('');

  drop.classList.add('show');
}

/** Commit an autocomplete selection and run the search. */
function selectAC(el) {
  document.getElementById('searchInput').value = el.dataset.full;
  hideAutocomplete();
  doSearch();
}

/** Hide the autocomplete dropdown. */
function hideAutocomplete() {
  document.getElementById('acDropdown').classList.remove('show');
}

