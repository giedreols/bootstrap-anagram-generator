// view.js

export function renderSearchPage() {
    const content = document.getElementById('content');
    content.innerHTML = `   
  <div class="card-body">
    <h5 class="card-title">Anagramų paieška</h5>
    <p class="card-text">
        <div class="search-field">
            <div class="input-group mb-3 d-flex justify-content-center">
                <input type="search" id="search-input" class="form-control" placeholder="siela..." aria-label="paieška" aria-describedby="basic-addon2" maxlength="10" size="10">
                <div class="input-group-append">
                    <button class="btn btn-outline-success" type="button" id="search-button">Ieškok!</button>
                </div>
            </div>
        </div>
        <div id="anagrams"> </div>
    </p>
  </div>  
  `;
}


export function renderAnagramsInSearchPage(data) {
     const content = document.getElementById("anagrams");
     let title = "";
     let listItems = "";
  
     if(data.anagrams.length === 0) {
       title = `<div class="italic">Nėra anagramų</div>`;
     }
  
     else {
      title = `Anagramos:`;
       data.anagrams.forEach(anagram => {
       listItems += `<a class="list-group-item list-group-item-action">${anagram}</a>`;
     }); }
    
     content.innerHTML = `
             <div class="card-body">
               <div>${title}</div>
               ${listItems}
             </div>`
  }

export function renderAnagramsInWordListPage(data) {
  const content = document.getElementById(data.wordId);
  let title = "";
  let listItems = "";

  if(data.anagrams.length === 0) {
    title = `<div class="italic">Nėra anagramų</div>`;
  }
  else {
    title = `Anagramos:`;
    data.anagrams.forEach(anagram => {
    listItems += `<a class="list-group-item list-group-item-action">${anagram}</a>`;
  });
  }
  
  content.innerHTML = `
          <div class="card-body">
            <div>${title}</div>
            ${listItems}
          </div>
  `;
}

export function renderWordListPage(data) {
    const content = document.getElementById('content');
    let listItems = "";
    let pagination = "";

    for (const [key, value] of Object.entries(data.currentPageWords)) {
      listItems += `
        <div class="card-header" id="${value}">
          <a class="list-group-item list-group-item-action" data-bs-toggle="collapse" href="#${key}">
            ${value}
          </a>
        </div>
        <div id="${key}" class="collapse" data-bs-parent="#accordion"> </div>
      `;
    }

    if (data.totalPages > 1) { 
        pagination = `
        <nav>     
        <ul class="pagination">
        <li class="${data.currentPage === 1 ? "page-item disabled" : "page-item"}">
          <a class="page-link" href="#/word-management/${data.currentPage - 1}" aria-label="Ankstesnis">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Ankstesnis</span>
          </a>
        </li>
        
        <li class="${data.currentPage === data.totalPages ? "page-item disabled" : "page-item"}">
          <a class="page-link" href="#/word-management/${data.currentPage + 1}" aria-label="Kitas">
            <span class="sr-only">Kitas</span>
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
       </ul>  
       </nav> 
       `;
    }

    content.innerHTML = `
    <div class="card-body">
        <h5 class="card-title">Žodžių sąrašas</h5>
        <div id="accordion">
          <div class="card">
            ${listItems}
          </div>
        </div>
        ${pagination}
    </div>
    `;
}

export function renderAboutPage(data) {
    const content = document.getElementById('content');
    content.innerHTML = `   
  <div class="card-body">
    <h5 class="card-title">Apie</h5>
    <p class="card-text">
        <div class="input-group mb-3">
           <p>${data.description}</p>
        </div>
    </p>
  </div>  
    `;
}

