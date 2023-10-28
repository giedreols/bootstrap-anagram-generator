// controller.js

// Import your model and view functions.
import { fetchWords } from './model.js';
import { fetchAbout } from './model.js';
import { fetchAnagrams } from './model.js';
import { renderWords } from './view.js';
import { renderAbout } from './view.js';
import { renderSearchPage } from './view.js';

const baseApi = "http://localhost:5254";

function renderControllerContent(route) {
    console.log("renderControllerContent called");
    const content = document.getElementById('content');

    if(route == '#/search') renderSearchPage();

    else if (route.startsWith('#/word-management')) 
    {
        const page = parseInt(route.substring(route.lastIndexOf('/') + 1), 10);
        fetchWords(`${baseApi}/WordApi/IndexAsyncApi?page=${page}`, handleWordList);
    }

    else if (route == '#/about') {
            fetchAbout()
                .then((data) => {
                    renderAbout(data);
                })
                .catch((error) => {
                    console.error(error);
                });
            }
    else content.innerHTML = "<p>Puslapis nerastas</p>";
    }

function handleWordList(data) {
    console.log(data);
    renderWords(data);
}

window.addEventListener('hashchange', () => {
    renderControllerContent(window.location.hash);
});

renderControllerContent(window.location.hash);

//document.querySelector
// WORD LIST PAGINATION 

// document.getElementById('next-page-button').addEventListener('click', function(event) {
//     console.log("event listener called");
//     event.preventDefault();
//     const currentPage = parseInt(this.getAttribute('href').split('/').pop());
//     console.log("currentPage: " + currentPage);
//     handlePagination(currentPage);
//   });



function handlePagination(page) {  
    console.log(`HandlePagination called ${page}`);

    // const newUrl = `#/word-management/${page}`;
    // history.pushState({ page }, null, newUrl);

    fetchWords(`${baseApi}/WordApi/IndexAsyncApi/?page=${page}`, handleWordList);
};

// Function to handle popstate events (e.g., when the user uses the browser's back/forward buttons)
window.onpopstate = function(event) {
    if (event.state) {
      const page = event.state.page;
      fetchWords(`${baseApi}/WordApi/IndexAsyncApi/?page=${page}`, handleWordList);
    }
  };

  
 
// SEARCH

// document.getElementById("search-button").addEventListener("click", function() {
//     var searchValue = document.getElementById("search-input").value;
//     var apiUrl = `${baseApi}/WordApi/GetAsyncApi?inputWord=${searchValue}`;

//     fetchAnagrams(apiUrl, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(jsonData),
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         // Handle the response from the controller here.
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });
// });

