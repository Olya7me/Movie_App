export function loadHeader() {
  const headerHTML = `
    <div class="header__logo">MovieSearch</div>
    <nav class="header__nav">
      <ul class="header__nav-list">
        <li class="header__nav-item">
          <a href="#" class="header__nav-link">Главная</a>
        </li>
        <li class="header__nav-item">
          <a href="#" class="header__nav-link">Фильмы</a>
        </li>
        <li class="header__nav-item">
          <a href="#" class="header__nav-link">Сериалы</a>
        </li>
        <li class="header__nav-item">
          <a href="#" class="header__nav-link">Популярные</a>
        </li>
      </ul>
    </nav>
    <div class="header__burger">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="header__toggle">
      <input type="checkbox" id="theme-toggle" class="header__toggle-checkbox" />
      <label for="theme-toggle" class="header__toggle-label">Светлая тема</label>
    </div>
`;

  document.querySelector(".header").innerHTML = headerHTML;

  //бургер

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
