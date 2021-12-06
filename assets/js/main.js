document.addEventListener("keyup", (e) => {
  const search = document.getElementById("search-btn");
  const name = document.getElementById("input-pokemon");

  if (e.code === "Enter" && name.value !== "") {
    search.click();
  }
});

function showModal(modalContainer, searchId) {
  const body = document.querySelector('body')
  const container = document.getElementById(modalContainer);
  const search = document.getElementById(searchId);
  const modalFail = document.getElementById("modal-fail");
  const modalPokemon = document.getElementById('modal-pokemon')

  const name = document.getElementById("input-pokemon");

  if(search){
    search.addEventListener('click', () => {
      if(name.value === ''){
        modalFail.style.visibility = 'visible'
      } else{
        const data = getPokemon(name.value.toLowerCase())

        data.then(response => {
          if(response === 404){
            modalFail.style.visibility = 'visible'
          } else{
            modalPokemon.style.visibility = 'visible'
            showSearchPokemon(data);
          }
        })
      }

      container.classList.add('show-modal-container')
      body.style.overflow = 'hidden'
    })
  }
}

showModal("modal-container", "search-btn");




function hideModal(closeId, modalPokemonId, modalFailId) {
  const body = document.querySelector('body')
  const container = document.getElementById('modal-container');
  const close = document.querySelectorAll(closeId);
  const modalPokemon = document.getElementById(modalPokemonId);
  const modalFail = document.getElementById(modalFailId);

  close.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      container.classList.remove('show-modal-container')
      modalFail.style.visibility = 'hidden'
      modalPokemon.style.visibility = 'hidden'
      body.style.overflowY = 'initial'
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

  inputName.value = "";
  setTimeout(() => {
    name.innerHTML = "???";
    descPokemon.innerHTML = "...";

    imgPokemon.classList.remove("rotate-pokeball");
    imgPokemon.src = "./assets/img/pokeball.svg";
  }, 1000);
}
