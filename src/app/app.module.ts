import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { ProdductListComponent } from './components/prodduct-list/prodduct-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchProductsComponent } from './components/search-products/search-products.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent },
  { path: 'cart-details', component: CartDetailsComponent },
  { path: 'search/:name', component: ProdductListComponent },
  { path: 'category/:id', component: ProdductListComponent },
  { path: 'category', component: ProdductListComponent },
  { path: 'products/:productId', component: ProductDetailsComponent },
  { path: 'allProducts', component: ProdductListComponent },
  { path: '', redirectTo: '/allProducts', pathMatch: 'full' },
  { path: '**', redirectTo: '/allProducts', pathMatch: 'full' },
];
@NgModule({
  declarations: [
    AppComponent,
    ProdductListComponent,
    ProductCategoryMenuComponent,
    SearchProductsComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],

  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
