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
        img: "PAGINA WEB 2/DIONYSUS BLANCO.png",
      },
    ],
  },
  {
    id: 2,
    title: "One More Rep",
    price: 9.99,
    colors: [
      {
        code: "White",
        img: "PAGINA WEB 2/ONE MORE REP BLANCA.png",
      },
      {
        code: "Black",
        img: "PAGINA WEB 2/ONE MORE REP NEGRA.png",
      },
    ],
  },
  {
    id: 3,
    title: "The World Is Ours",
    price: 9.99,
    colors: [
      {
        code: "White",
        img: "PAGINA WEB 2/THE WORLD IS OURS BKANCO.png",
      },
      {
        code: "Black",
        img: "PAGINA WEB 2/THE WORLD IS OURS NEGRA.png",
      },
      {
        code: "Blue",
        img: "PAGINA WEB 2/THE WORLD IS OURS NEGRA AZUL.png",
      },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
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
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
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

const cart = [];
const cartCount = document.getElementById("cart-count");

function updateCartUI() {
  cartCount.textContent = cart.length;
}

const AddButton = document.querySelector(".AddButton");
AddButton.addEventListener("click", () => {
  const selectedColor = document.querySelector(".color.selected");
  const selectedSize = document.querySelector(".size.selected");

  if (selectedColor && selectedSize) {
    const cartItem = {
      id: choosenProduct.id,
      title: choosenProduct.title,
      price: choosenProduct.price,
      color: selectedColor.style.backgroundColor,
      size: selectedSize.textContent,
    };

    cart.push(cartItem);
    updateCartUI();
  } else {
    alert("Please select a color and size before adding to cart.");
  }
});


const Cart = document.querySelector(".Cart");
Cart.addEventListener("click", () => {
  let totalPrice = 0;
  let cartItems = "";
  cart.forEach(item => {
    cartItems += `${item.title} - $${item.price.toFixed(2)}<br>`;
    totalPrice += item.price;
  });
  if (cart.length === 0) {
    cartItems = "Your cart is empty";
  }
  const payment = document.querySelector(".payment");
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

