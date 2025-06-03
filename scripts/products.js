const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 79.99,
        description: "Experience crystal-clear sound with these comfortable wireless headphones. Perfect for music, calls, and gaming.",
        image: "../images/wireless earphone.jpg",
        category: "electronics",
        rating: 4.5,
        stock: 15
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 129.99,
        description: "Track your fitness goals, receive notifications, and more with this feature-packed smartwatch.",
        image: "../images/smartwatch.jpg",
        category: "electronics",
        rating: 4.2,
        stock: 8
    },
    {
        id: 3,
        name: "Men's Casual T-Shirt",
        price: 24.99,
        description: "Comfortable cotton t-shirt perfect for everyday wear. Available in multiple colors and sizes.",
        image: "../images/mens casual t-shirt.jpg",
        category: "clothing",
        rating: 4.0,
        stock: 25
    },
    {
        id: 4,
        name: "Women's Running Shoes",
        price: 89.99,
        description: "Lightweight and supportive running shoes designed for comfort and performance.",
        image: "../images/women shoes.jpg",
        category: "clothing",
        rating: 4.7,
        stock: 12
    },
    {
        id: 5,
        name: "Coffee Maker",
        price: 49.99,
        description: "Brew delicious coffee at home with this easy-to-use coffee maker.",
        image: "../images/coffee maker.jpg",
        category: "home",
        rating: 4.3,
        stock: 10
    },
    {
        id: 6,
        name: "Stainless Steel Cookware Set",
        price: 149.99,
        description: "Complete cookware set including pots, pans, and utensils for all your cooking needs.",
        image: "../images/stainless steel applicance.jpg",
        category: "home",
        rating: 4.8,
        stock: 5
    },
    {
        id: 7,
        name: "Wireless Charging Pad",
        price: 29.99,
        description: "Charge your compatible devices without the hassle of cables.",
        image: "../images/wireless charging pad.jpg",
        category: "electronics",
        rating: 4.1,
        stock: 20
    },
    {
        id: 8,
        name: "Denim Jacket",
        price: 59.99,
        description: "Classic denim jacket that never goes out of style. Perfect for layering in any season.",
        image: "../images/denim jacket.jpg",
        category: "clothing",
        rating: 4.4,
        stock: 15
    }
];

// Function to generate star ratings
function generateStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="fas fa-star"></i>';
    }
    
    // Add half star if needed
    if (halfStar) {
        starsHTML += '<i class="fas fa-star-half-alt"></i>';
    }
    
    // Add empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<i class="far fa-star"></i>';
    }
    
    return starsHTML;
}

// Function to create product card HTML
function createProductCard(product) {
    return `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-rating">${generateStarRating(product.rating)}</div>
                <button class="btn btn-small add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        </div>
    `;
}

// Function to get product by ID
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

// Function to get related products (same category, excluding current product)
function getRelatedProducts(currentProductId, category, limit = 4) {
    return products
        .filter(product => product.category === category && product.id !== parseInt(currentProductId))
        .slice(0, limit);
}