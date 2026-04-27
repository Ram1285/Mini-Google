/* ─── Trie Data Structure ────────────────────────────────────────────────── */
/* Each node stores its children and the complete words that pass through it. */
/* Enables O(prefix_length) autocomplete lookups.                             */

let trie = { children: {}, words: [] };

/**
 * Insert a word into the Trie.
 * @param {string} word
 */
function trieInsert(word) {
  let node = trie;
  for (const ch of word) {
    if (!node.children[ch]) {
      node.children[ch] = { children: {}, words: [] };
    }
    node = node.children[ch];
    if (!node.words.includes(word)) {
      node.words.push(word);
    }
  }
}

/**
 * Return up to `limit` words that start with `prefix`.
 * @param {string} prefix
 * @param {number} [limit=8]
 * @returns {string[]}
 */
function trieSearch(prefix, limit = 8) {
  let node = trie;
  for (const ch of prefix) {
    if (!node.children[ch]) return [];
    node = node.children[ch];
  }
  return node.words.slice(0, limit);
}

/** Reset the Trie (called before re-indexing). */
function trieReset() {
  trie = { children: {}, words: [] };
}

function getSuggestions(prefix) {
  return trie.search(prefix); // OR whatever your method is
}