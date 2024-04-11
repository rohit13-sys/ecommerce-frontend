import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-prodduct-list',
  templateUrl: './prodduct-list-grid.component.html',
  styleUrls: ['./prodduct-list.component.css']
})
export class ProdductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: string | null = '';
  searchModule: boolean = false;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.productsList();
    });
  }

  productsList() {
    this.searchModule = this.route.snapshot.paramMap.has('name');

    if (this.searchModule) {
      this.handleFilteredList();
    } else {
      this.handleAllProductList();
    }
  }

  searchProducts() {
    const keyword: string | null = this.route.snapshot.paramMap.get('keyword');
    this.productService.searchProducts(keyword).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleAllProductList() {
    //check if 'id' is available or not 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = this.route.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = '';
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

  handleFilteredList() {
    //check if 'keyword' is available or not
    const hasKeyword: boolean = this.route.snapshot.paramMap.has('name');
    if (hasKeyword) {
      const keyword: string | null = this.route.snapshot.paramMap.get('name');
      this.productService.searchProducts(keyword).subscribe(
        data => {
          this.products = data;
        }
      )

    }
  }
}
