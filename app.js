const products = [
  {
    name: "Normal Baguette",
    price: "10 AED",
    description: "Classic French-style baguette with a crisp crust and a soft center.",
    illustrationClass: "",
  },
  {
    name: "Baguette with Chocolate Chip",
    price: "15 AED",
    description: "A sweet baguette with chocolate chips for breakfast or dessert.",
    illustrationClass: "chocolate",
  },
  {
    name: "Turmeric Bread",
    price: "10 AED",
    description: "Golden turmeric bread with a warm flavor and a soft texture.",
    illustrationClass: "turmeric",
  },
];

const productGrid = document.querySelector("#product-grid");
const footerYear = document.querySelector("#footer-year");

function renderProducts() {
  if (!productGrid) {
    return;
  }

  productGrid.innerHTML = products
    .map(
      (product, index) => `
        <article class="product-card reveal" style="transition-delay: ${index * 90}ms">
          <div class="bread-illustration ${product.illustrationClass}"></div>
          <span class="product-price">${product.price}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        </article>
      `
    )
    .join("");
}

function revealCards() {
  const cards = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    cards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
    }
  );

  cards.forEach((card) => observer.observe(card));
}

function setFooterYear() {
  if (!footerYear) {
    return;
  }

  footerYear.textContent = `© ${new Date().getFullYear()} Khalidiya Baguettes`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  revealCards();
  setFooterYear();
});
