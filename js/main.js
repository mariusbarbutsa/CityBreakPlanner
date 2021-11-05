"use strict";

// =========== Product functionality =========== //
/*
global variables: _products _selectedProductId
*/
let _places = [];
let _selectedProductId;

/*
Fetches json data from the file products.json
*/
async function fetchData() {
  const response = await fetch('json/data.json');
  const data = await response.json();
  _places = data;
  _places.length = 100;
  orderByLatest();
  // appendPlacesToEat(_places);
  // showLoader(false);
}

fetchData();

function appendPlacesToEat(placesToEat) {
  let htmlTemplate = "";
  for (let placeToEat of placesToEat) {
    // for (let placeToEatFile of placeToEat.Files) {
    for (let i in placeToEat.Files) {
      let found = placeToEat.Files[0]["Uri"];
      htmlTemplate += /*html*/ `
      <div class="places-container">
        <div onclick = "showDetailView(${placeToEat.id})" class="places-box" >
          <img src="${found}" class="img-places">
          <p class="place-title">${placeToEat.Name}</p>
          <p class="place-description">${placeToEat.Address.AddressLine1}</p>
          <p class="place-description">${placeToEat.Category.Name}</p>
        </div>
      </div>
    `;
      break;
    }
  }
  document.querySelector('#fetched-placesToEat').innerHTML = htmlTemplate;
}

function filterByPlacesToEat() {
  const results = _places.filter(
    (place) => place.MainCategory.Name == "Places to eat"
  );
  appendPlacesToEat(results);
}

function orderBy(option) {
  if (option === "latest") {
    orderByLatest();
  } else if (option === "oldest") {
    orderByOldest();
  }
}

function orderByLatest() {
  const results = _places.filter(
    (place) => place.MainCategory.Name == "Places to eat"
  );
  results.sort((product1, product2) => {
    return product1.Modified.localeCompare(product2.Modified);
  });
  appendPlacesToEat(results);
}

function orderByOldest() {
  const results = _places.filter(
    (place) => place.MainCategory.Name == "Places to eat"
  );
  results.sort((product1, product2) => {
    return product2.Modified.localeCompare(product1.Modified);
  });
  appendPlacesToEat(results);
}



function searchPlacesToEat(value) {
  const results = _places.filter(
    (place) => place.MainCategory.Name == "Places to eat"
  );
  results.sort((product1, product2) => {
    return product1.Modified.localeCompare(product2.Modified);
  });
  let searchQuery = value.toLowerCase();
  let filteredProducts = [];
  for (let place of results) {
    let name = place.Name.toLowerCase();
    let address = place.Address.AddressLine1.toLowerCase();
    if (name.includes(searchQuery) || address.includes(searchQuery)) {
      filteredProducts.push(place);
    }
  }
  appendPlacesToEat(filteredProducts);
}





function saveProduct() {
  // find index of the product to update in _products
  let index = _products.findIndex(product => product.id === _selectedProductId);
  // update values of user in array
  _products[index].brand = document.querySelector('#brandEdit').value;
  _products[index].model = document.querySelector('#modelEdit').value;
  _products[index].price = document.querySelector('#priceEdit').value;
  _products[index].img = document.querySelector('#imgEdit').value;
  // update dom usind appendProducts()
  appendProducts(_products);
  //navigating back
  navigateTo("products");
}

function deleteProduct(id) {
  // filter _products - all products that doesnt have the id 
  _products = _products.filter(product => product.id !== id);
  appendProducts(_products);
}

function showDetailView(id) {
  const productToShow = _products.find(product => product.id === id);
  navigateTo("detail-view");
  document.querySelector("#detail-view .title").innerHTML = productToShow.model;
  document.querySelector("#detail-view-container").innerHTML = /*html*/ `
    <img src="${productToShow.img}">
    <article>
      <h2>${productToShow.model}</h2>
      <h3>${productToShow.brand}</h3>
      <p>Price: ${productToShow.price} kr.</p>
      <p>Status: ${productToShow.status}</p>
      <p>ID: ${productToShow.id}</p>
    </article>
  `;
}