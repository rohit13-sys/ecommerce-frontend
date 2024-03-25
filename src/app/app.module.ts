import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProdductListComponent } from './components/prodduct-list/prodduct-list.component';
import {HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';

@NgModule({
  declarations: [
    AppComponent,
    ProdductListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
