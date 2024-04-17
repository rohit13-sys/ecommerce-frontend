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

  getProductListPagination(thePage: number, thePageSize: number,
    currentCategoryId: string | null): Observable<GetResponse> {
    let url: string = '';
    if (currentCategoryId !== null && currentCategoryId.trim() !== '') {
      url = `${this.baseUrl}/search/findByCategoryId?id=${currentCategoryId}`
      +`&page=${thePage}&size=${thePageSize}`;
      console.log(">>>>>>url: " + url);
    } else {
      url = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;
    }
    return this.httpClient.get<GetResponse>(url);
  }

  getProductList(currentCategoryId: string | null): Observable<Product[]> {
    let url: string = '';
    if (currentCategoryId !== null && currentCategoryId.trim() !== '') {
      url = this.baseUrl + '/search/findByCategoryId?id=' + currentCategoryId;
      console.log(">>>>>>url: " + url);
    } else {
      url = this.baseUrl;
    }
    return this.httpClient.get<GetResponse>(url).pipe(
      map(response => response._embedded.products)
    );
  }

  searchProducts(keyword: string | null): Observable<Product[]> {
    let url = '';
    if (keyword == undefined) {
      url = this.baseUrl;
    } else {
      url = this.baseUrl + `/search/findByNameContainingIgnoreCase?name=${keyword}`;
      console.log(">>>>>>url: " + url);
    }
    return this.httpClient.get<GetResponse>(url).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductDetails(productId: string | null): Observable<Product> {
    let url = '';
    if (productId !== null && productId.trim() !== null) {
      url = `${this.baseUrl}/${productId}`;
    } else {
      url = this.baseUrl;
    }
    return this.httpClient.get<Product>(url).pipe(
      map(response => {
        console.log(response);
        return response;
      })
    )
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
