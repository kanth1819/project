document.addEventListener("DOMContentLoaded", () => {
    const cartButtons = document.querySelectorAll(".add-to-cart");
    const cartCount = document.getElementById("cart-count");

    // Function to Get Cart from Local Storage
    function getCart() {
        return JSON.parse(localStorage.getItem("cart")) || [];
    }

    // Function to Save Cart to Local Storage
    function saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
    }

    // Function to Update Cart Count in Header
    function updateCartCount() {
        const cart = getCart();
        cartCount.textContent = cart.length;
    }

    // Function to Add Item to Cart
    function addToCart(name, price) {
        let cart = getCart();
        cart.push({ name, price });
        saveCart(cart);
        alert(`${name} added to cart!`);
    }

    // Add Event Listeners to "Add to Cart" Buttons
    cartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = button.getAttribute("data-price");
            addToCart(name, price);
        });
    });

    // Update Cart Count on Page Load
    updateCartCount();

    // Code for Cart Page (cart.html)
    if (document.getElementById("cart-items")) {
        const cartItemsContainer = document.getElementById("cart-items");
        const clearCartBtn = document.getElementById("clear-cart");

        function displayCart() {
            const cart = getCart();
            cartItemsContainer.innerHTML = ""; // Clear previous content

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
