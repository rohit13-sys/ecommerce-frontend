import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-prodduct-list',
  templateUrl: './prodduct-list.component.html',
  styleUrls: ['./prodduct-list.component.css']
})
export class ProdductListComponent implements OnInit {

  products: Product[] = [];
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productsList();
  }

  productsList(){
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
