// model.js

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

export function checkIfWordExists(apiUrl, callback) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', apiUrl, true);
    req.onload  = function() {
        var jsonResponse = req.response;
       callback(null, jsonResponse);
    };
    req.send(null);
}

export function fetchAnagrams(apiUrl, callback) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', apiUrl, true);
    req.onload  = function() {
       var jsonResponse = req.response;
       callback(jsonResponse);
    };
    req.send(null);
}

export function updateAnagrams(apiUrl, callback) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('POST', apiUrl, true);
    req.onload  = function() {
       var jsonResponse = req.response;
       callback(jsonResponse);
    };
    req.send(null);
}

export function fetchAbout() {
    return new Promise((resolve) => {       
            resolve({
                description: 'Čia yra anagramų generatorius.',
            });         
    });
}