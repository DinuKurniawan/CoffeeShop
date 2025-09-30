// Shopping cart functionality
let cart = [];

// DOM elements
const cartButton = document.getElementById("cartButton");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const continueShopping = document.getElementById("continueShopping");
const cartCount = document.getElementById("cartCount");
const cartItems = document.getElementById("cartItems");
const emptyCart = document.getElementById("emptyCart");
const cartSubtotal = document.getElementById("cartSubtotal");
const cartTax = document.getElementById("cartTax");
const cartTotal = document.getElementById("cartTotal");
const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");

// Toggle mobile menu
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Open cart modal
cartButton.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
  updateCartDisplay();
});

// Close cart modal
closeCart.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

continueShopping.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

// Update quantity for coffee items
function updateQuantity(itemId, change) {
  const quantityElement = document.getElementById(`${itemId}-quantity`);
  let quantity = parseInt(quantityElement.textContent);
  quantity += change;

  if (quantity < 0) quantity = 0;

  quantityElement.textContent = quantity;
}

// Add item to cart
function addToCart(name, price, itemId) {
  const quantityElement = document.getElementById(`${itemId}-quantity`);
  const quantity = parseInt(quantityElement.textContent);

  if (quantity === 0) {
    alert("Silakan tambahkan jumlah pesanan terlebih dahulu");
    return;
  }

  // Check if item already in cart
  const existingItemIndex = cart.findIndex((item) => item.name === name);

  if (existingItemIndex !== -1) {
    // Update quantity if item exists
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({
      name,
      price,
      quantity,
    });
  }

  // Reset quantity display
  quantityElement.textContent = "0";

  // Update cart count
  updateCartCount();

  // Show success message
  alert(`${quantity} ${name} telah ditambahkan ke keranjang`);
}

// Update cart item count badge
function updateCartCount() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = totalItems;
}

// Update cart display in modal
function updateCartDisplay() {
  if (cart.length === 0) {
    emptyCart.classList.remove("hidden");
    cartItems.innerHTML = "";
  } else {
    emptyCart.classList.add("hidden");

    let cartHTML = "";
    let subtotal = 0;

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      subtotal += itemTotal;

      cartHTML += `
                        <div class="flex justify-between items-center mb-4 pb-4 border-b">
                            <div>
                                <h3 class="font-semibold">${item.name}</h3>
                                <p class="text-sm text-[#7d5d3f]">Rp ${item.price.toLocaleString(
                                  "id-ID"
                                )} x ${item.quantity}</p>
                            </div>
                            <div class="flex items-center">
                                <span class="mr-4 font-semibold">Rp ${itemTotal.toLocaleString(
                                  "id-ID"
                                )}</span>
                                <button class="text-red-500" onclick="removeFromCart(${index})">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                    `;
    });

    cartItems.innerHTML = cartHTML;

    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    cartSubtotal.textContent = `Rp ${subtotal.toLocaleString("id-ID")}`;
    cartTax.textContent = `Rp ${tax.toLocaleString("id-ID")}`;
    cartTotal.textContent = `Rp ${total.toLocaleString("id-ID")}`;
  }
}

// Remove item from cart
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCartCount();
  updateCartDisplay();
}

// Contact form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  if (!name || !email || !message) {
    alert("Harap isi semua field");
    return;
  }

  alert("Pesan telah terkirim! Kami akan menghubungi Anda segera.");
  this.reset();
});

// Initialize cart count
updateCartCount();
