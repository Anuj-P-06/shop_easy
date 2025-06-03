// DOM Elements
const featuredProductsContainer = document.getElementById('featured-products');
const productsContainer = document.getElementById('products-container');
const productDetailContainer = document.getElementById('product-detail-container');
const relatedProductsContainer = document.getElementById('related-products');
const cartContainer = document.getElementById('cart-container');
const cartSummary = document.getElementById('cart-summary');
const orderSummary = document.getElementById('order-summary');
const cartCountElement = document.getElementById('cart-count');
const categoryFilter = document.getElementById('category-filter');
const sortFilter = document.getElementById('sort-filter');
const checkoutForm = document.getElementById('checkout-form');
const newsletterForm = document.getElementById('newsletter-form');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Add to cart function
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    saveCart();
    
    // Show confirmation message
    const message = document.createElement('div');
    message.className = 'add-to-cart-message';
    message.textContent = 'Item added to cart!';
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.classList.add('show');
        setTimeout(() => {
            message.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(message);
            }, 300);
        }, 2000);
    }, 10);
}

// Remove from cart function
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    renderCart();
}

// Update quantity in cart
function updateCartItemQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            renderCart();
        }
    }
}

// Calculate cart total
function calculateCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Render featured products
function renderFeaturedProducts() {
    if (!featuredProductsContainer) return;

    const featured = products; // Show all products

    let html = '';
    featured.forEach(product => {
        html += createProductCard(product);
    });

    featuredProductsContainer.innerHTML = html;

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });

    // Add event listeners to product cards for navigation
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart-btn')) {
                const productId = this.getAttribute('data-id');
                window.location.href = `product-detail.html?id=${productId}`;
            }
        });
    });
}


// Render all products with filtering and sorting
function renderProducts() {
    if (!productsContainer) return;
    
    let filteredProducts = [...products];
    
    // Apply category filter
    if (categoryFilter && categoryFilter.value !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilter.value);
    }
    
    // Apply sorting
    if (sortFilter) {
        switch (sortFilter.value) {
            case 'price-low':
                filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // Default sorting (featured)
                break;
        }
    }
    
    let html = '';
    
    if (filteredProducts.length === 0) {
        html = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h2>No products found</h2>
                <p>Try changing your filters or check back later for new products.</p>
            </div>
        `;
        productsContainer.innerHTML = html;
        return;
    }
    
    filteredProducts.forEach(product => {
        html += createProductCard(product);
    });
    
    productsContainer.innerHTML = html;
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    // Add event listeners to product cards for navigation
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (!e.target.classList.contains('add-to-cart-btn')) {
                const productId = this.getAttribute('data-id');
                window.location.href = `product-detail.html?id=${productId}`;
            }
        });
    });
}

// Render product detail page
function renderProductDetail() {
    if (!productDetailContainer) return;
    
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }
    
    const product = getProductById(productId);
    
    if (!product) {
        window.location.href = 'products.html';
        return;
    }
    
    // Update breadcrumb
    const breadcrumbName = document.getElementById('product-breadcrumb-name');
    if (breadcrumbName) {
        breadcrumbName.textContent = product.name;
    }
    
    // Render product detail
    productDetailContainer.innerHTML = `
        <div class="product-detail-image">
            <img src="${product.image}" alt="${product.name}">
        </div>
        <div class="product-detail-info">
            <h1>${product.name}</h1>
            <div class="product-detail-price">$${product.price.toFixed(2)}</div>
            <div class="product-rating">${generateStarRating(product.rating)}</div>
            <div class="product-detail-description">
                <p>${product.description}</p>
            </div>
            <div class="product-detail-meta">
                <p><strong>Category:</strong> ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
                <p><strong>Availability:</strong> ${product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</p>
            </div>
            <div class="product-quantity">
                <label>Quantity:</label>
                <div class="quantity-input">
                    <button class="quantity-btn" id="decrease-quantity">-</button>
                    <input type="number" id="product-quantity" value="1" min="1" max="${product.stock}">
                    <button class="quantity-btn" id="increase-quantity">+</button>
                </div>
            </div>
            <button class="btn" id="add-to-cart-detail">Add to Cart</button>
        </div>
    `;
    
    // Add event listeners for quantity buttons
    const quantityInput = document.getElementById('product-quantity');
    const decreaseBtn = document.getElementById('decrease-quantity');
    const increaseBtn = document.getElementById('increase-quantity');
    
    decreaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
            quantityInput.value = currentValue - 1;
        }
    });
    
    increaseBtn.addEventListener('click', function() {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < product.stock) {
            quantityInput.value = currentValue + 1;
        }
    });
    
    // Add event listener for add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-detail');
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        addToCart(productId, quantity);
    });
    
    // Render related products
    if (relatedProductsContainer) {
        const relatedProducts = getRelatedProducts(productId, product.category);
        
        let relatedHTML = '';
        relatedProducts.forEach(product => {
            relatedHTML += createProductCard(product);
        });
        
        relatedProductsContainer.innerHTML = relatedHTML;
        
        // Add event listeners to "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.stopPropagation();
                const productId = parseInt(this.getAttribute('data-id'));
                addToCart(productId);
            });
        });
        
        // Add event listeners to product cards for navigation
        document.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', function(e) {
                if (!e.target.classList.contains('add-to-cart-btn')) {
                    const productId = this.getAttribute('data-id');
                    window.location.href = `product-detail.html?id=${productId}`;
                }
            });
        });
    }
}

// Render cart page
function renderCart() {
    if (!cartContainer || !cartSummary) return;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any products to your cart yet.</p>
                <a href="products.html" class="btn">Continue Shopping</a>
            </div>
        `;
        
        cartSummary.innerHTML = '';
        return;
    }
    
    let cartHTML = '';
    
    cart.forEach(item => {
        cartHTML += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                </div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease-cart-quantity" data-id="${item.id}">-</button>
                    <input type="number" value="${item.quantity}" min="1" class="cart-quantity-input" data-id="${item.id}">
                    <button class="quantity-btn increase-cart-quantity" data-id="${item.id}">+</button>
                </div>
                <div class="cart-item-remove" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </div>
            </div>
        `;
    });
    
    cartContainer.innerHTML = cartHTML;
    
    // Calculate totals
    const subtotal = calculateCartTotal();
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;
    
    cartSummary.innerHTML = `
        <h2>Order Summary</h2>
        <div class="summary-item">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-item">
            <span>Shipping</span>
            <span>$${shipping.toFixed(2)}</span>
        </div>
        <div class="summary-item summary-total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
        <div class="cart-buttons">
            <a href="products.html" class="btn btn-small">Continue Shopping</a>
            <a href="checkout.html" class="btn">Checkout</a>
        </div>
    `;
    
    // Add event listeners for quantity buttons
    document.querySelectorAll('.decrease-cart-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateCartItemQuantity(productId, item.quantity - 1);
            }
        });
    });
    
    document.querySelectorAll('.increase-cart-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const item = cart.find(item => item.id === productId);
            if (item) {
                updateCartItemQuantity(productId, item.quantity + 1);
            }
        });
    });
    
    document.querySelectorAll('.cart-quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const quantity = parseInt(this.value);
            if (quantity > 0) {
                updateCartItemQuantity(productId, quantity);
            } else {
                this.value = 1;
                updateCartItemQuantity(productId, 1);
            }
        });
    });
    
    // Add event listeners for remove buttons
    document.querySelectorAll('.cart-item-remove').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Render order summary on checkout page
function renderOrderSummary() {
    if (!orderSummary) return;
    
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    let orderItemsHTML = '';
    
    cart.forEach(item => {
        orderItemsHTML += `
            <div class="order-item">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
    });
    
    // Calculate totals
    const subtotal = calculateCartTotal();
    const shipping = 10;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;
    
    orderSummary.innerHTML = `
        <h2>Order Summary</h2>
        ${orderItemsHTML}
        <div class="summary-item">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-item">
            <span>Shipping</span>
            <span>$${shipping.toFixed(2)}</span>
        </div>
        <div class="summary-item">
            <span>Tax</span>
            <span>$${tax.toFixed(2)}</span>
        </div>
        <div class="summary-item order-total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
}

// Handle checkout form submission
if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send the form data to a server
        // For this example, we'll just clear the cart and redirect to a thank you page
        
        // Clear cart
        cart = [];
        saveCart();
        
        // Show success message
        alert('Order placed successfully! Thank you for your purchase.');
        
        // Redirect to home page
        window.location.href = 'index.html';
    });
}

// Handle newsletter form submission
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // In a real application, you would send this to a server
        // For this example, we'll just show a success message
        
        alert(`Thank you for subscribing with ${email}!`);
        emailInput.value = '';
    });
}

// Handle mobile menu toggle
if (mobileMenuBtn && nav) {
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('show');
    });
}

// Handle category and sort filters
if (categoryFilter) {
    categoryFilter.addEventListener('change', renderProducts);
}

if (sortFilter) {
    sortFilter.addEventListener('change', renderProducts);
}

// Initialize page based on current URL
function initPage() {
    const currentPage = window.location.pathname.split('/').pop();
    
    updateCartCount();
    
    switch (currentPage) {
        case 'index.html':
        case '':
            renderFeaturedProducts();
            break;
        case 'products.html':
            renderProducts();
            break;
        case 'product-detail.html':
            renderProductDetail();
            break;
        case 'cart.html':
            renderCart();
            break;
        case 'checkout.html':
            renderOrderSummary();
            break;
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', initPage);

