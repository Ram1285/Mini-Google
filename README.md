# Mini-Google
--MiniGoogle — A Simple Search Engine

This is a group project where we built a mini search engine to understand how real-world systems like Google work.

The project evolved in stages — starting from a basic version and then improving it step by step with additional features and optimizations.

---

#What it can do ?

* Search documents using **keywords**
* Support **exact phrase search**
* Handle **typos (fuzzy search)**
* Show **autocomplete suggestions** using Trie
* Highlight matching words in results
* Display **TF-IDF based ranking**
* Show search execution time

---

## How it works ?

* Documents are indexed using an **inverted index**
* Queries are processed into tokens
* Based on selected mode:

  * Keyword → TF-IDF ranking
  * Phrase → exact match
  * Fuzzy → approximate matching
* Results are sorted and displayed with highlights

---

## 👥 Team Contribution

* **Ramcharan** — Developed the initial version of the project (basic structure and setup)
* **Sheshumadhava Pittala** — Enhanced the system by adding search modes, TF-IDF ranking, autocomplete, UI improvements, and debugging
* **Sahith** — Further improvements and additional features (to be added)
* **Nikhil** -
---

## Tech used:

* HTML, CSS, JavaScript
* Data Structures & Algorithms:
  * Inverted Index
  * TF-IDF
  * Trie
  * Levenshtein Distance

---

## What we learned ?

* How search engines retrieve and rank results
* Applying data structures like Trie in real applications
* Handling real-world issues like typos and query processing
* Improving an existing system step by step
* Team collaboration and debugging

---

## Future improvements

* Add AI-based semantic search
* Backend/database integration
* Pagination for results
* More UI enhancements

---

⭐ This project reflects a step-by-step improvement process and collaborative development.
