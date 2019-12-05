const menu = document.querySelector(".nav-menu__icon");
const links = document.querySelector(".nav-menu__links");
const line = document.querySelectorAll(".nav-menu__line");
const link = document.querySelectorAll(".nav-menu__link");

link.forEach(link =>
  link.addEventListener("click", () => {
    links.classList.remove("nav-menu__links--open");
  })
);
const handleMenu = () => {
  links.classList.toggle("nav-menu__links--open");
  line.forEach(line => line.classList.toggle("nav-menu__line--open"));
};
menu.addEventListener("click", handleMenu);
