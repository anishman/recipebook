import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { ShoppingListService } from '../shopping-list.service';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex : number;
  editedItem: Ingredient;


  // @Output() ingredientAdded = new EventEmitter<Ingredient>();
  // @Output() ingredientRemoved = new EventEmitter();
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.slService.startedEditing
    .subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        console.log("INDEX IS: " + index);
        console.log("EDIT ITEM: " +this.editedItem);

        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient );
    } else {
      this.slService.addIngredient(newIngredient);      
    }
    this.editMode = false;
    form.reset();
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.onClear();

  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
    console.log("ON CLEAR CALLED")
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }






}
