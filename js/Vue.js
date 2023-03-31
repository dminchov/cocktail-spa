//Vue
export default class Vue {
//methode pricipale qui permet de mettre a jour l'affichage de la page
  updateView(elementTag, data) {
    const node = document.getElementById(elementTag);
    if (node) {
      node.innerHTML = data;
    } else {
      console.error(`Element with id ${elementTag} not found.`);
    }
  }
//methode qui permet de mettre a jour l'affichage meteo
  updateMeteoView(dataHTML) {
    this.updateView("meteo", dataHTML);
  }
//methode qui permet de mettre a jour l'affichage des categories 
  updateCategoryView(dataHTML) {
    this.updateView("categoriesBar", dataHTML);
  }
//methode qui permet de mettre a jour l'affichage d'une recette
  updateReceipeView(dataHTML) {
    this.updateView("recette", dataHTML);
  }
//methode qui permet de mettre a jour l'affichage de la liste des recettes
  updateListOfReceipes(dataHTML) {
    this.updateView("recette", dataHTML);
  }



  //afficheMeteo
  afficheMeteo(objJSON) {
    const d = new Date();
    const mois = d.getMonth() + 1;
    const jour = d.getDate();
    const date = `${d.getFullYear()}/${mois.toString().padStart(2, '0')}/${jour.toString().padStart(2, '0')}`;
    const contenu = `
      <li>Montreal&nbsp;${date}</li>
      <li>${Math.round(objJSON.main.temp)}&deg;C</li>
      <img src='http://openweathermap.org/img/w/${objJSON.weather[0].icon}.png' id='icon' alt=icon' width='50' height='50'/>
    `;
    return contenu;
  }
//afficheListesCategorie
  afficheCategorie(liste) {
    const html = liste.drinks.map((drink) => `
      <li><a class="cat" href="#" id="${drink.strCategory}">${drink.strCategory}</a></li>
    `).join('');
    return html;
  }
//affciheListeRecettes
  listeApero(liste) {
    const html = liste.map((cocktail) => `
        <article class="list" id='${cocktail.id}'>
          <img src="${cocktail.image}">
          <h1>${cocktail.title}</h1>
        </article>
      `).join('');
    return html;
  }
//afficheUneRecette
  unApero(cocktail) {
    const ingredientsHtml = cocktail.ingredients.map((ing) => `
      <li> ${ing.measure} ${ing.name} </li>
    `).join('');

    const html = `
      <div class="card">
        <h1 class="marge">Apero du moment</h1>
        <img src="${cocktail.image}">
        <aside>
          <h1>${cocktail.title}</h1>
          <h3>Categorie: ${cocktail.category}</h3>
          <h3>Type de verre:${cocktail.glass}</h3>
        </aside>
        <h2 class="marge"> Ingredients</h2>
        <ul>${ingredientsHtml}</ul>
        <h2 class="marge">Instructions</h2>
        <p>${cocktail.instructions}</p>
      </div>
    `;
    return html;
  }
}
