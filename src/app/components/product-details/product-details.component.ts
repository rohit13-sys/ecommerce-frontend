import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product | undefined;
  productId: string | null = '';
  constructor(private route: ActivatedRoute, private productService: ProductService) { }

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
}
