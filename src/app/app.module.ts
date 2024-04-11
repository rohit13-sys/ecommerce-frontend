import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProdductListComponent } from './components/prodduct-list/prodduct-list.component';
import {HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';


const routes: Routes=[
  {path: 'category/:id', component: ProdductListComponent},
  {path: 'category', component: ProdductListComponent},
  {path: 'products', component: ProdductListComponent},
  {path: '',redirectTo: '/products', pathMatch: 'full'},
  {path: '**',redirectTo: '/products', pathMatch: 'full'},
];
@NgModule({
  declarations: [
    AppComponent,
    ProdductListComponent,
    ProductCategoryMenuComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
