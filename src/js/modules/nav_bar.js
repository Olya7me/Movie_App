export function loadNavBar() {
  const headerHTML = `
      <div class="header__logo">MovieSearch
    </div>
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li class="header__nav-item">
        
          <a href="../../../index.html" class="header__nav-link">Главная</a>
        </li>
        <li class="header__nav-item">
          <a href="../../src/html/movies_page.html" class="header__nav-link">Фильмы</a>
        </li>
        <li class="header__nav-item">
          <a href="../../src/html/series_page.html" class="header__nav-link">Сериалы</a>
        </li>
        <li class="header__nav-item">
          <a href="/index.html#popular-movies" class="header__nav-link popular">Популярные</a>
        </li>
        <li class="header__nav-item item">
          <a href="../../src/html/premieres_page.html" class="header__nav-link header__search" id="search">
            Премьеры
          </a>
        <li class="header__nav-item item">
          <a href="../../src/html/search_page.html" class="header__nav-link header__search" id="search">
            Поиск
          </a>
      </ul>
    </nav>
    <div class="header__burger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="header__toggle">
      <input type="checkbox" id="theme-toggle" class="header__toggle-checkbox" />
      <label for="theme-toggle" class="header__toggle-label">День</label>
    </div>
`;

  document.querySelector(".header").innerHTML = headerHTML;

  const burger = document.querySelector(".header__burger");
  const nav = document.querySelector(".header__nav-list");

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    nav.classList.toggle("open");
  });
  document.addEventListener("click", (e) => {
    if (
      !burger.contains(e.target) &&
      !nav.contains(e.target) &&
      nav.classList.contains("open")
    ) {
      burger.classList.remove("active");
      nav.classList.remove("open");
    }
  });
}
export function toggleBtn() {
  const toggleBtn = document.querySelector("#theme-toggle");
  const body = document.body;

  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "light") {
    body.classList.add("toggle");
    toggleBtn.checked = true;
  } else {
    body.classList.remove("toggle");
    toggleBtn.checked = false;
  }

  toggleBtn.addEventListener("change", () => {
    body.classList.toggle("toggle");

    if (toggleBtn.checked) {
      localStorage.setItem("theme", "light");
    } else {
      localStorage.setItem("theme", "dark");
    }
  });
}
