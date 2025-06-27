let ord = "asc";
let cat = "%";
let searchQuery = "";
let products = document.querySelector(".prod");

const fetchProducts = () => {
    fetch(`/products/search?q=${searchQuery}&ord=${ord}&cat=${cat}`, { method: 'GET' })
        .then(res => res.json())
        .then(data => {
            products.innerHTML = '';
            data.forEach(jedan_red => {
                let productClass = jedan_red.availability ? "border border-success border-1 rounded-pill d-inline-block px-3 py-1" : "border border-danger border-1 rounded-pill d-inline-block px-3 py-1";
                products.innerHTML += `
                    <div class="col-md-4">
                        <div class="card mb-4">
                            <img src="./products_img/${jedan_red.image_url}" class="card-img-top" alt="${jedan_red.name}" height="300">
                            <div class="card-body">
                                <h5 class="card-title">${jedan_red.name}</h5>
                                <p class="card-text">${jedan_red.description}</p>
                                <p class="card-text ${productClass}">$${jedan_red.price}</p>
                            </div>
                        </div>
                    </div>`;
            });
        });
};

document.getElementById('searchInput').addEventListener('input', function () {
    searchQuery = this.value;
    if (searchQuery.length > 1) {
        fetch(`/products/suggestions?q=${searchQuery}&cat=${cat}`)
            .then(res => res.json())
            .then(data => {
                const suggestions = document.getElementById('suggestions');
                suggestions.innerHTML = '';
                data.forEach(suggestion => {
                    const suggestionItem = document.createElement('a');
                    suggestionItem.classList.add('list-group-item', 'list-group-item-action');
                    suggestionItem.textContent = suggestion;
                    suggestionItem.addEventListener('click', function () {
                        document.getElementById('searchInput').value = suggestion;
                        searchQuery = suggestion;
                        suggestions.innerHTML = '';
                        fetchProducts();
                    });
                    suggestions.appendChild(suggestionItem);
                });
            });
    } else {
        document.getElementById('suggestions').innerHTML = '';
    }
});

document.getElementById('searchBtn').addEventListener('click', function () {
    searchQuery = document.getElementById('searchInput').value;
    fetchProducts();
});

document.getElementById('searchInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('searchBtn').click();
    }
});

const category = value => {
    cat = value;
    fetchProducts();
};

const order = value => {
    ord = value;
    fetchProducts();
};

document.getElementById('categorySelect').addEventListener('change', function () {
    category(this.value);
});

document.getElementById('orderSelect').addEventListener('change', function () {
    order(this.value);
});

fetchProducts(); // Initial fetch
