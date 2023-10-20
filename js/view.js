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
    console.log("renderWords called " + data.totalPages);
    const content = document.getElementById('content');
    let listItems = "";
    let pageNumbers = "";

    for (const [key, value] of Object.entries(data.currentPageWords)) {
        listItems += `<a href="#${value}" class="list-group-item list-group-item-action">${value}</a>`;
    }

    //if(data.totalPages < 10) {
        for (let page = 1; page <= data.totalPages; page++) {
            pageNumbers += `<li class="page-item"><a class="page-link" href="#${page}">${page} </a></li>`;
        }
    // }

    content.innerHTML = `
    <div class="card-body">
        <h5 class="card-title">Žodžių sąrašas</h5>
        <p class="card-text">
            <div class="list-group">${listItems}</div>
        </p>
        <nav>     
            <ul class="pagination pagination-sm">${pageNumbers}</ul>  
        </nav>      
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

