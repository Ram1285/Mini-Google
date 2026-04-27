/* ─── Main ───────────────────────────────────────────────────────────────── */
/* App-level state and event wiring. Entry point loaded last.                 */

/* ── App State ───────────────────────────────────────────────────────────── */
let searchMode   = 'keyword';   // 'keyword' | 'phrase' | 'fuzzy'
let useStopwords = false;

/* ── Search Dispatch ─────────────────────────────────────────────────────── */
/** Run the active search mode against the current query. */  
function doSearch() {

  const query = document.getElementById('searchInput').value.trim();
  hideAutocomplete();

  if (!query) {
    document.getElementById('resultsArea').innerHTML = "";
    return;
  }

  const start = performance.now();

  const results =
    searchMode === 'phrase' ? phraseSearch(query) :
    searchMode === 'fuzzy' ? fuzzySearch(query) :
    keywordSearch(query);

  const end = performance.now();

  renderResults(results, query, performance.now() - start, searchMode);
}

/* ── Mode & Stopword Controls ────────────────────────────────────────────── */
/**
 * Switch search mode and update chip styles.
 * @param {'keyword'|'phrase'|'fuzzy'} mode
 */
function setMode(mode) {
  searchMode = mode;
  ['keyword', 'phrase', 'fuzzy'].forEach(k => {
    document.getElementById('mode-' + k).classList.toggle('active', k === mode);
  });
}

/** Toggle stopword removal and rebuild the index. */
function toggleStopwords() {
  useStopwords = !useStopwords;
  const btn = document.getElementById('stop-toggle');
  btn.textContent = 'stopwords: ' + (useStopwords ? 'ON' : 'OFF');
  btn.classList.toggle('active', useStopwords);
  buildIndex();
}

/* ── Event Listeners ─────────────────────────────────────────────────────── */
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', e => updateAutocomplete(e.target.value));

searchInput.addEventListener('keydown', e => {
  if (e.key === 'Enter')  doSearch();
  if (e.key === 'Escape') hideAutocomplete();
});

// Close dropdown when clicking outside the search area
document.addEventListener('click', e => {
  if (!document.getElementById('searchWrap').contains(e.target)) {
    hideAutocomplete();
  }
});

/* ── Boot ────────────────────────────────────────────────────────────────── */
buildIndex();


const input = document.getElementById("searchInput");

input.addEventListener("input", function () {
  const query = input.value.trim();

  if (!query) {
    hideAutocomplete();
    return;
  }

  const suggestions = getSuggestions(query); // from Trie
  showAutocomplete(suggestions);
});

function showAutocomplete(list) {
  const dropdown = document.getElementById("acDropdown");

  if (!list.length) {
    dropdown.innerHTML = "";
    return;
  }

  dropdown.innerHTML = list.map(item => `
    <div class="ac-item" onclick="selectSuggestion('${item}')">
      ${item}
    </div>
  `).join("");
}
function selectSuggestion(value) {
  document.getElementById("searchInput").value = value;
  hideAutocomplete();
  doSearch();
}

function hideAutocomplete() {
  document.getElementById("acDropdown").innerHTML = "";
}
