// controller.js

// Import your model and view functions.
import { fetchWords } from './model.js';
import { fetchAbout } from './model.js';
import { fetchAnagrams } from './model.js';
import { renderWords } from './view.js';
import { renderAbout } from './view.js';
import { renderSearchPage } from './view.js';


function renderControllerContent(route) {
    const content = document.getElementById('content');
    switch (route) {
        case '#/search':
            renderSearchPage();
            break;
        case '#/word-management':
            fetchWords("http://localhost:5254/WordApi/IndexAsyncApi", handleData);
            console.log("fetchWords called and returned data into controller");
            
            //renderWords(xxx);

                // xxx.then((data) => {
                //     renderWords(data);
                // })
                // .catch((error) => {
                //     console.error(error);
                // });
            break;
        case '#/about':
            fetchAbout()
                .then((data) => {
                    renderAbout(data);
                })
                .catch((error) => {
                    console.error(error);
                });
            break;
        default:
            content.innerHTML = "<p>Puslapis nerastas</p>";
    }
}

function handleData(data) {
    console.log("handleData called " + data.totalPages);
    renderWords(data);
}

window.addEventListener('hashchange', () => {
    renderControllerContent(window.location.hash);
});

renderControllerContent(window.location.hash);

document.getElementById("search-button").addEventListener("click", function() {
    var searchValue = document.getElementById("search-input").value;
    var apiUrl = "http://localhost:5254/WordApi/GetAsyncApi?inputWord=" + searchValue;

    fetchAnagrams(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Handle the response from the controller here.
    })
    .catch(error => {
        console.error('Error:', error);
    });
});