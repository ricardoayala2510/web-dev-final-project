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
