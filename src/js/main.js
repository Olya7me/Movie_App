import { loadHeader } from "./modules/header";
import { loadSidebar } from "./modules/sidebar";
import { getPremieresMovies, initialEventListeners } from "./modules/premieres";
import {
  getRecommendMovies,
  initEventListeners,
  loadHistoryFromLocalStorage,
} from "./modules/search";

import { getMainMovies, toggleBtn } from "./modules/home";
import {
  getMovies,
  popularMoviesTitle,
  popularMoviesItems,
  apiPopularMoviesUrl,
  apiSeasonUrl,
  seasonTitle,
  seasonItems,
  apiComicsUrl,
  comicsTitle,
  comicsItems,
} from "./modules/popular";
import { initMovieScrolling } from "./modules/slider";

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
    getMainMovies();
    getMovies(apiPopularMoviesUrl, popularMoviesTitle, popularMoviesItems);
    getMovies(apiSeasonUrl, seasonTitle, seasonItems);
    getMovies(apiComicsUrl, comicsTitle, comicsItems);
    toggleBtn();
    getPremieresMovies();
    initialEventListeners();
    initMovieScrolling();
    loadFooter();
  }
});
