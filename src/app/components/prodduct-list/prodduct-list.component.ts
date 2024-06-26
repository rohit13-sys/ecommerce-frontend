import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-prodduct-list',
  templateUrl: './prodduct-list-grid.component.html',
  styleUrls: ['./prodduct-list.component.css']
})
export class ProdductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: string | null = '';
  previousCategoryId: string | null = '';
  searchModule: boolean = false;

  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  randomNumber: number = Math.floor(Math.random() * 10) + 1;
  keyword: string | null = '';

  constructor(private productService: ProductService, private route: ActivatedRoute,private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.productsList();
    });
  }

  productsList() {
    // this.searchModule = this.route.snapshot.paramMap.has('name');
      this.handleAllProductList();
  }

  // searchProducts() {
  //   const keyword: string | null = this.route.snapshot.paramMap.get('keyword');
  //   this.productService.searchProducts(keyword).subscribe(
  //     data => {
  //       this.products = data;
  //     }
  //   )
  // }

  handleAllProductList() {
    //check if 'id' is available or not 
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      this.currentCategoryId = this.route.snapshot.paramMap.get('id');
    }
    else {
      this.currentCategoryId = '';
    }

    //
    //check if we have a different category than previous
    //Note: Angular will reuse the component if that compinent is being viewed
    //

    //if we have a different categoryId than previous
    // then set the pageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    console.log(`currentCategoryId : ${this.currentCategoryId} , thePagenumber : ${this.thePageNumber}
     , thePageSize : ${this.thePageSize} , previousCategoryId : ${this.previousCategoryId}`);

    this.previousCategoryId = this.currentCategoryId

    const hasKeyword: boolean = this.route.snapshot.paramMap.has('name');
    if (hasKeyword) {
      this.keyword = this.route.snapshot.paramMap.get('name');
    }
    this.productService.getProductsWithAllFilters(this.thePageNumber - 1,
      this.thePageSize,
      this.keyword,
      this.currentCategoryId)
      .subscribe(
        data => {
          this.products = data._embedded.products;
          this.thePageNumber = data.page.number + 1;
          this.thePageSize = data.page.size;
          this.theTotalElements = data.page.totalElements;

        }
      )
  }

  handleFilteredList() {
    //check if 'keyword' is available or not
    const hasKeyword: boolean = this.route.snapshot.paramMap.has('name');
    if (hasKeyword) {
      const keyword: string | null = this.route.snapshot.paramMap.get('name');
      this.productService.searchProducts(this.thePageNumber - 1,
        this.thePageSize,
        keyword)
        .subscribe(
          data => {
            this.products = data._embedded.products;
            this.thePageNumber = data.page.number + 1;
            this.thePageSize = data.page.size;
            this.theTotalElements = data.page.totalElements;

          }
        )
    }
  }

  random() {
    return Math.random()
  }

  updatePageSize(pageSize: string) {
    this.thePageSize = +pageSize;  
    this.thePageNumber = 1;
    this.productsList();
  }

  addToCart( product: Product) {
      console.log(`Adding to cart : ${product.name} , ${product.unitPrice}`);
      const theCartItem = new CartItem(product);
      this.cartService.addToCart(theCartItem);
    }
}
