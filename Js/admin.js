document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    loadTopSalesProducts();
    document.getElementById('saveProduct').addEventListener('click', saveProduct);
    document.getElementById('productImage').addEventListener('change', handleImageUpload);
    document.getElementById('saveTopSalesProduct').addEventListener('click', saveTopSalesProduct);
    document.getElementById('topSalesProductImage').addEventListener('change', handleTopSalesImageUpload);
});

let editingProductId = null; // Track the ID of the product being edited
let editingTopSalesProductId = null; // Track the ID of the top sales product being edited

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imagePreview = document.getElementById('productImagePreview');
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

function handleTopSalesImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const imagePreview = document.getElementById('topSalesProductImagePreview');
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
}

async function saveProduct() {
    const productName = document.getElementById('productName').value.trim();
    const productPrice = document.getElementById('productPrice').value.trim();
    const productDescription = document.getElementById('productDescription').value.trim();
    const productImagePreview = document.getElementById('productImagePreview').src;
    const productRating = document.getElementById('productRating').value;
    const starColor = document.getElementById('starColor').value;

    if (!productName || !productPrice || !productDescription || !productImagePreview) {
        alert("Please fill in all product fields and upload an image.");
        return;
    }

    const product = {
        name: productName,
        price: productPrice,
        description: productDescription,
        image: productImagePreview,
        rating: parseInt(productRating),
        starColor: starColor
    };

    try {
        let response;
        if (editingProductId) {
            // Update existing product
            response = await fetch(`http://localhost:3000/api/products/${editingProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
        } else {
            // Save new product
            response = await fetch('http://localhost:3000/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save product');
        }

        clearProductForm();
        alert("Product saved successfully!");
        loadProducts();
        editingProductId = null; // Reset editing state
    } catch (error) {
        console.error('Error saving product:', error);
        alert('Failed to save product. Please try again.');
    }
}

async function saveTopSalesProduct() {
    const productName = document.getElementById('topSalesProductName').value.trim();
    const productPrice = document.getElementById('topSalesProductPrice').value.trim();
    const productDescription = document.getElementById('topSalesProductDescription').value.trim();
    const productImagePreview = document.getElementById('topSalesProductImagePreview').src;
    const productRating = document.getElementById('topSalesProductRating').value;
    const starColor = document.getElementById('topSalesStarColor').value;

    if (!productName || !productPrice || !productDescription || !productImagePreview) {
        alert("Please fill in all product fields and upload an image.");
        return;
    }

    const product = {
        name: productName,
        price: productPrice,
        description: productDescription,
        image: productImagePreview,
        rating: parseInt(productRating),
        starColor: starColor
    };

    try {
        let response;
        if (editingTopSalesProductId) {
            // Update existing top sales product
            response = await fetch(`http://localhost:3000/api/topsales/${editingTopSalesProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
        } else {
            // Save new top sales product
            response = await fetch('http://localhost:3000/api/topsales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(product),
            });
        }

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to save top sales product');
        }

        clearTopSalesProductForm();
        alert("Top sales product saved successfully!");
        loadTopSalesProducts();
        editingTopSalesProductId = null; // Reset editing state
    } catch (error) {
        console.error('Error saving top sales product:', error);
        alert('Failed to save top sales product. Please try again.');
    }
}

function clearProductForm() {
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productDescription').value = '';
    document.getElementById('productImage').value = '';
    document.getElementById('productImagePreview').src = '#';
    document.getElementById('productImagePreview').style.display = 'none';
    document.getElementById('productRating').value = 1;
    document.getElementById('starColor').value = '#FFD43B';
}

function clearTopSalesProductForm() {
    document.getElementById('topSalesProductName').value = '';
    document.getElementById('topSalesProductPrice').value = '';
    document.getElementById('topSalesProductDescription').value = '';
    document.getElementById('topSalesProductImage').value = '';
    document.getElementById('topSalesProductImagePreview').src = '#';
    document.getElementById('topSalesProductImagePreview').style.display = 'none';
    document.getElementById('topSalesProductRating').value = 1;
    document.getElementById('topSalesStarColor').value = '#FFD43B';
}

async function loadProducts() {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    try {
        const response = await fetch('http://localhost:3000/api/products');
        const products = await response.json();
        products.forEach(product => {
            const productItem = createProductElement(product);
            productsContainer.appendChild(productItem);
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

async function loadTopSalesProducts() {
    const topSalesProductsContainer = document.getElementById('topSalesProducts');
    topSalesProductsContainer.innerHTML = '';

    try {
        const response = await fetch('http://localhost:3000/api/topsales');
        const products = await response.json();
        products.forEach(product => {
            const productItem = createTopSalesProductElement(product);
            topSalesProductsContainer.appendChild(productItem);
        });
    } catch (error) {
        console.error('Error loading top sales products:', error);
    }
}

function createProductElement(product) {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">£${product.price}</p>
        <p class="product-description">${product.description}</p>
        <p class="product-rating">Rating: ${product.rating}</p>
        <button onclick="editProduct(${product.id})">Edit</button>
        <button onclick="removeProduct(${product.id})">Remove</button>
    `;
    return productItem;
}

function createTopSalesProductElement(product) {
    const productItem = document.createElement('div');
    productItem.classList.add('product-item');
    productItem.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">£${product.price}</p>
        <p class="product-description">${product.description}</p>
        <p class="product-rating">Rating: ${product.rating}</p>
        <button onclick="editTopSalesProduct(${product.id})">Edit</button>
        <button onclick="removeTopSalesProduct(${product.id})">Remove</button>
    `;
    return productItem;
}

async function editProduct(productId) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch product for editing');
        }
        const product = await response.json();

        // Fill form fields with product data for editing
        document.getElementById('productName').value = product.name;
        document.getElementById('productPrice').value = product.price;
        document.getElementById('productDescription').value = product.description;
        document.getElementById('productImagePreview').src = product.image;
        document.getElementById('productImagePreview').style.display = 'block';
        document.getElementById('productRating').value = product.rating;
        document.getElementById('starColor').value = product.starColor;

        // Set the editingProductId to track which product is being edited
        editingProductId = productId;
    } catch (error) {
        console.error('Error editing product:', error);
        alert('Failed to fetch product for editing. Please try again.');
    }
}

async function editTopSalesProduct(productId) {
    try {
        const response = await fetch(`http://localhost:3000/api/topsales/${productId}`);
        if (!response.ok) {
            throw new Error('Failed to fetch top sales product for editing');
        }
        const product = await response.json();

        // Fill form fields with product data for editing
        document.getElementById('topSalesProductName').value = product.name;
        document.getElementById('topSalesProductPrice').value = product.price;
        document.getElementById('topSalesProductDescription').value = product.description;
        document.getElementById('topSalesProductImagePreview').src = product.image;
        document.getElementById('topSalesProductImagePreview').style.display = 'block';
        document.getElementById('topSalesProductRating').value = product.rating;
        document.getElementById('topSalesStarColor').value = product.starColor;

        // Set the editingTopSalesProductId to track which top sales product is being edited
        editingTopSalesProductId = productId;
    } catch (error) {
        console.error('Error editing top sales product:', error);
        alert('Failed to fetch top sales product for editing. Please try again.');
    }
}

async function removeProduct(productId) {
    try {
        const response = await fetch(`http://localhost:3000/api/products/${productId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to remove product');
        }

        alert("Product removed successfully!");
        loadProducts();
    } catch (error) {
        console.error('Error removing product:', error);
        alert('Failed to remove product. Please try again.');
    }
}

async function removeTopSalesProduct(productId) {
    try {
        const response = await fetch(`http://localhost:3000/api/topsales/${productId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to remove top sales product');
        }

        alert("Top sales product removed successfully!");
        loadTopSalesProducts();
    } catch (error) {
        console.error('Error removing top sales product:', error);
        alert('Failed to remove top sales product. Please try again.');
    }
}




// Function to handle form submission and save product
async function saveProduct(event) {
    event.preventDefault(); // Prevent default form submission

    const formData = new FormData(document.getElementById('product-form'));
    const productId = formData.get('productId');
    const name = formData.get('name').trim();
    const price = formData.get('price').trim();
    const description = formData.get('description').trim();
    const imageFile = formData.get('image');
    const rating = formData.get('rating');

    if (!name || !price || !description || !rating) {
        alert("Please fill in all fields.");
        return;
    }

    // Prepare FormData object to send image file
    const formDataWithImage = new FormData();
    formDataWithImage.append('name', name);
    formDataWithImage.append('price', price);
    formDataWithImage.append('description', description);
    formDataWithImage.append('rating', rating);
    formDataWithImage.append('image', imageFile);

    // Determine API endpoint and HTTP method
    let url = 'http://localhost:3000/api/newarrivals';
    let method = 'POST';

    if (productId) {
        url += `/${productId}`;
        method = 'PUT';
    }

    try {
        const response = await fetch(url, {
            method,
            body: formDataWithImage,
        });

        if (!response.ok) {
            throw new Error('Failed to save product');
        }

        alert('Product saved successfully');
        document.getElementById('product-form').reset(); // Clear form after submission
        fetchProducts(); // Reload product list or update UI
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while saving the product: ' + error.message);
    }
}

// Fetch products function (assuming it fetches and displays products in the admin panel)
async function fetchProducts() {
    // Implement your fetchProducts function as needed
}

// Attach event listener to form submission
document.getElementById('product-form').addEventListener('submit', saveProduct);

