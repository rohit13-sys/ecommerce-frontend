import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice:number=0;
  totalquantity:number=0;
  constructor(private cartService:CartService) { }


  ngOnInit(): void {
    this.updateCartStatus();
  }


  updateCartStatus() {
    //subscribe for cart total prioce
    this.cartService.totalPrice.subscribe(data=>this.totalPrice = data);
    //subscribe for cart total quantity
    this.cartService.totalQuanitty.subscribe(data=>this.totalquantity = data);
  }

}
