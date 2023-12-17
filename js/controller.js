// controller.js

// Import your model and view functions.
import { fetchWords } from './model.js';
import { fetchAbout } from './model.js';
import { fetchAnagrams } from './model.js';
import { updateAnagrams } from './model.js';
import { checkIfWordExists } from './model.js';
import { renderWordListPage } from './view.js';
import { renderAboutPage } from './view.js';
import { renderSearchPage } from './view.js';
import { renderAnagramsInWordListPage } from './view.js';
import { renderAnagramsInSearchPage } from './view.js';
import { renderWordEditingForm } from './view.js';


const baseApi = "https://localhost:7186";

window.addEventListener('hashchange', () => {
    renderControllerContent(window.location.hash);
});

renderControllerContent(window.location.hash);

// ROUTE

function renderControllerContent(route) {
   const content = document.getElementById('content');

   if(route == '' || route == '#/search')  {
    renderSearchPage();
    addEventListenerForSearchPage();
    }

   else if (route.startsWith('#/word-management')) 
   {    
      const page = parseInt(route.substring(route.lastIndexOf('/') + 1), 10);
      if (!isNaN(page)) { 
        fetchWords(`${baseApi}/WordApi/IndexAsyncApi?page=${page}`, handleWordList);
        addEventListenerForWordList();
      } else content.innerHTML = "<p>Puslapis nerastas</p>";
   }

    else if (route == '#/about') {
            fetchAbout()
                .then((data) => {
                    renderAboutPage(data);
                })
            }

    else content.innerHTML = "<p>Puslapis nerastas</p>";
}

// WORD LIST

function handleWordList(data) {
    renderWordListPage(data);
}

function addEventListenerForWordList() {
  document.addEventListener('click', function (event) {
    const cardHeader = event.target.closest('.card-header');
    if (cardHeader) {
      const word = cardHeader.getAttribute('id');
      fetchAnagrams(`${baseApi}/WordApi/GetAsyncApi?inputword=${word}`, handleAnagramsInWordList);
      addEventListenerForWordEditingAccordeon();
    }
  });
}

// ANAGRAMS IN WORD LIST

function handleAnagramsInWordList(data) {
  renderAnagramsInWordListPage(data);
}

function addEventListenerForWordEditingAccordeon() {
  document.addEventListener('click', function (event) {
      const editBtn = event.target.closest('.show button[my-tag="edit-btn"]');
      if (editBtn) {  
          renderWordEditingForm();
          
        var editedWordInput = document.getElementById('edited-word');
        if (editedWordInput) {
            editedWordInput.addEventListener('input', function () { 
              validateEditingWord();
              addEventListenerForWordSaving();
              addEventListenerForWordRejecting();
            });
        }
      }   

// DELETE
    
      const deleteBtn = event.target.closest('.show button[my-tag="delete-btn"]');
      if (deleteBtn) {
        const confirmation = window.confirm("Ar tikrai nori ištrinti?");
        if (confirmation) {
          const id = deleteBtn.parentNode.parentNode.getAttribute("id");
          fetchWords(`${baseApi}/WordApi/DeleteAsyncApi?wordId=${id}&`, handleWordList);
        }
      }
  });
}

// WORD EDITING   

function validateEditingWord() {
  var wordInput = document.getElementById('edited-word');
  var newWord = wordInput.value;
  var validationError = document.getElementById('validation-error');
  var saveBtn = document.querySelector('[my-tag="save-btn"]');

  validationError.innerHTML = '';

  if (!(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/.test(newWord))) {
    wordInput.value = newWord.replace(/[^a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]/g, '');
  }

  
  if (newWord.trim().length < 3) {
    addValidationError(wordInput, validationError, 'Įveskite bent 3 raides');
    saveBtn.classList.add("disabled");
  } 

  checkIfWordExists(`${baseApi}/WordApi/CheckIfWordExistsAsyncApi?inputWord=${newWord}`, function(error, result) {
    if (result.exists) {
      addValidationError(wordInput, validationError, 'Toks žodis jau yra');
      saveBtn.classList.add("disabled");
    }
  });

  if (validationError.innerHTML === '') {
    wordInput.classList.remove('is-invalid');
    saveBtn.classList.remove("disabled");
  }
}

function addValidationError(inputElement, errorElement, message) {
  inputElement.classList.add('is-invalid');
  const paragraphElement = document.createElement('p');
  paragraphElement.textContent = message;
  errorElement.appendChild(paragraphElement);
}

function addEventListenerForWordSaving() {
  const saveBtn = document.querySelector('[my-tag="save-btn"]');
  if(saveBtn) {
    saveBtn.addEventListener("click", function(event) {
      const newForm = document.getElementById("edited-word").value;
      const wordId = document.querySelector('.show').getAttribute('id');
      const oldForm = document.querySelector(`a[href$='${wordId}']`).parentElement.id;
      const page = parseInt(window.location.hash.substring(window.location.hash.lastIndexOf('/') + 1), 10);

      updateAnagrams(`${baseApi}/WordApi/UpdateAsyncApi?wordId=${wordId}&oldForm=${oldForm}&newForm=${newForm}&page=${page}`, handleWordList);
    });
  }
};

function addEventListenerForWordRejecting() {
  const rejectBtn = document.querySelector('[my-tag="reject-btn"]');
  if(rejectBtn) {
    rejectBtn.addEventListener("click", function(event) {
      const wordId = document.querySelector('.show').getAttribute('id');
      const accordeonElement = document.getElementById(wordId);
      accordeonElement.classList.remove("show");
    });
  }
};


// SEARCH

function handleAnagramsInSearch(data) {
  renderAnagramsInSearchPage(data);
}

function addEventListenerForSearchPage() {
  const searchBtn = document.getElementById("search-button");
  const searchField = document.getElementById("search-input");

  if(searchField) {
    searchField.addEventListener("input", function() {

      if (!(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]+$/.test(searchField.value))) {
        searchField.value = searchField.value.replace(/[^a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž]/g, '');
      }

      if (searchField.value.length < 1) {
        searchBtn.classList.add("disabled");
      } 
      else {
        searchBtn.classList.remove("disabled");
      };
    })
  }


  if (searchBtn) {
      searchBtn.addEventListener("click", function() {
      var word = document.getElementById("search-input").value;
      fetchAnagrams(`${baseApi}/WordApi/GetAsyncApi?inputWord=${word}`, handleAnagramsInSearch);
    });
  }
}