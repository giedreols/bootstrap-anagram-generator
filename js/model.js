// model.js


// Simulated data for demonstration purposes.
const dummyData = {
    description: 'Čia yra anagramų generatorius.',
};

const wordListViewModel = {
    currentPageWords: ['siela', 'liepa', 'pasaka', 'Adelė', 'ruduo', 'vakaras', 'diena', 'gyvenimas', 'tvarka', 'siena', 'karvė', 'šuo'],
    currentPage: 2,
    totalWords: 12,
    pageSize: 20,
    totalPages: 100,
};

export function fetchWords(apiUrl, callback) {
    var req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', apiUrl, true);
    req.onload  = function() {
       var jsonResponse = req.response;
       console.log("fetchWords called " + jsonResponse.totalPages);
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
       console.log(jsonResponse);

       return new Promise((resolve, reject) => {       
        resolve(jsonResponse);         
        });
    };
    req.send(null);


    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4) {
    //         console.log(xhr.readyState);
    //         if (xhr.status === 200) {
    //             try {
    //                 var data = JSON.parse(xhr.responseText);
    //                 console.log(data);
    //                 callback(null, data);
    //             } catch (error) {
    //                 callback("Error parsing JSON", null);
    //             }
    //         } else {
    //             callback("HTTP error: " + xhr.status, null);
    //         }
    //     }
    // };

    // xhr.send();
}

export function fetchAbout() {
    return new Promise((resolve, reject) => {       
            resolve(dummyData);         
    });
}