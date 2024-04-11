import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../common/category';
import { Product } from '../common/product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl = 'http://localhost:8081/api/categories';  

  constructor(private httpClient: HttpClient) { }

  getCatgeories():Observable<Category[]>{
   return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
    map(response => response._embedded.categories)
   );
  }
}

  interface GetResponse{
    _embedded: {
      categories: Category[];
    }
  }