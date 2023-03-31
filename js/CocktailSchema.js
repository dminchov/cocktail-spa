export default class CocktailSchema {
constructor(json){
    const drink = json
    this.id = drink.idDrink;
    this.title = drink.strDrink;
    this.image = drink.strDrinkThumb;
    this.category= drink.strCategory;
    this.glass = drink.strGlass;
    this.alcoholic = drink.strAlcoholic;
    this.ingredients =[];
    this.instructions = drink.strInstructions;


    const ingredientPropRoot = "strIngredient"
    const measurePropRoot = "strMeasure"

    for (let i=1; i<=15 ; i++ ){
        const ing = drink[ingredientPropRoot + i]
        if(ing){
            this.ingredients.push({
                name:drink[ingredientPropRoot + i],
                measure: drink[measurePropRoot + i]?? ""
            })
        }
    }

}
}