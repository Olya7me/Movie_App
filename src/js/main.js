import { loadHeader } from "./modules/header";
import { loadSidebar } from "./modules/sidebar";

import { movies } from "./modules/movies";


import { getRecommendMovies, initEventListeners, loadHistoryFromLocalStorage, } from "./modules/search";

import { getPopularMovies } from "./modules/popular";
import { initSeriesModule } from "./modules/series";
import { getMovies, toggleBtn } from "./modules/home";
import { loadFooter } from "./modules/footer";

document.addEventListener("DOMContentLoaded", () => {
  const isSearchPage = document.querySelector(".search-page") !== null;

  if (isSearchPage) {
    loadHeader();
    loadSidebar();
    toggleBtn();
    loadHistoryFromLocalStorage();
    initEventListeners();
    getRecommendMovies();
    loadFooter();
  } else {
    loadHeader();
    loadSidebar();
    getMovies();
    toggleBtn();
    getPopularMovies();
    initSeriesModule();
    loadFooter();
  }
});



  window.addEventListener("resize", () => {
    updateItemsPerView();
    showNextItems();
  });
});

movies();


