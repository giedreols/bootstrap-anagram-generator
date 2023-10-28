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
    </p>
  </div>  
  `;
}

export function renderWords(data) {
    const content = document.getElementById('content');
    let listItems = "";
    let pagination = "";

    for (const [key, value] of Object.entries(data.currentPageWords)) {
        listItems += `<a href="#${value}" class="list-group-item list-group-item-action">${value}</a>`;
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
          <a id="next-page-button" class="page-link" href="#/word-management/${data.currentPage + 1}" aria-label="Kitas">
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
        <p class="card-text">
            <div class="list-group">${listItems}</div>
        </p>
        ${pagination}
    </div>
    `;
}

export function renderAbout(data) {
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

