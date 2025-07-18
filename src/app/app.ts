import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

export interface Pizza {
  name: string,
  info: string,
  price: number,
  img: string,
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CurrencyPipe, NgOptimizedImage, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App {
  protected readonly title = signal('please select from the following pizzas');

  public isSelected: boolean = false;
  public isSubmitted: boolean = false;
  public selectedPizza: Pizza | null = null;

  public pizzaOrder = new FormGroup({
    pizzaSize: new FormControl(0, Validators.required),
    stuffedCrust: new FormControl(false),
    address: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),

  })
  public handleSubmit(){
    this.isSubmitted = true;
    window.alert("tardar");
  }
  public selectPizza(pizza: Pizza) {
    console.log(`i used to have ${pizza.name} dreams until i found out there were other ways to score`);
    this.selectedPizza = pizza;
    this.isSelected = true;
  }

  public cancelSelection(){
    this.selectedPizza = null;
    this.isSelected = false;
  }

  public finished(){
    this.selectedPizza = null;
    this.isSelected = false;
    this.isSubmitted = false;
    this.pizzaOrder.reset();
  }

  public calcCost(): number {
    const base: number = this.selectedPizza?.price ?? 0;
    const size: number = this.pizzaOrder?.value?.pizzaSize ?? 0;
    const crust: number = this.pizzaOrder.value.stuffedCrust ? 1 : 0;
    return (base + size + crust);
  }

  public cancelSelection(){
    this.selectedPizza = null;
    this.isSelected = false;
  }

  pizzas = [
    {
      name: 'Mozzarella',
      info: 'Tomato sauce, Basil, Mozzarella',
      price: 10,
      img: 'mozarella.jpg'
    },
    {
      name: 'Pepperoni',
      info: 'Tomato sauce, Basil, Mozarella, Pepperoni',
      price: 12,
      img: 'pepperoni.jpeg'
    },
    {
      name: 'Hawaiian',
      info: 'Tomato sauce, Basil, Mozarella, Pineapple, Ham',
      price: 12,
      img: 'wrong.jpg'
    },
    {
      name: 'Meat feast',
      info: 'Tomato sauce, Basil, Mozarella, Pepperoni, Ham, Italian sausage, Ground beef',
      price: 13,
      img: 'meat.jpg'
    },
    {
      name: 'Veggie Supreme',
      info: 'Tomato sauce, Basil, Mozarella, Black olives, Green pepper, Mushroom, Onion, Sweet corn',
      price: 13,
      img: 'veggie.jpg'
    },
    {
      name: 'Vegan',
      info: 'Tomato sauce, Basil, Vegan cheese, Creamed Spinach, Sun-Dried Tomatoes, Red Onion, and Olives',
      price: 14,
      img: 'vegan.jpeg'
    },
  ]
}

