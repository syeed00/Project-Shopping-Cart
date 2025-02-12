let cart = JSON.parse(localStorage.getItem("cart")) || [];
const API_URL = "https://fakestoreapi.com/products";

document.addEventListener("DOMContentLoaded", () => {
    fetchProducts();
    updateCartUI();
});

async function fetchProducts() {
    try {
        let response = await fetch(API_URL);
        let products = await response.json();
        renderProducts(products.slice(0, 8)); // Show 8 products
    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function renderProducts(products) {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("col");

        productItem.innerHTML = `
            <div class="card h-100">
                <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
                <div class="card-body p-2">
                    <h6 class="card-title text-truncate">${product.title}</h6>
                    <p class="text-muted small text-truncate">${product.description}</p>
                    <p class="fw-bold">$${product.price}</p>
                    <button class="btn btn-sm btn-success w-100" onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
                </div>
            </div>
        `;

        productList.appendChild(productItem);
    });
}

function addToCart(id, title, price, image) {
    let existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, title, price, image, quantity: 1 });
    }
    updateCartUI();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

function updateQuantity(id, action) {
    let item = cart.find(item => item.id === id);
    
    if (action === "increase") {
        item.quantity += 1;
    } else if (action === "decrease" && item.quantity > 1) {
        item.quantity -= 1;
    }
    
    updateCartUI();
}

function clearCart() {
    cart = [];
    updateCartUI();
}

function updateCartUI() {
    localStorage.setItem("cart", JSON.stringify(cart));

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    let total = 0;
    cartItems.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.quantity;

        const li = document.createElement("li");
        li.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");
        
        li.innerHTML = `
            <img src="${item.image}" class="cart-img me-2">
            <span>${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
            <button class="btn btn-sm btn-danger" onclick="removeFromCart(${item.id})">Remove</button>
            <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${item.id}, 'decrease')">-</button>
            <button class="btn btn-sm btn-secondary" onclick="updateQuantity(${item.id}, 'increase')">+</button>
        `;

        cartItems.appendChild(li);
    });

    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = cart.length;
}
