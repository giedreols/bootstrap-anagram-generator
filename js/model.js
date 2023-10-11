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


export function fetchWords() {
    return new Promise((resolve, reject) => {       
            resolve(wordListViewModel);         
    });
}

export function fetchAbout() {
    return new Promise((resolve, reject) => {       
            resolve(dummyData);         
    });
}