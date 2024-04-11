import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search-products',
  templateUrl: './search-products.component.html',
  styleUrls: ['./search-products.component.css']
})
export class SearchProductsComponent implements OnInit {
  constructor(private route:Router) { }

  ngOnInit(): void {}

  searchProductByName(name:string) {
    console.log("keyword: "+name);
    this.route.navigateByUrl(`/search/${name}`);
    }

}
