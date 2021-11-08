"use strict";

// =========== Product functionality =========== //
/*
global variables: _products _selectedProductId
*/
let _places = [];
let _categories = [];
let _favplaces = [];
let _selectedProductId;

/*
Fetches json data from the file products.json
*/
async function fetchData() {
  const response = await fetch('json/data.json');
  const data = await response.json();
  _places = data;
  _places.length = 200;
  orderByLatest();
  // appendPlacesToEat(_places);
  // showLoader(false);
}

fetchData();

async function fetchCategories() {
  const response = await fetch('json/categories.json');
  const data = await response.json();
  _categories = data;

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
        <div div onclick = "showDetailView(${placeToEat.Id}); navigateTo('detailedview');" class="places-box" >
          <img src="${found}" class="img-places">
          <p class="place-title">${placeToEat.Name}</p>
          <p class="place-description">${placeToEat.Address.AddressLine1}</p>
          <p class="place-description">${placeToEat.Category.Name}</p>
        </div> 
        ${generateFavPlacesButton2(placeToEat.Id)}  
      </div>
    `;
      break;
    }
  }
  document.querySelector('#fetched-placesToEat').innerHTML = htmlTemplate;
}

function appendFavPlaces() {
  let htmlTemplate = "";
  for (let placeToEat of _favplaces) {
    // for (let placeToEatFile of placeToEat.Files) {
    for (let i in placeToEat.Files) {
      let found = placeToEat.Files[0]["Uri"];
      htmlTemplate += /*html*/ `
      <div class="places-container">
        <div div onclick = "showDetailView(${placeToEat.Id}); navigateTo('detailedview');" class="places-box" >
          <img src="${found}" class="img-places">
          <p class="place-title">${placeToEat.Name}</p>
          <p class="place-description">${placeToEat.Address.AddressLine1}</p>
          <p class="place-description">${placeToEat.Category.Name}</p>
        </div> 
        ${generateFavPlacesButton2(placeToEat.Id)}  
      </div>
    `;
      break;
    }
  }
  document.querySelector('.wishlist-content').innerHTML = htmlTemplate;
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

function openFilter() {

}


function filterByType(value) {
  const buttons = document.querySelectorAll(
    ".filter-horizontal-scrolling .filter-by-type"
  );
  const buttons2 = document.querySelector(
    ".allBtn"
  );
  if (value === buttons2.getAttribute("id")) {
    buttons2.classList.add("active-type-all");
  }

  for (const button of buttons) {
    if (value === button.getAttribute("id")) {
      button.classList.add("active-type");
    } else {
      button.classList.remove("active-type");
      button.classList.remove("active-type-all");
    }
  }

  if (value == "all") {
    orderByLatest();
  } else {
    const results = _places.filter(
      (place) => place.MainCategory.Name == "Places to eat"
    );
    const results2 = results.filter(
      (place) => place.Category.Name == value
    );
    results2.sort((product1, product2) => {
      return product1.Modified.localeCompare(product2.Modified);
    });
    appendPlacesToEat(results2);
    console.log(results);
    console.log(results2);
  }
}

function filterBySomething(value) {
  const buttons = document.querySelectorAll(
    ".filter-by-something .filter-by-something-box"
  );

  for (const button of buttons) {
    if (value === button.getAttribute("id")) {
      button.classList.add("active-filter");
    } else {
      button.classList.remove("active-filter");
    }
  }

}

function getBackFilter() {
  let back = document.querySelector(".filter-slider");
  back.style.left = "100%";
}

function openFilter() {
  let back = document.querySelector(".filter-slider");
  back.style.left = "0";
}


function showDetailView(id) {
  const placeToShow = _places.find(place => place.Id == id);
  console.log(id);
  let found = placeToShow.Files[0]["Uri"];
  document.querySelector("#detailedView-append").innerHTML = /*html*/ `
  <img src = "${found}" class = "detailedview-img-places" >
  <div class="detailedview-flexbox">
  <div class="detailedview-header">
    <p class="detailedview-place-title">${placeToShow.Name}</p>
    ${generateFavPlacesButton(placeToShow.Id)}
  </div>
  <div class="detailedview-review">
  <img src="img/icons/Icon awesome-heart.svg" alt="heart" class="icon-heart">
  <img src="img/icons/Icon awesome-heart.svg" alt="heart" class="icon-heart">
  <img src="img/icons/Icon awesome-heart.svg" alt="heart" class="icon-heart">
  <img src="img/icons/Icon awesome-heart.svg" alt="heart" class="icon-heart">
  <img src="img/icons/Icon feather-heart.svg" alt="heart" class="icon-heart">
  <p class="review-text">43 reviews</p>
  </div>
  <div class="detailedview-header2">
  <p class="detailedview-category">${placeToShow.Category.Name}</p>
  <a class="detailedview-category" onclick="navigateTo('detailedview');" ><u>${placeToShow.ContactInformation.Phone}</u></a>
  </div>
  <p class="detaliedview-description">${placeToShow.Descriptions[0]["Text"]}</p>
  <p class="detailedview-headerText">Address</p>
  <a class="detailedview-address" onclick="navigateTo('detailedview');" ><u>${placeToShow.Address.AddressLine1}</u></a>
  <img class="map-canvas" src="img/map.svg" alt="map">
  <p class="detailedview-headerText2">Our Network</p>
  <div class="some-icons">
  <img src="img/icons/ig.svg" alt="some" class="some-icon">
  <img src="img/icons/fb.svg" alt="some" class="some-icon">
  <img src="img/icons/tw.svg" alt="some" class="some-icon">
  </div>
  </div>
  `;
}

function generateFavPlacesButton(id) {
  let btnTemplate = `
        <a id = "fav-button" onclick="addToFavourites('${id}')">
     <svg xmlns="http://www.w3.org/2000/svg" width="19.142" height="23.252" viewBox="0 0 19.142 23.252"><defs><style>.a{fill:none;}.b,.c{stroke:none;}.c{fill:#022b52;}</style></defs><g class="a"><path class="b" d="M0,23.252V2.18A2.294,2.294,0,0,1,2.393,0H16.749a2.294,2.294,0,0,1,2.393,2.18V23.252L9.571,18.166Z"/><path class="c" d="M 17.14209747314453 19.9242115020752 L 17.14210510253906 2.178847551345825 C 17.13227653503418 2.135737419128418 16.99543571472168 1.999997496604919 16.74932670593262 1.999997496604919 L 2.392765760421753 1.999997496604919 C 2.146655797958374 1.999997496604919 2.00981593132019 2.135737419128418 1.999995827674866 2.179867506027222 L 1.999995827674866 19.92420959472656 L 9.571045875549316 15.90070724487305 L 17.14209747314453 19.9242115020752 M 19.1420955657959 23.25195693969727 L 9.571045875549316 18.16558837890625 L -4.124450697418069e-06 23.25195693969727 L -4.124450697418069e-06 2.179867506027222 C -4.124450697418069e-06 0.9759474992752075 1.071255922317505 -2.483825710442034e-06 2.392765760421753 -2.483825710442034e-06 L 16.74932670593262 -2.483825710442034e-06 C 18.07083511352539 -2.483825710442034e-06 19.1420955657959 0.9759474992752075 19.1420955657959 2.179867506027222 L 19.1420955657959 23.25195693969727 Z"/></g></svg>
      </a>
    `;
  if (isFavPosts(id)) {
    btnTemplate = `
      <a id = "fav-button" onclick = "removeFromFavourites('${id}')" >
      <svg xmlns="http://www.w3.org/2000/svg" width="19.142" height="23.252" viewBox="0 0 19.142 23.252"><defs><style>.a{fill:#022b52;}.b,.c{stroke:none;}.c{fill:#022b52;}</style></defs><g class="a"><path class="b" d="M0,23.252V2.18A2.294,2.294,0,0,1,2.393,0H16.749a2.294,2.294,0,0,1,2.393,2.18V23.252L9.571,18.166Z"/><path class="c" d="M 17.14209747314453 19.9242115020752 L 17.14210510253906 2.178847551345825 C 17.13227653503418 2.135737419128418 16.99543571472168 1.999997496604919 16.74932670593262 1.999997496604919 L 2.392765760421753 1.999997496604919 C 2.146655797958374 1.999997496604919 2.00981593132019 2.135737419128418 1.999995827674866 2.179867506027222 L 1.999995827674866 19.92420959472656 L 9.571045875549316 15.90070724487305 L 17.14209747314453 19.9242115020752 M 19.1420955657959 23.25195693969727 L 9.571045875549316 18.16558837890625 L -4.124450697418069e-06 23.25195693969727 L -4.124450697418069e-06 2.179867506027222 C -4.124450697418069e-06 0.9759474992752075 1.071255922317505 -2.483825710442034e-06 2.392765760421753 -2.483825710442034e-06 L 16.74932670593262 -2.483825710442034e-06 C 18.07083511352539 -2.483825710442034e-06 19.1420955657959 0.9759474992752075 19.1420955657959 2.179867506027222 L 19.1420955657959 23.25195693969727 Z"/></g></svg>
      </a>`;
  }
  return btnTemplate;
}

function generateFavPlacesButton2(id) {
  let btnTemplate = `
        <a id = "fav-button" onclick="addToFavourites('${id}')">
      <img src = "img/icons/unfilled.svg" class="fav-circle" alt="fav">
      </a>
    `;
  if (isFavPosts(id)) {
    btnTemplate = `
      <a id = "fav-button" onclick = "removeFromFavourites('${id}')" >
       <img src = "img/icons/filled.svg" class="fav-circle" alt="fav">
      </a>
      `;
  }
  return btnTemplate;
}

/**
 * Adding place to favorites by given postId
 */
function addToFavourites(postId) {
  let favPost = _places.find((post) => post.Id == postId);
  _favplaces.push(favPost);
  orderByLatest();
  appendFavPlaces(); // update the DOM to display the right items from the favorite list
  showDetailView(postId);
}

/**
 * Removing place from favorites by given postId
 */
function removeFromFavourites(postId) {
  _favplaces = _favplaces.filter((post) => post.Id != postId);
  orderByLatest();
  appendFavPlaces(); // update the DOM to display the right items from the favorite list
  showDetailView(postId);
}

/**
 * Checking if the place already is added to favorite
 */
function isFavPosts(postId) {

  return _favplaces.find((post) => post.Id == postId); // checking if favorite has the place with matching id or not
}



window.onscroll = function () {
  var navbar = document.querySelector(".sticky-header");
  var sticky = navbar.offsetTop;
  if (window.pageYOffset > sticky) {
    navbar.classList.add("shadow")
  } else {
    navbar.classList.remove("shadow");
  }
};

// SHOW - HIDE David


var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function () {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }


    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
}

function goBack() {
  window.history.back();
}