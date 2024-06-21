// Initialize the cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Redirect to the cart page when cart icon is clicked
function redirectToCartPage() {
    window.location.href = 'cart.html'; // Replace 'cart.html' with your actual cart page
}

function addToCart(name, price, image) {
    const product = { name, price, image };
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart)); // Save to localStorage
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    cartCount.textContent = cart.length;

    const cartItems = document.getElementById('cartItems');
    if (cartItems) {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'cart-item';
            itemDiv.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" width="50" height="50">
                </div>
                <div class="cart-item-details">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">EGP ${item.price.toFixed(2)}</span>
                    <button onclick="removeFromCart(${index})">Remove</button>
                </div>
            `;
            cartItems.appendChild(itemDiv);
        });
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage
    updateCart();
}

function checkout() {
    if (cart.length > 0) {
        window.location.href = 'checkout.html';
    } else {
        alert('Your cart is empty!');
    }
}


// home transtion code
document.addEventListener('DOMContentLoaded', function () {
    const smoothScrollLinks = document.querySelectorAll('.smooth-scroll');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default link click behavior
            const targetId = this.getAttribute('href').substring(1); // Get the target section ID
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                // Custom smooth scroll function with faster end
                dynamicSmoothScrollTo(targetElement);
            }
        });
    });
});

function dynamicSmoothScrollTo(element) {
    const targetPosition = element.getBoundingClientRect().top;
    const startPosition = window.pageYOffset;
    const distance = targetPosition;
    const duration = 1500; // Set the duration of the scroll in milliseconds (1.5 seconds)
    let start = null;

    // Animation function
    function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = easeOutQuad(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Easing function for a faster end
    function easeOutQuad(t, b, c, d) {
        t /= d;
        return -c * t * (t - 2) + b;
    }

    requestAnimationFrame(animation);
}
// eending scrool code
// img login code // Toggle dropdown menu visibility// Toggle dropdown menu visibility

document.addEventListener('DOMContentLoaded', function () {
    const dropdownMenu = document.getElementById("dropdownMenu");
    const userAvatar = document.getElementById("userAvatar");
    const navLinks = document.querySelector('.nav-links');
    const toggleMenu = document.querySelector('.toggle-menu');

    // Function to toggle the dropdown menu visibility
    function toggleDropdown() {
        dropdownMenu.style.display = (dropdownMenu.style.display === 'block') ? 'none' : 'block';
    }

    // Function to toggle the navigation menu visibility
    function toggleNavMenu() {
        navLinks.classList.toggle('active');
    }

    // Event listener for clicks outside the dropdown menu and user avatar
    document.addEventListener('click', function (event) {
        if (!dropdownMenu.contains(event.target) && !userAvatar.contains(event.target)) {
            dropdownMenu.style.display = 'none'; // Hide the dropdown menu
        }
    });

    // Event listener for clicks outside the navigation links and toggle menu
    document.addEventListener('click', function (event) {
        if (!navLinks.contains(event.target) && !toggleMenu.contains(event.target)) {
            navLinks.classList.remove('active'); // Hide the navigation links
        }
    });

    // Prevent closing the dropdown menu when clicking inside it
    dropdownMenu.addEventListener('click', function (event) {
        event.stopPropagation(); // Stop the event from bubbling up to document
    });

    // Event listener for the user avatar click to toggle dropdown
    userAvatar.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent the click event from bubbling up to document
        toggleDropdown();
    });

    // Event listener for toggle menu click to toggle navigation links
    toggleMenu.addEventListener('click', function () {
        toggleNavMenu();
    });
});

// pro from here 
// index.js
// img login code // Toggle dropdown menu visibility// Toggle dropdown menu visibility
// Example index.js (assuming index.html structure and elements)
document.addEventListener('DOMContentLoaded', () => {
    const localStorageKey = 'products';
    const bestSellerContainer = document.getElementById('sellers');
    let products = JSON.parse(localStorage.getItem(localStorageKey)) || [];

    displayProducts();
    loadHeader(); // Ensure header is loaded initially

    function displayProducts() {
        bestSellerContainer.innerHTML = '';

        // Split products into groups of four
        for (let i = 0; i < products.length; i += 4) {
            const section = document.createElement('div');
            section.classList.add('seller', 'container');

            // Create header for the section
            const header = document.createElement('h2');
            header.textContent = getHeader(i); // Get header dynamically based on current index
            header.classList.add('section-header'); // Add appropriate class for styling
            section.appendChild(header);

            const productWrapper = document.createElement('div');
            productWrapper.classList.add('best-seller');

            // Add up to four products in this section
            for (let j = i; j < i + 4 && j < products.length; j++) {
                const product = products[j];
                const productDiv = document.createElement('div');
                productDiv.classList.add('best-p1');

                const ratingStars = Array(product.rating)
                    .fill(`<i class="fa-solid fa-star" style="color: ${product.starColor};"></i>`)
                    .join('');

                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}">
                    <div class="best-p1-txt">
                        <div class="name-of-p">
                            <p>${product.name}</p>
                        </div>
                        <div class="rating">
                            ${ratingStars}
                        </div>
                        <p class="description">${product.description}</p>
                        <div class="price">
                            &pound;${product.price}
                        </div>
                        <div class="buy-now">
                            <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">
                                <a>Add to Cart</a>
                            </button>
                            <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">
                                <a href="checkout.html">Buy now</a>
                            </button>
                        </div>
                    </div>
                `;

                productWrapper.appendChild(productDiv);
            }

            section.appendChild(productWrapper);
            bestSellerContainer.appendChild(section);
        }
    }

    // Function to get header dynamically based on index
    function getHeader(index) {
        
        // return products[index]?.header || 'All';
    }

    // Function to load and display saved header
    function loadHeader() {
        const savedHeader = localStorage.getItem('sectionHeader');
        if (savedHeader) {
            const indexHeader = document.getElementById('indexHeader'); // Adjust the ID as per your index.html structure
            if (indexHeader) {
                indexHeader.textContent = savedHeader;
            }
        }
    }

    // Function to handle adding a product to cart (example implementation)
    function addToCart(name, price, image) {
        console.log(`Added ${name} to cart.`);
        // Implement your cart logic here
    }
});
