import { HttpClient, HttpParams } from '@angular/common/http';
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

  searchProducts(thePage: number, thePageSize: number,keyword: string | null): Observable<GetResponse> {
    let url = '';
    if (keyword == undefined) {
      url = `${this.baseUrl}?page=${thePage}&size=${thePageSize}`;
    } else {
      url = this.baseUrl + `/search/findByNameContainingIgnoreCase?name=${keyword}`
      +`&page=${thePage}&size=${thePageSize}`;
      console.log(">>>>>>url: " + url);
    }
    return this.httpClient.get<GetResponse>(url);
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


  getProductsWithAllFilters(
    thePage: number,
    thePageSize: number,
    keyword: string | null,
    categoryId: string | null
  ): Observable<GetResponse> {
    let finalUrl: string;
    let params = new HttpParams()
      .set('page', thePage.toString())
      .set('size', thePageSize.toString());
  
    if (keyword && keyword.trim() !== '') {
      params = params.set('name', keyword.trim());
      finalUrl = `${this.baseUrl}/search/findByNameContainingIgnoreCase`;
    } else if (categoryId && categoryId.trim() !== '') {
      params = params.set('id', categoryId.trim());
      finalUrl = `${this.baseUrl}/search/findByCategoryId`;
    } else {
      finalUrl = this.baseUrl;
    }
    return this.httpClient.get<GetResponse>(finalUrl, { params });
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
