import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new Subject();
  totalQuanitty: Subject<number> = new Subject();

  constructor() { }

  addToCart(cartItem: CartItem) {
    //check if we already have item in the cart
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined!;

    if (this.cartItems.length > 0) {
      for (let item of this.cartItems) {
        if (item.id === cartItem.id) {
          existingCartItem = item;
          break;
        }
      }

      // existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === cartItem.id);

      //already exists in cart
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      //increment the quantity
      existingCartItem.quantity++;
    } else {
      //add to the array if not exists
      this.cartItems.push(cartItem);
    }

    //compute the total price and quantity
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      totalQuantityValue += currentCartItem.quantity
    }

    //publish the values
    this.totalPrice.next(totalPriceValue);
    this.totalQuanitty.next(totalQuantityValue);

    //log cart value
    this.logCartData(totalPriceValue, totalQuantityValue);
  }


  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Contents of cart');
    for (let tempProduct of this.cartItems) {
      const subTotalPrice = tempProduct.quantity * tempProduct.unitPrice;
      console.log(`name : ${tempProduct.name},quantity : ${tempProduct.quantity},
       unitPrice : ${tempProduct.unitPrice} , subTotalPrice : ${subTotalPrice}`);
    }

    console.log(`totalPrice : ${totalPriceValue.toFixed(2)} , totalQuantity : ${totalQuantityValue}`);
    console.log(`-------------------`);
  }

  decrementQuantity(cartItem: CartItem) {
    cartItem.quantity--;

    if (cartItem.quantity === 0) {
      this.remove(cartItem);
    } else {
      this.computeCartTotals();
    }
  }
  
  remove(cartItem: CartItem) {
    const itemIndex = this.cartItems.findIndex(tempItem => tempItem.id == cartItem.id);
    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
    }
  }
}
