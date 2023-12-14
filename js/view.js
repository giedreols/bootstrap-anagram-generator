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
                    <button class="btn btn-outline-success disabled" type="button" id="search-button">Ieškok!</button>
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

     if(data.errorMessages.length > 0) {
      content.innerHTML = `Kažkokia laida, soriukas`;
      return;
     }
  
     if(data.wordAndAnagrams.anagrams?.length === 0) {
       title = `<div class="italic">Nėra anagramų</div>`;
     }
  
     else {
        title = `Anagramos:`;
        data.wordAndAnagrams.anagrams?.forEach(anagram => {
        listItems += `<a class="list-group-item list-group-item-action">${anagram}</a>`;
     }); }
    
     content.innerHTML = `
             <div class="card-body">
               <div>${title}</div>
               ${listItems}
             </div>`
  }  

export function renderWordEditingForm() {
  const currentWord = document.querySelector('.collapse.show').previousElementSibling.id;
  const content = document.querySelector('.collapse.show .card-body');

  content.innerHTML = `   
  <form class="needs-validation" novalidate>
    <div class="form-group">
      <label class="form-label">Nauja žodžio forma:</label>
      <input type="text" class="form-control" id="edited-word" value=${currentWord} maxlength="10" required>
      <div class="invalid-feedback" id="validation-error"></div>
    </div>
    <button my-tag="reject-btn" type="button" class="btn btn-outline-danger btn-sm">Atmesti</button>
    <button my-tag="save-btn" type="submit" class="btn btn-outline-primary btn-sm disabled">Išsaugoti</button>
  </form>
`;
}

export function renderAnagramsInWordListPage(data) {
  const content = document.getElementById(data.wordAndAnagrams.wordId);
  let title = "";
  let listItems = "";

  if(data.wordAndAnagrams.anagrams?.length === 0) {
    title = `<div class="italic">Nėra anagramų</div>`;
  }
  else {
    title = `Anagramos:`;
    data.wordAndAnagrams.anagrams?.forEach(anagram => {
    listItems += `<a class="list-group-item list-group-item-action">${anagram}</a>`;
  });
  }
  
  content.innerHTML = `
          <div class="card-body">
              <button my-tag="edit-btn" type="button" class="btn btn-outline-success btn-sm">Keisti</button>
              <button my-tag="delete-btn" type="button" class="btn btn-outline-danger btn-sm">Trinti</button>
          <div class="card-body">
              <div>${title}</div>
              ${listItems}
            </div>
          </div>
  `;
}

export function renderWordListPage(data) {
    const content = document.getElementById('content');
    let listItems = "";
    let pagination = "";

    const keyValueArray = Object.entries(data.currentPageWords).map(([key, value]) => ({ key, value }));
    const sortedArray = keyValueArray.sort((a, b) => a.value.localeCompare(b.value));

    for (const {key, value } of sortedArray) {
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

