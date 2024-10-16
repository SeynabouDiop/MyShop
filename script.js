const products = [
    { id: 1, name: "Thiebou dieune penda mbaye", price: 2500 },
    { id: 2, name: "Jus de Bissap", price: 1500 },
    { id: 3, name: "Yassa Guinar", price: 1500 },
    { id: 4, name: "Soupe Kandia", price: 1500 },
    { id: 5, name: "Vermicelle guinar", price: 1500 },
    { id: 6, name: "Dibi Haoussa", price: 1500 },
    { id: 7, name: "jus de Gingembre", price: 1500 },
    { id: 8, name: "Cafe Touba Mbacke bi", price: 2000 },
    { id: 9, name: "Jus bouye", price: 2000 },
    { id: 10, name: "Jus bouye a la fraise", price: 2000 },
    { id: 11, name: "Mafe bou tangue djeurrr", price: 2000 },
    { id: 12, name: "Glace supplement chocolat", price: 2500 }
];

let cart = [];

function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ""; 
    products.forEach(product => {
        const productCard = `
            <div class="col-lg-4 col-md-6 wow fadeIn mb-3">
                    <div class="property-item rounded overflow-hidden shadow">
                        <div class="position-relative overflow-hidden">
                            <a href="#">
                                <img src="img/pexels-chanwalrus-958545.jpg" alt="${product.name}" class="img-fluid">
                            </a>
                            <div class="bg-dark rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">Nos Menus</div>
                            <div class="bg-dark rounded text-white position-absolute start-0 bottom-0 max-4 pt-1 px-3">${product.price} FCFA</div>
                        </div>
                        <div class="p-4 pb-0">
                            <h5 class="text-dark mb-3">${product.name}</h5>
                            
                        </div>
                        <div class="d-flex border-top mb-3">
                            <button class="btn btn-dark my-2 flex-fill text-center border-center border-end py-2 text-dark" onclick="addToCart(${product.id})"><i class="fa-solid fa-cart-shopping text-white me-2"></i></button>
                            <button class="btn btn-dark my-2 flex-fill text-center border-center border-end py-2 text-dark"><i class="fa-solid fa-heart text-white me-2"></i></button>
                            <button class="btn btn-dark my-2 flex-fill text-center border-center border-end py-2 text-dark"><i class="fa-solid fa-share text-white me-2"></i></button>
                        </div>
                         
                    </div>
                </div>
        `;
        productList.innerHTML += productCard;
    });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1; 
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartCount(); 
}

function updateCartCount() {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').innerText = totalItems;
}

function showCart() {
    const cartTableBody = document.getElementById('cart-table-body');
    cartTableBody.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        const cartItemRow = `
            <tr>
                <td>${item.name}</td>
                <td>${item.price}FCFA</td>
                <td>
                    <input type="number" class="form-control" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
                </td>
                <td>${itemTotal}FCFA</td>
            </tr>
        `;
        cartTableBody.innerHTML += cartItemRow;
        total += itemTotal;
    });

    document.getElementById('total-value').innerText = `Total: ${total}FCFA`;
}

function updateQuantity(productId, quantity) {
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = parseInt(quantity);
        updateCartCount();
        showCart(); 
    }
}


document.getElementById('cart-btn').addEventListener('click', () => {
    showCart();
});


renderProducts();

