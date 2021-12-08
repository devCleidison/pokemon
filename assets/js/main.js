document.addEventListener("keyup", (e) => {
  const search = document.getElementById("search-btn");
  const name = document.getElementById("input-pokemon");
  const modalContainer = document.getElementById("modal-container");
  const modalPokemon = document.getElementById("modal-pokemon");
  const modalFail = document.getElementById("modal-fail");

  const searchContainer = document.getElementById("search-container");

  modalContainer.classList.remove("show-modal-container");
  modalFail.style.visibility = "hidden";
  modalPokemon.style.visibility = "hidden";

  restartPokemon();

  if (e.code === "Enter" && name.value !== "") {
    searchContainer.classList.remove("show-menu");

    search.click();
  }
});

function showModal(modalContainer, searchId) {
  const body = document.querySelector("body");
  const container = document.getElementById(modalContainer);
  const search = document.getElementById(searchId);
  const modalFail = document.getElementById("modal-fail");
  const modalPokemon = document.getElementById("modal-pokemon");
  const searchContainer = document.getElementById("search-container");

  const name = document.getElementById("input-pokemon");

  if (search) {
    search.addEventListener("click", () => {
      if (name.value === "") {
        modalFail.style.visibility = "visible";
      } else {
        const data = getPokemon(name.value.toLowerCase());

        data.then((response) => {
          if (response === 404) {
            modalFail.style.visibility = "visible";
          } else {
            modalPokemon.style.visibility = "visible";
            showSearchPokemon(data);
          }
        });
      }

      container.classList.add("show-modal-container");
      searchContainer.classList.remove("show-menu");
      body.style.overflow = "hidden";
    });
  }
}

showModal("modal-container", "search-btn");

function hideModal(closeId, modalPokemonId, modalFailId) {
  const body = document.querySelector("body");
  const container = document.getElementById("modal-container");
  const close = document.querySelectorAll(closeId);
  const modalPokemon = document.getElementById(modalPokemonId);
  const modalFail = document.getElementById(modalFailId);

  close.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      container.classList.remove("show-modal-container");
      modalFail.style.visibility = "hidden";
      modalPokemon.style.visibility = "hidden";
      body.style.overflowY = "initial";
      restartPokemon();
    });
  });
}

hideModal(".close-modal", "modal-pokemon", "modal-fail");

async function showSearchPokemon(data) {
  const newPokemon = await data;

  const name = document.querySelector(".pokemon__name");
  const imgPokemon = document.getElementById("pokemon-img");
  imgPokemon.classList.add("rotate-pokeball");

  const descPokemon = document.querySelector(".pokemon__description");
  const description = await getPokemonDescription(newPokemon.id);

  setTimeout(() => {
    name.innerHTML = newPokemon.name.toUpperCase();
    descPokemon.innerHTML = description;

    if (newPokemon.sprites.other.dream_world.front_default === null) {
      imgPokemon.src = newPokemon.sprites.front_default;
    } else {
      imgPokemon.src = newPokemon.sprites.other.dream_world.front_default;
    }
  }, 3000);
}

function restartPokemon() {
  const inputName = document.getElementById("input-pokemon");
  const imgPokemon = document.getElementById("pokemon-img");
  const name = document.querySelector(".pokemon__name");
  const descPokemon = document.querySelector(".pokemon__description");

  name.innerHTML = "???";
  descPokemon.innerHTML = "...";

  imgPokemon.classList.remove("rotate-pokeball");
  imgPokemon.src = "./assets/img/pokeball.svg";
}

let count = null;

async function getPokemons() {
  const pokedex = getPokedex(count);

  pokedex.then((response) => {
    count += response.results.length + 1;
    response.results.forEach((item) => setPokemons(item));
  });
}

getPokemons();

function setPokemons(data) {
  const pokemon = getPokemon(data.name);
  const pokedexContainer = document.querySelector(".pokedex__content");

  pokemon.then((response) => {
    const card = document.createElement("div");
    card.classList.add("card__pokedex");

    const title = document.createElement("h4");
    title.classList.add("card__pokedex__title");
    title.innerHTML = response.name.toUpperCase();

    const image = document.createElement("img");

    if (response.sprites.other.dream_world.front_default === null) {
      image.src = response.sprites.front_default;
    } else {
      image.src = response.sprites.other.dream_world.front_default;
    }

    card.appendChild(title);
    card.appendChild(image);

    setTimeout(() => {
      pokedexContainer.appendChild(card);
    }, 100);
  });
}

const logo = document.querySelector(".logo");
logo.addEventListener("click", scrollToId);

const navLinks = document.querySelectorAll(".nav-links");
navLinks.forEach((link) => {
  link.addEventListener("click", scrollToId);
});

function getScrollToByHref(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

function scrollToId(event) {
  event.preventDefault();

  const to = getScrollToByHref(event.target) - 60;

  window.scroll({
    top: to,
    behavior: "smooth",
  });
}

function showMenu(navId, toggleId) {
  const nav = document.getElementById(navId);
  const toggle = document.getElementById(toggleId);
  const searchContainer = document.getElementById("search-container");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show-menu");
      searchContainer.classList.remove("show-menu");
    });
  }
}

showMenu("nav-menu", "nav-toggle");

const navLink = document.querySelectorAll(".nav-links");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");

  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));

function showSearchContainer(searchId, searchContainerId) {
  const search = document.getElementById(searchId);
  const searchContainer = document.getElementById(searchContainerId);
  const navMenu = document.getElementById("nav-menu");

  if (search && searchContainer) {
    search.addEventListener("click", () => {
      searchContainer.classList.toggle("show-menu");
      navMenu.classList.remove("show-menu");
    });
  }
}

showSearchContainer("search-toggle", "search-container");
