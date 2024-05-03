document.addEventListener("DOMContentLoaded", function() {
  const products = [
      { id: 1, name: "Lipstick", price: 10.99 },
      { id: 2, name: "Mascara", price: 8.99 },
      { id: 3, name: "Foundation", price: 14.99 }
  ];

  let cartItems = [];
  let totalPrice = 0;

  const productsDiv = document.getElementById("products");
  const cartItemsUl = document.getElementById("cart-items");
  const totalPriceSpan = document.getElementById("total-price");
  const nameInput = document.getElementById("name");
  const addressInput = document.getElementById("address");
  const phoneInput = document.getElementById("phone");
  const checkoutBtn = document.getElementById("checkout-btn");

  // Function to display products
  function displayProducts() {
      products.forEach(product => {
          const productDiv = document.createElement("div");
          productDiv.classList.add("product");
          productDiv.innerHTML = `
              <h3>${product.name}</h3>
              <p>Price: $${product.price.toFixed(2)}</p>
              <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
          `;
          productsDiv.appendChild(productDiv);
      });
  }

  // Function to update cart
  function updateCart() {
      cartItemsUl.innerHTML = "";
      totalPrice = 0;
      cartItems.forEach(item => {
          const li = document.createElement("li");
          li.classList.add("cart-item");
          li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
          const deleteBtn = document.createElement("button");
          deleteBtn.classList.add("delete-btn");
          deleteBtn.textContent = "Delete";
          deleteBtn.addEventListener("click", function() {
              removeFromCart(item.id);
          });
          li.appendChild(deleteBtn);
          cartItemsUl.appendChild(li);
          totalPrice += item.price;
      });
      totalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;
  }

  // Function to handle adding items to cart
  function addToCart(id) {
      const product = products.find(p => p.id === id);
      if (product) {
          cartItems.push({ id: product.id, name: product.name, price: product.price });
          updateCart();
      }
  }

  // Function to handle removing items from cart
  function removeFromCart(id) {
      cartItems = cartItems.filter(item => item.id !== id);
      updateCart();
  }

  // Event listener for add to cart button
  productsDiv.addEventListener("click", function(event) {
      if (event.target.classList.contains("add-to-cart-btn")) {
          const productId = parseInt(event.target.getAttribute("data-id"));
          addToCart(productId);
      }
  });

  // Event listener for checkout button
  checkoutBtn.addEventListener("click", function() {
      const name = nameInput.value.trim();
      const address = addressInput.value.trim();
      const phone = phoneInput.value.trim();

      if (!name || !address || !phone) {
          alert("Please fill out all shipping details.");
          return;
      }

      if (cartItems.length === 0) {
          alert("Your cart is empty.");
          return;
      }

      alert(`Checkout successful!\nTotal amount: $${totalPrice.toFixed(2)}\nShipping Details:\nName: ${name}\nAddress: ${address}\nPhone: ${phone}`);
  });

  // Display initial products
  displayProducts();
});
