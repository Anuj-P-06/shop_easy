# JavaScript E-Commerce Storefront

## Table of Contents
- [Project Overview](#project-overview)
- [Reasons for Making This Project](#reasons-for-making-this-project)
- [Tools and Technologies Used](#tools-and-technologies-used)
- [App Structure](#app-structure)
- [JavaScript Architecture (app.js)](#javascript-architecture-appjs)
- [Styling (styles.css)](#styling-stylescss)
- [How to Run the Project](#how-to-run-the-project)
- [Screenshots](#screenshots)
- [Key Learnings](#key-learnings)

## Project Overview
This is a multi-page, modular, and responsive E-Commerce web application built using HTML, CSS, and vanilla JavaScript. The application mimics a complete online shopping experience, including:

- Homepage with featured products
- Products listing with filters and sorting
- Product detail pages with add-to-cart functionality
- Shopping cart and order summary
- Checkout flow
- Persistent cart storage using localStorage

## Reasons for Making This Project
- To simulate a real-world, fully interactive e-commerce user experience
- To master JavaScript DOM manipulation, routing logic, and modular code structure
- To build a scalable project with dynamic rendering
- To apply responsive design principles with CSS Flexbox/Grid
- To practice state persistence and cart management without external libraries or frameworks

## Tools and Technologies Used
- **HTML5** – Page structure
- **CSS3** – Styling and responsive layout
- **JavaScript (Vanilla)** – Dynamic rendering and logic
- **localStorage** – Cart persistence
- **Modular JS Files** – Clean separation of data and logic (`products.js`, `app.js`)

## App Structure

### 1. index.html – Home Page
- Hero banner section
- Featured products (rendered via JS)
- Shop by Category (Electronics, Clothing, Home & Kitchen)
- Newsletter form
- Footer

### 2. products.html – All Products Page
- Filter by category
- Sort by price or name
- Dynamically generated product grid

### 3. product-detail.html – Single Product View
- Full product detail with add-to-cart functionality
- Quantity selector
- Related products section

### 4. cart.html – Shopping Cart Page
- View, update, or remove items from cart
- Summary: subtotal, shipping, total

### 5. checkout.html – Checkout Page
- Shipping and payment forms
- Final order summary
- Clears cart upon submission

## JavaScript Architecture (app.js)

### 1. 🔗 DOM Selections
```js
const featuredProductsContainer = document.getElementById('featured-products');
const productsContainer = document.getElementById('products-container');
// ... and more for cart, filters, forms
```

### 2. 🛒 Cart Management

#### a) Load/Save Cart
```js
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}
```

#### b) Update Cart Count
```js
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCountElement) cartCountElement.textContent = totalItems;
}
```

#### c) Add to Cart
```js
function addToCart(productId, quantity = 1) {
    // Checks if item exists, adds or updates quantity
    // Popup or alert shown to user
}
```

#### d) Remove or Update Item
```js
function removeFromCart(productId) { /* logic */ }
function updateCartItemQuantity(productId, quantity) { /* logic */ }
```

#### e) Calculate Total
```js
function calculateCartTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}
```

### 3. 🛍️ Product Rendering

#### a) Render Featured Products
```js
function renderFeaturedProducts() {
    // Loops through products
    // Appends cards to homepage
}
```

#### b) Render All Products (with Filters & Sorting)
```js
function renderProducts() {
    // Applies category + sort filter
    // Uses createProductCard()
}
```

#### c) Render Product Detail
```js
function renderProductDetail() {
    // Gets ID from URL
    // Loads product and related products
}
```

### 4. 🧾 Cart & Checkout Rendering

#### a) Render Cart
```js
function renderCart() {
    // If empty, show empty state
    // Else, show product list and subtotal
}
```

#### b) Render Order Summary
```js
function renderOrderSummary() {
    // Lists products + subtotal, shipping, tax
}
```

### 5. 💳 Form Handling

#### a) Checkout Form
```js
checkoutForm.addEventListener('submit', function(e) {
    e.preventDefault();
    cart = [];
    saveCart();
    alert('Order placed!');
    window.location.href = 'index.html';
});
```

#### b) Newsletter Form
```js
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for subscribing!');
});
```

### 6. 📱 Mobile Navigation
```js
mobileMenuBtn.addEventListener('click', function() {
    nav.classList.toggle('show');
});
```

### 7. 🎛️ Filters & Sorting Logic
```js
categoryFilter.addEventListener('change', renderProducts);
sortFilter.addEventListener('change', renderProducts);
```

### 8. 🧭 Page Detection and Initialization
```js
function initPage() {
    const currentPage = window.location.pathname.split('/').pop();
    switch (currentPage) {
        case 'index.html': renderFeaturedProducts(); break;
        case 'products.html': renderProducts(); break;
        case 'product-detail.html': renderProductDetail(); break;
        case 'cart.html': renderCart(); break;
        case 'checkout.html': renderOrderSummary(); break;
    }
}
document.addEventListener('DOMContentLoaded', initPage);
```

## ✅ Summary of Features

| Feature               | Function(s) Used                        |
|-----------------------|-----------------------------------------|
| Render homepage       | `renderFeaturedProducts()`              |
| Product listing       | `renderProducts()`                      |
| Single product detail | `renderProductDetail()`                 |
| Add/update/remove cart| `addToCart()`, `updateCartItemQuantity()` |
| Cart display & total  | `renderCart()`, `calculateCartTotal()`  |
| Checkout summary      | `renderOrderSummary()`                  |
| Form handling         | `checkoutForm`, `newsletterForm`        |
| Responsive nav        | `mobileMenuBtn` logic                   |
| Page-based rendering  | `initPage()`                            |

## Styling (styles.css)
- Modern responsive design with Flexbox & Grid
- Breakpoints for: 992px, 768px, 576px
- Consistent color palette and typography
- Styled components include header, hero, cards, forms, and footers
- Custom empty cart state and responsive category layouts

## How to Run the Project
Clone or download the repository, and open `index.html` in a browser:

```bash
git clone https://github.com/yourusername/ecommerce-js-store.git
cd ecommerce-js-store
open index.html
```

> Works without a backend or server – fully client-side.

## Screenshots
Home:
![Image](https://github.com/user-attachments/assets/f65aafaf-0122-45d5-a51f-ea1d5fa9b18a)

![Image](https://github.com/user-attachments/assets/5fb0ce96-5107-4c65-b508-e4e804efe9c1)

![Image](https://github.com/user-attachments/assets/efffefc8-d926-4641-b5c6-061a35b8f94c)

![Image](https://github.com/user-attachments/assets/9b8da634-385a-4eba-abb0-6d2c7bf00d93)


product:
![Image](https://github.com/user-attachments/assets/7a6fb931-1080-4abf-9dbf-d99a3673ac64)

![Image](https://github.com/user-attachments/assets/e998cab0-9480-47ed-830f-e366d0a51785)


Cart:
![Image](https://github.com/user-attachments/assets/dbc19586-e4e2-499a-af6a-cd81624b167f)


Checkout:
![Image](https://github.com/user-attachments/assets/0680f787-4990-4796-9a6a-7d7a571cbe1d)


## Key Learnings
- DOM manipulation at scale using vanilla JavaScript
- Modular file structure and separation of concerns
- Using localStorage for state management
- Responsive design implementation
- Page detection and dynamic content rendering without frameworks
