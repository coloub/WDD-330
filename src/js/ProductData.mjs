function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error("Bad Response");
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson)
      .then((data) => data);
  }
  async findProductById(id) {
    const products = await this.getData();
    return products.find((item) => item.Id === id);
  }
}

// Fix image filename for talus tent to match actual file name
export function fixImageFilename(filename) {
  if (filename.includes("the-north-face-talus-tent-3-person-3-season-in-golden-oak-saffron-yellow~p~989cg_01~320.jpg")) {
    return "the-north-face-talus-tent-4-person-3-season-in-golden-oak-saffron-yellow~p~985rf_01~320.jpg";
  }
  return filename;
}
