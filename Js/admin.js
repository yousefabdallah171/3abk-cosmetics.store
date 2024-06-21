document.addEventListener('DOMContentLoaded', () => {
    loadColors();
    loadProducts();
    loadHeader();

    // Event listeners
    document.getElementById('saveProduct').addEventListener('click', saveProduct);
    document.getElementById('updateHeader').addEventListener('click', updateHeader);
    document.getElementById('productImage').addEventListener('change', handleImageUpload);

    // Initial load of products
    loadProducts();
});

// Function to save color preferences
function saveColors() {
    const colors = {
        productName: document.getElementById('productNameColor').value,
        productPrice: document.getElementById('productPriceColor').value,
        sectionHeader: document.getElementById('sectionHeaderColor').value,
        productDescription: document.getElementById('productDescriptionColor').value
    };
    localStorage.setItem('adminColors', JSON.stringify(colors));
    applyColors(colors);
}

// Function to apply color preferences
function applyColors(colors) {
    document.querySelectorAll('.product-name').forEach(element => {
        element.style.color = colors.productName;
    });
    document.querySelectorAll('.product-price').forEach(element => {
        element.style.color = colors.productPrice;
    });
    document.querySelectorAll('.section-header').forEach(element => {
        element.style.color = colors.sectionHeader;
    });
    document.querySelectorAll('.product-description').forEach(element => {
        element.style.color = colors.productDescription;
    });
}

// Function to load and apply saved color preferences
function loadColors() {
    const savedColors = localStorage.getItem('adminColors');
    if (savedColors) {
        applyColors(JSON.parse(savedColors));
    }
}

// Function to save a new product
function saveProduct() {
    const productName = document.getElementById('productName').value.trim();
    const productPrice = document.getElementById('productPrice').value.trim();
    const productDescription = document.getElementById('productDescription').value.trim();
    const productImagePreview = document.getElementById('productImagePreview').src;
    const productRating = document.getElementById('productRating').value;
    const starColor = document.getElementById('starColor').value;

    // Validate inputs
    if (!productName || !productPrice || !productDescription || !productImagePreview) {
        alert("Please fill in all product fields and upload an image.");
        return;
    }

    // Create product object
    const product = {
        name: productName,
        price: productPrice,
        description: productDescription,
        image: productImagePreview,
        rating: parseInt(productRating),
        starColor: starColor
    };

    // Retrieve existing products from localStorage or initialize empty array
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Add new product to the array
    products.push(product);

    // Save updated products array back to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Clear form fields and preview after saving
    clearProductForm();

    // Notify other tabs about the update
    broadcastProductUpdate();

    // Alert and reload products display
    alert("Product saved successfully!");
    loadProducts();
}

// Function to load and display saved products
function loadProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    // Retrieve products from localStorage or initialize empty array
    const products = JSON.parse(localStorage.getItem('products')) || [];

    // Iterate over each product and display it
    products.forEach(product => {
        const productItem = createProductElement(product);
        productsContainer.appendChild(productItem);
    });
}

// Function to create HTML element for a product
function createProductElement(product) {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');

    productItem.innerHTML = `
        <div>
            <img src="${product.image}" alt="${product.name}">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">&pound;${product.price}</p>
            <p class="product-description">${product.description}</p>
            <p class="product-rating">Rating: ${product.rating}</p>
            <button onclick="removeProduct('${product.name}')">Remove</button>
        </div>
    `;

    return productItem;
}

// Function to remove a product
function removeProduct(productName) {
    let products = JSON.parse(localStorage.getItem('products')) || [];

    // Filter out the product to be removed
    products = products.filter(product => product.name !== productName);

    // Update localStorage with the new products array
    localStorage.setItem('products', JSON.stringify(products));

    // Notify other tabs about the update
    broadcastProductUpdate();

    // Reload products display after removing a product
    loadProducts();
}

// Function to clear product form fields and preview
function clearProductForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('productImagePreview').src = '';
}

// Function to handle image upload and preview
function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('productImagePreview').src = e.target.result;
            document.getElementById('productImagePreview').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

// Function to broadcast product update to other tabs
function broadcastProductUpdate() {
    localStorage.setItem('productUpdate', Date.now());
}

// Event listener to react to changes in productUpdate key in localStorage
window.addEventListener('storage', (event) => {
    if (event.key === 'productUpdate') {
        loadProducts();
    }
});

// Function to load and display saved header
function loadHeader() {
    const savedHeader = localStorage.getItem('sectionHeader');
    if (savedHeader) {
        document.getElementById('sectionHeader').textContent = savedHeader;
        updateIndexHeader(savedHeader); // Update header in index.html on initial load
    }
}

// Function to update the section header
function updateHeader() {
    const newHeader = document.getElementById('newHeader').value.trim();
    if (!newHeader) {
        alert("Please enter a header text.");
        return;
    }
    document.getElementById('sectionHeader').textContent = newHeader;
    localStorage.setItem('sectionHeader', newHeader);

    // Update header dynamically in index.html
    updateIndexHeader(newHeader);
}

// Function to update the header in index.html dynamically
function updateIndexHeader(newHeader) {
    const indexHeader = document.getElementById('indexHeader'); // Adjust the ID as per your index.html structure
    if (indexHeader) {
        indexHeader.textContent = newHeader;
    }
}

// Initial load of products when the page loads
loadProducts();
