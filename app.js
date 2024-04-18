const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Dionysus",
    price: 9.99,
    colors: [
      {
        code: "Black",
        img: "PAGINA WEB 2/DIONYSUS NEGRA.png",
      },
      {
        code: "White",
        img: "PAGINA WEB 2/DIONYSUS BLANCA.png",
      },
    ],
  },
  {
    id: 2,
    title: "One More Rep",
    price: 9.99,
    colors: [
      {
        code: "Black",
        img: "PAGINA WEB 2/ONE MORE REP NEGRA.png",
      },
      {
        code: "White",
        img: "PAGINA WEB 2/ONE MORE REP BLANCA.png",
      },
    ],
  },
  {
    id: 3,
    title: "The World Is Ours",
    price: 9.99,
    colors: [
      {
        code: "Black",
        img: "PAGINA WEB 2/THE WORLD IS OURS NEGRA.png",
      },
      {
        code: "White",
        img: "PAGINA WEB 2/THE WORLD IS OURS BKANCO.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = choosenProduct.colors.map(color => {
  const colorElementId = `product-${choosenProduct.id}-${color.code}`
  const colorElement = document.getElementById(colorElementId);
  return colorElement;
}) 
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    //assing new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
    currentProductColors.forEach(c => c.classList.remove("selected"));
    color.classList.add("selected");
  });
});

let choosenSize = null; // Definir choosenSize como nulo al principio

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    choosenSize = size.textContent; // Asignar el tamaño seleccionado a choosenSize
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

const addToCartButton = document.querySelector(".AddButton");
const cartCount = document.getElementById("cart-count");
const cartContainer = document.querySelector(".cart");
const cartToggle = document.querySelector(".Cart");
const cart = []; // Array to store added items

cartToggle.addEventListener("click", () => {
  if (cartContainer.style.display === "none" || cartContainer.style.display === "") {
    cartContainer.style.display = "block";
  } else {
    cartContainer.style.display = "none";
  }
});

addToCartButton.addEventListener("click", () => {
  if (!choosenSize) {
    alert("Please select a size.");
    return;
  }

  const selectedColorElement = document.querySelector(".color.selected");
  const selectedColorCode = selectedColorElement.id.split("-")[2];

  const selectedProduct = {
    title: choosenProduct.title,
    color: selectedColorCode,
    size: choosenSize,
    price: choosenProduct.price,
  };

  cart.push(selectedProduct);
  cartCount.textContent = cart.length; // Update cart count

  // Create a new div element for the selected product
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.innerHTML = `
    <img src="PAGINA WEB 2/${choosenProduct.title.replace(/\s/g, "-").toLowerCase()}-${selectedProduct.color.toLowerCase()}.png" alt="${choosenProduct.title} (${selectedProduct.color})">
    <div class="cart-item-details">
      <h3>${choosenProduct.title} - ${selectedProduct.color}</h3>
      <p>Size: ${selectedProduct.size}</p>
      <p>Price: $${selectedProduct.price.toFixed(2)}</p>
    </div>
  `;

  // Append the cart item to the cart container
  cartContainer.appendChild(cartItem);
  alert("products added")
  console.log("Added to cart:", selectedProduct);
});

const Cartbutton = document.querySelector(".Cartbutton");
Cartbutton.addEventListener("click", () => {
  let totalPrice = 0;
  let cartItems = "";
  cart.forEach(item => {
    cartItems += `
      <div class="cart-item">
        <img src=".productImg">
        <div class="cart-item-details">
          <h3>${item.title} - ${item.color}</h3>
          <p>Size: ${item.size}</p>
          <p>Price: $${item.price.toFixed(2)}</p>
        </div>
      </div>
    `;
    totalPrice += item.price;
  });
  if (cart.length === 0) {
    cartItems = "Your cart is empty";
  }const payment = document.querySelector(".payment");
  payment.innerHTML = `
    <h1>Your Cart</h1>
    ${cartItems}
    <p>Total Price: $${totalPrice.toFixed(2)}</p>
    <button class="payButton" id="checkoutButton">Checkout</button>
    <span class="close">X</span>
  `;
  payment.style.display = "flex";

  const checkoutButton = document.getElementById("checkoutButton");
  checkoutButton.addEventListener("click", () => {
    // Hide the cart popup
    payment.style.display = "none";

    // Show the payment section
    const cardPayment = document.querySelector(".payment");
    cardPayment.innerHTML = `
      <h1>Card Payment</h1>
      <label>Name and Surname</label>
      <input type="text" placeholder="John Doe" class="payInput">
      <label>Phone Number</label>
      <input type="text" placeholder="+1 234 5678" class="payInput">
      <label>Address</label>
      <input type="text" placeholder="Elton St 21 22-145" class="payInput">
      <h1>Card Information</h1>
      <div class="cardIcons">
        <img src="PAGINA WEB 2/visa.png" width="40" alt="" class="cardIcon">
        <img src="PAGINA WEB 2/master.png" alt="" width="40" class="cardIcon">
      </div>
      <input type="password" class="payInput" placeholder="Card Number">
      <div class="cardInfo">
        <input type="text" placeholder="mm" class="payInput sm">
        <input type="text" placeholder="yyyy" class="payInput sm">
        <input type="text" placeholder="cvv" class="payInput sm">
      </div>
      <button class="payButton">Pay Now!</button>
      <span class="close">X</span>
    `;
    cardPayment.style.display = "flex";

    const payButton = document.querySelector(".payButton");
    payButton.addEventListener("click", () => {
      // Implement payment logic here
      alert("Implement payment logic here");
    });

    const close = document.querySelector(".close");
    close.addEventListener("click", () => {
      cardPayment.style.display = "none";
    });
  });

  const close = document.querySelector(".close");
  close.addEventListener("click", () => {
    payment.style.display = "none";
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var audio = document.getElementById('myAudio');
  audio.volume = 0.03; // Set volume to minimum (0.03)
  
  var cartButton = document.querySelector('.Cartbutton');
  var addButton = document.querySelector('.AddButton');
  var buyButton = document.querySelector('.buyButton');

  cartButton.addEventListener('click', function() {
      audio.play(); // Play the audio when Cart button is clicked
  });
  addButton.addEventListener('click', function() {
      audio.play(); // Play the audio when Add to Cart button is clicked
  });
  buyButton.addEventListener('click', function() {
      audio.play(); // Play the audio when Buy Now button is clicked
  });

  // Save the flag to localStorage when the audio is played or paused
  audio.addEventListener('play', function() {
      localStorage.setItem('shouldPlay', 'true');
  });
  audio.addEventListener('pause', function() {
      localStorage.setItem('shouldPlay', 'false');
  });

  // Check if the audio should be playing based on the localStorage flag
  var shouldPlay = localStorage.getItem('shouldPlay');
  if (shouldPlay === 'true') {
      audio.play(); // Play the audio if the flag is set to true
  }
});