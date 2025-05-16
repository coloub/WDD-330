import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector(".product-list").innerHTML = htmlItems.join("");
  addRemoveButtonListeners();
}

function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <button class="button remove-btn" data-id="${item.Id}">Remove</button>
</li>`;

  return newItem;
}

function removeItemFromCart(productId) {
  let cartItems = getLocalStorage("so-cart") || [];
  cartItems = cartItems.filter(item => item.Id !== productId);
  setLocalStorage("so-cart", cartItems);
  renderCartContents();
}

function addRemoveButtonListeners() {
  const buttons = document.querySelectorAll(".remove-btn");
  buttons.forEach(button => {
    button.addEventListener("click", (event) => {
      const id = event.target.getAttribute("data-id");
      removeItemFromCart(id);
    });
  });
}

renderCartContents();
