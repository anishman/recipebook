
import { Injectable } from '@angular/core';
import {Recipe} from './recipe.model';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();


   private recipes: Recipe[] = [
        new Recipe('chicken curry', 
        'Authentic Himalayan Chichen Curry', 
        'https://worldtravelchef.com/wp-content/uploads/2016/08/Nepali-Dal-Bhat.jpg',
    [
        new Ingredient('chicken',2),
        new Ingredient('onion',2),
        new Ingredient('salt',3)

    ]),
        new Recipe('Daal Curry', 
        'ネパールの本格的なダールカレー', 
        'https://s3-media3.fl.yelpcdn.com/bphoto/Ex_iDejOsBZVDXapG0nyPQ/348s.jpg',
    [
        new Ingredient('lentils',4),
        new Ingredient('turmeric',4),
        new Ingredient('salt',5)
    ])
      ];

      constructor( private slService: ShoppingListService){

      }

      setRecipes(recipes: Recipe[]){
          this.recipes = recipes;
          this.recipesChanged.next(this.recipes.slice());
      }

      getRecipes(){
          return this.recipes.slice();
      }

      getRecipe(index: number){
          return this.recipes[index];
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]){
        this.slService.addIngredients(ingredients);

      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }

      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());        
      }

      deleteRecipe(index: number){
          this.recipes.splice(index,1);
          this.recipesChanged.next(this.recipes.slice());    

      }


}