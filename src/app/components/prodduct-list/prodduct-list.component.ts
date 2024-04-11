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
  constructor(private productService: ProductService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.productsList();
    });
  }

  productsList(){

    //check if 'id' is available or not
    const hasCategoryId:boolean = this.route.snapshot.paramMap.has('id');
    if(hasCategoryId!=null){
      this.currentCategoryId = this.route.snapshot.paramMap.get('id'); 
    }else{
      this.currentCategoryId = '';
    }
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}
