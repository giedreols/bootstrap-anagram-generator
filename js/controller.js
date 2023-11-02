// controller.js

// Import your model and view functions.
import { fetchWords } from './model.js';
import { fetchAbout } from './model.js';
import { fetchAnagrams } from './model.js';
import { renderWordListPage } from './view.js';
import { renderAboutPage } from './view.js';
import { renderSearchPage } from './view.js';
import { renderAnagramsInWordListPage } from './view.js';
import { renderAnagramsInSearchPage } from './view.js';

const baseApi = "http://localhost:5254";

window.addEventListener('hashchange', () => {
    renderControllerContent(window.location.hash);
});

renderControllerContent(window.location.hash);

// ROUTE

function renderControllerContent(route) {
   const content = document.getElementById('content');

   if(route == '' || route == '#/search') renderSearchPage();

   else if (route.startsWith('#/word-management')) 
   {
        const page = parseInt(route.substring(route.lastIndexOf('/') + 1), 10);
        fetchWords(`${baseApi}/WordApi/IndexAsyncApi?page=${page}`, handleWordList);
   }

    else if (route == '#/about') {
            fetchAbout()
                .then((data) => {
                    renderAboutPage(data);
                })
            }

    else content.innerHTML = "<p>Puslapis nerastas</p>";
}

function handleWordList(data) {
    renderWordListPage(data);
}

// ANAGRAMS IN WORD LIST

function handleAnagramsInWordList(data) {
  renderAnagramsInWordListPage(data);
}

document.addEventListener('click', function (event) {
    const cardHeader = event.target.closest('.card-header');
    if (cardHeader) {
      const word = cardHeader.getAttribute('id');
      fetchAnagrams(`${baseApi}/WordApi/GetAsyncApi?inputword=${word}`, handleAnagramsInWordList);
    }
  });
 
// SEARCH

function handleAnagramsInSearch(data) {
  renderAnagramsInSearchPage(data);
}

document.getElementById("search-button").addEventListener("click", function() {
    var word = document.getElementById("search-input").value;
    fetchAnagrams(`${baseApi}/WordApi/GetAsyncApi?inputword=${word}`, handleAnagramsInSearch);
});

