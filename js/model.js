// model.js


// Simulated data for demonstration purposes.
const dummyData = {
    description: 'Čia yra anagramų generatorius.',
};

export function fetchWords(apiUrl, callback) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', apiUrl, true);
    req.onload  = function() {
       var jsonResponse = req.response;
       callback(jsonResponse);
    };
    req.send(null);
}

export function fetchAnagrams(apiUrl, callback) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', apiUrl, true);
    req.onload  = function() {
       var jsonResponse = req.response;

       return new Promise((resolve, reject) => {       
        resolve(jsonResponse);         
        });
    };
    req.send(null);
}

export function fetchAbout() {
    return new Promise((resolve, reject) => {       
            resolve(dummyData);         
    });
}