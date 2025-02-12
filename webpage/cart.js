document.addEventListener("DOMContentLoaded", () => {
    const cartButtons = document.querySelectorAll(".add-to-cart");
    const cartCount = document.getElementById("cart-count");

    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    function updateCartCount() {
        const cart = getCart();
        cartCount.textContent = cart.length;
    }

    function addToCart(name, price) {
        let cart = getCart();
        cart.push({ name, price });
        saveCart(cart);
        alert(`${name} added to cart!`);
    }

    cartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = button.getAttribute("data-price");
            addToCart(name, price);
        });
    });

    updateCartCount();

    if (document.getElementById("cart-items")) {
        const cartItemsContainer = document.getElementById("cart-items");
        const clearCartBtn = document.getElementById("clear-cart");

        function displayCart() {
            const cart = getCart();
            cartItemsContainer.innerHTML = ""; 

            if (cart.length === 0) {
                cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
                return;
            }

            cart.forEach((item, index) => {
                const cartItem = document.createElement("div");
                cartItem.innerHTML = `
                    <p>${item.name} - Rs.${item.price}</p>
                    <button onclick="removeItem(${index})">Remove</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });
        }

        window.removeItem = function(index) {
            let cart = getCart();
            cart.splice(index, 1);
            saveCart(cart);
            displayCart();
        };

        clearCartBtn.addEventListener("click", () => {
            localStorage.removeItem("cart");
            displayCart();
        });

        displayCart();
    }
});
