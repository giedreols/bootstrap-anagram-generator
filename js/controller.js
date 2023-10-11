// controller.js

// Import your model and view functions.
import { fetchWords } from './model.js';
import { fetchAbout } from './model.js';
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
            fetchWords()
                .then((data) => {
                    renderWords(data);
                })
                .catch((error) => {
                    console.error(error);
                });
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


window.addEventListener('hashchange', () => {
    renderControllerContent(window.location.hash);
});

renderControllerContent(window.location.hash);
