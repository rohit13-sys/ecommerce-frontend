import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


  product: Product | undefined;
  productId: string | null = '';
  constructor(private route: ActivatedRoute, private productService: ProductService,private cartService:CartService) { }

  ngOnInit(): void {
    this.productDetails();
  }

  productDetails() {
    this.productId = this.route.snapshot.paramMap.get("productId");
    if (this.productId === null || this.productId.trim() === '') {
      throw new Error("productId is null");
    }
    this.productService.getProductDetails(this.productId).subscribe(
      data=>{
        this.product = data;
      }
    )
  }

  addToCart() {
    console.log(`Adding to cart : ${this.product!.name} , ${this.product!.unitPrice}`);
    const theCartItem = new CartItem(this.product!);
    this.cartService.addToCart(theCartItem);
  }
}
