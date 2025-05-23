document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("productSearch");
  const productList = document.querySelector(".product-list");
  const products = productList.querySelectorAll(".product-card");
  const noResultsMessage = document.getElementById("noResultsMessage");

  // Helper function to normalize strings: lowercase, replace dashes with spaces, remove punctuation
  function normalizeString(str) {
    return str
      .toLowerCase()
      .replace(/-/g, " ")
      .replace(/[^\w\s]/g, "") // remove punctuation except whitespace
      .trim();
  }

  searchInput.addEventListener("input", () => {
    const filter = normalizeString(searchInput.value);
    let visibleCount = 0;

    products.forEach((product) => {
      const name = product.querySelector(".card__name").textContent || "";
      const brand = product.querySelector(".card__brand").textContent || "";

      const normalizedName = normalizeString(name);
      const normalizedBrand = normalizeString(brand);

      if (normalizedName.includes(filter) || normalizedBrand.includes(filter)) {
        product.style.display = "";
        visibleCount++;
      } else {
        product.style.display = "none";
      }
    });

    noResultsMessage.style.display = visibleCount === 0 ? "block" : "none";
  });
});
