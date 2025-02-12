document.addEventListener("DOMContentLoaded", () => {
    displayCheckoutItems();
});

function displayCheckoutItems() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const checkoutItems = document.getElementById("checkout-items");
    const checkoutTotal = document.getElementById("checkout-total");

    let total = 0;
    checkoutItems.innerHTML = "";

    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("list-group-item");

        div.innerHTML = `
            <img src="${item.image}" class="cart-img me-2">
            <span>${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</span>
        `;

        checkoutItems.appendChild(div);
    });

    checkoutTotal.textContent = `$${total.toFixed(2)}`;
}

function completeCheckout() {
    alert("Purchase successful! Thank you for shopping.");
    localStorage.removeItem("cart");
    window.location.href = "index.html";
}
