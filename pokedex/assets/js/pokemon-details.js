const favoriteButton = document.getElementById("favorite-button-js");
const goBackButton = document.getElementById("go-back-button-js");
const pokemonInfo = document.getElementById("info-js");
const body = document.getElementById("body-js");
const details = document.getElementById('details-js');

const key = "pokemon";
const pokemonName = new URLSearchParams(window.location.search).get(key);

favoriteButton.addEventListener("click", () => {
  if (isFavorite(favoriteButton)) {
    favoriteButton.innerHTML = '<i class="material-icons topbar__icon">favorite_border</i>'
  } else {
    favoriteButton.innerHTML = '<i class="material-icons topbar__icon topbar__icon--selected">favorite</i>'
  }
});

goBackButton.addEventListener('click', () => {
  let host = location.origin;
  location.href = host.concat(`/pokedex/index.html`);
})

pokeApi.getPokemonByName(pokemonName).then((pokemonDetails) => {
  generateHTML(pokemonDetails);
});

/**
 * Verifica se o elemento HTML contém a class 'topbar__icon--selected'.
 */
function isFavorite(button) {
  const icon = button.firstElementChild;

  return icon.classList.contains('topbar__icon--selected');
}

/**
 * Gera o HTML dos detalhes do Pokemon.
 * 
 * @param {*} pokemonDetails que deve ser do tipo PokemonDetails.
 */
function generateHTML(pokemonDetails) {
  const basicInfo = generateBasicInfo(pokemonDetails.summary);

  pokemonInfo.innerHTML = basicInfo;
  body.className = `${pokemonDetails.summary.type}`;

  details.innerHTML = generateAboutInfo(pokemonDetails.about);
}

/**
 * Gera o HTML do resumo do Pokemon.
 * 
 * @param {*} summary resumo do Pokemon.
 */
function generateBasicInfo(summary) {
  return `
    <div class="info__basic">
      <div class="info__basic__name-type">
        <span class="info__basic__name">${summary.name}</span>
        <ol class="info__basic__type-list">
          ${summary.types
            .map(
              (type) =>
                `<li class="info__basic__type-list__item ${type}">${type}</li>`
            )
            .join("")}
        </ol>
      </div>

      <span class="info__basic__number">#${summary.number}</span>
    </div>

    <img
      class="info__img"
      src="${summary.photo}"
      alt="${summary.name} image"
    />
  `;
}

/**
 * Gera o HTML da parte 'sobre' do Pokemon.
 * @param {*} about informações 'sobre' o Pokemon.
 */
function generateAboutInfo(about) {
  return `
    <table class="details__about">
      <tbody>
        <tr>
          <th>Species</th>
          <td>${about.species}</td>
        </tr>
        <tr>
          <th>Height</th>
          <td>${about.height * 10} cm</td>
        </tr>
        <tr>
          <th>Weight</th>
          <td>${about.weight / 10} Kg</td>
        </tr>
        <tr>
          <th>Abilities</th>
          <td>${about.abilities.join(', ')}</td>
        </tr>
      </tbody>
    </table>
  `;
}
