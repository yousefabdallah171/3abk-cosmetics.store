function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

function displayCheckoutItems() {
    const cart = getCart();
    const checkoutItems = document.getElementById('checkoutItems');
    checkoutItems.innerHTML = '';
    cart.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'checkout-item';
        itemDiv.innerHTML = `
                    <div class="checkout-item-image">
                        <img src="${item.image}" alt="${item.name}" />
                    </div>
                    <div class="checkout-item-details">
                        <span class="checkout-item-name">${item.name}</span>
                        <span class="checkout-item-price">EGP:${item.price.toFixed(2)}</span>
                    </div>
                    <button class="remove-item-btn" data-index="${index}">Remove</button>
                `;
        checkoutItems.appendChild(itemDiv);
    });

    // Populate hidden inputs with cart items
    const cartItemsContainer = document.getElementById('cartItems');
    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = `item_${index}`;
        hiddenInput.value = `${item.name}, EGP:${item.price.toFixed(2)}`;
        cartItemsContainer.appendChild(hiddenInput);
    });

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.addEventListener('click', function () {
            const index = this.getAttribute('data-index');
            removeFromCart(index);
        });
    });

    // Display total cost
    calculateTotal();
}

function calculateTotal() {
    const cart = getCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('totalPrice').textContent = `Total: EGP ${total.toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(index) {
    let cart = getCart();
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCheckoutItems();
    calculateTotal();
}

// Form validation and submission
document.getElementById('orderForm').addEventListener('submit', function (event) {
    const phoneNumberInput = document.querySelector('input[name="phoneNumber"]');
    if (phoneNumberInput.value.length < 11) {
        event.preventDefault(); // Prevent form submission
        alert('Phone number must be at least 11 digits long.');
    }
});

// Populate checkout items and total initially
displayCheckoutItems();

const header = document.getElementById('siteHeader');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > header.clientHeight) {
        // Scroll down
        header.classList.add('header-hide');
        header.classList.remove('header-show');
    } else {
        // Scroll up or at the top
        header.classList.remove('header-hide');
        header.classList.add('header-show');
    }

    lastScrollTop = scrollTop;
});
