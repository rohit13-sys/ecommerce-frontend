import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8081/api/products';

  constructor(private httpClient: HttpClient) { }

  getProductList(currentCategoryId:string | null): Observable<Product[]>{
    let url:string = '';
    if(currentCategoryId!==null){
      url = this.baseUrl+'/search/findByCategoryId?id='+currentCategoryId;
      console.log(">>>>>>url: "+url);
      
    }else{
      url = this.baseUrl;
    }
    return this.httpClient.get<GetResponse>(url).pipe(
      map(response=> response._embedded.products)
    );
  }
}

interface GetResponse{
  _embedded: {
    products: Product[];
  }
}
