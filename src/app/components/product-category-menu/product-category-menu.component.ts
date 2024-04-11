import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/common/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  categories:Category[] = []
  constructor(private categoryService:CategoryService ,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.categoryList();
    });
  }

  categoryList(){
    this.categoryService.getCatgeories().subscribe(
      data=>{
        this.categories = data;
        console.log(JSON.stringify(this.categories));
        
      }
    )
  }
}
