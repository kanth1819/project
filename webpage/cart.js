document.addEventListener("DOMContentLoaded", function () {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    updateCartCount();
    if (document.getElementById("cart-items")) renderCart();

    // 🛒 Add to Cart Button
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            let name = this.dataset.name;
            let price = this.dataset.price;

            // Instead of merging quantities, we push a new item each time
            cart.push({ name, price });

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartCount();
        });
    });

    function updateCartCount() {
        let cartCountElement = document.getElementById("cart-count");
        if (cartCountElement) cartCountElement.textContent = cart.length;
    }

    // 🛍️ Render Cart Items
    function renderCart() {
        let cartItems = document.getElementById("cart-items");
        cartItems.innerHTML = "";

        if (cart.length === 0) {
            cartItems.innerHTML = "<p>Your cart is empty.</p>";
            return;
        }

        cart.forEach((item, index) => {
            let div = document.createElement("div");
            div.innerHTML = `
                <p>${item.name} - Rs. ${item.price} 
                <button onclick="removeFromCart(${index})">Remove</button>
                </p>
            `;
            cartItems.appendChild(div);
        });
    }

    // 🗑 Remove a Specific Item
    window.removeFromCart = function(index) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
        updateCartCount();
    };

    // 🔄 Clear Cart
    let clearCartButton = document.getElementById("clear-cart");
    if (clearCartButton) {
        clearCartButton.addEventListener("click", function () {
            localStorage.removeItem("cart");
            cart = [];
            renderCart();
            updateCartCount();
        });
    }
});
