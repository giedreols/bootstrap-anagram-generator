// view.js


export function renderSearchPage() {
    const content = document.getElementById('content');
    content.innerHTML = `   
  <div class="card-body">
    <h5 class="card-title">Anagramų paieška</h5>
    <p class="card-text">
        <div class="input-group mb-3">
            <input type="search" class="form-control" placeholder="siela..." aria-label="paieška" aria-describedby="basic-addon2">
            <div class="input-group-append">
                <button class="btn btn-outline-success" type="submit">Ieškok!</button>
            </div>
        </div>
    </p>
  </div>  
    `;
}

export function renderWords(data) {
    const content = document.getElementById('content');    
    let listItems = "";
    let pageNumbers = "";

    data.currentPageWords.forEach(item => {
        listItems += `<a href="#${item}" class="list-group-item list-group-item-action">${item}</a>`;
    });
    
    for (let page = 1; page <= data.totalPages; page++) {
            pageNumbers += `<li class="page-item"><a class="page-link" href="#${page}">${page} </a></li>`;       
    }

    content.innerHTML = `
    <div class="card-body">
        <h5 class="card-title">Žodžių sąrašas</h5>
        <p class="card-text">
            <div class="list-group">${listItems}</div>
        </p>
        <button id="loadMoreBtn" class="btn btn-primary">Daugiau...</button>      
    </div>
    `;
}

{/* <nav>     
<ul class="pagination pagination-sm">${pageNumbers}</ul>  
</nav> */}

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

