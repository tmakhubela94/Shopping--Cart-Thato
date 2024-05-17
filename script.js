let cartItems = [];

function addToCart(name, price) {
  const quantity = parseInt(document.querySelector('.quantity').value);
  const item = { name, price, quantity };
  cartItems.push(item);
  updateCart();
}

function updateCart() {
  const cartItemsElement = document.querySelector('.cart-items');
  cartItemsElement.innerHTML = '';
  let totalPrice = 0;
  cartItems.forEach(item => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${item.name} - $${item.price} x ${item.quantity} <button onclick="removeFromCart('${item.name}')">Remove</button>`;
    cartItemsElement.appendChild(listItem);
    totalPrice += item.price * item.quantity;
  });
  document.getElementById('total-price').textContent = totalPrice;
}

function removeFromCart(name) {
  cartItems = cartItems.filter(item => item.name !== name);
  updateCart();
}

function clearCart() {
  cartItems = [];
  updateCart();
}
