//Controleur
import Vue from "./Vue.js";
import CocktailSchema from "./CocktailSchema.js";

const API_ROOT_URL = "https://www.thecocktaildb.com/api/json/v1/1/";

function getCocktailRequestURL(command) { 
    return API_ROOT_URL + command; 
}

document.addEventListener("DOMContentLoaded", () => {
    let controleur = new Controleur();
    controleur.start();
});
//une classe controleur qui initialise l'instance vue et qui 
//contient les fonctions suivantes l'acrhcitecture demandee 
class Controleur {
    constructor() {
        this.vue = new Vue();
    }

    start() { 
        const self = this;
        document.getElementById("q").addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                const query = e.currentTarget.value; 
                self.findAperoByName(query);
            }
        });
        self.getMeteo();
        self.getUnAperoAleatoire();
        self.getCategorie();
        self.getDesAperos();
        
    }
//obtenirMeteo()
    async getMeteo() {
        let api_key = '316c3f80822b92b2e4ecf6fa8915d605';
        let url = `https://api.openweathermap.org/data/2.5/weather?q=Montreal,ca&lang=fr&units=metric&appid=${api_key}`; 
        const response = await fetch(url);
        const data = await response.json();
        const html = this.vue.afficheMeteo(data);
        this.vue.updateMeteoView(html);
    }


//obtenirRecetteAleatoire
    async getUnAperoAleatoire(addNotFound = false) {
        let url = getCocktailRequestURL("random.php"); 
        const response = await fetch(url);
        const data = await response.json();
        const cocktail = new CocktailSchema(data.drinks[0]);
        let html = this.vue.unApero(cocktail);
        if (addNotFound) {
            html = "<p>Oooops désolé rien de trouvé... Voici une boisson aléatoire</p>" + html;
        }
        this.vue.updateReceipeView(html);
    }
//obtenirRecetteCategorie
  
    async getDesAperos(category){
        let url = getCocktailRequestURL(`filter.php?c=${category}`);
        const response = await fetch(url);
        const json = await response.json();
        const _d = json.drinks;
        const drinks = _d.map(drink => new CocktailSchema(drink));
        const html = this.vue.listeApero(drinks);
        this.vue.updateListOfReceipes(html)
    }
    //obtenirRecetteId
    async getAperoById(id) { 
        let url = getCocktailRequestURL(`lookup.php?i=${id}`);
        const response = await fetch(url);
        const data = await response.json();
        const cocktail = new CocktailSchema(data.drinks[0]);
        const html = this.vue.unApero(cocktail);
        this.vue.updateReceipeView(html);
    }
    //obtenirRecetteCategorie
    async getCategorie() {
        let url = getCocktailRequestURL("list.php?c=list"); 
        const response = await fetch(url);
        const data = await response.json();
        const html = this.vue.afficheCategorie(data);
        this.vue.updateCategoryView(html);
        const catBar = document.getElementById("categoriesBar");
        for (let li of catBar.children) {
            li.addEventListener("click", (e) => {
                const categoryID = e.currentTarget.children[0].id;
                this.getDesAperos(categoryID);
            })
        }
    }
    //obtenirRecetteNom
    async findAperoByName(name) {
        let url = getCocktailRequestURL(`search.php?s=${name}`);
        const response = await fetch(url);
        const data = await response.json();
        const drinks = data.drinks;
        if (drinks) {
            const cocktail = new CocktailSchema(drinks[0]);
            const html = this.vue.unApero(cocktail);
            this.vue.updateReceipeView(html);
        } else {
            this.getUnAperoAleatoire(true);
        }
    }

}
