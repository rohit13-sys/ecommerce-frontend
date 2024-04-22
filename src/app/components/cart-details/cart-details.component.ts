import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems:CartItem[] = []
  totalPrice:number=0;
  totalQuantity:number=0;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
  
  }

  listCartDetails(){
    //ghet a handle to cart items
    this.cartItems = this.cartService.cartItems;

    //subscribe to cart total price
    this.cartService.totalPrice.subscribe(data=>this.totalPrice=data);

    //sunscribe to cart total quantity
    this.cartService.totalQuanitty.subscribe(data=>this.totalQuantity=data);

    //compiute cart total price and quantity
    this.cartService.computeCartTotals();
  }

}
