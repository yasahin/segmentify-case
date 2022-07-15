// Elements
const categoryContainerEl = document.querySelector('.categoryContainer');
const productListContainerEl = document.querySelector('.productListContainer');
const sliderContainerEl = document.querySelector('.sliderContainer');
const basketModalEl = document.querySelector('.basketModal');

// states
let categoryList;
let productObj;
let selectedCategory = 'Size Özel';
let prevSelectedCategory = null;
let sliderCount = 0;
let addedProductName;

// commons render method
const render = (element, html) => {
  element.innerHTML = html;
};

// Generate HTML markups
const createCategoryListHTML = (categoryArray) => {
  let listHTML = '';
  categoryArray.forEach((category) => {
    listHTML += `<div class="filter " ><li id="${
      category.split('>')[0]
    }" class=""><button class="button" onclick="onSelectCategory('${category}')">${
      category.split('>')[0]
    }</button></li></div>`;
  });
  return `<ul>${listHTML}</ul>`;
};

const createProductListHTML = (productObj) => {
  const renderList = productObj[selectedCategory];
  let listHTML = '';
  renderList.forEach((product) => {
    listHTML += `<div class="productCard">
      <img class="productImage" src=${product.image} />
      <p class="productInfo">${product.name}</p>
      <div class="priceArea"><p class="price">${product.price + ' TL'}</p></div>
      <div class="cargo"><img class="icon" src="./icons/icons8-truck-50.png" >            Ücretsiz Kargo</div>
      <button class="addBasket" onclick="onAddCart('${
        product.productId
      }')">Sepete Ekle</button>
      </div>`;
  });

  return listHTML;
};

// Handlers
const onSelectCategory = (category) => {
  prevSelectedCategory = selectedCategory;

  const prevselectedCategoryEl = document.getElementById(
    `${prevSelectedCategory.split('>')[0]}`
  );
  prevselectedCategoryEl.classList.remove('filter-active');
  prevselectedCategoryEl.children[0].classList.remove('button-activee');

  selectedCategory = category;
  const productListHTML = createProductListHTML(productObj);
  render(sliderContainerEl, productListHTML);

  const selectedCategoryEl = document.getElementById(
    `${category.split('>')[0]}`
  );
  selectedCategoryEl.classList.add('filter-active');
  selectedCategoryEl.children[0].classList.add('button-activee');
};

const onAddCart = (productId) => {
  basketModalEl.classList.toggle('active');
  setTimeout(() => {
    basketModalEl.classList.toggle('active');
  }, 1500);
};

const onLeftSlider = () => {
  if (sliderCount === 0) {
    return (sliderCount = 0);
  }

  sliderContainerEl.style.transform = `translate(${
    230 + sliderCount * 230
  }px,0px)`;
  sliderCount = sliderCount + 1;
};

const onRightSlider = () => {
  const itemLength = productObj[selectedCategory].length;
  if (Math.abs(sliderCount) === itemLength - 1) {
    sliderCount = 0;
  }
  sliderContainerEl.style.transform = `translate(${
    -230 + sliderCount * 230
  }px,0px)`;
  sliderCount = sliderCount - 1;
};

// initial fired function
(function init() {
  fetch('./product-list.json')
    .then((response) => response.json())
    .then((response) => {
      categoryList = response.responses[0][0].params.userCategories;
      productObj = response.responses[0][0].params.recommendedProducts;

      // initial render
      const categoryListHTML = createCategoryListHTML(categoryList);
      render(categoryContainerEl, categoryListHTML);
      selectedCategory = 'Size Özel';
      const productListHTML = createProductListHTML(productObj);
      render(sliderContainerEl, productListHTML);
    });
})();
