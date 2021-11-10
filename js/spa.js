"use strict";

// hide all pages
function hideAllPages() {
  let pages = document.querySelectorAll(".page");
  for (let page of pages) {
    page.style.display = "none";
  }
}

// show page or tab
function showPage(pageId) {
  hideAllPages();
  document.querySelector(`#${pageId}`).style.display = "block";
  setActiveTab(pageId);
}

// sets active tabbar/ menu item
function setActiveTab(pageId) {
  let pages = document.querySelectorAll("nav a");
  for (let page of pages) {
    if (`#${pageId}` === page.getAttribute("href")) {
      page.classList.add("active");
    } else {
      page.classList.remove("active");
    }
  }
  console.log(pageId)
}


// navigate to a new view/page by changing href
function navigateTo(pageId) {
  location.href = `#${pageId}`;
}

// set default page or given page by the hash url
// function is called 'onhashchange'
function pageChange() {
  let page = "welcome-page";
  if (location.hash) {
    page = location.hash.slice(1);
  }
  showPage(page);
}

pageChange(); // called by default when the app is loaded for the first time

function showMenu() {
  let navBar = document.querySelector(".tabbar");
  if ((navBar.style.display = "none")) {
    navBar.style.display = "flex";
  }
}

function menu() {
  let navBar = document.querySelector(".tabbar");
  console.log(location.hash)
  if (location.hash == "") {
    navBar.style.display = "none"
  } else {
    navBar.style.display = "flex";
  }

}

menu();