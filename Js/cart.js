// Initialize the cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to load and display cart items on the cart page
function loadCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = ''; // Clear previous items

    let totalPrice = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'checkout-item';
            itemDiv.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="checkout-item-details">
                    <span class="checkout-item-name">${item.name}</span>
                    <span class="checkout-item-price">EGP ${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-button" onclick="removeFromCart(${index})">Remove</button>
            `;
            cartItemsContainer.appendChild(itemDiv);
            totalPrice += item.price;
        });
    }

    // Display total price
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.textContent = `Total: EGP ${totalPrice.toFixed(2)}`;

    // Save updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to remove an item from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart array
    loadCart(); // Reload cart items
}

// Function to proceed to checkout
function checkout() {
    if (cart.length > 0) {
        window.location.href = 'checkout.html'; // Redirect to checkout page
    } else {
        alert('Your cart is empty!');
    }
}

// Initialize the cart display when the page loads
document.addEventListener('DOMContentLoaded', loadCart);

// Get the header element
// Get the header element
const header = document.getElementById('siteHeader');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Scroll down
    if (currentScroll > lastScroll && currentScroll > header.clientHeight) {
        header.classList.add('header-hide');
        header.classList.remove('header-show');
    }
    // Scroll up
    else {
        header.classList.remove('header-hide');
        header.classList.add('header-show');
    }

    lastScroll = currentScroll;
});
