// Initialize the cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Redirect to the cart page when cart icon is clicked
function redirectToCartPage() {
    window.location.href = 'cart.html'; // Replace 'cart.html' with your actual cart page
}

function addToCart(name, price, image) {
    alert(`Added ${name}  $${price} to Your cart.`);
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



document.addEventListener('DOMContentLoaded', () => {
    const bestSellerContainer = document.getElementById('sellers');

    displayProducts();
    loadHeader();

    async function fetchProducts() {
        try {
            const response = await fetch('http://localhost:3000/api/products');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Failed to fetch products:', error);
            return [];
        }
    }

    async function displayProducts() {
        bestSellerContainer.innerHTML = '';
        const products = await fetchProducts();

        if (products.length === 0) {
            bestSellerContainer.textContent = 'No products available';
            return;
        }

        for (let i = 0; i < products.length; i += 4) {
            const section = document.createElement('div');
            section.classList.add('best-seller');

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

                section.appendChild(productDiv);
            }
            // section.appendChild(productWrapper);
            bestSellerContainer.appendChild(section);
        }
    }

    function loadHeader() {
        // Your existing loadHeader function logic remains the same
    }

    function updateProducts() {
        displayProducts();
    }

    window.addEventListener('storage', (event) => {
        if (event.key === 'products') {
            updateProducts();
        }
    });

    function addToCart(name, price, image) {
        console.log(`Added ${name} to cart.`);
        // Implement your cart logic here
    }
});


// Function to fetch top sales products
async function fetchTopSales() {
    try {
        const response = await fetch('http://localhost:3000/api/topsales');
        const products = await response.json();
        const container = document.getElementById('top-sales-container');
        container.innerHTML = ''; // Clear any existing content

        products.forEach(product => {
            // Create product card
            const productDiv = document.createElement('div');
            productDiv.classList.add('best-p1');

            productDiv.innerHTML = `

                        <img src="${product.image}" alt="${product.name}"class="image" onclick="openImage(this.src)">

                        <div class="best-p1-txt">
                            <div class="name-of-p">
                                <p>${product.name}</p>
                            </div>
                            <div class="rating">
                                ${renderStars(product.rating, product.starColor)}
                            </div>
                            <p class="description">${product.description}</p>
                            <div class="price">
                                &pound;${product.price}
                            </div>
                            <div class="buy-now">
                                <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">
                                    <a>Add to Cart
                                    <i style="" class=" fas fa-shopping-bag"></i></a>
                                </button>
                                <button onclick="addToCart('${product.name}', ${product.price}, '${product.image}')">
                                    <a href="checkout.html">Buy now
                                    <i class="fas fa-credit-card"></i></a>
                                </button>
                            </div>
                        </div>
                    `;
            container.appendChild(productDiv);
        });
    } catch (error) {
        console.error('Error fetching top sales products:', error);
    }
}

// Function to render star rating
function renderStars(rating, starColor = '#FFD43B') {
    const maxStars = 5;
    let starHtml = '';
    for (let i = 1; i <= maxStars; i++) {
        starHtml += `<i class="fa-solid fa-star" style="color: ${i <= rating ? starColor : '#ccc'};"></i>`;
    }
    return starHtml;
}


// Fetch top sales products on page load
window.onload = fetchTopSales;
//


// 
function openImage(src) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    modal.style.display = "block";
    modalImg.src = src;
}

function closeModal() {
    var modal = document.getElementById("imageModal");
    modal.style.display = "none";
}

function closeModalOnClick(event) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImage");
    if (event.target !== modalImg) {
        modal.style.display = "none";
    }
}
